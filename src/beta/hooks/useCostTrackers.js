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
	// useRealtimeList fetches every row for the group regardless of status --
	// only the `running` filter above is new-vs-old; derive a stopped history
	// from the same list/subscription rather than opening a second one.
	var stopped = list.items
		.filter(function (t) {
			return t.status === "stopped";
		})
		.sort(function (a, b) {
			return new Date(b.updated_at) - new Date(a.updated_at);
		})
		.slice(0, 20);

	return {
		trackers: running,
		stoppedTrackers: stopped,
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
		deleteTracker: function (trackerId) {
			return window.deleteCostTracker(trackerId);
		},
		addPenalty: function (trackerId, description, amount) {
			return window.addPenaltyToLiveTracker(trackerId, description, amount);
		},
		removePenalty: function (trackerId, penaltyId) {
			return window.removePenaltyFromLiveTracker(trackerId, penaltyId);
		},
	};
}
