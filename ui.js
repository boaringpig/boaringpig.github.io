// ui.js
// This file contains functions responsible for rendering the user interface.

// Global variables from main.js or database.js (accessed via window)
// window.currentUser = null;
// window.tasks = [];
// window.suggestions = [];
// window.users = {}; // For display names
// NEW:
// window.rewards = [];
// window.userRewardPurchases = [];
// window.rewardSystemSettings = {};

// Global functions from main.js or database.js (accessed via window)
// window.hasPermission(permission) { ... }
// window.checkOffTask(taskId) { ... }
// window.approveTask(taskId) { ... }
// window.rejectTask(taskId) { ... }
// window.deleteTask(taskId) { ... }
// window.acceptDemerit(taskId) { ... }
// window.appealDemerit(taskId) { ... }
// window.approveAppeal(taskId) { ... }
// window.denyAppeal(taskId) { ... }
// window.approveSuggestion(suggestionId) { ... }
// window.rejectSuggestion(suggestionId) { ... }
// window.isToday(date) { ... }
// window.isTaskOverdue(task) { ... }
// window.getTasksForDate(date) { ... }
// window.loadData() { ... }
// window.updateUserPoints() { ... }
// window.logUserActivity(action) { ... }
// window.checkForOverdueTasks() { ... }
// NEW:
// window.addReward(title, description, cost, type) { ... }
// window.updateReward(rewardId, title, description, cost, type) { ... }
// window.deleteReward(rewardId) { ... }
// window.purchaseReward(rewardId) { ... }
// window.authorizePurchase(purchaseId) { ... }
// window.denyPurchase(purchaseId) { ... }
// window.resetInstantPurchaseLimit() { ... }
// window.updateRewardSystemSettings(limit, resetDuration, requiresAuthAfterLimit) { ... }
// window.checkForRewardLimitReset() { ... }

// Global object to manage refresh button cooldown states
window.refreshButtonStates = {};

// Global FullCalendar instance
var fullCalendarInstance = null;

/**
 * Sets up a refresh button with a cooldown period.
 * @param {string} buttonId - The ID of the refresh button element.
 * @param {number} cooldownSeconds - The cooldown duration in seconds.
 */
window.setupRefreshButton = function (buttonId, cooldownSeconds) {
	var button = document.getElementById(buttonId);
	if (!button) {
		console.warn("Refresh button with ID '" + buttonId + "' not found.");
		return;
	}

	// Initialize state for this button if not already present
	if (!window.refreshButtonStates[buttonId]) {
		window.refreshButtonStates[buttonId] = {
			lastClickTime: 0,
			cooldownTimerId: null,
			originalText: button.textContent, // Store original text
		};
	}

	var state = window.refreshButtonStates[buttonId];

	var updateButtonState = function () {
		var now = Date.now();
		var elapsedTime = now - state.lastClickTime;
		var remainingTime = cooldownSeconds * 1000 - elapsedTime;

		if (remainingTime > 0) {
			button.disabled = true;
			var secondsLeft = Math.ceil(remainingTime / 1000);
			button.textContent = "Refreshing (" + secondsLeft + "s)";
			if (state.cooldownTimerId) {
				clearTimeout(state.cooldownTimerId);
			}
			state.cooldownTimerId = setTimeout(updateButtonState, 1000); // Update every second
		} else {
			button.disabled = false;
			button.textContent = state.originalText;
			if (state.cooldownTimerId) {
				clearTimeout(state.cooldownTimerId);
				state.cooldownTimerId = null;
			}
		}
	};

	// Initial state update when function is called
	updateButtonState();

	button.onclick = function () {
		var now = Date.now();
		var elapsedTime = now - state.lastClickTime;

		if (elapsedTime < cooldownSeconds * 1000) {
			window.showNotification(
				"Please wait " +
					Math.ceil((cooldownSeconds * 1000 - elapsedTime) / 1000) +
					" seconds before refreshing again.",
				"warning"
			);
			return;
		}

		state.lastClickTime = now;
		button.disabled = true;
		button.textContent = "Refreshing...";
		window.showNotification("Refreshing data...", "info");

		// Use Promise-based approach instead of async/await
		if (window.loadData && typeof window.loadData === "function") {
			window
				.loadData()
				.then(function () {
					window.showNotification(
						"Data refreshed successfully!",
						"success"
					);
					updateButtonState(); // Re-enable button or start countdown
				})
				.catch(function (error) {
					console.error("Error refreshing data:", error);
					window.showNotification("Failed to refresh data.", "error");
					updateButtonState(); // Re-enable button or start countdown
				});
		} else {
			window.showNotification(
				"Refresh function not available.",
				"warning"
			);
			updateButtonState();
		}
	};
};

/**
 * Displays an error message on the login screen.
 * @param {string} message - The error message to display.
 */
window.showError = function (message) {
	var errorDiv = document.getElementById("errorMessage");
	if (errorDiv) {
		errorDiv.textContent = message;
		errorDiv.style.display = "block";
	}
};

/**
 * Displays a success message on the login screen.
 * @param {string} message - The success message to display.
 */
window.showSuccess = function (message) {
	var successDiv = document.getElementById("successMessage");
	if (successDiv) {
		successDiv.textContent = message;
		successDiv.style.display = "block";
	}
};

/**
 * Hides both error and success messages on the login screen.
 */
window.hideError = function () {
	var errorDiv = document.getElementById("errorMessage");
	var successDiv = document.getElementById("successMessage");
	if (errorDiv) errorDiv.style.display = "none";
	if (successDiv) successDiv.style.display = "none";
};

/**
 * Displays a transient notification at the top right of the screen.
 * @param {string} message - The message to display.
 * @param {string} type - The type of notification (e.g., 'success', 'error', 'warning').
 */
window.showNotification = function (message, type) {
	if (typeof type === "undefined") type = "success";

	var notification = document.createElement("div");
	notification.className = "notification " + type;
	notification.textContent = message;
	document.body.appendChild(notification);

	setTimeout(function () {
		notification.classList.add("show");
	}, 100);

	setTimeout(function () {
		notification.classList.remove("show");
		setTimeout(function () {
			if (document.body.contains(notification)) {
				document.body.removeChild(notification);
			}
		}, 300);
	}, 3000);
};

