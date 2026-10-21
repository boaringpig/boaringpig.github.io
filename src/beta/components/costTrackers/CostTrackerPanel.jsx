// CostTrackerPanel.jsx - the full cost-tracker experience for the Tools
// page: start new trackers (optionally saving/reusing a preset), see/stop
// /delete/penalize ones currently running, and a small history of recently
// stopped ones (also deletable).
import { useState } from "react";
import { useCostTrackers } from "../../hooks/useCostTrackers";
import { useCostTrackerPresets } from "../../hooks/useCostTrackerPresets";
import { StartTrackerForm } from "./StartTrackerForm";
import { SavedPresetsList } from "./SavedPresetsList";
import { TrackerCard } from "./TrackerCard";
import { StoppedTrackerHistory } from "./StoppedTrackerHistory";
import { EmptyState } from "../common/EmptyState";
import styles from "./CostTrackerPanel.module.css";

export function CostTrackerPanel() {
	var state = useCostTrackers();
	var presets = useCostTrackerPresets();
	var [presetToApply, setPresetToApply] = useState(null);

	return (
		<div>
			<StartTrackerForm
				onStart={state.startTracker}
				onSavePreset={presets.savePreset}
				presetToApply={presetToApply}
			/>

			<SavedPresetsList
				presets={presets.presets}
				status={presets.status}
				error={presets.error}
				onReload={presets.reload}
				onUse={setPresetToApply}
				onDelete={presets.deletePreset}
			/>

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
							onDelete={state.deleteTracker}
							onAddPenalty={state.addPenalty}
							onRemovePenalty={state.removePenalty}
						/>
					);
				})
			)}

			<StoppedTrackerHistory
				trackers={state.stoppedTrackers}
				onDelete={state.deleteTracker}
			/>
		</div>
	);
}
