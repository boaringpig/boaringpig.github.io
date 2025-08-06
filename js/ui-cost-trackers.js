// ui-cost-trackers.js
// This file contains all the UI rendering functions for cost trackers.

/**
 * Renders active cost trackers for admin view
 */
window.renderActiveCostTrackersAdmin = function () {
	const activeCostTrackersList = document.getElementById(
		"activeCostTrackersList"
	);
	if (!activeCostTrackersList) return;

	if (!window.activeCostTrackers || window.activeCostTrackers.length === 0) {
		activeCostTrackersList.innerHTML =
			'<div class="empty-state">No active cost trackers</div>';
		return;
	}

	const runningTrackers = window.activeCostTrackers.filter(
		(tracker) => tracker.status === "running"
	);

	if (runningTrackers.length === 0) {
		activeCostTrackersList.innerHTML =
			'<div class="empty-state">No currently running cost trackers</div>';
		return;
	}

	activeCostTrackersList.innerHTML = runningTrackers
		.map((tracker) => {
			// Calculate elapsed time
			const startTime = new Date(tracker.started_at);
			const now = new Date();
			const elapsed = now - startTime;
			const hours = Math.floor(elapsed / (1000 * 60 * 60));
			const minutes = Math.floor(
				(elapsed % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
			const timeText = `${hours.toString().padStart(2, "0")}:${minutes
				.toString()
				.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

			// Calculate current cost
			const intervalMs = parseInt(tracker.increment_interval) || 60000;
			const rate = parseFloat(tracker.rate) || 0;
			const fractionalUnits = elapsed / intervalMs;
			const currentCost = fractionalUnits * rate;

			// Parse penalties
			let penalties = [];
			try {
				penalties = JSON.parse(tracker.penalties || "[]");
			} catch (e) {
				console.warn(
					"Error parsing penalties for tracker:",
					tracker.id,
					e
				);
			}

			const penaltyTotal = penalties.reduce(
				(sum, p) => sum + (parseFloat(p.amount) || 0),
				0
			);
			const grandTotal = currentCost + penaltyTotal;

			const penaltiesText =
				penalties.length > 0
					? `<br>Penalties: ${penalties.length} items (+${
							tracker.currency
					  }${penaltyTotal.toFixed(2)})`
					: "";

			return `
			<div class="activity-item cost-tracker-admin-item">
				<div class="activity-action">
					💰 ${window.escapeHtml(tracker.description)} 
					<br><span style="color: var(--terminal-green);">by ${
						window.users[tracker.created_by]
							? window.users[tracker.created_by].displayName
							: tracker.created_by
					}</span>
				</div>
				<div class="cost-tracker-details">
					<div class="cost-tracker-time">⏱️ Running: ${timeText}</div>
					<div class="cost-tracker-cost">💸 Current: ${
						tracker.currency
					}${grandTotal.toFixed(2)}</div>
					<div class="cost-tracker-penalties">${tracker.currency}${rate.toFixed(
				2
			)} per ${getIntervalText(intervalMs)}${penaltiesText}</div>
				</div>
				<div class="cost-tracker-actions">
					<button class="action-btn check-btn" onclick="window.viewLiveCostTracker(${
						tracker.id
					})">View Details</button>
					<button class="action-btn delete-btn" onclick="window.window.handleStopTrackerClick((${
						tracker.id
					})">Stop & Invoice</button>
				</div>
				<div class="activity-time">${window.formatDate(tracker.started_at)}</div>
			</div>
		`;
		})
		.join("");
};

/**
 * Initializes live cost tracker for the current user
 * Enhanced version with better state management
 */
window.initializeLiveCostTracker = function () {
	console.log("Initializing live cost tracker for user:", window.currentUser);

	// Only initialize for regular users, not admin
	if (window.currentUser === "skeen") {
		const liveCostTracker = document.getElementById("liveCostTracker");
		if (liveCostTracker) {
			liveCostTracker.classList.add("hidden");
		}
		// Clear any user-specific state
		window.userManuallyStoppedTracker = false;
		return;
	}

	// Initialize flags if they don't exist
	if (typeof window.userManuallyStoppedTracker === "undefined") {
		window.userManuallyStoppedTracker = false;
	}
	if (typeof window.stoppingTracker === "undefined") {
		window.stoppingTracker = false;
	}

	// Ensure cost tracker data is loaded first
	if (!window.activeCostTrackers) {
		console.log("Cost tracker data not loaded yet, fetching...");
		window
			.fetchActiveCostTrackersInitial()
			.then(() => {
				console.log("Cost tracker data loaded, updating display");
				if (
					!window.userManuallyStoppedTracker &&
					!window.stoppingTracker
				) {
					window.updateLiveCostTracker();
				}
			})
			.catch((err) => {
				console.error("Error fetching cost tracker data:", err);
			});
	} else {
		// Small delay to ensure DOM is ready
		setTimeout(() => {
			if (!window.userManuallyStoppedTracker && !window.stoppingTracker) {
				window.updateLiveCostTracker();
			}
		}, 100);
	}
};

/**
 * Updates the live cost tracker display for users
 * IMPROVED VERSION with better tracking logic and fix for the issue
 */
window.updateLiveCostTracker = function () {
	const liveCostTracker = document.getElementById("liveCostTracker");
	if (!liveCostTracker) {
		console.warn("Live cost tracker element not found");
		return;
	}

	// Only show for regular users, not admin
	if (window.currentUser === "skeen") {
		liveCostTracker.classList.add("hidden");
		window.clearLiveCostTrackerIntervals();
		return;
	}

	// Check if user manually stopped a tracker recently
	if (window.userManuallyStoppedTracker) {
		console.log(
			"User manually stopped tracker recently, not showing new trackers"
		);
		liveCostTracker.classList.add("hidden");
		window.clearLiveCostTrackerIntervals();
		window.currentLiveTracker = null;
		return;
	}

	// Debug logging
	console.log("=== updateLiveCostTracker Debug ===");
	console.log("Current user:", window.currentUser);
	console.log("Active cost trackers:", window.activeCostTrackers);
	console.log("Current live tracker:", window.currentLiveTracker);
	console.log("Manual stop flag:", window.userManuallyStoppedTracker);

	// Check if user has an active tracker
	if (
		!window.activeCostTrackers ||
		!Array.isArray(window.activeCostTrackers)
	) {
		console.log("No active cost trackers array available");
		liveCostTracker.classList.add("hidden");
		window.clearLiveCostTrackerIntervals();
		window.currentLiveTracker = null;
		return;
	}

	// FIX: Check if the current live tracker is still present and running in the database data.
	// This is the core logic to address the popup staying visible after an admin stops it.
	let foundActiveTracker = window.activeCostTrackers.find(
		(t) => t.status === "running"
	);

	// Check if the current live tracker is no longer active
	if (window.currentLiveTracker && !foundActiveTracker) {
		console.log("Current tracker no longer active, clearing display");
		liveCostTracker.classList.add("hidden");
		window.clearLiveCostTrackerIntervals();
		window.currentLiveTracker = null;
		return; // No need to proceed, nothing to show
	}

	// Find a tracker for the current user
	const userTracker = window.activeCostTrackers.find((tracker) => {
		const trackerUser =
			tracker.created_by ||
			tracker.createdBy ||
			tracker.user_id ||
			tracker.userId;
		const assignedTo = tracker.assigned_to || tracker.assignedTo;
		const isRunning = tracker.status === "running";

		// Check if this tracker should be visible to current user:
		const isAssignedTracker = assignedTo === window.currentUser;
		const isAdminTrackerForUser =
			window.currentUser === "schinken" && trackerUser === "skeen";
		const isOwnTracker = trackerUser === window.currentUser;

		const isUserMatch =
			isAssignedTracker || isAdminTrackerForUser || isOwnTracker;

		console.log(`Checking tracker ${tracker.id}:`, {
			trackerUser: trackerUser,
			assignedTo: assignedTo,
			currentUser: window.currentUser,
			isAssignedTracker: isAssignedTracker,
			isAdminTrackerForUser: isAdminTrackerForUser,
			isOwnTracker: isOwnTracker,
			isUserMatch: isUserMatch,
			status: tracker.status,
			isRunning: isRunning,
			overall_match: isUserMatch && isRunning,
		});

		return isUserMatch && isRunning;
	});

	console.log("User tracker found:", userTracker ? "Yes" : "No");

	if (!userTracker) {
		console.log("No active tracker for current user, hiding display");
		liveCostTracker.classList.add("hidden");
		window.clearLiveCostTrackerIntervals();
		window.currentLiveTracker = null;
		return;
	}

	// FIX: Only show if it's a different tracker or no tracker was shown before,
	// or if the tracker's status changed
	const isDifferentOrUpdatedTracker =
		!window.currentLiveTracker ||
		window.currentLiveTracker.id !== userTracker.id ||
		window.currentLiveTracker.status !== userTracker.status;

	if (isDifferentOrUpdatedTracker) {
		console.log("Found new/different or updated tracker, showing display");
		console.log("Previous tracker ID:", window.currentLiveTracker?.id);
		console.log("New tracker ID:", userTracker.id);
		console.log(
			"Status changed:",
			window.currentLiveTracker?.status,
			"->",
			userTracker.status
		);

		// Clear any existing intervals before starting new ones
		window.clearLiveCostTrackerIntervals();

		// Store current live tracker
		window.currentLiveTracker = userTracker;

		// Show the tracker
		liveCostTracker.classList.remove("hidden");

		// Start updating the display
		window.startLiveCostTrackerUpdates(userTracker);
	} else {
		console.log(
			"Same tracker already displayed and status is the same, no change needed"
		);
	}
};

/**
 * Starts the live cost tracker display updates
 */
window.startLiveCostTrackerUpdates = function (tracker) {
	// Clear any existing intervals
	window.clearLiveCostTrackerIntervals();

	console.log("Starting live cost tracker updates for tracker:", tracker.id);

	const updateDisplay = function () {
		const liveCostTime = document.getElementById("liveCostTime");
		const liveCostAmount = document.getElementById("liveCostAmount");
		const liveCostRate = document.getElementById("liveCostRate");
		const liveCostPenalties = document.getElementById("liveCostPenalties");

		if (
			!liveCostTime ||
			!liveCostAmount ||
			!liveCostRate ||
			!liveCostPenalties
		) {
			console.warn("Live cost tracker elements not found in DOM");
			return;
		}

		try {
			// Calculate elapsed time
			const startTime = new Date(tracker.started_at);
			const now = new Date();
			const elapsed = Math.max(0, now - startTime); // Ensure positive elapsed time
			const hours = Math.floor(elapsed / (1000 * 60 * 60));
			const minutes = Math.floor(
				(elapsed % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

			// Update time display
			const timeText = `${hours.toString().padStart(2, "0")}:${minutes
				.toString()
				.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
			liveCostTime.textContent = timeText;

			// Calculate current cost
			const intervalMs = parseInt(tracker.increment_interval) || 60000;
			const rate = parseFloat(tracker.rate) || 0;
			const fractionalUnits = elapsed / intervalMs;
			const currentCost = Math.max(0, fractionalUnits * rate);

			// Parse penalties
			let penalties = [];
			try {
				penalties = JSON.parse(tracker.penalties || "[]");
			} catch (e) {
				console.warn(
					"Error parsing penalties for tracker",
					tracker.id,
					":",
					e
				);
				penalties = [];
			}

			const penaltyTotal = penalties.reduce((sum, p) => {
				const amount = parseFloat(p.amount);
				return sum + (isNaN(amount) ? 0 : amount);
			}, 0);

			const grandTotal = currentCost + penaltyTotal;

			// Update displays
			liveCostAmount.textContent = `${
				tracker.currency || "€"
			}${grandTotal.toFixed(2)}`;
			liveCostRate.textContent = `${
				tracker.currency || "€"
			}${rate.toFixed(2)} per ${getIntervalText(intervalMs)}`;

			// Update penalties display
			if (penalties.length > 0) {
				liveCostPenalties.style.display = "block";
				liveCostPenalties.innerHTML = penalties
					.map((penalty) => {
						const amount = parseFloat(penalty.amount) || 0;
						return `<div class="live-tracker-penalty">${window.escapeHtml(
							penalty.description || "Unknown"
						)}: ${tracker.currency || "€"}${amount.toFixed(
							2
						)}</div>`;
					})
					.join("");
			} else {
				liveCostPenalties.style.display = "none";
				liveCostPenalties.innerHTML = "";
			}

			console.log(
				"Updated live tracker display - Time:",
				timeText,
				"Cost:",
				grandTotal.toFixed(2)
			);
		} catch (error) {
			console.error("Error updating live cost tracker display:", error);
		}
	};

	// Update immediately
	updateDisplay();

	// Set up intervals for continuous updates
	window.liveCostTrackerInterval = setInterval(updateDisplay, 1000); // Update every second

	window.liveCostTrackerUpdateInterval = setInterval(async () => {
		try {
			// Refresh data from server every 30 seconds (reduced frequency)
			console.log("Refreshing cost tracker data from server...");
			await window.fetchActiveCostTrackersInitial();

			// Check if tracker is still running
			const updatedTracker =
				window.activeCostTrackers &&
				window.activeCostTrackers.find(
					(t) => t.id === tracker.id && t.status === "running"
				);

			if (updatedTracker) {
				// Update the tracker reference for next update
				Object.assign(tracker, updatedTracker);
				window.currentLiveTracker = updatedTracker;
				console.log("Tracker still running, updated data");
			} else {
				// Tracker was stopped, refresh display (will hide if no active tracker)
				console.log("Tracker no longer active, refreshing display");
				window.updateLiveCostTracker();
			}
		} catch (error) {
			console.error("Error refreshing cost tracker data:", error);
		}
	}, 30000); // Every 30 seconds
};

