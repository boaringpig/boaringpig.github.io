// ui-invites.js
// Rendering + event wiring for master-side invite link management.

window.renderInvitesList = function () {
	var container = document.getElementById("invitesList");
	if (!container) return;

	if (!window.invites || window.invites.length === 0) {
		container.innerHTML = '<div class="empty-state">No invites generated yet.</div>';
		return;
	}

	container.innerHTML = window.invites
		.map(function (invite) {
			var isExpired =
				invite.status === "pending" &&
				invite.expires_at &&
				new Date(invite.expires_at) < new Date();
			var effectiveStatus = isExpired ? "expired" : invite.status;
			var statusClass =
				effectiveStatus === "pending"
					? "status-todo"
					: effectiveStatus === "redeemed"
					? "status-completed"
					: "status-overdue";

			var actions = "";
			if (invite.status === "pending" && !isExpired) {
				actions =
					'<button class="action-btn check-btn" onclick="navigator.clipboard.writeText(\'' +
					window.buildInviteLink(invite.code) +
					'\'); window.showNotification(\'Invite link copied!\', \'success\')">Copy Link</button>' +
					'<button class="action-btn reject-btn" onclick="window.revokeInvite(\'' +
					invite.code +
					"')\">Revoke</button>";
			}

			return (
				'<div class="task-item">' +
				'<div class="task-content">' +
				"<div>" +
				'<span class="status-badge ' +
				statusClass +
				'">' +
				effectiveStatus.charAt(0).toUpperCase() + effectiveStatus.slice(1) +
				"</span>" +
				'<span class="task-text">' +
				window.escapeHtml(invite.code) +
				"</span>" +
				'<div class="task-meta">' +
				(invite.redeemed_by
					? "Redeemed by: " + window.escapeHtml(invite.redeemed_by) + "<br>"
					: "") +
				"Created: " + window.formatDate(invite.created_at) +
				"<br>Expires: " + window.formatDate(invite.expires_at) +
				"</div>" +
				"</div>" +
				'<div class="task-actions">' +
				actions +
				"</div>" +
				"</div>" +
				"</div>"
			);
		})
		.join("");
};

document.addEventListener("DOMContentLoaded", function () {
	var generateBtn = document.getElementById("generateInviteBtn");
	if (generateBtn) {
		generateBtn.addEventListener("click", function () {
			window.generateInvite();
		});
	}
});
