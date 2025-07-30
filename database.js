// database.js
// This file encapsulates all Supabase database interactions.

// Global Supabase client instance
let supabase = null;

// Global variables for local data storage and counters (defined in main.js)
// These are accessed via window.
// let tasks = [];
// let suggestions = [];
// let userActivityLog = [];
// let taskIdCounter = 1;
// let suggestionIdCounter = 1;

// Global unsubscribe object to hold Supabase channel subscriptions
let unsubscribe = {};

// Global functions from ui.js (referenced here for clarity)
// function showError(message) { ... }
// function showNotification(message, type) { ... }
// function renderTasks() { ... }
// function renderSuggestions() { ... }
// function renderDashboard() { ... }
// function renderUserProgress() { ... }
// function updateStats() { ... }
// function updateUserPoints() { ... }

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
 * This is used for tables where IDs are client-generated (tasks, suggestions)
 * and not auto-incremented by Supabase.
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

	// Unsubscribe from previous channels if they exist to prevent duplicate listeners
	if (window.unsubscribe) {
		if (window.unsubscribe.tasks)
			supabase.removeChannel(window.unsubscribe.tasks);
		if (window.unsubscribe.suggestions)
			supabase.removeChannel(window.unsubscribe.suggestions);
		if (window.unsubscribe.activity)
			supabase.removeChannel(window.unsubscribe.activity);
		if (window.unsubscribe.userProfiles)
			supabase.removeChannel(window.unsubscribe.userProfiles);
		window.unsubscribe = null; // Clear the unsubscribe object
	}

	// --- Load Metadata Counters and ensure they are up-to-date with max IDs ---
	try {
		// Fetch current counters from metadata table
		const { data: counterData } = await supabase
			.from("metadata")
			.select("taskIdCounter, suggestionIdCounter")
			.eq("id", "counters")
			.limit(1);

		// Initialize/update client-side counters based on max of DB value and fetched max ID + 1
		// This ensures client-side IDs don't conflict with existing DB IDs for tasks/suggestions.
		window.taskIdCounter = Math.max(
			counterData?.[0]?.taskIdCounter || 1,
			await fetchMaxId("tasks")
		);
		window.suggestionIdCounter = Math.max(
			counterData?.[0]?.suggestionIdCounter || 1,
			await fetchMaxId("suggestions")
		);
		// activityIdCounter is no longer needed as UUIDs will be used for userActivity.

		// Upsert updated counters back to metadata table
		const { error: upsertMetadataError } = await supabase
			.from("metadata")
			.upsert(
				{
					id: "counters",
					taskIdCounter: window.taskIdCounter,
					suggestionIdCounter: window.suggestionIdCounter,
				},
				{ onConflict: "id" } // Conflict resolution for upsert
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
	// Fetch all necessary data to populate the UI initially
	await window.fetchTasksInitial();
	await window.fetchSuggestionsInitial();
	await window.fetchUserActivityInitial();
	await window.fetchUserProfilesInitial();

	// --- Real-time Listeners ---
	// Set up real-time subscriptions for immediate UI updates on data changes.

	// Tasks Listener: Listens for changes in the 'tasks' table
	const tasksChannel = supabase
		.channel("tasks_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "tasks" },
			(payload) => {
				console.log("Task change received!", payload);
				if (payload.eventType === "INSERT") {
					window.tasks.unshift(payload.new); // Add new task to the beginning of the array
				} else if (payload.eventType === "UPDATE") {
					const index = window.tasks.findIndex(
						(t) => t.id === payload.old.id
					);
					if (index !== -1) {
						window.tasks[index] = payload.new; // Update existing task
					}
				} else if (payload.eventType === "DELETE") {
					window.tasks = window.tasks.filter(
						(t) => t.id !== payload.old.id
					); // Remove deleted task
				}
				// Re-sort tasks and re-render UI components that depend on tasks
				window.tasks.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
				window.renderTasks();
				window.updateStats();
			}
		)
		.subscribe(); // Subscribe to activate the listener

	// Suggestions Listener: Listens for changes in the 'suggestions' table
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
				// Re-sort suggestions and re-render UI components
				window.suggestions.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
				window.renderSuggestions();
			}
		)
		.subscribe();

	// User Activity Listener: Listens for changes in the 'userActivity' table
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
						// Keep only last 50 activities in local log for performance
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
				// Re-sort activity log and re-render dashboard
				window.userActivityLog.sort(
					(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
				);
				window.renderDashboard();
			}
		)
		.subscribe();

	// User Profiles Listener: Listens for changes in 'userProfiles' (e.g., points updates)
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
					// Update the local 'users' object with the latest points
					if (window.users[username]) {
						window.users[username].points = profileData.points || 0;
					}
				}
				window.updateUserPoints(); // Update UI elements displaying points
				window.renderUserProgress(); // Re-render user progress on dashboard
			}
		)
		.subscribe();

	// Store the channel objects for unsubscribing later (e.g., on logout)
	window.unsubscribe = {
		tasks: tasksChannel,
		suggestions: suggestionsChannel,
		activity: activityChannel,
		userProfiles: userProfilesChannel,
	};
};