/**
 * Clears live cost tracker update intervals
 * Enhanced version with better logging
 */
window.clearLiveCostTrackerIntervals = function () {
	console.log("=== Clearing Live Cost Tracker Intervals ===");

	if (window.liveCostTrackerInterval) {
		console.log("Clearing liveCostTrackerInterval");
		clearInterval(window.liveCostTrackerInterval);
		window.liveCostTrackerInterval = null;
	}

	if (window.liveCostTrackerUpdateInterval) {
		console.log("Clearing liveCostTrackerUpdateInterval");
		clearInterval(window.liveCostTrackerUpdateInterval);
		window.liveCostTrackerUpdateInterval = null;
	}

	// Clear any other cost tracker intervals
	if (window.costTrackerDisplayInterval) {
		console.log("Clearing costTrackerDisplayInterval");
		clearInterval(window.costTrackerDisplayInterval);
		window.costTrackerDisplayInterval = null;
	}

	console.log("All cost tracker intervals cleared");
};

/**
 * Updates the active cost trackers count on dashboard
 */
window.updateActiveCostTrackersCount = function () {
	const countElement = document.getElementById("activeCostTrackersCount");
	if (!countElement) return;

	const runningCount = window.activeCostTrackers
		? window.activeCostTrackers.filter(
				(tracker) => tracker.status === "running"
		  ).length
		: 0;

	countElement.textContent = runningCount;
};

