// TaskItem.jsx - one row in the task list. Which action buttons show up
// depends on role + the task's status/type, mirroring js/ui-tasks.js.
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { SpiralViewerModal } from "../spiral/SpiralViewerModal";
import { taskStatusLabel, taskStatusTone } from "../../utils/taskStatus";
import styles from "./TaskItem.module.css";

export function TaskItem({ task, actions }) {
	var app = useApp();
	var [viewingSpiral, setViewingSpiral] = useState(false);
	var assignee = window.users[task.assignedTo];
	var isCostTracker = task.type === "cost-tracker";
	var isSpiral = task.type === "spiral";
	var totalAmount = isCostTracker
		? window.extractTotalFromTaskText(task.text)
		: null;

	return (
		<Card className={styles.item}>
			<div className={styles.header}>
				<Badge tone={taskStatusTone(task)}>{taskStatusLabel(task)}</Badge>
				{task.type === "demerit" ? <Badge tone="danger">Demerit</Badge> : null}
			</div>

			<p className={styles.text}>
				{isCostTracker ? task.text.split("\n")[0] : task.text}
			</p>

			<dl className={styles.meta}>
				{task.assignedTo ? (
					<div>
						<dt>Assigned to</dt>
						<dd>{assignee ? assignee.displayName : task.assignedTo}</dd>
					</div>
				) : (
					<div>
						<dt>Assignment</dt>
						<dd>Shared</dd>
					</div>
				)}
				{!isCostTracker && task.points ? (
					<div>
						<dt>Points</dt>
						<dd>+{task.points}</dd>
					</div>
				) : null}
				{task.penaltyPoints ? (
					<div>
						<dt>Penalty</dt>
						<dd>-{task.penaltyPoints}</dd>
					</div>
				) : null}
				{isCostTracker && totalAmount ? (
					<div>
						<dt>Amount due</dt>
						<dd>{totalAmount}</dd>
					</div>
				) : null}
				{task.dueDate ? (
					<div>
						<dt>Due</dt>
						<dd>{window.formatDate(task.dueDate)}</dd>
					</div>
				) : null}
			</dl>

			{task.appealText ? (
				<p className={styles.appealText}>
					<strong>Appeal reason:</strong> {task.appealText}
				</p>
			) : null}

			<div className={styles.actions}>
				{isSpiral && task.spiralConfig ? (
					<Button variant="secondary" onClick={function () { setViewingSpiral(true); }}>
						▶️ View Spiral
					</Button>
				) : null}

				{/* Slave actions */}
				{app.isSlave && !isCostTracker && task.type !== "demerit" &&
				task.assignedTo === app.currentUser &&
				task.status === "todo" ? (
					<Button onClick={function () { actions.checkOffTask(task.id); }}>
						Mark complete
					</Button>
				) : null}

				{app.isSlave && task.type === "demerit" && task.status === "demerit_issued" ? (
					<>
						<Button onClick={function () { actions.acceptDemerit(task.id); }}>
							Accept
						</Button>
						<Button variant="secondary" onClick={function () { actions.appealDemerit(task.id); }}>
							Appeal
						</Button>
					</>
				) : null}

				{app.isSlave && isCostTracker && task.status === "todo" ? (
					<Button onClick={function () { actions.markInvoiceAsPaid(task.id); }}>
						Mark invoice as paid
					</Button>
				) : null}

				{/* Master actions */}
				{app.isMaster && task.status === "pending_approval" && isCostTracker ? (
					<>
						<Button onClick={function () { actions.approveInvoice(task.id); }}>
							Approve payment
						</Button>
						<Button variant="danger" onClick={function () { actions.rejectTask(task.id); }}>
							Deny payment
						</Button>
					</>
				) : null}

				{app.isMaster && task.status === "pending_approval" && !isCostTracker ? (
					<>
						<Button onClick={function () { actions.approveTask(task.id); }}>
							Approve
						</Button>
						<Button variant="danger" onClick={function () { actions.rejectTask(task.id); }}>
							Reject &amp; penalize
						</Button>
					</>
				) : null}

				{app.isMaster && task.type === "demerit" && task.appealStatus === "pending" ? (
					<>
						<Button onClick={function () { actions.approveAppeal(task.id); }}>
							Approve appeal
						</Button>
						<Button variant="danger" onClick={function () { actions.denyAppeal(task.id); }}>
							Deny appeal (2x penalty)
						</Button>
					</>
				) : null}

				{app.isMaster ? (
					<Button variant="danger" onClick={function () { actions.deleteTask(task.id); }}>
						Delete
					</Button>
				) : null}
			</div>

			{viewingSpiral ? (
				<SpiralViewerModal
					config={task.spiralConfig}
					onClose={function () { setViewingSpiral(false); }}
				/>
			) : null}
		</Card>
	);
}
