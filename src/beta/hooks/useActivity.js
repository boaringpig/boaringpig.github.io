// useActivity.js - the recent user-activity feed shown on the dashboard.
import { useApp } from "../context/AppContext";
import { useRealtimeList } from "./useRealtimeList";

function byTimestampDesc(a, b) {
	return new Date(b.timestamp) - new Date(a.timestamp);
}

export function useActivity() {
	var app = useApp();
	var list = useRealtimeList({
		table: "userActivity",
		masterUsername: app.activeMasterContext,
		sort: byTimestampDesc,
	});

	return {
		activity: list.items.slice(0, 50),
		status: list.status,
		error: list.error,
		reload: list.reload,
	};
}
