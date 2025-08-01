// database.suggestions.js
// This file contains all the database-related functions for suggestions.

/**
 * Fetches all suggestions from Supabase.
 */
window.fetchSuggestionsInitial = async function () {
	const { data, error } = await window.supabase
		.from("suggestions")
		.select("*");
	if (error) {
		console.error("Error fetching suggestions:", error);
		window.showError("Failed to load suggestions.");
	} else {
		window.suggestions = data.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);
		window.renderSuggestions();
	}
};

/**
 * Rejects a task suggestion.
 * @param {number} suggestionId - The ID of the suggestion to reject.
 */
window.rejectSuggestion = function (suggestionId) {
	if (!window.hasPermission("approve_suggestions")) {
		window.showNotification(
			"You do not have permission to reject suggestions",
			"error"
		);
		return;
	}
	window.showConfirmModal(
		"Are you sure you want to reject this suggestion?",
		async (confirmed) => {
			if (!confirmed) {
				return;
			}
			const suggestionUpdates = {
				status: "rejected",
				reviewedBy: window.currentUser,
				reviewedAt: new Date().toISOString(),
			};
			const { error } = await window.supabase
				.from("suggestions")
				.update(suggestionUpdates)
				.eq("id", suggestionId);
			if (error) {
				console.error("Error rejecting suggestion:", error);
				window.showNotification("Failed to reject suggestion", "error");
			} else {
				window.showNotification("Suggestion rejected");
				await window.fetchSuggestionsInitial();
			}
		}
	);
};

/**
 * Submits a new task suggestion to Supabase.
 */
window.submitTaskSuggestion = async function () {
	const description = document.getElementById("suggestedTaskDescription");
	const justification = document.getElementById("taskJustification");
	const points = document.getElementById("suggestedPoints");
	const dueDate = document.getElementById("suggestedDueDate");

	if (!description || !description.value.trim()) {
		window.showNotification("Please enter a task description", "error");
		return;
	}
	const suggestion = {
		description: description.value.trim(),
		justification: justification ? justification.value.trim() : "",
		suggestedPoints: points ? parseInt(points.value) || 10 : 10,
		suggestedDueDate: dueDate ? dueDate.value || null : null,
		suggestedBy: window.currentUser,
		createdAt: new Date().toISOString(),
		status: "pending",
		reviewedBy: null,
		reviewedAt: null,
	};
	const { error: suggestionError } = await window.supabase
		.from("suggestions")
		.insert([suggestion]);
	if (suggestionError) {
		console.error("Error submitting suggestion:", suggestionError);
		window.showNotification("Failed to submit suggestion", "error");
	} else {
		const form = document.getElementById("suggestForm");
		if (form) form.reset();
		window.showNotification("Task suggestion submitted successfully!");
		await window.fetchSuggestionsInitial();
	}
};

/**
 * Approves a task suggestion and converts it into a new task.
 * @param {number} suggestionId - The ID of the suggestion to approve.
 */
window.approveSuggestion = async function (suggestionId) {
	const suggestion = window.suggestions.find((s) => s.id === suggestionId);
	if (!suggestion) return;
	const task = {
		text: suggestion.description,
		status: "todo",
		type: "regular",
		createdAt: new Date().toISOString(),
		createdBy: window.currentUser,
		assignedTo: "user",
		points: suggestion.suggestedPoints,
		penaltyPoints: Math.floor(suggestion.suggestedPoints / 2),
		dueDate: suggestion.suggestedDueDate,
		isRepeating: false,
		repeatInterval: null,
		completedAt: null,
		completedBy: null,
		approvedAt: null,
		approvedBy: null,
		isOverdue: false,
	};
	const suggestionUpdates = {
		status: "approved",
		reviewedBy: window.currentUser,
		reviewedAt: new Date().toISOString(),
	};
	const { error: taskError } = await window.supabase
		.from("tasks")
		.insert([task]);
	const { error: suggestionError } = await window.supabase
		.from("suggestions")
		.update(suggestionUpdates)
		.eq("id", suggestionId);
	if (taskError || suggestionError) {
		console.error(
			"Error approving suggestion:",
			taskError || suggestionError
		);
		window.showNotification("Failed to approve suggestion", "error");
	} else {
		window.showNotification(`Suggestion approved and converted to task!`);
		await window.fetchTasksInitial();
		await window.fetchSuggestionsInitial();
	}
};
