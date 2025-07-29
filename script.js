// Enhanced User Configuration
const users = {
	admin: {
		password: "admin123",
		role: "admin",
		displayName: "Administrator",
		permissions: [
			"create_task",
			"approve_task",
			"delete_task",
			"view_all_tasks",
			"manage_users",
			"view_dashboard",
			"approve_suggestions",
		],
		points: 0,
	},
	user1: {
		password: "user123",
		role: "user",
		displayName: "User One",
		permissions: ["check_task", "view_assigned_tasks", "suggest_task"],
		points: 0,
	},
	user2: {
		password: "user123",
		role: "user",
		displayName: "User Two",
		permissions: ["check_task", "view_assigned_tasks", "suggest_task"],
		points: 0,
	},
};

let currentUser = null;
let tasks = [];
let suggestions = [];
let userProfiles = {};
let taskIdCounter = 1;
let suggestionIdCounter = 1;
let db = null;
let unsubscribe = null;
let currentDate = new Date();
let activeTab = "tasks";

// Initialize Firebase and load data on page load
window.addEventListener("load", function () {
	initializeFirebase();
});

function initializeFirebase() {
	try {
		if (!window.firebaseConfig) {
			throw new Error("Firebase configuration not found in config.js");
		}

		if (!firebase.apps.length) {
			firebase.initializeApp(window.firebaseConfig);
			db = firebase.firestore();
			db.settings({
				experimentalForceLongPolling: true,
			});
		} else {
			db = firebase.firestore();
		}

		console.log("Firebase initialized successfully");
		showLogin();
	} catch (error) {
		console.error("Firebase initialization error:", error);
		showError(
			"Failed to connect to Firebase. Please check your configuration."
		);
	}
}

function showLogin() {
	document.getElementById("loginScreen").style.display = "block";
	document.getElementById("mainApp").style.display = "none";
}

function showMainApp() {
	document.getElementById("loginScreen").style.display = "none";
	document.getElementById("mainApp").style.display = "block";

	const user = users[currentUser];
	document.getElementById("userBadge").textContent = user.displayName;

	// Show dashboard tab only for admin, hide suggest tab for admin
	const dashboardTab = document.getElementById("dashboardTab");
	const suggestTab = document.getElementById("suggestTab");
	if (user.role === "admin") {
		dashboardTab.style.display = "block";
		suggestTab.style.display = "none";
		document.getElementById("adminView").style.display = "block";
		document.getElementById("userView").style.display = "none";
		populateUserDropdown();
	} else {
		dashboardTab.style.display = "none";
		suggestTab.style.display = "block";
		document.getElementById("adminView").style.display = "none";
		document.getElementById("userView").style.display = "block";
	}

	// Setup repeating task checkbox listener
	const isRepeatingCheckbox = document.getElementById("isRepeating");
	if (isRepeatingCheckbox) {
		isRepeatingCheckbox.addEventListener("change", function () {
			const repeatGroup = document.getElementById("repeatIntervalGroup");
			if (repeatGroup) {
				repeatGroup.style.display = this.checked ? "block" : "none";
			}
		});
	}

	// Setup task type radio buttons
	const taskTypeRadios = document.querySelectorAll('input[name="taskType"]');
	taskTypeRadios.forEach((radio) => {
		radio.addEventListener("change", function () {
			const isRegular = this.value === "regular";
			const regularOptions =
				document.getElementById("regularTaskOptions");
			const demeritOptions =
				document.getElementById("demeritTaskOptions");
			const regularExtras = document.getElementById("regularTaskExtras");
			const repeatOptions = document.getElementById("repeatOptions");

			if (regularOptions)
				regularOptions.style.display = isRegular ? "block" : "none";
			if (demeritOptions)
				demeritOptions.style.display = isRegular ? "none" : "block";
			if (regularExtras)
				regularExtras.style.display = isRegular ? "block" : "none";
			if (repeatOptions)
				repeatOptions.style.display = isRegular ? "block" : "none";
		});
	});

	loadData();
	updateUserPoints();
	renderCalendar();
}

// Login form handler
document.addEventListener("DOMContentLoaded", function () {
	const loginForm = document.getElementById("loginForm");
	if (loginForm) {
		loginForm.addEventListener("submit", function (e) {
			e.preventDefault();
			const username = document.getElementById("username").value.trim();
			const password = document.getElementById("password").value;

			if (users[username] && users[username].password === password) {
				currentUser = username;
				showMainApp();
				hideError();
			} else {
				showError("Invalid username or password");
			}
		});
	}

	// Setup suggest form
	const suggestForm = document.getElementById("suggestForm");
	if (suggestForm) {
		suggestForm.addEventListener("submit", function (e) {
			e.preventDefault();
			submitTaskSuggestion();
		});
	}
});

function showError(message) {
	const errorDiv = document.getElementById("errorMessage");
	if (errorDiv) {
		errorDiv.textContent = message;
		errorDiv.style.display = "block";
	}
}

function showSuccess(message) {
	const successDiv = document.getElementById("successMessage");
	if (successDiv) {
		successDiv.textContent = message;
		successDiv.style.display = "block";
	}
}

function hideError() {
	const errorDiv = document.getElementById("errorMessage");
	const successDiv = document.getElementById("successMessage");
	if (errorDiv) errorDiv.style.display = "none";
	if (successDiv) successDiv.style.display = "none";
}

function hasPermission(permission) {
	const user = users[currentUser];
	return user && user.permissions.includes(permission);
}

function showNotification(message, type = "success") {
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
}

