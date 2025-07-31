// main.js
// This is the main entry point for the application, consolidating logic.

// Global application state variables
// These are declared here, and other files access them via the window object.
const users = {
	admin: {
		password: "admin123",
		role: "admin",
		displayName: "Administrator",
		permissions: [
			"create_task",
			"approve_task",
			"delete_task",
			"view_all_tasks",
			"manage_users", // Keeping for now, but effectively unused
			"view_dashboard",
			"approve_suggestions",
			"manage_rewards", // RE-ADDED: Admin can now manage rewards
		],
		points: 0, // Admin points should always remain 0 and not be tracked
	},
	user: {
		password: "user123",
		role: "user",
		displayName: "User",
		permissions: ["check_task", "view_assigned_tasks", "suggest_task"],
		points: 0,
	},
};
let currentUser = null;
let tasks = [];
let suggestions = [];
let userActivityLog = [];
// NEW: Global variables for reward data
let rewards = [];
let userRewardPurchases = [];
let rewardSystemSettings = {};

// Counters for client-side ID generation (REMOVED FOR TASKS/SUGGESTIONS - Supabase will handle)
// taskIdCounter and suggestionIdCounter are no longer managed client-side for inserts.
// They will still be initialized from metadata for consistency, but not incremented for new items.
let taskIdCounter = 1; // Will be initialized from DB max ID, but not used for new inserts
let suggestionIdCounter = 1; // Will be initialized from DB max ID, but not used for new inserts

// Interval ID for overdue task checks
let overdueCheckIntervalId = null;
const OVERDUE_CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes (in milliseconds)

// Current date for calendar view - NO LONGER NEEDED WITH FULLCALENDAR
// let currentDate = new Date();

// Active tab state
let activeTab = "tasks";

// Make global variables accessible via window object for inter-file communication
window.users = users;
window.currentUser = currentUser;
window.tasks = tasks;
window.suggestions = suggestions;
window.userActivityLog = userActivityLog;
// NEW: Expose reward data globally
window.rewards = rewards;
window.userRewardPurchases = userRewardPurchases;
window.rewardSystemSettings = rewardSystemSettings;

window.taskIdCounter = taskIdCounter; // Still exposed, but its role changes
window.suggestionIdCounter = suggestionIdCounter; // Still exposed, but its role changes
window.overdueCheckIntervalId = overdueCheckIntervalId;
window.OVERDUE_CHECK_INTERVAL = OVERDUE_CHECK_INTERVAL; // Corrected typo here
// window.currentDate = currentDate; // NO LONGER NEEDED
window.activeTab = activeTab;

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

	// NEW: Event listeners for reward management form buttons
	const saveRewardBtn = document.getElementById("saveRewardBtn");
	if (saveRewardBtn) {
		saveRewardBtn.addEventListener("click", window.saveReward);
	}
	const cancelEditRewardBtn = document.getElementById("cancelEditRewardBtn");
	if (cancelEditRewardBtn) {
		cancelEditRewardBtn.addEventListener("click", window.cancelEditReward);
	}
	// The update settings button is directly onclick in HTML, so no need for listener here
});

// Global helper function for permission checks (defined in main.js, exposed globally)
window.hasPermission = function (permission) {
	const user = window.users[window.currentUser];
	return user && user.permissions.includes(permission);
};

// window.changeMonth is no longer needed as FullCalendar handles navigation
// window.changeMonth = function (direction) {
// 	window.currentDate.setMonth(window.currentDate.getMonth() + direction);
// 	window.renderCalendar();
// };