// Initial fetch functions (called once on load to populate data)
/**
 * Fetches all tasks from Supabase.
 */
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

/**
 * Fetches all suggestions from Supabase.
 */
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

/**
 * Fetches user activity log from Supabase.
 */
window.fetchUserActivityInitial = async function () {
	// Fetch the latest 50 activities, ordered by timestamp descending
	const { data, error } = await supabase
		.from("userActivity")
		.select("*")
		.order("timestamp", { ascending: false })
		.limit(50);
	if (error) {
		console.error("Error fetching user activity:", error);
	} else {
		window.userActivityLog = data; // Already limited and sorted by the query
		window.renderDashboard(); // Re-render dashboard as it depends on activity log
	}
};

/**
 * Fetches all user profiles (for points) from Supabase.
 */
window.fetchUserProfilesInitial = async function () {
	const { data, error } = await supabase.from("userProfiles").select("*");
	if (error) {
		console.error("Error fetching user profiles:", error);
	} else {
		data.forEach((profileData) => {
			const username = profileData.username;
			if (window.users[username]) {
				window.users[username].points = profileData.points || 0;
			}
		});
		window.updateUserPoints(); // Update UI
		window.renderUserProgress(); // Re-render user progress on dashboard
	}
};

// To prevent duplicate 'login' activity logs within a short time frame
let lastLoginAttemptTimestamp = 0;
const LOGIN_DEBOUNCE_TIME = 5000; // 5 seconds

// --- User Activity Logging ---
/**
 * Logs user activity to the userActivityLog array and Supabase database.
 * Only logs activity for the 'user' role.
 * Supabase will auto-generate the ID for the 'userActivity' table.
 * @param {string} action - The action performed (e.g., 'login', 'logout').
 */
window.logUserActivity = async function (action) {
	// Only log activity for the 'user' role
	if (window.currentUser !== "user") {
		return;
	}

	// Debounce for 'login' action to prevent duplicate logs from rapid triggers
	if (action === "login") {
		const now = Date.now();
		if (now - lastLoginAttemptTimestamp < LOGIN_DEBOUNCE_TIME) {
			console.warn(
				`[logUserActivity] Debouncing 'login' action for user '${window.currentUser}'. Too soon after last attempt.`
			);
			return; // Skip logging if too soon
		}
		lastLoginAttemptTimestamp = now; // Update last attempt timestamp
	}

	// Create the activity object. DO NOT include an 'id' field here.
	// Supabase should be configured to auto-generate the primary key for 'userActivity'.
	const activity = {
		user: window.currentUser,
		action: action,
		timestamp: new Date().toISOString(), // Use current timestamp
	};

	console.log(`[logUserActivity] Attempting to insert activity:`, activity);

	// Add to local log (real-time listener will also add it, but this ensures immediate UI update)
	window.userActivityLog.unshift(activity);

	// Keep only last 50 activities in local log (this will be reinforced by the real-time listener)
	if (window.userActivityLog.length > 50) {
		window.userActivityLog = window.userActivityLog.slice(0, 50);
	}

	// Save to database.
	if (supabase) {
		const { error } = await supabase
			.from("userActivity")
			.insert([activity]); // Ensure 'activity' object does NOT contain 'id'
		if (error) {
			console.error("Error logging activity to Supabase:", error);
			// Revert local log if there's a database error to keep sync
			window.userActivityLog.shift();
		} else {
			console.log(
				`[logUserActivity] Activity logged successfully for user: ${activity.user}, action: ${activity.action}`
			);
		}
	}
};

