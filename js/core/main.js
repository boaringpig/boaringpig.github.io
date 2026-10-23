// main.js
// This is the main entry point for the application, consolidating logic.

// Global application state variables
// These are declared here, and other files access them via the window object.
// Users object is populated dynamically from Supabase by database-pigs.js loadUsersFromDB()
const users = {};
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

// Initialize Supabase client and attempt auto-login on page load
window.addEventListener("load", function () {
	// Initialize Supabase client first
	// This function is defined in database.js
	window.initializeSupabaseClient(
		window.supabaseConfig.supabaseUrl,
		window.supabaseConfig.supabaseAnonKey
	);
	// If this page load carries an invite code, show the join form instead of
	// attempting auto-login -- otherwise a remembered session on a shared
	// device would silently skip the invite flow.
	var inviteCode = new URLSearchParams(window.location.search).get("invite");
	if (inviteCode) {
		window.showInviteSignup(inviteCode);
	} else {
		// Then attempt auto-login
		// This function is defined in auth.js
		window.attemptAutoLogin();
	}
});

// Event listener for the login form, the only classic form left.
document.addEventListener("DOMContentLoaded", function () {
	const loginForm = document.getElementById("loginForm");
	if (loginForm) {
		// handleLogin is defined in auth.js
		loginForm.addEventListener("submit", window.handleLogin);
	}
});

// Global helper function for permission checks (defined in main.js, exposed globally)
window.hasPermission = function (permission) {
	const user = window.users[window.currentUser];
	return user && user.permissions.includes(permission);
};
