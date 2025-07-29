// Simplified User Configuration - Only Admin and One User
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
			"manage_users", // Keeping for now, but effectively unused
			"view_dashboard",
			"approve_suggestions",
		],
		points: 0,
	},
	user: {
		password: "user123",
		role: "user",
		displayName: "User",
		permissions: ["check_task", "view_assigned_tasks", "suggest_task"],
		points: 0,
	},
};

let currentUser = null;
let tasks = [];
let suggestions = [];
let userProfiles = {}; // Still used for points, but only for 'user'
let userActivityLog = []; // Still logs for 'user' and 'admin'
let taskIdCounter = 1;
let suggestionIdCounter = 1;
let activityIdCounter = 1;
let db = null;
let unsubscribe = null;
let overdueCheckIntervalId = null; // To store the interval ID for overdue task checks
const OVERDUE_CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes (in milliseconds)
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

	// Log login activity
	logUserActivity("login");

	// Show dashboard tab only for admin, hide suggest tab for admin
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

	// Setup repeating task checkbox listener
	const isRepeatingCheckbox = document.getElementById("isRepeating");
	if (isRepeatingCheckbox) {
		isRepeatingCheckbox.addEventListener("change", function () {
			const repeatOptions = document.getElementById("repeatOptions");
			if (repeatOptions) {
				repeatOptions.style.display = this.checked ? "block" : "none";
			}
		});
	}

	// Setup demerit checkbox listener
	const isDemeritCheckbox = document.getElementById("isDemerit");
	if (isDemeritCheckbox) {
		isDemeritCheckbox.addEventListener("change", function () {
			const demeritWarning = document.getElementById("demeritWarning");
			if (demeritWarning) {
				demeritWarning.style.display = this.checked ? "block" : "none";
			}
			// When demerit is checked, hide points and due date, show penalty points
			const taskPointsEl = document.getElementById("taskPoints");
			const penaltyPointsEl = document.getElementById("penaltyPoints");
			const taskDueDateEl = document.getElementById("taskDueDate");

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
				// Make sure penalty points are visible for regular tasks too if needed, or hide if not
				if (penaltyPointsEl)
					penaltyPointsEl.closest(".form-group").style.display =
						"block";
			}
		});
	}

	loadData();
	updateUserPoints();
	renderCalendar();

	// Start periodic check for overdue tasks ONLY when the main app is shown
	if (overdueCheckIntervalId) {
		clearInterval(overdueCheckIntervalId); // Clear any existing interval
	}
	overdueCheckIntervalId = setInterval(
		checkForOverdueTasks,
		OVERDUE_CHECK_INTERVAL
	);
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
	// Log logout activity before clearing user
	if (currentUser) {
		logUserActivity("logout");
	}

	if (unsubscribe) {
		unsubscribe();
		unsubscribe = null;
	}
	if (overdueCheckIntervalId) {
		clearInterval(overdueCheckIntervalId); // Stop periodic check on logout
		overdueCheckIntervalId = null;
	}
	currentUser = null;
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	hideError();
	showLogin();
};

// User activity logging
function logUserActivity(action) {
	const activity = {
		id: activityIdCounter++,
		user: currentUser,
		action: action,
		timestamp: new Date().toISOString(),
	};

	userActivityLog.unshift(activity);

	// Keep only last 50 activities
	if (userActivityLog.length > 50) {
		userActivityLog = userActivityLog.slice(0, 50);
	}

	// Save to database
	if (db) {
		db.collection("userActivity")
			.doc(activity.id.toString())
			.set(activity)
			.catch((error) => {
				console.error("Error logging activity:", error);
			});
	}
}

