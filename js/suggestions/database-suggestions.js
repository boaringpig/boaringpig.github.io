// database.suggestions.js
// This file contains all the database-related functions for suggestions.

/**
 * Fetches all suggestions from Supabase.
 */
window.fetchSuggestionsInitial = async function () {
	const { data, error } = await window.supabase
		.from("suggestions")
		.select("*")
		.eq("master_username", window.activeMasterContext);
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
 *
 * `overrides` is optional (see window.createTask's doc comment for why): a
 * non-DOM caller like the React beta UI can pass
 * `{ description, justification, points, dueDate }` directly instead of
 * this function reading the classic HTML form's inputs. Called with no
 * arguments, it behaves exactly as before.
 */
window.submitTaskSuggestion = async function (overrides) {
	overrides = overrides || {};

	const descriptionEl = document.getElementById("suggestedTaskDescription");
	const justificationEl = document.getElementById("taskJustification");
	const pointsEl = document.getElementById("suggestedPoints");
	const dueDateEl = document.getElementById("suggestedDueDate");

	const descriptionValue =
		overrides.description !== undefined
			? overrides.description
			: descriptionEl
			? descriptionEl.value
			: "";

	if (!descriptionValue || !descriptionValue.trim()) {
		window.showNotification("Please enter a task description", "error");
		return;
	}

	const suggestion = {
		description: descriptionValue.trim(),
		justification:
			overrides.justification !== undefined
				? overrides.justification.trim()
				: justificationEl
				? justificationEl.value.trim()
				: "",
		suggestedPoints:
			overrides.points !== undefined
				? parseInt(overrides.points) || 10
				: pointsEl
				? parseInt(pointsEl.value) || 10
				: 10,
		suggestedDueDate:
			overrides.dueDate !== undefined
				? overrides.dueDate || null
				: dueDateEl
				? dueDateEl.value || null
				: null,
		suggestedBy: window.currentUser,
		master_username: window.activeMasterContext,
		createdAt: new Date().toISOString(),
		status: "pending",
		reviewedBy: null,
		reviewedAt: null,
		// No task-specific fields here, as it's a suggestion, not a task.
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
 * This function creates a task from the suggestion and then DELETES the suggestion completely.
 * @param {number} suggestionId - The ID of the suggestion to approve.
 */
window.approveSuggestion = async function (suggestionId) {
	try {
		const suggestion = window.suggestions.find(
			(s) => s.id === suggestionId
		);
		if (!suggestion) {
			console.error("Suggestion not found:", suggestionId);
			window.showNotification("Suggestion not found.", "error");
			return;
		}

		// Build the task object dynamically to avoid sending null values unnecessarily.
		const task = {
			text: suggestion.description,
			status: "todo",
			type: "regular",
			createdAt: new Date().toISOString(),
			createdBy: window.currentUser,
			master_username: window.activeMasterContext,
			assignedTo: window.getSlaves()[0] || window.currentUser,
			points: suggestion.suggestedPoints,
			penaltyPoints: Math.floor(suggestion.suggestedPoints / 2),
			isRepeating: suggestion.isRepeating || false, // Use suggestion's repeat setting or default to false
			repeatInterval: suggestion.isRepeating
				? suggestion.repeatInterval || null
				: null, // Use suggestion's interval if repeating
			isOverdue: false,
			// NOTE: Since this is no longer a suggestion but a regular task,
			// we don't include originalSuggestionid or originalSuggestedby fields
			// The suggestion is being completely removed from the system
		};

		// Add dueDate only if it exists
		if (suggestion.suggestedDueDate) {
			task.dueDate = suggestion.suggestedDueDate;
		}

		const { error: taskError } = await window.supabase
			.from("tasks")
			.insert([task]);

		if (taskError) {
			console.error("Error creating task from suggestion:", taskError);
			window.showNotification(
				"Failed to approve suggestion: Task creation failed.",
				"error"
			);
			return;
		}

		// DELETE the suggestion completely (instead of updating status to "approved")
		// This fulfills the requirement that approved suggestions are completely removed
		const { error: suggestionDeleteError } = await window.supabase
			.from("suggestions")
			.delete()
			.eq("id", suggestionId);

		if (suggestionDeleteError) {
			console.error("Error deleting suggestion:", suggestionDeleteError);
			window.showNotification(
				"Task created but failed to remove suggestion",
				"warning"
			);
			// Don't return here - the task was created successfully
		} else {
			// Immediately remove the suggestion from the local array to update UI instantly
			window.suggestions = window.suggestions.filter(
				(s) => s.id !== suggestionId
			);
		}

		window.showNotification(
			`Suggestion approved and converted to task! Original suggestion removed.`
		);

		await window.fetchTasksInitial();
		window.renderTasks(); // This will call renderAdminView() which calls renderAdminSuggestions()
		await window.fetchSuggestionsInitial();
	} catch (e) {
		console.error(
			"An unexpected error occurred during suggestion approval:",
			e
		);
		window.showNotification("An unexpected error occurred.", "error");
	}
};
