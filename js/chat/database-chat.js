// database-chat.js
// Per-master-group chatroom: message history + sending. Realtime delivery of
// new messages is wired up in database.js's loadData() (chat_channel), but
// that depends on the chat_messages table actually being added to the
// Supabase project's `supabase_realtime` publication (a dashboard setting,
// not something a migration sets up on its own) -- if it isn't, no client
// ever receives a postgres_changes event for a message someone else sent,
// realtime or not. window.startChatPolling() below is a cheap fallback so
// chat works regardless: while the Chat tab is open, re-fetch every few
// seconds on top of whatever the realtime channel manages to deliver.

window.chatMessages = [];
window.chatHasMoreOlder = false;

const CHAT_PAGE_SIZE = 100;
const CHAT_POLL_INTERVAL_MS = 5000;

/**
 * Polls for new messages while the Chat tab is open, as a fallback in case
 * realtime delivery isn't working (see note above). Safe to call more than
 * once -- clears any previous interval first.
 */
window.startChatPolling = function () {
	if (window.chatPollIntervalId) {
		clearInterval(window.chatPollIntervalId);
	}
	window.chatPollIntervalId = setInterval(function () {
		if (window.activeTab === "chat" && window.activeMasterContext) {
			window.fetchChatMessagesInitial();
		}
	}, CHAT_POLL_INTERVAL_MS);
};

/**
 * Fetches the most recent page of chat messages for the active group.
 */
window.fetchChatMessagesInitial = async function () {
	if (!window.supabase || !window.activeMasterContext) return;

	var { data, error } = await window.supabase
		.from("chat_messages")
		.select("*")
		.eq("master_username", window.activeMasterContext)
		.order("created_at", { ascending: false })
		.limit(CHAT_PAGE_SIZE);

	if (error) {
		console.error("Error fetching chat messages:", error);
		return;
	}

	window.chatMessages = (data || []).slice().reverse();
	window.chatHasMoreOlder = (data || []).length === CHAT_PAGE_SIZE;

	if (window.activeTab === "chat" && window.renderChatMessages) {
		window.renderChatMessages();
	}
};

/**
 * Loads a page of messages older than the oldest one currently in memory
 * and prepends them.
 */
window.loadOlderChatMessages = async function () {
	if (!window.chatMessages.length) return;

	var oldest = window.chatMessages[0];
	var { data, error } = await window.supabase
		.from("chat_messages")
		.select("*")
		.eq("master_username", window.activeMasterContext)
		.lt("created_at", oldest.created_at)
		.order("created_at", { ascending: false })
		.limit(CHAT_PAGE_SIZE);

	if (error) {
		console.error("Error fetching older chat messages:", error);
		return;
	}

	window.chatMessages = (data || []).slice().reverse().concat(window.chatMessages);
	window.chatHasMoreOlder = (data || []).length === CHAT_PAGE_SIZE;

	if (window.renderChatMessages) window.renderChatMessages({ preserveScroll: true });
};

/**
 * Sends a chat message in the active group.
 *
 * `overrides` is optional: `{ body }` lets a non-DOM caller (e.g. the React
 * beta UI) pass the message directly instead of reading `#chatInput`.
 */
window.sendChatMessage = async function (overrides) {
	overrides = overrides || {};

	var inputEl = document.getElementById("chatInput");
	var body =
		overrides.body !== undefined
			? overrides.body.trim()
			: inputEl
			? inputEl.value.trim()
			: "";

	if (!body) return;

	var { data, error } = await window.supabase
		.from("chat_messages")
		.insert([
			{
				master_username: window.activeMasterContext,
				sender_username: window.currentUser,
				body: body,
			},
		])
		.select()
		.single();

	if (error) {
		console.error("Error sending chat message:", error);
		window.showNotification("Failed to send message.", "error");
		return;
	}

	if (inputEl) inputEl.value = "";

	// Push the sent message locally immediately rather than waiting on the
	// chat_channel realtime round-trip (js/core/database.js) to echo it back --
	// that round-trip is what used to make a sender's own message not show
	// up until a reload. Dedupe against the channel's own INSERT handler,
	// which also guards against double-adding this same row.
	if (!window.chatMessages.some(function (m) { return m.id === data.id; })) {
		window.chatMessages.push(data);
		window.chatMessages.sort(
			(a, b) => new Date(a.created_at) - new Date(b.created_at)
		);
		if (window.activeTab === "chat" && window.renderChatMessages) {
			window.renderChatMessages();
		}
	}

	return data;
};