// --- Date Helper Functions ---
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
 * Retrieves tasks that are due on a specific date for the current user.
 * @param {Date} date - The date to check for tasks.
 * @returns {Array<object>} An array of task objects due on the given date.
 */
window.getTasksForDate = function (date) {
	const dateStr = date.toDateString();
	// Filter tasks assigned to the current user that match the date
	return window.tasks.filter((task) => {
		if (!task.dueDate || task.assignedTo !== window.currentUser)
			return false;
		return new Date(task.dueDate).toDateString() === dateStr;
	});
};

// --- CRUD Operations ---

/**
 * Creates a new task (regular or demerit) and saves it to Supabase.
 */
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
			id: window.taskIdCounter++, // Client-generated ID
			text: taskText,
			status: "demerit_issued",
			type: "demerit",
			createdAt: new Date().toISOString(),
			createdBy: window.currentUser,
			assignedTo: "user", // Demerits are always assigned to 'user'
			points: 0, // Demerits have no reward points
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

		// Immediately apply penalty points for demerit tasks
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
			id: window.taskIdCounter++, // Client-generated ID
			text: taskText,
			status: "todo",
			type: "regular",
			createdAt: new Date().toISOString(),
			createdBy: window.currentUser,
			assignedTo: "user", // Regular tasks are always assigned to 'user'
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

	// Insert the new task into the 'tasks' table
	const { error: taskError } = await supabase.from("tasks").insert([task]);
	// Update the taskIdCounter in the 'metadata' table
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
		window.taskIdCounter--; // Rollback counter if there was an error
	} else {
		// Reset form fields after successful creation
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
		// Re-fetch tasks to ensure UI is in sync (real-time listener will also update)
		await window.fetchTasksInitial();
	}
};

/**
 * Marks a task as complete and sets its status to 'pending_approval'.
 * @param {number} taskId - The ID of the task to check off.
 */
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

	// Prevent checking off demerit tasks
	if (task.type === "demerit") {
		window.showNotification(
			"Demerit tasks cannot be marked as complete.",
			"error"
		);
		return;
	}

	// Ensure the task is assigned to the current user
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
		await window.fetchTasksInitial(); // Re-fetch tasks to update UI
	}
};

/**
 * Approves a completed task, changing its status to 'completed' and awarding points.
 * @param {number} taskId - The ID of the task to approve.
 */
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

	// Award points to the user who completed the task
	await window.updateUserPoints(task.completedBy, task.points, "add");

	window.showNotification(
		`Task approved! ${task.points} points awarded to ${
			window.users[task.completedBy]?.displayName
		}`
	);

	// If the task is repeating, create the next instance
	if (task.isRepeating && task.dueDate) {
		window.createRepeatingTask(task);
	}
	await window.fetchTasksInitial(); // Re-fetch tasks to update UI
};

/**
 * Rejects a task, setting its status to 'failed' and applying a penalty.
 * Uses a custom confirmation modal instead of `confirm()`.
 * @param {number} taskId - The ID of the task to reject.
 */
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

	// Use custom modal for confirmation
	window.showConfirmModal(
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

			// Apply penalty points to the user who completed the task
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
			await window.fetchTasksInitial(); // Re-fetch tasks to update UI
		}
	);
};

