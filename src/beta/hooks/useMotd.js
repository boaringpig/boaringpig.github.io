// useMotd.js - Message of the Day: the active group's ordered message list
// plus its advance state, both read through the shared useRealtimeList hook
// unmodified (motd_state is a legitimate 0-or-1-row "list" for a given
// master_username, since that column is its primary key).
//
// This hook deliberately does NOT re-trigger checkForMotdAdvance itself: by
// the time the beta bundle mounts, the classic app's loadData() already ran
// it once this session (beta only loads after a classic-app login) -- this
// hook just reactively reflects whatever that computed, via the motd_state
// subscription.
import { useApp } from "../context/AppContext";
import { useRealtimeList } from "./useRealtimeList";

function byPositionAsc(a, b) {
	return a.position - b.position;
}

export function useMotd() {
	var app = useApp();
	var masterUsername = app.activeMasterContext;

	var messagesList = useRealtimeList({
		table: "motd_messages",
		masterUsername: masterUsername,
		sort: byPositionAsc,
	});

	var stateList = useRealtimeList({
		table: "motd_state",
		masterUsername: masterUsername,
	});

	var messages = messagesList.items;
	var stateRow = stateList.items[0];
	var currentIndex = stateRow ? stateRow.current_index : 0;

	var currentMessage =
		messages.length > 0 ? messages[currentIndex % messages.length] : null;

	return {
		messages: messages,
		currentMessage: currentMessage,
		status: messagesList.status,
		error: messagesList.error,
		reload: function () {
			messagesList.reload();
			stateList.reload();
		},
		addMessage: async function (body) {
			await window.addMotdMessage({ body: body });
		},
		deleteMessage: async function (id) {
			await window.deleteMotdMessage(id);
		},
		moveUp: async function (id) {
			await window.moveMotdMessageUp(id);
		},
		moveDown: async function (id) {
			await window.moveMotdMessageDown(id);
		},
	};
}