// Tab switching
window.switchTab = function (tabName) {
	// Update tab buttons
	document.querySelectorAll(".nav-tab").forEach((tab) => {
		tab.classList.remove("active");
	});

	// Find the clicked tab and make it active
	const clickedTab = Array.from(document.querySelectorAll(".nav-tab")).find(
		(tab) => tab.textContent.toLowerCase().includes(tabName.toLowerCase())
	);
	if (clickedTab) {
		clickedTab.classList.add("active");
	}

	// Update tab content
	document.querySelectorAll(".tab-content").forEach((content) => {
		content.classList.remove("active");
	});
	const targetView = document.getElementById(tabName + "View");
	if (targetView) {
		targetView.classList.add("active");
	}

	activeTab = tabName;

	// Load specific content based on tab
	if (tabName === "calendar") {
		renderCalendar();
	} else if (tabName === "dashboard" && hasPermission("view_dashboard")) {
		renderDashboard();
	} else if (tabName === "suggest") {
		renderMySuggestions();
	}
};

window.logout = function () {
	if (unsubscribe) {
		unsubscribe();
		unsubscribe = null;
	}
	currentUser = null;
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	hideError();
	showLogin();
};

// Enhanced task creation
window.createTask = function () {
	if (!hasPermission("create_task")) {
		showNotification("You do not have permission to create tasks", "error");
		return;
	}

	const taskInput = document.getElementById("taskInput");
	const taskText = taskInput.value.trim();
	const taskTypeElement = document.querySelector(
		'input[name="taskType"]:checked'
	);
	const taskType = taskTypeElement ? taskTypeElement.value : "regular";

	if (taskText === "") {
		showNotification("Please enter a task description", "error");
		return;
	}

	let task;

	if (taskType === "demerit") {
		// Create demerit task
		const assignedUser = document.getElementById(
			"demeritAssignedUser"
		).value;
		const demeritPoints =
			parseInt(document.getElementById("demeritPoints").value) || 10;

		if (!assignedUser) {
			showNotification(
				"Please select a user for the demerit task",
				"error"
			);
			return;
		}

		task = {
			id: taskIdCounter++,
			text: taskText,
			status: "demerit",
			type: "demerit",
			createdAt: new Date().toISOString(),
			createdBy: currentUser,
			assignedTo: assignedUser,
			points: 0,
			penaltyPoints: demeritPoints,
			dueDate: null,
			isRepeating: false,
			repeatInterval: null,
			completedAt: null,
			completedBy: null,
			approvedAt: null,
			approvedBy: null,
			isOverdue: false,
			appealStatus: null,
			appealedAt: null,
			appealReviewedAt: null,
			appealReviewedBy: null,
		};

		// Immediately apply penalty points
		updateUserPoints(assignedUser, demeritPoints, "subtract");
	} else {
		// Create regular task
		const assignedUser = document.getElementById("assignedUser").value;
		const points =
			parseInt(document.getElementById("taskPoints").value) || 10;
		const penaltyPoints =
			parseInt(document.getElementById("penaltyPoints").value) || 5;
		const dueDate = document.getElementById("taskDueDate").value;
		const isRepeating = document.getElementById("isRepeating").checked;
		const repeatInterval = document.getElementById("repeatInterval").value;

		if (dueDate && new Date(dueDate) < new Date()) {
			showNotification("Due date cannot be in the past", "error");
			return;
		}

		task = {
			id: taskIdCounter++,
			text: taskText,
			status: "todo",
			type: "regular",
			createdAt: new Date().toISOString(),
			createdBy: currentUser,
			assignedTo: assignedUser || null,
			points: points,
			penaltyPoints: penaltyPoints,
			dueDate: dueDate || null,
			isRepeating: isRepeating,
			repeatInterval: repeatInterval || null,
			completedAt: null,
			completedBy: null,
			approvedAt: null,
			approvedBy: null,
			isOverdue: false,
		};
	}

	if (db) {
		Promise.all([
			db.collection("tasks").doc(task.id.toString()).set(task),
			db
				.collection("metadata")
				.doc("counter")
				.set({ taskIdCounter: taskIdCounter }),
		])
			.then(() => {
				// Reset form
				taskInput.value = "";
				const taskPointsEl = document.getElementById("taskPoints");
				const penaltyPointsEl =
					document.getElementById("penaltyPoints");
				const demeritPointsEl =
					document.getElementById("demeritPoints");
				const taskDueDateEl = document.getElementById("taskDueDate");
				const isRepeatingEl = document.getElementById("isRepeating");
				const assignedUserEl = document.getElementById("assignedUser");
				const demeritAssignedUserEl = document.getElementById(
					"demeritAssignedUser"
				);

				if (taskPointsEl) taskPointsEl.value = "10";
				if (penaltyPointsEl) penaltyPointsEl.value = "5";
				if (demeritPointsEl) demeritPointsEl.value = "10";
				if (taskDueDateEl) taskDueDateEl.value = "";
				if (isRepeatingEl) {
					isRepeatingEl.checked = false;
					const repeatGroup = document.getElementById(
						"repeatIntervalGroup"
					);
					if (repeatGroup) repeatGroup.style.display = "none";
				}
				if (assignedUserEl) assignedUserEl.value = "";
				if (demeritAssignedUserEl) demeritAssignedUserEl.value = "";

				const regularRadio = document.querySelector(
					'input[name="taskType"][value="regular"]'
				);
				if (regularRadio) {
					regularRadio.checked = true;
					// Trigger change event to reset visibility
					const event = new Event("change");
					regularRadio.dispatchEvent(event);
				}

				if (taskType === "demerit") {
					showNotification(
						`Demerit task issued to ${
							users[task.assignedTo].displayName
						}. ${task.penaltyPoints} points deducted.`,
						"warning"
					);
				} else {
					showNotification("Task created successfully!");
				}
			})
			.catch((error) => {
				console.error("Error creating task:", error);
				showNotification(
					"Failed to create task. Please try again.",
					"error"
				);
				taskIdCounter--;
			});
	} else {
		showNotification("Database not connected", "error");
	}
};

