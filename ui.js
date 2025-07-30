// ui.js
// This file contains functions responsible for rendering the user interface.

// Global variables from main.js or database.js (accessed via window)
// window.currentUser = null;
// window.tasks = [];
// window.suggestions = [];
// window.users = {}; // For display names

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
// window.changeMonth(direction) { ... }
// window.isToday(date) { ... }
// window.isTaskOverdue(task) { ... }
// window.getTasksForDate(date) { ... }
// window.loadData() { ... }
// window.updateUserPoints() { ... }
// window.logUserActivity(action) { ... }
// window.checkForOverdueTasks() { ... }

/**
 * Displays an error message on the login screen.
 * @param {string} message - The error message to display.
 */
window.showError = function (message) {
	const errorDiv = document.getElementById("errorMessage");
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
	const successDiv = document.getElementById("successMessage");
	if (successDiv) {
		successDiv.textContent = message;
		successDiv.style.display = "block";
	}
};

/**
 * Hides both error and success messages on the login screen.
 */
window.hideError = function () {
	const errorDiv = document.getElementById("errorMessage");
	const successDiv = document.getElementById("successMessage");
	if (errorDiv) errorDiv.style.display = "none";
	if (successDiv) successDiv.style.display = "none";
};

/**
 * Displays a transient notification at the top right of the screen.
 * @param {string} message - The message to display.
 * @param {string} type - The type of notification (e.g., 'success', 'error', 'warning').
 */
window.showNotification = function (message, type = "success") {
	const notification = document.createElement("div");
	notification.className = `notification ${type}`;
	notification.textContent = message;
	document.body.appendChild(notification);

	setTimeout(() => notification.classList.add("show"), 100);
	setTimeout(() => {
		notification.classList.remove("show");
		setTimeout(() => {
			if (document.body.contains(notification)) {
				document.body.removeChild(notification);
			}
		}, 300);
	}, 3000);
};

/**
 * Switches between different application tabs (Tasks, Calendar, Dashboard, Suggest Task).
 * @param {string} tabName - The name of the tab to switch to (e.g., 'tasks', 'calendar').
 */
window.switchTab = function (tabName) {
	// Remove 'active' class from all navigation tabs
	document.querySelectorAll(".nav-tab").forEach((tab) => {
		tab.classList.remove("active");
	});

	// Find the clicked tab and add 'active' class
	const clickedTab = Array.from(document.querySelectorAll(".nav-tab")).find(
		(tab) => tab.textContent.toLowerCase().includes(tabName.toLowerCase())
	);
	if (clickedTab) {
		clickedTab.classList.add("active");
	}

	// Hide all tab content sections
	document.querySelectorAll(".tab-content").forEach((content) => {
		content.classList.remove("active");
	});
	// Show the target tab content section
	const targetView = document.getElementById(tabName + "View");
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
};

/**
 * Displays the login screen.
 */
window.showLogin = function () {
	document.getElementById("loginScreen").style.display = "block";
	document.getElementById("mainApp").style.display = "none";
};

/**
 * Displays the main application interface.
 * Also handles initial data loading and sets up periodic checks.
 */
