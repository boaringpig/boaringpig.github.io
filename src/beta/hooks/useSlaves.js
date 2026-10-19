// useSlaves.js - the current group's roster: each slave's username, display
// name, and points. Used by the task-assignment picker, the dashboard, and
// the admin "Manage Pigs" page.
import { useCallback, useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

export function useSlaves() {
	var app = useApp();
	var masterUsername = app.activeMasterContext;

	var [slaves, setSlaves] = useState([]);
	var [status, setStatus] = useState("loading");
	var [error, setError] = useState(null);

	var load = useCallback(
		async function () {
			if (!masterUsername) {
				setSlaves([]);
				setStatus("ready");
				return;
			}
			setStatus("loading");
			setError(null);

			var relResult = await window.supabase
				.from("master_slave_relationships")
				.select("slave_username, status")
				.eq("master_username", masterUsername);

			if (relResult.error) {
				setError(relResult.error);
				setStatus("error");
				return;
			}

			var usernames = (relResult.data || []).map(function (r) {
				return r.slave_username;
			});

			var profilesResult = { data: [] };
			var usersResult = { data: [] };
			if (usernames.length > 0) {
				profilesResult = await window.supabase
					.from("userProfiles")
					.select("username, points")
					.eq("master_username", masterUsername);

				usersResult = await window.supabase
					.from("users")
					.select("username, display_name")
					.in("username", usernames);
			}

			var pointsMap = {};
			(profilesResult.data || []).forEach(function (p) {
				pointsMap[p.username] = p.points || 0;
			});
			var nameMap = {};
			(usersResult.data || []).forEach(function (u) {
				nameMap[u.username] = u.display_name || u.username;
			});

			var merged = (relResult.data || []).map(function (rel) {
				return {
					username: rel.slave_username,
					displayName: nameMap[rel.slave_username] || rel.slave_username,
					points: pointsMap[rel.slave_username] || 0,
					status: rel.status,
				};
			});

			setSlaves(merged);
			setStatus("ready");
		},
		[masterUsername]
	);

	useEffect(
		function () {
			load();

			if (!masterUsername) return undefined;

			var channel = window.supabase
				.channel("beta_slave_roster_" + masterUsername)
				.on(
					"postgres_changes",
					{
						event: "*",
						schema: "public",
						table: "userProfiles",
						filter: "master_username=eq." + masterUsername,
					},
					function () {
						load();
					}
				)
				.on(
					"postgres_changes",
					{
						event: "*",
						schema: "public",
						table: "master_slave_relationships",
						filter: "master_username=eq." + masterUsername,
					},
					function () {
						load();
					}
				)
				.subscribe();

			return function () {
				window.supabase.removeChannel(channel);
			};
		},
		[masterUsername, load]
	);

	var activeSlaves = slaves.filter(function (s) {
		return s.status === "active";
	});

	return {
		slaves: activeSlaves,
		allSlaves: slaves,
		status: status,
		error: error,
		reload: load,
	};
}
