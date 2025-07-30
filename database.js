// database.js
// This file encapsulates all Supabase database interactions.

// Global Supabase client instance
let supabase = null;

// Global variables for local data storage and counters (defined in main.js)
// NOTE: These are commented out here because they are declared and
//       made global in main.js, and this file accesses them via window.
// let tasks = [];
// let suggestions = [];
// let userActivityLog = [];
// let taskIdCounter = 1;
// let suggestionIdCounter = 1;
// let activityIdCounter = 1; // This counter is no longer used for userActivity table inserts as Supabase handles IDs.

// Global unsubscribe object to hold Supabase channel subscriptions
let unsubscribe = {};

// Global functions from ui.js
// function showError(message) { ... }
// function showNotification(message, type) { ... }
// function renderTasks() { ... }
// function renderSuggestions() { ... }
// function renderDashboard() { ... }
// function renderUserProgress() { ... }
// function updateStats() { ... }
// function updateUserPoints() { ... } // defined here, but needs to be accessible globally

/**
 * Initializes the Supabase client.
 * This function should be called once at application startup.
 * @param {string} url - Supabase Project URL.
 * @param {string} anonKey - Supabase Project Anon Key.
 */
window.initializeSupabaseClient = function (url, anonKey) {
	if (!supabase) {
		supabase = window.supabase.createClient(url, anonKey);
		window.supabase = supabase; // Make it globally accessible
	}
};

/**
 * Fetches the maximum ID from a given table to ensure unique client-side IDs.
 * @param {string} tableName - The name of the table.
 * @returns {Promise<number>} The maximum ID + 1, or 1 if the table is empty.
 */
async function fetchMaxId(tableName) {
	const { data, error } = await supabase
		.from(tableName)
		.select("id")
		.order("id", { ascending: false })
		.limit(1);

	if (error) {
		console.error(`Error fetching max ID for ${tableName}:`, error);
		// If table is empty or error, start counter from 1
		return 1;
	}
	return data && data.length > 0 && data[0].id ? data[0].id + 1 : 1;
}

/**
 * Loads initial data from Supabase and sets up real-time listeners.
 */
