// TasksPage.jsx - the Tasks tab. Master sees a create-task form plus
// pending-appeals / pending-approval / all-tasks groupings (like
// js/ui-tasks.js#renderAdminView); a slave sees only tasks assigned to them.
import { useApp } from "../../context/AppContext";
import { useTasks } from "../../hooks/useTasks";
import { useMySharedTaskIds } from "../../hooks/useMySharedTaskIds";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { Card } from "../common/Card";
import styles from "./TasksPage.module.css";

export function TasksPage() {
	var app = useApp();
	var tasksState = useTasks();
	var sharedIds = useMySharedTaskIds();

	var actions = {
		checkOffTask: tasksState.checkOffTask,
		approveTask: tasksState.approveTask,
		rejectTask: tasksState.rejectTask,
		deleteTask: tasksState.deleteTask,
		acceptDemerit: tasksState.acceptDemerit,
		appealDemerit: tasksState.appealDemerit,
		approveAppeal: tasksState.approveAppeal,
		denyAppeal: tasksState.denyAppeal,
		markInvoiceAsPaid: tasksState.markInvoiceAsPaid,
		approveInvoice: tasksState.approveInvoice,
	};

	if (app.isSlave) {
		var myTasks = tasksState.tasks.filter(function (t) {
			return t.assignedTo === app.currentUser || sharedIds.includes(t.id);
		});
		return (
			<TaskList
				tasks={myTasks}
				status={tasksState.status}
				error={tasksState.error}
				onRetry={tasksState.reload}
				actions={actions}
				emptyLabel={"No tasks assigned to you yet."}
			/>
		);
	}

	var pendingAppeals = tasksState.tasks.filter(function (t) {
		return t.type === "demerit" && t.appealStatus === "pending";
	});
	var pendingApproval = tasksState.tasks.filter(function (t) {
		return t.status === "pending_approval";
	});

	return (
		<div>
			<TaskForm onCreated={tasksState.reload} />

			{pendingAppeals.length > 0 ? (
				<Card className={styles.section}>
					<h2 className={styles.heading}>Pending Appeals</h2>
					<TaskList
						tasks={pendingAppeals}
						status="ready"
						actions={actions}
						emptyLabel="No appeals pending"
					/>
				</Card>
			) : null}

			{pendingApproval.length > 0 ? (
				<Card className={styles.section}>
					<h2 className={styles.heading}>Pending Approval</h2>
					<TaskList
						tasks={pendingApproval}
						status="ready"
						actions={actions}
						emptyLabel="Nothing pending"
					/>
				</Card>
			) : null}

			<Card className={styles.section}>
				<h2 className={styles.heading}>All Tasks</h2>
				<TaskList
					tasks={tasksState.tasks}
					status={tasksState.status}
					error={tasksState.error}
					onRetry={tasksState.reload}
					actions={actions}
					emptyLabel="No tasks created yet"
				/>
			</Card>
		</div>
	);
}
