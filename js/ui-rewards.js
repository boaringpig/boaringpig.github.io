// ui.rewards.js
// This file contains all the UI rendering and interaction functions for rewards.

window.renderRewards = function () {
	const rewardsListContainer = document.getElementById("rewardsList");
	if (!rewardsListContainer) return;

	if (window.rewards.length === 0) {
		rewardsListContainer.innerHTML =
			'<div class="empty-state">No rewards available.</div>';
	} else {
		rewardsListContainer.innerHTML = window.rewards
			.map(
				(reward) => `
            <div class="reward-card">
                <h3>${window.escapeHtml(reward.title)}</h3>
                <p class="description">${window.escapeHtml(
					reward.description
				)}</p>
                <div class="cost-badge">${reward.cost} Points</div>
                <div class="type-badge type-${reward.type}">${
					reward.type === "instant"
						? "Instant Purchase"
						: "Authorization Required"
				}</div>
                ${
					window.currentUser !== "skeen"
						? `<button class="purchase-btn" onclick="window.purchaseReward(${reward.id})">Purchase</button>`
						: ""
				}
            </div>
        `
			)
			.join("");
	}
};

window.renderUserRewardPurchases = function () {
	const myPurchasesContainer = document.getElementById("myRewardPurchases");
	const pendingAuthorizationsContainer = document.getElementById(
		"pendingAuthorizations"
	);
	if (myPurchasesContainer) {
		const userPurchases = window.userRewardPurchases.filter(
			(p) => p.userId === window.currentUser
		);
		if (userPurchases.length === 0) {
			myPurchasesContainer.innerHTML =
				'<div class="empty-state">No purchases yet.</div>';
		} else {
			myPurchasesContainer.innerHTML = userPurchases
				.map(
					(purchase) => `
                <div class="purchase-item status-${purchase.status}">
                    <div class="purchase-content">
                        <h4>${window.escapeHtml(
							purchase.rewards.title || "Unknown Reward"
						)}</h4>
                        <p>Cost: ${purchase.purchaseCost} Points</p>
                        <p>Status: <span class="status-badge ${window.getPurchaseStatusClass(
							purchase.status
						)}">${purchase.status.replace(/_/g, " ")}</span></p>
                        <p>Date: ${window.formatDate(purchase.purchaseDate)}</p>
                        ${
							purchase.status === "denied" && purchase.notes
								? `<p class="notes">Reason: ${window.escapeHtml(
										purchase.notes
								  )}</p>`
								: ""
						}
                    </div>
                </div>
            `
				)
				.join("");
		}
	}
	if (window.currentUser === "skeen" && pendingAuthorizationsContainer) {
		window.renderPendingAuthorizations();
	}
};

window.renderAdminRewardManagement = function () {
	const currentRewardsList = document.getElementById("currentRewardsList");
	const rewardCreationForm = document.querySelector(".reward-creation-form");
	if (!currentRewardsList || !rewardCreationForm) return;
	if (!window.hasPermission("manage_rewards")) {
		rewardCreationForm.style.display = "none";
		currentRewardsList.closest(".task-section").style.display = "none";
		return;
	} else {
		rewardCreationForm.style.display = "block";
		currentRewardsList.closest(".task-section").style.display = "block";
	}
	if (window.rewards.length === 0) {
		currentRewardsList.innerHTML =
			'<div class="empty-state">No rewards defined.</div>';
	} else {
		currentRewardsList.innerHTML = window.rewards
			.map(
				(reward) => `
            <div class="task-item">
                <div class="task-content">
                    <div>
                        <span class="status-badge type-${reward.type}">${
					reward.type === "instant" ? "Instant" : "Authorized"
				}</span>
                        <span class="task-text">${window.escapeHtml(
							reward.title
						)}</span>
                        <span class="points-badge-small">${
							reward.cost
						} pts</span>
                        <div class="task-meta">
                            ${window.escapeHtml(reward.description)}
                            <br>Created: ${window.formatDate(
								reward.createdAt
							)} by ${
					window.users[reward.createdBy]?.displayName ||
					reward.createdBy
				}
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="action-btn check-btn" onclick="window.editReward(${
							reward.id
						})">Edit</button>
                        <button class="action-btn delete-btn" onclick="window.deleteReward(${
							reward.id
						})">Delete</button>
                    </div>
                </div>
            </div>
        `
			)
			.join("");
	}
};

window.renderAdminRewardSettings = function () {
	const instantLimitInput = document.getElementById("instantLimitInput");
	const resetDurationInput = document.getElementById("resetDurationInput");
	const requiresAuthAfterLimitCheckbox = document.getElementById(
		"requiresAuthAfterLimit"
	);
	const currentInstantSpendDisplay = document.getElementById(
		"currentInstantSpendDisplay"
	);
	const instantLimitDisplay = document.getElementById("instantLimitDisplay");
	const lastResetDateDisplay = document.getElementById(
		"lastResetDateDisplay"
	);
	const settingsSection = document.querySelector(
		"#adminSettingsView .task-section:nth-child(3)"
	);
	if (!settingsSection) return;
	if (!window.hasPermission("manage_rewards")) {
		settingsSection.style.display = "none";
		return;
	} else {
		settingsSection.style.display = "block";
	}
	const settings = window.rewardSystemSettings;
	if (instantLimitInput)
		instantLimitInput.value = settings.instantPurchaseLimit || 0;
	if (resetDurationInput)
		resetDurationInput.value = settings.resetDurationDays || 0;
	if (requiresAuthAfterLimitCheckbox)
		requiresAuthAfterLimitCheckbox.checked =
			settings.requiresAuthorizationAfterLimit !== false;
	if (currentInstantSpendDisplay)
		currentInstantSpendDisplay.textContent =
			settings.currentInstantSpend || 0;
	if (instantLimitDisplay)
		instantLimitDisplay.textContent = settings.instantPurchaseLimit || 0;
	if (lastResetDateDisplay)
		lastResetDateDisplay.textContent = settings.lastResetAt
			? window.formatDate(settings.lastResetAt)
			: "N/A";
};