/**
 * Deletes a task.
 * Uses a custom confirmation modal instead of `confirm()`.
 * @param {number} taskId - The ID of the task to delete.
 */
window.deleteTask = function (taskId) {
	if (!window.hasPermission("delete_task")) {
		window.showNotification(
			"You do not have permission to delete tasks",
			"error"
		);
		return;
	}

	// Use custom modal for confirmation
	window.showConfirmModal(
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
				await window.fetchTasksInitial(); // Re-fetch tasks to update UI
			}
		}
	);
};

/**
 * Allows a user to accept a demerit task.
 * @param {number} taskId - The ID of the demerit task to accept.
 */
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
		await window.fetchTasksInitial(); // Re-fetch tasks to update UI
	}
};

/**
 * Allows a user to appeal a demerit task.
 * Uses a custom modal with a text input for the appeal reason.
 * @param {number} taskId - The ID of the demerit task to appeal.
 */
window.appealDemerit = function (taskId) {
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "demerit") return;

	// Prevent appeal if already accepted
	if (task.acceptedAt) {
		window.showNotification(
			"This demerit has already been accepted and cannot be appealed.",
			"error"
		);
		return;
	}

	// Use custom modal for appeal submission
	window.showAppealModal(task, async (appealText) => {
		const updates = {
			appealStatus: "pending",
			appealedAt: new Date().toISOString(),
			appealText: appealText, // Save the appeal text
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
			await window.fetchTasksInitial(); // Re-fetch tasks to update UI
		}
	});
};

/**
 * Approves a demerit appeal, restoring points to the user.
 * @param {number} taskId - The ID of the task whose appeal is to be approved.
 */
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

	// Restore penalty points to the user
	await window.updateUserPoints(task.assignedTo, task.penaltyPoints, "add");

	window.showNotification(
		`Appeal approved! ${task.penaltyPoints} points restored to ${
			window.users[task.assignedTo]?.displayName
		}`
	);
	await window.fetchTasksInitial(); // Re-fetch tasks to update UI
};

/**
 * Denies a demerit appeal, applying an additional penalty to the user.
 * Uses a custom confirmation modal instead of `confirm()`.
 * @param {number} taskId - The ID of the task whose appeal is to be denied.
 */
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

	// Use custom modal for confirmation
	window.showConfirmModal(
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
				await window.fetchTasksInitial(); // Re-fetch tasks to update UI
			}
		}
	);
};

/**
 * Rejects a task suggestion.
 * Uses a custom confirmation modal instead of `confirm()`.
 * @param {number} suggestionId - The ID of the suggestion to reject.
 */
window.rejectSuggestion = function (suggestionId) {
	if (!window.hasPermission("approve_suggestions")) {
		window.showNotification(
			"You do not have permission to reject suggestions",
			"error"
		);
		return;
	}

	// Use custom modal for confirmation
	window.showConfirmModal(
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
				await window.fetchSuggestionsInitial(); // Re-fetch suggestions to update UI
			}
		}
	);
};

/**
 * Submits a new task suggestion to Supabase.
 */
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
		id: window.suggestionIdCounter++, // Client-generated ID
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

	// Insert new suggestion into 'suggestions' table
	const { error: suggestionError } = await supabase
		.from("suggestions")
		.insert([suggestion]);
	// Update suggestionIdCounter in 'metadata' table
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
		window.suggestionIdCounter--; // Rollback counter if error
	} else {
		const form = document.getElementById("suggestForm");
		if (form) form.reset(); // Reset the suggestion form
		window.showNotification("Task suggestion submitted successfully!");
		await window.fetchSuggestionsInitial(); // Re-fetch suggestions to update UI
	}
};

/**
 * Approves a task suggestion and converts it into a new task.
 * @param {number} suggestionId - The ID of the suggestion to approve.
 */
