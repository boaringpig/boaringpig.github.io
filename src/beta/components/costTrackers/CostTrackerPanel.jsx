// CostTrackerPanel.jsx - admin section of the Dashboard: start new trackers,
// see/stop/penalize the ones currently running.
import { useCostTrackers } from "../../hooks/useCostTrackers";
import { StartTrackerForm } from "./StartTrackerForm";
import { TrackerCard } from "./TrackerCard";
import { EmptyState } from "../common/EmptyState";
import styles from "./CostTrackerPanel.module.css";

export function CostTrackerPanel() {
	var state = useCostTrackers();

	return (
		<div>
			<StartTrackerForm onStart={state.startTracker} />
			<h3 className={styles.heading}>Active Cost Trackers</h3>
			{state.trackers.length === 0 ? (
				<EmptyState title="No active cost trackers" />
			) : (
				state.trackers.map(function (tracker) {
					return (
						<TrackerCard
							key={tracker.id}
							tracker={tracker}
							isAdmin
							onStop={state.stopTracker}
							onAddPenalty={state.addPenalty}
							onRemovePenalty={state.removePenalty}
						/>
					);
				})
			)}
		</div>
	);
}