/**
 * Switches between different application tabs (Tasks, Calendar, Dashboard, Suggest Task, Rewards Shop, Admin Settings).
 * @param {string} tabName - The name of the tab to switch to (e.g., 'tasks', 'calendar').
 */
window.switchTab = function (tabName) {
	// Remove 'active' class from all navigation tabs
	var tabs = document.querySelectorAll(".nav-tab");
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].classList.remove("active");
	}

	// Find the clicked tab and add 'active' class
	var allTabs = Array.from(document.querySelectorAll(".nav-tab"));
	var clickedTab = allTabs.find(function (tab) {
		return (
			tab.textContent.toLowerCase().indexOf(tabName.toLowerCase()) !== -1
		);
	});
	if (clickedTab) {
		clickedTab.classList.add("active");
	}

	// Hide all tab content sections
	var contents = document.querySelectorAll(".tab-content");
	for (var i = 0; i < contents.length; i++) {
		contents[i].classList.remove("active");
	}

	// Show the target tab content section
	var targetView = document.getElementById(tabName + "View");
	if (targetView) {
		targetView.classList.add("active");
	}

	// Update the global active tab state
	window.activeTab = tabName;

	// Trigger specific rendering functions based on the active tab
	if (tabName === "calendar") {
		window.renderCalendar();
	} else if (
		tabName === "dashboard" &&
		window.hasPermission("view_dashboard")
	) {
		window.renderDashboard();
	} else if (tabName === "suggest") {
		window.renderMySuggestions();
	}
	// NEW: Trigger specific rendering functions for new tabs (Rewards)
	else if (tabName === "shop") {
		window.renderRewards();
		window.renderUserRewardPurchases();
	} else if (tabName === "adminSettings") {
		// Only render admin reward management if the admin has the permission
		if (
			window.currentUser === "admin" &&
			window.hasPermission("manage_rewards")
		) {
			window.renderAdminRewardManagement();
			window.renderPendingAuthorizations();
			window.renderAdminRewardSettings();
		} else {
			// If admin doesn't have permission, ensure these sections are hidden
			const adminRewardManagement = document.getElementById(
				"adminRewardManagement"
			);
			if (adminRewardManagement)
				adminRewardManagement.style.display = "none";
		}
	}
};

/**
 * Displays the login screen.
 */
window.showLogin = function () {
	console.log("showLogin called");
	document.getElementById("loginScreen").style.display = "block";
	document.getElementById("mainApp").style.display = "none";
};

/**
 * Displays the main application interface.
 * Also handles initial data loading and sets up periodic checks.
 */