window.loadData = async function () {
	if (!supabase) {
		console.error("Supabase client not initialized.");
		return;
	}

	// Unsubscribe from previous channels if they exist
	if (unsubscribe) {
		if (unsubscribe.tasks) supabase.removeChannel(unsubscribe.tasks);
		if (unsubscribe.suggestions)
			supabase.removeChannel(unsubscribe.suggestions);
		if (unsubscribe.activity) supabase.removeChannel(unsubscribe.activity);
		if (unsubscribe.userProfiles)
			supabase.removeChannel(unsubscribe.userProfiles);
		unsubscribe = null;
	}

	// --- Load Metadata Counters and ensure they are up-to-date with max IDs ---
	try {
		// Fetch current counters from metadata
		const { data: counterData } = await supabase
			.from("metadata")
			.select("taskIdCounter, suggestionIdCounter") // Removed activityIdCounter from select
			.eq("id", "counters")
			.limit(1);

		// Initialize/update counters based on max of DB value and fetched max ID + 1
		// Safely access data[0]?.id for max IDs from arrays
		window.taskIdCounter = Math.max(
			counterData?.[0]?.taskIdCounter || 1,
			await fetchMaxId("tasks")
		);
		window.suggestionIdCounter = Math.max(
			counterData?.[0]?.suggestionIdCounter || 1,
			await fetchMaxId("suggestions")
		);
		// activityIdCounter is no longer needed as Supabase will handle IDs for userActivity.

		// Upsert updated counters back to metadata
		const { error: upsertMetadataError } = await supabase
			.from("metadata")
			.upsert(
				{
					id: "counters",
					taskIdCounter: window.taskIdCounter,
					suggestionIdCounter: window.suggestionIdCounter,
					// activityIdCounter: window.activityIdCounter, // Removed activityIdCounter from upsert
				},
				{ onConflict: "id" }
			);

		if (upsertMetadataError) {
			console.error(
				"Error updating metadata counters:",
				upsertMetadataError
			);
		}
	} catch (error) {
		console.error("Error during metadata and ID initialization:", error);
	}

	// --- Initial Data Fetch (one-time) ---
	await window.fetchTasksInitial();
	await window.fetchSuggestionsInitial();
	await window.fetchUserActivityInitial();
	await window.fetchUserProfilesInitial();

	// --- Real-time Listeners ---

	// Tasks Listener
	const tasksChannel = supabase
		.channel("tasks_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "tasks" },
			(payload) => {
				console.log("Task change received!", payload);
				if (payload.eventType === "INSERT") {
					window.tasks.unshift(payload.new);
				} else if (payload.eventType === "UPDATE") {
					const index = window.tasks.findIndex(
						(t) => t.id === payload.old.id
					);
					if (index !== -1) {
						window.tasks[index] = payload.new;
					}
				} else if (payload.eventType === "DELETE") {
					window.tasks = window.tasks.filter(
						(t) => t.id !== payload.old.id
					);
				}
				window.tasks.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
				window.renderTasks();
				window.updateStats();
			}
		)
		.subscribe();

	// Suggestions Listener
	const suggestionsChannel = supabase
		.channel("suggestions_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "suggestions" },
			(payload) => {
				console.log("Suggestion change received!", payload);
				if (payload.eventType === "INSERT") {
					window.suggestions.unshift(payload.new);
				} else if (payload.eventType === "UPDATE") {
					const index = window.suggestions.findIndex(
						(s) => s.id === payload.old.id
					);
					if (index !== -1) {
						window.suggestions[index] = payload.new;
					}
				} else if (payload.eventType === "DELETE") {
					window.suggestions = window.suggestions.filter(
						(s) => s.id !== payload.old.id
					);
				}
				window.suggestions.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
				window.renderSuggestions();
			}
		)
		.subscribe();

	// User Activity Listener
	const activityChannel = supabase
		.channel("activity_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "userActivity" },
			(payload) => {
				console.log("Activity change received!", payload);
				if (payload.eventType === "INSERT") {
					window.userActivityLog.unshift(payload.new);
					if (window.userActivityLog.length > 50) {
						// Keep only last 50 activities
						window.userActivityLog = window.userActivityLog.slice(
							0,
							50
						);
					}
				} else if (payload.eventType === "UPDATE") {
					const index = window.userActivityLog.findIndex(
						(a) => a.id === payload.old.id
					);
					if (index !== -1) {
						window.userActivityLog[index] = payload.new;
					}
				} else if (payload.eventType === "DELETE") {
					window.userActivityLog = window.userActivityLog.filter(
						(a) => a.id !== payload.old.id
					);
				}
				window.userActivityLog.sort(
					(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
				);
				window.renderDashboard();
			}
		)
		.subscribe();

	// User Profiles Listener (for points)
	const userProfilesChannel = supabase
		.channel("user_profiles_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "userProfiles" },
			(payload) => {
				console.log("User profile change received!", payload);
				if (
					payload.eventType === "INSERT" ||
					payload.eventType === "UPDATE"
				) {
					const profileData = payload.new;
					const username = profileData.username;
					if (window.users[username]) {
						window.users[username].points = profileData.points || 0;
					}
				}
				window.updateUserPoints(); // Update UI
				window.renderUserProgress(); // Re-render user progress on dashboard
			}
		)
		.subscribe();

	// Store the channel objects for unsubscribing later
	window.unsubscribe = {
		tasks: tasksChannel,
		suggestions: suggestionsChannel,
		activity: activityChannel,
		userProfiles: userProfilesChannel,
	};
};

// Initial fetch functions (called once on load)
window.fetchTasksInitial = async function () {
	const { data, error } = await supabase.from("tasks").select("*");
	if (error) {
		console.error("Error fetching tasks:", error);
		window.showError("Failed to load tasks.");
	} else {
		window.tasks = data.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);
		window.renderTasks();
		window.updateStats();
	}
};

window.fetchSuggestionsInitial = async function () {
	const { data, error } = await supabase.from("suggestions").select("*");
	if (error) {
		console.error("Error fetching suggestions:", error);
		window.showError("Failed to load suggestions.");
	} else {
		window.suggestions = data.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);
		window.renderSuggestions();
	}
};

window.fetchUserActivityInitial = async function () {
	const { data, error } = await supabase.from("userActivity").select("*");
	if (error) {
		console.error("Error fetching user activity:", error);
	} else {
		window.userActivityLog = data
			.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
			.slice(0, 50);
		window.renderDashboard(); // Re-render dashboard as it depends on activity log
	}
};

