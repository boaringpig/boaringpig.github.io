// database.js
// This file encapsulates all Supabase database interactions.

// Global Supabase client instance
let supabase = null;

// Global variables for local data storage and counters (defined in main.js)
// These are accessed via window.
// let tasks = [];
// let suggestions = [];
// let userActivityLog = [];
// let taskIdCounter = 1; // Now only initialized from DB max ID, not incremented for new inserts
// let suggestionIdCounter = 1; // Now only initialized from DB max ID, not incremented for new inserts

// NEW: Global variables for reward data
window.rewards = []; // To store fetched rewards
window.userRewardPurchases = []; // To store user's purchase history
window.rewardSystemSettings = {}; // To store the single row of settings

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
// function renderCalendar() { ... } // Added for FullCalendar refresh

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
		// NEW: Unsubscribe from reward channels
		if (window.unsubscribe.rewards)
			supabase.removeChannel(window.unsubscribe.rewards);
		if (window.unsubscribe.userRewardPurchases)
			supabase.removeChannel(window.unsubscribe.userRewardPurchases);
		if (window.unsubscribe.rewardSystemSettings)
			supabase.removeChannel(window.unsubscribe.rewardSystemSettings);

		window.unsubscribe = {}; // Clear the unsubscribe object
	}

	// --- Load Metadata Counters and ensure they are up-to-date with max IDs ---
	// Only fetch/upsert metadata counters for tables that *actually* use client-side IDs.
	// Tasks and Suggestions will now rely on DB auto-increment, so their counters are less critical.
	// However, the metadata table itself might still be used for other purposes or for initial client-side ID setup if DB auto-increment is not used.
	// For now, keep the metadata counter logic as is, but ensure tasks/suggestions don't use them for new inserts.
	try {
		// Fetch current counters from metadata table
		const { data: counterData } = await supabase
			.from("metadata")
			.select("taskIdCounter, suggestionIdCounter")
			.eq("id", "counters")
			.limit(1);

		// Initialize/update client-side counters based on max of DB value and fetched max ID + 1
		// This ensures client-side IDs don't conflict with existing DB IDs for tasks/suggestions.
		// Note: For new inserts, we will *not* use these counters for tasks/suggestions,
		// as Supabase will auto-generate IDs. These counters are now primarily for
		// ensuring existing data's IDs are correctly handled if client-side IDs were
		// used previously, or for other client-side ID needs not yet specified.
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
	// NEW: Fetch reward-related data
	await window.fetchRewardsInitial();
	await window.fetchUserRewardPurchasesInitial();
	await window.fetchRewardSystemSettingsInitial();

	// --- Real-time Listeners ---
	// Set up real-time subscriptions for immediate UI updates on data changes.

	// Tasks Listener: Listens for changes in the 'tasks' table
	const tasksChannel = supabase
		.channel("tasks_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "tasks" },
			(payload) => {
				try {
					// Added try-catch
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
					// Refresh FullCalendar when tasks change
					if (window.activeTab === "calendar") {
						window.renderCalendar();
					}
				} catch (error) {
					console.error("Error in tasksChannel listener:", error);
					window.showNotification(
						"An error occurred with task updates.",
						"error"
					);
				}
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
				try {
					// Added try-catch
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
				} catch (error) {
					console.error(
						"Error in suggestionsChannel listener:",
						error
					);
					window.showNotification(
						"An error occurred with suggestion updates.",
						"error"
					);
				}
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
				try {
					// Added try-catch
					console.log("Activity change received!", payload);
					if (payload.eventType === "INSERT") {
						window.userActivityLog.unshift(payload.new);
						if (window.userActivityLog.length > 50) {
							// Keep only last 50 activities in local log for performance
							window.userActivityLog =
								window.userActivityLog.slice(0, 50);
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
				} catch (error) {
					console.error("Error in activityChannel listener:", error);
					window.showNotification(
						"An error occurred with activity updates.",
						"error"
					);
				}
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
				try {
					// Added try-catch
					console.log("User profile change received!", payload);
					if (
						payload.eventType === "INSERT" ||
						payload.eventType === "UPDATE"
					) {
						const profileData = payload.new;
						const username = profileData.username;
						// Update the local 'users' object with the latest points
						if (window.users[username]) {
							window.users[username].points =
								profileData.points || 0;
						}
					}
					window.updateUserPoints(); // Update UI elements displaying points
					window.renderUserProgress(); // Re-render user progress on dashboard
				} catch (error) {
					console.error(
						"Error in userProfilesChannel listener:",
						error
					);
					window.showNotification(
						"An error occurred with user data updates.",
						"error"
					);
				}
			}
		)
		.subscribe();

	// NEW: Rewards Listener
	const rewardsChannel = supabase
		.channel("rewards_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "rewards" },
			(payload) => {
				console.log("Reward change received!", payload);
				if (payload.eventType === "INSERT") {
					window.rewards.push(payload.new);
				} else if (payload.eventType === "UPDATE") {
					const index = window.rewards.findIndex(
						(r) => r.id === payload.old.id
					);
					if (index !== -1) window.rewards[index] = payload.new;
				} else if (payload.eventType === "DELETE") {
					window.rewards = window.rewards.filter(
						(r) => r.id !== payload.old.id
					);
				}
				window.rewards.sort((a, b) => a.title.localeCompare(b.title));
				if (
					window.activeTab === "shop" ||
					window.currentUser === "admin"
				) {
					window.renderRewards();
					if (window.currentUser === "admin") {
						window.renderAdminRewardManagement();
					}
				}
			}
		)
		.subscribe();

	// NEW: User Reward Purchases Listener
	const userRewardPurchasesChannel = supabase
		.channel("user_reward_purchases_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "userRewardPurchases" },
			async (payload) => {
				console.log("User reward purchase change received!", payload);
				// Re-fetch to ensure joined data (`rewards(title, cost, type)`) is fresh
				await window.fetchUserRewardPurchasesInitial();
				if (
					window.currentUser === "admin" ||
					window.activeTab === "shop"
				) {
					window.renderUserRewardPurchases();
					window.renderPendingAuthorizations(); // Update admin pending auths
				}
			}
		)
		.subscribe();

	// NEW: Reward System Settings Listener
	const rewardSystemSettingsChannel = supabase
		.channel("reward_system_settings_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "rewardSystemSettings" },
			async (payload) => {
				console.log("Reward system settings change received!", payload);
				if (
					payload.eventType === "UPDATE" ||
					payload.eventType === "INSERT"
				) {
					window.rewardSystemSettings = payload.new;
					window.checkForRewardLimitReset(); // Re-check for reset on update
					if (
						window.currentUser === "admin" &&
						(window.activeTab === "dashboard" ||
							window.activeTab === "adminSettings")
					) {
						window.renderDashboard();
						window.renderAdminRewardSettings();
					}
				}
			}
		)
		.subscribe();

	// Store the channel objects for unsubscribing later (e.g., on logout)
	window.unsubscribe = {
		tasks: tasksChannel,
		suggestions: suggestionsChannel,
		activity: activityChannel,
		userProfiles: userProfilesChannel,
		rewards: rewardsChannel, // NEW
		userRewardPurchases: userRewardPurchasesChannel, // NEW
		rewardSystemSettings: rewardSystemSettingsChannel, // NEW
	};

	// Initial check for reward limit reset when data is loaded
	window.checkForRewardLimitReset();
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
		// Also refresh calendar after tasks are fetched
		if (window.activeTab === "calendar" && window.fullCalendarInstance) {
			window.fullCalendarInstance.refetchEvents();
		} else if (window.activeTab === "calendar") {
			window.renderCalendar(); // Initialize if not already
		}
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
		// After fetching, ensure the local UI reflects the loaded points.
		// The updateUserPoints function with no operation will just refresh the UI from window.users
		window.updateUserPoints();
		window.renderUserProgress(); // Re-render user progress on dashboard
	}
};

// NEW: Function to fetch all rewards
window.fetchRewardsInitial = async function () {
	const { data, error } = await supabase.from("rewards").select("*");
	if (error) {
		console.error("Error fetching rewards:", error);
		window.showError("Failed to load rewards.");
	} else {
		window.rewards = data.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically
		if (window.activeTab === "shop" || window.currentUser === "admin") {
			// Re-render if in shop/admin view
			window.renderRewards();
			if (window.currentUser === "admin") {
				window.renderAdminRewardManagement();
			}
		}
	}
};

// NEW: Function to fetch user's reward purchases
window.fetchUserRewardPurchasesInitial = async function () {
	// Fetch only current user's purchases if not admin, otherwise all purchases for admin
	const query =
		window.currentUser === "admin"
			? supabase
					.from("userRewardPurchases")
					.select("*, rewards(title, cost, type)")
					.order("purchaseDate", { ascending: false })
			: supabase
					.from("userRewardPurchases")
					.select("*, rewards(title, cost, type)")
					.eq("userId", window.currentUser)
					.order("purchaseDate", { ascending: false }); // Added order by
	const { data, error } = await query;

	if (error) {
		console.error("Error fetching user reward purchases:", error);
		window.showError("Failed to load purchase history.");
	} else {
		window.userRewardPurchases = data;
		if (window.activeTab === "shop" || window.currentUser === "admin") {
			window.renderUserRewardPurchases(); // A new UI function to render purchases
			if (window.currentUser === "admin") {
				window.renderPendingAuthorizations();
			}
		}
	}
};

// NEW: Function to fetch reward system settings
window.fetchRewardSystemSettingsInitial = async function () {
	const { data, error } = await supabase
		.from("rewardSystemSettings")
		.select("*")
		.eq("id", "system_settings")
		.limit(1);
	if (error) {
		console.error("Error fetching reward system settings:", error);
		// Initialize with default settings if not found or error
		window.rewardSystemSettings = {
			id: "system_settings",
			instantPurchaseLimit: 500,
			currentInstantSpend: 0,
			resetDurationDays: 30,
			lastResetAt: new Date().toISOString(),
			requiresAuthorizationAfterLimit: true,
		};
		// Attempt to upsert default settings
		await supabase
			.from("rewardSystemSettings")
			.upsert([window.rewardSystemSettings], { onConflict: "id" });
	} else if (data && data.length > 0) {
		window.rewardSystemSettings = data[0];
		// Check for automatic reset if applicable
		window.checkForRewardLimitReset(); // A new function to implement
	} else {
		// If no settings exist, create with defaults
		window.rewardSystemSettings = {
			id: "system_settings",
			instantPurchaseLimit: 500,
			currentInstantSpend: 0,
			resetDurationDays: 30,
			lastResetAt: new Date().toISOString(),
			requiresAuthorizationAfterLimit: true,
		};
		await supabase
			.from("rewardSystemSettings")
			.upsert([window.rewardSystemSettings], { onConflict: "id" }); // Corrected onConflict
	}
	// Re-render dashboard or admin settings if active
	if (
		window.currentUser === "admin" &&
		(window.activeTab === "dashboard" ||
			window.activeTab === "adminSettings")
	) {
		window.renderDashboard(); // Update dashboard with new stats
		window.renderAdminRewardSettings(); // A new UI function for admin settings
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
			// id: window.taskIdCounter++, // REMOVED: Let Supabase handle ID generation
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

		// Immediately apply penalty points
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
			// id: window.taskIdCounter++, // REMOVED: Let Supabase handle ID generation
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
			repeatInterval: isRepeating ? repeatInterval : null, // Only set if repeating
			completedAt: null,
			completedBy: null,
			approvedAt: null,
			approvedBy: null,
			isOverdue: false,
		};
	}

	// Insert the new task into the 'tasks' table
	const { error: taskError } = await supabase.from("tasks").insert([task]);
	// REMOVED: Update the taskIdCounter in the 'metadata' table (Supabase handles ID)
	// const { error: metadataError } = await supabase
	// 	.from("metadata")
	// 	.upsert(
	// 		{ id: "counters", taskIdCounter: window.taskIdCounter },
	// 		{ onConflict: "id" }
	// 	);

	if (taskError /* || metadataError */) {
		// Adjusted error check
		console.error("Error creating task:", taskError /* || metadataError */);
		window.showNotification(
			"Failed to create task. Please try again.",
			"error"
		);
		// window.taskIdCounter--; // No longer need to rollback client-side counter
	} else {
		// Reset form
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
				// Apply double penalty points to the user
				await window.updateUserPoints(
					task.assignedTo,
					task.penaltyPoints * 2, // Apply double the penalty points
					"subtract"
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
		// id: window.suggestionIdCounter++, // REMOVED: Let Supabase handle ID generation
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
	// REMOVED: Update suggestionIdCounter in 'metadata' table (Supabase handles ID)
	// const { error: metadataError } = await supabase
	// 	.from("metadata")
	// 	.upsert(
	// 		{ id: "counters", suggestionIdCounter: window.suggestionIdCounter },
	// 		{ onConflict: "id" }
	// 	);

	if (suggestionError /* || metadataError */) {
		// Adjusted error check
		console.error(
			"Error submitting suggestion:",
			suggestionError /* || metadataError */
		);
		window.showNotification("Failed to submit suggestion", "error");
		// window.suggestionIdCounter--; // No longer need to rollback client-side counter
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
		// id: window.taskIdCounter++, // REMOVED: Let Supabase handle ID generation
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
	// REMOVED: Update taskIdCounter in metadata (Supabase handles ID)
	// const { error: metadataError } = await supabase
	// 	.from("metadata")
	// 	.upsert(
	// 		{ id: "counters", taskIdCounter: window.taskIdCounter },
	// 		{ onConflict: "id" }
	// 	);

	if (taskError || suggestionError /* || metadataError */) {
		// Adjusted error check
		console.error(
			"Error approving suggestion:",
			taskError || suggestionError /* || metadataError */
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
		// id: window.taskIdCounter++, // REMOVED: Let Supabase handle ID generation
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
	// REMOVED: Update taskIdCounter in 'metadata' table (Supabase handles ID)
	// const { error: metadataError } = await supabase
	// 	.from("metadata")
	// 	.upsert(
	// 		{ id: "counters", taskIdCounter: window.taskIdCounter },
	// 		{ onConflict: "id" }
	// 	);

	if (taskError /* || metadataError */) {
		// Adjusted error check
		console.error(
			"Error creating repeating task:",
			taskError /* || metadataError */
		);
		// window.taskIdCounter--; // No longer need to rollback client-side counter
	}
};

/**
 * Updates a user's points in the local 'users' object and in the Supabase 'userProfiles' table.
 * @param {string} username - The username whose points are to be updated.
 * @param {number} points - The amount of points to add, subtract, or set.
 * @param {string | null} operation - The operation to perform ('add', 'subtract', 'set', or null for UI refresh).
 */
window.updateUserPoints = async function (
	username = window.currentUser,
	points = 0,
	operation = null // Changed default to null
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

	// Logic for 'user' profile - only modify points if an explicit operation is specified
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
	// If operation is null, we assume window.users[username].points already holds the correct value
	// from the initial fetch or a real-time update, so we just proceed to update the UI.
	console.log(
		`User (${username}) local points after update: ${window.users[username].points}`
	);

	// Only upsert to database if an explicit operation was performed
	if (operation !== null && supabase) {
		// Ensure we only write to DB if an operation (add/subtract/set) occurred
		const { error } = await supabase.from("userProfiles").upsert(
			{
				username: username,
				points: window.users[username].points,
				updatedAt: new Date().toISOString(),
			},
			{ onConflict: "username" } // Upsert based on username
		);
		if (error) {
			console.error(
				"Error updating user profile points in Supabase:",
				error
			);
		} else {
			console.log(
				`User (${username}) points successfully upserted to Supabase: ${window.users[username].points}`
			);
		}
	}

	// Always update UI for the currently logged-in user (if it's the user)
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

// NEW: Function to add a new reward (Admin only)
window.addReward = async function (title, description, cost, type) {
	if (!window.hasPermission("manage_rewards")) {
		// New permission
		window.showNotification(
			"You do not have permission to add rewards",
			"error"
		);
		return;
	}
	const { error } = await supabase.from("rewards").insert([
		{
			title,
			description,
			cost,
			type,
			createdAt: new Date().toISOString(),
			createdBy: window.currentUser,
			lastUpdatedAt: new Date().toISOString(),
		},
	]);
	if (error) {
		console.error("Error adding reward:", error);
		window.showNotification("Failed to add reward.", "error");
	} else {
		window.showNotification("Reward added successfully!");
		await window.fetchRewardsInitial();
	}
};

// NEW: Function to update an existing reward (Admin only)
window.updateReward = async function (
	rewardId,
	title,
	description,
	cost,
	type
) {
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to update rewards",
			"error"
		);
		return;
	}
	const { error } = await supabase
		.from("rewards")
		.update({
			title,
			description,
			cost,
			type,
			lastUpdatedAt: new Date().toISOString(),
		})
		.eq("id", rewardId);
	if (error) {
		console.error("Error updating reward:", error);
		window.showNotification("Failed to update reward.", "error");
	} else {
		window.showNotification("Reward updated successfully!");
		await window.fetchRewardsInitial();
	}
};

// NEW: Function to delete a reward (Admin only)
window.deleteReward = async function (rewardId) {
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to delete rewards",
			"error"
		);
		return;
	}
	window.showConfirmModal(
		"Are you sure you want to delete this reward?",
		async (confirmed) => {
			if (!confirmed) return;
			const { error } = await supabase
				.from("rewards")
				.delete()
				.eq("id", rewardId);
			if (error) {
				console.error("Error deleting reward:", error);
				window.showNotification("Failed to delete reward.", "error");
			} else {
				window.showNotification("Reward deleted successfully!");
				await window.fetchRewardsInitial();
			}
		}
	);
};

// NEW: Function to purchase a reward (User only)
window.purchaseReward = async function (rewardId) {
	const reward = window.rewards.find((r) => r.id === rewardId);
	if (!reward) {
		window.showNotification("Reward not found.", "error");
		return;
	}

	const currentUserData = window.users[window.currentUser];
	if (currentUserData.points < reward.cost) {
		window.showNotification(
			"Not enough points to purchase this reward.",
			"error"
		);
		return;
	}

	let purchaseStatus = "purchased"; // Default for instant
	let requiresAuth = false;

	// Check instant purchase limit if applicable
	const settings = window.rewardSystemSettings;
	const currentSpend = settings.currentInstantSpend || 0;
	const limit = settings.instantPurchaseLimit || 0;
	const requiresAuthAfterLimit =
		settings.requiresAuthorizationAfterLimit !== false; // Default to true

	if (reward.type === "instant") {
		if (requiresAuthAfterLimit && currentSpend + reward.cost > limit) {
			requiresAuth = true;
			purchaseStatus = "pending_authorization";
		}
	} else {
		// reward.type === 'authorized'
		requiresAuth = true;
		purchaseStatus = "pending_authorization";
	}

	// Confirm purchase
	window.showConfirmModal(
		`Are you sure you want to purchase "${reward.title}" for ${reward.cost} points?` +
			(requiresAuth
				? " This purchase will require admin authorization."
				: ""),
		async (confirmed) => {
			if (!confirmed) return;

			// Update user's points
			await window.updateUserPoints(
				window.currentUser,
				reward.cost,
				"subtract"
			);

			// Record the purchase
			const { error: purchaseError } = await supabase
				.from("userRewardPurchases")
				.insert([
					{
						userId: window.currentUser,
						rewardId: reward.id,
						purchaseCost: reward.cost,
						purchaseDate: new Date().toISOString(),
						status: purchaseStatus,
					},
				]);

			if (purchaseError) {
				console.error(
					"Error recording reward purchase:",
					purchaseError
				);
				window.showNotification(
					"Failed to record purchase. Points were refunded.",
					"error"
				);
				// Refund points if purchase record fails
				await window.updateUserPoints(
					window.currentUser,
					reward.cost,
					"add"
				);
				return;
			}

			// Update instant spend if it was an instant purchase attempt and didn't require auth
			if (reward.type === "instant" && !requiresAuth) {
				const { error: settingsError } = await supabase
					.from("rewardSystemSettings")
					.upsert(
						{
							id: "system_settings",
							currentInstantSpend: currentSpend + reward.cost,
						},
						{ onConflict: "id", ignoreDuplicates: false } // Only update currentInstantSpend
					);
				if (settingsError) {
					console.error(
						"Error updating instant spend:",
						settingsError
					);
					window.showNotification(
						"Error updating instant spend limit.",
						"warning"
					);
				} else {
					window.rewardSystemSettings.currentInstantSpend =
						currentSpend + reward.cost;
				}
			}

			window.showNotification(
				`"${reward.title}" ${
					requiresAuth
						? "purchase submitted for authorization."
						: "purchased instantly!"
				}`
			);
			await window.fetchRewardsInitial(); // Refresh rewards list
			await window.fetchUserRewardPurchasesInitial(); // Refresh purchase history
			await window.fetchRewardSystemSettingsInitial(); // Refresh settings
		}
	);
};

// NEW: Function to authorize a pending reward purchase (Admin only)
window.authorizePurchase = async function (purchaseId) {
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to authorize purchases",
			"error"
		);
		return;
	}
	const purchase = window.userRewardPurchases.find(
		(p) => p.id === purchaseId
	);
	if (!purchase) return;

	const { error } = await supabase
		.from("userRewardPurchases")
		.update({
			status: "authorized",
			authorizedBy: window.currentUser,
			authorizedAt: new Date().toISOString(),
		})
		.eq("id", purchaseId);

	if (error) {
		console.error("Error authorizing purchase:", error);
		window.showNotification("Failed to authorize purchase.", "error");
	} else {
		window.showNotification(
			`Purchase of "${purchase.rewards.title}" authorized for ${purchase.userId}.`
		);
		await window.fetchUserRewardPurchasesInitial(); // Refresh purchase history
	}
};

