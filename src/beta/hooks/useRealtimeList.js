// useRealtimeList.js
//
// WHAT THIS IS: one shared "fetch a list from Supabase, then keep it in sync
// in realtime" hook, reused by every entity-specific hook in this folder
// (useTasks, useRewards, useSuggestions, ...). Without this, each of those
// hooks would copy-paste the same fetch + subscribe + cleanup logic. This is
// the "read" half of the app's data flow - see src/beta/README.md's
// "Hybrid data flow" section for why writes go through the *classic*
// window.* functions instead of being duplicated here.
//
// USAGE (inside another hook, e.g. useTasks.js):
//
//   const { items, status, error, reload } = useRealtimeList({
//     table: "tasks",
//     masterUsername: activeMasterContext,
//     sort: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//   });
//
// `status` is one of "loading" | "ready" | "error" - use it to drive the
// loading/empty/error states required by the design spec (see
// src/beta/components/common/README or any List component for the pattern).

import { useCallback, useEffect, useState } from "react";

/**
 * @param {object} opts
 * @param {string} opts.table - Supabase table name.
 * @param {string} [opts.select] - Supabase select string, defaults to "*".
 * @param {string} opts.masterUsername - the tenant filter value (every
 *   table in this app is scoped by a master_username column).
 * @param {(a: any, b: any) => number} [opts.sort] - optional client-side sort.
 * @param {boolean} [opts.enabled] - set false to skip fetching entirely
 *   (e.g. an admin-only hook when the current user isn't an admin).
 */
export function useRealtimeList(opts) {
	var table = opts.table;
	var select = opts.select || "*";
	var masterUsername = opts.masterUsername;
	var sort = opts.sort;
	var enabled = opts.enabled !== false;

	var [items, setItems] = useState([]);
	var [status, setStatus] = useState("loading");
	var [error, setError] = useState(null);

	var load = useCallback(
		async function () {
			if (!enabled || !masterUsername) {
				setItems([]);
				setStatus("ready");
				return;
			}
			setStatus("loading");
			setError(null);
			var query = window.supabase
				.from(table)
				.select(select)
				.eq("master_username", masterUsername);
			var result = await query;
			if (result.error) {
				console.error("useRealtimeList(" + table + ") fetch error:", result.error);
				setError(result.error);
				setStatus("error");
				return;
			}
			var data = result.data || [];
			if (sort) data = data.slice().sort(sort);
			setItems(data);
			setStatus("ready");
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps -- `sort` is a
		// fresh function each render by design; re-running on identity change
		// would re-fetch every render, so it's intentionally left out here.
		[table, select, masterUsername, enabled]
	);

	useEffect(
		function () {
			load();

			if (!enabled || !masterUsername) {
				return undefined;
			}

			var channel = window.supabase
				.channel("beta_" + table + "_" + masterUsername)
				.on(
					"postgres_changes",
					{
						event: "*",
						schema: "public",
						table: table,
						filter: "master_username=eq." + masterUsername,
					},
					function (payload) {
						setItems(function (prev) {
							var next = prev;
							if (payload.eventType === "INSERT") {
								next = [payload.new].concat(prev);
							} else if (payload.eventType === "UPDATE") {
								next = prev.map(function (item) {
									return item.id === payload.old.id ? payload.new : item;
								});
							} else if (payload.eventType === "DELETE") {
								next = prev.filter(function (item) {
									return item.id !== payload.old.id;
								});
							}
							return sort ? next.slice().sort(sort) : next;
						});
					}
				)
				.subscribe();

			return function () {
				window.supabase.removeChannel(channel);
			};
		},
		[table, masterUsername, enabled, load]
	);

	return { items: items, status: status, error: error, reload: load };
}
