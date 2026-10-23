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
		if (window.unsubscribe.activeCostTrackers)
			supabase.removeChannel(window.unsubscribe.activeCostTrackers);
		if (window.unsubscribe.chatMessages)
			supabase.removeChannel(window.unsubscribe.chatMessages);
		if (window.unsubscribe.invites)
			supabase.removeChannel(window.unsubscribe.invites);
		if (window.unsubscribe.motdMessages)
			supabase.removeChannel(window.unsubscribe.motdMessages);
		if (window.unsubscribe.motdState)
			supabase.removeChannel(window.unsubscribe.motdState);

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
	await window.fetchActiveCostTrackersInitial();
	await window.fetchChatMessagesInitial();
	await window.fetchInvitesInitial();
	await window.fetchMotdInitial();

	// --- Real-time Listeners ---
	// Set up real-time subscriptions for immediate UI updates on data changes.

	const tasksChannel = supabase
		.channel("tasks_channel")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "tasks",
				filter: "master_username=eq." + window.activeMasterContext,
			},
			(payload) => {
				try {
					console.log("Task change received!", payload);
					if (payload.eventType === "INSERT") {
						if (!window.tasks.some((t) => t.id === payload.new.id)) {
							window.tasks.unshift(payload.new);
						}
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
			{
				event: "*",
				schema: "public",
				table: "suggestions",
				filter: "master_username=eq." + window.activeMasterContext,
			},
			(payload) => {
				try {
					console.log("Suggestion change received!", payload);
					if (payload.eventType === "INSERT") {
						if (!window.suggestions.some((s) => s.id === payload.new.id)) {
							window.suggestions.unshift(payload.new);
						}
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
			{
				event: "*",
				schema: "public",
				table: "userActivity",
				filter: "master_username=eq." + window.activeMasterContext,
			},
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
			{
				event: "*",
				schema: "public",
				table: "userProfiles",
				filter: "master_username=eq." + window.activeMasterContext,
			},
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
			{
				event: "*",
				schema: "public",
				table: "rewards",
				filter: "master_username=eq." + window.activeMasterContext,
			},
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
			}
		)
		.subscribe();

	const userRewardPurchasesChannel = supabase
		.channel("user_reward_purchases_channel")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "userRewardPurchases",
				filter: "master_username=eq." + window.activeMasterContext,
			},
			async (payload) => {
				console.log("User reward purchase change received!", payload);
				await window.fetchUserRewardPurchasesInitial();
			}
		)
		.subscribe();

	const rewardSystemSettingsChannel = supabase
		.channel("reward_system_settings_channel")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "rewardSystemSettings",
				filter: "master_username=eq." + window.activeMasterContext,
			},
			async (payload) => {
				console.log("Reward system settings change received!", payload);
				if (
					payload.eventType === "UPDATE" ||
					payload.eventType === "INSERT"
				) {
					window.rewardSystemSettings = payload.new;
					window.checkForRewardLimitReset();
				}
			}
		)
		.subscribe();

	// Classic's live-cost-tracker floating banner (#liveCostTracker) is gone
	// -- beta's TrackerCard/LiveTrackerPill own their own refresh (see
	// useCostTrackers.js's reload-after-every-mutation fix) and don't read
	// window.activeCostTrackers at all. This listener now just keeps that
	// classic-side cache in sync for anything still reading it; the
	// previous version also added an artificial 5-second delay before
	// refreshing and manipulated the now-deleted banner DOM, both removed.
	const activeCostTrackersChannel = supabase
		.channel("active_cost_trackers_channel")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "active_cost_trackers",
				filter: "master_username=eq." + window.activeMasterContext,
			},
			async (payload) => {
				await window.fetchActiveCostTrackersInitial();
			}
		)
		.subscribe();

	const chatMessagesChannel = supabase
		.channel("chat_channel")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "chat_messages",
				filter: "master_username=eq." + window.activeMasterContext,
			},
			(payload) => {
				if (payload.eventType === "INSERT") {
					if (!window.chatMessages.some((m) => m.id === payload.new.id)) {
						window.chatMessages.push(payload.new);
						window.chatMessages.sort(
							(a, b) => new Date(a.created_at) - new Date(b.created_at)
						);
						if (window.activeTab === "chat" && window.renderChatMessages) {
							window.renderChatMessages();
						}
					}
				}
			}
		)
		.subscribe();

	const invitesChannel = supabase
		.channel("invites_channel")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "invites",
				filter: "master_username=eq." + window.activeMasterContext,
			},
			async (payload) => {
				await window.fetchInvitesInitial();
				if (window.isMaster() && window.renderInvitesList) {
					window.renderInvitesList();
				}
			}
		)
		.subscribe();

	const motdMessagesChannel = supabase
		.channel("motd_messages_channel")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "motd_messages",
				filter: "master_username=eq." + window.activeMasterContext,
			},
			async (payload) => {
				await window.fetchMotdInitial();
				if (window.renderMotdBanner) window.renderMotdBanner();
				if (window.isMaster() && window.renderMotdManageList) {
					window.renderMotdManageList();
				}
			}
		)
		.subscribe();

	const motdStateChannel = supabase
		.channel("motd_state_channel")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "motd_state",
				filter: "master_username=eq." + window.activeMasterContext,
			},
			async (payload) => {
				if (
					payload.eventType === "UPDATE" ||
					payload.eventType === "INSERT"
				) {
					window.motdState = {
						currentIndex: payload.new.current_index,
						lastAdvancedAt: payload.new.last_advanced_at,
					};
					window.checkForMotdAdvance();
					if (window.renderMotdBanner) window.renderMotdBanner();
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
		activeCostTrackers: activeCostTrackersChannel,
		chatMessages: chatMessagesChannel,
		invites: invitesChannel,
		motdMessages: motdMessagesChannel,
		motdState: motdStateChannel,
	};

	window.checkForRewardLimitReset();
	window.checkForMotdAdvance();
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
			window.users[task.assignedTo] && window.users[task.assignedTo].role === "slave"
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
