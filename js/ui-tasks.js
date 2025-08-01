// ui.tasks.js
// This file contains all the UI rendering functions for tasks.

/**
 * Renders tasks in the appropriate view (admin or user) based on current user's role.
 */
window.renderTasks = function () {
	var user = window.users[window.currentUser];
	if (user.role === "admin") {
		window.renderAdminView();
	} else {
		window.renderUserView();
	}
};

/**
 * Renders the admin view with sections for pending appeals, suggested tasks,
 * tasks pending approval, and all tasks.
 */
window.renderAdminView = function () {
	var pendingAppeals = window.tasks.filter(function (t) {
		return t.type === "demerit" && t.appealStatus === "pending";
	});
	var appealsContainer = document.getElementById("pendingAppeals");
	if (appealsContainer) {
		if (pendingAppeals.length === 0) {
			appealsContainer.innerHTML =
				'<div class="empty-state">No appeals pending review</div>';
		} else {
			appealsContainer.innerHTML = pendingAppeals
				.map(function (task) {
					return (
						'<div class="task-item appeal-pending">' +
						'<div class="task-content">' +
						"<div>" +
						'<span class="status-badge status-pending">Appeal Pending</span>' +
						'<span class="task-text">' +
						window.escapeHtml(task.text) +
						"</span>" +
						'<span class="points-badge-small">-' +
						task.penaltyPoints +
						" pts (risk: -" +
						task.penaltyPoints * 2 +
						")</span>" +
						'<div class="task-meta">' +
						"User: " +
						(window.users[task.assignedTo]
							? window.users[task.assignedTo].displayName
							: task.assignedTo) +
						"<br>Appealed: " +
						window.formatDate(task.appealedAt) +
						"<br>Original demerit: " +
						window.formatDate(task.createdAt) +
						(task.acceptedAt
							? "<br>Accepted: " +
							  window.formatDate(task.acceptedAt)
							: "<br>Status: Not accepted") +
						(task.appealText
							? "<br>Appeal Reason: " +
							  window.escapeHtml(task.appealText)
							: "") +
						"</div>" +
						"</div>" +
						'<div class="task-actions">' +
						'<button class="action-btn approve-btn" onclick="approveAppeal(' +
						task.id +
						')">Approve Appeal</button>' +
						'<button class="action-btn reject-btn" onclick="denyAppeal(' +
						task.id +
						')">Deny Appeal (Double Penalty)</button>' +
						"</div>" +
						"</div>" +
						"</div>"
					);
				})
				.join("");
		}
	}
	var pendingTasks = window.tasks.filter(function (t) {
		return t.status === "pending_approval" && t.type !== "demerit";
	});
	var pendingContainer = document.getElementById("pendingTasks");
	if (pendingContainer) {
		if (pendingTasks.length === 0) {
			pendingContainer.innerHTML =
				'<div class="empty-state">No tasks pending approval</div>';
		} else {
			pendingContainer.innerHTML = pendingTasks
				.map(function (task) {
					return (
						'<div class="task-item pending-approval ' +
						(task.isOverdue ? "overdue" : "") +
						'">' +
						'<div class="task-content">' +
						"<div>" +
						'<span class="status-badge status-pending">Pending Approval</span>' +
						'<span class="task-text">' +
						window.escapeHtml(task.text) +
						"</span>" +
						'<span class="points-badge-small">+' +
						task.points +
						" pts</span>" +
						'<div class="task-meta">' +
						"Completed by: " +
						(window.users[task.completedBy]
							? window.users[task.completedBy].displayName
							: task.completedBy) +
						(task.dueDate
							? "<br>Due: " + window.formatDate(task.dueDate)
							: "") +
						(task.isRepeating ? "<br>🔄 Repeating" : "") +
						"</div>" +
						"</div>" +
						'<div class="task-actions">' +
						'<button class="action-btn approve-btn" onclick="approveTask(' +
						task.id +
						')">Approve</button>' +
						'<button class="action-btn reject-btn" onclick="rejectTask(' +
						task.id +
						')">Reject & Penalize</button>' +
						'<button class="action-btn delete-btn" onclick="deleteTask(' +
						task.id +
						')">Delete</button>' +
						"</div>" +
						"</div>" +
						"</div>"
					);
				})
				.join("");
		}
	}
	var allTasksContainer = document.getElementById("allTasksAdmin");
	if (allTasksContainer) {
		if (window.tasks.length === 0) {
			allTasksContainer.innerHTML =
				'<div class="empty-state">No tasks created yet</div>';
		} else {
			allTasksContainer.innerHTML = window.tasks
				.map(function (task) {
					var classes = "";
					if (task.status === "completed") classes += "completed ";
					if (task.isOverdue) classes += "overdue ";
					if (task.type === "demerit") classes += "demerit-task ";
					return (
						'<div class="task-item ' +
						classes +
						'">' +
						'<div class="task-content">' +
						"<div>" +
						'<span class="status-badge ' +
						window.getStatusClass(
							task.status,
							task.isOverdue,
							task.type,
							task.appealStatus
						) +
						'">' +
						window.getStatusText(
							task.status,
							task.isOverdue,
							task.type,
							task.appealStatus
						) +
						"</span>" +
						'<span class="task-text">' +
						window.escapeHtml(task.text) +
						"</span>" +
						'<span class="points-badge-small">' +
						(task.type === "demerit"
							? "-" + task.penaltyPoints
							: "+" + task.points) +
						" pts</span>" +
						(task.type === "demerit" && task.appealStatus
							? '<span class="points-badge-small appeal-status ' +
							  task.appealStatus +
							  '">' +
							  task.appealStatus +
							  "</span>"
							: "") +
						(task.type === "demerit" && task.acceptedAt
							? '<span class="points-badge-small" style="background: #e0e7ff; color: #3730a3;">Accepted</span>'
							: "") +
						'<div class="task-meta">' +
						"Assigned to: " +
						(window.users[task.assignedTo]
							? window.users[task.assignedTo].displayName
							: task.assignedTo) +
						(task.completedBy
							? "<br>Completed by: " +
							  (window.users[task.completedBy]
									? window.users[task.completedBy].displayName
									: task.completedBy)
							: "") +
						(task.dueDate
							? "<br>Due: " + window.formatDate(task.dueDate)
							: "") +
						(task.isRepeating ? "<br>🔄 Repeating" : "") +
						(task.type === "demerit" ? "<br>📋 Demerit Task" : "") +
						(task.type === "demerit" && task.acceptedAt
							? "<br>Accepted: " +
							  window.formatDate(task.acceptedAt)
							: "") +
						(task.appealedAt
							? "<br>Appealed: " +
							  window.formatDate(task.appealedAt)
							: "") +
						(task.appealReviewedAt
							? "<br>Reviewed: " +
							  window.formatDate(task.appealReviewedAt) +
							  " by " +
							  (window.users[task.appealReviewedBy]
									? window.users[task.appealReviewedBy]
											.displayName
									: task.appealReviewedBy)
							: "") +
						(task.appealText
							? "<br>Appeal Reason: " +
							  window.escapeHtml(task.appealText)
							: "") +
						"</div>" +
						"</div>" +
						'<div class="task-actions">' +
						'<button class="action-btn delete-btn" onclick="deleteTask(' +
						task.id +
						')">Delete</button>' +
						"</div>" +
						"</div>" +
						"</div>"
					);
				})
				.join("");
		}
	}
	setTimeout(function () {
		window.setupRefreshButton("refreshDataBtnAdmin", 30);
	}, 0);
};

