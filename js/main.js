// main.js
// This is the main entry point for the application, consolidating logic.

// Global application state variables
// These are declared here, and other files access them via the window object.
const users = {
	skeen: {
		role: "skeen",
		displayName: "Sir",
		permissions: [
			"create_task",
			"approve_task",
			"delete_task",
			"view_all_tasks",
			"manage_users", // For admin points control
			"view_dashboard",
			"approve_suggestions",
			"manage_rewards", // Admin can manage rewards
		],
		points: 0, // Admin points should always remain 0 and not be tracked
	},
	schinken: {
		role: "schinken",
		displayName: "Pig",
		permissions: ["check_task", "view_assigned_tasks", "suggest_task"],
		points: 0,
	},
};
let currentUser = null;
let tasks = [];
let suggestions = [];
let userActivityLog = [];
// Global variables for reward data
let rewards = [];
let userRewardPurchases = [];
let rewardSystemSettings = {};
// Global variables for cost tracker data
let activeCostTrackers = [];
let liveCostTrackerInterval = null;
let liveCostTrackerUpdateInterval = null;
let activeLiveTrackerId = null;
let currentLiveTracker = null;

// Counters for client-side ID generation (REMOVED FOR TASKS/SUGGESTIONS - Supabase will handle)
// taskIdCounter and suggestionIdCounter are no longer managed client-side for inserts.
// They will still be initialized from metadata for consistency, but not incremented for new items.
let taskIdCounter = 1; // Will be initialized from DB max ID, but not used for new inserts
let suggestionIdCounter = 1; // Will be initialized from DB max ID, but not used for new inserts

// Interval ID for overdue task checks
let overdueCheckIntervalId = null;
const OVERDUE_CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes (in milliseconds)

// Active tab state
let activeTab = "tasks";

// Make global variables accessible via window object for inter-file communication
window.users = users;
window.currentUser = currentUser;
window.tasks = tasks;
window.suggestions = suggestions;
window.userActivityLog = userActivityLog;
// Expose reward data globally
window.rewards = rewards;
window.userRewardPurchases = userRewardPurchases;
window.rewardSystemSettings = rewardSystemSettings;
// Expose cost tracker data globally
window.activeCostTrackers = activeCostTrackers;
window.liveCostTrackerInterval = liveCostTrackerInterval;
window.liveCostTrackerUpdateInterval = liveCostTrackerUpdateInterval;
window.activeLiveTrackerId = activeLiveTrackerId;
window.currentLiveTracker = currentLiveTracker;

window.taskIdCounter = taskIdCounter; // Still exposed, but its role changes
window.suggestionIdCounter = suggestionIdCounter; // Still exposed, but its role changes
window.overdueCheckIntervalId = overdueCheckIntervalId;
window.OVERDUE_CHECK_INTERVAL = OVERDUE_CHECK_INTERVAL;
window.activeTab = activeTab;

/**
 * Initializes Flatpickr on the date input fields.
 */
function initializeDatePickers() {
	flatpickr("#taskDueDate", {
		enableTime: true,
		dateFormat: "Y-m-dTH:i",
		time_24hr: true,
		minuteIncrement: 1,
		placeholder: "Select a date and time...",
		// Theming
		appendTo: document.getElementById("taskDueDate").parentElement,
	});

	flatpickr("#suggestedDueDate", {
		enableTime: true,
		dateFormat: "Y-m-dTH:i",
		time_24hr: true,
		minuteIncrement: 1,
		placeholder: "Select a date and time...",
		// Theming
		appendTo: document.getElementById("suggestedDueDate").parentElement,
	});
}

// Initialize Supabase client and attempt auto-login on page load
window.addEventListener("load", function () {
	// Initialize Supabase client first
	// This function is defined in database.js
	window.initializeSupabaseClient(
		window.supabaseConfig.supabaseUrl,
		window.supabaseConfig.supabaseAnonKey
	);
	// Then attempt auto-login
	// This function is defined in auth.js
	window.attemptAutoLogin();
});

