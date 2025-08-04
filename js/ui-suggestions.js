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
					'<div class="task-item ' +
					window.getSuggestionStatusClass(suggestion.status) +
					'">' +
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

/**
 * Renders pending task suggestions on the admin dashboard.
 * This is a new function to display suggestions awaiting review by 'skeen'.
 */
window.renderAdminSuggestions = function () {
	// Filter for suggestions that are in a 'pending' state
	var pendingSuggestions = window.suggestions.filter(function (s) {
		return s.status === "pending";
	});

	var container = document.getElementById("suggestedTasks");
	if (!container) return;

	if (pendingSuggestions.length === 0) {
		container.innerHTML =
			'<div class="empty-state">No suggested tasks pending approval</div>';
	} else {
		const generatedHtml = pendingSuggestions
			.map(function (suggestion) {
				return (
					'<div class="task-item pending-approval">' +
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
					'<span class="points-badge-small">+' +
					suggestion.suggestedPoints +
					" pts</span>" +
					'<div class="task-meta">' +
					"Suggested by: " +
					(window.users[suggestion.suggestedBy]
						? window.users[suggestion.suggestedBy].displayName
						: suggestion.suggestedBy) +
					"<br>Justification: " +
					window.escapeHtml(suggestion.justification) +
					(suggestion.suggestedDueDate
						? "<br>Suggested Due: " +
						  window.formatDate(suggestion.suggestedDueDate)
						: "") +
					"</div>" +
					"</div>" +
					'<div class="task-actions">' +
					'<button class="action-btn approve-btn" onclick="window.approveSuggestion(' +
					suggestion.id +
					')">Approve</button>' +
					'<button class="action-btn reject-btn" onclick="window.rejectSuggestion(' +
					suggestion.id +
					')">Reject</button>' +
					"</div>" +
					"</div>" +
					"</div>"
				);
			})
			.join("");
		try {
			container.innerHTML = generatedHtml;
		} catch (e) {
			console.error("Error setting innerHTML for suggestedTasks:", e);
			window.showNotification(
				"Failed to display suggested tasks.",
				"error"
			);
		}
	}
};
