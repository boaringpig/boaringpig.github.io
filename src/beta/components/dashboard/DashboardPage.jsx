// DashboardPage.jsx - master-only tab: stats, per-slave progress, points
// control, activity feed, and cost tracker administration.
import { useApp } from "../../context/AppContext";
import { useTasks } from "../../hooks/useTasks";
import { useSlaves } from "../../hooks/useSlaves";
import { useActivity } from "../../hooks/useActivity";
import { StatsRow } from "./StatsRow";
import { UserProgressList } from "./UserProgressList";
import { AdminPointsControl } from "./AdminPointsControl";
import { ActivityFeed } from "./ActivityFeed";
import { Card } from "../common/Card";
import { CostTrackerPanel } from "../costTrackers/CostTrackerPanel";
import styles from "./DashboardPage.module.css";

export function DashboardPage() {
	var app = useApp();
	var tasksState = useTasks();
	var slavesState = useSlaves();
	var activityState = useActivity();

	var tasks = tasksState.tasks;
	var stats = [
		{ label: "Total Tasks", value: tasks.length },
		{
			label: "Pending",
			value: tasks.filter(function (t) {
				return t.status === "pending_approval";
			}).length,
		},
		{
			label: "Completed",
			value: tasks.filter(function (t) {
				return t.status === "completed";
			}).length,
		},
		{ label: app.groupTerms.slaveLabelPlural, value: slavesState.slaves.length },
	];

	return (
		<div>
			<StatsRow stats={stats} />

			<div className={styles.grid}>
				<Card className={styles.section}>
					<h2 className={styles.heading}>{app.groupTerms.slaveLabel} Progress</h2>
					<UserProgressList slaves={slavesState.slaves} />
				</Card>

				<AdminPointsControl slaves={slavesState.slaves} />
			</div>

			<Card className={styles.section}>
				<h2 className={styles.heading}>Recent Activity</h2>
				<ActivityFeed
					activity={activityState.activity}
					status={activityState.status}
					error={activityState.error}
					onRetry={activityState.reload}
				/>
			</Card>

			<Card className={styles.section}>
				<CostTrackerPanel />
			</Card>
		</div>
	);
}
