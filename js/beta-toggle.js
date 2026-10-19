// beta-toggle.js
// Glue between the classic vanilla-JS app and the React beta dashboard
// (src/beta/). Classic code never imports React directly - it only knows
// about two DOM containers (#mainApp, #betaRoot) and two functions
// (enterBetaMode/exitBetaMode). The React bundle itself is only downloaded
// the first time someone actually clicks into the beta, via a dynamic
// import() - so nobody pays for React unless their group has it enabled.

var betaMountFn = null;
var betaUnmountFn = null;
var betaMounted = false;

/**
 * Shows/hides the "Try Beta Dashboard" button based on whether the active
 * group has opted in (window.groupTheme.betaUiEnabled, loaded by
 * js/terminology.js's loadGroupTerms). Called after every login and group
 * context switch.
 */
window.renderBetaToggleButton = function () {
	var button = document.getElementById("betaToggleButton");
	if (!button) return;
	button.style.display = window.groupTheme.betaUiEnabled ? "inline-block" : "none";
};

/**
 * Switches the page over to the React beta dashboard. Lazily loads the
 * React bundle on first use.
 */
window.enterBetaMode = async function () {
	if (!window.groupTheme.betaUiEnabled) {
		window.showNotification(
			"The beta dashboard isn't enabled for this group yet.",
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
 * UI. If this group has the beta enabled AND the user previously chose it,
 * jump straight into beta mode instead of showing classic first.
 */
window.maybeAutoEnterBetaMode = async function () {
	var preferred = null;
	try {
		preferred = localStorage.getItem("preferBetaUi");
	} catch (e) {
		preferred = null;
	}
	if (preferred === "1" && window.groupTheme.betaUiEnabled) {
		await window.enterBetaMode();
	}
};