/**
 * Enhanced dismiss function that sets the manual stop flag
 */
window.dismissLiveCostTracker = function () {
	console.log("Dismissing live cost tracker display (manual user action)");
	const liveCostTracker = document.getElementById("liveCostTracker");
	if (liveCostTracker) {
		liveCostTracker.classList.add("hidden");
	}

	// Set flag to prevent auto-showing other trackers
	window.userManuallyStoppedTracker = true;
	setTimeout(() => {
		// Clear the flag after 10 seconds to allow showing new trackers
		window.userManuallyStoppedTracker = false;
		console.log("Manual stop flag cleared, allowing new trackers");
	}, 10000);

	// Don't stop the actual tracker, just hide the display
	window.clearLiveCostTrackerIntervals();
	// Keep currentLiveTracker for reference but stop updates
};

/**
 * Forces a refresh of the live cost tracker display
 * Can be called from console for debugging
 */
window.refreshLiveCostTracker = function () {
	console.log("=== Manual Live Cost Tracker Refresh ===");
	window.updateLiveCostTracker();
};

/**
 * Function to force show tracker (for testing)
 */
window.forceShowLiveCostTracker = function () {
	console.log("Force showing live cost tracker (clearing manual stop flag)");
	window.userManuallyStoppedTracker = false;
	window.updateLiveCostTracker();
};

