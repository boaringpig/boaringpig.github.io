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

		// Every mutation below reloads the list itself afterward rather than
		// waiting on the realtime subscription: this Supabase project's tasks
		// table isn't in the realtime publication (a dashboard setting, not
		// something client code can fix), so without this a just-completed
		// task would stay showing its old status until something else
		// triggered a refetch (e.g. a full page reload) - see useCostTrackers.js
		// for the same pattern.
		//
		// `fields` matches the shape window.createTask's optional overrides
		// argument expects - see js/database-tasks.js.
		createTask: function (fields) {
			return window.createTask(fields).then(function (result) {
				list.reload();
				return result;
			});
		},
		checkOffTask: function (taskId) {
			return window.checkOffTask(taskId).then(function (result) {
				list.reload();
				return result;
			});
		},
		approveTask: function (taskId) {
			return window.approveTask(taskId).then(function (result) {
				list.reload();
				return result;
			});
		},
		rejectTask: function (taskId) {
			return window.rejectTask(taskId).then(function (result) {
				list.reload();
				return result;
			});
		},
		deleteTask: function (taskId) {
			return window.deleteTask(taskId).then(function (result) {
				list.reload();
				return result;
			});
		},
		acceptDemerit: function (taskId) {
			return window.acceptDemerit(taskId).then(function (result) {
				list.reload();
				return result;
			});
		},
		appealDemerit: function (taskId) {
			// Pops the classic appeal modal (appended to document.body, so
			// it displays fine over the React tree too). Its promise
			// resolves once the modal's own submission flow finishes.
			return window.appealDemerit(taskId).then(function (result) {
				list.reload();
				return result;
			});
		},
		approveAppeal: function (taskId) {
			return window.approveAppeal(taskId).then(function (result) {
				list.reload();
				return result;
			});
		},
		denyAppeal: function (taskId) {
			return window.denyAppeal(taskId).then(function (result) {
				list.reload();
				return result;
			});
		},
		markInvoiceAsPaid: function (taskId) {
			return window.markInvoiceAsPaid(taskId).then(function (result) {
				list.reload();
				return result;
			});
		},
		approveInvoice: function (taskId) {
			return window.approveInvoice(taskId).then(function (result) {
				list.reload();
				return result;
			});
		},
	};
}