window.updateRewardSettingsUI = function () {
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to update reward settings",
			"error"
		);
		return;
	}
	const instantLimit = parseInt(
		document.getElementById("instantLimitInput").value
	);
	const resetDuration = parseInt(
		document.getElementById("resetDurationInput").value
	);
	const requiresAuth = document.getElementById(
		"requiresAuthAfterLimit"
	).checked;
	if (isNaN(instantLimit) || instantLimit < 0) {
		window.showNotification(
			"Instant purchase limit must be a non-negative number.",
			"error"
		);
		return;
	}
	if (isNaN(resetDuration) || resetDuration < 0) {
		window.showNotification(
			"Reset duration must be a non-negative number of days.",
			"error"
		);
		return;
	}
	window.updateRewardSystemSettings(
		instantLimit,
		resetDuration,
		requiresAuth
	);
};

window.editReward = function (rewardId) {
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to edit rewards",
			"error"
		);
		return;
	}
	const reward = window.rewards.find((r) => r.id === rewardId);
	if (!reward) return;
	document.getElementById("rewardIdToEdit").value = reward.id;
	document.getElementById("rewardTitle").value = reward.title;
	document.getElementById("rewardDescription").value = reward.description;
	document.getElementById("rewardCost").value = reward.cost;
	document.getElementById("rewardType").value = reward.type;
	document.getElementById("saveRewardBtn").textContent = "Update Reward";
	document.getElementById("cancelEditRewardBtn").style.display =
		"inline-block";
};

window.cancelEditReward = function () {
	document.getElementById("rewardIdToEdit").value = "";
	document.getElementById("rewardTitle").value = "";
	document.getElementById("rewardDescription").value = "";
	document.getElementById("rewardCost").value = "10";
	document.getElementById("rewardType").value = "instant";
	document.getElementById("saveRewardBtn").textContent = "Add Reward";
	document.getElementById("cancelEditRewardBtn").style.display = "none";
};

window.saveReward = function () {
	if (!window.hasPermission("manage_rewards")) {
		window.showNotification(
			"You do not have permission to save rewards",
			"error"
		);
		return;
	}
	const rewardId = document.getElementById("rewardIdToEdit").value;
	const title = document.getElementById("rewardTitle").value.trim();
	const description = document
		.getElementById("rewardDescription")
		.value.trim();
	const cost = parseInt(document.getElementById("rewardCost").value);
	const type = document.getElementById("rewardType").value;
	if (!title || isNaN(cost) || cost < 1) {
		window.showNotification(
			"Please enter a valid title and cost for the reward.",
			"error"
		);
		return;
	}
	if (rewardId) {
		window.updateReward(parseInt(rewardId), title, description, cost, type);
	} else {
		window.addReward(title, description, cost, type);
	}
	window.cancelEditReward();
};

window.getPurchaseStatusClass = function (status) {
	switch (status) {
		case "purchased":
		case "authorized":
			return "status-completed";
		case "pending_authorization":
			return "status-pending";
		case "denied":
			return "status-overdue";
		default:
			return "status-pending";
	}
};

window.renderPendingAuthorizations = function () {
	const pendingAuthorizationsContainer = document.getElementById(
		"pendingAuthorizations"
	);
	if (!pendingAuthorizationsContainer) return;
	const pendingAuthsSection = document.querySelector(
		"#adminSettingsView .task-section:nth-child(4)"
	);
	if (!window.hasPermission("manage_rewards")) {
		if (pendingAuthsSection) pendingAuthsSection.style.display = "none";
		return;
	} else {
		if (pendingAuthsSection) pendingAuthsSection.style.display = "block";
	}
	const pendingAuths = window.userRewardPurchases.filter(
		(p) => p.status === "pending_authorization"
	);
	if (pendingAuths.length === 0) {
		pendingAuthorizationsContainer.innerHTML =
			'<div class="empty-state">No pending authorizations.</div>';
	} else {
		pendingAuthorizationsContainer.innerHTML = pendingAuths
			.map(
				(purchase) => `
            <div class="purchase-item pending-approval">
                <div class="purchase-content">
                    <h4>${window.escapeHtml(
						purchase.rewards.title || "Unknown Reward"
					)} by ${
					window.users[purchase.userId]?.displayName ||
					purchase.userId
				}</h4>
                    <p>Cost: ${purchase.purchaseCost} Points</p>
                    <p>Requested: ${window.formatDate(
						purchase.purchaseDate
					)}</p>
                </div>
                <div class="purchase-actions">
                    <button class="action-btn approve-btn" onclick="window.authorizePurchase(${
						purchase.id
					})">Authorize</button>
                    <button class="action-btn reject-btn" onclick="window.denyPurchase(${
						purchase.id
					})">Deny</button>
                </div>
            </div>
        `
			)
			.join("");
	}
};
