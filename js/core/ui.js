// ui.js
// Bootstraps the app after login/auto-login: loads this group's terminology
// and data, then hands off to the React beta dashboard (the only UI now --
// see js/beta-bridge/beta-toggle.js).

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
