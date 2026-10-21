// LiveTrackerBanner.jsx - a slave-facing, always-visible (any tab) banner
// showing a running cost tracker, mirroring the classic app's floating
// #liveCostTracker widget.
import { useApp } from "../../context/AppContext";
import { useCostTrackers } from "../../hooks/useCostTrackers";
import { TrackerCard } from "./TrackerCard";
import styles from "./LiveTrackerBanner.module.css";

export function LiveTrackerBanner() {
	var app = useApp();
	var state = useCostTrackers();

	if (!app.isSlave) return null;

	// A tracker is only ever visible to the pig(s) it names in `assigned_to`
	// -- it never broadcasts to every slave in the group just because a
	// master started it.
	var myTracker = state.trackers.find(function (t) {
		return Array.isArray(t.assigned_to) && t.assigned_to.includes(app.currentUser);
	});
	if (!myTracker) return null;

	return (
		<div className={styles.banner}>
			<TrackerCard tracker={myTracker} isAdmin={false} />
		</div>
	);
}