window.approveSuggestion = async function (suggestionId) {
	const suggestion = window.suggestions.find((s) => s.id === suggestionId);
	if (!suggestion) return;

	// Create a new task based on the approved suggestion
	const task = {
		id: window.taskIdCounter++, // Client-generated ID for the new task
		text: suggestion.description,
		status: "todo",
		type: "regular",
		createdAt: new Date().toISOString(),
		createdBy: window.currentUser, // Admin approves, so admin created
		assignedTo: "user", // Suggestions are for the 'user'
		points: suggestion.suggestedPoints,
		penaltyPoints: Math.floor(suggestion.suggestedPoints / 2), // Default penalty
		dueDate: suggestion.suggestedDueDate,
		isRepeating: false,
		repeatInterval: null,
		completedAt: null,
		completedBy: null,
		approvedAt: null,
		approvedBy: null,
		isOverdue: false,
	};

	// Update the suggestion's status to 'approved'
	const suggestionUpdates = {
		status: "approved",
		reviewedBy: window.currentUser,
		reviewedAt: new Date().toISOString(),
	};

	// Perform database operations
	const { error: taskError } = await supabase.from("tasks").insert([task]);
	const { error: suggestionError } = await supabase
		.from("suggestions")
		.update(suggestionUpdates)
		.eq("id", suggestionId);
	// Update taskIdCounter in metadata
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
		await window.fetchTasksInitial(); // Re-fetch tasks
		await window.fetchSuggestionsInitial(); // Re-fetch suggestions
	}
};

/**
 * Creates a new instance of a repeating task.
 * @param {object} originalTask - The original task object that is repeating.
 */
window.createRepeatingTask = async function (originalTask) {
	const nextDueDate = new Date(originalTask.dueDate);

	// Calculate the next due date based on the repeat interval
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

	// Create a new task object for the next repetition
	const newTask = {
		id: window.taskIdCounter++, // Client-generated ID
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

	// Insert the new repeating task into the 'tasks' table
	const { error: taskError } = await supabase.from("tasks").insert([newTask]);
	// Update taskIdCounter in 'metadata' table
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
		window.taskIdCounter--; // Rollback counter if error
	}
};

/**
 * Updates a user's points in the local 'users' object and in the Supabase 'userProfiles' table.
 * @param {string} username - The username whose points are to be updated.
 * @param {number} points - The amount of points to add, subtract, or set.
 * @param {string} operation - The operation to perform ('add', 'subtract', 'set').
 */
window.updateUserPoints = async function (
	username = window.currentUser,
	points = 0,
	operation = "set"
) {
	console.log(
		`updateUserPoints called for: ${username}, operation: ${operation}, points: ${points}`
	);

	// Admin points are managed locally only and not persisted to DB
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

	// Upsert user profile points to Supabase
	const { error } = await supabase.from("userProfiles").upsert(
		{
			username: username,
			points: window.users[username].points,
			updatedAt: new Date().toISOString(),
		},
		{ onConflict: "username" } // Upsert based on username
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

/**
 * Periodically checks for overdue tasks and applies penalties.
 */
window.checkForOverdueTasks = function () {
	console.log("Checking for overdue tasks...");
	const now = new Date();
	window.tasks.forEach(async (task) => {
		if (
			task.dueDate &&
			task.status !== "completed" &&
			task.type !== "demerit" &&
			task.assignedTo === "user" // Only check overdue for the single 'user'
		) {
			const wasOverdue = task.isOverdue;
			const isNowOverdue = new Date(task.dueDate) < now;

			if (isNowOverdue && !wasOverdue) {
				console.log(
					`Task ${task.id} is now overdue. Applying penalty.`
				);
				task.isOverdue = true; // Update local state
				// Apply penalty points to the assigned user
				await window.updateUserPoints(
					task.assignedTo,
					task.penaltyPoints,
					"subtract"
				);

				// Update the task's overdue status in Supabase
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
