// database.rewards.js
// This file contains all the database-related functions for rewards.

/**
 * NEW: Function to add a new reward (Admin only)
 */
window.addReward = async function (title, description, cost, type) {
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to add rewards",
			"error"
		);
		return;
	}
	const { error } = await window.supabase.from("rewards").insert([
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

/**
 * NEW: Function to update an existing reward (Admin only)
 */
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
	const { error } = await window.supabase
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

/**
 * NEW: Function to delete a reward (Admin only)
 */
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
			const { error } = await window.supabase
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

/**
 * NEW: Function to purchase a reward (User only)
 */
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
	let purchaseStatus = "purchased";
	let requiresAuth = false;
	const settings = window.rewardSystemSettings;
	const currentSpend = settings.currentInstantSpend || 0;
	const limit = settings.instantPurchaseLimit || 0;
	const requiresAuthAfterLimit =
		settings.requiresAuthorizationAfterLimit !== false;

	if (reward.type === "instant") {
		if (requiresAuthAfterLimit && currentSpend + reward.cost > limit) {
			requiresAuth = true;
			purchaseStatus = "pending_authorization";
		}
	} else {
		requiresAuth = true;
		purchaseStatus = "pending_authorization";
	}

	window.showConfirmModal(
		`Are you sure you want to purchase "${reward.title}" for ${reward.cost} points?` +
			(requiresAuth
				? " This purchase will require admin authorization."
				: ""),
		async (confirmed) => {
			if (!confirmed) return;
			await window.updateUserPoints(
				window.currentUser,
				reward.cost,
				"subtract"
			);
			const { error: purchaseError } = await window.supabase
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
				await window.updateUserPoints(
					window.currentUser,
					reward.cost,
					"add"
				);
				return;
			}
			if (reward.type === "instant" && !requiresAuth) {
				const { error: settingsError } = await window.supabase
					.from("rewardSystemSettings")
					.upsert(
						{
							id: "system_settings",
							currentInstantSpend: currentSpend + reward.cost,
						},
						{ onConflict: "id", ignoreDuplicates: false }
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
			await window.fetchRewardsInitial();
			await window.fetchUserRewardPurchasesInitial();
			await window.fetchRewardSystemSettingsInitial();
		}
	);
};

/**
 * NEW: Function to authorize a pending reward purchase (Admin only)
 */
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

	const { error } = await window.supabase
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
		await window.fetchUserRewardPurchasesInitial();
	}
};

/**
 * NEW: Function to deny a pending reward purchase (Admin only)
 */
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
			const { error } = await window.supabase
				.from("userRewardPurchases")
				.update({
					status: "denied",
					authorizedBy: window.currentUser,
					authorizedAt: new Date().toISOString(),
					notes: "Denied by admin.",
				})
				.eq("id", purchaseId);
			if (error) {
				console.error("Error denying purchase:", error);
				window.showNotification("Failed to deny purchase.", "error");
			} else {
				await window.updateUserPoints(
					purchase.userId,
					purchase.purchaseCost,
					"add"
				);
				window.showNotification(
					`Purchase denied. ${purchase.purchaseCost} points refunded to ${purchase.userId}.`,
					"warning"
				);
				await window.fetchUserRewardPurchasesInitial();
			}
		}
	);
};

/**
 * NEW: Function to reset instant purchase limit (Admin only)
 */
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
			const { error } = await window.supabase
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
				await window.fetchRewardSystemSettingsInitial();
			}
		}
	);
};

/**
 * NEW: Function to update reward system settings (Admin only)
 */
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
	const { error } = await window.supabase.from("rewardSystemSettings").upsert(
		{
			id: "system_settings",
			instantPurchaseLimit: limit,
			resetDurationDays: resetDuration,
			requiresAuthorizationAfterLimit: requiresAuthAfterLimit,
			lastUpdatedAt: new Date().toISOString(),
		},
		{ onConflict: "id" }
	);
	if (error) {
		console.error("Error updating reward settings:", error);
		window.showNotification("Failed to update reward settings.", "error");
	} else {
		window.showNotification("Reward settings updated successfully!");
		await window.fetchRewardSystemSettingsInitial();
	}
};

/**
 * NEW: Check for automatic reward limit reset
 */
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
			await window.resetInstantPurchaseLimit();
			window.showNotification(
				"Instant purchase limit automatically reset!",
				"info"
			);
		}
	}
};

/**
 * NEW: Function to fetch all rewards
 */
window.fetchRewardsInitial = async function () {
	const { data, error } = await window.supabase.from("rewards").select("*");
	if (error) {
		console.error("Error fetching rewards:", error);
		window.showError("Failed to load rewards.");
	} else {
		window.rewards = data.sort((a, b) => a.title.localeCompare(b.title));
		if (window.activeTab === "shop" || window.currentUser === "skeen") {
			window.renderRewards();
			if (window.currentUser === "skeen") {
				window.renderAdminRewardManagement();
			}
		}
	}
};

/**
 * NEW: Function to fetch user's reward purchases
 */
window.fetchUserRewardPurchasesInitial = async function () {
	const query =
		window.currentUser === "skeen"
			? window.supabase
					.from("userRewardPurchases")
					.select("*, rewards(title, cost, type)")
					.order("purchaseDate", { ascending: false })
			: window.supabase
					.from("userRewardPurchases")
					.select("*, rewards(title, cost, type)")
					.eq("userId", window.currentUser)
					.order("purchaseDate", { ascending: false });
	const { data, error } = await query;

	if (error) {
		console.error("Error fetching user reward purchases:", error);
		window.showError("Failed to load purchase history.");
	} else {
		window.userRewardPurchases = data;
		if (window.activeTab === "shop" || window.currentUser === "skeen") {
			window.renderUserRewardPurchases();
			if (window.currentUser === "skeen") {
				window.renderPendingAuthorizations();
			}
		}
	}
};

/**
 * NEW: Function to fetch reward system settings
 */
window.fetchRewardSystemSettingsInitial = async function () {
	const { data, error } = await window.supabase
		.from("rewardSystemSettings")
		.select("*")
		.eq("id", "system_settings")
		.limit(1);
	if (error) {
		console.error("Error fetching reward system settings:", error);
		window.rewardSystemSettings = {
			id: "system_settings",
			instantPurchaseLimit: 500,
			currentInstantSpend: 0,
			resetDurationDays: 30,
			lastResetAt: new Date().toISOString(),
			requiresAuthorizationAfterLimit: true,
		};
		await window.supabase
			.from("rewardSystemSettings")
			.upsert([window.rewardSystemSettings], { onConflict: "id" });
	} else if (data && data.length > 0) {
		window.rewardSystemSettings = data[0];
		window.checkForRewardLimitReset();
	} else {
		window.rewardSystemSettings = {
			id: "system_settings",
			instantPurchaseLimit: 500,
			currentInstantSpend: 0,
			resetDurationDays: 30,
			lastResetAt: new Date().toISOString(),
			requiresAuthorizationAfterLimit: true,
		};
		await window.supabase
			.from("rewardSystemSettings")
			.upsert([window.rewardSystemSettings], { onConflict: "id" });
	}
	if (
		window.currentUser === "skeen" &&
		(window.activeTab === "dashboard" ||
			window.activeTab === "adminSettings")
	) {
		window.renderDashboard();
		window.renderAdminRewardSettings();
	}
};