window.checkOffTask = function (taskId) {
	if (!hasPermission("check_task")) {
		showNotification(
			"You do not have permission to check off tasks",
			"error"
		);
		return;
	}

	const task = tasks.find((t) => t.id === taskId);
	if (!task) return;

	// Check if task is assigned to current user or if it's unassigned
	if (task.assignedTo && task.assignedTo !== currentUser) {
		showNotification("This task is not assigned to you", "error");
		return;
	}

	const updates = {
		status: "pending_approval",
		completedAt: new Date().toISOString(),
		completedBy: currentUser,
	};

	if (db) {
		db.collection("tasks")
			.doc(taskId.toString())
			.update(updates)
			.then(() => {
				showNotification("Task marked as complete! Awaiting approval.");
			})
			.catch((error) => {
				console.error("Error updating task:", error);
				showNotification("Failed to update task", "error");
			});
	}
};

window.approveTask = function (taskId) {
	if (!hasPermission("approve_task")) {
		showNotification(
			"You do not have permission to approve tasks",
			"error"
		);
		return;
	}

	const task = tasks.find((t) => t.id === taskId);
	if (!task) return;

	const updates = {
		status: "completed",
		approvedAt: new Date().toISOString(),
		approvedBy: currentUser,
	};

	if (db) {
		Promise.all([
			db.collection("tasks").doc(taskId.toString()).update(updates),
			updateUserPoints(task.completedBy, task.points, "add"),
		])
			.then(() => {
				showNotification(
					`Task approved! ${task.points} points awarded to ${
						users[task.completedBy]?.displayName
					}`
				);

				// Handle repeating tasks
				if (task.isRepeating && task.dueDate) {
					createRepeatingTask(task);
				}
			})
			.catch((error) => {
				console.error("Error approving task:", error);
				showNotification("Failed to approve task", "error");
			});
	}
};

window.rejectTask = function (taskId) {
	if (!hasPermission("approve_task")) {
		showNotification("You do not have permission to reject tasks", "error");
		return;
	}

	const task = tasks.find((t) => t.id === taskId);
	if (!task) return;

	if (
		!confirm(
			`Are you sure you want to reject this task? This will apply a ${
				task.penaltyPoints
			} point penalty to ${users[task.completedBy]?.displayName}.`
		)
	) {
		return;
	}

	const updates = {
		status: "failed",
		rejectedAt: new Date().toISOString(),
		rejectedBy: currentUser,
	};

	if (db) {
		Promise.all([
			db.collection("tasks").doc(taskId.toString()).update(updates),
			updateUserPoints(task.completedBy, task.penaltyPoints, "subtract"),
		])
			.then(() => {
				showNotification(
					`Task rejected! ${
						task.penaltyPoints
					} penalty points applied to ${
						users[task.completedBy]?.displayName
					}`,
					"warning"
				);
			})
			.catch((error) => {
				console.error("Error rejecting task:", error);
				showNotification("Failed to reject task", "error");
			});
	}
};

window.deleteTask = function (taskId) {
	if (!hasPermission("delete_task")) {
		showNotification("You do not have permission to delete tasks", "error");
		return;
	}

	if (!confirm("Are you sure you want to delete this task?")) {
		return;
	}

	if (db) {
		db.collection("tasks")
			.doc(taskId.toString())
			.delete()
			.then(() => {
				showNotification("Task deleted successfully");
			})
			.catch((error) => {
				console.error("Error deleting task:", error);
				showNotification("Failed to delete task", "error");
			});
	}
};

// Appeal functions
window.appealDemerit = function (taskId) {
	const task = tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "demerit") return;

	const appealWarning = `⚠️ APPEAL WARNING ⚠️

If your appeal is APPROVED: The ${
		task.penaltyPoints
	} penalty points will be restored to your account.

If your appeal is DENIED: You will lose an additional ${
		task.penaltyPoints
	} points (DOUBLE PENALTY).

Current penalty: -${task.penaltyPoints} points
Risk if denied: -${task.penaltyPoints * 2} points total

Are you sure you want to appeal this demerit?`;

	if (!confirm(appealWarning)) {
		return;
	}

	const updates = {
		appealStatus: "pending",
		appealedAt: new Date().toISOString(),
	};

	if (db) {
		db.collection("tasks")
			.doc(taskId.toString())
			.update(updates)
			.then(() => {
				showNotification(
					"Appeal submitted. Awaiting admin review.",
					"warning"
				);
			})
			.catch((error) => {
				console.error("Error submitting appeal:", error);
				showNotification("Failed to submit appeal", "error");
			});
	}
};

window.approveAppeal = function (taskId) {
	if (!hasPermission("approve_task")) {
		showNotification(
			"You do not have permission to review appeals",
			"error"
		);
		return;
	}

	const task = tasks.find((t) => t.id === taskId);
	if (!task) return;

	const updates = {
		appealStatus: "approved",
		appealReviewedAt: new Date().toISOString(),
		appealReviewedBy: currentUser,
	};

	if (db) {
		Promise.all([
			db.collection("tasks").doc(taskId.toString()).update(updates),
			updateUserPoints(task.assignedTo, task.penaltyPoints, "add"), // Restore points
		])
			.then(() => {
				showNotification(
					`Appeal approved! ${
						task.penaltyPoints
					} points restored to ${users[task.assignedTo]?.displayName}`
				);
			})
			.catch((error) => {
				console.error("Error approving appeal:", error);
				showNotification("Failed to approve appeal", "error");
			});
	}
};

