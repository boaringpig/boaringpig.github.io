// useTasks.js - reads/subscribes to the task list (via the shared
// useRealtimeList hook) and exposes the task mutations. Every mutation here
// just calls the existing classic function from js/database-tasks.js - see
// src/beta/README.md's "Hybrid data flow" section for why.
import { useApp } from "../context/AppContext";
import { useRealtimeList } from "./useRealtimeList";

function byCreatedAtDesc(a, b) {
	return new Date(b.createdAt) - new Date(a.createdAt);
}

export function useTasks() {
	var app = useApp();
	var list = useRealtimeList({
		table: "tasks",
		masterUsername: app.activeMasterContext,
		sort: byCreatedAtDesc,
	});

	return {
		tasks: list.items,
		status: list.status,
		error: list.error,
		reload: list.reload,

		// `fields` matches the shape window.createTask's optional overrides
		// argument expects - see js/database-tasks.js.
		createTask: function (fields) {
			return window.createTask(fields);
		},
		checkOffTask: function (taskId) {
			return window.checkOffTask(taskId);
		},
		approveTask: function (taskId) {
			return window.approveTask(taskId);
		},
		rejectTask: function (taskId) {
			return window.rejectTask(taskId);
		},
		deleteTask: function (taskId) {
			return window.deleteTask(taskId);
		},
		acceptDemerit: function (taskId) {
			return window.acceptDemerit(taskId);
		},
		appealDemerit: function (taskId) {
			// Pops the classic appeal modal (appended to document.body, so
			// it displays fine over the React tree too).
			var task = list.items.find(function (t) {
				return t.id === taskId;
			});
			if (task) window.appealDemerit(taskId);
		},
		approveAppeal: function (taskId) {
			return window.approveAppeal(taskId);
		},
		denyAppeal: function (taskId) {
			return window.denyAppeal(taskId);
		},
		markInvoiceAsPaid: function (taskId) {
			return window.markInvoiceAsPaid(taskId);
		},
		approveInvoice: function (taskId) {
			return window.approveInvoice(taskId);
		},
	};
}