window.fetchUserProfilesInitial = async function () {
	const { data, error } = await supabase.from("userProfiles").select("*");
	if (error) {
		console.error("Error fetching user profiles:", error);
	} else {
		data.forEach((profileData) => {
			const username = profileData.username; // Assuming a 'username' column in userProfiles
			if (window.users[username]) {
				window.users[username].points = profileData.points || 0;
			}
		});
		window.updateUserPoints(); // Update UI
		window.renderUserProgress(); // Re-render user progress on dashboard
	}
};

// --- User Activity Logging (Moved from script.js) ---
/**
 * Logs user activity to the userActivityLog array and Supabase database.
 * Only logs activity for the 'user' role.
 * @param {string} action - The action performed (e.g., 'login', 'logout').
 */
window.logUserActivity = async function (action) {
	// Only log activity for the 'user' role
	if (window.currentUser !== "user") {
		return;
	}

	const activity = {
		// Removed client-side ID generation for userActivity. Supabase will auto-generate.
		user: window.currentUser,
		action: action,
		timestamp: new Date().toISOString(),
	};

	// Add to local log
	window.userActivityLog.unshift(activity);

	// Keep only last 50 activities in local log
	if (window.userActivityLog.length > 50) {
		window.userActivityLog = window.userActivityLog.slice(0, 50);
	}

	// Save to database
	if (supabase) {
		const { error } = await supabase
			.from("userActivity")
			.insert([activity]); // Do not include 'id' in the insert payload
		if (error) {
			console.error("Error logging activity to Supabase:", error);
		}
	}
};

// --- Date Helper Functions (Moved from script.js) ---
/**
 * Checks if a task is overdue.
 * @param {object} task - The task object.
 * @returns {boolean} True if the task is overdue and not completed, false otherwise.
 */
window.isTaskOverdue = function (task) {
	if (!task.dueDate || task.status === "completed") return false;
	return new Date(task.dueDate) < new Date();
};

/**
 * Checks if a given date is today's date.
 * @param {Date} date - The date object to check.
 * @returns {boolean} True if the date is today, false otherwise.
 */
window.isToday = function (date) {
	const today = new Date();
	return date.toDateString() === today.toDateString();
};

/**
 * Retrieves tasks that are due on a specific date.
 * @param {Date} date - The date to check for tasks.
 * @returns {Array<object>} An array of task objects due on the given date.
 */
window.getTasksForDate = function (date) {
	const dateStr = date.toDateString();
	return window.tasks.filter((task) => {
		if (!task.dueDate) return false;
		return new Date(task.dueDate).toDateString() === dateStr;
	});
};

// --- CRUD Operations ---

