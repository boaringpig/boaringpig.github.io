// useChat.js - chat message history + realtime delivery for the active
// group's chatroom. Not built on useRealtimeList: that hook fetches the
// *whole* filtered table with no limit/pagination, and widening its
// contract for this one caller risks regressing every other table that
// relies on it. Writes delegate to the classic window.sendChatMessage, same
// as every other mutation in this app (see src/beta/README.md).
import { useCallback, useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

var PAGE_SIZE = 100;

export function useChat() {
	var app = useApp();
	var masterUsername = app.activeMasterContext;

	var [messages, setMessages] = useState([]);
	var [status, setStatus] = useState("loading");
	var [error, setError] = useState(null);
	var [hasMoreOlder, setHasMoreOlder] = useState(false);

	var load = useCallback(
		async function () {
			if (!masterUsername) {
				setMessages([]);
				setStatus("ready");
				return;
			}
			setStatus("loading");
			setError(null);

			var result = await window.supabase
				.from("chat_messages")
				.select("*")
				.eq("master_username", masterUsername)
				.order("created_at", { ascending: false })
				.limit(PAGE_SIZE);

			if (result.error) {
				setError(result.error);
				setStatus("error");
				return;
			}

			var data = (result.data || []).slice().reverse();
			setMessages(data);
			setHasMoreOlder((result.data || []).length === PAGE_SIZE);
			setStatus("ready");
		},
		[masterUsername]
	);

	var loadOlder = useCallback(
		async function () {
			setMessages(function (prev) {
				if (prev.length === 0) return prev;
				var oldest = prev[0];
				window.supabase
					.from("chat_messages")
					.select("*")
					.eq("master_username", masterUsername)
					.lt("created_at", oldest.created_at)
					.order("created_at", { ascending: false })
					.limit(PAGE_SIZE)
					.then(function (result) {
						if (result.error) return;
						var older = (result.data || []).slice().reverse();
						setHasMoreOlder((result.data || []).length === PAGE_SIZE);
						setMessages(function (current) {
							return older.concat(current);
						});
					});
				return prev;
			});
		},
		[masterUsername]
	);

	var sendMessage = useCallback(
		async function (body) {
			await window.sendChatMessage({ body: body });
		},
		[]
	);

	useEffect(
		function () {
			load();

			if (!masterUsername) return undefined;

			var channel = window.supabase
				.channel("beta_chat_messages_" + masterUsername)
				.on(
					"postgres_changes",
					{
						event: "INSERT",
						schema: "public",
						table: "chat_messages",
						filter: "master_username=eq." + masterUsername,
					},
					function (payload) {
						setMessages(function (prev) {
							return prev.concat([payload.new]);
						});
					}
				)
				.subscribe();

			return function () {
				window.supabase.removeChannel(channel);
			};
		},
		[masterUsername, load]
	);

	return {
		messages: messages,
		status: status,
		error: error,
		hasMoreOlder: hasMoreOlder,
		loadOlder: loadOlder,
		sendMessage: sendMessage,
		reload: load,
	};
}
