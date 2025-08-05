// database.user.js
// This file contains all the database-related functions for users.

let lastLoginAttemptTimestamp = 0;
const LOGIN_DEBOUNCE_TIME = 5000;

/**
 * Logs user activity to the userActivityLog array and Supabase database.
 * @param {string} action - The action performed (e.g., 'login', 'logout').
 */
window.logUserActivity = async function (action) {
	if (window.currentUser !== "schinken" && window.currentUser !== "skeen") {
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
 * Points can now go negative to properly handle penalties.
 * @param {string} username - The username whose points are to be updated.
 * @param {number} points - The amount of points to add, subtract, or set.
 * @param {string | null} operation - The operation to perform ('add', 'subtract', 'set', or null for UI refresh).
 */
window.updateUserPoints = async function (
	username = window.currentUser,
	points = 0,
	operation = null
) {
	// Admin points are always kept at 0 and not tracked
	if (username === "skeen") {
		if (operation === "set") {
			window.users[username].points = 0; // Always keep admin at 0
		} else if (operation === "add") {
			window.users[username].points = 0; // Always keep admin at 0
		} else if (operation === "subtract") {
			window.users[username].points = 0; // Always keep admin at 0
		}
		const pointsBadge = document.getElementById("userPoints");
		if (pointsBadge) {
			pointsBadge.textContent = `0 Points`;
		}
		const myPointsStat = document.getElementById("myPointsStat");
		if (myPointsStat) {
			myPointsStat.textContent = 0;
		}
		return;
	}

	// For regular users, allow negative points
	var oldPoints = window.users[username].points || 0; // Declare oldPoints here for all operations

	if (operation === "set") {
		window.users[username].points = points;
	} else if (operation === "add") {
		window.users[username].points = oldPoints + points;
	} else if (operation === "subtract") {
		// REMOVED Math.max(0, ...) to allow negative points
		window.users[username].points = oldPoints - points;

		// Show warning if points went negative
		var newPoints = window.users[username].points;
		if (
			oldPoints >= 0 &&
			newPoints < 0 &&
			username === window.currentUser
		) {
			window.showNotification(
				`⚠️ Your points are now negative: ${newPoints} points! Complete tasks to get back to positive.`,
				"warning"
			);
		}
	}

	// Update database if this is a real operation (not just UI refresh)
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

	// Update UI if this is the current user
	if (username === window.currentUser) {
		const pointsBadge = document.getElementById("userPoints");
		if (pointsBadge) {
			const userPoints = window.users[window.currentUser].points || 0;
			// Color-code the points badge based on value
			let pointsColor = "#00ff00"; // Green for positive
			if (userPoints < 0) {
				pointsColor = "#ff6b6b"; // Red for negative
			} else if (userPoints === 0) {
				pointsColor = "#ffff00"; // Yellow for zero
			}

			pointsBadge.textContent = `${userPoints} Points`;
			pointsBadge.style.color = pointsColor;
		}
		const myPointsStat = document.getElementById("myPointsStat");
		if (myPointsStat) {
			const userPoints = window.users[window.currentUser].points || 0;
			myPointsStat.textContent = userPoints;
			// Color-code the stat as well
			if (userPoints < 0) {
				myPointsStat.style.color = "#ff6b6b"; // Red for negative
			} else if (userPoints === 0) {
				myPointsStat.style.color = "#ffff00"; // Yellow for zero
			} else {
				myPointsStat.style.color = "#00ff00"; // Green for positive
			}
		}
	}

	// Update admin points control if it exists (for any user update)
	if (username === "schinken" && window.updateAdminPointsDisplay) {
		window.updateAdminPointsDisplay();
	}

	// Update dashboard displays
	if (window.updateStats) {
		window.updateStats();
	}
	if (window.renderUserProgress) {
		window.renderUserProgress();
	}
};

/**
 * Sets user points to exact value (admin only)
 */
window.setUserPoints = async function () {
	if (!window.hasPermission("manage_users")) {
		window.showNotification(
			"You do not have permission to manage user points",
			"error"
		);
		return;
	}

	const input = document.getElementById("adminPointsInput");
	const newPoints = parseInt(input.value);

	if (isNaN(newPoints)) {
		window.showNotification("Please enter a valid number", "error");
		return;
	}

	const oldPoints = window.users["schinken"].points || 0;
	await window.updateUserPoints("schinken", newPoints, "set");

	window.showNotification(
		`User points changed from ${oldPoints} to ${newPoints}`,
		"success"
	);

	// Log the change
	try {
		const activity = {
			user: window.currentUser,
			action: "points_changed",
			details: `Changed schinken points from ${oldPoints} to ${newPoints}`,
			timestamp: new Date().toISOString(),
		};
		await window.supabase.from("userActivity").insert([activity]);
	} catch (error) {
		console.error("Error logging points change:", error);
	}
};
