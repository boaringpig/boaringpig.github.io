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

	if (!app.isSlave || state.trackers.length === 0) return null;

	return (
		<div className={styles.banner}>
			<TrackerCard tracker={state.trackers[0]} isAdmin={false} />
		</div>
	);
}
