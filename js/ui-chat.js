// ui-chat.js
// Rendering + event wiring for the per-group chatroom.

/**
 * Renders the chat message list. Auto-scrolls to the bottom unless the user
 * has scrolled up to read history (in which case we don't yank them back
 * down when a new message or an older page arrives).
 */
window.renderChatMessages = function (options) {
	options = options || {};
	var container = document.getElementById("chatMessagesList");
	if (!container) return;

	var wasNearBottom =
		container.scrollHeight - container.scrollTop - container.clientHeight < 80;
	var previousScrollHeight = container.scrollHeight;

	if (!window.chatMessages || window.chatMessages.length === 0) {
		container.innerHTML = '<div class="empty-state">No messages yet. Say hello!</div>';
	} else {
		container.innerHTML = window.chatMessages
			.map(function (msg) {
				var sender = window.users[msg.sender_username];
				var displayName = sender ? sender.displayName : msg.sender_username;
				var statusMessage = sender && sender.statusMessage ? sender.statusMessage : "";
				return (
					'<div class="task-item">' +
					'<div class="task-content">' +
					"<div>" +
					'<span class="task-text"><strong>' +
					window.escapeHtml(displayName) +
					"</strong>" +
					(statusMessage
						? ' <span class="status-message-text">' + window.escapeHtml(statusMessage) + "</span>"
						: "") +
					"</span>" +
					'<div class="task-meta">' +
					window.escapeHtml(msg.body) +
					"</div>" +
					'<div class="task-meta">' +
					window.formatDate(msg.created_at) +
					"</div>" +
					"</div>" +
					"</div>" +
					"</div>"
				);
			})
			.join("");
	}

	window.renderChatLoadOlderButton();

	if (options.preserveScroll) {
		container.scrollTop = container.scrollHeight - previousScrollHeight;
	} else if (wasNearBottom) {
		container.scrollTop = container.scrollHeight;
	}
};

window.renderChatLoadOlderButton = function () {
	var btn = document.getElementById("chatLoadOlderBtn");
	if (!btn) return;
	btn.style.display = window.chatHasMoreOlder ? "inline-block" : "none";
};

document.addEventListener("DOMContentLoaded", function () {
	var chatForm = document.getElementById("chatForm");
	if (chatForm) {
		chatForm.addEventListener("submit", function (e) {
			e.preventDefault();
			window.sendChatMessage();
		});
	}

	var loadOlderBtn = document.getElementById("chatLoadOlderBtn");
	if (loadOlderBtn) {
		loadOlderBtn.addEventListener("click", function () {
			window.loadOlderChatMessages();
		});
	}
});