/**
 * Enhanced stopLiveCostTrackerAdmin with proper state clearing
 */
window.stopLiveCostTrackerAdmin = async function (trackerId) {
	console.log("=== Admin Stop Tracker Called ===");
	console.log("Tracker ID:", trackerId);
	console.log("Current user:", window.currentUser);

	if (!window.hasPermission("create_task")) {
		window.showNotification(
			"You do not have permission to stop cost trackers",
			"error"
		);
		return;
	}

	try {
		// Set flag to prevent auto-restart during stop process
		window.stoppingTracker = true;

		console.log("Setting manual stop flag to prevent restart");
		window.userManuallyStoppedTracker = true;

		console.log("Calling stopLiveCostTracker with trackerId:", trackerId);
		await window.stopLiveCostTracker(trackerId, true);

		// Clear local state immediately to prevent conflicts
		if (
			window.currentLiveTracker &&
			window.currentLiveTracker.id === trackerId
		) {
			console.log("Clearing currentLiveTracker for stopped tracker");
			window.currentLiveTracker = null;
		}

		if (window.activeLiveTrackerId === trackerId) {
			console.log("Clearing activeLiveTrackerId for stopped tracker");
			window.activeLiveTrackerId = null;
		}

		window.showNotification(
			"Cost tracker stopped and invoice created!",
			"success"
		);

		// Force refresh of cost tracker data
		console.log("Forcing data refresh...");
		await window.fetchActiveCostTrackersInitial();

		// Clear the stopping flag
		window.stoppingTracker = false;

		// Reset manual stop flag after a delay to allow new trackers
		setTimeout(() => {
			console.log("Clearing manual stop flag after admin stop");
			window.userManuallyStoppedTracker = false;
		}, 3000);
	} catch (error) {
		console.error("Error stopping cost tracker:", error);
		window.showNotification(
			`Failed to stop cost tracker: ${error.message}`,
			"error"
		);

		// Clear flags on error too
		window.stoppingTracker = false;
		window.userManuallyStoppedTracker = false;
	}
};

