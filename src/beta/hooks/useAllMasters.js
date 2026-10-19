// useAllMasters.js - admin-only: the full list of master accounts, backed
// by the same js/database-admin.js functions the classic "Masters" tab uses.
import { useCallback, useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

export function useAllMasters() {
	var app = useApp();
	var [masters, setMasters] = useState([]);
	var [status, setStatus] = useState("loading");

	var load = useCallback(async function () {
		setStatus("loading");
		var result = await window.fetchAllMasters();
		setMasters(result || []);
		setStatus("ready");
	}, []);

	useEffect(
		function () {
			if (app.isAdmin) load();
		},
		[app.isAdmin, load]
	);

	return {
		masters: masters,
		status: status,
		reload: load,
		createMaster: window.createMaster,
		updateMasterTerminology: window.updateMasterTerminology,
		updateMasterAccount: window.updateMasterAccount,
		deactivateMaster: function (username) {
			return new Promise(function (resolve) {
				window.showConfirmModal(
					"Deactivate master '" + username + "'? They (and their group) won't be able to log in.",
					async function (confirmed) {
						if (confirmed) {
							await window.supabase
								.from("users")
								.update({ status: "inactive" })
								.eq("username", username);
							window.showNotification("Master deactivated.", "success");
							await load();
						}
						resolve();
					}
				);
			});
		},
		reactivateMaster: async function (username) {
			await window.supabase
				.from("users")
				.update({ status: "active" })
				.eq("username", username);
			window.showNotification("Master reactivated.", "success");
			await load();
		},
	};
}
