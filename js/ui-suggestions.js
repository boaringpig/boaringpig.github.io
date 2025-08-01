// ui.suggestions.js
// This file contains all the UI rendering functions for suggestions.

/**
 * Renders suggestions. This function primarily acts as a dispatcher to renderMySuggestions.
 */
window.renderSuggestions = function () {
	if (window.activeTab === "suggest") {
		window.renderMySuggestions();
	}
};

/**
 * Renders the list of suggestions made by the current user.
 */
window.renderMySuggestions = function () {
	var mySuggestions = window.suggestions.filter(function (s) {
		return s.suggestedBy === window.currentUser;
	});
	var container = document.getElementById("mySuggestions");
	if (!container) return;
	if (mySuggestions.length === 0) {
		container.innerHTML =
			'<div class="empty-state">No suggestions submitted yet</div>';
	} else {
		const generatedHtml = mySuggestions
			.map(function (suggestion) {
				return (
					'<div class="task-item">' +
					'<div class="task-content">' +
					"<div>" +
					'<span class="status-badge ' +
					window.getSuggestionStatusClass(suggestion.status) +
					'">' +
					suggestion.status.charAt(0).toUpperCase() +
					suggestion.status.slice(1) +
					"</span>" +
					'<span class="task-text">' +
					window.escapeHtml(suggestion.description) +
					"</span>" +
					'<span class="points-badge-small">' +
					suggestion.suggestedPoints +
					" pts</span>" +
					'<div class="task-meta">' +
					"Submitted: " +
					window.formatDate(suggestion.createdAt) +
					(suggestion.suggestedDueDate
						? "<br>Suggested due: " +
						  window.formatDate(suggestion.suggestedDueDate)
						: "") +
					(suggestion.reviewedAt
						? "<br>Reviewed: " +
						  window.formatDate(suggestion.reviewedAt) +
						  " by " +
						  (window.users[suggestion.reviewedBy]
								? window.users[suggestion.reviewedBy]
										.displayName
								: suggestion.reviewedBy)
						: "") +
					"</div>" +
					"</div>" +
					"</div>" +
					"</div>"
				);
			})
			.join("");
		try {
			container.innerHTML = generatedHtml;
		} catch (e) {
			console.error("Error setting innerHTML for mySuggestions:", e);
			window.showNotification("Failed to display suggestions.", "error");
		}
	}
};