window.createTask = async function () {
	if (!window.hasPermission("create_task")) {
		window.showNotification(
			"You do not have permission to create tasks",
			"error"
		);
		return;
	}

	const taskInput = document.getElementById("taskInput");
	const taskText = taskInput.value.trim();
	const isDemerit = document.getElementById("isDemerit")
		? document.getElementById("isDemerit").checked
		: false;

	if (taskText === "") {
		window.showNotification("Please enter a task description", "error");
		return;
	}

	let task;

	if (isDemerit) {
		const penaltyPoints =
			parseInt(document.getElementById("penaltyPoints").value) || 5;

		task = {
			id: window.taskIdCounter++,
			text: taskText,
			status: "demerit_issued",
			type: "demerit",
			createdAt: new Date().toISOString(),
			createdBy: window.currentUser,
			assignedTo: "user",
			points: 0,
			penaltyPoints: penaltyPoints,
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
			acceptedAt: null,
			appealText: null,
		};

		await window.updateUserPoints("user", penaltyPoints, "subtract");
	} else {
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
			window.showNotification("Due date cannot be in the past", "error");
			return;
		}

		task = {
			id: window.taskIdCounter++,
			text: taskText,
			status: "todo",
			type: "regular",
			createdAt: new Date().toISOString(),
			createdBy: window.currentUser,
			assignedTo: "user",
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

	const { error: taskError } = await supabase.from("tasks").insert([task]);
	const { error: metadataError } = await supabase
		.from("metadata")
		.upsert(
			{ id: "counters", taskIdCounter: window.taskIdCounter },
			{ onConflict: "id" }
		);

	if (taskError || metadataError) {
		console.error("Error creating task:", taskError || metadataError);
		window.showNotification(
			"Failed to create task. Please try again.",
			"error"
		);
		window.taskIdCounter--;
	} else {
		taskInput.value = "";
		const taskPointsEl = document.getElementById("taskPoints");
		const penaltyPointsEl = document.getElementById("penaltyPoints");
		const taskDueDateEl = document.getElementById("taskDueDate");
		const isRepeatingEl = document.getElementById("isRepeating");
		const isDemeritEl = document.getElementById("isDemerit");
		const demeritWarningEl = document.getElementById("demeritWarning");
		const repeatOptionsEl = document.getElementById("repeatOptions");

		if (taskPointsEl) {
			taskPointsEl.value = "10";
			taskPointsEl.closest(".form-group").style.display = "block";
		}
		if (penaltyPointsEl) penaltyPointsEl.value = "5";
		if (taskDueDateEl) {
			taskDueDateEl.value = "";
			taskDueDateEl.closest(".form-group").style.display = "block";
		}
		if (isRepeatingEl) isRepeatingEl.checked = false;
		if (isDemeritEl) isDemeritEl.checked = false;
		if (demeritWarningEl) demeritWarningEl.style.display = "none";
		if (repeatOptionsEl) repeatOptionsEl.style.display = "none";

		if (isDemerit) {
			window.showNotification(
				`Demerit task issued to user. ${task.penaltyPoints} points deducted.`,
				"warning"
			);
		} else {
			window.showNotification("Task created successfully!");
		}
		await window.fetchTasksInitial();
	}
};

window.checkOffTask = async function (taskId) {
	if (!window.hasPermission("check_task")) {
		window.showNotification(
			"You do not have permission to check off tasks",
			"error"
		);
		return;
	}

	const task = window.tasks.find((t) => t.id === taskId);
	if (!task) return;

	if (task.type === "demerit") {
		window.showNotification(
			"Demerit tasks cannot be marked as complete.",
			"error"
		);
		return;
	}

	if (task.assignedTo && task.assignedTo !== window.currentUser) {
		window.showNotification("This task is not assigned to you", "error");
		return;
	}

	const updates = {
		status: "pending_approval",
		completedAt: new Date().toISOString(),
		completedBy: window.currentUser,
	};

	const { error } = await supabase
		.from("tasks")
		.update(updates)
		.eq("id", taskId);
	if (error) {
		console.error("Error updating task:", error);
		window.showNotification("Failed to update task", "error");
	} else {
		window.showNotification("Task marked as complete! Awaiting approval.");
		await window.fetchTasksInitial();
	}
};

window.approveTask = async function (taskId) {
	if (!window.hasPermission("approve_task")) {
		window.showNotification(
			"You do not have permission to approve tasks",
			"error"
		);
		return;
	}

	const task = window.tasks.find((t) => t.id === taskId);
	if (!task) return;

	const updates = {
		status: "completed",
		approvedAt: new Date().toISOString(),
		approvedBy: window.currentUser,
	};

	const { error: taskError } = await supabase
		.from("tasks")
		.update(updates)
		.eq("id", taskId);
	if (taskError) {
		console.error("Error approving task:", taskError);
		window.showNotification("Failed to approve task", "error");
		return;
	}

	await window.updateUserPoints(task.completedBy, task.points, "add");

	window.showNotification(
		`Task approved! ${task.points} points awarded to ${
			window.users[task.completedBy]?.displayName
		}`
	);

	if (task.isRepeating && task.dueDate) {
		window.createRepeatingTask(task);
	}
	await window.fetchTasksInitial();
};

window.rejectTask = function (taskId) {
	if (!window.hasPermission("approve_task")) {
		window.showNotification(
			"You do not have permission to reject tasks",
			"error"
		);
		return;
	}

	const task = window.tasks.find((t) => t.id === taskId);
	if (!task) return;

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
		} point penalty to ${window.users[task.completedBy]?.displayName}.`,
		async (confirmed) => {
			if (!confirmed) {
				return;
			}

			const updates = {
				status: "failed",
				rejectedAt: new Date().toISOString(),
				rejectedBy: window.currentUser,
			};

			const { error: taskError } = await supabase
				.from("tasks")
				.update(updates)
				.eq("id", taskId);
			if (taskError) {
				console.error("Error rejecting task:", taskError);
				window.showNotification("Failed to reject task", "error");
				return;
			}

			await window.updateUserPoints(
				task.completedBy,
				task.penaltyPoints,
				"subtract"
			);

			window.showNotification(
				`Task rejected! ${
					task.penaltyPoints
				} penalty points applied to ${
					window.users[task.completedBy]?.displayName
				}`,
				"warning"
			);
			await window.fetchTasksInitial();
		}
	);
};

window.deleteTask = function (taskId) {
	if (!window.hasPermission("delete_task")) {
		window.showNotification(
			"You do not have permission to delete tasks",
			"error"
		);
		return;
	}

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

	confirmDelete(
		"Are you sure you want to delete this task?",
		async (confirmed) => {
			if (!confirmed) {
				return;
			}

			const { error } = await supabase
				.from("tasks")
				.delete()
				.eq("id", taskId);
			if (error) {
				console.error("Error deleting task:", error);
				window.showNotification("Failed to delete task", "error");
			} else {
				window.showNotification("Task deleted successfully");
				await window.fetchTasksInitial();
			}
		}
	);
};

window.acceptDemerit = async function (taskId) {
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "demerit") return;

	const updates = {
		acceptedAt: new Date().toISOString(),
		status: "demerit_accepted",
	};

	const { error } = await supabase
		.from("tasks")
		.update(updates)
		.eq("id", taskId);
	if (error) {
		console.error("Error accepting demerit:", error);
		window.showNotification("Failed to accept demerit", "error");
	} else {
		window.showNotification(
			"Demerit accepted. You can still appeal if you believe this is unfair."
		);
		await window.fetchTasksInitial();
	}
};

window.appealDemerit = function (taskId) {
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "demerit") return;

	const showAppealModal = (task, onSubmit) => {
		const modal = document.createElement("div");
		modal.className = "modal-overlay";
		modal.innerHTML = `
            <div class="modal-content">
                <h3>Appeal Demerit Task</h3>
                <p><strong>Task:</strong> ${window.escapeHtml(task.text)}</p>
                <p><strong>Penalty:</strong> -${task.penaltyPoints} points</p>
                <div class="appeal-warning">
                    <div class="warning-title">⚠️ Appeal Risk Warning</div>
                    <div>If approved: +${
						task.penaltyPoints
					} points restored</div>
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

		document.getElementById("modalSubmitAppeal").onclick = () => {
			const appealText = document
				.getElementById("appealTextInput")
				.value.trim();
			const appealError = document.getElementById("appealError");
			if (appealText.length < 10) {
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

	if (task.acceptedAt) {
		window.showNotification(
			"This demerit has already been accepted and cannot be appealed.",
			"error"
		);
		return;
	}

	showAppealModal(task, async (appealText) => {
		const updates = {
			appealStatus: "pending",
			appealedAt: new Date().toISOString(),
			appealText: appealText,
		};

		const { error } = await supabase
			.from("tasks")
			.update(updates)
			.eq("id", taskId);
		if (error) {
			console.error("Error submitting appeal:", error);
			window.showNotification("Failed to submit appeal", "error");
		} else {
			window.showNotification(
				"Appeal submitted. Awaiting admin review.",
				"warning"
			);
			await window.fetchTasksInitial();
		}
	});
};

window.approveAppeal = async function (taskId) {
	if (!window.hasPermission("approve_task")) {
		window.showNotification(
			"You do not have permission to review appeals",
			"error"
		);
		return;
	}

	const task = window.tasks.find((t) => t.id === taskId);
	if (!task) return;

	const updates = {
		appealStatus: "approved",
		appealReviewedAt: new Date().toISOString(),
		appealReviewedBy: window.currentUser,
	};

	const { error: taskError } = await supabase
		.from("tasks")
		.update(updates)
		.eq("id", taskId);
	if (taskError) {
		console.error("Error approving appeal:", taskError);
		window.showNotification("Failed to approve appeal", "error");
		return;
	}

	await window.updateUserPoints(task.assignedTo, task.penaltyPoints, "add");

	window.showNotification(
		`Appeal approved! ${task.penaltyPoints} points restored to ${
			window.users[task.assignedTo]?.displayName
		}`
	);
	await window.fetchTasksInitial();
};

window.denyAppeal = function (taskId) {
	if (!window.hasPermission("approve_task")) {
		window.showNotification(
			"You do not have permission to review appeals",
			"error"
		);
		return;
	}

	const task = window.tasks.find((t) => t.id === taskId);
	if (!task) return;

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
			window.users[task.assignedTo]?.displayName
		} (double penalty).`,
		async (confirmed) => {
			if (!confirmed) {
				return;
			}

			const updates = {
				appealStatus: "denied",
				appealReviewedAt: new Date().toISOString(),
				appealReviewedBy: window.currentUser,
			};

			const { error: taskError } = await supabase
				.from("tasks")
				.update(updates)
				.eq("id", taskId);
			if (taskError) {
				console.error("Error denying appeal:", taskError);
				window.showNotification("Failed to deny appeal", "error");
			} else {
				window.showNotification(
					`Appeal denied! Additional ${
						task.penaltyPoints
					} point penalty applied to ${
						window.users[task.assignedTo]?.displayName
					}`,
					"warning"
				);
				await window.fetchTasksInitial();
			}
		}
	);
};

window.rejectSuggestion = function (suggestionId) {
	if (!window.hasPermission("approve_suggestions")) {
		window.showNotification(
			"You do not have permission to reject suggestions",
			"error"
		);
		return;
	}

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
		async (confirmed) => {
			if (!confirmed) {
				return;
			}

			const suggestionUpdates = {
				status: "rejected",
				reviewedBy: window.currentUser,
				reviewedAt: new Date().toISOString(),
			};

			const { error } = await supabase
				.from("suggestions")
				.update(suggestionUpdates)
				.eq("id", suggestionId);
			if (error) {
				console.error("Error rejecting suggestion:", error);
				window.showNotification("Failed to reject suggestion", "error");
			} else {
				window.showNotification("Suggestion rejected");
				await window.fetchSuggestionsInitial();
			}
		}
	);
};

window.submitTaskSuggestion = async function () {
	const description = document.getElementById("suggestedTaskDescription");
	const justification = document.getElementById("taskJustification");
	const points = document.getElementById("suggestedPoints");
	const dueDate = document.getElementById("suggestedDueDate");

	if (!description || !description.value.trim()) {
		window.showNotification("Please enter a task description", "error");
		return;
	}

	const suggestion = {
		id: window.suggestionIdCounter++,
		description: description.value.trim(),
		justification: justification ? justification.value.trim() : "",
		suggestedPoints: points ? parseInt(points.value) || 10 : 10,
		suggestedDueDate: dueDate ? dueDate.value || null : null,
		suggestedBy: window.currentUser,
		createdAt: new Date().toISOString(),
		status: "pending",
		reviewedBy: null,
		reviewedAt: null,
	};

	const { error: suggestionError } = await supabase
		.from("suggestions")
		.insert([suggestion]);
	const { error: metadataError } = await supabase
		.from("metadata")
		.upsert(
			{ id: "counters", suggestionIdCounter: window.suggestionIdCounter },
			{ onConflict: "id" }
		);

	if (suggestionError || metadataError) {
		console.error(
			"Error submitting suggestion:",
			suggestionError || metadataError
		);
		window.showNotification("Failed to submit suggestion", "error");
		window.suggestionIdCounter--;
	} else {
		const form = document.getElementById("suggestForm");
		if (form) form.reset();
		window.showNotification("Task suggestion submitted successfully!");
		await window.fetchSuggestionsInitial();
	}
};

window.approveSuggestion = async function (suggestionId) {
	const suggestion = window.suggestions.find((s) => s.id === suggestionId);
	if (!suggestion) return;

	const task = {
		id: window.taskIdCounter++,
		text: suggestion.description,
		status: "todo",
		type: "regular",
		createdAt: new Date().toISOString(),
		createdBy: window.currentUser,
		assignedTo: "user",
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
		reviewedBy: window.currentUser,
		reviewedAt: new Date().toISOString(),
	};

	const { error: taskError } = await supabase.from("tasks").insert([task]);
	const { error: suggestionError } = await supabase
		.from("suggestions")
		.update(suggestionUpdates)
		.eq("id", suggestionId);
	const { error: metadataError } = await supabase
		.from("metadata")
		.upsert(
			{ id: "counters", taskIdCounter: window.taskIdCounter },
			{ onConflict: "id" }
		);

	if (taskError || suggestionError || metadataError) {
		console.error(
			"Error approving suggestion:",
			taskError || suggestionError || metadataError
		);
		window.showNotification("Failed to approve suggestion", "error");
	} else {
		window.showNotification(`Suggestion approved and converted to task!`);
		await window.fetchTasksInitial();
		await window.fetchSuggestionsInitial();
	}
};

window.createRepeatingTask = async function (originalTask) {
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
		id: window.taskIdCounter++,
		text: originalTask.text,
		status: "todo",
		type: "regular",
		createdAt: new Date().toISOString(),
		createdBy: originalTask.createdBy,
		assignedTo: "user",
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

	const { error: taskError } = await supabase.from("tasks").insert([newTask]);
	const { error: metadataError } = await supabase
		.from("metadata")
		.upsert(
			{ id: "counters", taskIdCounter: window.taskIdCounter },
			{ onConflict: "id" }
		);

	if (taskError || metadataError) {
		console.error(
			"Error creating repeating task:",
			taskError || metadataError
		);
		window.taskIdCounter--;
	}
};

window.updateUserPoints = async function (
	username = window.currentUser,
	points = 0,
	operation = "set"
) {
	console.log(
		`updateUserPoints called for: ${username}, operation: ${operation}, points: ${points}`
	);

	// Admin points are not tracked in DB, only locally for display purposes if needed
	if (username === "admin") {
		if (operation === "set") {
			window.users[username].points = points;
		} else if (operation === "add") {
			window.users[username].points =
				(window.users[username].points || 0) + points;
		} else if (operation === "subtract") {
			window.users[username].points = Math.max(
				0,
				(window.users[username].points || 0) - points
			);
		}
		// Update UI for the currently logged-in user (admin)
		const pointsBadge = document.getElementById("userPoints");
		if (pointsBadge) {
			pointsBadge.textContent = `${
				window.users[window.currentUser].points || 0
			} Points`;
		}
		const myPointsStat = document.getElementById("myPointsStat");
		if (myPointsStat) {
			myPointsStat.textContent =
				window.users[window.currentUser].points || 0;
		}
		console.log(
			`Admin (${username}) local points after update: ${window.users[username].points}`
		);
		return; // Exit as admin points are not synced to DB
	}

	// Logic for 'user' profile - update local and then Supabase
	if (operation === "set") {
		window.users[username].points = points;
	} else if (operation === "add") {
		window.users[username].points =
			(window.users[username].points || 0) + points;
	} else if (operation === "subtract") {
		window.users[username].points = Math.max(
			0,
			(window.users[username].points || 0) - points
		);
	}
	console.log(
		`User (${username}) local points after update: ${window.users[username].points}`
	);

	const { error } = await supabase.from("userProfiles").upsert(
		{
			username: username,
			points: window.users[username].points,
			updatedAt: new Date().toISOString(),
		},
		{ onConflict: "username" }
	);
	if (error) {
		console.error("Error updating user profile points in Supabase:", error);
	} else {
		console.log(
			`User (${username}) points successfully upserted to Supabase: ${window.users[username].points}`
		);
	}

	// Update UI for the currently logged-in user (if it's the user)
	if (username === window.currentUser) {
		const pointsBadge = document.getElementById("userPoints");
		if (pointsBadge) {
			pointsBadge.textContent = `${
				window.users[window.currentUser].points || 0
			} Points`;
		}

		const myPointsStat = document.getElementById("myPointsStat");
		if (myPointsStat) {
			myPointsStat.textContent =
				window.users[window.currentUser].points || 0;
		}
	}
};

window.checkForOverdueTasks = function () {
	console.log("Checking for overdue tasks...");
	const now = new Date();
	window.tasks.forEach(async (task) => {
		if (
			task.dueDate &&
			task.status !== "completed" &&
			task.type !== "demerit" &&
			task.assignedTo === "user"
		) {
			const wasOverdue = task.isOverdue;
			const isNowOverdue = new Date(task.dueDate) < now;

			if (isNowOverdue && !wasOverdue) {
				console.log(
					`Task ${task.id} is now overdue. Applying penalty.`
				);
				task.isOverdue = true;
				await window.updateUserPoints(
					task.assignedTo,
					task.penaltyPoints,
					"subtract"
				);

				const { error } = await supabase
					.from("tasks")
					.update({ isOverdue: true })
					.eq("id", task.id);
				if (error) {
					console.error("Error updating overdue status:", error);
				}
			}
		}
	});
};
