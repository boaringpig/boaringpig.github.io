// taskStatus.js - maps a task's status/type/appealStatus to a human label
// (reusing the classic window.getStatusText, so the wording stays identical
// between the classic and beta UIs) and to a Badge tone (new to the beta
// design system, since the classic CSS classes like "status-overdue" aren't
// used here).
export function taskStatusLabel(task) {
	return window.getStatusText(task.status, task.isOverdue, task.type, task.appealStatus);
}

export function taskStatusTone(task) {
	if (task.type === "demerit") {
		if (task.appealStatus === "pending") return "warning";
		if (task.appealStatus === "approved") return "success";
		if (task.appealStatus === "denied") return "danger";
		return "danger";
	}
	if (task.isOverdue) return "danger";
	if (task.status === "completed") return "success";
	if (task.status === "failed") return "danger";
	if (task.status === "pending_approval") return "warning";
	return "neutral";
}
