// useInvites.js - a master's invite links for the active group. Reads
// through useRealtimeList (a plain, unmodified use of it -- invites don't
// need pagination); writes delegate to the classic window.* functions.
import { useCallback } from "react";
import { useApp } from "../context/AppContext";
import { useRealtimeList } from "./useRealtimeList";

function byCreatedAtDesc(a, b) {
	return new Date(b.created_at) - new Date(a.created_at);
}

export function useInvites() {
	var app = useApp();
	var list = useRealtimeList({
		table: "invites",
		masterUsername: app.activeMasterContext,
		sort: byCreatedAtDesc,
	});

	var generateInvite = useCallback(async function () {
		await window.generateInvite();
		list.reload();
	}, [list]);

	var revokeInvite = useCallback(
		async function (code) {
			await window.revokeInvite(code);
			list.reload();
		},
		[list]
	);

	return {
		invites: list.items,
		status: list.status,
		error: list.error,
		reload: list.reload,
		generateInvite: generateInvite,
		revokeInvite: revokeInvite,
	};
}