// NEW: Function to deny a pending reward purchase (Admin only)
window.denyPurchase = function (purchaseId) {
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to deny purchases",
			"error"
		);
		return;
	}
	const purchase = window.userRewardPurchases.find(
		(p) => p.id === purchaseId
	);
	if (!purchase) return;

	window.showConfirmModal(
		`Are you sure you want to deny the purchase of "${purchase.rewards.title}" by ${purchase.userId}? Points will be refunded.`,
		async (confirmed) => {
			if (!confirmed) return;

			const { error } = await supabase
				.from("userRewardPurchases")
				.update({
					status: "denied",
					authorizedBy: window.currentUser,
					authorizedAt: new Date().toISOString(),
					notes: "Denied by admin.", // Could add input for reason
				})
				.eq("id", purchaseId);

			if (error) {
				console.error("Error denying purchase:", error);
				window.showNotification("Failed to deny purchase.", "error");
			} else {
				// Refund points
				await window.updateUserPoints(
					purchase.userId,
					purchase.purchaseCost,
					"add"
				);
				window.showNotification(
					`Purchase denied. ${purchase.purchaseCost} points refunded to ${purchase.userId}.`,
					"warning"
				);
				await window.fetchUserRewardPurchasesInitial(); // Refresh purchase history
			}
		}
	);
};