window.showMainApp = async function () {
	// Made async
	console.log("showMainApp called");
	document.getElementById("loginScreen").style.display = "none";
	document.getElementById("mainApp").style.display = "block";

	var user = window.users[window.currentUser];
	document.getElementById("userBadge").textContent = user.displayName;

	var userPointsBadge = document.getElementById("userPoints");
	if (userPointsBadge) {
		if (user.role === "admin") {
			userPointsBadge.style.display = "none"; // Hide points for admin
		} else {
			userPointsBadge.style.display = "inline-block"; // Show points for user
		}
	}

	// Log user login activity
	window.logUserActivity("login");

	// Adjust visibility of dashboard, suggest, shop, and admin settings tabs based on user role
	var dashboardTab = document.getElementById("dashboardTab");
	var suggestTab = document.getElementById("suggestTab");
	var shopTab = document.getElementById("shopTab"); // NEW
	var adminSettingsTab = document.getElementById("adminSettingsTab"); // NEW

	if (window.currentUser === "admin") {
		if (dashboardTab) dashboardTab.style.display = "block";
		if (suggestTab) suggestTab.style.display = "none";
		if (shopTab) shopTab.style.display = "none"; // Admin doesn't need to see shop tab
		// Only show admin settings tab if admin has 'manage_rewards' permission
		if (adminSettingsTab)
			adminSettingsTab.style.display = window.hasPermission(
				"manage_rewards"
			)
				? "block"
				: "none";

		document.getElementById("adminView").style.display = "block";
		document.getElementById("userView").style.display = "none";
		// NEW: Show/Hide admin reward management section based on permission
		const adminRewardManagement = document.getElementById(
			"adminRewardManagement"
		);
		if (adminRewardManagement)
			adminRewardManagement.style.display = window.hasPermission(
				"manage_rewards"
			)
				? "block"
				: "none";
	} else {
		// Regular user
		if (dashboardTab) dashboardTab.style.display = "none";
		if (suggestTab) suggestTab.style.display = "block";
		if (shopTab) shopTab.style.display = "block"; // Show shop tab for user
		if (adminSettingsTab) adminSettingsTab.style.display = "none"; // Hide admin settings tab

		document.getElementById("adminView").style.display = "none";
		document.getElementById("userView").style.display = "block";
		// NEW: Hide admin reward management section for regular users
		const adminRewardManagement = document.getElementById(
			"adminRewardManagement"
		);
		if (adminRewardManagement) adminRewardManagement.style.display = "none";
	}

	// Event listeners for task creation form elements
	var isRepeatingCheckbox = document.getElementById("isRepeating");
	if (isRepeatingCheckbox) {
		isRepeatingCheckbox.addEventListener("change", function () {
			var repeatOptions = document.getElementById("repeatOptions");
			if (repeatOptions) {
				repeatOptions.style.display = this.checked ? "block" : "none";
			}
		});
	}

	var isDemeritCheckbox = document.getElementById("isDemerit");
	if (isDemeritCheckbox) {
		isDemeritCheckbox.addEventListener("change", function () {
			var demeritWarning = document.getElementById("demeritWarning");
			if (demeritWarning) {
				demeritWarning.style.display = this.checked ? "block" : "none";
			}
			var taskPointsEl = document.getElementById("taskPoints");
			var penaltyPointsEl = document.getElementById("penaltyPoints");
			var taskDueDateEl = document.getElementById("taskDueDate");

			// Toggle visibility of fields based on demerit status
			if (this.checked) {
				if (taskPointsEl)
					taskPointsEl.closest(".form-group").style.display = "none";
				if (taskDueDateEl)
					taskDueDateEl.closest(".form-group").style.display = "none";
				if (penaltyPointsEl)
					penaltyPointsEl.closest(".form-group").style.display =
						"block";
			} else {
				if (taskPointsEl)
					taskPointsEl.closest(".form-group").style.display = "block";
				if (taskDueDateEl)
					taskDueDateEl.closest(".form-group").style.display =
						"block";
				if (penaltyPointsEl)
					penaltyPointsEl.closest(".form-group").style.display =
						"block";
			}
		});
	}

	// Load initial data from Supabase and set up real-time listeners
	if (window.loadData && typeof window.loadData === "function") {
		await window
			.loadData()
			.then(function () {
				// Update user points display AFTER data is loaded
				if (
					window.updateUserPoints &&
					typeof window.updateUserPoints === "function"
				) {
					window.updateUserPoints();
				}
				// Render the calendar
				window.renderCalendar();

				// Setup refresh buttons
				window.setupRefreshButton("refreshDataBtnUser", 30); // User refresh button
				window.setupRefreshButton("refreshDataBtnAdmin", 30); // Admin refresh button

				// Clear any existing overdue check interval and start a new one
				if (window.overdueCheckIntervalId) {
					clearInterval(window.overdueCheckIntervalId);
				}
				if (
					window.checkForOverdueTasks &&
					window.OVERDUE_CHECK_INTERVAL
				) {
					window.overdueCheckIntervalId = setInterval(
						window.checkForOverdueTasks,
						window.OVERDUE_CHECK_INTERVAL
					);
				}

				// NEW: Initial rendering for reward sections based on current user/tab and permissions
				if (
					window.currentUser === "admin" &&
					window.hasPermission("manage_rewards")
				) {
					window.renderAdminRewardManagement();
					window.renderPendingAuthorizations();
					window.renderAdminRewardSettings();
				} else if (window.currentUser !== "admin") {
					// Regular user
					window.renderRewards();
					window.renderUserRewardPurchases();
				}
			})
			.catch(function (error) {
				console.error("Error loading data:", error);
				window.showNotification("Failed to load data.", "error");
			});
	} else {
		// If loadData is not available, just continue
		console.warn("loadData function not available, skipping data loading");
		window.renderCalendar();
	}
};

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
	// Filter tasks for pending appeals (demerit tasks with pending appeal status)
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

	// Filter and render suggested tasks pending approval
	var suggestedTasksContainer = document.getElementById("suggestedTasks");
	var pendingSuggestions = window.suggestions.filter(function (s) {
		return s.status === "pending";
	});

	if (suggestedTasksContainer) {
		if (pendingSuggestions.length === 0) {
			suggestedTasksContainer.innerHTML =
				'<div class="empty-state">No task suggestions pending approval</div>';
		} else {
			suggestedTasksContainer.innerHTML = pendingSuggestions
				.map(function (suggestion) {
					return (
						'<div class="task-item">' +
						'<div class="task-content">' +
						"<div>" +
						'<span class="task-text">' +
						window.escapeHtml(suggestion.description) +
						"</span>" +
						'<div class="task-meta">' +
						"Suggested by: " +
						(window.users[suggestion.suggestedBy]
							? window.users[suggestion.suggestedBy].displayName
							: suggestion.suggestedBy) +
						"<br>Points: " +
						suggestion.suggestedPoints +
						(suggestion.justification
							? "<br>Reason: " +
							  window.escapeHtml(suggestion.justification)
							: "") +
						(suggestion.suggestedDueDate
							? "<br>Due: " +
							  window.formatDate(suggestion.suggestedDueDate)
							: "") +
						"</div>" +
						"</div>" +
						'<div class="task-actions">' +
						'<button class="action-btn approve-btn" onclick="approveSuggestion(' +
						suggestion.id +
						')">Approve</button>' +
						'<button class="action-btn reject-btn" onclick="rejectSuggestion(' +
						suggestion.id +
						')">Reject</button>' +
						"</div>" +
						"</div>" +
						"</div>"
					);
				})
				.join("");
		}
	}

	// Filter and render tasks pending approval (regular tasks)
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

	// Render all tasks for the admin view
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
};

/**
 * Renders the user's view of tasks, including regular tasks and demerit tasks.
 */
window.renderUserView = function () {
	// Filter tasks assigned to the current user
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
};

/**
 * Renders suggestions. This function primarily acts as a dispatcher to renderMySuggestions.
 */
window.renderSuggestions = function () {
	if (window.activeTab === "suggest") {
		window.renderMySuggestions();
	}
};

/**
 * Renders the list of suggestions made by the current user.
 */
window.renderMySuggestions = function () {
	var mySuggestions = window.suggestions.filter(function (s) {
		return s.suggestedBy === window.currentUser;
	});
	var container = document.getElementById("mySuggestions");

	if (!container) return;

	if (mySuggestions.length === 0) {
		container.innerHTML =
			'<div class="empty-state">No suggestions submitted yet</div>';
	} else {
		container.innerHTML = mySuggestions
			.map(function (suggestion) {
				return (
					'<div class="task-item">' +
					'<div class="task-content">' +
					"<div>" +
					'<span class="status-badge ' +
					window.getSuggestionStatusClass(suggestion.status) +
					'">' +
					suggestion.status.charAt(0).toUpperCase() +
					suggestion.status.slice(1) +
					"</span>" +
					'<span class="task-text">' +
					window.escapeHtml(suggestion.description) +
					"</span>" +
					'<span class="points-badge-small">' +
					suggestion.suggestedPoints +
					" pts</span>" +
					'<div class="task-meta">' +
					"Submitted: " +
					window.formatDate(suggestion.createdAt) +
					(suggestion.suggestedDueDate
						? "<br>Suggested due: " +
						  window.formatDate(suggestion.suggestedDueDate)
						: "") +
					(suggestion.reviewedAt
						? "<br>Reviewed: " +
						  window.formatDate(suggestion.reviewedAt) +
						  " by " +
						  (window.users[suggestion.reviewedBy]
								? window.users[suggestion.reviewedBy]
										.displayName
								: suggestion.reviewedBy)
						: "") +
					"</div>" +
					"</div>" +
					"</div>" +
					"</div>"
				);
			})
			.join("");
	}
};

