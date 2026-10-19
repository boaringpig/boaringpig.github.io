// AppContext.jsx
//
// WHAT THIS FILE IS: a React Context - a way to make a few pieces of data
// (who's logged in, what group they're viewing, what theme to use) available
// to any component in the tree without passing them down as props through
// every layer ("prop drilling"). If you're new to React: think of it as a
// small global store that any component can read with `useApp()` below.
//
// WHERE THE DATA COMES FROM: this app does NOT have its own login screen.
// The classic app (see js/auth.js) already logged the user in and set a
// handful of `window.*` globals (window.currentUser, window.activeMasterContext,
// window.groupTerms, window.groupTheme - all defined in js/database-pigs.js
// and js/terminology.js) before the "Try Beta Dashboard" button was even
// shown. This context just reads those globals once on mount and re-reads
// them whenever something changes them (e.g. switching which group a shared
// slave is viewing).

import { createContext, useContext, useMemo, useState, useCallback } from "react";

const AppContext = createContext(null);

function snapshotFromWindow() {
	var user = window.users[window.currentUser] || {};
	return {
		currentUser: window.currentUser,
		displayName: user.displayName || window.currentUser,
		statusMessage: user.statusMessage || "",
		isMaster: window.isMaster(),
		isSlave: window.isSlave(),
		isAdmin: window.isAdmin(),
		activeMasterContext: window.activeMasterContext,
		myMasterOptions: (window.myMasterOptions || []).slice(),
		groupTerms: Object.assign({}, window.groupTerms),
		theme: {
			bg: window.groupTheme.bg,
			card: window.groupTheme.card,
			elevated: window.groupTheme.elevated,
			textPrimary: window.groupTheme.textPrimary,
			textSecondary: window.groupTheme.textSecondary,
		},
	};
}

export function AppProvider({ children }) {
	const [snapshot, setSnapshot] = useState(snapshotFromWindow);

	// Call this after anything that changes the window.* globals (switching
	// group context, terminology being edited, etc.) so React re-renders
	// with the new values.
	const refresh = useCallback(function () {
		setSnapshot(snapshotFromWindow());
	}, []);

	const switchGroup = useCallback(
		async function (masterUsername) {
			await window.setActiveMasterContext(masterUsername);
			refresh();
		},
		[refresh]
	);

	const exitBeta = useCallback(function () {
		window.exitBetaMode();
	}, []);

	const value = useMemo(
		function () {
			return Object.assign({}, snapshot, {
				refresh: refresh,
				switchGroup: switchGroup,
				exitBeta: exitBeta,
			});
		},
		[snapshot, refresh, switchGroup, exitBeta]
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * Hook for reading the shared app state from any component:
 *
 *   const { currentUser, isMaster, groupTerms, theme } = useApp();
 */
export function useApp() {
	const ctx = useContext(AppContext);
	if (!ctx) {
		throw new Error("useApp() must be called inside <AppProvider>");
	}
	return ctx;
}