/**
 * Renders the user's view of tasks, including regular tasks and demerit tasks.
 */
window.renderUserView = function () {
	var userTasks = window.tasks.filter(function (t) {
		return t.assignedTo === window.currentUser;
	});
	var myTasksContainer = document.getElementById("myTasks");
	if (myTasksContainer) {
		if (userTasks.length === 0) {
			myTasksContainer.innerHTML =
				'<div class="empty-state">No tasks available</div>';
		} else {
			myTasksContainer.innerHTML = userTasks
				.map(function (task) {
					var classes = "";
					if (task.type === "demerit")
						classes += "demerit-task-user ";
					if (task.isOverdue) classes += "overdue ";
					if (task.status === "completed") classes += "completed ";
					if (task.status === "pending_approval")
						classes += "pending-approval ";
					if (task.appealStatus === "pending")
						classes += "appeal-pending ";
					var actionButtons = "";
					if (
						task.type === "regular" &&
						task.status === "todo" &&
						!task.isOverdue
					) {
						actionButtons =
							'<button class="action-btn check-btn" onclick="checkOffTask(' +
							task.id +
							')">Mark Complete</button>';
					} else if (
						task.type === "regular" &&
						task.isOverdue &&
						task.status === "todo"
					) {
						actionButtons =
							'<button class="action-btn check-btn" onclick="checkOffTask(' +
							task.id +
							')">Mark Complete (Overdue)</button>';
					} else if (
						task.type === "demerit" &&
						!task.acceptedAt &&
						!task.appealStatus
					) {
						actionButtons =
							'<button class="action-btn accept-btn" onclick="acceptDemerit(' +
							task.id +
							')">Accept Demerit</button>' +
							'<button class="action-btn appeal-btn" onclick="appealDemerit(' +
							task.id +
							')">Appeal Demerit</button>';
					}
					return (
						'<div class="task-item ' +
						classes +
						'">' +
						'<div class="task-content">' +
						"<div>" +
						'<span class="status-badge ' +
						window.getStatusClass(
							task.status,
							task.isOverdue,
							task.type,
							task.appealStatus
						) +
						'">' +
						window.getStatusText(
							task.status,
							task.isOverdue,
							task.type,
							task.appealStatus
						) +
						"</span>" +
						'<span class="task-text">' +
						window.escapeHtml(task.text) +
						"</span>" +
						'<span class="points-badge-small">' +
						(task.type === "demerit"
							? "-" + task.penaltyPoints
							: "+" + task.points) +
						" pts</span>" +
						(task.type === "demerit" && task.appealStatus
							? '<span class="points-badge-small appeal-status ' +
							  task.appealStatus +
							  '">' +
							  task.appealStatus +
							  "</span>"
							: "") +
						(task.type === "demerit" && task.acceptedAt
							? '<span class="points-badge-small" style="background: #e0e7ff; color: #3730a3;">Accepted</span>'
							: "") +
						'<div class="task-meta">' +
						(task.type === "demerit"
							? "Issued by: " +
							  (window.users[task.createdBy]
									? window.users[task.createdBy].displayName
									: task.createdBy)
							: "Created by: " +
							  (window.users[task.createdBy]
									? window.users[task.createdBy].displayName
									: task.createdBy)) +
						(task.dueDate
							? "<br>Due: " + window.formatDate(task.dueDate)
							: "") +
						(task.isRepeating ? "<br>🔄 Repeating" : "") +
						(task.type === "demerit" ? "<br>📋 Demerit Task" : "") +
						(task.completedBy
							? "<br>Completed by: " +
							  (window.users[task.completedBy]
									? window.users[task.completedBy].displayName
									: task.completedBy)
							: "") +
						(task.approvedBy
							? "<br>Approved by: " +
							  (window.users[task.approvedBy]
									? window.users[task.approvedBy].displayName
									: task.approvedBy)
							: "") +
						(task.rejectedBy
							? "<br>Rejected by: " +
							  (window.users[task.rejectedBy]
									? window.users[task.rejectedBy].displayName
									: task.rejectedBy)
							: "") +
						(task.acceptedAt
							? "<br>Accepted: " +
							  window.formatDate(task.acceptedAt)
							: "") +
						(task.appealedAt
							? "<br>Appealed: " +
							  window.formatDate(task.appealedAt)
							: "") +
						(task.appealReviewedAt
							? "<br>Reviewed: " +
							  window.formatDate(task.appealReviewedAt) +
							  " by " +
							  (window.users[task.appealReviewedBy]
									? window.users[task.appealReviewedBy]
											.displayName
									: task.appealReviewedBy)
							: "") +
						(task.appealText
							? "<br>Appeal Reason: " +
							  window.escapeHtml(task.appealText)
							: "") +
						"</div>" +
						"</div>" +
						'<div class="task-actions">' +
						actionButtons +
						"</div>" +
						"</div>" +
						"</div>"
					);
				})
				.join("");
		}
	}
	setTimeout(function () {
		window.setupRefreshButton("refreshDataBtnUser", 30);
	}, 0);
};
