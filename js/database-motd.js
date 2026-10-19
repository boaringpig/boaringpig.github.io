// database-motd.js
// Message of the Day: a master-curated, ordered list of messages, one of
// which is shown on slave dashboards at a time. Advances to the next
// message (looping) once per calendar day, checked on page load -- the same
// "day passed, check on load" approach already used for reward-limit resets
// (see js/database-rewards.js's checkForRewardLimitReset), since this app
// has no backend/cron to drive it any other way.

window.motdMessages = [];
window.motdState = { currentIndex: 0, lastAdvancedAt: null };

window.fetchMotdInitial = async function () {
	if (!window.supabase || !window.activeMasterContext) return;

	var { data: messages, error: messagesError } = await window.supabase
		.from("motd_messages")
		.select("*")
		.eq("master_username", window.activeMasterContext)
		.order("position", { ascending: true });

	if (messagesError) {
		console.error("Error fetching MOTD messages:", messagesError);
	} else {
		window.motdMessages = messages || [];
	}

	var { data: stateRows, error: stateError } = await window.supabase
		.from("motd_state")
		.select("*")
		.eq("master_username", window.activeMasterContext)
		.limit(1);

	if (stateError) {
		console.error("Error fetching MOTD state:", stateError);
	} else if (stateRows && stateRows.length > 0) {
		window.motdState = {
			currentIndex: stateRows[0].current_index,
			lastAdvancedAt: stateRows[0].last_advanced_at,
		};
	} else {
		window.motdState = { currentIndex: 0, lastAdvancedAt: null };
	}
};

/**
 * Returns the message that should currently be shown, or null if the group
 * has no messages. `currentIndex` is an array index (not a message id), so
 * deleting/reordering messages never needs to touch motd_state -- this
 * modulo just self-heals.
 */
window.getCurrentMotdMessage = function () {
	if (!window.motdMessages || window.motdMessages.length === 0) return null;
	var index = window.motdState.currentIndex % window.motdMessages.length;
	return window.motdMessages[index];
};

/**
 * Checks whether a new calendar day has started since the MOTD last
 * advanced and, if so, moves to the next message (looping back to the
 * start). Mirrors checkForRewardLimitReset's "act on load" shape, but
 * compares calendar dates rather than a rolling interval, per spec ("once
 * per calendar day"). If several days pass with nobody loading the app, this
 * advances by exactly one step on the next load rather than one step per
 * skipped day -- nobody observed the skipped days either way.
 */
window.checkForMotdAdvance = async function () {
	if (!window.motdMessages || window.motdMessages.length === 0) return;

	var last = window.motdState.lastAdvancedAt
		? new Date(window.motdState.lastAdvancedAt)
		: null;
	var today = new Date();
	var isNewCalendarDay = !last || last.toDateString() !== today.toDateString();

	if (!isNewCalendarDay) return;

	var newIndex =
		window.motdMessages.length <= 1
			? 0
			: (window.motdState.currentIndex + 1) % window.motdMessages.length;

	var { error } = await window.supabase.from("motd_state").upsert(
		{
			master_username: window.activeMasterContext,
			current_index: newIndex,
			last_advanced_at: today.toISOString(),
		},
		{ onConflict: "master_username" }
	);

	if (error) {
		console.error("Error advancing MOTD:", error);
		return;
	}

	window.motdState = { currentIndex: newIndex, lastAdvancedAt: today.toISOString() };
	if (window.renderMotdBanner) window.renderMotdBanner();
};

/**
 * Adds a new message to the end of the group's MOTD list.
 */
window.addMotdMessage = async function (overrides) {
	overrides = overrides || {};

	if (!window.isMaster()) {
		window.showNotification("Only a " + window.term("master") + " can edit the message of the day.", "error");
		return;
	}

	var inputEl = document.getElementById("newMotdText");
	var body =
		overrides.body !== undefined
			? overrides.body.trim()
			: inputEl
			? inputEl.value.trim()
			: "";

	if (!body) return;

	var maxPosition = window.motdMessages.reduce(function (max, m) {
		return Math.max(max, m.position);
	}, -1);

	var { error } = await window.supabase.from("motd_messages").insert([
		{
			master_username: window.activeMasterContext,
			body: body,
			position: maxPosition + 1,
		},
	]);

	if (error) {
		console.error("Error adding MOTD message:", error);
		window.showNotification("Failed to add message.", "error");
		return;
	}

	if (inputEl) inputEl.value = "";

	// Make sure a motd_state row exists as soon as there's something to show.
	await window.supabase.from("motd_state").upsert(
		{ master_username: window.activeMasterContext },
		{ onConflict: "master_username", ignoreDuplicates: true }
	);

	await window.fetchMotdInitial();
	if (window.renderMotdManageList) window.renderMotdManageList();
	if (window.renderMotdBanner) window.renderMotdBanner();
};

window.deleteMotdMessage = async function (id) {
	var { error } = await window.supabase
		.from("motd_messages")
		.delete()
		.eq("id", id)
		.eq("master_username", window.activeMasterContext);

	if (error) {
		console.error("Error deleting MOTD message:", error);
		window.showNotification("Failed to delete message.", "error");
		return;
	}

	await window.fetchMotdInitial();
	if (window.renderMotdManageList) window.renderMotdManageList();
	if (window.renderMotdBanner) window.renderMotdBanner();
};

async function swapMotdPositions(id, neighborId) {
	var message = window.motdMessages.find(function (m) {
		return m.id === id;
	});
	var neighbor = window.motdMessages.find(function (m) {
		return m.id === neighborId;
	});
	if (!message || !neighbor) return;

	await window.supabase
		.from("motd_messages")
		.update({ position: neighbor.position })
		.eq("id", message.id);
	await window.supabase
		.from("motd_messages")
		.update({ position: message.position })
		.eq("id", neighbor.id);

	await window.fetchMotdInitial();
	if (window.renderMotdManageList) window.renderMotdManageList();
}

window.moveMotdMessageUp = async function (id) {
	var index = window.motdMessages.findIndex(function (m) {
		return m.id === id;
	});
	if (index <= 0) return;
	await swapMotdPositions(id, window.motdMessages[index - 1].id);
};

window.moveMotdMessageDown = async function (id) {
	var index = window.motdMessages.findIndex(function (m) {
		return m.id === id;
	});
	if (index === -1 || index >= window.motdMessages.length - 1) return;
	await swapMotdPositions(id, window.motdMessages[index + 1].id);
};
