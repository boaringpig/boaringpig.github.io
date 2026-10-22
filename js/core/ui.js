// ui.js
// Bootstraps the app after login/auto-login: loads this group's terminology
// and data, then hands off to the React beta dashboard (the only UI now --
// see js/beta-bridge/beta-toggle.js).

// Global object to manage refresh button cooldown states. setupRefreshButton
// itself is still called by js/tasks/ui-tasks.js's classic render functions
// (which run as a side effect of loadData(), even with no classic view
// markup left to render into -- see that file's own null-checks). Remove
// this once ui-tasks.js is deleted.
window.refreshButtonStates = {};

/**
 * Sets up a refresh button with a cooldown period.
 * @param {string} buttonId - The ID of the refresh button element.
 * @param {number} cooldownSeconds - The cooldown duration in seconds.
 */
window.setupRefreshButton = function (buttonId, cooldownSeconds) {
	var button = document.getElementById(buttonId);
	if (!button) {
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
			return;
		}
		state.lastClickTime = now;
		button.disabled = true;
		button.textContent = "Refreshing...";

		if (window.loadData && typeof window.loadData === "function") {
			window
				.loadData()
				.then(function () {
					updateButtonState();
				})
				.catch(function () {
					updateButtonState();
				});
		}
	};
};

/**
 * Displays the login screen.
 */
window.showLogin = function () {
	document.getElementById("loginScreen").style.display = "block";
};

/**
 * Runs once right after a successful login/auto-login: loads this group's
 * terminology/theme and data, starts the periodic overdue-task check, then
 * mounts the React beta dashboard.
 */
window.showMainApp = async function () {
	document.getElementById("loginScreen").style.display = "none";
	window.logUserActivity("login");

	if (window.loadGroupTerms) {
		await window.loadGroupTerms();
	}

	if (window.maybeAutoEnterBetaMode) {
		await window.maybeAutoEnterBetaMode();
	}

	if (window.loadData && typeof window.loadData === "function") {
		await window
			.loadData()
			.then(function () {
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
			})
			.catch(function (error) {
				console.error("Error loading data:", error);
				window.showNotification("Failed to load data.", "error");
			});
	} else {
		console.warn("loadData function not available, skipping data loading");
	}
};
