// ui.dashboard.js
// This file contains all the UI rendering functions for the dashboard.

/**
 * Renders the dashboard view with user stats, activity log, and admin controls.
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

	// Add admin points control to the dashboard stats
	window.addAdminPointsControl();

	window.renderUserActivityLog();
	window.renderUserProgress();
};

/**
 * Adds the admin points control to the dashboard
 */
// In js/ui-dashboard.js, update the addAdminPointsControl function:

window.addAdminPointsControl = function () {
	if (!window.hasPermission("manage_users")) return;

	// Check if control already exists
	if (document.getElementById("adminPointsControl")) {
		// If it exists, just update it
		window.updateAdminPointsDisplay();
		return;
	}

	const dashboardStats = document.querySelector(".dashboard-stats");
	if (!dashboardStats) return;

	const userPoints = window.users["schinken"].points || 0;
	let pointsColor =
		userPoints < 0 ? "#ff6b6b" : userPoints === 0 ? "#ffff00" : "#00ff00";

	const pointsControlCard = document.createElement("div");
	pointsControlCard.className = "stat-card";
	pointsControlCard.id = "adminPointsControl";
	pointsControlCard.innerHTML = `
		<h3>👑 Admin: Set User Points</h3>
		<div class="stat-number" style="color: ${pointsColor}; margin-bottom: 15px;">${userPoints}</div>
		<div style="display: flex; gap: 10px; align-items: center;">
			<input 
				type="number" 
				id="adminPointsInput" 
				class="form-input" 
				placeholder="New points value"
				value="${userPoints}"
				style="width: 120px; padding: 8px; font-size: 14px;"
				onkeypress="if(event.key==='Enter') window.setUserPoints()"
				onfocus="this.select()"
			>
			<button 
				class="action-btn approve-btn" 
				onclick="window.setUserPoints()"
				style="padding: 8px 16px; font-size: 14px;"
			>
				Set
			</button>
		</div>
		<div style="margin-top: 10px; font-size: 12px; color: var(--text-color-medium);">
			Current: ${window.users["schinken"].displayName}
		</div>
	`;

	// Insert the control card at the beginning of dashboard stats
	dashboardStats.insertBefore(pointsControlCard, dashboardStats.firstChild);
};

// Update the updateAdminPointsDisplay function to ensure input shows current points:
window.updateAdminPointsDisplay = function () {
	const pointsControl = document.getElementById("adminPointsControl");
	if (!pointsControl) return;

	const userPoints = window.users["schinken"].points || 0;
	let pointsColor =
		userPoints < 0 ? "#ff6b6b" : userPoints === 0 ? "#ffff00" : "#00ff00";

	const statNumber = pointsControl.querySelector(".stat-number");
	const input = pointsControl.querySelector("#adminPointsInput");

	if (statNumber) {
		statNumber.textContent = userPoints;
		statNumber.style.color = pointsColor;
	}
	if (input) {
		input.value = userPoints;
		// Also update placeholder to show current value
		input.placeholder = `Current: ${userPoints}`;
	}
};

/**
 * Updates the points display in the admin control
 */
window.updateAdminPointsDisplay = function () {
	const pointsControl = document.getElementById("adminPointsControl");
	if (!pointsControl) return;

	const userPoints = window.users["schinken"].points || 0;
	let pointsColor =
		userPoints < 0 ? "#ff6b6b" : userPoints === 0 ? "#ffff00" : "#00ff00";

	const statNumber = pointsControl.querySelector(".stat-number");
	const input = pointsControl.querySelector("#adminPointsInput");

	if (statNumber) {
		statNumber.textContent = userPoints;
		statNumber.style.color = pointsColor;
	}
	if (input) {
		input.value = userPoints;
	}
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
							: activity.action === "logout"
							? "🔒 User Logged Out"
							: activity.action === "points_changed"
							? "🎯 Points Changed"
							: "📝 " + activity.action;
				} else {
					actionText =
						activity.action === "login"
							? "🔓 Admin Logged In"
							: activity.action === "logout"
							? "🔒 Admin Logged Out"
							: activity.action === "points_changed"
							? "👑 Admin Changed Points"
							: "👑 " + activity.action;
				}

				// Add details if available
				if (activity.details) {
					actionText +=
						"<br><small style='color: var(--text-color-medium);'>" +
						activity.details +
						"</small>";
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
 * Renders the user's progress summary on the dashboard with proper negative points handling.
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

	// Determine point styling based on value
	var pointsClass = "";
	var pointsStyle = "";
	if (user.points < 0) {
		pointsClass = "negative-points";
		pointsStyle =
			"color: #ff6b6b; font-weight: bold; text-shadow: 0 0 5px rgba(255, 107, 107, 0.5);";
	} else if (user.points === 0) {
		pointsStyle = "color: #ffff00; font-weight: bold;";
	} else {
		pointsStyle = "color: #00ff00; font-weight: bold;";
	}

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
		'<span class="' +
		pointsClass +
		'" style="' +
		pointsStyle +
		'">' +
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
 * Updates the overall statistics displayed in the footer with negative points support.
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

	if (myPointsEl && window.users[window.currentUser]) {
		var points = window.users[window.currentUser].points;
		myPointsEl.textContent = points;

		// Style the points based on value
		myPointsEl.className = "stat-number";
		if (points < 0) {
			myPointsEl.classList.add("negative");
			myPointsEl.style.color = "#ff6b6b";
			myPointsEl.style.textShadow = "0 0 10px rgba(255, 107, 107, 0.5)";
		} else if (points === 0) {
			myPointsEl.classList.add("zero");
			myPointsEl.style.color = "#ffff00";
			myPointsEl.style.textShadow = "0 0 10px rgba(255, 255, 0, 0.5)";
		} else {
			myPointsEl.classList.add("positive");
			myPointsEl.style.color = "#00ff00";
			myPointsEl.style.textShadow = "0 0 10px rgba(0, 255, 0, 0.5)";
		}
	}
};
