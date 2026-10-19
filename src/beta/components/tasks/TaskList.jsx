// TaskList.jsx - renders the loading/error/empty/list states for a set of
// tasks. This loading->error->empty->list sequence is the same pattern
// every list component in the app follows.
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";
import { TaskItem } from "./TaskItem";

export function TaskList({ tasks, status, error, onRetry, actions, emptyLabel }) {
	if (status === "loading") return <LoadingSpinner label="Loading tasks..." />;
	if (status === "error") {
		return (
			<ErrorState
				message={"Couldn't load tasks: " + (error ? error.message : "unknown error")}
				onRetry={onRetry}
			/>
		);
	}
	if (tasks.length === 0) {
		return <EmptyState icon="✓" title={emptyLabel || "No tasks yet"} />;
	}
	return (
		<div>
			{tasks.map(function (task) {
				return <TaskItem key={task.id} task={task} actions={actions} />;
			})}
		</div>
	);
}
