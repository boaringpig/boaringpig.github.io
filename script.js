// User configuration
const users = {
	creator: {
		password: "admin123",
		role: "creator",
		displayName: "Task Creator",
		permissions: [
			"create_task",
			"approve_task",
			"delete_task",
			"view_all_tasks",
		],
	},
	checker: {
		password: "user123",
		role: "checker",
		displayName: "Task Checker",
		permissions: ["check_task", "view_assigned_tasks"],
	},
};

let currentUser = null;
let tasks = [];
let taskIdCounter = 1;
let db = null;
let unsubscribe = null;

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
		}

		// Initialize Firestore with long polling to avoid WebChannel issues
		db = firebase.firestore();
		db.settings({
			experimentalForceLongPolling: true,
		});

		console.log("Firebase initialized successfully with long polling");
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

	// Show appropriate view based on role
	if (user.role === "creator") {
		document.getElementById("creatorView").style.display = "block";
		document.getElementById("checkerView").style.display = "none";
	} else {
		document.getElementById("creatorView").style.display = "none";
		document.getElementById("checkerView").style.display = "block";
	}

	loadTasks();
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

	// Add task on Enter key press
	const taskInput = document.getElementById("taskInput");
	if (taskInput) {
		taskInput.addEventListener("keypress", function (e) {
			if (e.key === "Enter") {
				addTask();
			}
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

window.addTask = function () {
	if (!hasPermission("create_task")) {
		alert("You do not have permission to create tasks");
		return;
	}

	const taskInput = document.getElementById("taskInput");
	const taskText = taskInput.value.trim();

	if (taskText === "") {
		alert("Please enter a task description");
		return;
	}

	const task = {
		id: taskIdCounter++,
		text: taskText,
		status: "todo",
		createdAt: new Date().toISOString(),
		createdBy: currentUser,
		completedAt: null,
		completedBy: null,
		approvedAt: null,
		approvedBy: null,
	};

	if (db) {
		db.collection("tasks")
			.doc(task.id.toString())
			.set(task)
			.then(() => {
				return db.collection("metadata").doc("counter").set({
					taskIdCounter: taskIdCounter,
				});
			})
			.then(() => {
				taskInput.value = "";
			})
			.catch((error) => {
				console.error("Error adding task:", error);
				alert("Failed to add task. Please try again.");
				taskIdCounter--; // Revert counter on error
			});
	} else {
		alert("Database not connected. Please check Firebase configuration.");
	}
};

window.checkOffTask = function (taskId) {
	if (!hasPermission("check_task")) {
		alert("You do not have permission to check off tasks");
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
			.catch((error) => {
				console.error("Error updating task:", error);
				alert("Failed to update task. Please try again.");
			});
	} else {
		alert("Database not connected. Please check Firebase configuration.");
	}
};

window.approveTask = function (taskId) {
	if (!hasPermission("approve_task")) {
		alert("You do not have permission to approve tasks");
		return;
	}

	const updates = {
		status: "completed",
		approvedAt: new Date().toISOString(),
		approvedBy: currentUser,
	};

	if (db) {
		db.collection("tasks")
			.doc(taskId.toString())
			.update(updates)
			.catch((error) => {
				console.error("Error approving task:", error);
				alert("Failed to approve task. Please try again.");
			});
	} else {
		alert("Database not connected. Please check Firebase configuration.");
	}
};

window.deleteTask = function (taskId) {
	if (!hasPermission("delete_task")) {
		alert("You do not have permission to delete tasks");
		return;
	}

	if (!confirm("Are you sure you want to delete this task?")) {
		return;
	}

	if (db) {
		db.collection("tasks")
			.doc(taskId.toString())
			.delete()
			.catch((error) => {
				console.error("Error deleting task:", error);
				alert("Failed to delete task. Please try again.");
			});
	} else {
		alert("Database not connected. Please check Firebase configuration.");
	}
};

function loadTasks() {
	if (db) {
		// Set up real-time listener
		if (unsubscribe) {
			unsubscribe();
		}

		unsubscribe = db.collection("tasks").onSnapshot(
			(snapshot) => {
				tasks = [];
				snapshot.forEach((doc) => {
					tasks.push({
						id: parseInt(doc.id),
						...doc.data(),
					});
				});
				tasks.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
				renderTasks();
				updateStats();
			},
			(error) => {
				console.error("Error loading tasks:", error);
				showError(
					"Failed to load tasks. Please check your connection."
				);
			}
		);

		// Load counter
		db.collection("metadata")
			.doc("counter")
			.get()
			.then((doc) => {
				if (doc.exists) {
					taskIdCounter = doc.data().taskIdCounter || 1;
				}
			})
			.catch((error) => {
				console.error("Error loading task counter:", error);
			});
	} else {
		showError(
			"Database not connected. Please check Firebase configuration."
		);
	}
}

function renderTasks() {
	const user = users[currentUser];

	if (user.role === "creator") {
		renderCreatorView();
	} else if (user.role === "checker") {
		renderCheckerView();
	}
}

function renderCreatorView() {
	// Pending tasks
	const pendingTasks = tasks.filter((t) => t.status === "pending_approval");
	const pendingContainer = document.getElementById("pendingTasks");

	if (pendingTasks.length === 0) {
		pendingContainer.innerHTML =
			'<div class="empty-state">No tasks pending approval</div>';
	} else {
		pendingContainer.innerHTML = pendingTasks
			.map(
				(task) => `
            <div class="task-item pending-approval">
                <div class="task-content">
                    <div>
                        <span class="status-badge status-pending">Pending Approval</span>
                        <span class="task-text">${escapeHtml(task.text)}</span>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">
                            Completed by: ${
								users[task.completedBy]?.displayName ||
								task.completedBy
							}
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="action-btn approve-btn" onclick="approveTask(${
							task.id
						})">Approve</button>
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

	// All tasks
	const allTasksContainer = document.getElementById("allTasksCreator");

	if (tasks.length === 0) {
		allTasksContainer.innerHTML =
			'<div class="empty-state">No tasks created yet</div>';
	} else {
		allTasksContainer.innerHTML = tasks
			.map(
				(task) => `
            <div class="task-item ${
				task.status === "completed" ? "completed" : ""
			}">
                <div class="task-content">
                    <div>
                        <span class="status-badge ${
							task.status === "completed"
								? "status-completed"
								: "status-pending"
						}">
                            ${
								task.status === "completed"
									? "Completed"
									: task.status === "pending_approval"
									? "Pending"
									: "To Do"
							}
                        </span>
                        <span class="task-text">${escapeHtml(task.text)}</span>
                        ${
							task.completedBy
								? `<div style="font-size: 12px; color: #6b7280; margin-top: 5px;">
                            Completed by: ${
								users[task.completedBy]?.displayName ||
								task.completedBy
							}
                        </div>`
								: ""
						}
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

function renderCheckerView() {
	// Tasks to check
	const todoTasks = tasks.filter((t) => t.status === "todo");
	const tasksToCheckContainer = document.getElementById("tasksToCheck");

	if (todoTasks.length === 0) {
		tasksToCheckContainer.innerHTML =
			'<div class="empty-state">No tasks to complete</div>';
	} else {
		tasksToCheckContainer.innerHTML = todoTasks
			.map(
				(task) => `
            <div class="task-item">
                <div class="task-content">
                    <div>
                        <span class="task-text">${escapeHtml(task.text)}</span>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">
                            Created by: ${
								users[task.createdBy]?.displayName ||
								task.createdBy
							}
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

	// Completed tasks (only ones completed by this user)
	const myCompletedTasks = tasks.filter(
		(t) =>
			(t.status === "pending_approval" || t.status === "completed") &&
			t.completedBy === currentUser
	);
	const completedContainer = document.getElementById("completedTasks");

	if (myCompletedTasks.length === 0) {
		completedContainer.innerHTML =
			'<div class="empty-state">No completed tasks</div>';
	} else {
		completedContainer.innerHTML = myCompletedTasks
			.map(
				(task) => `
            <div class="task-item ${
				task.status === "completed" ? "completed" : "pending-approval"
			}">
                <div class="task-content">
                    <div>
                        <span class="status-badge ${
							task.status === "completed"
								? "status-completed"
								: "status-pending"
						}">
                            ${
								task.status === "completed"
									? "Approved"
									: "Pending Approval"
							}
                        </span>
                        <span class="task-text">${escapeHtml(task.text)}</span>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">
                            Created by: ${
								users[task.createdBy]?.displayName ||
								task.createdBy
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

	document.getElementById("totalTasks").textContent = total;
	document.getElementById("pendingCount").textContent = pending;
	document.getElementById("completedCount").textContent = completed;
}

function escapeHtml(text) {
	const div = document.createElement("div");
	div.textContent = text;
	return div.innerHTML;
}
