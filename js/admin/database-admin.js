// database-admin.js
// Database functions for the super-admin "Manage Masters" panel: creating,
// editing, and deactivating master accounts and their group terminology.

window.allMasters = [];

/**
 * Fetches every master account along with their group_settings row.
 */
window.fetchAllMasters = async function () {
	if (!window.isAdmin()) return [];

	var { data: masterUsers, error: usersError } = await window.supabase
		.from("users")
		.select("username, display_name, is_admin, status")
		.eq("role", "master");

	if (usersError) {
		console.error("Error fetching masters:", usersError);
		window.showNotification("Failed to load masters.", "error");
		return [];
	}

	var { data: settings, error: settingsError } = await window.supabase
		.from("group_settings")
		.select("*");

	if (settingsError) {
		console.error("Error fetching group settings:", settingsError);
		settings = [];
	}

	var settingsMap = {};
	(settings || []).forEach(function (s) {
		settingsMap[s.master_username] = s;
	});

	window.allMasters = (masterUsers || []).map(function (u) {
		var s = settingsMap[u.username] || {};
		return {
			username: u.username,
			displayName: u.display_name || u.username,
			isAdmin: !!u.is_admin,
			status: u.status || "active",
			groupLabel: s.group_label || "Household",
			masterLabel: s.master_label || "Master",
			masterLabelPlural: s.master_label_plural || "Masters",
			slaveLabel: s.slave_label || "pig",
			slaveLabelPlural: s.slave_label_plural || "pigs",
			classicUiForced: !!s.classic_ui_forced,
			theme: {
				bg: s.theme_bg || "#09090b",
				card: s.theme_card || "#131316",
				elevated: s.theme_elevated || "#1a1a20",
				textPrimary: s.theme_text_primary || "#fafafa",
				textSecondary: s.theme_text_secondary || "#a1a1aa",
			},
			themeLight: {
				bg: s.theme_bg_light || "#ffffff",
				card: s.theme_card_light || "#f4f4f5",
				elevated: s.theme_elevated_light || "#e4e4e7",
				textPrimary: s.theme_text_primary_light || "#18181b",
				textSecondary: s.theme_text_secondary_light || "#52525b",
			},
		};
	});

	return window.allMasters;
};

/**
 * Creates a new master account with its own group_settings row.
 */
window.createMaster = async function (details) {
	if (!window.isAdmin()) {
		window.showNotification(
			"You do not have permission to create masters.",
			"error"
		);
		return false;
	}

	var username = (details.username || "").trim().toLowerCase();
	var password = details.password || "";
	var displayName = (details.displayName || "").trim() || username;

	if (!username || username.length < 3) {
		window.showNotification(
			"Master username must be at least 3 characters.",
			"error"
		);
		return false;
	}
	if (!password || password.length < 4) {
		window.showNotification(
			"Master password must be at least 4 characters.",
			"error"
		);
		return false;
	}
	if (window.users[username]) {
		window.showNotification("Username already exists.", "error");
		return false;
	}

	var { error: userError } = await window.supabase.from("users").insert([
		{
			username: username,
			password: password,
			role: "master",
			display_name: displayName,
			is_admin: !!details.isAdmin,
			status: "active",
		},
	]);

	if (userError) {
		console.error("Error creating master:", userError);
		window.showNotification(
			"Failed to create master: " + userError.message,
			"error"
		);
		return false;
	}

	var { error: settingsError } = await window.supabase
		.from("group_settings")
		.insert([
			{
				master_username: username,
				group_label: details.groupLabel || "Household",
				master_label: details.masterLabel || "Master",
				master_label_plural: details.masterLabelPlural || "Masters",
				slave_label: details.slaveLabel || "pig",
				slave_label_plural: details.slaveLabelPlural || "pigs",
				classic_ui_forced: !!details.classicUiForced,
				theme_bg: (details.theme && details.theme.bg) || "#09090b",
				theme_card: (details.theme && details.theme.card) || "#131316",
				theme_elevated: (details.theme && details.theme.elevated) || "#1a1a20",
				theme_text_primary:
					(details.theme && details.theme.textPrimary) || "#fafafa",
				theme_text_secondary:
					(details.theme && details.theme.textSecondary) || "#a1a1aa",
				theme_bg_light: (details.themeLight && details.themeLight.bg) || "#ffffff",
				theme_card_light: (details.themeLight && details.themeLight.card) || "#f4f4f5",
				theme_elevated_light:
					(details.themeLight && details.themeLight.elevated) || "#e4e4e7",
				theme_text_primary_light:
					(details.themeLight && details.themeLight.textPrimary) || "#18181b",
				theme_text_secondary_light:
					(details.themeLight && details.themeLight.textSecondary) || "#52525b",
			},
		]);

	if (settingsError) {
		console.error("Error creating group settings:", settingsError);
	}

	window.showNotification(
		"Master '" + displayName + "' created successfully!",
		"success"
	);
	return true;
};