// NEW: Function to reset instant purchase limit (Admin only)
window.resetInstantPurchaseLimit = async function () {
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to reset the limit",
			"error"
		);
		return;
	}
	window.showConfirmModal(
		"Are you sure you want to reset the instant purchase spend to 0?",
		async (confirmed) => {
			if (!confirmed) return;
			const { error } = await supabase
				.from("rewardSystemSettings")
				.upsert(
					{
						id: "system_settings",
						currentInstantSpend: 0,
						lastResetAt: new Date().toISOString(),
					},
					{ onConflict: "id" }
				);
			if (error) {
				console.error("Error resetting instant spend:", error);
				window.showNotification(
					"Failed to reset instant purchase limit.",
					"error"
				);
			} else {
				window.showNotification(
					"Instant purchase limit reset successfully!"
				);
				window.rewardSystemSettings.currentInstantSpend = 0;
				window.rewardSystemSettings.lastResetAt =
					new Date().toISOString();
				await window.fetchRewardSystemSettingsInitial(); // Re-fetch to update local state
			}
		}
	);
};

// NEW: Function to update reward system settings (Admin only)
window.updateRewardSystemSettings = async function (
	limit,
	resetDuration,
	requiresAuthAfterLimit
) {
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to update reward settings",
			"error"
		);
		return;
	}
	const { error } = await supabase.from("rewardSystemSettings").upsert(
		{
			id: "system_settings",
			instantPurchaseLimit: limit,
			resetDurationDays: resetDuration,
			requiresAuthorizationAfterLimit: requiresAuthAfterLimit,
			lastUpdatedAt: new Date().toISOString(), // Track last update
		},
		{ onConflict: "id" }
	);
	if (error) {
		console.error("Error updating reward settings:", error);
		window.showNotification("Failed to update reward settings.", "error");
	} else {
		window.showNotification("Reward settings updated successfully!");
		await window.fetchRewardSystemSettingsInitial(); // Re-fetch to update local state and UI
	}
};

// NEW: Check for automatic reward limit reset
window.checkForRewardLimitReset = async function () {
	const settings = window.rewardSystemSettings;
	if (settings.resetDurationDays > 0 && settings.lastResetAt) {
		const lastResetDate = new Date(settings.lastResetAt);
		const nextResetDate = new Date(lastResetDate);
		nextResetDate.setDate(
			lastResetDate.getDate() + settings.resetDurationDays
		);

		if (new Date() >= nextResetDate) {
			console.log("Automatic reward limit reset triggered.");
			await window.resetInstantPurchaseLimit(); // Use the existing reset function
			window.showNotification(
				"Instant purchase limit automatically reset!",
				"info"
			);
		}
	}
};
