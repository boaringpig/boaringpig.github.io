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
let supabase = null; // Changed from 'db' to 'supabase'
let unsubscribe = null; // Will now hold Supabase channel subscriptions
let overdueCheckIntervalId = null; // To store the interval ID for overdue task checks
const OVERDUE_CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes (in milliseconds)
let currentDate = new Date();
let activeTab = "tasks";

// Initialize Supabase and load data on page load
window.addEventListener("load", function () {
	initializeSupabase(); // Renamed function
});

function initializeSupabase() { // Renamed function
	try {
		const supabaseUrl = window.supabaseConfig?.supabaseUrl;
		const supabaseAnonKey = window.supabaseConfig?.supabaseAnonKey;

		if (!supabaseUrl || !supabaseAnonKey) {
			throw new Error("Supabase configuration (URL or Anon Key) not found in config.js");
		}

		if (!supabase) { // Check if client is already initialized
			// Use window.supabase.createClient as the Supabase library exposes itself globally as 'supabase'
			supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
		}

		console.log("Supabase initialized successfully");
		showLogin();
	} catch (error) {
		console.error("Supabase initialization error:", error);
		showError(
			"Failed to connect to Supabase. Please check your configuration and ensure Supabase library is loaded."
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
				if (taskPointsEl) taskPointsEl.closest('.form-group').style.display = 'none';
				if (taskDueDateEl) taskDueDateEl.closest('.form-group').style.display = 'none';
				if (penaltyPointsEl) penaltyPointsEl.closest('.form-group').style.display = 'block';
			} else {
				if (taskPointsEl) taskPointsEl.closest('.form-group').style.display = 'block';
				if (taskDueDateEl) taskDueDateEl.closest('.form-group').style.display = 'block';
				// Make sure penalty points are visible for regular tasks too if needed, or hide if not
				if (penaltyPointsEl) penaltyPointsEl.closest('.form-group').style.display = 'block';
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
	overdueCheckIntervalId = setInterval(checkForOverdueTasks, OVERDUE_CHECK_INTERVAL);
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

	// Unsubscribe from all Supabase channels
	if (unsubscribe) {
		if (unsubscribe.tasks) supabase.removeChannel(unsubscribe.tasks);
		if (unsubscribe.suggestions) supabase.removeChannel(unsubscribe.suggestions);
		if (unsubscribe.activity) supabase.removeChannel(unsubscribe.activity);
		if (unsubscribe.userProfiles) supabase.removeChannel(unsubscribe.userProfiles);
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
async function logUserActivity(action) { // Made async
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
	if (supabase) {
		const { error } = await supabase.from('userActivity').insert([activity]);
		if (error) {
			console.error("Error logging activity:", error);
		}
	}
}

// Enhanced task creation
window.createTask = async function () { // Made async
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
		await updateUserPoints("user", penaltyPoints, "subtract"); // Await for points update
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

	if (supabase) {
		const { error: taskError } = await supabase.from('tasks').insert([task]);
		const { error: metadataError } = await supabase
			.from('metadata')
			.upsert({ id: 'counters', taskIdCounter: taskIdCounter }, { onConflict: 'id' }); // Use upsert for counters

		if (taskError || metadataError) {
			console.error("Error creating task:", taskError || metadataError);
			showNotification(
				"Failed to create task. Please try again.",
				"error"
			);
			taskIdCounter--; // Rollback counter if error
		} else {
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
				taskPointsEl.closest('.form-group').style.display = 'block'; // Ensure visible for next regular task
			}
			if (penaltyPointsEl) penaltyPointsEl.value = "5";
			if (taskDueDateEl) {
				taskDueDateEl.value = "";
				taskDueDateEl.closest('.form-group').style.display = 'block'; // Ensure visible for next regular task
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
		}
	} else {
		showNotification("Database not connected", "error");
	}
};

window.checkOffTask = async function (taskId) { // Made async
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
		showNotification("Demerit tasks cannot be marked as complete.", "error");
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

	if (supabase) {
		const { error } = await supabase.from('tasks').update(updates).eq('id', taskId);
		if (error) {
			console.error("Error updating task:", error);
			showNotification("Failed to update task", "error");
		} else {
			showNotification("Task marked as complete! Awaiting approval.");
		}
	}
};

window.approveTask = async function (taskId) { // Made async
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

	if (supabase) {
		const { error: taskError } = await supabase.from('tasks').update(updates).eq('id', taskId);
		if (taskError) {
			console.error("Error approving task:", taskError);
			showNotification("Failed to approve task", "error");
			return;
		}

		await updateUserPoints(task.completedBy, task.points, "add");

		showNotification(
			`Task approved! ${task.points} points awarded to ${
				users[task.completedBy]?.displayName
			}`
		);

		if (task.isRepeating && task.dueDate) {
			createRepeatingTask(task);
		}
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
		const modal = document.createElement('div');
		modal.className = 'modal-overlay';
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

		document.getElementById('modalConfirm').onclick = () => {
			onConfirm(true);
			document.body.removeChild(modal);
		};
		document.getElementById('modalCancel').onclick = () => {
			onConfirm(false);
			document.body.removeChild(modal);
		};
	};

	confirmReject(
		`Are you sure you want to reject this task? This will apply a ${
			task.penaltyPoints
		} point penalty to ${users[task.completedBy]?.displayName}.`,
		async (confirmed) => { // Made async
			if (!confirmed) {
				return;
			}

			const updates = {
				status: "failed",
				rejectedAt: new Date().toISOString(),
				rejectedBy: currentUser,
			};

			if (supabase) {
				const { error: taskError } = await supabase.from('tasks').update(updates).eq('id', taskId);
				if (taskError) {
					console.error("Error rejecting task:", taskError);
					showNotification("Failed to reject task", "error");
					return;
				}

				await updateUserPoints(task.completedBy, task.penaltyPoints, "subtract");

				showNotification(
					`Task rejected! ${
						task.penaltyPoints
					} penalty points applied to ${
						users[task.completedBy]?.displayName
					}`,
					"warning"
				);
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
		const modal = document.createElement('div');
		modal.className = 'modal-overlay';
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

		document.getElementById('modalConfirm').onclick = () => {
			onConfirm(true);
			document.body.removeChild(modal);
		};
		document.getElementById('modalCancel').onclick = () => {
			onConfirm(false);
			document.body.removeChild(modal);
		};
	};

	confirmDelete("Are you sure you want to delete this task?", async (confirmed) => { // Made async
		if (!confirmed) {
			return;
		}

		if (supabase) {
			const { error } = await supabase.from('tasks').delete().eq('id', taskId);
			if (error) {
				console.error("Error deleting task:", error);
				showNotification("Failed to delete task", "error");
			} else {
				showNotification("Task deleted successfully");
			}
		}
	});
};

window.acceptDemerit = async function (taskId) { // Made async
	const task = tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "demerit") return;

	const updates = {
		acceptedAt: new Date().toISOString(),
		status: "demerit_accepted",
	};

	if (supabase) {
		const { error } = await supabase.from('tasks').update(updates).eq('id', taskId);
		if (error) {
			console.error("Error accepting demerit:", error);
			showNotification("Failed to accept demerit", "error");
		} else {
			showNotification(
				"Demerit accepted. You can still appeal if you believe this is unfair."
			);
		}
	}
};

window.appealDemerit = function (taskId) {
	const task = tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "demerit") return;

	// Custom modal for appeal with text input
	const showAppealModal = (task, onSubmit) => {
		const modal = document.createElement('div');
		modal.className = 'modal-overlay';
		modal.innerHTML = `
			<div class="modal-content">
				<h3>Appeal Demerit Task</h3>
				<p><strong>Task:</strong> ${escapeHtml(task.text)}</p>
				<p><strong>Penalty:</strong> -${task.penaltyPoints} points</p>
				<div class="appeal-warning">
					<div class="warning-title">⚠️ Appeal Risk Warning</div>
					<div>If approved: +${task.penaltyPoints} points restored</div>
					<div>If denied: -${task.penaltyPoints} additional points (double penalty)</div>
					<div><strong>Total risk if denied: ${task.penaltyPoints * 2} points</strong></div>
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

		document.getElementById('modalSubmitAppeal').onclick = () => {
			const appealText = document.getElementById('appealTextInput').value.trim();
			const appealError = document.getElementById('appealError');
			if (appealText.length < 10) { // Require at least 10 characters for appeal
				appealError.textContent = "Appeal text must be at least 10 characters long.";
				appealError.style.display = 'block';
			} else {
				onSubmit(appealText);
				document.body.removeChild(modal);
			}
		};
		document.getElementById('modalCancelAppeal').onclick = () => {
			document.body.removeChild(modal);
		};
	};

	showAppealModal(task, async (appealText) => { // Made async
		const updates = {
			appealStatus: "pending",
			appealedAt: new Date().toISOString(),
			appealText: appealText, // Save the appeal text
		};

		if (supabase) {
			const { error } = await supabase.from('tasks').update(updates).eq('id', taskId);
			if (error) {
				console.error("Error submitting appeal:", error);
				showNotification("Failed to submit appeal", "error");
			} else {
				showNotification(
					"Appeal submitted. Awaiting admin review.",
					"warning"
				);
			}
		}
	});
};

window.approveAppeal = async function (taskId) { // Made async
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

	if (supabase) {
		const { error: taskError } = await supabase.from('tasks').update(updates).eq('id', taskId);
		if (taskError) {
			console.error("Error approving appeal:", taskError);
			showNotification("Failed to approve appeal", "error");
			return;
		}

		await updateUserPoints(task.assignedTo, task.penaltyPoints, "add");

		showNotification(
			`Appeal approved! ${
				task.penaltyPoints
			} points restored to ${users[task.assignedTo]?.displayName}`
		);
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
		const modal = document.createElement('div');
		modal.className = 'modal-overlay';
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

		document.getElementById('modalConfirm').onclick = () => {
			onConfirm(true);
			document.body.removeChild(modal);
		};
		document.getElementById('modalCancel').onclick = () => {
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
		async (confirmed) => { // Made async
			if (!confirmed) {
				return;
			}

			const updates = {
				appealStatus: "denied",
				appealReviewedAt: new Date().toISOString(),
				appealReviewedBy: currentUser,
			};

			if (supabase) {
				const { error: taskError } = await supabase.from('tasks').update(updates).eq('id', taskId);
				if (taskError) {
					console.error("Error denying appeal:", taskError);
					showNotification("Failed to deny appeal", "error");
					return;
				}

				await updateUserPoints(task.assignedTo, task.penaltyPoints, "subtract");

				showNotification(
					`Appeal denied! Additional ${
						task.penaltyPoints
					} point penalty applied to ${
						users[task.assignedTo]?.displayName
					}`,
					"warning"
				);
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
		const modal = document.createElement('div');
		modal.className = 'modal-overlay';
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

		document.getElementById('modalConfirm').onclick = () => {
			onConfirm(true);
			document.body.removeChild(modal);
		};
		document.getElementById('modalCancel').onclick = () => {
			onConfirm(false);
			document.body.removeChild(modal);
		};
	};

	confirmReject("Are you sure you want to reject this suggestion?", async (confirmed) => { // Made async
		if (!confirmed) {
			return;
		}

		const suggestionUpdates = {
			status: "rejected",
			reviewedBy: currentUser,
			reviewedAt: new Date().toISOString(),
		};

		if (supabase) {
			const { error } = await supabase.from('suggestions').update(suggestionUpdates).eq('id', suggestionId);
			if (error) {
				console.error("Error rejecting suggestion:", error);
				showNotification("Failed to reject suggestion", "error");
			} else {
				showNotification("Suggestion rejected");
			}
		}
	});
};

async function submitTaskSuggestion() { // Made async
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

	if (supabase) {
		const { error: suggestionError } = await supabase.from('suggestions').insert([suggestion]);
		const { error: metadataError } = await supabase
			.from('metadata')
			.upsert({ id: 'counters', suggestionIdCounter: suggestionIdCounter }, { onConflict: 'id' });

		if (suggestionError || metadataError) {
			console.error("Error submitting suggestion:", suggestionError || metadataError);
			showNotification("Failed to submit suggestion", "error");
			suggestionIdCounter--;
		} else {
			const form = document.getElementById("suggestForm");
			if (form) form.reset();
			showNotification("Task suggestion submitted successfully!");
			renderMySuggestions();
		}
	}
}

window.approveSuggestion = async function (suggestionId) { // Made async
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

	if (supabase) {
		const { error: taskError } = await supabase.from('tasks').insert([task]);
		const { error: suggestionError } = await supabase.from('suggestions').update(suggestionUpdates).eq('id', suggestionId);
		const { error: metadataError } = await supabase
			.from('metadata')
			.upsert({ id: 'counters', taskIdCounter: taskIdCounter }, { onConflict: 'id' });

		if (taskError || suggestionError || metadataError) {
			console.error("Error approving suggestion:", taskError || suggestionError || metadataError);
			showNotification("Failed to approve suggestion", "error");
		} else {
			showNotification(`Suggestion approved and converted to task!`);
		}
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
		const dayTasks = tasks.filter(t => t.assignedTo === 'user' && getTasksForDate(date).includes(t));
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
		(t) => t.status !== "completed" && t.type !== "demerit" && t.assignedTo === 'user'
	);
	const completedTasks = tasks.filter((t) => t.status === "completed" && t.assignedTo === 'user');
	const allNonDemeritTasks = tasks.filter((t) => t.type !== "demerit" && t.assignedTo === 'user');
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
	const filteredActivityLog = userActivityLog.filter(a => a.user === 'user' || a.user === 'admin');

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
					${activity.user === 'user' ? (activity.action === "login" ? "🔓 User Logged In" : "🔒 User Logged Out") : (activity.action === "login" ? "🔓 Admin Logged In" : "🔒 Admin Logged Out")}
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

async function loadData() { // Made async
	if (!supabase) {
		console.error("Supabase client not initialized.");
		return;
	}

	// Unsubscribe from previous channels if they exist
	if (unsubscribe) {
		if (unsubscribe.tasks) supabase.removeChannel(unsubscribe.tasks);
		if (unsubscribe.suggestions) supabase.removeChannel(unsubscribe.suggestions);
		if (unsubscribe.activity) supabase.removeChannel(unsubscribe.activity);
		if (unsubscribe.userProfiles) supabase.removeChannel(unsubscribe.userProfiles);
		unsubscribe = null;
	}

	// --- Load Metadata Counters and ensure they are up-to-date with max IDs ---
	try {
		// Fetch current counters from metadata
		const { data: counterData, error: counterError } = await supabase
			.from('metadata')
			.select('taskIdCounter, suggestionIdCounter, activityIdCounter')
			.eq('id', 'counters')
			.single();

		if (counterError && counterError.code !== 'PGRST116') {
			console.error("Error fetching metadata:", counterError);
		}

		// Fetch max IDs from tables
		const { data: maxTaskIdData, error: maxTaskError } = await supabase
			.from('tasks')
			.select('id')
			.order('id', { ascending: false })
			.limit(1)
			.single();

		const { data: maxSuggestionIdData, error: maxSuggestionError } = await supabase
			.from('suggestions')
			.select('id')
			.order('id', { ascending: false })
			.limit(1)
			.single();

		const { data: maxActivityIdData, error: maxActivityError } = await supabase
			.from('userActivity')
			.select('id')
			.order('id', { ascending: false })
			.limit(1)
			.single();

		if (maxTaskError && maxTaskError.code !== 'PGRST116') console.error("Error fetching max task ID:", maxTaskError);
		if (maxSuggestionError && maxSuggestionError.code !== 'PGRST116') console.error("Error fetching max suggestion ID:", maxSuggestionError);
		if (maxActivityError && maxActivityError.code !== 'PGRST116') console.error("Error fetching max activity ID:", maxActivityError);

		// Initialize/update counters based on max of DB value and fetched max ID + 1
		taskIdCounter = Math.max(counterData?.taskIdCounter || 1, (maxTaskIdData?.id || 0) + 1);
		suggestionIdCounter = Math.max(counterData?.suggestionIdCounter || 1, (maxSuggestionIdData?.id || 0) + 1);
		activityIdCounter = Math.max(counterData?.activityIdCounter || 1, (maxActivityIdData?.id || 0) + 1);

		// Upsert updated counters back to metadata
		const { error: upsertMetadataError } = await supabase.from('metadata').upsert({
			id: 'counters',
			taskIdCounter: taskIdCounter,
			suggestionIdCounter: suggestionIdCounter,
			activityIdCounter: activityIdCounter,
		}, { onConflict: 'id' });

		if (upsertMetadataError) {
			console.error("Error updating metadata counters:", upsertMetadataError);
		}

	} catch (error) {
		console.error("Error during metadata and ID initialization:", error);
	}

	// --- Initial Data Fetch (one-time) ---
	await fetchTasksInitial();
	await fetchSuggestionsInitial();
	await fetchUserActivityInitial();
	await fetchUserProfilesInitial();

	// --- Real-time Listeners ---

	// Tasks Listener
	const tasksChannel = supabase.channel('tasks_channel')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, payload => {
			console.log('Task change received!', payload);
			if (payload.eventType === 'INSERT') {
				tasks.unshift(payload.new);
			} else if (payload.eventType === 'UPDATE') {
				const index = tasks.findIndex(t => t.id === payload.old.id);
				if (index !== -1) {
					tasks[index] = payload.new;
				}
			} else if (payload.eventType === 'DELETE') {
				tasks = tasks.filter(t => t.id !== payload.old.id);
			}
			tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
			renderTasks();
			updateStats();
		})
		.subscribe();

	// Suggestions Listener
	const suggestionsChannel = supabase.channel('suggestions_channel')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'suggestions' }, payload => {
			console.log('Suggestion change received!', payload);
			if (payload.eventType === 'INSERT') {
				suggestions.unshift(payload.new);
			} else if (payload.eventType === 'UPDATE') {
				const index = suggestions.findIndex(s => s.id === payload.old.id);
				if (index !== -1) {
					suggestions[index] = payload.new;
				}
			} else if (payload.eventType === 'DELETE') {
				suggestions = suggestions.filter(s => s.id !== payload.old.id);
			}
			suggestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
			renderSuggestions();
		})
		.subscribe();

	// User Activity Listener
	const activityChannel = supabase.channel('activity_channel')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'userActivity' }, payload => {
			console.log('Activity change received!', payload);
			if (payload.eventType === 'INSERT') {
				userActivityLog.unshift(payload.new);
				if (userActivityLog.length > 50) { // Keep only last 50 activities
					userActivityLog = userActivityLog.slice(0, 50);
				}
			} else if (payload.eventType === 'UPDATE') {
				const index = userActivityLog.findIndex(a => a.id === payload.old.id);
				if (index !== -1) {
					userActivityLog[index] = payload.new;
				}
			} else if (payload.eventType === 'DELETE') {
				userActivityLog = userActivityLog.filter(a => a.id !== payload.old.id);
			}
			userActivityLog.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
			renderDashboard();
		})
		.subscribe();

	// User Profiles Listener (for points)
	const userProfilesChannel = supabase.channel('user_profiles_channel')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'userProfiles' }, payload => {
			console.log('User profile change received!', payload);
			if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
				const profileData = payload.new;
				const username = profileData.username;
				if (users[username]) {
					users[username].points = profileData.points || 0;
				}
			}
			updateUserPoints(); // Update UI
			renderUserProgress(); // Re-render user progress on dashboard
		})
		.subscribe();

	// Store the channel objects for unsubscribing later
	unsubscribe = {
		tasks: tasksChannel,
		suggestions: suggestionsChannel,
		activity: activityChannel,
		userProfiles: userProfilesChannel
	};
}

// Initial fetch functions (called once on load)
async function fetchTasksInitial() {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
        console.error("Error fetching tasks:", error);
        showError("Failed to load tasks.");
    } else {
        tasks = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        renderTasks();
        updateStats();
    }
}

async function fetchSuggestionsInitial() {
    const { data, error } = await supabase.from('suggestions').select('*');
    if (error) {
        console.error("Error fetching suggestions:", error);
        showError("Failed to load suggestions.");
    } else {
        suggestions = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        renderSuggestions();
    }
}

async function fetchUserActivityInitial() {
    const { data, error } = await supabase.from('userActivity').select('*');
    if (error) {
        console.error("Error fetching user activity:", error);
    } else {
        userActivityLog = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 50);
        renderDashboard(); // Re-render dashboard as it depends on activity log
    }
}

async function fetchUserProfilesInitial() {
    const { data, error } = await supabase.from('userProfiles').select('*');
    if (error) {
        console.error("Error fetching user profiles:", error);
    } else {
        data.forEach((profileData) => {
            const username = profileData.username; // Assuming a 'username' column in userProfiles
            if (users[username]) {
                users[username].points = profileData.points || 0;
            }
        });
        updateUserPoints(); // Update UI
        renderUserProgress(); // Re-render user progress on dashboard
    }
}


function checkForOverdueTasks() {
	console.log("Checking for overdue tasks...");
	const now = new Date();
	tasks.forEach(async (task) => { // Made async to allow await for supabase update
		if (
			task.dueDate &&
			task.status !== "completed" &&
			task.type !== "demerit" &&
			task.assignedTo === 'user' // Only check overdue for the single user
		) {
			const wasOverdue = task.isOverdue;
			const isNowOverdue = new Date(task.dueDate) < now;

			if (isNowOverdue && !wasOverdue) {
				console.log(`Task ${task.id} is now overdue. Applying penalty.`);
				task.isOverdue = true;
				// Penalty is applied only once when it becomes overdue
				await updateUserPoints( // Await for points update
					task.assignedTo,
					task.penaltyPoints,
					"subtract"
				);

				if (supabase) {
					const { error } = await supabase.from('tasks').update({
						isOverdue: true,
					}).eq('id', task.id);
					if (error) {
						console.error("Error updating overdue status:", error);
					}
				}
			}
		}
	});
}

async function createRepeatingTask(originalTask) { // Made async
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

	if (supabase) {
		const { error: taskError } = await supabase.from('tasks').insert([newTask]);
		const { error: metadataError } = await supabase
			.from('metadata')
			.upsert({ id: 'counters', taskIdCounter: taskIdCounter }, { onConflict: 'id' });

		if (taskError || metadataError) {
			console.error("Error creating repeating task:", taskError || metadataError);
			taskIdCounter--;
		}
	}
}

async function updateUserPoints( // Made async
	username = currentUser,
	points = 0,
	operation = "set"
) {
	// Ensure only 'user' and 'admin' points are updated
	if (!username || (!users[username])) return; // Return immediately if no valid user

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

	if (supabase && username) {
		const { error } = await supabase.from('userProfiles').upsert(
			{ username: username, points: users[username].points, updatedAt: new Date().toISOString() },
			{ onConflict: 'username' } // Upsert based on username
		);
		if (error) {
			console.error("Error updating user profile points:", error);
		}
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
								${task.appealText ? `<br>Appeal Reason: ${escapeHtml(task.appealText)}` : ''}
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
								${task.appealText ? `<br>Appeal Reason: ${escapeHtml(task.appealText)}` : ''}
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
					} ${task.status === "pending_approval" ? "pending-approval" : ""} ${
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
								${task.type === "demerit" ? `Issued by: ${users[task.createdBy]?.displayName || task.createdBy}` : `Created by: ${users[task.createdBy]?.displayName || task.createdBy}`}
								${task.dueDate ? `<br>Due: ${formatDate(task.dueDate)}` : ""}
								${task.isRepeating ? "<br>🔄 Repeating" : ""}
								${task.type === "demerit" ? "<br>📋 Demerit Task" : ""}
								${task.completedBy ? `<br>Completed by: ${users[task.completedBy]?.displayName || task.completedBy}` : ""}
								${task.approvedBy ? `<br>Approved by: ${users[task.approvedBy]?.displayName || task.approvedBy}` : ""}
								${task.rejectedBy ? `<br>Rejected by: ${users[task.rejectedBy]?.displayName || task.rejectedBy}` : ""}
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
								${task.appealText ? `<br>Appeal Reason: ${escapeHtml(task.appealText)}` : ''}
							</div>
							${
								task.type === "demerit" && !task.appealStatus && !task.acceptedAt
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
								task.type === "regular" && task.status === "todo" && !task.isOverdue
									? `<button class="action-btn check-btn" onclick="checkOffTask(${task.id})">Mark Complete</button>`
									: ""
							}
							${
								task.type === "regular" && task.isOverdue && task.status === "todo"
									? `<button class="action-btn check-btn" onclick="checkOffTask(${task.id})">Mark Complete (Overdue)</button>`
									: ""
							}
							${
								task.type === "demerit" && !task.acceptedAt && !task.appealStatus
									? `<button class="action-btn accept-btn" onclick="acceptDemerit(${task.id})">Accept Demerit</button>`
									: ""
							}
							${
								task.type === "demerit" && !task.appealStatus
									? `<button class="action-btn appeal-btn" onclick="appealDemerit(${task.id})">Appeal Demerit</button>`
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
	const relevantTasks = tasks.filter(t => currentUser === 'admin' || t.assignedTo === currentUser);

	const total = relevantTasks.filter((t) => t.type !== "demerit").length;
	const pending = relevantTasks.filter(
		(t) =>
			(t.status === "todo" || t.status === "pending_approval") &&
			t.type !== "demerit"
	).length;
	const completed = relevantTasks.filter((t) => t.status === "completed").length;

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
	// Additionally replace backticks to prevent template literal issues
	return div.innerHTML.replace(/`/g, '&#96;');
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