/**
 * Renders the calendar view using FullCalendar.
 */
window.renderCalendar = function () {
	var calendarEl = document.getElementById("fullcalendar");
	if (!calendarEl) return;

	// Destroy existing calendar instance if it exists to prevent duplicates
	if (fullCalendarInstance) {
		fullCalendarInstance.destroy();
	}

	// Check if tasks exist and filter them safely
	var calendarEvents = [];
	if (window.tasks && Array.isArray(window.tasks)) {
		calendarEvents = window.tasks
			.filter(function (task) {
				return (
					task &&
					task.assignedTo === window.currentUser &&
					task.dueDate
				);
			})
			.map(function (task) {
				if (task.isRepeating && task.repeatInterval && task.dueDate) {
					// For repeating tasks, use rrule if available
					if (typeof RRule !== "undefined") {
						var rruleFreq;
						switch (task.repeatInterval) {
							case "daily":
								rruleFreq = RRule.DAILY;
								break;
							case "weekly":
								rruleFreq = RRule.WEEKLY;
								break;
							case "monthly":
								rruleFreq = RRule.MONTHLY;
								break;
							default:
								rruleFreq = RRule.DAILY;
						}

						return {
							id: task.id,
							title: task.text,
							rrule: {
								freq: rruleFreq,
								dtstart: task.dueDate,
								count: 10,
							},
							duration: "01:00",
							description: task.text,
							classNames: ["fc-event-repeating"],
							extendedProps: {
								originalTask: task,
							},
						};
					} else {
						// Fallback to regular event if RRule not available
						return {
							id: task.id,
							title: task.text + " (Repeating)",
							start: task.dueDate,
							allDay: !task.dueDate || task.dueDate.length === 10,
							description: task.text,
							classNames: ["fc-event-repeating"],
							extendedProps: {
								originalTask: task,
							},
						};
					}
				} else {
					// For normal (non-repeating) tasks
					return {
						id: task.id,
						title: task.text,
						start: task.dueDate,
						end: task.endDateTime || null,
						allDay: !task.dueDate || task.dueDate.length === 10,
						description: task.text,
						classNames: ["fc-event-normal"],
						extendedProps: {
							originalTask: task,
						},
					};
				}
			});
	}

	// Create calendar configuration
	var calendarConfig = {
		initialView: "dayGridMonth",
		headerToolbar: {
			left: "prev,next today",
			center: "title",
			right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
		},
		height: "auto",
		contentHeight: "auto",
		aspectRatio: 1.8,
		events: calendarEvents,
		eventClick: function (info) {
			var task = info.event.extendedProps.originalTask;

			var start = task.dueDate ? window.formatDate(task.dueDate) : "N/A";
			var end = task.endDateTime
				? window.formatDate(task.endDateTime)
				: "N/A";
			var allDay =
				task.dueDate && task.dueDate.length === 10 ? "Yes" : "No";
			var description = task.text || "No description available.";
			var eventType = task.isRepeating
				? "Repeating Task"
				: "One-time Task";
			var statusText = window.getStatusText(
				task.status,
				window.isTaskOverdue(task),
				task.type,
				task.appealStatus
			);

			var modalHtml =
				'<h3 class="text-xl font-semibold mb-2 text-gray-900">' +
				window.escapeHtml(task.text) +
				"</h3>" +
				'<p class="text-gray-700 mb-1"><strong>Type:</strong> ' +
				eventType +
				"</p>" +
				'<p class="text-gray-700 mb-1"><strong>Status:</strong> ' +
				statusText +
				"</p>" +
				'<p class="text-gray-700 mb-1"><strong>Start:</strong> ' +
				start +
				"</p>" +
				(task.endDateTime
					? '<p class="text-gray-700 mb-1"><strong>End:</strong> ' +
					  end +
					  "</p>"
					: "") +
				'<p class="text-gray-700 mb-1"><strong>All Day:</strong> ' +
				allDay +
				"</p>" +
				'<p class="text-gray-700 mt-3"><strong>Description:</strong> ' +
				window.escapeHtml(description) +
				"</p>" +
				(task.points
					? '<p class="text-gray-700 mb-1"><strong>Points:</strong> ' +
					  task.points +
					  "</p>"
					: "") +
				(task.penaltyPoints
					? '<p class="text-gray-700 mb-1"><strong>Penalty:</strong> ' +
					  task.penaltyPoints +
					  "</p>"
					: "") +
				(task.createdBy
					? '<p class="text-gray-700 mb-1"><strong>Created By:</strong> ' +
					  (window.users[task.createdBy]
							? window.users[task.createdBy].displayName
							: task.createdBy) +
					  "</p>"
					: "") +
				(task.completedBy
					? '<p class="text-gray-700 mb-1"><strong>Completed By:</strong> ' +
					  (window.users[task.completedBy]
							? window.users[task.completedBy].displayName
							: task.completedBy) +
					  "</p>"
					: "") +
				(task.approvedBy
					? '<p class="text-gray-700 mb-1"><strong>Approved By:</strong> ' +
					  (window.users[task.approvedBy]
							? window.users[task.approvedBy].displayName
							: task.approvedBy) +
					  "</p>"
					: "") +
				(task.appealText
					? '<p class="text-gray-700 mb-1"><strong>Appeal Reason:</strong> ' +
					  window.escapeHtml(task.appealText) +
					  "</p>"
					: "");

			window.showModal(modalHtml);
		},
	};

	// Try to create calendar, fallback gracefully if plugins aren't available
	try {
		fullCalendarInstance = new FullCalendar.Calendar(
			calendarEl,
			calendarConfig
		);
		fullCalendarInstance.render();
	} catch (error) {
		console.error("Error initializing FullCalendar:", error);
		// Fallback: show a simple message
		var fallbackHtml =
			'<div style="padding: 20px; text-align: center; color: #666;">' +
			"<h3>Calendar Loading...</h3>" +
			"<p>There was an issue loading the calendar. Please refresh the page.</p>" +
			'<div style="margin-top: 20px;">' +
			"<strong>Tasks with due dates:</strong><br>";

		if (calendarEvents.length > 0) {
			fallbackHtml += calendarEvents
				.map(function (event) {
					return (
						"• " + event.title + " - " + (event.start || "No date")
					);
				})
				.join("<br>");
		} else {
			fallbackHtml += "No tasks scheduled";
		}

		fallbackHtml += "</div></div>";
		calendarEl.innerHTML = fallbackHtml;
	}
};

