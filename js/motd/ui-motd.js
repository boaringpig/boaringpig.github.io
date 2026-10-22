// ui-motd.js
// Rendering + event wiring for Message of the Day: the slave-facing banner
// and the master-facing manage list.

window.renderMotdBanner = function () {
	var banner = document.getElementById("motdBanner");
	if (!banner) return;

	if (window.isMaster()) {
		banner.style.display = "none";
		return;
	}

	var message = window.getCurrentMotdMessage();
	if (!message) {
		banner.style.display = "none";
		banner.innerHTML = "";
		return;
	}

	banner.style.display = "block";
	banner.innerHTML = '<span class="motd-icon">📣</span> ' + window.escapeHtml(message.body);
};

window.renderMotdManageList = function () {
	var container = document.getElementById("motdList");
	if (!container) return;

	if (!window.motdMessages || window.motdMessages.length === 0) {
		container.innerHTML = '<div class="empty-state">No messages added yet.</div>';
		return;
	}

	container.innerHTML = window.motdMessages
		.map(function (msg, index) {
			var isFirst = index === 0;
			var isLast = index === window.motdMessages.length - 1;
			var isCurrent = window.getCurrentMotdMessage() && window.getCurrentMotdMessage().id === msg.id;

			return (
				'<div class="task-item">' +
				'<div class="task-content">' +
				"<div>" +
				(isCurrent
					? '<span class="status-badge status-todo">Showing now</span>'
					: "") +
				'<span class="task-text">' +
				window.escapeHtml(msg.body) +
				"</span>" +
				"</div>" +
				'<div class="task-actions">' +
				'<button class="action-btn check-btn" ' +
				(isFirst ? "disabled" : "") +
				' onclick="window.moveMotdMessageUp(' +
				msg.id +
				')">↑</button>' +
				'<button class="action-btn check-btn" ' +
				(isLast ? "disabled" : "") +
				' onclick="window.moveMotdMessageDown(' +
				msg.id +
				')">↓</button>' +
				'<button class="action-btn delete-btn" onclick="window.deleteMotdMessage(' +
				msg.id +
				')">Delete</button>' +
				"</div>" +
				"</div>" +
				"</div>"
			);
		})
		.join("");
};

document.addEventListener("DOMContentLoaded", function () {
	var addBtn = document.getElementById("addMotdBtn");
	if (addBtn) {
		addBtn.addEventListener("click", function () {
			window.addMotdMessage();
		});
	}
});
