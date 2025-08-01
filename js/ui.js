// ui.js
// This file contains core application-level UI logic, such as tab switching and app state management.

// Global FullCalendar instance
window.fullCalendarInstance = null;
// Global object to manage refresh button cooldown states
window.refreshButtonStates = {};

/**
 * Sets up a refresh button with a cooldown period.
 * @param {string} buttonId - The ID of the refresh button element.
 * @param {number} cooldownSeconds - The cooldown duration in seconds.
 */
window.setupRefreshButton = function (buttonId, cooldownSeconds) {
	var button = document.getElementById(buttonId);
	if (!button) {
		console.warn("Refresh button with ID '" + buttonId + "' not found.");
		return;
	}
	if (!window.refreshButtonStates[buttonId]) {
		window.refreshButtonStates[buttonId] = {
			lastClickTime: 0,
			cooldownTimerId: null,
			originalText: button.textContent,
		};
	}
	var state = window.refreshButtonStates[buttonId];
	var updateButtonState = function () {
		var now = Date.now();
		var elapsedTime = now - state.lastClickTime;
		var remainingTime = cooldownSeconds * 1000 - elapsedTime;

		if (remainingTime > 0) {
			button.disabled = true;
			var secondsLeft = Math.ceil(remainingTime / 1000);
			button.textContent = "Refreshing (" + secondsLeft + "s)";
			if (state.cooldownTimerId) {
				clearTimeout(state.cooldownTimerId);
			}
			state.cooldownTimerId = setTimeout(updateButtonState, 1000);
		} else {
			button.disabled = false;
			button.textContent = state.originalText;
			if (state.cooldownTimerId) {
				clearTimeout(state.cooldownTimerId);
				state.cooldownTimerId = null;
			}
		}
	};

	updateButtonState();

	button.onclick = function () {
		var now = Date.now();
		var elapsedTime = now - state.lastClickTime;
		if (elapsedTime < cooldownSeconds * 1000) {
			window.showNotification(
				"Please wait " +
					Math.ceil((cooldownSeconds * 1000 - elapsedTime) / 1000) +
					" seconds before refreshing again.",
				"warning"
			);
			return;
		}
		state.lastClickTime = now;
		button.disabled = true;
		button.textContent = "Refreshing...";
		window.showNotification("Refreshing data...", "info");

		if (window.loadData && typeof window.loadData === "function") {
			window
				.loadData()
				.then(function () {
					window.showNotification(
						"Data refreshed successfully!",
						"success"
					);
					updateButtonState();
				})
				.catch(function (error) {
					console.error("Error refreshing data:", error);
					window.showNotification("Failed to refresh data.", "error");
					updateButtonState();
				});
		} else {
			window.showNotification(
				"Refresh function not available.",
				"warning"
			);
			updateButtonState();
		}
	};
};

/**
 * Switches between different application tabs.
 * @param {string} tabName - The name of the tab to switch to.
 */
window.switchTab = function (tabName) {
	var tabs = document.querySelectorAll(".nav-tab");
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].classList.remove("active");
	}
	var allTabs = Array.from(document.querySelectorAll(".nav-tab"));
	var clickedTab = allTabs.find(function (tab) {
		return (
			tab.textContent.toLowerCase().indexOf(tabName.toLowerCase()) !== -1
		);
	});
	if (clickedTab) {
		clickedTab.classList.add("active");
	}

	var contents = document.querySelectorAll(".tab-content");
	for (var i = 0; i < contents.length; i++) {
		contents[i].classList.remove("active");
	}
	var targetView = document.getElementById(tabName + "View");
	if (targetView) {
		targetView.classList.add("active");
	} else {
		console.warn(`Element with ID '${tabName}View' not found.`);
	}

	window.activeTab = tabName;

	if (tabName === "calendar") {
		window.renderCalendar();
	} else if (
		tabName === "dashboard" &&
		window.hasPermission("view_dashboard")
	) {
		window.renderDashboard();
	} else if (tabName === "suggest") {
		window.renderMySuggestions();
	} else if (tabName === "shop") {
		window.renderRewards();
		window.renderUserRewardPurchases();
	} else if (tabName === "adminSettings") {
		if (
			window.currentUser === "admin" &&
			window.hasPermission("manage_rewards")
		) {
			window.renderAdminRewardManagement();
			window.renderPendingAuthorizations();
			window.renderAdminRewardSettings();
		} else {
			const adminRewardManagement = document.getElementById(
				"adminRewardManagement"
			);
			if (adminRewardManagement)
				adminRewardManagement.style.display = "none";
		}
	}
};

