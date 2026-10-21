// SlaveDetailModal.jsx - "click in for full detail" from the Master Overview
// grid. Pure composition: every list here is a filtered view of data the
// Overview page already fetched (tasks/suggestions/tracker), no new queries.
import { Modal } from "../common/Modal";
import { EmptyState } from "../common/EmptyState";
import { TrackerCard } from "../costTrackers/TrackerCard";
import styles from "./SlaveDetailModal.module.css";

export function SlaveDetailModal({
	slave,
	tasks,
	suggestions,
	tracker,
	onClose,
}) {
	var pendingTasks = tasks.filter(function (t) {
		return t.status === "todo" || t.status === "pending_approval";
	});
	var completedTasks = tasks.filter(function (t) {
		return t.status === "completed";
	});
	var pendingSuggestions = suggestions.filter(function (s) {
		return s.status === "pending";
	});

	return (
		<Modal title={slave.displayName} onClose={onClose}>
			{tracker ? (
				<div className={styles.section}>
					<h4 className={styles.heading}>Active Cost Tracker</h4>
					<TrackerCard tracker={tracker} isAdmin={false} />
				</div>
			) : null}

			<div className={styles.section}>
				<h4 className={styles.heading}>
					Tasks ({completedTasks.length}/{tasks.length} completed)
				</h4>
				{pendingTasks.length === 0 ? (
					<EmptyState title="No pending tasks" />
				) : (
					<ul className={styles.list}>
						{pendingTasks.map(function (task) {
							return (
								<li key={task.id} className={styles.listItem}>
									{task.text.split("\n")[0]}
									<span className={styles.status}>{task.status}</span>
								</li>
							);
						})}
					</ul>
				)}
			</div>

			<div className={styles.section}>
				<h4 className={styles.heading}>Pending Suggestions</h4>
				{pendingSuggestions.length === 0 ? (
					<EmptyState title="No pending suggestions" />
				) : (
					<ul className={styles.list}>
						{pendingSuggestions.map(function (s) {
							return (
								<li key={s.id} className={styles.listItem}>
									{s.description}
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</Modal>
	);
}