/**
 * Universal function to stop any active cost tracker (works for admin)
 * Can be called from anywhere with a tracker ID
 */
window.forceStopCostTracker = async function (trackerId) {
	console.log("Force stopping cost tracker:", trackerId);

	if (!trackerId) {
		// Try to find any running tracker
		const runningTracker = window.activeCostTrackers?.find(
			(t) => t.status === "running"
		);
		if (runningTracker) {
			trackerId = runningTracker.id;
			console.log("Found running tracker to stop:", trackerId);
		} else {
			console.error(
				"No tracker ID provided and no running trackers found"
			);
			window.showNotification("No active tracker to stop", "error");
			return;
		}
	}

	// Check if stopLiveCostTracker function exists
	if (typeof window.stopLiveCostTracker !== "function") {
		console.error("stopLiveCostTracker function not found");
		window.showNotification("Stop function not available", "error");
		return;
	}

	try {
		console.log("Attempting to stop tracker with ID:", trackerId);
		const result = await window.stopLiveCostTracker(trackerId, true);
		console.log("Stop result:", result);

		window.showNotification(
			"Cost tracker stopped successfully!",
			"success"
		);

		// Clear local state
		window.currentLiveTracker = null;
		window.clearLiveCostTrackerIntervals();

		// Force refresh data and UI
		await window.fetchActiveCostTrackersInitial();

		if (window.currentUser === "schinken") {
			// Update user display
			window.updateLiveCostTracker();
		} else if (window.currentUser === "skeen") {
			// Update admin display
			window.renderActiveCostTrackersAdmin();
			window.updateActiveCostTrackersCount();
		}
	} catch (error) {
		console.error("Error in forceStopCostTracker:", error);
		window.showNotification(
			`Failed to stop tracker: ${error.message || error}`,
			"error"
		);
	}
};

