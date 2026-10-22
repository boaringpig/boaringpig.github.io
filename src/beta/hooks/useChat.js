// useChat.js - chat message history + realtime delivery for the active
// group's chatroom. Not built on useRealtimeList: that hook fetches the
// *whole* filtered table with no limit/pagination, and widening its
// contract for this one caller risks regressing every other table that
// relies on it. Writes delegate to the classic window.sendChatMessage, same
// as every other mutation in this app (see src/beta/README.md).
import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";

var PAGE_SIZE = 100;

export function useChat() {
	var app = useApp();
	var masterUsername = app.activeMasterContext;

	var [messages, setMessages] = useState([]);
	var [status, setStatus] = useState("loading");
	var [error, setError] = useState(null);
	var [hasMoreOlder, setHasMoreOlder] = useState(false);

	// Random per-instance suffix so a repeated topic name across hook
	// instances never collides -- see useRealtimeList.js for the full
	// explanation of why this is needed.
	var instanceId = useRef(Math.random().toString(36).slice(2)).current;

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
			// Push the sent message locally immediately rather than waiting on
			// the realtime round-trip -- see js/database-chat.js's
			// sendChatMessage for why this can't be relied on alone.
			var sent = await window.sendChatMessage({ body: body });
			if (sent) {
				setMessages(function (prev) {
					if (prev.some(function (m) { return m.id === sent.id; })) {
						return prev;
					}
					return prev.concat([sent]);
				});
			}
		},
		[]
	);

	useEffect(
		function () {
			load();

			if (!masterUsername) return undefined;

			var channel = window.supabase
				.channel("beta_chat_messages_" + masterUsername + "_" + instanceId)
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
							if (prev.some(function (m) { return m.id === payload.new.id; })) {
								return prev;
							}
							return prev.concat([payload.new]);
						});
					}
				)
				.subscribe();

			// Fallback alongside the channel above: if chat_messages was never
			// added to the Supabase project's realtime publication (a
			// dashboard setting, not something any migration sets up), no
			// client ever gets a postgres_changes event for someone else's
			// message, realtime "working" or not. Poll while this hook is
			// mounted (i.e. the Chat tab is open) so chat works regardless.
			var pollId = window.setInterval(load, 5000);

			return function () {
				window.supabase.removeChannel(channel);
				window.clearInterval(pollId);
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