window.denyAppeal = function (taskId) {
	if (!hasPermission("approve_task")) {
		showNotification(
			"You do not have permission to review appeals",
			"error"
		);
		return;
	}

	const task = tasks.find((t) => t.id === taskId);
	if (!task) return;

	if (
		!confirm(
			`Are you sure you want to deny this appeal? This will apply an additional ${
				task.penaltyPoints
			} point penalty to ${
				users[task.assignedTo]?.displayName
			} (double penalty).`
		)
	) {
		return;
	}

	const updates = {
		appealStatus: "denied",
		appealReviewedAt: new Date().toISOString(),
		appealReviewedBy: currentUser,
	};

	if (db) {
		Promise.all([
			db.collection("tasks").doc(taskId.toString()).update(updates),
			updateUserPoints(task.assignedTo, task.penaltyPoints, "subtract"), // Additional penalty
		])
			.then(() => {
				showNotification(
					`Appeal denied! Additional ${
						task.penaltyPoints
					} point penalty applied to ${
						users[task.assignedTo]?.displayName
					}`,
					"warning"
				);
			})
			.catch((error) => {
				console.error("Error denying appeal:", error);
				showNotification("Failed to deny appeal", "error");
			});
	}
};

window.rejectSuggestion = function (suggestionId) {
	if (!hasPermission("approve_suggestions")) {
		showNotification(
			"You do not have permission to reject suggestions",
			"error"
		);
		return;
	}

	if (!confirm("Are you sure you want to reject this suggestion?")) {
		return;
	}

	const suggestionUpdates = {
		status: "rejected",
		reviewedBy: currentUser,
		reviewedAt: new Date().toISOString(),
	};

	if (db) {
		db.collection("suggestions")
			.doc(suggestionId.toString())
			.update(suggestionUpdates)
			.then(() => {
				showNotification("Suggestion rejected");
			})
			.catch((error) => {
				console.error("Error rejecting suggestion:", error);
				showNotification("Failed to reject suggestion", "error");
			});
	}
};

// Task suggestion functions
function submitTaskSuggestion() {
	const description = document
		.getElementById("suggestedTaskDescription")
		.value.trim();
	const justification = document
		.getElementById("taskJustification")
		.value.trim();
	const points =
		parseInt(document.getElementById("suggestedPoints").value) || 10;
	const dueDate = document.getElementById("suggestedDueDate").value;

	if (!description) {
		showNotification("Please enter a task description", "error");
		return;
	}

	const suggestion = {
		id: suggestionIdCounter++,
		description: description,
		justification: justification,
		suggestedPoints: points,
		suggestedDueDate: dueDate || null,
		suggestedBy: currentUser,
		createdAt: new Date().toISOString(),
		status: "pending",
		reviewedBy: null,
		reviewedAt: null,
	};

	if (db) {
		Promise.all([
			db
				.collection("suggestions")
				.doc(suggestion.id.toString())
				.set(suggestion),
			db
				.collection("metadata")
				.doc("suggestionCounter")
				.set({ suggestionIdCounter: suggestionIdCounter }),
		])
			.then(() => {
				document.getElementById("suggestForm").reset();
				showNotification("Task suggestion submitted successfully!");
				renderMySuggestions();
			})
			.catch((error) => {
				console.error("Error submitting suggestion:", error);
				showNotification("Failed to submit suggestion", "error");
				suggestionIdCounter--;
			});
	}
}

window.approveSuggestion = function (suggestionId) {
	const suggestion = suggestions.find((s) => s.id === suggestionId);
	if (!suggestion) return;

	// Create task from suggestion
	const task = {
		id: taskIdCounter++,
		text: suggestion.description,
		status: "todo",
		type: "regular",
		createdAt: new Date().toISOString(),
		createdBy: currentUser,
		assignedTo: suggestion.suggestedBy,
		points: suggestion.suggestedPoints,
		penaltyPoints: Math.floor(suggestion.suggestedPoints / 2),
		dueDate: suggestion.suggestedDueDate,
		isRepeating: false,
		repeatInterval: null,
		completedAt: null,
		completedBy: null,
		approvedAt: null,
		approvedBy: null,
		isOverdue: false,
	};

	const suggestionUpdates = {
		status: "approved",
		reviewedBy: currentUser,
		reviewedAt: new Date().toISOString(),
	};

	if (db) {
		Promise.all([
			db.collection("tasks").doc(task.id.toString()).set(task),
			db
				.collection("suggestions")
				.doc(suggestionId.toString())
				.update(suggestionUpdates),
			db
				.collection("metadata")
				.doc("counter")
				.set({ taskIdCounter: taskIdCounter }),
		])
			.then(() => {
				showNotification(`Suggestion approved and converted to task!`);
			})
			.catch((error) => {
				console.error("Error approving suggestion:", error);
				showNotification("Failed to approve suggestion", "error");
			});
	}
};

// Calendar functions
window.changeMonth = function (direction) {
	currentDate.setMonth(currentDate.getMonth() + direction);
	renderCalendar();
};

