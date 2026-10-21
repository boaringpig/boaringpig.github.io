// apply-theme.js
// Light/dark toggle + per-group color application for the classic app.
// Mirrors what src/beta/App.jsx does for the beta dashboard (apply the
// active group's 5 colors as CSS custom properties), but classic never did
// this before -- it was always just the static styles/green.css palette.
// Pre-login (the login/invite-signup screens), there's no group to read
// colors from yet, so only the light/dark mode itself applies, using
// styles/theme.css's fixed defaults.

/**
 * Applies the active group's colors (dark or light set, chosen by the
 * current theme mode) as --color-* overrides on :root. If no group is
 * known yet (pre-login), this is a no-op -- theme.css's own :root /
 * :root[data-theme="light"] defaults already apply.
 */
window.applyThemeColors = function () {
	var theme = window.groupTheme;
	if (!theme || !theme.bg) return;

	var mode = window.themeMode || "dark";
	var isLight = mode === "light";

	var root = document.documentElement.style;
	root.setProperty("--color-bg", isLight ? theme.bgLight : theme.bg);
	root.setProperty("--color-card", isLight ? theme.cardLight : theme.card);
	root.setProperty("--color-elevated", isLight ? theme.elevatedLight : theme.elevated);
	root.setProperty("--color-text-primary", isLight ? theme.textPrimaryLight : theme.textPrimary);
	root.setProperty("--color-text-secondary", isLight ? theme.textSecondaryLight : theme.textSecondary);
};

/**
 * Switches light/dark mode: persists the choice, flips the attribute
 * theme.css keys its light-mode overrides off, re-applies the active
 * group's colors for the new mode, and tells React about it (beta's
 * AppContext listens for this instead of classic reaching into its
 * internals directly).
 */
window.setThemeMode = function (mode) {
	window.themeMode = mode;
	try {
		localStorage.setItem("themeMode", mode);
	} catch (e) {
		// Ignore storage errors (private browsing, etc.).
	}
	document.documentElement.dataset.theme = mode;
	window.applyThemeColors();
	window.renderThemeToggleButtons();
	window.dispatchEvent(new Event("theme-changed"));
};

window.toggleThemeMode = function () {
	window.setThemeMode(window.themeMode === "light" ? "dark" : "light");
};

/**
 * Updates the 🌙/☀️ toggle buttons' icon + label to reflect the current
 * mode (shows the mode you'd switch TO, matching common toggle UX).
 */
window.renderThemeToggleButtons = function () {
	["loginThemeToggleBtn", "mainThemeToggleBtn"].forEach(function (id) {
		var btn = document.getElementById(id);
		if (!btn) return;
		if (window.themeMode === "light") {
			btn.textContent = "🌙 Dark mode";
		} else {
			btn.textContent = "☀️ Light mode";
		}
	});
};

(function initThemeMode() {
	var stored = null;
	try {
		stored = localStorage.getItem("themeMode");
	} catch (e) {
		stored = null;
	}
	window.themeMode = stored === "light" ? "light" : "dark";
	document.documentElement.dataset.theme = window.themeMode;
})();

document.addEventListener("DOMContentLoaded", function () {
	window.renderThemeToggleButtons();
});