/**
 * Helper function to calculate duration for rrule events.
 * Assumes start and end are ISO strings.
 */
function calculateDuration(startStr, endStr) {
	if (!startStr || !endStr) return "01:00";

	var start = new Date(startStr);
	var end = new Date(endStr);
	var diffMs = end.getTime() - start.getTime();

	var hours = Math.floor(diffMs / (1000 * 60 * 60));
	var minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

	var pad = function (num) {
		return num < 10 ? "0" + num : num;
	};
	return pad(hours) + ":" + pad(minutes);
}

/**
 * Renders the dashboard view with user stats and activity log.
 * This view is typically for admin users.
 */
window.renderDashboard = function () {
	if (!window.hasPermission("view_dashboard")) return;

	// Filter activity log to show only 'user' activity for status
	var userActivity = window.userActivityLog.filter(function (a) {
		return a.user === "user";
	});
	var lastActivity = userActivity[0];
	var isUserOnline = lastActivity && lastActivity.action === "login";

	// Calculate task statistics for the 'user'
	var activeTasks = window.tasks.filter(function (t) {
		return (
			t.status !== "completed" &&
			t.type !== "demerit" &&
			t.assignedTo === "user"
		);
	});
	var completedTasks = window.tasks.filter(function (t) {
		return t.status === "completed" && t.assignedTo === "user";
	});
	var allNonDemeritTasks = window.tasks.filter(function (t) {
		return t.type !== "demerit" && t.assignedTo === "user";
	});
	var completionRate =
		allNonDemeritTasks.length > 0
			? Math.round(
					(completedTasks.length / allNonDemeritTasks.length) * 100
			  )
			: 0;

	// Calculate demerit tasks issued
	var demeritTasksCount = window.tasks.filter(function (t) {
		return t.type === "demerit";
	}).length;

	// Update UI elements
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
	if (demeritsIssuedCountEl) {
		demeritsIssuedCountEl.textContent = demeritTasksCount;
	}

	// Render detailed activity log and user progress
	window.renderUserActivityLog();
	window.renderUserProgress();
};

/**
 * Renders the user activity log on the dashboard.
 */
