// invites.js
// Pre-login invite redemption: a brand-new person opens `?invite=<code>`,
// sees a join form instead of the login screen, and signs themselves up
// directly into that group as a slave. Parallel to auth.js, but this all
// has to run *before* any post-login app state (window.users, etc.) exists.

window.pendingInvite = null;

function showInviteError(message) {
	var errorEl = document.getElementById("inviteErrorMessage");
	var formEl = document.getElementById("inviteSignupForm");
	if (errorEl) {
		errorEl.textContent = message;
		errorEl.style.display = "block";
	}
	if (formEl) formEl.style.display = "none";
}

/**
 * Shows the invite signup screen (instead of the login screen) and
 * validates the given code against the `invites` table.
 */
window.showInviteSignup = async function (code) {
	document.getElementById("loginScreen").style.display = "none";
	document.getElementById("mainApp").style.display = "none";
	document.getElementById("inviteSignupScreen").style.display = "block";

	var { data, error } = await window.supabase
		.from("invites")
		.select("*")
		.eq("code", code)
		.limit(1);

	if (error || !data || data.length === 0) {
		showInviteError("This invite link is invalid.");
		return;
	}

	var invite = data[0];
	var isExpired = invite.expires_at && new Date(invite.expires_at) < new Date();

	if (invite.status !== "pending" || isExpired) {
		showInviteError(
			invite.status === "redeemed"
				? "This invite link has already been used."
				: invite.status === "revoked"
				? "This invite link has been revoked."
				: "This invite link has expired."
		);
		return;
	}

	window.pendingInvite = invite;

	var { data: groupData } = await window.supabase
		.from("group_settings")
		.select("group_label")
		.eq("master_username", invite.master_username)
		.limit(1);

	var groupLabel =
		groupData && groupData.length > 0 ? groupData[0].group_label : "Household";
	var groupLabelEl = document.getElementById("inviteGroupLabel");
	if (groupLabelEl) groupLabelEl.textContent = groupLabel;
};

/**
 * Handles submission of the invite signup form.
 */
window.handleInviteSignup = async function (e) {
	e.preventDefault();

	var invite = window.pendingInvite;
	if (!invite) return;

	var usernameEl = document.getElementById("inviteUsername");
	var passwordEl = document.getElementById("invitePassword");
	var displayNameEl = document.getElementById("inviteDisplayName");

	var username = usernameEl ? usernameEl.value.trim().toLowerCase() : "";
	var password = passwordEl ? passwordEl.value : "";
	var displayName = displayNameEl ? displayNameEl.value.trim() : "";

	if (!username || username.length < 3) {
		showInviteError("Username must be at least 3 characters.");
		return;
	}
	if (!password || password.length < 4) {
		showInviteError("Password must be at least 4 characters.");
		return;
	}
	if (!displayName) displayName = username;

	var { data: existing } = await window.supabase
		.from("users")
		.select("username")
		.eq("username", username)
		.limit(1);

	if (existing && existing.length > 0) {
		showInviteError("That username is already taken.");
		return;
	}

	// Re-check (and claim) the invite atomically to handle the race where two
	// people open the same link at once: only the first update that actually
	// affects a row wins.
	var { data: claimed, error: claimError } = await window.supabase
		.from("invites")
		.update({
			status: "redeemed",
			redeemed_by: username,
			redeemed_at: new Date().toISOString(),
		})
		.eq("code", invite.code)
		.eq("status", "pending")
		.select();

	if (claimError || !claimed || claimed.length === 0) {
		showInviteError("This invite was just used by someone else.");
		return;
	}

	var { error: createError } = await window.createSlaveAccountRecords({
		username: username,
		password: password,
		displayName: displayName,
		masterUsername: invite.master_username,
	});

	if (createError) {
		showInviteError("Failed to create your account: " + createError.message);
		return;
	}

	window.currentUser = username;
	window.activeMasterContext = invite.master_username;

	// Drop the invite code from the URL now that it's been consumed.
	history.replaceState(null, "", window.location.pathname);

	await window.loadUsersFromDB();
	document.getElementById("inviteSignupScreen").style.display = "none";
	await window.showMainApp();
};

document.addEventListener("DOMContentLoaded", function () {
	var inviteForm = document.getElementById("inviteSignupForm");
	if (inviteForm) {
		inviteForm.addEventListener("submit", window.handleInviteSignup);
	}
});
