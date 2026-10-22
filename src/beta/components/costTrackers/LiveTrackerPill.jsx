// LiveTrackerPill.jsx - a compact, always-visible-in-the-header indicator
// for the slave a cost tracker is assigned to: elapsed time + running cost,
// click to open the full read-only TrackerCard in a modal. Replaces the
// older full-size floating banner (LiveTrackerBanner) with something that
// fits in the header alongside the other top-of-page controls, per the
// "icon with value, clicking shows details" request.
import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { useCostTrackers } from "../../hooks/useCostTrackers";
import { Modal } from "../common/Modal";
import { TrackerCard } from "./TrackerCard";
import styles from "./LiveTrackerPill.module.css";

function computeTotal(tracker, now) {
	var elapsed = Math.max(0, now - new Date(tracker.started_at).getTime());
	var intervalMs = parseInt(tracker.increment_interval) || 60000;
	var rate = parseFloat(tracker.rate) || 0;
	var timeCost = (elapsed / intervalMs) * rate;

	var penalties = [];
	try {
		penalties = JSON.parse(tracker.penalties || "[]");
	} catch (e) {
		penalties = [];
	}
	var penaltyTotal = penalties.reduce(function (sum, p) {
		return sum + (parseFloat(p.amount) || 0);
	}, 0);

	var minutes = Math.floor(elapsed / 60000);
	var seconds = Math.floor((elapsed % 60000) / 1000);

	return {
		timeText: String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0"),
		total: timeCost + penaltyTotal,
	};
}

export function LiveTrackerPill() {
	var app = useApp();
	var state = useCostTrackers();
	var [now, setNow] = useState(Date.now());
	var [open, setOpen] = useState(false);

	var myTracker = state.trackers.find(function (t) {
		return Array.isArray(t.assigned_to) && t.assigned_to.includes(app.currentUser);
	});
	var myTrackerId = myTracker ? myTracker.id : null;

	useEffect(
		function () {
			if (!myTrackerId) return undefined;
			var id = window.setInterval(function () {
				setNow(Date.now());
			}, 1000);
			return function () {
				window.clearInterval(id);
			};
		},
		[myTrackerId]
	);

	if (!app.isSlave || !myTracker) return null;

	var totals = computeTotal(myTracker, now);

	return (
		<>
			<button
				type="button"
				className={styles.pill}
				onClick={function () {
					setOpen(true);
				}}
			>
				💰 {totals.timeText} · {myTracker.currency}
				{totals.total.toFixed(2)}
			</button>
			{open ? (
				<Modal
					title="Active Cost Tracker"
					onClose={function () {
						setOpen(false);
					}}
				>
					<TrackerCard tracker={myTracker} isAdmin={false} />
				</Modal>
			) : null}
		</>
	);
}