/**
 * View live cost tracker details (for admin)
 */
window.viewLiveCostTracker = function (trackerId) {
	const tracker = window.activeCostTrackers.find((t) => t.id === trackerId);
	if (!tracker) {
		window.showNotification("Tracker not found", "error");
		return;
	}

	// Calculate current totals
	const startTime = new Date(tracker.started_at);
	const now = new Date();
	const elapsed = now - startTime;
	const hours = Math.floor(elapsed / (1000 * 60 * 60));
	const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
	const timeText = `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

	const intervalMs = parseInt(tracker.increment_interval) || 60000;
	const rate = parseFloat(tracker.rate) || 0;
	const fractionalUnits = elapsed / intervalMs;
	const currentCost = fractionalUnits * rate;

	let penalties = [];
	try {
		penalties = JSON.parse(tracker.penalties || "[]");
	} catch (e) {
		console.warn("Error parsing penalties:", e);
	}

	const penaltyTotal = penalties.reduce(
		(sum, p) => sum + (parseFloat(p.amount) || 0),
		0
	);
	const grandTotal = currentCost + penaltyTotal;

	let modalContent = `
		<h3>💰 Live Cost Tracker Details</h3>
		<p><strong>Description:</strong> ${window.escapeHtml(tracker.description)}</p>
		<p><strong>Started by:</strong> ${
			window.users[tracker.created_by]?.displayName || tracker.created_by
		}</p>
		<p><strong>Running time:</strong> ${timeText}</p>
		<p><strong>Rate:</strong> ${tracker.currency}${rate.toFixed(
		2
	)} per ${getIntervalText(intervalMs)}</p>
		<p><strong>Time-based cost:</strong> ${tracker.currency}${currentCost.toFixed(
		2
	)}</p>
		<p><strong>Started:</strong> ${window.formatDate(tracker.started_at)}</p>
	`;

	if (penalties.length > 0) {
		modalContent += `<hr><h4>Additional Costs/Penalties:</h4><div class="penalties-list">`;
		penalties.forEach((penalty) => {
			modalContent += `<div class="penalty-display-item">
				<div class="penalty-info">
					<strong>${window.escapeHtml(penalty.description)}</strong><br>
					<span>${tracker.currency}${parseFloat(penalty.amount).toFixed(2)}</span><br>
					<small>Added: ${window.formatDate(penalty.added_at)}</small>
				</div>
			</div>`;
		});
		modalContent += `</div><p><strong>Penalty total:</strong> ${
			tracker.currency
		}${penaltyTotal.toFixed(2)}</p>`;
	}

	modalContent += `
		<hr>
		<h3 style="color: #ff6b6b;">Total Amount: <strong>${
			tracker.currency
		}${grandTotal.toFixed(2)}</strong></h3>
		<p><em>This will be the invoice amount when the tracker is stopped.</em></p>
	`;

	window.showModal(modalContent);
};

/**
 * Function to completely reset cost tracker state (for debugging)
 */
window.resetCostTrackerState = function () {
	console.log("=== Resetting Cost Tracker State ===");

	// Clear all intervals
	window.clearLiveCostTrackerIntervals();

	// Clear state variables
	window.currentLiveTracker = null;
	window.activeLiveTrackerId = null;
	window.userManuallyStoppedTracker = false;
	window.stoppingTracker = false;

	// Hide display
	const liveCostTracker = document.getElementById("liveCostTracker");
	if (liveCostTracker) {
		liveCostTracker.classList.add("hidden");
	}

	console.log("Cost tracker state reset complete");
};

/**
 * Enhanced debugging function for the restart issue
 */
window.debugTrackerRestart = function () {
	console.log("=== TRACKER RESTART DEBUG ===");
	console.log("Current user:", window.currentUser);
	console.log(
		"userManuallyStoppedTracker:",
		window.userManuallyStoppedTracker
	);
	console.log("stoppingTracker:", window.stoppingTracker);
	console.log("currentLiveTracker:", window.currentLiveTracker);
	console.log("activeLiveTrackerId:", window.activeLiveTrackerId);
	console.log("activeCostTrackers array:", window.activeCostTrackers);

	// Check for running trackers
	const runningTrackers =
		window.activeCostTrackers?.filter((t) => t.status === "running") || [];
	console.log("Running trackers:", runningTrackers);

	// Check live display
	const liveCostTracker = document.getElementById("liveCostTracker");
	console.log(
		"Live tracker element hidden:",
		liveCostTracker ? liveCostTracker.classList.contains("hidden") : "N/A"
	);

	// Check intervals
	console.log("Active intervals:", {
		liveCostTrackerInterval: !!window.liveCostTrackerInterval,
		liveCostTrackerUpdateInterval: !!window.liveCostTrackerUpdateInterval,
		costTrackerDisplayInterval: !!window.costTrackerDisplayInterval,
	});
};

/**
 * Debug function to show current cost tracker state
 */
window.debugCostTracker = function () {
	console.log("=== Cost Tracker Debug Info ===");
	console.log("Current user:", window.currentUser);
	console.log("Active cost trackers:", window.activeCostTrackers);
	console.log("Current live tracker:", window.currentLiveTracker);
	console.log("liveCostTrackerInterval:", window.liveCostTrackerInterval);
	console.log(
		"liveCostTrackerUpdateInterval:",
		window.liveCostTrackerUpdateInterval
	);

	const liveCostTracker = document.getElementById("liveCostTracker");
	console.log("Live tracker element exists:", !!liveCostTracker);
	console.log(
		"Live tracker element hidden:",
		liveCostTracker ? liveCostTracker.classList.contains("hidden") : "N/A"
	);

	// Check available stop functions
	console.log("=== Available Functions ===");
	console.log("stopLiveCostTracker:", typeof window.stopLiveCostTracker);
	console.log(
		"stopLiveCostTrackerAdmin:",
		typeof window.stopLiveCostTrackerAdmin
	);
	console.log("forceStopCostTracker:", typeof window.forceStopCostTracker);
	console.log(
		"stopAllActiveCostTrackers:",
		typeof window.stopAllActiveCostTrackers
	);
};

/**
 * Test function to try stopping the current tracker
 */
window.testStopTracker = async function () {
	console.log("=== Testing Stop Tracker ===");

	// Method 1: Try with currentLiveTracker
	if (window.currentLiveTracker) {
		console.log(
			"Attempting to stop using currentLiveTracker:",
			window.currentLiveTracker.id
		);
		try {
			await window.forceStopCostTracker(window.currentLiveTracker.id);
			return;
		} catch (error) {
			console.error("Method 1 failed:", error);
		}
	}

	// Method 2: Find any running tracker
	const runningTracker = window.activeCostTrackers?.find(
		(t) => t.status === "running"
	);
	if (runningTracker) {
		console.log(
			"Attempting to stop found running tracker:",
			runningTracker.id
		);
		try {
			await window.forceStopCostTracker(runningTracker.id);
			return;
		} catch (error) {
			console.error("Method 2 failed:", error);
		}
	}

	console.log("No trackers found to stop");
};

/**
 * Helper function to convert interval to readable text
 */
function getIntervalText(intervalMs) {
	switch (intervalMs) {
		case 1000:
			return "second";
		case 60000:
			return "minute";
		case 3600000:
			return "hour";
		default:
			return "unit";
	}
}

console.log("=== UI Cost Trackers Functions Loaded ===");
console.log("Enhanced cost tracker functions with restart prevention");
console.log("Available debugging functions:");
console.log("- window.debugTrackerRestart()");
console.log("- window.debugCostTracker()");
console.log("- window.resetCostTrackerState()");
console.log("- window.forceShowLiveCostTracker()");
console.log("- window.testStopTracker()");
