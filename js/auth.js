// auth.js
// This file handles user authentication (login, logout, and "Remember Me" functionality).

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
		await window.showMainApp(); // Show the main application UI
	} else {
		window.showLogin(); // Show the login screen
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

	// Only check Supabase - remove local password verification
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

	const userData = data[0];

	// Only check if user exists in local users object (for permissions/role)
	if (window.users[userData.username]) {
		window.currentUser = userData.username;
		if (rememberMe) {
			localStorage.setItem("rememberedUser", window.currentUser);
		} else {
			localStorage.removeItem("rememberedUser");
		}
		await window.showMainApp();
		window.hideError();
	} else {
		window.showError("User configuration not found");
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

	// Unsubscribe from all Supabase channels (channels are stored in window.unsubscribe from database.js)
	if (window.unsubscribe) {
		if (window.unsubscribe.tasks)
			window.supabase.removeChannel(window.unsubscribe.tasks);
		if (window.unsubscribe.suggestions)
			window.supabase.removeChannel(window.unsubscribe.suggestions);
		if (window.unsubscribe.activity)
			window.supabase.removeChannel(window.unsubscribe.activity);
		if (window.unsubscribe.userProfiles)
			window.supabase.removeChannel(window.unsubscribe.userProfiles);
		if (window.unsubscribe.rewards)
			window.supabase.removeChannel(window.unsubscribe.rewards);
		if (window.unsubscribe.userRewardPurchases)
			window.supabase.removeChannel(
				window.unsubscribe.userRewardPurchases
			);
		if (window.unsubscribe.rewardSystemSettings)
			window.supabase.removeChannel(
				window.unsubscribe.rewardSystemSettings
			);
		window.unsubscribe = null; // Clear the unsubscribe object
	}
	// Clear overdue check interval
	if (window.overdueCheckIntervalId) {
		clearInterval(window.overdueCheckIntervalId);
		window.overdueCheckIntervalId = null;
	}
	window.currentUser = null; // Clear the current user
	// Reset login form fields
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	window.hideError(); // Hide any error messages
	window.showLogin(); // Show the login screen
};
