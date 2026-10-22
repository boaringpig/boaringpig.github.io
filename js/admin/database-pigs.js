// database-pigs.js
// Dynamic user/pig management - loads users from Supabase instead of hardcoded objects.

const MASTER_PERMISSIONS = [
	"create_task",
	"approve_task",
	"delete_task",
	"view_all_tasks",
	"manage_users",
	"view_dashboard",
	"approve_suggestions",
	"manage_rewards",
];

const SLAVE_PERMISSIONS = ["check_task", "view_assigned_tasks", "suggest_task"];

window.slaves = [];
window.selectedPig = null;
// The master_username whose data (tasks/rewards/etc.) is currently being
// viewed. For masters this is always their own username; for a slave who
// belongs to more than one active group, it's whichever group they've
// selected via the context switcher (see setActiveMasterContext below).
window.activeMasterContext = null;
// For a slave, every master_username they currently have an active
// relationship with (used to populate the context switcher).
window.myMasterOptions = [];

window.isMaster = function () {
	var user = window.users[window.currentUser];
	return user && user.role === "master";
};

window.isSlave = function () {
	var user = window.users[window.currentUser];
	return user && user.role === "slave";
};

window.isAdmin = function () {
	var user = window.users[window.currentUser];
	return !!(user && user.isAdmin);
};

window.getSlaves = function () {
	return window.slaves || [];
};

/**
 * Switches which master's group is currently being viewed (relevant for a
 * slave shared across more than one master) and reloads all tenant-scoped
 * data for that group.
 */
window.setActiveMasterContext = async function (masterUsername) {
	if (window.myMasterOptions.indexOf(masterUsername) === -1) {
		console.error("Not an active group for this user:", masterUsername);
		return;
	}
	window.activeMasterContext = masterUsername;
	await window.loadGroupTerms();
	if (window.loadData) {
		await window.loadData();
	}
	if (window.renderGroupContextSwitcher) {
		window.renderGroupContextSwitcher();
	}
};

/**
 * Loads all users from Supabase and builds window.users and window.slaves dynamically.
 */
window.loadUsersFromDB = async function () {
	if (!window.supabase) {
		console.error("Supabase client not initialized.");
		return;
	}

	var { data: allUsers, error: usersError } = await window.supabase
		.from("users")
		.select("username, role, display_name, is_admin, status, status_message");

	if (usersError) {
		console.error("Error fetching users:", usersError);
		return;
	}

	var { data: relationships, error: relError } = await window.supabase
		.from("master_slave_relationships")
		.select("master_username, slave_username, status")
		.eq("status", "active");

	if (relError) {
		console.error("Error fetching relationships:", relError);
		relationships = [];
	}

	var { data: profiles, error: profilesError } = await window.supabase
		.from("userProfiles")
		.select("username, master_username, points");

	if (profilesError) {
		console.error("Error fetching profiles:", profilesError);
		profiles = [];
	}

	// Clear and rebuild
	var newUsers = {};
	if (allUsers) {
		allUsers.forEach(function (u) {
			var role = u.role || "slave";
			newUsers[u.username] = {
				role: role,
				displayName: u.display_name || u.username,
				isAdmin: !!u.is_admin,
				status: u.status || "active",
				statusMessage: u.status_message || "",
				permissions:
					role === "master"
						? MASTER_PERMISSIONS.slice()
						: SLAVE_PERMISSIONS.slice(),
				points: 0,
			};
		});
	}

	// Update window.users in place (other files hold references to the original object)
	Object.keys(window.users).forEach(function (key) {
		delete window.users[key];
	});
	Object.keys(newUsers).forEach(function (key) {
		window.users[key] = newUsers[key];
	});

	// Determine which master's group we're operating in, and (for slaves)
	// every group they belong to.
	window.myMasterOptions = [];
	if (window.currentUser && window.users[window.currentUser]) {
		if (window.users[window.currentUser].role === "master") {
			window.activeMasterContext = window.currentUser;
		} else {
			relationships.forEach(function (rel) {
				if (rel.slave_username === window.currentUser) {
					window.myMasterOptions.push(rel.master_username);
				}
			});
			if (window.myMasterOptions.indexOf(window.activeMasterContext) === -1) {
				window.activeMasterContext = window.myMasterOptions[0] || null;
			}
		}
	}

	// Points are per (master, slave) group, so pick them out for the active context.
	if (profiles) {
		profiles.forEach(function (p) {
			if (
				window.users[p.username] &&
				p.master_username === window.activeMasterContext
			) {
				window.users[p.username].points = p.points || 0;
			}
		});
	}

	// Build slaves list for the group currently being viewed
	window.slaves = [];
	relationships.forEach(function (rel) {
		if (rel.master_username === window.activeMasterContext) {
			window.slaves.push(rel.slave_username);
		}
	});

	// Set default selected pig for dashboard
	if (
		window.selectedPig &&
		window.slaves.indexOf(window.selectedPig) === -1
	) {
		window.selectedPig = null;
	}
};

