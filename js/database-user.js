// database.user.js
// This file contains all the database-related functions for users.

let lastLoginAttemptTimestamp = 0;
const LOGIN_DEBOUNCE_TIME = 5000;

/**
 * Logs user activity to the userActivityLog array and Supabase database.
 * @param {string} action - The action performed (e.g., 'login', 'logout').
 */
window.logUserActivity = async function (action) {
	if (window.currentUser !== "user" && window.currentUser !== "admin") {
		return;
	}

	if (action === "login") {
		const now = Date.now();
		if (now - lastLoginAttemptTimestamp < LOGIN_DEBOUNCE_TIME) {
			console.warn(
				`[logUserActivity] Debouncing 'login' action for user '${window.currentUser}'. Too soon after last attempt.`
			);
			return;
		}
		lastLoginAttemptTimestamp = now;
	}

	const activity = {
		user: window.currentUser,
		action: action,
		timestamp: new Date().toISOString(),
	};
	window.userActivityLog.unshift(activity);
	if (window.userActivityLog.length > 50) {
		window.userActivityLog = window.userActivityLog.slice(0, 50);
	}

	if (window.supabase) {
		const { error } = await window.supabase
			.from("userActivity")
			.insert([activity]);
		if (error) {
			console.error("Error logging activity to Supabase:", error);
			window.userActivityLog.shift();
		}
	}
};

/**
 * Fetches user activity log from Supabase.
 */
window.fetchUserActivityInitial = async function () {
	const { data, error } = await window.supabase
		.from("userActivity")
		.select("*")
		.order("timestamp", { ascending: false })
		.limit(50);
	if (error) {
		console.error("Error fetching user activity:", error);
	} else {
		window.userActivityLog = data;
		window.renderDashboard();
	}
};

/**
 * Fetches all user profiles (for points) from Supabase.
 */
window.fetchUserProfilesInitial = async function () {
	const { data, error } = await window.supabase
		.from("userProfiles")
		.select("*");
	if (error) {
		console.error("Error fetching user profiles:", error);
	} else {
		data.forEach((profileData) => {
			const username = profileData.username;
			if (window.users[username]) {
				window.users[username].points = profileData.points || 0;
			}
		});
		window.updateUserPoints();
		window.renderUserProgress();
	}
};

/**
 * Updates a user's points in the local 'users' object and in the Supabase 'userProfiles' table.
 * @param {string} username - The username whose points are to be updated.
 * @param {number} points - The amount of points to add, subtract, or set.
 * @param {string | null} operation - The operation to perform ('add', 'subtract', 'set', or null for UI refresh).
 */
window.updateUserPoints = async function (
	username = window.currentUser,
	points = 0,
	operation = null
) {
	if (username === "admin") {
		if (operation === "set") {
			window.users[username].points = points;
		} else if (operation === "add") {
			window.users[username].points =
				(window.users[username].points || 0) + points;
		} else if (operation === "subtract") {
			window.users[username].points = Math.max(
				0,
				(window.users[username].points || 0) - points
			);
		}
		const pointsBadge = document.getElementById("userPoints");
		if (pointsBadge) {
			pointsBadge.textContent = `${
				window.users[window.currentUser].points || 0
			} Points`;
		}
		const myPointsStat = document.getElementById("myPointsStat");
		if (myPointsStat) {
			myPointsStat.textContent =
				window.users[window.currentUser].points || 0;
		}
		return;
	}
	if (operation === "set") {
		window.users[username].points = points;
	} else if (operation === "add") {
		window.users[username].points =
			(window.users[username].points || 0) + points;
	} else if (operation === "subtract") {
		window.users[username].points = Math.max(
			0,
			(window.users[username].points || 0) - points
		);
	}

	if (operation !== null && window.supabase) {
		const { error } = await window.supabase.from("userProfiles").upsert(
			{
				username: username,
				points: window.users[username].points,
				updatedAt: new Date().toISOString(),
			},
			{ onConflict: "username" }
		);
		if (error) {
			console.error(
				"Error updating user profile points in Supabase:",
				error
			);
		}
	}
	if (username === window.currentUser) {
		const pointsBadge = document.getElementById("userPoints");
		if (pointsBadge) {
			pointsBadge.textContent = `${
				window.users[window.currentUser].points || 0
			} Points`;
		}
		const myPointsStat = document.getElementById("myPointsStat");
		if (myPointsStat) {
			myPointsStat.textContent =
				window.users[window.currentUser].points || 0;
		}
	}
};
