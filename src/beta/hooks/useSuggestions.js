// useSuggestions.js
import { useApp } from "../context/AppContext";
import { useRealtimeList } from "./useRealtimeList";

function byCreatedAtDesc(a, b) {
	return new Date(b.createdAt) - new Date(a.createdAt);
}

export function useSuggestions() {
	var app = useApp();
	var list = useRealtimeList({
		table: "suggestions",
		masterUsername: app.activeMasterContext,
		sort: byCreatedAtDesc,
	});

	return {
		suggestions: list.items,
		status: list.status,
		error: list.error,
		reload: list.reload,

		submitSuggestion: function (fields) {
			return window.submitTaskSuggestion(fields);
		},
		rejectSuggestion: function (id) {
			return window.rejectSuggestion(id);
		},
		approveSuggestion: function (id) {
			return window.approveSuggestion(id);
		},
		// Opens the classic, self-contained edit modal (it appends to
		// document.body itself, so it works fine from the React tree too -
		// see src/beta/README.md's "Hybrid data flow" section).
		editSuggestion: function (id) {
			window.showEditSuggestionModal(id);
		},
	};
}