/**
 * Creates the three records that make someone a slave in a group: the
 * `users` row, their `userProfiles` row for that group, and the
 * `master_slave_relationships` row linking them. Shared by `addNewPig`
 * (master-initiated) and invite redemption (self-service) so there's one
 * implementation of "what it means to join a group" -- `masterUsername` is
 * taken explicitly rather than read off `window.activeMasterContext`, since
 * the invite-redemption caller has no logged-in group context of its own.
 * Returns `{ error }` (matching the Supabase client's own shape) so callers
 * can share one error-handling path.
 */
window.createSlaveAccountRecords = async function ({
	username,
	password,
	displayName,
	masterUsername,
}) {
	var { error: userError } = await window.supabase.from("users").insert([
		{
			username: username,
			password: password,
			role: "slave",
			display_name: displayName,
		},
	]);

	if (userError) {
		console.error("Error creating user:", userError);
		return { error: userError };
	}

	var { error: profileError } = await window.supabase
		.from("userProfiles")
		.insert([
			{
				username: username,
				master_username: masterUsername,
				points: 0,
				updatedAt: new Date().toISOString(),
			},
		]);

	if (profileError) {
		console.error("Error creating profile:", profileError);
	}

	var { error: relError } = await window.supabase
		.from("master_slave_relationships")
		.insert([
			{
				master_username: masterUsername,
				slave_username: username,
				status: "active",
			},
		]);

	if (relError) {
		console.error("Error creating relationship:", relError);
	}

	return { error: null };
};

/**
 * Adds a new pig (slave) account.
 *
 * `overrides` is optional: a non-DOM caller like the React beta UI can pass
 * `{ username, password, displayName }` directly instead of this function
 * reading the classic HTML form's inputs. Called with no arguments, it
 * behaves exactly as before.
 */
window.addNewPig = async function (overrides) {
	overrides = overrides || {};

	if (!window.isMaster()) {
		window.showNotification(
			"Only the " +
				window.term("master") +
				" can add new " +
				window.term("slavePlural") +
				".",
			"error"
		);
		return;
	}

	var usernameEl = document.getElementById("newPigUsername");
	var passwordEl = document.getElementById("newPigPassword");
	var displayNameEl = document.getElementById("newPigDisplayName");

	var username =
		overrides.username !== undefined
			? overrides.username.trim().toLowerCase()
			: usernameEl
			? usernameEl.value.trim().toLowerCase()
			: "";
	var password =
		overrides.password !== undefined
			? overrides.password
			: passwordEl
			? passwordEl.value
			: "";
	var displayName =
		overrides.displayName !== undefined
			? overrides.displayName.trim()
			: displayNameEl
			? displayNameEl.value.trim()
			: "";

	if (!username || !password) {
		window.showNotification(
			"Username and password are required.",
			"error"
		);
		return;
	}

	if (username.length < 3) {
		window.showNotification(
			"Username must be at least 3 characters.",
			"error"
		);
		return;
	}

	if (password.length < 4) {
		window.showNotification(
			"Password must be at least 4 characters.",
			"error"
		);
		return;
	}

	if (!displayName) {
		displayName = username;
	}

	// Check if username already exists
	if (window.users[username]) {
		window.showNotification("Username already exists.", "error");
		return;
	}

	try {
		var { error: createError } = await window.createSlaveAccountRecords({
			username: username,
			password: password,
			displayName: displayName,
			masterUsername: window.activeMasterContext,
		});

		if (createError) {
			window.showNotification(
				"Failed to create user: " + createError.message,
				"error"
			);
			return;
		}

		// Reload users
		await window.loadUsersFromDB();

		// Clear form
		if (usernameEl) usernameEl.value = "";
		if (passwordEl) passwordEl.value = "";
		if (displayNameEl) displayNameEl.value = "";

		window.showNotification(
			window.termCap("slave") + " '" + displayName + "' added successfully!",
			"success"
		);
		window.renderPigList();
	} catch (e) {
		console.error("Error adding new pig:", e);
		window.showNotification("Failed to add " + window.term("slave") + ".", "error");
	}
};

/**
 * Deactivates a pig (sets relationship to inactive).
 */
window.deactivatePig = function (pigUsername) {
	window.showConfirmModal(
		"Are you sure you want to deactivate " +
			(window.users[pigUsername]
				? window.users[pigUsername].displayName
				: pigUsername) +
			"? They will no longer be able to log in or receive tasks.",
		async function (confirmed) {
			if (!confirmed) return;

			var { error } = await window.supabase
				.from("master_slave_relationships")
				.update({ status: "inactive" })
				.eq("master_username", window.activeMasterContext)
				.eq("slave_username", pigUsername);

			if (error) {
				console.error("Error deactivating pig:", error);
				window.showNotification(
					"Failed to deactivate " + window.term("slave") + ".",
					"error"
				);
				return;
			}

			await window.loadUsersFromDB();
			window.showNotification(
				window.termCap("slave") + " deactivated successfully.",
				"success"
			);
			window.renderPigList();
		}
	);
};

