// StoppedTrackerHistory.jsx - recently stopped cost trackers (read-mostly;
// their financial record already lives independently as an invoice task,
// see js/database-cost-trackers.js's stopLiveCostTracker). Delete here just
// clears the row -- it never affects any invoice already created.
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { EmptyState } from "../common/EmptyState";
import styles from "./StoppedTrackerHistory.module.css";

function intervalLabel(ms) {
	if (ms === 1000) return "second";
	if (ms === 3600000) return "hour";
	return "minute";
}

export function StoppedTrackerHistory({ trackers, onDelete }) {
	return (
		<Card>
			<h3 className={styles.heading}>Recently Stopped</h3>
			{trackers.length === 0 ? (
				<EmptyState title="No stopped trackers yet" />
			) : (
				trackers.map(function (tracker) {
					return (
						<div key={tracker.id} className={styles.row}>
							<div>
								<strong>{tracker.description}</strong>
								<div className={styles.meta}>
									{tracker.currency}
									{Number(tracker.rate).toFixed(2)} per {intervalLabel(Number(tracker.increment_interval))}
									{" · stopped " + new Date(tracker.updated_at).toLocaleString()}
								</div>
							</div>
							<Button variant="secondary" onClick={function () { onDelete(tracker.id); }}>
								Delete
							</Button>
						</div>
					);
				})
			)}
		</Card>
	);
}
