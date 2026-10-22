// beta-toggle.js
// Glue between the classic vanilla-JS app and the React beta dashboard
// (src/beta/). Classic code never imports React directly - it only knows
// about two DOM containers (#mainApp, #betaRoot) and two functions
// (enterBetaMode/exitBetaMode). The React bundle is downloaded via a
// dynamic import() the first time enterBetaMode runs -- which, since beta
// is the default UI, is normally right after login -- so a group locked to
// classic (classicUiForced) or a user who's switched back to classic
// styling never pays for it.

var betaMountFn = null;
var betaUnmountFn = null;
var betaMounted = false;

/**
 * Switches the page over to the React beta dashboard. Lazily loads the
 * React bundle on first use.
 */
window.enterBetaMode = async function () {
	if (window.groupTheme.classicUiForced) {
		window.showNotification(
			"This group is set to classic styling only.",
			"error"
		);
		return;
	}

	var mainApp = document.getElementById("mainApp");
	var betaRoot = document.getElementById("betaRoot");
	if (!betaRoot) return;

	if (!betaMountFn) {
		// Loads the pre-built bundle in beta-dist/ (run `npm run build:beta`
		// to regenerate it after any change under src/beta/), not the raw
		// .jsx source -- GitHub Pages serves this repo's files as-is, with no
		// build step, and a browser can neither parse JSX syntax nor resolve
		// a bare specifier like `import ... from "react"` on its own.
		if (!document.getElementById("betaBundleStyles")) {
			var link = document.createElement("link");
			link.id = "betaBundleStyles";
			link.rel = "stylesheet";
			link.href = "beta-dist/beta-bundle.css";
			document.head.appendChild(link);
		}
		var mod = await import("../beta-dist/beta-bundle.js");
		betaMountFn = mod.mountBetaApp;
		betaUnmountFn = mod.unmountBetaApp;
	}

	if (mainApp) mainApp.style.display = "none";
	betaRoot.style.display = "block";
	betaMountFn(betaRoot);
	betaMounted = true;

	try {
		localStorage.setItem("preferBetaUi", "1");
	} catch (e) {
		// Ignore storage errors (private browsing, etc.) - this is just a
		// convenience default for next login, not required for correctness.
	}
};

/**
 * Switches back to the classic UI.
 */
window.exitBetaMode = function () {
	var mainApp = document.getElementById("mainApp");
	var betaRoot = document.getElementById("betaRoot");

	if (betaMounted && betaUnmountFn) {
		betaUnmountFn();
		betaMounted = false;
	}
	if (betaRoot) betaRoot.style.display = "none";
	if (mainApp) mainApp.style.display = "block";

	try {
		localStorage.setItem("preferBetaUi", "0");
	} catch (e) {
		// See note in enterBetaMode.
	}
};

/**
 * Called once after login/showMainApp has finished setting up the classic
 * UI. Beta is the default now: jumps straight into it unless this group is
 * locked to classic, or this browser previously chose classic explicitly
 * (exitBetaMode sets preferBetaUi="0", which is the only opt-out signal --
 * anything else, including no preference at all, means "use beta").
 */
window.maybeAutoEnterBetaMode = async function () {
	if (window.groupTheme.classicUiForced) return;

	var preferred = null;
	try {
		preferred = localStorage.getItem("preferBetaUi");
	} catch (e) {
		preferred = null;
	}
	if (preferred === "0") return;

	await window.enterBetaMode();
};