function renderCalendar() {
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
			monthNames[currentDate.getMonth()]
		} ${currentDate.getFullYear()}`;
	}

	const firstDay = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	);
	const startDate = new Date(firstDay);
	startDate.setDate(startDate.getDate() - firstDay.getDay());

	const calendarGrid = document.getElementById("calendarGrid");
	if (!calendarGrid) return;

	calendarGrid.innerHTML = "";

	// Add header days
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

	// Add calendar days
	for (let i = 0; i < 42; i++) {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);

		const dayEl = document.createElement("div");
		dayEl.className = "calendar-day";
		dayEl.textContent = date.getDate();

		if (date.getMonth() !== currentDate.getMonth()) {
			dayEl.classList.add("other-month");
		}

		if (isToday(date)) {
			dayEl.classList.add("today");
		}

		// Check for tasks on this date
		const dayTasks = getTasksForDate(date);
		if (dayTasks.length > 0) {
			dayEl.classList.add("has-tasks");
			const hasOverdue = dayTasks.some((task) => isTaskOverdue(task));
			if (hasOverdue) {
				dayEl.classList.add("has-overdue");
			}

			// Add task indicators
			dayTasks.forEach((task, index) => {
				if (index < 3) {
					// Limit to 3 indicators
					const indicator = document.createElement("div");
					indicator.className = "task-indicator";
					if (isTaskOverdue(task)) {
						indicator.classList.add("overdue");
					} else if (isToday(new Date(task.dueDate))) {
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
}

function getTasksForDate(date) {
	const dateStr = date.toDateString();
	return tasks.filter((task) => {
		if (!task.dueDate) return false;
		return new Date(task.dueDate).toDateString() === dateStr;
	});
}

function isToday(date) {
	const today = new Date();
	return date.toDateString() === today.toDateString();
}

function isTaskOverdue(task) {
	if (!task.dueDate || task.status === "completed") return false;
	return new Date(task.dueDate) < new Date();
}

// Dashboard functions
function renderDashboard() {
	if (!hasPermission("view_dashboard")) return;

	// Calculate stats
	const activeUsers = Object.keys(users).filter(
		(u) => users[u].role === "user"
	);
	const activeTasks = tasks.filter((t) => t.status !== "completed");
	const completedTasks = tasks.filter((t) => t.status === "completed");
	const completionRate =
		tasks.length > 0
			? Math.round((completedTasks.length / tasks.length) * 100)
			: 0;

	const totalUsersEl = document.getElementById("totalUsers");
	const activeTasksEl = document.getElementById("activeTasks");
	const completionRateEl = document.getElementById("completionRate");

	if (totalUsersEl) totalUsersEl.textContent = activeUsers.length;
	if (activeTasksEl) activeTasksEl.textContent = activeTasks.length;
	if (completionRateEl) completionRateEl.textContent = `${completionRate}%`;

	// Render user progress
	renderUserProgress();
	renderLeaderboard();
}

function renderUserProgress() {
	const progressList = document.getElementById("userProgressList");
	if (!progressList) return;

	const userStats = Object.keys(users)
		.filter((username) => users[username].role === "user")
		.map((username) => {
			const user = users[username];
			const userTasks = tasks.filter(
				(t) => t.assignedTo === username || !t.assignedTo
			);
			const completed = userTasks.filter(
				(t) => t.status === "completed" && t.completedBy === username
			);
			const pending = userTasks.filter(
				(t) => t.status === "todo" || t.status === "pending_approval"
			);
			const overdue = userTasks.filter(
				(t) => isTaskOverdue(t) && t.status !== "completed"
			);

			return {
				username,
				displayName: user.displayName,
				points: user.points || 0,
				completed: completed.length,
				pending: pending.length,
				overdue: overdue.length,
				completionRate:
					userTasks.length > 0
						? Math.round(
								(completed.length / userTasks.length) * 100
						  )
						: 0,
			};
		});

	progressList.innerHTML = userStats
		.map(
			(user) => `
		<div class="progress-item">
			<div>
				<div class="user-name">${user.displayName}</div>
				<div class="progress-bar">
					<div class="progress-fill" style="width: ${user.completionRate}%"></div>
				</div>
			</div>
			<div class="user-stats">
				<span>${user.points} pts</span>
				<span>${user.completed} done</span>
				<span>${user.pending} pending</span>
				<span>${user.overdue} overdue</span>
			</div>
		</div>
	`
		)
		.join("");
}

function renderLeaderboard() {
	const leaderboardList = document.getElementById("leaderboardList");
	if (!leaderboardList) return;

	const sortedUsers = Object.keys(users)
		.filter((username) => users[username].role === "user")
		.map((username) => ({
			username,
			displayName: users[username].displayName,
			points: users[username].points || 0,
		}))
		.sort((a, b) => b.points - a.points);

	leaderboardList.innerHTML = sortedUsers
		.map(
			(user, index) => `
		<div class="leaderboard-item">
			<div style="display: flex; align-items: center;">
				<div class="rank-number">${index + 1}</div>
				<div class="user-name">${user.displayName}</div>
			</div>
			<div class="user-stats">
				<span>${user.points} points</span>
			</div>
		</div>
	`
		)
		.join("");
}

// Data loading and rendering functions
function loadData() {
	if (db) {
		// Load tasks
		if (unsubscribe) unsubscribe();

		unsubscribe = db.collection("tasks").onSnapshot((snapshot) => {
			tasks = [];
			snapshot.forEach((doc) => {
				tasks.push({ id: parseInt(doc.id), ...doc.data() });
			});
			tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
			checkForOverdueTasks();
			renderTasks();
			updateStats();
		});

		// Load suggestions
		db.collection("suggestions").onSnapshot((snapshot) => {
			suggestions = [];
			snapshot.forEach((doc) => {
				suggestions.push({ id: parseInt(doc.id), ...doc.data() });
			});
			suggestions.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
			renderSuggestions();
		});

		// Load counters
		db.collection("metadata")
			.doc("counter")
			.get()
			.then((doc) => {
				if (doc.exists) {
					taskIdCounter = doc.data().taskIdCounter || 1;
				}
			});

		db.collection("metadata")
			.doc("suggestionCounter")
			.get()
			.then((doc) => {
				if (doc.exists) {
					suggestionIdCounter = doc.data().suggestionIdCounter || 1;
				}
			});

		// Load user profiles
		db.collection("userProfiles").onSnapshot((snapshot) => {
			snapshot.forEach((doc) => {
				const username = doc.id;
				const profileData = doc.data();
				if (users[username]) {
					users[username].points = profileData.points || 0;
				}
			});
			updateUserPoints();
		});
	}
}

function checkForOverdueTasks() {
	const now = new Date();
	tasks.forEach((task) => {
		if (task.dueDate && task.status !== "completed") {
			const wasOverdue = task.isOverdue;
			const isNowOverdue = new Date(task.dueDate) < now;

			if (isNowOverdue && !wasOverdue) {
				// Task just became overdue - apply penalty
				task.isOverdue = true;
				if (task.assignedTo) {
					updateUserPoints(
						task.assignedTo,
						task.penaltyPoints,
						"subtract"
					);
				}

				// Update in database
				if (db) {
					db.collection("tasks").doc(task.id.toString()).update({
						isOverdue: true,
					});
				}
			}
		}
	});
}

function createRepeatingTask(originalTask) {
	const nextDueDate = new Date(originalTask.dueDate);

	switch (originalTask.repeatInterval) {
		case "daily":
			nextDueDate.setDate(nextDueDate.getDate() + 1);
			break;
		case "weekly":
			nextDueDate.setDate(nextDueDate.getDate() + 7);
			break;
		case "monthly":
			nextDueDate.setMonth(nextDueDate.getMonth() + 1);
			break;
	}

	const newTask = {
		id: taskIdCounter++,
		text: originalTask.text,
		status: "todo",
		type: "regular",
		createdAt: new Date().toISOString(),
		createdBy: originalTask.createdBy,
		assignedTo: originalTask.assignedTo,
		points: originalTask.points,
		penaltyPoints: originalTask.penaltyPoints,
		dueDate: nextDueDate.toISOString(),
		isRepeating: true,
		repeatInterval: originalTask.repeatInterval,
		completedAt: null,
		completedBy: null,
		approvedAt: null,
		approvedBy: null,
		isOverdue: false,
	};

	if (db) {
		Promise.all([
			db.collection("tasks").doc(newTask.id.toString()).set(newTask),
			db
				.collection("metadata")
				.doc("counter")
				.set({ taskIdCounter: taskIdCounter }),
		]).catch((error) => {
			console.error("Error creating repeating task:", error);
			taskIdCounter--;
		});
	}
}

function populateUserDropdown() {
	const regularSelect = document.getElementById("assignedUser");
	const demeritSelect = document.getElementById("demeritAssignedUser");

	if (!regularSelect || !demeritSelect) return;

	regularSelect.innerHTML = '<option value="">All Users</option>';
	demeritSelect.innerHTML = '<option value="">Select User</option>';

	Object.keys(users).forEach((username) => {
		if (users[username].role === "user") {
			// Regular task dropdown
			const option1 = document.createElement("option");
			option1.value = username;
			option1.textContent = users[username].displayName;
			regularSelect.appendChild(option1);

			// Demerit task dropdown
			const option2 = document.createElement("option");
			option2.value = username;
			option2.textContent = users[username].displayName;
			demeritSelect.appendChild(option2);
		}
	});
}

function updateUserPoints(
	username = currentUser,
	points = 0,
	operation = "set"
) {
	if (!username) return;

	if (operation === "set") {
		users[username].points = points;
	} else if (operation === "add") {
		users[username].points = (users[username].points || 0) + points;
	} else if (operation === "subtract") {
		users[username].points = Math.max(
			0,
			(users[username].points || 0) - points
		);
	}

	// Update in database
	if (db && username) {
		db.collection("userProfiles").doc(username).set({
			points: users[username].points,
			updatedAt: new Date().toISOString(),
		});
	}

	// Update UI if it's current user
	if (username === currentUser) {
		const pointsBadge = document.getElementById("userPoints");
		if (pointsBadge) {
			pointsBadge.textContent = `${
				users[currentUser].points || 0
			} Points`;
		}

		const myPointsStat = document.getElementById("myPointsStat");
		if (myPointsStat) {
			myPointsStat.textContent = users[currentUser].points || 0;
		}
	}

	return Promise.resolve();
}

function renderTasks() {
	const user = users[currentUser];

	if (user.role === "admin") {
		renderAdminView();
	} else {
		renderUserView();
	}
}

function renderAdminView() {
	// Render appeals pending review
	const pendingAppeals = tasks.filter(
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
							<span class="task-text">${escapeHtml(task.text)}</span>
							<span class="points-badge-small">-${task.penaltyPoints} pts (risk: -${
						task.penaltyPoints * 2
					})</span>
							<div class="task-meta">
								User: ${users[task.assignedTo]?.displayName || task.assignedTo}
								<br>Appealed: ${formatDate(task.appealedAt)}
								<br>Original demerit: ${formatDate(task.createdAt)}
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

	// Render suggested tasks
	const suggestedTasksContainer = document.getElementById("suggestedTasks");
	const pendingSuggestions = suggestions.filter(
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
							<span class="task-text">${escapeHtml(suggestion.description)}</span>
							<div class="task-meta">
								Suggested by: ${
									users[suggestion.suggestedBy]
										?.displayName || suggestion.suggestedBy
								}
								<br>Points: ${suggestion.suggestedPoints}
								${
									suggestion.justification
										? `<br>Reason: ${escapeHtml(
												suggestion.justification
										  )}`
										: ""
								}
								${
									suggestion.suggestedDueDate
										? `<br>Due: ${formatDate(
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

	// Render pending tasks
	const pendingTasks = tasks.filter((t) => t.status === "pending_approval");
	const pendingContainer = document.getElementById("pendingTasks");

	if (pendingContainer) {
		if (pendingTasks.length === 0) {
			pendingContainer.innerHTML =
				'<div class="empty-state">No tasks pending approval</div>';
		} else {
			pendingContainer.innerHTML = pendingTasks
				.map(
					(task) => `
				<div class="task-item pending-approval ${task.isOverdue ? "overdue" : ""}">
					<div class="task-content">
						<div>
							<span class="status-badge status-pending">Pending Approval</span>
							<span class="task-text">${escapeHtml(task.text)}</span>
							<span class="points-badge-small">+${task.points} pts</span>
							<div class="task-meta">
								Completed by: ${users[task.completedBy]?.displayName || task.completedBy}
								${task.dueDate ? `<br>Due: ${formatDate(task.dueDate)}` : ""}
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

	// Render all tasks
	const allTasksContainer = document.getElementById("allTasksAdmin");

	if (allTasksContainer) {
		if (tasks.length === 0) {
			allTasksContainer.innerHTML =
				'<div class="empty-state">No tasks created yet</div>';
		} else {
			allTasksContainer.innerHTML = tasks
				.map(
					(task) => `
				<div class="task-item ${task.status === "completed" ? "completed" : ""} ${
						task.isOverdue ? "overdue" : ""
					} ${task.type === "demerit" ? "demerit" : ""}">
					<div class="task-content">
						<div>
							<span class="status-badge ${getStatusClass(
								task.status,
								task.isOverdue,
								task.type
							)}">
								${getStatusText(task.status, task.isOverdue, task.type)}
							</span>
							<span class="task-text">${escapeHtml(task.text)}</span>
							<span class="points-badge-small">${
								task.type === "demerit"
									? "-" + task.penaltyPoints
									: "+" + task.points
							} pts</span>
							${
								task.type === "demerit" && task.appealStatus
									? `<span class="points-badge-small appeal-status">${task.appealStatus}</span>`
									: ""
							}
							<div class="task-meta">
								${
									task.assignedTo
										? `Assigned to: ${
												users[task.assignedTo]
													?.displayName ||
												task.assignedTo
										  }`
										: "All users"
								}
								${
									task.completedBy
										? `<br>Completed by: ${
												users[task.completedBy]
													?.displayName ||
												task.completedBy
										  }`
										: ""
								}
								${task.dueDate ? `<br>Due: ${formatDate(task.dueDate)}` : ""}
								${task.isRepeating ? "<br>🔄 Repeating" : ""}
								${task.type === "demerit" ? "<br>📋 Demerit Task" : ""}
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
}

function renderUserView() {
	// Demerit tasks assigned to current user
	const demeritTasks = tasks.filter(
		(t) => t.type === "demerit" && t.assignedTo === currentUser
	);
	const demeritContainer = document.getElementById("demeritTasks");

	if (demeritContainer) {
		if (demeritTasks.length === 0) {
			demeritContainer.innerHTML =
				'<div class="empty-state">No demerit tasks</div>';
		} else {
			demeritContainer.innerHTML = demeritTasks
				.map(
					(task) => `
				<div class="task-item demerit ${
					task.appealStatus === "pending" ? "appeal-pending" : ""
				}">
					<div class="task-content">
						<div>
							<span class="status-badge status-overdue">Demerit</span>
							<span class="task-text">${escapeHtml(task.text)}</span>
							<span class="points-badge-small">-${task.penaltyPoints} pts${
						task.appealStatus === "denied" ? " (doubled)" : ""
					}</span>
							${
								task.appealStatus
									? `<span class="points-badge-small appeal-status ${task.appealStatus}">${task.appealStatus}</span>`
									: ""
							}
							<div class="task-meta">
								Issued by: ${users[task.createdBy]?.displayName || task.createdBy}
								<br>Date: ${formatDate(task.createdAt)}
								${task.appealedAt ? `<br>Appealed: ${formatDate(task.appealedAt)}` : ""}
								${
									task.appealReviewedAt
										? `<br>Reviewed: ${formatDate(
												task.appealReviewedAt
										  )} by ${
												users[task.appealReviewedBy]
													?.displayName
										  }`
										: ""
								}
							</div>
							${
								!task.appealStatus
									? `
								<div class="appeal-warning">
									<div class="warning-title">⚠️ Appeal Risk Warning</div>
									<div>If approved: +${task.penaltyPoints} points restored</div>
									<div>If denied: -${task.penaltyPoints} additional points (double penalty)</div>
									<div><strong>Total risk: ${task.penaltyPoints * 2} points</strong></div>
								</div>
							`
									: ""
							}
						</div>
						<div class="task-actions">
							${
								!task.appealStatus
									? `<button class="action-btn appeal-btn" onclick="appealDemerit(${task.id})">Appeal (Risk: Double Penalty)</button>`
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

	// My tasks (assigned to me or unassigned, excluding demerit tasks)
	const myTasks = tasks.filter(
		(t) =>
			(t.assignedTo === currentUser || !t.assignedTo) &&
			t.status === "todo" &&
			!t.isOverdue &&
			t.type !== "demerit"
	);
	const myTasksContainer = document.getElementById("myTasks");

	if (myTasksContainer) {
		if (myTasks.length === 0) {
			myTasksContainer.innerHTML =
				'<div class="empty-state">No tasks available</div>';
		} else {
			myTasksContainer.innerHTML = myTasks
				.map(
					(task) => `
				<div class="task-item">
					<div class="task-content">
						<div>
							<span class="task-text">${escapeHtml(task.text)}</span>
							<span class="points-badge-small">+${task.points} pts</span>
							<div class="task-meta">
								Created by: ${users[task.createdBy]?.displayName || task.createdBy}
								${task.dueDate ? `<br>Due: ${formatDate(task.dueDate)}` : ""}
								${task.isRepeating ? "<br>🔄 Repeating" : ""}
							</div>
						</div>
						<div class="task-actions">
							<button class="action-btn check-btn" onclick="checkOffTask(${
								task.id
							})">Mark Complete</button>
						</div>
					</div>
				</div>
			`
				)
				.join("");
		}
	}

	// Overdue tasks
	const overdueTasks = tasks.filter(
		(t) =>
			(t.assignedTo === currentUser || !t.assignedTo) &&
			t.status !== "completed" &&
			t.isOverdue &&
			t.type !== "demerit"
	);
	const overdueContainer = document.getElementById("overdueTasks");

	if (overdueContainer) {
		if (overdueTasks.length === 0) {
			overdueContainer.innerHTML =
				'<div class="empty-state">No overdue tasks</div>';
		} else {
			overdueContainer.innerHTML = overdueTasks
				.map(
					(task) => `
				<div class="task-item overdue">
					<div class="task-content">
						<div>
							<span class="status-badge status-overdue">Overdue</span>
							<span class="task-text">${escapeHtml(task.text)}</span>
							<span class="points-badge-small">-${task.penaltyPoints} pts applied</span>
							<div class="task-meta">
								Created by: ${users[task.createdBy]?.displayName || task.createdBy}
								<br>Due: ${formatDate(task.dueDate)}
								${task.isRepeating ? "<br>🔄 Repeating" : ""}
							</div>
						</div>
						<div class="task-actions">
							<button class="action-btn check-btn" onclick="checkOffTask(${
								task.id
							})">Mark Complete</button>
						</div>
					</div>
				</div>
			`
				)
				.join("");
		}
	}

	// Completed tasks by current user
	const completedTasks = tasks.filter(
		(t) =>
			t.completedBy === currentUser &&
			(t.status === "pending_approval" || t.status === "completed") &&
			t.type !== "demerit"
	);
	const completedContainer = document.getElementById("completedTasks");

	if (completedContainer) {
		if (completedTasks.length === 0) {
			completedContainer.innerHTML =
				'<div class="empty-state">No completed tasks</div>';
		} else {
			completedContainer.innerHTML = completedTasks
				.map(
					(task) => `
				<div class="task-item ${
					task.status === "completed"
						? "completed"
						: "pending-approval"
				}">
					<div class="task-content">
						<div>
							<span class="status-badge ${
								task.status === "completed"
									? "status-completed"
									: "status-pending"
							}">
								${task.status === "completed" ? "Approved" : "Pending Approval"}
							</span>
							<span class="task-text">${escapeHtml(task.text)}</span>
							<span class="points-badge-small">+${task.points} pts</span>
							<div class="task-meta">
								Created by: ${users[task.createdBy]?.displayName || task.createdBy}
								${task.dueDate ? `<br>Due: ${formatDate(task.dueDate)}` : ""}
							</div>
						</div>
					</div>
				</div>
			`
				)
				.join("");
		}
	}
}

function renderSuggestions() {
	// This will be called when suggestions are updated
	if (activeTab === "suggest") {
		renderMySuggestions();
	}
}

function renderMySuggestions() {
	const mySuggestions = suggestions.filter(
		(s) => s.suggestedBy === currentUser
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
						<span class="status-badge ${getSuggestionStatusClass(suggestion.status)}">
							${suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
						</span>
						<span class="task-text">${escapeHtml(suggestion.description)}</span>
						<span class="points-badge-small">${suggestion.suggestedPoints} pts</span>
						<div class="task-meta">
							Submitted: ${formatDate(suggestion.createdAt)}
							${
								suggestion.suggestedDueDate
									? `<br>Suggested due: ${formatDate(
											suggestion.suggestedDueDate
									  )}`
									: ""
							}
							${
								suggestion.reviewedAt
									? `<br>Reviewed: ${formatDate(
											suggestion.reviewedAt
									  )} by ${
											users[suggestion.reviewedBy]
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
}