window.showMainApp = function () {
	document.getElementById("loginScreen").style.display = "none";
	document.getElementById("mainApp").style.display = "block";

	const user = window.users[window.currentUser];
	document.getElementById("userBadge").textContent = user.displayName;

	const userPointsBadge = document.getElementById("userPoints");
	if (userPointsBadge) {
		if (user.role === "admin") {
			userPointsBadge.style.display = "none"; // Hide points for admin
		} else {
			userPointsBadge.style.display = "inline-block"; // Show points for user
		}
	}

	// Log user login activity
	window.logUserActivity("login");

	// Adjust visibility of dashboard and suggest tabs based on user role
	const dashboardTab = document.getElementById("dashboardTab");
	const suggestTab = document.getElementById("suggestTab");
	if (user.role === "admin") {
		if (dashboardTab) dashboardTab.style.display = "block";
		if (suggestTab) suggestTab.style.display = "none";
		document.getElementById("adminView").style.display = "block";
		document.getElementById("userView").style.display = "none";
	} else {
		if (dashboardTab) dashboardTab.style.display = "none";
		if (suggestTab) suggestTab.style.display = "block";
		document.getElementById("adminView").style.display = "none";
		document.getElementById("userView").style.display = "block";
	}

	// Event listeners for task creation form elements
	const isRepeatingCheckbox = document.getElementById("isRepeating");
	if (isRepeatingCheckbox) {
		isRepeatingCheckbox.addEventListener("change", function () {
			const repeatOptions = document.getElementById("repeatOptions");
			if (repeatOptions) {
				repeatOptions.style.display = this.checked ? "block" : "none";
			}
		});
	}

	const isDemeritCheckbox = document.getElementById("isDemerit");
	if (isDemeritCheckbox) {
		isDemeritCheckbox.addEventListener("change", function () {
			const demeritWarning = document.getElementById("demeritWarning");
			if (demeritWarning) {
				demeritWarning.style.display = this.checked ? "block" : "none";
			}
			const taskPointsEl = document.getElementById("taskPoints");
			const penaltyPointsEl = document.getElementById("penaltyPoints");
			const taskDueDateEl = document.getElementById("taskDueDate");

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
	window.loadData();
	// Update user points display
	window.updateUserPoints();
	// Render the calendar
	window.renderCalendar();

	// Clear any existing overdue check interval and start a new one
	if (window.overdueCheckIntervalId) {
		clearInterval(window.overdueCheckIntervalId);
	}
	window.overdueCheckIntervalId = setInterval(
		window.checkForOverdueTasks,
		window.OVERDUE_CHECK_INTERVAL
	);
};

/**
 * Renders tasks in the appropriate view (admin or user) based on current user's role.
 */
window.renderTasks = function () {
	const user = window.users[window.currentUser];
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
	const pendingAppeals = window.tasks.filter(
		(t) => t.type === "demerit" && t.appealStatus === "pending"
	);
	const appealsContainer = document.getElementById("pendingAppeals");

	if (appealsContainer) {
		if (pendingAppeals.length === 0) {
			appealsContainer.innerHTML =
				'<div class="empty-state">No appeals pending review</div>';
		} else {
			appealsContainer.innerHTML = pendingAppeals
				.map(
					(task) => `
                <div class="task-item appeal-pending">
                    <div class="task-content">
                        <div>
                            <span class="status-badge status-pending">Appeal Pending</span>
                            <span class="task-text">${window.escapeHtml(
								task.text
							)}</span>
                            <span class="points-badge-small">-${
								task.penaltyPoints
							} pts (risk: -${task.penaltyPoints * 2})</span>
                            <div class="task-meta">
                                User: ${
									window.users[task.assignedTo]
										?.displayName || task.assignedTo
								}
                                <br>Appealed: ${window.formatDate(
									task.appealedAt
								)}
                                <br>Original demerit: ${window.formatDate(
									task.createdAt
								)}
                                ${
									task.acceptedAt
										? `<br>Accepted: ${window.formatDate(
												task.acceptedAt
										  )}`
										: "<br>Status: Not accepted"
								}
                                ${
									task.appealText
										? `<br>Appeal Reason: ${window.escapeHtml(
												task.appealText
										  )}`
										: ""
								}
                            </div>
                        </div>
                        <div class="task-actions">
                            <button class="action-btn approve-btn" onclick="approveAppeal(${
								task.id
							})">Approve Appeal</button>
                            <button class="action-btn reject-btn" onclick="denyAppeal(${
								task.id
							})">Deny Appeal (Double Penalty)</button>
                        </div>
                    </div>
                </div>
            `
				)
				.join("");
		}
	}

	// Filter and render suggested tasks pending approval
	const suggestedTasksContainer = document.getElementById("suggestedTasks");
	const pendingSuggestions = window.suggestions.filter(
		(s) => s.status === "pending"
	);

	if (suggestedTasksContainer) {
		if (pendingSuggestions.length === 0) {
			suggestedTasksContainer.innerHTML =
				'<div class="empty-state">No task suggestions pending approval</div>';
		} else {
			suggestedTasksContainer.innerHTML = pendingSuggestions
				.map(
					(suggestion) => `
                <div class="task-item">
                    <div class="task-content">
                        <div>
                            <span class="task-text">${window.escapeHtml(
								suggestion.description
							)}</span>
                            <div class="task-meta">
                                Suggested by: ${
									window.users[suggestion.suggestedBy]
										?.displayName || suggestion.suggestedBy
								}
                                <br>Points: ${suggestion.suggestedPoints}
                                ${
									suggestion.justification
										? `<br>Reason: ${window.escapeHtml(
												suggestion.justification
										  )}`
										: ""
								}
                                ${
									suggestion.suggestedDueDate
										? `<br>Due: ${window.formatDate(
												suggestion.suggestedDueDate
										  )}`
										: ""
								}
                            </div>
                        </div>
                        <div class="task-actions">
                            <button class="action-btn approve-btn" onclick="approveSuggestion(${
								suggestion.id
							})">Approve</button>
                            <button class="action-btn reject-btn" onclick="rejectSuggestion(${
								suggestion.id
							})">Reject</button>
                        </div>
                    </div>
                </div>
            `
				)
				.join("");
		}
	}

	// Filter and render tasks pending approval (regular tasks)
	const pendingTasks = window.tasks.filter(
		(t) => t.status === "pending_approval" && t.type !== "demerit"
	);
	const pendingContainer = document.getElementById("pendingTasks");

	if (pendingContainer) {
		if (pendingTasks.length === 0) {
			pendingContainer.innerHTML =
				'<div class="empty-state">No tasks pending approval</div>';
		} else {
			pendingContainer.innerHTML = pendingTasks
				.map(
					(task) => `
                <div class="task-item pending-approval ${
					task.isOverdue ? "overdue" : ""
				}">
                    <div class="task-content">
                        <div>
                            <span class="status-badge status-pending">Pending Approval</span>
                            <span class="task-text">${window.escapeHtml(
								task.text
							)}</span>
                            <span class="points-badge-small">+${
								task.points
							} pts</span>
                            <div class="task-meta">
                                Completed by: ${
									window.users[task.completedBy]
										?.displayName || task.completedBy
								}
                                ${
									task.dueDate
										? `<br>Due: ${window.formatDate(
												task.dueDate
										  )}`
										: ""
								}
                                ${task.isRepeating ? "<br>🔄 Repeating" : ""}
                            </div>
                        </div>
                        <div class="task-actions">
                            <button class="action-btn approve-btn" onclick="approveTask(${
								task.id
							})">Approve</button>
                            <button class="action-btn reject-btn" onclick="rejectTask(${
								task.id
							})">Reject & Penalize</button>
                            <button class="action-btn delete-btn" onclick="deleteTask(${
								task.id
							})">Delete</button>
                        </div>
                    </div>
                </div>
            `
				)
				.join("");
		}
	}

	// Render all tasks for the admin view
	const allTasksContainer = document.getElementById("allTasksAdmin");

	if (allTasksContainer) {
		if (window.tasks.length === 0) {
			allTasksContainer.innerHTML =
				'<div class="empty-state">No tasks created yet</div>';
		} else {
			allTasksContainer.innerHTML = window.tasks
				.map(
					(task) => `
                <div class="task-item ${
					task.status === "completed" ? "completed" : ""
				} ${task.isOverdue ? "overdue" : ""} ${
						task.type === "demerit" ? "demerit-task" : ""
					}">
                    <div class="task-content">
                        <div>
                            <span class="status-badge ${window.getStatusClass(
								task.status,
								task.isOverdue,
								task.type,
								task.appealStatus
							)}">
                                ${window.getStatusText(
									task.status,
									task.isOverdue,
									task.type,
									task.appealStatus
								)}
                            </span>
                            <span class="task-text">${window.escapeHtml(
								task.text
							)}</span>
                            <span class="points-badge-small">${
								task.type === "demerit"
									? "-" + task.penaltyPoints
									: "+" + task.points
							} pts</span>
                            ${
								task.type === "demerit" && task.appealStatus
									? `<span class="points-badge-small appeal-status ${task.appealStatus}">${task.appealStatus}</span>`
									: ""
							}
                            ${
								task.type === "demerit" && task.acceptedAt
									? `<span class="points-badge-small" style="background: #e0e7ff; color: #3730a3;">Accepted</span>`
									: ""
							}
                            <div class="task-meta">
                                Assigned to: ${
									window.users[task.assignedTo]
										?.displayName || task.assignedTo
								}
                                ${
									task.completedBy
										? `<br>Completed by: ${
												window.users[task.completedBy]
													?.displayName ||
												task.completedBy
										  }`
										: ""
								}
                                ${
									task.dueDate
										? `<br>Due: ${window.formatDate(
												task.dueDate
										  )}`
										: ""
								}
                                ${task.isRepeating ? "<br>🔄 Repeating" : ""}
                                ${
									task.type === "demerit"
										? "<br>📋 Demerit Task"
										: ""
								}
                                ${
									task.type === "demerit" && task.acceptedAt
										? `<br>Accepted: ${window.formatDate(
												task.acceptedAt
										  )}`
										: ""
								}
                                ${
									task.appealText
										? `<br>Appeal Reason: ${window.escapeHtml(
												task.appealText
										  )}`
										: ""
								}
                            </div>
                        </div>
                        <div class="task-actions">
                            <button class="action-btn delete-btn" onclick="deleteTask(${
								task.id
							})">Delete</button>
                        </div>
                    </div>
                </div>
            `
				)
				.join("");
		}
	}
};

/**
 * Renders the user's view of tasks, including regular tasks and demerit tasks.
 */
window.renderUserView = function () {
	// Filter tasks assigned to the current user
	const userTasks = window.tasks.filter(
		(t) => t.assignedTo === window.currentUser
	);
	const myTasksContainer = document.getElementById("myTasks");

	if (myTasksContainer) {
		if (userTasks.length === 0) {
			myTasksContainer.innerHTML =
				'<div class="empty-state">No tasks available</div>';
		} else {
			myTasksContainer.innerHTML = userTasks
				.map(
					(task) => `
                <div class="task-item ${
					task.type === "demerit" ? "demerit-task-user" : ""
				} ${task.isOverdue ? "overdue" : ""} ${
						task.status === "completed" ? "completed" : ""
					} ${
						task.status === "pending_approval"
							? "pending-approval"
							: ""
					} ${
						task.appealStatus === "pending" ? "appeal-pending" : ""
					}">
                    <div class="task-content">
                        <div>
                            <span class="status-badge ${window.getStatusClass(
								task.status,
								task.isOverdue,
								task.type,
								task.appealStatus
							)}">
                                ${window.getStatusText(
									task.status,
									task.isOverdue,
									task.type,
									task.appealStatus
								)}
                            </span>
                            <span class="task-text">${window.escapeHtml(
								task.text
							)}</span>
                            <span class="points-badge-small">${
								task.type === "demerit"
									? "-" + task.penaltyPoints
									: "+" + task.points
							} pts</span>
                            ${
								task.type === "demerit" && task.appealStatus
									? `<span class="points-badge-small appeal-status ${task.appealStatus}">${task.appealStatus}</span>`
									: ""
							}
                            ${
								task.type === "demerit" && task.acceptedAt
									? `<span class="points-badge-small" style="background: #e0e7ff; color: #3730a3;">Accepted</span>`
									: ""
							}
                            <div class="task-meta">
                                ${
									task.type === "demerit"
										? `Issued by: ${
												window.users[task.createdBy]
													?.displayName ||
												task.createdBy
										  }`
										: `Created by: ${
												window.users[task.createdBy]
													?.displayName ||
												task.createdBy
										  }`
								}
                                ${
									task.dueDate
										? `<br>Due: ${window.formatDate(
												task.dueDate
										  )}`
										: ""
								}
                                ${task.isRepeating ? "<br>🔄 Repeating" : ""}
                                ${
									task.type === "demerit"
										? "<br>📋 Demerit Task"
										: ""
								}
                                ${
									task.completedBy
										? `<br>Completed by: ${
												window.users[task.completedBy]
													?.displayName ||
												task.completedBy
										  }`
										: ""
								}
                                ${
									task.approvedBy
										? `<br>Approved by: ${
												window.users[task.approvedBy]
													?.displayName ||
												task.approvedBy
										  }`
										: ""
								}
                                ${
									task.rejectedBy
										? `<br>Rejected by: ${
												window.users[task.rejectedBy]
													?.displayName ||
												task.rejectedBy
										  }`
										: ""
								}
                                ${
									task.acceptedAt
										? `<br>Accepted: ${window.formatDate(
												task.acceptedAt
										  )}`
										: ""
								}
                                ${
									task.appealedAt
										? `<br>Appealed: ${window.formatDate(
												task.appealedAt
										  )}`
										: ""
								}
                                ${
									task.appealReviewedAt
										? `<br>Reviewed: ${window.formatDate(
												task.appealReviewedAt
										  )} by ${
												window.users[
													task.appealReviewedBy
												]?.displayName
										  }`
										: ""
								}
                                ${
									task.appealText
										? `<br>Appeal Reason: ${window.escapeHtml(
												task.appealText
										  )}`
										: ""
								}
                            </div>
                        </div>
                        <div class="task-actions">
                            ${
								task.type === "regular" &&
								task.status === "todo" &&
								!task.isOverdue
									? `<button class="action-btn check-btn" onclick="checkOffTask(${task.id})">Mark Complete</button>`
									: ""
							}
                            ${
								task.type === "regular" &&
								task.isOverdue &&
								task.status === "todo"
									? `<button class="action-btn check-btn" onclick="checkOffTask(${task.id})">Mark Complete (Overdue)</button>`
									: ""
							}
                            ${
								task.type === "demerit" &&
								!task.acceptedAt &&
								!task.appealStatus
									? `<button class="action-btn accept-btn" onclick="acceptDemerit(${task.id})">Accept Demerit</button>`
									: ""
							}
                            ${
								task.type === "demerit" &&
								!task.appealStatus &&
								!task.acceptedAt
									? `<button class="action-btn appeal-btn" onclick="appealDemerit(${task.id})">Appeal Demerit</button>`
									: ""
							}
                        </div>
                    </div>
                </div>
            `
				)
				.join("");
		}
	}
};

/**
 * Renders suggestions. This function primarily acts as a dispatcher to `renderMySuggestions`.
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
	const mySuggestions = window.suggestions.filter(
		(s) => s.suggestedBy === window.currentUser
	);
	const container = document.getElementById("mySuggestions");

	if (!container) return;

	if (mySuggestions.length === 0) {
		container.innerHTML =
			'<div class="empty-state">No suggestions submitted yet</div>';
	} else {
		container.innerHTML = mySuggestions
			.map(
				(suggestion) => `
            <div class="task-item">
                <div class="task-content">
                    <div>
                        <span class="status-badge ${window.getSuggestionStatusClass(
							suggestion.status
						)}">
                            ${
								suggestion.status.charAt(0).toUpperCase() +
								suggestion.status.slice(1)
							}
                        </span>
                        <span class="task-text">${window.escapeHtml(
							suggestion.description
						)}</span>
                        <span class="points-badge-small">${
							suggestion.suggestedPoints
						} pts</span>
                        <div class="task-meta">
                            Submitted: ${window.formatDate(
								suggestion.createdAt
							)}
                            ${
								suggestion.suggestedDueDate
									? `<br>Suggested due: ${window.formatDate(
											suggestion.suggestedDueDate
									  )}`
									: ""
							}
                            ${
								suggestion.reviewedAt
									? `<br>Reviewed: ${window.formatDate(
											suggestion.reviewedAt
									  )} by ${
											window.users[suggestion.reviewedBy]
												?.displayName
									  }`
									: ""
							}
                        </div>
                    </div>
                </div>
            </div>
        `
			)
			.join("");
	}
};

/**
 * Renders the calendar view, showing tasks due on each day.
 */
window.renderCalendar = function () {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const calendarMonth = document.getElementById("calendarMonth");
	if (calendarMonth) {
		calendarMonth.textContent = `${
			monthNames[window.currentDate.getMonth()]
		} ${window.currentDate.getFullYear()}`;
	}

	const firstDay = new Date(
		window.currentDate.getFullYear(),
		window.currentDate.getMonth(),
		1
	);
	const startDate = new Date(firstDay);
	startDate.setDate(startDate.getDate() - firstDay.getDay()); // Adjust to start on Sunday

	const calendarGrid = document.getElementById("calendarGrid");
	if (!calendarGrid) return;

	calendarGrid.innerHTML = ""; // Clear existing calendar days

	// Create calendar header with day names
	const headerDays = document.createElement("div");
	headerDays.className = "calendar-header-days";
	const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	dayNames.forEach((day) => {
		const dayEl = document.createElement("div");
		dayEl.className = "calendar-header-day";
		dayEl.textContent = day;
		headerDays.appendChild(dayEl);
	});
	calendarGrid.appendChild(headerDays);

	// Render 42 days (6 weeks) to cover the entire month
	for (let i = 0; i < 42; i++) {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);

		const dayEl = document.createElement("div");
		dayEl.className = "calendar-day";
		dayEl.textContent = date.getDate();

		// Add classes for styling
		if (date.getMonth() !== window.currentDate.getMonth()) {
			dayEl.classList.add("other-month"); // Days from previous/next month
		}

		if (window.isToday(date)) {
			dayEl.classList.add("today"); // Current day
		}

		// Get tasks for the current day, filtered by the current user
		const dayTasks = window.tasks.filter(
			(t) =>
				t.assignedTo === window.currentUser && // Only show tasks assigned to the current user
				window.getTasksForDate(date).some((dt) => dt.id === t.id) // Check if the task is due on this date
		);

		if (dayTasks.length > 0) {
			dayEl.classList.add("has-tasks");
			const hasOverdue = dayTasks.some((task) =>
				window.isTaskOverdue(task)
			);
			if (hasOverdue) {
				dayEl.classList.add("has-overdue");
			}

			// Add task indicators (up to 3)
			dayTasks.forEach((task, index) => {
				if (index < 3) {
					// Limit to 3 indicators per day
					const indicator = document.createElement("div");
					indicator.className = "task-indicator";
					if (window.isTaskOverdue(task)) {
						indicator.classList.add("overdue");
					} else if (window.isToday(new Date(task.dueDate))) {
						indicator.classList.add("due");
					} else {
						indicator.classList.add("upcoming");
					}
					dayEl.appendChild(indicator);
				}
			});
		}

		calendarGrid.appendChild(dayEl);
	}
};

/**
 * Renders the dashboard view with user stats and activity log.
 * This view is typically for admin users.
 */
window.renderDashboard = function () {
	if (!window.hasPermission("view_dashboard")) return;

	// Filter activity log to show only 'user' activity for status
	const userActivity = window.userActivityLog.filter(
		(a) => a.user === "user"
	);
	const lastActivity = userActivity[0];
	const isUserOnline = lastActivity && lastActivity.action === "login";

	// Calculate task statistics for the 'user'
	const activeTasks = window.tasks.filter(
		(t) =>
			t.status !== "completed" &&
			t.type !== "demerit" &&
			t.assignedTo === "user"
	);
	const completedTasks = window.tasks.filter(
		(t) => t.status === "completed" && t.assignedTo === "user"
	);
	const allNonDemeritTasks = window.tasks.filter(
		(t) => t.type !== "demerit" && t.assignedTo === "user"
	);
	const completionRate =
		allNonDemeritTasks.length > 0
			? Math.round(
					(completedTasks.length / allNonDemeritTasks.length) * 100
			  )
			: 0;

	// Update UI elements
	const userStatusEl = document.getElementById("userStatus");
	const activeTasksEl = document.getElementById("activeTasks");
	const completionRateEl = document.getElementById("completionRate");

	if (userStatusEl) {
		userStatusEl.textContent = isUserOnline ? "Online" : "Offline";
		userStatusEl.style.color = isUserOnline ? "#059669" : "#dc2626";
	}
	if (activeTasksEl) activeTasksEl.textContent = activeTasks.length;
	if (completionRateEl) completionRateEl.textContent = `${completionRate}%`;

	// Render detailed activity log and user progress
	window.renderUserActivityLog();
	window.renderUserProgress();
};

/**
 * Renders the user activity log on the dashboard.
 */
window.renderUserActivityLog = function () {
	const activityLogEl = document.getElementById("userActivityLog");
	if (!activityLogEl) return;

	// Filter activity log to only show activity for 'user' and 'admin'
	const filteredActivityLog = window.userActivityLog.filter(
		(a) => a.user === "user" || a.user === "admin"
	);

	if (filteredActivityLog.length === 0) {
		activityLogEl.innerHTML =
			'<div class="empty-state">No user activity recorded</div>';
	} else {
		activityLogEl.innerHTML = filteredActivityLog
			.slice(0, 20) // Display up to 20 recent activities
			.map(
				(activity) => `
            <div class="activity-item">
                <div class="activity-action activity-${activity.action}">
                    ${
						activity.user === "user"
							? activity.action === "login"
								? "🔓 User Logged In"
								: "🔒 User Logged Out"
							: activity.action === "login"
							? "🔓 Admin Logged In"
							: "🔒 Admin Logged Out"
					}
                </div>
                <div class="activity-time">${window.formatDate(
					activity.timestamp
				)}</div>
            </div>
        `
			)
			.join("");
	}
};

/**
 * Renders the user's progress summary on the dashboard.
 */
window.renderUserProgress = function () {
	const progressList = document.getElementById("userProgressList");
	if (!progressList) return;

	const user = window.users["user"]; // Always target the 'user' profile for progress
	const userTasks = window.tasks.filter(
		(t) => t.assignedTo === "user" && t.type !== "demerit"
	);
	const completed = userTasks.filter((t) => t.status === "completed");
	const pending = userTasks.filter(
		(t) => t.status === "todo" || t.status === "pending_approval"
	);
	const overdue = userTasks.filter(
		(t) => window.isTaskOverdue(t) && t.status !== "completed"
	);
	const demeritTasks = window.tasks.filter(
		(t) => t.type === "demerit" && t.assignedTo === "user"
	);

	const completionRate =
		userTasks.length > 0
			? Math.round((completed.length / userTasks.length) * 100)
			: 0;

	progressList.innerHTML = `
        <div class="progress-item">
            <div>
                <div class="user-name">${user.displayName}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${completionRate}%"></div>
                </div>
            </div>
            <div class="user-stats">
                <span>${user.points} pts</span>
                <span>${completed.length} done</span>
                <span>${pending.length} pending</span>
                <span>${overdue.length} overdue</span>
                <span>${demeritTasks.length} demerits</span>
            </div>
        </div>
    `;
};

/**
 * Updates the overall statistics displayed in the footer (Total Tasks, Pending, Completed, My Points).
 */
window.updateStats = function () {
	// Filter tasks relevant to the current user (all for admin, assigned for user)
	const relevantTasks = window.tasks.filter(
		(t) =>
			window.currentUser === "admin" ||
			t.assignedTo === window.currentUser
	);

	// Calculate statistics, excluding demerit tasks from total/pending/completed counts
	const total = relevantTasks.filter((t) => t.type !== "demerit").length;
	const pending = relevantTasks.filter(
		(t) =>
			(t.status === "todo" || t.status === "pending_approval") &&
			t.type !== "demerit"
	).length;
	const completed = relevantTasks.filter(
		(t) => t.status === "completed"
	).length;

	// Get references to the stat elements
	const totalTasksEl = document.getElementById("totalTasksStat");
	const pendingCountEl = document.getElementById("pendingCountStat");
	const completedCountEl = document.getElementById("completedCountStat");
	const myPointsEl = document.getElementById("myPointsStat");

	// Update text content of stat elements
	if (totalTasksEl) totalTasksEl.textContent = total;
	if (pendingCountEl) pendingCountEl.textContent = pending;
	if (completedCountEl) completedCountEl.textContent = completed;
	if (myPointsEl)
		myPointsEl.textContent = window.users[window.currentUser]?.points || 0;
};

/**
 * Escapes HTML characters in a string to prevent XSS (Cross-Site Scripting) vulnerabilities.
 * @param {string} text - The text to escape.
 * @returns {string} The escaped HTML string.
 */
window.escapeHtml = function (text) {
	const div = document.createElement("div");
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
	const date = new Date(dateString);
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
		if (appealStatus === "approved") return "status-completed"; // Appeal approved, effectively completed
		if (appealStatus === "denied") return "status-overdue"; // Appeal denied, remains a negative status
		if (status === "demerit_accepted") return "status-demerit-accepted"; // User accepted demerit
		return "status-demerit"; // Default for issued demerit
	}
	// For regular tasks
	if (isOverdue) return "status-overdue";
	if (status === "completed") return "status-completed";
	if (status === "failed") return "status-overdue"; // Failed tasks are similar to overdue in negative connotation
	return "status-pending"; // Default for 'todo' or 'pending_approval'
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
// These functions provide custom modal dialogs, replacing native browser `alert()` and `confirm()`.

/**
 * Displays a generic confirmation modal with "Confirm" and "Cancel" buttons.
 * @param {string} message - The message to display in the modal.
 * @param {function(boolean): void} onConfirm - Callback function invoked with `true` if confirmed, `false` if canceled.
 */
window.showConfirmModal = function (message, onConfirm) {
	const modal = document.createElement("div");
	modal.className = "modal-overlay"; // Covers the entire screen
	modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p>
            <div class="modal-actions">
                <button id="modalConfirm" class="action-btn approve-btn">Confirm</button>
                <button id="modalCancel" class="action-btn delete-btn">Cancel</button>
            </div>
        </div>
    `;
	document.body.appendChild(modal); // Add modal to the DOM

	// Attach event listeners to modal buttons
	document.getElementById("modalConfirm").onclick = () => {
		onConfirm(true); // Call callback with true for confirmation
		document.body.removeChild(modal); // Remove modal from DOM
	};
	document.getElementById("modalCancel").onclick = () => {
		onConfirm(false); // Call callback with false for cancellation
		document.body.removeChild(modal); // Remove modal from DOM
	};
};

/**
 * Displays a modal specifically for appealing a demerit task, including a text input for the reason.
 * @param {object} task - The demerit task object being appealed.
 * @param {function(string): void} onSubmit - Callback function invoked with the appeal text when submitted.
 */
window.showAppealModal = function (task, onSubmit) {
	const modal = document.createElement("div");
	modal.className = "modal-overlay";
	modal.innerHTML = `
        <div class="modal-content">
            <h3>Appeal Demerit Task</h3>
            <p><strong>Task:</strong> ${window.escapeHtml(task.text)}</p>
            <p><strong>Penalty:</strong> -${task.penaltyPoints} points</p>
            <div class="appeal-warning">
                <div class="warning-title">⚠️ Appeal Risk Warning</div>
                <div>If approved: +${task.penaltyPoints} points restored</div>
                <div>If denied: -${
					task.penaltyPoints
				} additional points (double penalty)</div>
                <div><strong>Total risk if denied: ${
					task.penaltyPoints * 2
				} points</strong></div>
            </div>
            <div class="form-group">
                <label class="form-label" for="appealTextInput">Reason for Appeal (Required)</label>
                <textarea id="appealTextInput" class="form-input" rows="4" placeholder="Explain why you are appealing this demerit..."></textarea>
            </div>
            <div id="appealError" class="error-message" style="display:none; margin-top: 10px;"></div>
            <div class="modal-actions">
                <button id="modalSubmitAppeal" class="action-btn approve-btn">Submit Appeal</button>
                <button id="modalCancelAppeal" class="action-btn delete-btn">Cancel</button>
            </div>
        </div>
    `;
	document.body.appendChild(modal);

	// Event listener for submitting the appeal
	document.getElementById("modalSubmitAppeal").onclick = () => {
		const appealText = document
			.getElementById("appealTextInput")
			.value.trim();
		const appealError = document.getElementById("appealError");
		if (appealText.length < 10) {
			// Basic validation: require at least 10 characters for appeal reason
			appealError.textContent =
				"Appeal text must be at least 10 characters long.";
			appealError.style.display = "block";
		} else {
			onSubmit(appealText); // Call callback with the appeal text
			document.body.removeChild(modal);
		}
	};
	// Event listener for canceling the appeal
	document.getElementById("modalCancelAppeal").onclick = () => {
		document.body.removeChild(modal);
	};
};
