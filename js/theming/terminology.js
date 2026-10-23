// terminology.js
// Per-group terminology: lets each master's group use its own collective noun
// (e.g. "polycule"/"drift"/"harem") and its own master/slave role labels
// instead of the generic "pig"/"Master" wording baked into the original UI.

window.groupTerms = {
	groupLabel: "Household",
	masterLabel: "Master",
	masterLabelPlural: "Masters",
	slaveLabel: "pig",
	slaveLabelPlural: "pigs",
	// Not a terminology word like the rest of this object, but the same
	// per-group row (group_settings) and the same "no group context yet"
	// non-issue as the others, so it lives here rather than its own global.
	// Shown under the group label in this group's header
	// (src/beta/components/layout/Header.jsx) -- edited alongside the
	// labels above in MasterEditForm.jsx.
	appSubtitle: "Management Tool",
};

// The React beta dashboard's theme for the active group -- beta is the
// only UI now. classicUiForced is read here for backward compatibility
// with the group_settings row shape but is no longer acted on anywhere
// (there's no classic UI left to force). The
// bg/card/elevated/textPrimary/textSecondary colors are admin-set per group
// (see src/beta/components/admin/MasterEditForm.jsx) and consumed by
// src/beta's AppContext.
window.groupTheme = {
	classicUiForced: false,
	bg: "#09090b",
	card: "#131316",
	elevated: "#1a1a20",
	textPrimary: "#fafafa",
	textSecondary: "#a1a1aa",
	bgLight: "#ffffff",
	cardLight: "#f4f4f5",
	elevatedLight: "#e4e4e7",
	textPrimaryLight: "#18181b",
	textSecondaryLight: "#52525b",
};

function capitalizeFirst(str) {
	if (!str) return str;
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Returns the raw term for the given key ("group", "master", "masterPlural",
 * "slave", "slavePlural") as configured for the active group.
 */
window.term = function (key) {
	var map = {
		group: window.groupTerms.groupLabel,
		master: window.groupTerms.masterLabel,
		masterPlural: window.groupTerms.masterLabelPlural,
		slave: window.groupTerms.slaveLabel,
		slavePlural: window.groupTerms.slaveLabelPlural,
	};
	return map[key] != null ? map[key] : key;
};

/**
 * Same as window.term, but with the first letter capitalized (for headers).
 */
window.termCap = function (key) {
	return capitalizeFirst(window.term(key));
};

/**
 * Loads the group_settings row for the currently active master context into
 * window.groupTerms, then re-applies terminology to the static UI chrome.
 */
window.loadGroupTerms = async function () {
	if (!window.supabase || !window.activeMasterContext) {
		return;
	}

	var { data, error } = await window.supabase
		.from("group_settings")
		.select("*")
		.eq("master_username", window.activeMasterContext)
		.limit(1);

	if (error) {
		console.error("Error loading group settings:", error);
	} else if (data && data.length > 0) {
		window.groupTerms = {
			groupLabel: data[0].group_label || "Household",
			masterLabel: data[0].master_label || "Master",
			masterLabelPlural: data[0].master_label_plural || "Masters",
			slaveLabel: data[0].slave_label || "pig",
			slaveLabelPlural: data[0].slave_label_plural || "pigs",
			appSubtitle: data[0].app_subtitle || "Management Tool",
		};
		window.groupTheme = {
			classicUiForced: !!data[0].classic_ui_forced,
			bg: data[0].theme_bg || "#09090b",
			card: data[0].theme_card || "#131316",
			elevated: data[0].theme_elevated || "#1a1a20",
			textPrimary: data[0].theme_text_primary || "#fafafa",
			textSecondary: data[0].theme_text_secondary || "#a1a1aa",
			bgLight: data[0].theme_bg_light || "#ffffff",
			cardLight: data[0].theme_card_light || "#f4f4f5",
			elevatedLight: data[0].theme_elevated_light || "#e4e4e7",
			textPrimaryLight: data[0].theme_text_primary_light || "#18181b",
			textSecondaryLight: data[0].theme_text_secondary_light || "#52525b",
		};
	}

	if (window.applyThemeColors) {
		window.applyThemeColors();
	}
};
