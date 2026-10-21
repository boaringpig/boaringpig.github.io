// useSavedSpirals.js - a master's saved spiral-generator configs for the
// active group. Same read-through-useRealtimeList, write-through-window.*
// pattern as useCostTrackerPresets.js/useInvites.js.
import { useCallback } from "react";
import { useApp } from "../context/AppContext";
import { useRealtimeList } from "./useRealtimeList";

function byUpdatedAtDesc(a, b) {
	return new Date(b.updated_at) - new Date(a.updated_at);
}

export function useSavedSpirals() {
	var app = useApp();
	var list = useRealtimeList({
		table: "saved_spirals",
		masterUsername: app.activeMasterContext,
		sort: byUpdatedAtDesc,
	});

	var saveSpiral = useCallback(
		async function (saved) {
			var id = await window.saveSpiralToLibrary(saved);
			list.reload();
			return id;
		},
		[list]
	);

	var deleteSpiral = useCallback(
		async function (id) {
			await window.deleteSavedSpiral(id);
			list.reload();
		},
		[list]
	);

	return {
		savedSpirals: list.items,
		status: list.status,
		error: list.error,
		reload: list.reload,
		saveSpiral: saveSpiral,
		deleteSpiral: deleteSpiral,
	};
}