// Enhanced task creation
window.createTask = function () {
	if (!hasPermission("create_task")) {
		showNotification("You do not have permission to create tasks", "error");
		return;
	}

	const taskInput = document.getElementById("taskInput");
	const taskText = taskInput.value.trim();
	const isDemerit = document.getElementById("isDemerit")
		? document.getElementById("isDemerit").checked
		: false;

	if (taskText === "") {
		showNotification("Please enter a task description", "error");
		return;
	}

	let task;

	if (isDemerit) {
		// Create demerit task
		const penaltyPoints =
			parseInt(document.getElementById("penaltyPoints").value) || 5;

		task = {
			id: taskIdCounter++,
			text: taskText,
			status: "demerit_issued",
			type: "demerit",
			createdAt: new Date().toISOString(),
			createdBy: currentUser,
			assignedTo: "user", // Always assigned to 'user'
			points: 0, // Demerits have 0 reward points
			penaltyPoints: penaltyPoints,
			dueDate: null, // Demerits typically don't have due dates
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
			acceptedAt: null,
			appealText: null, // New field for appeal text
		};

		// Immediately apply penalty points
		updateUserPoints("user", penaltyPoints, "subtract");
	} else {
		// Create regular task
		const points =
			parseInt(document.getElementById("taskPoints").value) || 10;
		const penaltyPoints =
			parseInt(document.getElementById("penaltyPoints").value) || 5;
		const dueDate = document.getElementById("taskDueDate").value;
		const isRepeating = document.getElementById("isRepeating")
			? document.getElementById("isRepeating").checked
			: false;
		const repeatInterval = document.getElementById("repeatInterval")
			? document.getElementById("repeatInterval").value
			: null;

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
			assignedTo: "user", // Always assigned to 'user'
			points: points,
			penaltyPoints: penaltyPoints,
			dueDate: dueDate || null,
			isRepeating: isRepeating,
			repeatInterval: repeatInterval,
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
				const taskDueDateEl = document.getElementById("taskDueDate");
				const isRepeatingEl = document.getElementById("isRepeating");
				const isDemeritEl = document.getElementById("isDemerit");
				const demeritWarningEl =
					document.getElementById("demeritWarning");
				const repeatOptionsEl =
					document.getElementById("repeatOptions");

				if (taskPointsEl) {
					taskPointsEl.value = "10";
					taskPointsEl.closest(".form-group").style.display = "block"; // Ensure visible for next regular task
				}
				if (penaltyPointsEl) penaltyPointsEl.value = "5";
				if (taskDueDateEl) {
					taskDueDateEl.value = "";
					taskDueDateEl.closest(".form-group").style.display =
						"block"; // Ensure visible for next regular task
				}
				if (isRepeatingEl) isRepeatingEl.checked = false;
				if (isDemeritEl) isDemeritEl.checked = false;
				if (demeritWarningEl) demeritWarningEl.style.display = "none";
				if (repeatOptionsEl) repeatOptionsEl.style.display = "none";

				if (isDemerit) {
					showNotification(
						`Demerit task issued to user. ${task.penaltyPoints} points deducted.`,
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

	// User can only check off regular tasks, not demerits
	if (task.type === "demerit") {
		showNotification(
			"Demerit tasks cannot be marked as complete.",
			"error"
		);
		return;
	}

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

	// Use a custom modal or message box instead of confirm
	const confirmReject = (message, onConfirm) => {
		const modal = document.createElement("div");
		modal.className = "modal-overlay";
		modal.innerHTML = `
			<div class="modal-content">
				<p>${message}</p>
				<div class="modal-actions">
					<button id="modalConfirm" class="action-btn approve-btn">Confirm</button>
					<button id="modalCancel" class="action-btn delete-btn">Cancel</button>
				</div>
			</div>
		`;
		document.body.appendChild(modal);

		document.getElementById("modalConfirm").onclick = () => {
			onConfirm(true);
			document.body.removeChild(modal);
		};
		document.getElementById("modalCancel").onclick = () => {
			onConfirm(false);
			document.body.removeChild(modal);
		};
	};

	confirmReject(
		`Are you sure you want to reject this task? This will apply a ${
			task.penaltyPoints
		} point penalty to ${users[task.completedBy]?.displayName}.`,
		(confirmed) => {
			if (!confirmed) {
				return;
			}

			const updates = {
				status: "failed",
				rejectedAt: new Date().toISOString(),
				rejectedBy: currentUser,
			};

			if (db) {
				Promise.all([
					db
						.collection("tasks")
						.doc(taskId.toString())
						.update(updates),
					updateUserPoints(
						task.completedBy,
						task.penaltyPoints,
						"subtract"
					),
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
		}
	);
};

window.deleteTask = function (taskId) {
	if (!hasPermission("delete_task")) {
		showNotification("You do not have permission to delete tasks", "error");
		return;
	}

	// Use a custom modal or message box instead of confirm
	const confirmDelete = (message, onConfirm) => {
		const modal = document.createElement("div");
		modal.className = "modal-overlay";
		modal.innerHTML = `
			<div class="modal-content">
				<p>${message}</p>
				<div class="modal-actions">
					<button id="modalConfirm" class="action-btn approve-btn">Confirm</button>
					<button id="modalCancel" class="action-btn delete-btn">Cancel</button>
				</div>
			</div>
		`;
		document.body.appendChild(modal);

		document.getElementById("modalConfirm").onclick = () => {
			onConfirm(true);
			document.body.removeChild(modal);
		};
		document.getElementById("modalCancel").onclick = () => {
			onConfirm(false);
			document.body.removeChild(modal);
		};
	};

	confirmDelete("Are you sure you want to delete this task?", (confirmed) => {
		if (!confirmed) {
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
	});
};

window.acceptDemerit = function (taskId) {
	const task = tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "demerit") return;

	const updates = {
		acceptedAt: new Date().toISOString(),
		status: "demerit_accepted",
	};

	if (db) {
		db.collection("tasks")
			.doc(taskId.toString())
			.update(updates)
			.then(() => {
				showNotification(
					"Demerit accepted. You can still appeal if you believe this is unfair."
				);
			})
			.catch((error) => {
				console.error("Error accepting demerit:", error);
				showNotification("Failed to accept demerit", "error");
			});
	}
};

window.appealDemerit = function (taskId) {
	const task = tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "demerit") return;

	// Custom modal for appeal with text input
	const showAppealModal = (task, onSubmit) => {
		const modal = document.createElement("div");
		modal.className = "modal-overlay";
		modal.innerHTML = `
			<div class="modal-content">
				<h3>Appeal Demerit Task</h3>
				<p><strong>Task:</strong> ${escapeHtml(task.text)}</p>
				<p><strong>Penalty:</strong> -${task.penaltyPoints} points</p>
				<div class="appeal-warning">
					<div class="warning-title">⚠️ Appeal Risk Warning</div>
					<div>If approved: +${task.penaltyPoints} points restored</div>
					<div>If denied: -${task.penaltyPoints} additional points (double penalty)</div>
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

		document.getElementById("modalSubmitAppeal").onclick = () => {
			const appealText = document
				.getElementById("appealTextInput")
				.value.trim();
			const appealError = document.getElementById("appealError");
			if (appealText.length < 10) {
				// Require at least 10 characters for appeal
				appealError.textContent =
					"Appeal text must be at least 10 characters long.";
				appealError.style.display = "block";
			} else {
				onSubmit(appealText);
				document.body.removeChild(modal);
			}
		};
		document.getElementById("modalCancelAppeal").onclick = () => {
			document.body.removeChild(modal);
		};
	};

	showAppealModal(task, (appealText) => {
		const updates = {
			appealStatus: "pending",
			appealedAt: new Date().toISOString(),
			appealText: appealText, // Save the appeal text
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
	});
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
			updateUserPoints(task.assignedTo, task.penaltyPoints, "add"),
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

	// Use a custom modal or message box instead of confirm
	const confirmDeny = (message, onConfirm) => {
		const modal = document.createElement("div");
		modal.className = "modal-overlay";
		modal.innerHTML = `
			<div class="modal-content">
				<p>${message}</p>
				<div class="modal-actions">
					<button id="modalConfirm" class="action-btn approve-btn">Confirm</button>
					<button id="modalCancel" class="action-btn delete-btn">Cancel</button>
				</div>
			</div>
		`;
		document.body.appendChild(modal);

		document.getElementById("modalConfirm").onclick = () => {
			onConfirm(true);
			document.body.removeChild(modal);
		};
		document.getElementById("modalCancel").onclick = () => {
			onConfirm(false);
			document.body.removeChild(modal);
		};
	};

	confirmDeny(
		`Are you sure you want to deny this appeal? This will apply an additional ${
			task.penaltyPoints
		} point penalty to ${
			users[task.assignedTo]?.displayName
		} (double penalty).`,
		(confirmed) => {
			if (!confirmed) {
				return;
			}

			const updates = {
				appealStatus: "denied",
				appealReviewedAt: new Date().toISOString(),
				appealReviewedBy: currentUser,
			};

			if (db) {
				Promise.all([
					db
						.collection("tasks")
						.doc(taskId.toString())
						.update(updates),
					updateUserPoints(
						task.assignedTo,
						task.penaltyPoints,
						"subtract"
					),
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
		}
	);
};

window.rejectSuggestion = function (suggestionId) {
	if (!hasPermission("approve_suggestions")) {
		showNotification(
			"You do not have permission to reject suggestions",
			"error"
		);
		return;
	}

	// Use a custom modal or message box instead of confirm
	const confirmReject = (message, onConfirm) => {
		const modal = document.createElement("div");
		modal.className = "modal-overlay";
		modal.innerHTML = `
			<div class="modal-content">
				<p>${message}</p>
				<div class="modal-actions">
					<button id="modalConfirm" class="action-btn approve-btn">Confirm</button>
					<button id="modalCancel" class="action-btn delete-btn">Cancel</button>
				</div>
			</div>
		`;
		document.body.appendChild(modal);

		document.getElementById("modalConfirm").onclick = () => {
			onConfirm(true);
			document.body.removeChild(modal);
		};
		document.getElementById("modalCancel").onclick = () => {
			onConfirm(false);
			document.body.removeChild(modal);
		};
	};

	confirmReject(
		"Are you sure you want to reject this suggestion?",
		(confirmed) => {
			if (!confirmed) {
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
						showNotification(
							"Failed to reject suggestion",
							"error"
						);
					});
			}
		}
	);
};

function submitTaskSuggestion() {
	const description = document.getElementById("suggestedTaskDescription");
	const justification = document.getElementById("taskJustification");
	const points = document.getElementById("suggestedPoints");
	const dueDate = document.getElementById("suggestedDueDate");

	if (!description || !description.value.trim()) {
		showNotification("Please enter a task description", "error");
		return;
	}

	const suggestion = {
		id: suggestionIdCounter++,
		description: description.value.trim(),
		justification: justification ? justification.value.trim() : "",
		suggestedPoints: points ? parseInt(points.value) || 10 : 10,
		suggestedDueDate: dueDate ? dueDate.value || null : null,
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
				const form = document.getElementById("suggestForm");
				if (form) form.reset();
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

	const task = {
		id: taskIdCounter++,
		text: suggestion.description,
		status: "todo",
		type: "regular",
		createdAt: new Date().toISOString(),
		createdBy: currentUser,
		assignedTo: "user", // Always assigned to 'user'
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

		// Filter tasks for the 'user' only for calendar view
		const dayTasks = tasks.filter(
			(t) => t.assignedTo === "user" && getTasksForDate(date).includes(t)
		);
		if (dayTasks.length > 0) {
			dayEl.classList.add("has-tasks");
			const hasOverdue = dayTasks.some((task) => isTaskOverdue(task));
			if (hasOverdue) {
				dayEl.classList.add("has-overdue");
			}

			dayTasks.forEach((task, index) => {
				if (index < 3) {
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

function renderDashboard() {
	if (!hasPermission("view_dashboard")) return;

	// Dashboard now only focuses on the single 'user'
	const userActivity = userActivityLog.filter((a) => a.user === "user");
	const lastActivity = userActivity[0];
	const isUserOnline = lastActivity && lastActivity.action === "login";

	const activeTasks = tasks.filter(
		(t) =>
			t.status !== "completed" &&
			t.type !== "demerit" &&
			t.assignedTo === "user"
	);
	const completedTasks = tasks.filter(
		(t) => t.status === "completed" && t.assignedTo === "user"
	);
	const allNonDemeritTasks = tasks.filter(
		(t) => t.type !== "demerit" && t.assignedTo === "user"
	);
	const completionRate =
		allNonDemeritTasks.length > 0
			? Math.round(
					(completedTasks.length / allNonDemeritTasks.length) * 100
			  )
			: 0;

	const userStatusEl = document.getElementById("userStatus");
	const activeTasksEl = document.getElementById("activeTasks");
	const completionRateEl = document.getElementById("completionRate");

	if (userStatusEl) {
		userStatusEl.textContent = isUserOnline ? "Online" : "Offline";
		userStatusEl.style.color = isUserOnline ? "#059669" : "#dc2626";
	}
	if (activeTasksEl) activeTasksEl.textContent = activeTasks.length;
	if (completionRateEl) completionRateEl.textContent = `${completionRate}%`;

	renderUserActivityLog();
	renderUserProgress();
}

function renderUserActivityLog() {
	const activityLogEl = document.getElementById("userActivityLog");
	if (!activityLogEl) return;

	// Filter activity log to only show the 'user' and 'admin'
	const filteredActivityLog = userActivityLog.filter(
		(a) => a.user === "user" || a.user === "admin"
	);

	if (filteredActivityLog.length === 0) {
		activityLogEl.innerHTML =
			'<div class="empty-state">No user activity recorded</div>';
	} else {
		activityLogEl.innerHTML = filteredActivityLog
			.slice(0, 20)
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
				<div class="activity-time">${formatDate(activity.timestamp)}</div>
			</div>
		`
			)
			.join("");
	}
}

function renderUserProgress() {
	const progressList = document.getElementById("userProgressList");
	if (!progressList) return;

	const user = users["user"];
	const userTasks = tasks.filter(
		(t) => t.assignedTo === "user" && t.type !== "demerit"
	);
	const completed = userTasks.filter((t) => t.status === "completed");
	const pending = userTasks.filter(
		(t) => t.status === "todo" || t.status === "pending_approval"
	);
	const overdue = userTasks.filter(
		(t) => isTaskOverdue(t) && t.status !== "completed"
	);
	const demeritTasks = tasks.filter(
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
}

function loadData() {
	if (db) {
		if (unsubscribe) unsubscribe();

		unsubscribe = db.collection("tasks").onSnapshot((snapshot) => {
			tasks = [];
			snapshot.forEach((doc) => {
				tasks.push({ id: parseInt(doc.id), ...doc.data() });
			});
			tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
			// Removed checkForOverdueTasks() from here to reduce writes
			renderTasks();
			updateStats();
		});

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

		db.collection("userActivity").onSnapshot((snapshot) => {
			userActivityLog = [];
			snapshot.forEach((doc) => {
				userActivityLog.push({ id: parseInt(doc.id), ...doc.data() });
			});
			userActivityLog.sort(
				(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
			);
		});

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

		db.collection("metadata")
			.doc("activityCounter")
			.get()
			.then((doc) => {
				if (doc.exists) {
					activityIdCounter = doc.data().activityIdCounter || 1;
				}
			});

		db.collection("userProfiles").onSnapshot((snapshot) => {
			snapshot.forEach((doc) => {
				const username = doc.id;
				const profileData = doc.data();
				// Only update points for the existing 'user' and 'admin' objects
				if (users[username]) {
					users[username].points = profileData.points || 0;
				}
			});
			updateUserPoints();
		});
	}
}

function checkForOverdueTasks() {
	console.log("Checking for overdue tasks...");
	const now = new Date();
	tasks.forEach((task) => {
		if (
			task.dueDate &&
			task.status !== "completed" &&
			task.type !== "demerit" &&
			task.assignedTo === "user" // Only check overdue for the single user
		) {
			const wasOverdue = task.isOverdue;
			const isNowOverdue = new Date(task.dueDate) < now;

			if (isNowOverdue && !wasOverdue) {
				console.log(
					`Task ${task.id} is now overdue. Applying penalty.`
				);
				task.isOverdue = true;
				// Penalty is applied only once when it becomes overdue
				updateUserPoints(
					task.assignedTo,
					task.penaltyPoints,
					"subtract"
				);

				if (db) {
					db.collection("tasks")
						.doc(task.id.toString())
						.update({
							isOverdue: true,
						})
						.catch((error) => {
							console.error(
								"Error updating overdue status:",
								error
							);
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
		assignedTo: "user", // Always assigned to 'user'
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

function updateUserPoints(
	username = currentUser,
	points = 0,
	operation = "set"
) {
	// Ensure only 'user' and 'admin' points are updated
	if (!username || !users[username]) return Promise.resolve();

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

	if (db && username) {
		db.collection("userProfiles").doc(username).set({
			points: users[username].points,
			updatedAt: new Date().toISOString(),
		});
	}

	// Update UI for the currently logged-in user
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
								${
									task.acceptedAt
										? `<br>Accepted: ${formatDate(
												task.acceptedAt
										  )}`
										: "<br>Status: Not accepted"
								}
								${task.appealText ? `<br>Appeal Reason: ${escapeHtml(task.appealText)}` : ""}
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

	const pendingTasks = tasks.filter(
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
					} ${task.type === "demerit" ? "demerit-task" : ""}">
					<div class="task-content">
						<div>
							<span class="status-badge ${getStatusClass(
								task.status,
								task.isOverdue,
								task.type,
								task.appealStatus
							)}">
								${getStatusText(task.status, task.isOverdue, task.type, task.appealStatus)}
							</span>
							<span class="task-text">${escapeHtml(task.text)}</span>
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
								Assigned to: ${users[task.assignedTo]?.displayName || task.assignedTo}
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
								${
									task.type === "demerit" && task.acceptedAt
										? `<br>Accepted: ${formatDate(
												task.acceptedAt
										  )}`
										: ""
								}
								${task.appealText ? `<br>Appeal Reason: ${escapeHtml(task.appealText)}` : ""}
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
	const userTasks = tasks.filter((t) => t.assignedTo === currentUser);
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
					task.type === "demerit" ? "demerit-task-user" : "" // New class for user demerit tasks
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
							<span class="status-badge ${getStatusClass(
								task.status,
								task.isOverdue,
								task.type,
								task.appealStatus
							)}">
								${getStatusText(task.status, task.isOverdue, task.type, task.appealStatus)}
							</span>
							<span class="task-text">${escapeHtml(task.text)}</span>
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
												users[task.createdBy]
													?.displayName ||
												task.createdBy
										  }`
										: `Created by: ${
												users[task.createdBy]
													?.displayName ||
												task.createdBy
										  }`
								}
								${task.dueDate ? `<br>Due: ${formatDate(task.dueDate)}` : ""}
								${task.isRepeating ? "<br>🔄 Repeating" : ""}
								${task.type === "demerit" ? "<br>📋 Demerit Task" : ""}
								${
									task.completedBy
										? `<br>Completed by: ${
												users[task.completedBy]
													?.displayName ||
												task.completedBy
										  }`
										: ""
								}
								${
									task.approvedBy
										? `<br>Approved by: ${
												users[task.approvedBy]
													?.displayName ||
												task.approvedBy
										  }`
										: ""
								}
								${
									task.rejectedBy
										? `<br>Rejected by: ${
												users[task.rejectedBy]
													?.displayName ||
												task.rejectedBy
										  }`
										: ""
								}
								${task.acceptedAt ? `<br>Accepted: ${formatDate(task.acceptedAt)}` : ""}
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
								${task.appealText ? `<br>Appeal Reason: ${escapeHtml(task.appealText)}` : ""}
							</div>
							${
								task.type === "demerit" &&
								!task.appealStatus &&
								!task.acceptedAt
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
								task.type === "demerit" && !task.appealStatus
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
}

function renderSuggestions() {
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
	// Stats now only reflect tasks assigned to the current user (if user) or all tasks (if admin)
	const relevantTasks = tasks.filter(
		(t) => currentUser === "admin" || t.assignedTo === currentUser
	);

	const total = relevantTasks.filter((t) => t.type !== "demerit").length;
	const pending = relevantTasks.filter(
		(t) =>
			(t.status === "todo" || t.status === "pending_approval") &&
			t.type !== "demerit"
	).length;
	const completed = relevantTasks.filter(
		(t) => t.status === "completed"
	).length;

	const totalTasksEl = document.getElementById("totalTasksStat");
	const pendingCountEl = document.getElementById("pendingCountStat");
	const completedCountEl = document.getElementById("completedCountStat");
	const myPointsEl = document.getElementById("myPointsStat");

	if (totalTasksEl) totalTasksEl.textContent = total;
	if (pendingCountEl) pendingCountEl.textContent = pending;
	if (completedCountEl) completedCountEl.textContent = completed;
	if (myPointsEl) myPointsEl.textContent = users[currentUser]?.points || 0;
}

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

function getStatusClass(status, isOverdue, type, appealStatus) {
	if (type === "demerit") {
		if (appealStatus === "pending") return "status-pending-appeal"; // New class for pending appeal
		if (appealStatus === "approved") return "status-completed"; // Appeal approved
		if (appealStatus === "denied") return "status-overdue"; // Appeal denied (double penalty)
		return "status-demerit"; // Default demerit status
	}
	if (isOverdue) return "status-overdue";
	if (status === "completed") return "status-completed";
	if (status === "failed") return "status-overdue";
	return "status-pending";
}

function getStatusText(status, isOverdue, type, appealStatus) {
	if (type === "demerit") {
		if (appealStatus === "pending") return "Appeal Pending";
		if (appealStatus === "approved") return "Appeal Approved";
		if (appealStatus === "denied") return "Appeal Denied";
		if (status === "demerit_accepted") return "Demerit Accepted";
		return "Demerit Issued";
	}
	if (isOverdue) return "Overdue";
	if (status === "completed") return "Completed";
	if (status === "failed") return "Failed";
	if (status === "pending_approval") return "Pending Approval";
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
