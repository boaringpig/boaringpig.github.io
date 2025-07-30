// auth.js
// This file handles user authentication (login, logout, and "Remember Me" functionality).

// Global users object (defined in main.js, but referenced here for roles/permissions)
// const users = { ... };

// Global currentUser variable (defined in main.js)
// let currentUser = null;

// Global supabase instance (defined in database.js)
// let supabase = null;

// Global functions from ui.js
// function showLogin() { ... }
// function showMainApp() { ... }
// function showError(message) { ... }
// function hideError() { ... }
// function logUserActivity(action) { ... } // Defined in main.js but called here

/**
 * Attempts to auto-login the user based on localStorage.
 * This is a simplified auto-login for demo purposes.
 * In a real application, you would use Supabase Auth sessions.
 */
window.attemptAutoLogin = async function () {
	const rememberedUser = localStorage.getItem("rememberedUser");
	// Ensure users object is available (it's defined globally in main.js)
	if (rememberedUser && window.users && window.users[rememberedUser]) {
		window.currentUser = rememberedUser;
		console.log(`Auto-logging in as ${window.currentUser}`);
		window.showMainApp();
	} else {
		window.showLogin();
	}
};

/**
 * Handles the login form submission.
 * Authenticates against the Supabase 'users' table.
 * @param {Event} e - The submit event.
 */
window.handleLogin = async function (e) {
	e.preventDefault();
	const usernameInput = document.getElementById("username");
	const passwordInput = document.getElementById("password");
	const rememberMeCheckbox = document.getElementById("rememberMe");

	const username = usernameInput.value.trim();
	const password = passwordInput.value;
	const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;

	// Authenticate against Supabase 'users' table
	// IMPORTANT: In a real app, passwords should be hashed and compared securely!
	const { data, error } = await window.supabase
		.from("users")
		.select("username, password, role")
		.eq("username", username)
		.eq("password", password)
		.limit(1);

	if (error || !data || data.length === 0) {
		console.error("Supabase login error:", error);
		window.showError("Invalid username or password");
		return;
	}

	const userData = data[0]; // Get the single user object

	// Double check against local users object for role/permissions (for this demo structure)
	if (
		window.users[userData.username] &&
		window.users[userData.username].password === userData.password
	) {
		window.currentUser = userData.username;
		if (rememberMe) {
			localStorage.setItem("rememberedUser", window.currentUser);
		} else {
			localStorage.removeItem("rememberedUser");
		}
		window.showMainApp();
		window.hideError();
	} else {
		window.showError("Invalid username or password");
	}
};

/**
 * Handles user logout.
 * Clears local storage and resets the application state.
 */
window.logout = function () {
	// Log logout activity before clearing user
	if (window.currentUser) {
		window.logUserActivity("logout");
	}

	localStorage.removeItem("rememberedUser"); // Clear remembered user on logout

	// Unsubscribe from all Supabase channels (handled in database.js)
	if (window.unsubscribe) {
		if (window.unsubscribe.tasks)
			window.supabase.removeChannel(window.unsubscribe.tasks);
		if (window.unsubscribe.suggestions)
			window.supabase.removeChannel(window.unsubscribe.suggestions);
		if (window.unsubscribe.activity)
			window.supabase.removeChannel(window.unsubscribe.activity);
		if (window.unsubscribe.userProfiles)
			window.supabase.removeChannel(window.unsubscribe.userProfiles);
		window.unsubscribe = null;
	}
	// Clear overdue check interval
	if (window.overdueCheckIntervalId) {
		clearInterval(window.overdueCheckIntervalId);
		window.overdueCheckIntervalId = null;
	}
	window.currentUser = null;
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	window.hideError();
	window.showLogin();
};
