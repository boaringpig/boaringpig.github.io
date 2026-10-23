// site-settings.js
// Site-wide branding strings (browser tab title, login screen heading) --
// unlike group_settings, these show before any user is logged in (no group
// context exists yet), so they're a single shared row, admin-only to edit
// (see src/beta/components/admin/SiteSettingsForm.jsx, mounted on the
// admin-only Masters tab). The app header subtitle is a separate, per-group
// setting -- see js/theming/terminology.js's groupTerms.appSubtitle.
// Defaults here match index.html's static <title>/#loginTitle text, so
// there's no flash of different text before loadSiteSettings() resolves.

var SITE_SETTINGS_DEFAULTS = {
	pageTitle: "TPF - Management Tool",
	loginHeading: "Management Tool Login",
};

window.siteSettings = Object.assign({}, SITE_SETTINGS_DEFAULTS);

function applySiteSettingsToDom() {
	document.title = window.siteSettings.pageTitle;
	var loginTitleEl = document.getElementById("loginTitle");
	if (loginTitleEl) loginTitleEl.textContent = window.siteSettings.loginHeading;
}

/**
 * Fetches the shared site_settings row and applies it to the document
 * title and login heading. Falls back to SITE_SETTINGS_DEFAULTS (already
 * applied as window.siteSettings's initial value) if the table is empty
 * or unreachable.
 */
window.loadSiteSettings = async function () {
	if (!window.supabase) return;

	var { data, error } = await window.supabase
		.from("site_settings")
		.select("*")
		.eq("id", 1)
		.limit(1);

	if (error) {
		console.error("Error loading site settings:", error);
	} else if (data && data.length > 0) {
		window.siteSettings = {
			pageTitle: data[0].page_title || SITE_SETTINGS_DEFAULTS.pageTitle,
			loginHeading:
				data[0].login_heading || SITE_SETTINGS_DEFAULTS.loginHeading,
		};
	}

	applySiteSettingsToDom();
};

/**
 * Saves new site-wide branding strings. Updates window.siteSettings and the
 * DOM immediately so the current tab reflects the change without a reload.
 */
window.updateSiteSettings = async function (updates) {
	var next = {
		pageTitle: updates.pageTitle || SITE_SETTINGS_DEFAULTS.pageTitle,
		loginHeading: updates.loginHeading || SITE_SETTINGS_DEFAULTS.loginHeading,
	};

	var { error } = await window.supabase.from("site_settings").upsert(
		[
			{
				id: 1,
				page_title: next.pageTitle,
				login_heading: next.loginHeading,
				updated_at: new Date().toISOString(),
				updated_by: window.currentUser,
			},
		],
		{ onConflict: "id" }
	);

	if (error) {
		console.error("Error updating site settings:", error);
		window.showNotification("Failed to update site settings", "error");
		return { error: error };
	}

	window.siteSettings = next;
	applySiteSettingsToDom();
	window.showNotification("Site settings updated");
	if (window.logUserActivity) {
		window.logUserActivity("updated site settings");
	}
	return { error: null };
};
