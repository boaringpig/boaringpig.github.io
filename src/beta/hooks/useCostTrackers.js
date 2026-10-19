// useCostTrackers.js
import { useApp } from "../context/AppContext";
import { useRealtimeList } from "./useRealtimeList";

function byStartedAtDesc(a, b) {
	return new Date(b.started_at) - new Date(a.started_at);
}

export function useCostTrackers() {
	var app = useApp();
	var list = useRealtimeList({
		table: "active_cost_trackers",
		masterUsername: app.activeMasterContext,
		sort: byStartedAtDesc,
	});

	var running = list.items.filter(function (t) {
		return t.status === "running";
	});

	return {
		trackers: running,
		status: list.status,
		error: list.error,
		reload: list.reload,

		startTracker: function (description, rate, currency, incrementInterval, initialPenalties) {
			return window.startLiveCostTracker(
				description,
				rate,
				currency,
				incrementInterval,
				initialPenalties
			);
		},
		stopTracker: function (trackerId, createInvoice) {
			return window.stopLiveCostTracker(trackerId, createInvoice !== false);
		},
		addPenalty: function (trackerId, description, amount) {
			return window.addPenaltyToLiveTracker(trackerId, description, amount);
		},
		removePenalty: function (trackerId, penaltyId) {
			return window.removePenaltyFromLiveTracker(trackerId, penaltyId);
		},
	};
}
