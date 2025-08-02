// ui.dashboard.js
// This file contains all the UI rendering functions for the dashboard.

/**
 * Renders the dashboard view with user stats and activity log.
 */
window.renderDashboard = function () {
	if (!window.hasPermission("view_dashboard")) return;
	var userActivity = window.userActivityLog.filter(function (a) {
		return a.user === "schinken";
	});
	var lastActivity = userActivity[0];
	var isUserOnline = lastActivity && lastActivity.action === "login";
	var activeTasks = window.tasks.filter(function (t) {
		return (
			t.status !== "completed" &&
			t.type !== "demerit" &&
			t.assignedTo === "schinken"
		);
	});
	var completedTasks = window.tasks.filter(function (t) {
		return t.status === "completed" && t.assignedTo === "schinken";
	});
	var allNonDemeritTasks = window.tasks.filter(function (t) {
		return t.type !== "demerit" && t.assignedTo === "schinken";
	});
	var completionRate =
		allNonDemeritTasks.length > 0
			? Math.round(
					(completedTasks.length / allNonDemeritTasks.length) * 100
			  )
			: 0;
	var demeritTasksCount = window.tasks.filter(function (t) {
		return t.type === "demerit";
	}).length;
	var userStatusEl = document.getElementById("userStatus");
	var activeTasksEl = document.getElementById("activeTasks");
	var completionRateEl = document.getElementById("completionRate");
	var demeritsIssuedCountEl = document.getElementById("demeritsIssuedCount");
	if (userStatusEl) {
		userStatusEl.textContent = isUserOnline ? "Online" : "Offline";
		userStatusEl.style.color = isUserOnline ? "#059669" : "#dc2626";
	}
	if (activeTasksEl) activeTasksEl.textContent = activeTasks.length;
	if (completionRateEl) completionRateEl.textContent = completionRate + "%";
	if (demeritsIssuedCountEl)
		demeritsIssuedCountEl.textContent = demeritTasksCount;
	window.renderUserActivityLog();
	window.renderUserProgress();
};

/**
 * Renders the user activity log on the dashboard.
 */
window.renderUserActivityLog = function () {
	var activityLogEl = document.getElementById("userActivityLog");
	if (!activityLogEl) return;
	var filteredActivityLog = window.userActivityLog.filter(function (a) {
		return a.user === "schinken" || a.user === "skeen";
	});
	if (filteredActivityLog.length === 0) {
		activityLogEl.innerHTML =
			'<div class="empty-state">No user activity recorded</div>';
	} else {
		activityLogEl.innerHTML = filteredActivityLog
			.slice(0, 20)
			.map(function (activity) {
				var actionText;
				if (activity.user === "schinken") {
					actionText =
						activity.action === "login"
							? "🔓 User Logged In"
							: "🔒 User Logged Out";
				} else {
					actionText =
						activity.action === "login"
							? "🔓 Admin Logged In"
							: "🔒 Admin Logged Out";
				}
				return (
					'<div class="activity-item">' +
					'<div class="activity-action activity-' +
					activity.action +
					'">' +
					actionText +
					"</div>" +
					'<div class="activity-time">' +
					window.formatDate(activity.timestamp) +
					"</div>" +
					"</div>"
				);
			})
			.join("");
	}
};

/**
 * Renders the user's progress summary on the dashboard.
 */
window.renderUserProgress = function () {
	var progressList = document.getElementById("userProgressList");
	if (!progressList) return;
	var user = window.users["schinken"];
	var userTasks = window.tasks.filter(function (t) {
		return t.assignedTo === "schinken" && t.type !== "demerit";
	});
	var completed = userTasks.filter(function (t) {
		return t.status === "completed";
	});
	var pending = userTasks.filter(function (t) {
		return t.status === "todo" || t.status === "pending_approval";
	});
	var overdue = userTasks.filter(function (t) {
		return window.isTaskOverdue(t) && t.status !== "completed";
	});
	var demeritTasks = window.tasks.filter(function (t) {
		return t.type === "demerit" && t.assignedTo === "schinken";
	});
	var completionRate =
		userTasks.length > 0
			? Math.round((completed.length / userTasks.length) * 100)
			: 0;
	progressList.innerHTML =
		'<div class="progress-item">' +
		"<div>" +
		'<div class="user-name">' +
		user.displayName +
		"</div>" +
		'<div class="progress-bar">' +
		'<div class="progress-fill" style="width: ' +
		completionRate +
		'%"></div>' +
		"</div>" +
		"</div>" +
		'<div class="user-stats">' +
		"<span>" +
		user.points +
		" pts</span>" +
		"<span>" +
		completed.length +
		" done</span>" +
		"<span>" +
		pending.length +
		" pending</span>" +
		"<span>" +
		overdue.length +
		" overdue</span>" +
		"<span>" +
		demeritTasks.length +
		" demerits</span>" +
		"</div>" +
		"</div>";
};

/**
 * Updates the overall statistics displayed in the footer.
 */
window.updateStats = function () {
	var relevantTasks = window.tasks.filter(function (t) {
		return (
			window.currentUser === "skeen" ||
			t.assignedTo === window.currentUser
		);
	});
	var total = relevantTasks.filter(function (t) {
		return t.type !== "demerit";
	}).length;
	var pending = relevantTasks.filter(function (t) {
		return (
			(t.status === "todo" || t.status === "pending_approval") &&
			t.type !== "demerit"
		);
	}).length;
	var completed = relevantTasks.filter(function (t) {
		return t.status === "completed";
	}).length;
	var totalTasksEl = document.getElementById("totalTasksStat");
	var pendingCountEl = document.getElementById("pendingCountStat");
	var completedCountEl = document.getElementById("completedCountStat");
	var myPointsEl = document.getElementById("myPointsStat");
	if (totalTasksEl) totalTasksEl.textContent = total;
	if (pendingCountEl) pendingCountEl.textContent = pending;
	if (completedCountEl) completedCountEl.textContent = completed;
	if (myPointsEl)
		myPointsEl.textContent = window.users[window.currentUser]
			? window.users[window.currentUser].points
			: 0;
};
