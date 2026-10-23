// beta-toggle.js
// Mounts/unmounts the React beta dashboard (src/beta/) into #betaRoot.
// Classic code never imports React directly - it only knows about one DOM
// container (#betaRoot) and two functions (enterBetaMode/exitBetaMode).
// Beta is the only UI now (classic's own view markup was removed); these
// two functions exist purely to lazy-load the bundle on first login and to
// tear the React tree down again on logout.

var betaMountFn = null;
var betaUnmountFn = null;
var betaMounted = false;

/**
 * Mounts the React beta dashboard into #betaRoot. Lazily loads the React
 * bundle on first use.
 */
window.enterBetaMode = async function () {
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
		var mod = await import("../../beta-dist/beta-bundle.js");
		betaMountFn = mod.mountBetaApp;
		betaUnmountFn = mod.unmountBetaApp;
	}

	betaRoot.style.display = "block";
	betaMountFn(betaRoot);
	betaMounted = true;
};

/**
 * Tears down the React tree and hides #betaRoot. Called from
 * window.logout() before the login screen is shown again -- not a
 * user-facing "switch to classic" action (there's no classic UI left to
 * switch to).
 */
window.exitBetaMode = function () {
	var betaRoot = document.getElementById("betaRoot");

	if (betaMounted && betaUnmountFn) {
		betaUnmountFn();
		betaMounted = false;
	}
	if (betaRoot) betaRoot.style.display = "none";
};

/**
 * Called once after login/showMainApp has finished. Beta is the only UI,
 * so this always mounts it.
 */
window.maybeAutoEnterBetaMode = async function () {
	await window.enterBetaMode();
};