window.renderUserActivityLog = function () {
	var activityLogEl = document.getElementById("userActivityLog");
	if (!activityLogEl) return;

	// Filter activity log to only show activity for 'user' and 'admin'
	var filteredActivityLog = window.userActivityLog.filter(function (a) {
		return a.user === "user" || a.user === "admin";
	});

	if (filteredActivityLog.length === 0) {
		activityLogEl.innerHTML =
			'<div class="empty-state">No user activity recorded</div>';
	} else {
		activityLogEl.innerHTML = filteredActivityLog
			.slice(0, 20)
			.map(function (activity) {
				var actionText;
				if (activity.user === "user") {
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

	var user = window.users["user"];
	var userTasks = window.tasks.filter(function (t) {
		return t.assignedTo === "user" && t.type !== "demerit";
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
		return t.type === "demerit" && t.assignedTo === "user";
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
 * Updates the overall statistics displayed in the footer (Total Tasks, Pending, Completed, My Points).
 */
window.updateStats = function () {
	// Filter tasks relevant to the current user (all for admin, assigned for user)
	var relevantTasks = window.tasks.filter(function (t) {
		return (
			window.currentUser === "admin" ||
			t.assignedTo === window.currentUser
		);
	});

	// Calculate statistics, excluding demerit tasks from total/pending/completed counts
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

	// Get references to the stat elements
	var totalTasksEl = document.getElementById("totalTasksStat");
	var pendingCountEl = document.getElementById("pendingCountStat");
	var completedCountEl = document.getElementById("completedCountStat");
	var myPointsEl = document.getElementById("myPointsStat");

	// Update text content of stat elements
	if (totalTasksEl) totalTasksEl.textContent = total;
	if (pendingCountEl) pendingCountEl.textContent = pending;
	if (completedCountEl) completedCountEl.textContent = completed;
	if (myPointsEl)
		myPointsEl.textContent = window.users[window.currentUser]
			? window.users[window.currentUser].points
			: 0;
};

/**
 * Escapes HTML characters in a string to prevent XSS (Cross-Site Scripting) vulnerabilities.
 * @param {string} text - The text to escape.
 * @returns {string} The escaped HTML string.
 */
window.escapeHtml = function (text) {
	var div = document.createElement("div");
	div.textContent = text;
	// Additionally replace backticks to prevent template literal issues in generated HTML
	return div.innerHTML.replace(/`/g, "&#96;");
};

/**
 * Formats an ISO date string into a localized date and time string (e.g., "M/D/YYYY HH:MM AM/PM").
 * @param {string} dateString - The ISO date string to format.
 * @returns {string} The formatted date and time string, or an empty string if input is null/empty.
 */
window.formatDate = function (dateString) {
	if (!dateString) return "";
	var date = new Date(dateString);
	return (
		date.toLocaleDateString() +
		" " +
		date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
	);
};

/**
 * Returns the appropriate CSS class for a task status badge based on its status,
 * overdue status, type (regular/demerit), and appeal status.
 * @param {string} status - The primary status of the task (e.g., 'todo', 'completed', 'pending_approval').
 * @param {boolean} isOverdue - True if the task is overdue.
 * @param {string} type - The type of task ('regular' or 'demerit').
 * @param {string} appealStatus - The appeal status of a demerit task ('pending', 'approved', 'denied', or null).
 * @returns {string} The CSS class name for the status badge.
 */
window.getStatusClass = function (status, isOverdue, type, appealStatus) {
	if (type === "demerit") {
		if (appealStatus === "pending") return "status-pending-appeal";
		if (appealStatus === "approved") return "status-completed";
		if (appealStatus === "denied") return "status-overdue";
		if (status === "demerit_accepted") return "status-demerit-accepted";
		return "status-demerit";
	}
	// For regular tasks
	if (isOverdue) return "status-overdue";
	if (status === "completed") return "status-completed";
	if (status === "failed") return "status-overdue";
	return "status-pending";
};

/**
 * Returns the human-readable text for a task status, considering its type and appeal status.
 * @param {string} status - The primary status of the task.
 * @param {boolean} isOverdue - True if the task is overdue.
 * @param {string} type - The type of task ('regular' or 'demerit').
 * @param {string} appealStatus - The appeal status of a demerit task.
 * @returns {string} The display text for the task status.
 */
window.getStatusText = function (status, isOverdue, type, appealStatus) {
	if (type === "demerit") {
		if (appealStatus === "pending") return "Appeal Pending";
		if (appealStatus === "approved") return "Appeal Approved";
		if (appealStatus === "denied") return "Appeal Denied";
		if (status === "demerit_accepted") return "Demerit Accepted";
		return "Demerit Issued";
	}
	// For regular tasks
	if (isOverdue) return "Overdue";
	if (status === "completed") return "Completed";
	if (status === "failed") return "Failed";
	if (status === "pending_approval") return "Pending Approval";
	return "To Do";
};

/**
 * Returns the appropriate CSS class for a suggestion status badge.
 * @param {string} status - The status of the suggestion ('pending', 'approved', 'rejected').
 * @returns {string} The CSS class name.
 */
window.getSuggestionStatusClass = function (status) {
	switch (status) {
		case "approved":
			return "status-completed";
		case "rejected":
			return "status-overdue";
		default:
			return "status-pending";
	}
};

// --- Modal Helpers ---
// These functions provide custom modal dialogs, replacing native browser alert() and confirm().

/**
 * Displays a generic modal with custom content.
 * @param {string} htmlContent - HTML content to display in the modal.
 */
window.showModal = function (htmlContent) {
	var modal = document.getElementById("eventModal");
	var modalContent = document.getElementById("modalContent");
	var closeButton = document.getElementById("closeModal");

	if (modal && modalContent) {
		modalContent.innerHTML = htmlContent;
		modal.classList.remove("hidden");

		// Close modal when clicking the X button
		if (closeButton) {
			closeButton.onclick = function () {
				modal.classList.add("hidden");
			};
		}

		// Close modal when clicking outside the content
		modal.onclick = function (e) {
			if (e.target === modal) {
				modal.classList.add("hidden");
			}
		};
	}
};

/**
 * Displays a generic confirmation modal with "Confirm" and "Cancel" buttons.
 * @param {string} message - The message to display in the modal.
 * @param {function(boolean): void} onConfirm - Callback function invoked with `true` if confirmed, `false` if canceled.
 */
window.showConfirmModal = function (message, onConfirm) {
	var modal = document.createElement("div");
	modal.className = "modal-overlay";
	modal.innerHTML =
		'<div class="modal-content">' +
		"<p>" +
		message +
		"</p>" +
		'<div class="modal-actions">' +
		'<button id="modalConfirm" class="action-btn approve-btn">Confirm</button>' +
		'<button id="modalCancel" class="action-btn delete-btn">Cancel</button>' +
		"</div>" +
		"</div>";
	document.body.appendChild(modal);

	// Attach event listeners to modal buttons
	document.getElementById("modalConfirm").onclick = function () {
		onConfirm(true);
		document.body.removeChild(modal);
	};
	document.getElementById("modalCancel").onclick = function () {
		onConfirm(false);
		document.body.removeChild(modal);
	};
};

/**
 * Displays a modal specifically for appealing a demerit task, including a text input for the reason.
 * @param {object} task - The demerit task object being appealed.
 * @param {function(string): void} onSubmit - Callback function invoked with the appeal text when submitted.
 */
window.showAppealModal = function (task, onSubmit) {
	var modal = document.createElement("div");
	modal.className = "modal-overlay";
	modal.innerHTML =
		'<div class="modal-content">' +
		"<h3>Appeal Demerit Task</h3>" +
		"<p><strong>Task:</strong> " +
		window.escapeHtml(task.text) +
		"</p>" +
		"<p><strong>Penalty:</strong> -" +
		task.penaltyPoints +
		" points</p>" +
		'<div class="appeal-warning">' +
		'<div class="warning-title">⚠️ Appeal Risk Warning</div>' +
		"<div>If approved: +" +
		task.penaltyPoints +
		" points restored</div>" +
		"<div>If denied: -" +
		task.penaltyPoints +
		" additional points (double penalty)</div>" +
		"<div><strong>Total risk if denied: " +
		task.penaltyPoints * 2 +
		" points</strong></div>" +
		"</div>" +
		'<div class="form-group">' +
		'<label class="form-label" for="appealTextInput">Reason for Appeal (Required)</label>' +
		'<textarea id="appealTextInput" class="form-input" rows="4" placeholder="Explain why you are appealing this demerit..."></textarea>' +
		"</div>" +
		'<div id="appealError" class="error-message" style="display:none; margin-top: 10px;"></div>' +
		'<div class="modal-actions">' +
		'<button id="modalSubmitAppeal" class="action-btn approve-btn">Submit Appeal</button>' +
		'<button id="modalCancelAppeal" class="action-btn delete-btn">Cancel</button>' +
		"</div>" +
		"</div>";
	document.body.appendChild(modal);

	// Event listener for submitting the appeal
	document.getElementById("modalSubmitAppeal").onclick = function () {
		var appealText = document
			.getElementById("appealTextInput")
			.value.trim();
		var appealError = document.getElementById("appealError");
		if (appealText.length < 10) {
			appealError.textContent =
				"Appeal text must be at least 10 characters long.";
			appealError.style.display = "block";
		} else {
			onSubmit(appealText);
			document.body.removeChild(modal);
		}
	};

	// Event listener for canceling the appeal
	document.getElementById("modalCancelAppeal").onclick = function () {
		document.body.removeChild(modal);
	};
};

// Make fullCalendarInstance globally available for other files
window.fullCalendarInstance = fullCalendarInstance;

// NEW: Rendering functions for rewards
window.renderRewards = function () {
	const rewardsListContainer = document.getElementById("rewardsList");
	if (!rewardsListContainer) return;

	if (window.rewards.length === 0) {
		rewardsListContainer.innerHTML =
			'<div class="empty-state">No rewards available.</div>';
	} else {
		rewardsListContainer.innerHTML = window.rewards
			.map(
				(reward) => `
            <div class="reward-card">
                <h3>${window.escapeHtml(reward.title)}</h3>
                <p class="description">${window.escapeHtml(
					reward.description
				)}</p>
                <div class="cost-badge">${reward.cost} Points</div>
                <div class="type-badge type-${reward.type}">${
					reward.type === "instant"
						? "Instant Purchase"
						: "Authorization Required"
				}</div>
                ${
					window.currentUser !== "admin"
						? `
                    <button class="purchase-btn" onclick="window.purchaseReward(${reward.id})">Purchase</button>
                `
						: ""
				}
            </div>
        `
			)
			.join("");
	}
};

window.renderUserRewardPurchases = function () {
	const myPurchasesContainer = document.getElementById("myRewardPurchases");
	const pendingAuthorizationsContainer = document.getElementById(
		"pendingAuthorizations"
	); // For admin view

	if (myPurchasesContainer) {
		// Filter purchases relevant to the current user (all for admin, assigned for user)
		const relevantPurchases = window.userRewardPurchases.filter(
			(p) =>
				window.currentUser === "admin" ||
				p.userId === window.currentUser
		);

		const userPurchases = relevantPurchases.filter(
			(p) => p.userId === window.currentUser
		);

		if (userPurchases.length === 0) {
			myPurchasesContainer.innerHTML =
				'<div class="empty-state">No purchases yet.</div>';
		} else {
			myPurchasesContainer.innerHTML = userPurchases
				.map(
					(purchase) => `
                <div class="purchase-item status-${purchase.status}">
                    <div class="purchase-content">
                        <h4>${window.escapeHtml(
							purchase.rewards.title || "Unknown Reward"
						)}</h4>
                        <p>Cost: ${purchase.purchaseCost} Points</p>
                        <p>Status: <span class="status-badge ${window.getPurchaseStatusClass(
							purchase.status
						)}">${purchase.status.replace(/_/g, " ")}</span></p>
                        <p>Date: ${window.formatDate(purchase.purchaseDate)}</p>
                        ${
							purchase.status === "denied" && purchase.notes
								? `<p class="notes">Reason: ${window.escapeHtml(
										purchase.notes
								  )}</p>`
								: ""
						}
                    </div>
                </div>
            `
				)
				.join("");
		}
	}

	// Render pending authorizations for admin
	if (window.currentUser === "admin" && pendingAuthorizationsContainer) {
		const pendingAuths = window.userRewardPurchases.filter(
			(p) => p.status === "pending_authorization"
		);
		if (pendingAuths.length === 0) {
			pendingAuthorizationsContainer.innerHTML =
				'<div class="empty-state">No pending authorizations.</div>';
		} else {
			pendingAuthorizationsContainer.innerHTML = pendingAuths
				.map(
					(purchase) => `
                <div class="purchase-item pending-approval">
                    <div class="purchase-content">
                        <h4>${window.escapeHtml(
							purchase.rewards.title || "Unknown Reward"
						)} by ${
						window.users[purchase.userId]?.displayName ||
						purchase.userId
					}</h4>
                        <p>Cost: ${purchase.purchaseCost} Points</p>
                        <p>Requested: ${window.formatDate(
							purchase.purchaseDate
						)}</p>
                    </div>
                    <div class="purchase-actions">
                        <button class="action-btn approve-btn" onclick="window.authorizePurchase(${
							purchase.id
						})">Authorize</button>
                        <button class="action-btn reject-btn" onclick="window.denyPurchase(${
							purchase.id
						})">Deny</button>
                    </div>
                </div>
            `
				)
				.join("");
		}
	}
};

// Admin view for managing rewards
window.renderAdminRewardManagement = function () {
	const currentRewardsList = document.getElementById("currentRewardsList");
	const rewardCreationForm = document.querySelector(".reward-creation-form"); // Select the form itself
	if (!currentRewardsList || !rewardCreationForm) return;

	// Hide the reward management sections if admin doesn't have permission
	if (!window.hasPermission("manage_rewards")) {
		rewardCreationForm.style.display = "none";
		currentRewardsList.closest(".task-section").style.display = "none"; // Hide the whole section
		return;
	} else {
		rewardCreationForm.style.display = "block";
		currentRewardsList.closest(".task-section").style.display = "block";
	}

	if (window.rewards.length === 0) {
		currentRewardsList.innerHTML =
			'<div class="empty-state">No rewards defined.</div>';
	} else {
		currentRewardsList.innerHTML = window.rewards
			.map(
				(reward) => `
            <div class="task-item">
                <div class="task-content">
                    <div>
                        <span class="status-badge type-${reward.type}">${
					reward.type === "instant" ? "Instant" : "Authorized"
				}</span>
                        <span class="task-text">${window.escapeHtml(
							reward.title
						)}</span>
                        <span class="points-badge-small">${
							reward.cost
						} pts</span>
                        <div class="task-meta">
                            ${window.escapeHtml(reward.description)}
                            <br>Created: ${window.formatDate(
								reward.createdAt
							)} by ${
					window.users[reward.createdBy]?.displayName ||
					reward.createdBy
				}
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="action-btn check-btn" onclick="window.editReward(${
							reward.id
						})">Edit</button>
                        <button class="action-btn delete-btn" onclick="window.deleteReward(${
							reward.id
						})">Delete</button>
                    </div>
                </div>
            </div>
        `
			)
			.join("");
	}
};

// Admin view for reward system settings
window.renderAdminRewardSettings = function () {
	const instantLimitInput = document.getElementById("instantLimitInput");
	const resetDurationInput = document.getElementById("resetDurationInput");
	const requiresAuthAfterLimitCheckbox = document.getElementById(
		"requiresAuthAfterLimit"
	);
	const currentInstantSpendDisplay = document.getElementById(
		"currentInstantSpendDisplay"
	);
	const instantLimitDisplay = document.getElementById("instantLimitDisplay");
	const lastResetDateDisplay = document.getElementById(
		"lastResetDateDisplay"
	);
	const settingsSection = document.querySelector(
		"#adminRewardManagement .task-section:nth-child(3)"
	); // Select the settings section

	if (!settingsSection) return;

	// Hide the settings section if admin doesn't have permission
	if (!window.hasPermission("manage_rewards")) {
		settingsSection.style.display = "none";
		return;
	} else {
		settingsSection.style.display = "block";
	}

	const settings = window.rewardSystemSettings;

	if (instantLimitInput)
		instantLimitInput.value = settings.instantPurchaseLimit || 0;
	if (resetDurationInput)
		resetDurationInput.value = settings.resetDurationDays || 0;
	if (requiresAuthAfterLimitCheckbox)
		requiresAuthAfterLimitCheckbox.checked =
			settings.requiresAuthorizationAfterLimit !== false;

	if (currentInstantSpendDisplay)
		currentInstantSpendDisplay.textContent =
			settings.currentInstantSpend || 0;
	if (instantLimitDisplay)
		instantLimitDisplay.textContent = settings.instantPurchaseLimit || 0;
	if (lastResetDateDisplay)
		lastResetDateDisplay.textContent = settings.lastResetAt
			? window.formatDate(settings.lastResetAt)
			: "N/A";
};

// Update reward settings from UI inputs
window.updateRewardSettingsUI = function () {
	// Add permission check here as well, although buttons are hidden
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to update reward settings",
			"error"
		);
		return;
	}

	const instantLimit = parseInt(
		document.getElementById("instantLimitInput").value
	);
	const resetDuration = parseInt(
		document.getElementById("resetDurationInput").value
	);
	const requiresAuth = document.getElementById(
		"requiresAuthAfterLimit"
	).checked;

	if (isNaN(instantLimit) || instantLimit < 0) {
		window.showNotification(
			"Instant purchase limit must be a non-negative number.",
			"error"
		);
		return;
	}
	if (isNaN(resetDuration) || resetDuration < 0) {
		window.showNotification(
			"Reset duration must be a non-negative number of days.",
			"error"
		);
		return;
	}

	window.updateRewardSystemSettings(
		instantLimit,
		resetDuration,
		requiresAuth
	);
};

// Populate form for editing a reward
window.editReward = function (rewardId) {
	// Add permission check
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to edit rewards",
			"error"
		);
		return;
	}

	const reward = window.rewards.find((r) => r.id === rewardId);
	if (!reward) return;

	document.getElementById("rewardIdToEdit").value = reward.id;
	document.getElementById("rewardTitle").value = reward.title;
	document.getElementById("rewardDescription").value = reward.description;
	document.getElementById("rewardCost").value = reward.cost;
	document.getElementById("rewardType").value = reward.type;

	document.getElementById("saveRewardBtn").textContent = "Update Reward";
	document.getElementById("cancelEditRewardBtn").style.display =
		"inline-block";
};

// Cancel editing a reward
window.cancelEditReward = function () {
	document.getElementById("rewardIdToEdit").value = "";
	document.getElementById("rewardTitle").value = "";
	document.getElementById("rewardDescription").value = "";
	document.getElementById("rewardCost").value = "10";
	document.getElementById("rewardType").value = "instant";

	document.getElementById("saveRewardBtn").textContent = "Add Reward";
	document.getElementById("cancelEditRewardBtn").style.display = "none";
};

// Save reward (add or update)
window.saveReward = function () {
	// Add permission check
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to save rewards",
			"error"
		);
		return;
	}

	const rewardId = document.getElementById("rewardIdToEdit").value;
	const title = document.getElementById("rewardTitle").value.trim();
	const description = document
		.getElementById("rewardDescription")
		.value.trim();
	const cost = parseInt(document.getElementById("rewardCost").value);
	const type = document.getElementById("rewardType").value;

	if (!title || isNaN(cost) || cost < 1) {
		window.showNotification(
			"Please enter a valid title and cost for the reward.",
			"error"
		);
		return;
	}

	if (rewardId) {
		window.updateReward(parseInt(rewardId), title, description, cost, type);
	} else {
		window.addReward(title, description, cost, type);
	}
	window.cancelEditReward(); // Clear form after save/add
};

// Function to get specific status class for reward purchase (for .purchase-item)
window.getPurchaseStatusClass = function (status) {
	switch (status) {
		case "purchased":
		case "authorized":
			return "status-completed";
		case "pending_authorization":
			return "status-pending";
		case "denied":
			return "status-overdue";
		default:
			return "status-pending";
	}
};

window.renderPendingAuthorizations = function () {
	const pendingAuthorizationsContainer = document.getElementById(
		"pendingAuthorizations"
	);
	if (!pendingAuthorizationsContainer) return;

	// Hide pending authorizations section if admin doesn't have permission
	const pendingAuthsSection = document.querySelector(
		"#adminRewardManagement .task-section:nth-child(4)"
	); // Assuming this is the 4th section
	if (!window.hasPermission("manage_rewards")) {
		if (pendingAuthsSection) pendingAuthsSection.style.display = "none";
		return;
	} else {
		if (pendingAuthsSection) pendingAuthsSection.style.display = "block";
	}

	const pendingAuths = window.userRewardPurchases.filter(
		(p) => p.status === "pending_authorization"
	);
	if (pendingAuths.length === 0) {
		pendingAuthorizationsContainer.innerHTML =
			'<div class="empty-state">No pending authorizations.</div>';
	} else {
		pendingAuthorizationsContainer.innerHTML = pendingAuths
			.map(
				(purchase) => `
            <div class="purchase-item pending-approval">
                <div class="purchase-content">
                    <h4>${window.escapeHtml(
						purchase.rewards.title || "Unknown Reward"
					)} by ${
					window.users[purchase.userId]?.displayName ||
					purchase.userId
				}</h4>
                    <p>Cost: ${purchase.purchaseCost} Points</p>
                    <p>Requested: ${window.formatDate(
						purchase.purchaseDate
					)}</p>
                </div>
                <div class="purchase-actions">
                    <button class="action-btn approve-btn" onclick="window.authorizePurchase(${
						purchase.id
					})">Authorize</button>
                    <button class="action-btn reject-btn" onclick="window.denyPurchase(${
						purchase.id
					})">Deny</button>
                    </div>
            </div>
        `
			)
			.join("");
	}
};
