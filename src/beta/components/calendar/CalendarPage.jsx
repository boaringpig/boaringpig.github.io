// CalendarPage.jsx - a lightweight "Calendar" tab: tasks with a due date,
// grouped by day. The classic app uses the FullCalendar library for a full
// month-grid view; we deliberately didn't pull that (or any calendar
// library) into the beta bundle to keep it dependency-light - see
// src/beta/README.md's "Why an agenda list, not a calendar grid" note.
import { useApp } from "../../context/AppContext";
import { useTasks } from "../../hooks/useTasks";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { taskStatusLabel, taskStatusTone } from "../../utils/taskStatus";
import styles from "./CalendarPage.module.css";

function dayKey(dateString) {
	return new Date(dateString).toLocaleDateString(undefined, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function CalendarPage() {
	var app = useApp();
	var state = useTasks();

	if (state.status === "loading") return <LoadingSpinner label="Loading tasks..." />;
	if (state.status === "error") {
		return (
			<ErrorState message={state.error ? state.error.message : ""} onRetry={state.reload} />
		);
	}

	var relevant = state.tasks.filter(function (t) {
		if (!t.dueDate) return false;
		if (app.isSlave) return t.assignedTo === app.currentUser;
		return true;
	});

	if (relevant.length === 0) {
		return <EmptyState title="No upcoming due dates" />;
	}

	var groups = {};
	relevant
		.slice()
		.sort(function (a, b) {
			return new Date(a.dueDate) - new Date(b.dueDate);
		})
		.forEach(function (task) {
			var key = dayKey(task.dueDate);
			groups[key] = groups[key] || [];
			groups[key].push(task);
		});

	return (
		<div>
			{Object.keys(groups).map(function (day) {
				return (
					<section key={day} className={styles.day}>
						<h3 className={styles.dayHeading}>{day}</h3>
						{groups[day].map(function (task) {
							var assignee = window.users[task.assignedTo];
							return (
								<Card key={task.id} className={styles.item}>
									<Badge tone={taskStatusTone(task)}>{taskStatusLabel(task)}</Badge>
									<p className={styles.text}>{task.text}</p>
									{!app.isSlave && task.assignedTo ? (
										<p className={styles.meta}>
											Assigned to {assignee ? assignee.displayName : task.assignedTo}
										</p>
									) : null}
									<p className={styles.meta}>Due {window.formatDate(task.dueDate)}</p>
								</Card>
							);
						})}
					</section>
				);
			})}
		</div>
	);
}
