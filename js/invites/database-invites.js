// database-invites.js
// Master-side invite generation/management. Redemption (the anonymous,
// pre-login side) lives in js/invites/invites.js instead, since it has to run before
// any of the logged-in app state here exists.

window.invites = [];

/**
 * Generates a short, URL-safe invite code.
 */
function generateInviteCode() {
	var bytes = new Uint8Array(8);
	crypto.getRandomValues(bytes);
	return Array.from(bytes)
		.map(function (b) {
			return b.toString(36);
		})
		.join("")
		.slice(0, 10);
}

window.fetchInvitesInitial = async function () {
	if (!window.supabase || !window.activeMasterContext) return;

	var { data, error } = await window.supabase
		.from("invites")
		.select("*")
		.eq("master_username", window.activeMasterContext)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching invites:", error);
		return;
	}

	window.invites = data || [];
};

/**
 * Generates a new invite link for the active group. Invites expire 7 days
 * after creation (a fixed default, not an admin-configurable setting).
 */
window.generateInvite = async function () {
	if (!window.isMaster()) {
		window.showNotification("Only a " + window.term("master") + " can generate invites.", "error");
		return;
	}

	var code = generateInviteCode();
	var expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

	var { error } = await window.supabase.from("invites").insert([
		{
			code: code,
			master_username: window.activeMasterContext,
			created_by: window.currentUser,
			status: "pending",
			expires_at: expiresAt,
		},
	]);

	if (error) {
		console.error("Error generating invite:", error);
		window.showNotification("Failed to generate invite.", "error");
		return;
	}

	await window.fetchInvitesInitial();
	if (window.renderInvitesList) window.renderInvitesList();
	window.showNotification("Invite link generated!", "success");
};

/**
 * Revokes a pending invite so it can no longer be redeemed.
 */
window.revokeInvite = async function (code) {
	var { error } = await window.supabase
		.from("invites")
		.update({ status: "revoked" })
		.eq("code", code)
		.eq("master_username", window.activeMasterContext)
		.eq("status", "pending");

	if (error) {
		console.error("Error revoking invite:", error);
		window.showNotification("Failed to revoke invite.", "error");
		return;
	}

	await window.fetchInvitesInitial();
	if (window.renderInvitesList) window.renderInvitesList();
	window.showNotification("Invite revoked.", "success");
};

/**
 * Builds the shareable invite URL for a given code.
 */
window.buildInviteLink = function (code) {
	return window.location.origin + window.location.pathname + "?invite=" + code;
};
