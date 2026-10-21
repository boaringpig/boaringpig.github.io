// useCostTrackerPresets.js - a master's saved cost-tracker presets for the
// active group. Reads through useRealtimeList unmodified; writes delegate
// to the classic window.* functions, same pattern as useInvites.js.
import { useCallback } from "react";
import { useApp } from "../context/AppContext";
import { useRealtimeList } from "./useRealtimeList";

function byNameAsc(a, b) {
	return a.name.localeCompare(b.name);
}

export function useCostTrackerPresets() {
	var app = useApp();
	var list = useRealtimeList({
		table: "saved_cost_tracker_presets",
		masterUsername: app.activeMasterContext,
		sort: byNameAsc,
	});

	var savePreset = useCallback(
		async function (preset) {
			var id = await window.saveCostTrackerPreset(preset);
			list.reload();
			return id;
		},
		[list]
	);

	var deletePreset = useCallback(
		async function (id) {
			await window.deleteCostTrackerPreset(id);
			list.reload();
		},
		[list]
	);

	return {
		presets: list.items,
		status: list.status,
		error: list.error,
		reload: list.reload,
		savePreset: savePreset,
		deletePreset: deletePreset,
	};
}
