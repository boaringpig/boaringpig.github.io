// SavedPresetsList.jsx - a master's saved cost-tracker presets: "Use"
// prefills StartTrackerForm (via presetToApply) without starting anything,
// "Delete" removes it.
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";
import styles from "./SavedPresetsList.module.css";

export function SavedPresetsList({ presets, status, error, onReload, onUse, onDelete }) {
	return (
		<Card>
			<h3 className={styles.heading}>Saved Presets</h3>
			{status === "loading" ? <LoadingSpinner label="Loading presets..." /> : null}
			{status === "error" ? (
				<ErrorState
					message={"Couldn't load presets: " + (error ? error.message : "unknown error")}
					onRetry={onReload}
				/>
			) : null}
			{status === "ready" && presets.length === 0 ? (
				<EmptyState title="No saved presets yet" hint="Save one while starting a tracker below." />
			) : null}
			{status === "ready"
				? presets.map(function (preset) {
						return (
							<div key={preset.id} className={styles.row}>
								<div>
									<strong>{preset.name}</strong>
									<div className={styles.meta}>
										{preset.currency}
										{Number(preset.rate).toFixed(2)} per{" "}
										{preset.increment_interval === 1000
											? "second"
											: preset.increment_interval === 3600000
											? "hour"
											: "minute"}
										{preset.description ? " · " + preset.description : ""}
									</div>
								</div>
								<div className={styles.actions}>
									<Button variant="secondary" onClick={function () { onUse(preset); }}>
										Use
									</Button>
									<Button variant="danger" onClick={function () { onDelete(preset.id); }}>
										Delete
									</Button>
								</div>
							</div>
						);
				  })
				: null}
		</Card>
	);
}