function updateStats() {
	const total = tasks.length;
	const pending = tasks.filter(
		(t) => t.status === "todo" || t.status === "pending_approval"
	).length;
	const completed = tasks.filter((t) => t.status === "completed").length;

	const totalTasksEl = document.getElementById("totalTasksStat");
	const pendingCountEl = document.getElementById("pendingCountStat");
	const completedCountEl = document.getElementById("completedCountStat");
	const myPointsEl = document.getElementById("myPointsStat");

	if (totalTasksEl) totalTasksEl.textContent = total;
	if (pendingCountEl) pendingCountEl.textContent = pending;
	if (completedCountEl) completedCountEl.textContent = completed;
	if (myPointsEl) myPointsEl.textContent = users[currentUser]?.points || 0;
}

// Utility functions
function escapeHtml(text) {
	const div = document.createElement("div");
	div.textContent = text;
	return div.innerHTML;
}

function formatDate(dateString) {
	if (!dateString) return "";
	const date = new Date(dateString);
	return (
		date.toLocaleDateString() +
		" " +
		date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
	);
}

function getStatusClass(status, isOverdue, type) {
	if (type === "demerit") return "status-overdue";
	if (isOverdue) return "status-overdue";
	if (status === "completed") return "status-completed";
	if (status === "failed") return "status-overdue";
	return "status-pending";
}

function getStatusText(status, isOverdue, type) {
	if (type === "demerit") return "Demerit";
	if (isOverdue) return "Overdue";
	if (status === "completed") return "Completed";
	if (status === "failed") return "Failed";
	if (status === "pending_approval") return "Pending";
	return "To Do";
}

function getSuggestionStatusClass(status) {
	switch (status) {
		case "approved":
			return "status-completed";
		case "rejected":
			return "status-overdue";
		default:
			return "status-pending";
	}
}