/**
 * Reactivates a pig.
 */
window.reactivatePig = async function (pigUsername) {
	var { error } = await window.supabase
		.from("master_slave_relationships")
		.update({ status: "active" })
		.eq("master_username", window.activeMasterContext)
		.eq("slave_username", pigUsername);

	if (error) {
		console.error("Error reactivating pig:", error);
		window.showNotification(
			"Failed to reactivate " + window.term("slave") + ".",
			"error"
		);
		return;
	}

	await window.loadUsersFromDB();
	window.showNotification(
		window.termCap("slave") + " reactivated successfully.",
		"success"
	);
	window.renderPigList();
};

/**
 * Renders the pig management list in admin settings.
 */
window.renderPigList = async function () {
	var container = document.getElementById("pigList");
	if (!container) return;

	// Fetch all relationships (including inactive) for display
	var { data: allRels, error } = await window.supabase
		.from("master_slave_relationships")
		.select("slave_username, status, created_at")
		.eq("master_username", window.activeMasterContext);

	if (error) {
		console.error("Error fetching pig list:", error);
		container.innerHTML =
			'<div class="empty-state">Error loading ' +
			window.escapeHtml(window.term("slavePlural")) +
			".</div>";
		return;
	}

	if (!allRels || allRels.length === 0) {
		container.innerHTML =
			'<div class="empty-state">No ' +
			window.escapeHtml(window.term("slavePlural")) +
			" added yet. Add one above!</div>";
		return;
	}

	container.innerHTML = allRels
		.map(function (rel) {
			var pig = window.users[rel.slave_username];
			var displayName = pig ? pig.displayName : rel.slave_username;
			var points = pig ? pig.points : 0;
			var isActive = rel.status === "active";

			return (
				'<div class="task-item ' +
				(isActive ? "" : "completed") +
				'">' +
				'<div class="task-content">' +
				"<div>" +
				'<span class="status-badge ' +
				(isActive ? "status-todo" : "status-completed") +
				'">' +
				(isActive ? "Active" : "Inactive") +
				"</span>" +
				'<span class="task-text">' +
				window.escapeHtml(displayName) +
				" (" +
				window.escapeHtml(rel.slave_username) +
				")</span>" +
				(pig && pig.statusMessage
					? ' <span class="status-message-text">' + window.escapeHtml(pig.statusMessage) + "</span>"
					: "") +
				'<div class="task-meta">' +
				"Points: " +
				points +
				"<br>Added: " +
				window.formatDate(rel.created_at) +
				"</div>" +
				"</div>" +
				'<div class="task-actions">' +
				(isActive
					? '<button class="action-btn reject-btn" onclick="window.deactivatePig(\'' +
						rel.slave_username +
						"')\">Deactivate</button>"
					: '<button class="action-btn approve-btn" onclick="window.reactivatePig(\'' +
						rel.slave_username +
						"')\">Reactivate</button>") +
				"</div>" +
				"</div>" +
				"</div>"
			);
		})
		.join("");
};

/**
 * Renders pig checkboxes into any container (task creation form, cost
 * tracker modal, ...). `containerId` defaults to the task form's container
 * so existing callers keep working unchanged.
 */
window.renderPigCheckboxes = function (containerId) {
	var container = document.getElementById(containerId || "pigCheckboxes");
	if (!container) return;

	var slaves = window.getSlaves();
	if (slaves.length === 0) {
		container.innerHTML =
			'<span style="color: var(--text-color-medium); font-size: 13px;">No ' +
			window.escapeHtml(window.term("slavePlural")) +
			" added yet.</span>";
		return;
	}

	container.innerHTML = slaves
		.map(function (pig) {
			var displayName = window.users[pig]
				? window.users[pig].displayName
				: pig;
			return (
				'<label style="display: flex; align-items: center; gap: 5px; cursor: pointer;">' +
				'<input type="checkbox" class="pig-assign-checkbox" value="' +
				pig +
				'" checked />' +
				window.escapeHtml(displayName) +
				"</label>"
			);
		})
		.join("");
};

/**
 * Gets the list of selected pigs from a container's checkboxes, scoped to
 * that container so two pig-assignment widgets (task form, cost tracker
 * modal) can both exist in the DOM at once without reading each other's
 * selections. `containerId` defaults to the task form's container.
 */
window.getSelectedPigs = function (containerId) {
	var container = document.getElementById(containerId || "pigCheckboxes");
	if (!container) return [];
	var checkboxes = container.querySelectorAll(".pig-assign-checkbox:checked");
	var selected = [];
	checkboxes.forEach(function (cb) {
		selected.push(cb.value);
	});
	return selected;
};

/**
 * Gets the assignment mode from the task creation form.
 */
window.getAssignmentMode = function () {
	var modeSelect = document.getElementById("assignmentMode");
	return modeSelect ? modeSelect.value : "individual";
};
