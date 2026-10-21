// MasterOverviewPage.jsx - master-only "at a glance" page: active cost
// trackers, invoices awaiting approval, and a clickable grid of every
// slave's current status. Pure composition over hooks that already exist
// elsewhere (useSlaves/useCostTrackers/useTasks/useSuggestions/useActivity)
// -- no new backend queries.
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useSlaves } from "../../hooks/useSlaves";
import { useCostTrackers } from "../../hooks/useCostTrackers";
import { useTasks } from "../../hooks/useTasks";
import { useSuggestions } from "../../hooks/useSuggestions";
import { useActivity } from "../../hooks/useActivity";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { EmptyState } from "../common/EmptyState";
import { TrackerCard } from "../costTrackers/TrackerCard";
import { SlaveOverviewCard } from "./SlaveOverviewCard";
import { SlaveDetailModal } from "./SlaveDetailModal";
import styles from "./MasterOverviewPage.module.css";

export function MasterOverviewPage() {
	var app = useApp();
	var slavesState = useSlaves();
	var trackersState = useCostTrackers();
	var tasksState = useTasks();
	var suggestionsState = useSuggestions();
	var activityState = useActivity();
	var [selectedUsername, setSelectedUsername] = useState(null);

	var pendingInvoices = tasksState.tasks.filter(function (t) {
		return t.type === "cost-tracker" && t.status === "pending_approval";
	});

	function isOnline(username) {
		var last = activityState.activity.find(function (a) {
			return a.user === username;
		});
		return !!(last && last.action === "login");
	}

	// Mirrors js/ui-dashboard.js's renderUserProgress completion-rate formula
	// exactly, for consistency with the numbers shown elsewhere in the app.
	function completionRateFor(username) {
		var userTasks = tasksState.tasks.filter(function (t) {
			return t.assignedTo === username && t.type !== "demerit";
		});
		if (userTasks.length === 0) return 0;
		var completed = userTasks.filter(function (t) {
			return t.status === "completed";
		});
		return Math.round((completed.length / userTasks.length) * 100);
	}

	function pendingCountFor(username) {
		var pendingSuggestions = suggestionsState.suggestions.filter(function (s) {
			return s.suggestedBy === username && s.status === "pending";
		}).length;
		var pendingAppeals = tasksState.tasks.filter(function (t) {
			return t.assignedTo === username && t.appealStatus === "pending";
		}).length;
		return pendingSuggestions + pendingAppeals;
	}

	function trackerFor(username) {
		return trackersState.trackers.find(function (t) {
			return Array.isArray(t.assigned_to) && t.assigned_to.includes(username);
		});
	}

	var selectedSlave = selectedUsername
		? slavesState.slaves.find(function (s) {
				return s.username === selectedUsername;
		  })
		: null;

	return (
		<div>
			<Card className={styles.section}>
				<h2 className={styles.heading}>Active Cost Trackers</h2>
				{trackersState.trackers.length === 0 ? (
					<EmptyState title="No active cost trackers" />
				) : (
					trackersState.trackers.map(function (tracker) {
						return (
							<TrackerCard
								key={tracker.id}
								tracker={tracker}
								isAdmin
								onStop={trackersState.stopTracker}
								onDelete={trackersState.deleteTracker}
								onAddPenalty={trackersState.addPenalty}
								onRemovePenalty={trackersState.removePenalty}
							/>
						);
					})
				)}
			</Card>

			<Card className={styles.section}>
				<h2 className={styles.heading}>Invoices Awaiting Approval</h2>
				{pendingInvoices.length === 0 ? (
					<EmptyState title="No invoices awaiting approval" />
				) : (
					<ul className={styles.invoiceList}>
						{pendingInvoices.map(function (task) {
							return (
								<li key={task.id} className={styles.invoiceItem}>
									<span>{task.text.split("\n")[0]}</span>
									<Button
										onClick={function () {
											tasksState.approveInvoice(task.id);
										}}
									>
										Approve
									</Button>
								</li>
							);
						})}
					</ul>
				)}
			</Card>

			<h2 className={styles.heading}>{app.groupTerms.slaveLabelPlural}</h2>
			{slavesState.slaves.length === 0 ? (
				<EmptyState
					title={"No " + app.groupTerms.slaveLabelPlural + " added yet"}
				/>
			) : (
				<div className={styles.grid}>
					{slavesState.slaves.map(function (slave) {
						return (
							<SlaveOverviewCard
								key={slave.username}
								slave={slave}
								online={isOnline(slave.username)}
								tracker={trackerFor(slave.username)}
								pendingCount={pendingCountFor(slave.username)}
								completionRate={completionRateFor(slave.username)}
								onClick={function () {
									setSelectedUsername(slave.username);
								}}
							/>
						);
					})}
				</div>
			)}

			{selectedSlave ? (
				<SlaveDetailModal
					slave={selectedSlave}
					tasks={tasksState.tasks.filter(function (t) {
						return t.assignedTo === selectedSlave.username;
					})}
					suggestions={suggestionsState.suggestions.filter(function (s) {
						return s.suggestedBy === selectedSlave.username;
					})}
					tracker={trackerFor(selectedSlave.username)}
					onClose={function () {
						setSelectedUsername(null);
					}}
				/>
			) : null}
		</div>
	);
}
