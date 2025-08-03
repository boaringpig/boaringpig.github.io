// database.js
// This file encapsulates the core Supabase database interactions.

// Global Supabase client instance
let supabase = null;

// Global unsubscribe object to hold Supabase channel subscriptions
let unsubscribe = {};

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
		if (window.unsubscribe.rewards)
			supabase.removeChannel(window.unsubscribe.rewards);
		if (window.unsubscribe.userRewardPurchases)
			supabase.removeChannel(window.unsubscribe.userRewardPurchases);
		if (window.unsubscribe.rewardSystemSettings)
			supabase.removeChannel(window.unsubscribe.rewardSystemSettings);

		window.unsubscribe = {}; // Clear the unsubscribe object
	}

	// --- Load Metadata Counters and ensure they are up-to-date with max IDs ---
	try {
		window.taskIdCounter = Math.max(
			await window.fetchCounter("taskIdCounter"),
			await window.fetchMaxId("tasks")
		);
		window.suggestionIdCounter = Math.max(
			await window.fetchCounter("suggestionIdCounter"),
			await window.fetchMaxId("suggestions")
		);

		await window.upsertCounter("taskIdCounter", window.taskIdCounter);
		await window.upsertCounter(
			"suggestionIdCounter",
			window.suggestionIdCounter
		);
	} catch (error) {
		console.error("Error during metadata and ID initialization:", error);
	}

	// --- Initial Data Fetch (one-time) ---
	await window.fetchTasksInitial();
	await window.fetchSuggestionsInitial();
	await window.fetchUserActivityInitial();
	await window.fetchUserProfilesInitial();
	await window.fetchRewardsInitial();
	await window.fetchUserRewardPurchasesInitial();
	await window.fetchRewardSystemSettingsInitial();

	// --- Real-time Listeners ---
	// Set up real-time subscriptions for immediate UI updates on data changes.

	const tasksChannel = supabase
		.channel("tasks_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "tasks" },
			(payload) => {
				try {
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
		.subscribe();

	const suggestionsChannel = supabase
		.channel("suggestions_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "suggestions" },
			(payload) => {
				try {
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

					// Re-render the correct UI based on the current user and tab
					if (window.currentUser === "skeen") {
						window.renderTasks(); // This will call renderAdminView and then renderAdminSuggestions
					} else {
						window.renderSuggestions(); // This is for 'schinken's' view
					}
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

	const activityChannel = supabase
		.channel("activity_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "userActivity" },
			(payload) => {
				try {
					console.log("Activity change received!", payload);
					if (payload.eventType === "INSERT") {
						window.userActivityLog.unshift(payload.new);
						if (window.userActivityLog.length > 50) {
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

	const userProfilesChannel = supabase
		.channel("user_profiles_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "userProfiles" },
			(payload) => {
				try {
					console.log("User profile change received!", payload);
					if (
						payload.eventType === "INSERT" ||
						payload.eventType === "UPDATE"
					) {
						const profileData = payload.new;
						const username = profileData.username;
						if (window.users[username]) {
							window.users[username].points =
								profileData.points || 0;
						}
					}
					window.updateUserPoints();
					window.renderUserProgress();
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
					window.currentUser === "skeen"
				) {
					window.renderRewards();
					if (window.currentUser === "skeen") {
						window.renderAdminRewardManagement();
					}
				}
			}
		)
		.subscribe();

	const userRewardPurchasesChannel = supabase
		.channel("user_reward_purchases_channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "userRewardPurchases" },
			async (payload) => {
				console.log("User reward purchase change received!", payload);
				await window.fetchUserRewardPurchasesInitial();
				if (
					window.currentUser === "skeen" ||
					window.activeTab === "shop"
				) {
					window.renderUserRewardPurchases();
					window.renderPendingAuthorizations();
				}
			}
		)
		.subscribe();

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
					window.checkForRewardLimitReset();
					if (
						window.currentUser === "skeen" &&
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

	window.unsubscribe = {
		tasks: tasksChannel,
		suggestions: suggestionsChannel,
		activity: activityChannel,
		userProfiles: userProfilesChannel,
		rewards: rewardsChannel,
		userRewardPurchases: userRewardPurchasesChannel,
		rewardSystemSettings: rewardSystemSettingsChannel,
	};

	window.checkForRewardLimitReset();
};

/**
 * Fetches the maximum ID from a given table to ensure unique client-side IDs.
 * @param {string} tableName - The name of the table.
 * @returns {Promise<number>} The maximum ID + 1, or 1 if the table is empty.
 */
window.fetchMaxId = async function (tableName) {
	const { data, error } = await supabase
		.from(tableName)
		.select("id")
		.order("id", { ascending: false })
		.limit(1);

	if (error) {
		console.error(`Error fetching max ID for ${tableName}:`, error);
		return 1;
	}
	return data && data.length > 0 && data[0].id ? data[0].id + 1 : 1;
};

/**
 * Fetches a counter value from the metadata table.
 */
window.fetchCounter = async function (counterName) {
	const { data, error } = await supabase
		.from("metadata")
		.select(counterName)
		.eq("id", "counters")
		.limit(1);

	if (error || !data || data.length === 0) {
		console.error(`Error fetching counter ${counterName}:`, error);
		return 1;
	}
	return data[0][counterName] || 1;
};

/**
 * Upserts a counter value to the metadata table.
 */
window.upsertCounter = async function (counterName, value) {
	const updateObject = { id: "counters" };
	updateObject[counterName] = value;
	const { error } = await supabase
		.from("metadata")
		.upsert(updateObject, { onConflict: "id" });

	if (error) {
		console.error("Error updating metadata counters:", error);
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
			task.assignedTo === "schinken"
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