// Event listeners for UI elements, consolidated here
document.addEventListener("DOMContentLoaded", function () {
	const loginForm = document.getElementById("loginForm");
	if (loginForm) {
		// handleLogin is defined in auth.js
		loginForm.addEventListener("submit", window.handleLogin);
	}

	const suggestForm = document.getElementById("suggestForm");
	if (suggestForm) {
		// Prevent default form submission and then call the suggestion handler
		suggestForm.addEventListener("submit", function (e) {
			e.preventDefault(); // Prevent the default form submission (page reload)
			window.submitTaskSuggestion(); // Call the function to handle the suggestion
		});
	}

	// Listener for repeating task checkbox
	const isRepeatingCheckbox = document.getElementById("isRepeating");
	if (isRepeatingCheckbox) {
		isRepeatingCheckbox.addEventListener("change", function () {
			const repeatOptions = document.getElementById("repeatOptions");
			if (repeatOptions) {
				repeatOptions.style.display = this.checked ? "block" : "none";
			}
		});
	}

	// Listener for demerit task checkbox
	const isDemeritCheckbox = document.getElementById("isDemerit");
	if (isDemeritCheckbox) {
		isDemeritCheckbox.addEventListener("change", function () {
			const demeritWarning = document.getElementById("demeritWarning");
			if (demeritWarning) {
				demeritWarning.style.display = this.checked ? "block" : "none";
			}
			const taskPointsEl = document.getElementById("taskPoints");
			const penaltyPointsEl = document.getElementById("penaltyPoints");
			const taskDueDateEl = document.getElementById("taskDueDate");

			// Adjust visibility of form fields based on demerit checkbox
			if (this.checked) {
				if (taskPointsEl)
					taskPointsEl.closest(".form-group").style.display = "none";
				if (taskDueDateEl)
					taskDueDateEl.closest(".form-group").style.display = "none";
				// Ensure penalty points are visible for demerit tasks
				if (penaltyPointsEl)
					penaltyPointsEl.closest(".form-group").style.display =
						"block";
			} else {
				// Show all fields for regular tasks
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

	// Event listeners for reward management form buttons
	const saveRewardBtn = document.getElementById("saveRewardBtn");
	if (saveRewardBtn) {
		saveRewardBtn.addEventListener("click", window.saveReward);
	}
	const cancelEditRewardBtn = document.getElementById("cancelEditRewardBtn");
	if (cancelEditRewardBtn) {
		cancelEditRewardBtn.addEventListener("click", window.cancelEditReward);
	}

	// Initialize the Flatpickr date pickers
	initializeDatePickers();
});

// Global helper function for permission checks (defined in main.js, exposed globally)
window.hasPermission = function (permission) {
	const user = window.users[window.currentUser];
	return user && user.permissions.includes(permission);
};

/**
 * BULLETPROOF STOP TRACKER FUNCTION
 * This replaces ALL the complex stop logic with a simple, reliable approach
 * Add this to your JavaScript and call it from the button click
 */

window.bulletproofStopTracker = async function (trackerId) {
	console.log("🔴 BULLETPROOF STOP TRACKER STARTING");
	console.log("Tracker ID:", trackerId);
	console.log("Current user:", window.currentUser);

	// Step 1: Verify we have a valid tracker ID
	if (!trackerId) {
		console.error("❌ No tracker ID provided");
		alert("Error: No tracker ID provided");
		return;
	}

	// Step 2: Check if Supabase is available
	if (!window.supabase) {
		console.error("❌ Supabase not available");
		alert("Error: Database connection not available");
		return;
	}

	console.log("✅ Initial checks passed");

	try {
		// Step 3: Verify tracker exists and is running
		console.log("🔍 Checking if tracker exists...");
		const { data: existingTracker, error: fetchError } =
			await window.supabase
				.from("active_cost_trackers")
				.select("*")
				.eq("id", trackerId)
				.single();

		console.log("Fetch result:", {
			data: existingTracker,
			error: fetchError,
		});

		if (fetchError) {
			console.error("❌ Failed to fetch tracker:", fetchError);
			alert(`Error finding tracker: ${fetchError.message}`);
			return;
		}

		if (!existingTracker) {
			console.error("❌ Tracker not found");
			alert("Error: Tracker not found in database");
			return;
		}

		console.log("✅ Tracker found:", existingTracker);
		console.log("Current status:", existingTracker.status);

		// Step 4: Update tracker to stopped status
		console.log("🛑 Stopping tracker...");
		const { data: updateData, error: updateError } = await window.supabase
			.from("active_cost_trackers")
			.update({
				status: "stopped",
				updated_at: new Date().toISOString(),
			})
			.eq("id", trackerId)
			.select(); // Important: select the updated data to verify

		console.log("Update result:", { data: updateData, error: updateError });

		if (updateError) {
			console.error("❌ Failed to update tracker:", updateError);
			alert(`Error stopping tracker: ${updateError.message}`);
			return;
		}

		if (!updateData || updateData.length === 0) {
			console.error("❌ Update returned no data");
			alert("Error: Update failed - no data returned");
			return;
		}

		console.log("✅ Tracker successfully stopped");
		console.log("Updated tracker:", updateData[0]);

		// Step 5: Verify the update actually worked
		console.log("🔍 Verifying update...");
		const { data: verifyTracker, error: verifyError } =
			await window.supabase
				.from("active_cost_trackers")
				.select("status")
				.eq("id", trackerId)
				.single();

		console.log("Verify result:", {
			data: verifyTracker,
			error: verifyError,
		});

		if (verifyError) {
			console.error("❌ Failed to verify update:", verifyError);
			alert("Warning: Could not verify tracker was stopped");
		} else if (verifyTracker.status !== "stopped") {
			console.error("❌ Tracker status is still:", verifyTracker.status);
			alert(
				`Error: Tracker status is still "${verifyTracker.status}" instead of "stopped"`
			);
			return;
		} else {
			console.log("✅ Update verified - tracker status is 'stopped'");
		}

		// Step 6: Clear local state immediately
		console.log("🧹 Clearing local state...");
		window.currentLiveTracker = null;
		window.activeLiveTrackerId = null;

		// Clear from local array
		if (window.activeCostTrackers) {
			window.activeCostTrackers = window.activeCostTrackers.filter(
				(t) => t.id !== trackerId
			);
			console.log("Removed tracker from local array");
		}

		// Clear intervals
		if (window.clearLiveCostTrackerIntervals) {
			window.clearLiveCostTrackerIntervals();
		}

		// Hide live tracker display
		const liveCostTracker = document.getElementById("liveCostTracker");
		if (liveCostTracker) {
			liveCostTracker.classList.add("hidden");
			console.log("Hidden live tracker display");
		}

		// Step 7: Update UI immediately
		console.log("🔄 Updating UI...");

		// Update admin view
		if (window.renderActiveCostTrackersAdmin) {
			window.renderActiveCostTrackersAdmin();
		}
		if (window.updateActiveCostTrackersCount) {
			window.updateActiveCostTrackersCount();
		}

		// Update user view
		if (window.currentUser === "schinken" && window.updateLiveCostTracker) {
			// Set flag to prevent showing other trackers
			window.userManuallyStoppedTracker = true;
			setTimeout(() => {
				window.userManuallyStoppedTracker = false;
			}, 5000);
		}

		console.log("✅ BULLETPROOF STOP COMPLETED SUCCESSFULLY");
		alert("✅ Tracker stopped successfully!");

		// Step 8: Create invoice (simplified)
		if (window.showNotification) {
			window.showNotification(
				"Tracker stopped! Create invoice manually if needed.",
				"success"
			);
		}
	} catch (error) {
		console.error("💥 BULLETPROOF STOP FAILED:", error);
		alert(`Critical error: ${error.message}`);
	}
};

/**
 * SIMPLE BUTTON CLICK HANDLER
 * Replace the onclick in your HTML with this
 */
window.handleStopTrackerClick = async function (trackerId) {
	console.log("🔵 Stop tracker button clicked for ID:", trackerId);

	// Show confirmation
	if (!confirm("Are you sure you want to stop this tracker?")) {
		console.log("❌ User cancelled");
		return;
	}

	// Call bulletproof stop
	await window.bulletproofStopTracker(trackerId);
};

/**
 * EMERGENCY STOP ALL FUNCTION
 * Use this if you need to stop everything immediately
 */
window.emergencyStopAll = async function () {
	console.log("🚨 EMERGENCY STOP ALL TRACKERS");

	if (
		!confirm(
			"EMERGENCY STOP: This will stop ALL running trackers. Are you sure?"
		)
	) {
		return;
	}

	try {
		// Get all running trackers
		const { data: runningTrackers, error: fetchError } =
			await window.supabase
				.from("active_cost_trackers")
				.select("id, description")
				.eq("status", "running");

		if (fetchError) {
			console.error("Failed to fetch running trackers:", fetchError);
			alert("Failed to fetch running trackers");
			return;
		}

		console.log("Found running trackers:", runningTrackers);

		if (!runningTrackers || runningTrackers.length === 0) {
			alert("No running trackers found");
			return;
		}

		// Stop all running trackers
		const { error: stopError } = await window.supabase
			.from("active_cost_trackers")
			.update({
				status: "stopped",
				updated_at: new Date().toISOString(),
				notes: "Emergency stop - admin intervention",
			})
			.eq("status", "running");

		if (stopError) {
			console.error("Failed to stop trackers:", stopError);
			alert("Failed to stop trackers");
			return;
		}

		// Clear all local state
		window.currentLiveTracker = null;
		window.activeLiveTrackerId = null;
		window.activeCostTrackers = [];

		// Hide UI
		const liveCostTracker = document.getElementById("liveCostTracker");
		if (liveCostTracker) {
			liveCostTracker.classList.add("hidden");
		}

		// Clear intervals
		if (window.clearLiveCostTrackerIntervals) {
			window.clearLiveCostTrackerIntervals();
		}

		// Update UI
		if (window.renderActiveCostTrackersAdmin) {
			window.renderActiveCostTrackersAdmin();
		}
		if (window.updateActiveCostTrackersCount) {
			window.updateActiveCostTrackersCount();
		}

		console.log(
			`✅ Successfully stopped ${runningTrackers.length} tracker(s)`
		);
		alert(
			`✅ Emergency stop completed! Stopped ${runningTrackers.length} tracker(s)`
		);
	} catch (error) {
		console.error("Emergency stop failed:", error);
		alert(`Emergency stop failed: ${error.message}`);
	}
};

console.log("🔧 BULLETPROOF TRACKER FUNCTIONS LOADED");
console.log("Available functions:");
console.log("- window.bulletproofStopTracker(trackerId)");
console.log("- window.handleStopTrackerClick(trackerId)");
console.log("- window.emergencyStopAll()");
console.log("");
console.log("TO USE: Replace your button onclick with:");
console.log('onclick="window.handleStopTrackerClick(' + "TRACKER_ID" + ')"');

/**
 * RACE CONDITION FIXES
 * These fix the issue where the real-time listener gets stale data
 */

// FIX 1: Enhanced bulletproof stop with immediate local state update
window.bulletproofStopTrackerV2 = async function (trackerId) {
	console.log("🔴 BULLETPROOF STOP V2 - RACE CONDITION AWARE");
	console.log("Tracker ID:", trackerId);

	if (!trackerId || !window.supabase) {
		alert("Error: Invalid tracker ID or no database connection");
		return;
	}

	try {
		// Step 1: Update local state IMMEDIATELY (before database)
		console.log(
			"⚡ IMMEDIATELY updating local state to prevent race condition"
		);

		// Remove from local array right away
		if (window.activeCostTrackers) {
			window.activeCostTrackers = window.activeCostTrackers.filter(
				(t) => t.id !== trackerId
			);
			console.log("✅ Removed tracker from local array immediately");
		}

		// Clear current tracker if it matches
		if (
			window.currentLiveTracker &&
			window.currentLiveTracker.id === trackerId
		) {
			window.currentLiveTracker = null;
			console.log("✅ Cleared currentLiveTracker immediately");
		}

		// Clear active tracker ID
		if (window.activeLiveTrackerId === trackerId) {
			window.activeLiveTrackerId = null;
			console.log("✅ Cleared activeLiveTrackerId immediately");
		}

		// Hide UI immediately
		const liveCostTracker = document.getElementById("liveCostTracker");
		if (liveCostTracker) {
			liveCostTracker.classList.add("hidden");
			console.log("✅ Hidden live tracker display immediately");
		}

		// Clear intervals immediately
		if (window.clearLiveCostTrackerIntervals) {
			window.clearLiveCostTrackerIntervals();
			console.log("✅ Cleared intervals immediately");
		}

		// Update UI immediately
		if (window.renderActiveCostTrackersAdmin) {
			window.renderActiveCostTrackersAdmin();
			console.log("✅ Updated admin UI immediately");
		}
		if (window.updateActiveCostTrackersCount) {
			window.updateActiveCostTrackersCount();
			console.log("✅ Updated tracker count immediately");
		}

		// Step 2: Now update the database (async, won't block UI)
		console.log("💾 Now updating database...");
		const { data: updateData, error: updateError } = await window.supabase
			.from("active_cost_trackers")
			.update({
				status: "stopped",
				updated_at: new Date().toISOString(),
			})
			.eq("id", trackerId)
			.select();

		if (updateError) {
			console.error("❌ Database update failed:", updateError);
			alert(`Database update failed: ${updateError.message}`);

			// Rollback local state if database update failed
			await window.fetchActiveCostTrackersInitial();
			return;
		}

		console.log("✅ Database updated successfully:", updateData);

		// Step 3: Set flag to prevent real-time listener interference
		window.ignoreNextRealTimeUpdate = true;
		setTimeout(() => {
			window.ignoreNextRealTimeUpdate = false;
		}, 2000);

		console.log("✅ BULLETPROOF STOP V2 COMPLETED - NO RACE CONDITION");
		alert("✅ Tracker stopped successfully!");
	} catch (error) {
		console.error("💥 BULLETPROOF STOP V2 FAILED:", error);
		alert(`Critical error: ${error.message}`);

		// Rollback local state on error
		await window.fetchActiveCostTrackersInitial();
	}
};

// FIX 2: Enhanced real-time listener that prevents race conditions
const enhancedRealTimeListener = `
// REPLACE the existing activeCostTrackersChannel listener in database.js with this:

const activeCostTrackersChannel = supabase
    .channel("active_cost_trackers_channel")
    .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "active_cost_trackers" },
        async (payload) => {
            console.log("🔔 Real-time update received:", payload);
            
            // RACE CONDITION FIX: Check if we should ignore this update
            if (window.ignoreNextRealTimeUpdate) {
                console.log("⏭️ Ignoring real-time update due to recent manual action");
                return;
            }
            
            // RACE CONDITION FIX: Add delay to ensure database transaction completed
            console.log("⏳ Waiting 500ms to avoid race condition...");
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Now fetch data (should have the correct, committed data)
            console.log("📱 Fetching updated data after delay...");
            await window.fetchActiveCostTrackersInitial();

            // Handle specific events
            if (payload.eventType === "UPDATE" && payload.new.status === "stopped") {
                console.log("🛑 Tracker stopped via real-time update:", payload.new.id);
                
                const stoppedTrackerId = payload.new.id;
                
                // Clear specific tracker from local state
                if (window.currentLiveTracker && window.currentLiveTracker.id === stoppedTrackerId) {
                    console.log("🧹 Clearing stopped tracker from local state");
                    window.currentLiveTracker = null;
                    window.clearLiveCostTrackerIntervals();
                    
                    const liveCostTracker = document.getElementById("liveCostTracker");
                    if (liveCostTracker) {
                        liveCostTracker.classList.add("hidden");
                    }
                }
            }

            // Update UI based on user role
            if (window.currentUser === "skeen") {
                window.renderActiveCostTrackersAdmin();
                window.updateActiveCostTrackersCount();
            } else if (window.currentUser === "schinken") {
                // Don't automatically show new trackers if user recently stopped one
                if (!window.userManuallyStoppedTracker) {
                    setTimeout(() => {
                        window.updateLiveCostTracker();
                    }, 100);
                }
            }
        }
    )
    .subscribe();
`;

// FIX 3: Enhanced fetch function with retry logic
window.fetchActiveCostTrackersWithRetry = async function (retryCount = 0) {
	const maxRetries = 3;
	const delay = 200; // ms

	try {
		const { data, error } = await window.supabase
			.from("active_cost_trackers")
			.select("*")
			.eq("status", "running");

		if (error) {
			throw error;
		}

		window.activeCostTrackers = data.sort(
			(a, b) => new Date(b.started_at) - new Date(a.started_at)
		);

		// Update UI based on current user
		if (window.currentUser === "skeen") {
			window.renderActiveCostTrackersAdmin();
			window.updateActiveCostTrackersCount();
		} else if (window.currentUser === "schinken") {
			window.updateLiveCostTracker();
		}

		// console.log(`\✅ Fetched \${data.length} active cost trackers\`);
	} catch (error) {
		console.error("❌ Error fetching cost trackers:", error);

		if (retryCount < maxRetries) {
			// console.log(\`🔄 Retrying fetch (\${retryCount + 1}/\${maxRetries}) in \${delay}ms...\`);
			setTimeout(() => {
				window.fetchActiveCostTrackersWithRetry(retryCount + 1);
			}, delay * (retryCount + 1)); // Exponential backoff
		} else {
			window.showError(
				"Failed to load active cost trackers after retries."
			);
		}
	}
};

// FIX 4: Simple button handler using the race-condition-aware stop function
window.handleStopTrackerClickV2 = async function (trackerId) {
	console.log("🔵 Stop tracker button clicked (V2) for ID:", trackerId);

	if (!confirm("Are you sure you want to stop this tracker?")) {
		console.log("❌ User cancelled");
		return;
	}

	// Set manual stop flag to prevent auto-restart
	window.userManuallyStoppedTracker = true;
	setTimeout(() => {
		window.userManuallyStoppedTracker = false;
	}, 5000);

	// Call race-condition-aware stop
	await window.bulletproofStopTrackerV2(trackerId);
};

console.log("🏁 RACE CONDITION FIXES LOADED");
console.log("New functions available:");
console.log("- window.bulletproofStopTrackerV2(trackerId)");
console.log("- window.handleStopTrackerClickV2(trackerId)");
console.log("- window.fetchActiveCostTrackersWithRetry()");
console.log("");
console.log("🧪 TO TEST: window.bulletproofStopTrackerV2(TRACKER_ID)");
console.log("🔧 TO USE: Change button onclick to handleStopTrackerClickV2");
