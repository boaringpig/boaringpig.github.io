// database-chat.js
// Per-master-group chatroom: message history + sending. Realtime delivery of
// new messages is wired up in database.js's loadData() (chat_channel).

window.chatMessages = [];
window.chatHasMoreOlder = false;

const CHAT_PAGE_SIZE = 100;

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
	// chat_channel realtime round-trip (js/database.js) to echo it back --
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
