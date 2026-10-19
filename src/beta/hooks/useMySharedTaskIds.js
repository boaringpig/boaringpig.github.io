// useMySharedTaskIds.js - for a slave, the ids of "shared" tasks (one task,
// multiple possible completers) assigned to them via the task_assignments
// table. Mirrors the classic app's window.mySharedTaskIds, computed in
// js/database-tasks.js's fetchTasksInitial.
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

export function useMySharedTaskIds() {
	var app = useApp();
	var [ids, setIds] = useState([]);

	useEffect(
		function () {
			var cancelled = false;
			if (!app.isSlave || !app.activeMasterContext) {
				setIds([]);
				return undefined;
			}
			window.supabase
				.from("task_assignments")
				.select("task_id")
				.eq("assigned_to", app.currentUser)
				.eq("master_username", app.activeMasterContext)
				.then(function (result) {
					if (cancelled || result.error) return;
					setIds(
						(result.data || []).map(function (row) {
							return row.task_id;
						})
					);
				});
			return function () {
				cancelled = true;
			};
		},
		[app.isSlave, app.currentUser, app.activeMasterContext]
	);

	return ids;
}