/**
 * Displays the login screen.
 */
window.showLogin = function () {
	document.getElementById("loginScreen").style.display = "block";
	document.getElementById("mainApp").style.display = "none";
};

/**
 * Displays the main application interface.
 */
window.showMainApp = async function () {
	document.getElementById("loginScreen").style.display = "none";
	document.getElementById("mainApp").style.display = "block";
	var user = window.users[window.currentUser];
	document.getElementById("userBadge").textContent = user.displayName;
	var userPointsBadge = document.getElementById("userPoints");
	if (userPointsBadge) {
		userPointsBadge.style.display =
			user.role === "admin" ? "none" : "inline-block";
	}
	window.logUserActivity("login");

	var dashboardTab = document.getElementById("dashboardTab");
	var suggestTab = document.getElementById("suggestTab");
	var shopTab = document.getElementById("shopTab");
	var adminSettingsTab = document.getElementById("adminSettingsTab");
	var adminView = document.getElementById("adminView");
	var userView = document.getElementById("userView");
	var adminRewardManagement = document.getElementById(
		"adminRewardManagement"
	);

	if (window.currentUser === "admin") {
		if (dashboardTab) dashboardTab.style.display = "block";
		if (suggestTab) suggestTab.style.display = "none";
		if (shopTab) shopTab.style.display = "none";
		if (adminSettingsTab)
			adminSettingsTab.style.display = window.hasPermission(
				"manage_rewards"
			)
				? "block"
				: "none";
		if (adminView) adminView.style.display = "block";
		if (userView) userView.style.display = "none";
		if (adminRewardManagement)
			adminRewardManagement.style.display = window.hasPermission(
				"manage_rewards"
			)
				? "block"
				: "none";
	} else {
		if (dashboardTab) dashboardTab.style.display = "none";
		if (suggestTab) suggestTab.style.display = "block";
		if (shopTab) shopTab.style.display = "block";
		if (adminSettingsTab) adminSettingsTab.style.display = "none";
		if (adminView) adminView.style.display = "none";
		if (userView) userView.style.display = "block";
		if (adminRewardManagement) adminRewardManagement.style.display = "none";
	}

	var isRepeatingCheckbox = document.getElementById("isRepeating");
	if (isRepeatingCheckbox) {
		isRepeatingCheckbox.addEventListener("change", function () {
			var repeatOptions = document.getElementById("repeatOptions");
			if (repeatOptions) {
				repeatOptions.style.display = this.checked ? "block" : "none";
			}
		});
	}

	var isDemeritCheckbox = document.getElementById("isDemerit");
	if (isDemeritCheckbox) {
		isDemeritCheckbox.addEventListener("change", function () {
			var demeritWarning = document.getElementById("demeritWarning");
			if (demeritWarning) {
				demeritWarning.style.display = this.checked ? "block" : "none";
			}
			var taskPointsEl = document.getElementById("taskPoints");
			var penaltyPointsEl = document.getElementById("penaltyPoints");
			var taskDueDateEl = document.getElementById("taskDueDate");
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
				if (penaltyPointsEl)
					penaltyPointsEl.closest(".form-group").style.display =
						"block";
			}
		});
	}

	if (window.loadData && typeof window.loadData === "function") {
		await window
			.loadData()
			.then(function () {
				if (
					window.updateUserPoints &&
					typeof window.updateUserPoints === "function"
				) {
					window.updateUserPoints();
				}
				window.renderCalendar();
				if (window.overdueCheckIntervalId) {
					clearInterval(window.overdueCheckIntervalId);
				}
				if (
					window.checkForOverdueTasks &&
					window.OVERDUE_CHECK_INTERVAL
				) {
					window.overdueCheckIntervalId = setInterval(
						window.checkForOverdueTasks,
						window.OVERDUE_CHECK_INTERVAL
					);
				}
				if (
					window.currentUser === "admin" &&
					window.hasPermission("manage_rewards")
				) {
					window.renderAdminRewardManagement();
					window.renderPendingAuthorizations();
					window.renderAdminRewardSettings();
				} else if (window.currentUser !== "admin") {
					window.renderRewards();
					window.renderUserRewardPurchases();
				}
			})
			.catch(function (error) {
				console.error("Error loading data:", error);
				window.showNotification("Failed to load data.", "error");
			});
	} else {
		console.warn("loadData function not available, skipping data loading");
		window.renderCalendar();
	}
};