/**
 * Updates a master's terminology (group label + role labels).
 */
window.updateMasterTerminology = async function (masterUsername, terms) {
	if (!window.isAdmin()) return false;

	var { error } = await window.supabase.from("group_settings").upsert(
		{
			master_username: masterUsername,
			group_label: terms.groupLabel || "Household",
			master_label: terms.masterLabel || "Master",
			master_label_plural: terms.masterLabelPlural || "Masters",
			slave_label: terms.slaveLabel || "pig",
			slave_label_plural: terms.slaveLabelPlural || "pigs",
			classic_ui_forced: !!terms.classicUiForced,
			theme_bg: (terms.theme && terms.theme.bg) || "#09090b",
			theme_card: (terms.theme && terms.theme.card) || "#131316",
			theme_elevated: (terms.theme && terms.theme.elevated) || "#1a1a20",
			theme_text_primary: (terms.theme && terms.theme.textPrimary) || "#fafafa",
			theme_text_secondary:
				(terms.theme && terms.theme.textSecondary) || "#a1a1aa",
			theme_bg_light: (terms.themeLight && terms.themeLight.bg) || "#ffffff",
			theme_card_light: (terms.themeLight && terms.themeLight.card) || "#f4f4f5",
			theme_elevated_light:
				(terms.themeLight && terms.themeLight.elevated) || "#e4e4e7",
			theme_text_primary_light:
				(terms.themeLight && terms.themeLight.textPrimary) || "#18181b",
			theme_text_secondary_light:
				(terms.themeLight && terms.themeLight.textSecondary) || "#52525b",
			updated_at: new Date().toISOString(),
		},
		{ onConflict: "master_username" }
	);

	if (error) {
		console.error("Error updating terminology:", error);
		window.showNotification("Failed to update terminology.", "error");
		return false;
	}

	window.showNotification("Terminology updated successfully!", "success");
	if (masterUsername === window.activeMasterContext) {
		await window.loadGroupTerms();
	}
	return true;
};

/**
 * Updates a master's display name and/or password.
 */
window.updateMasterAccount = async function (masterUsername, updates) {
	if (!window.isAdmin()) return false;

	var payload = {};
	if (updates.displayName) payload.display_name = updates.displayName;
	if (updates.password) payload.password = updates.password;
	if (typeof updates.isAdmin === "boolean") payload.is_admin = updates.isAdmin;

	if (Object.keys(payload).length === 0) return true;

	var { error } = await window.supabase
		.from("users")
		.update(payload)
		.eq("username", masterUsername);

	if (error) {
		console.error("Error updating master account:", error);
		window.showNotification("Failed to update master account.", "error");
		return false;
	}

	window.showNotification("Master account updated successfully!", "success");
	return true;
};

/**
 * Deactivates a master account (blocks login, keeps all their data intact).
 */
window.deactivateMaster = function (masterUsername) {
	window.showConfirmModal(
		"Are you sure you want to deactivate master '" +
			masterUsername +
			"'? They (and their group) will no longer be able to log in.",
		async function (confirmed) {
			if (!confirmed) return;
			var { error } = await window.supabase
				.from("users")
				.update({ status: "inactive" })
				.eq("username", masterUsername);
			if (error) {
				console.error("Error deactivating master:", error);
				window.showNotification("Failed to deactivate master.", "error");
				return;
			}
			window.showNotification("Master deactivated successfully.", "success");
			if (window.renderMastersList) await window.renderMastersList();
		}
	);
};

/**
 * Reactivates a master account.
 */
window.reactivateMaster = async function (masterUsername) {
	var { error } = await window.supabase
		.from("users")
		.update({ status: "active" })
		.eq("username", masterUsername);
	if (error) {
		console.error("Error reactivating master:", error);
		window.showNotification("Failed to reactivate master.", "error");
		return;
	}
	window.showNotification("Master reactivated successfully.", "success");
	if (window.renderMastersList) await window.renderMastersList();
};
