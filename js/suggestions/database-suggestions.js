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
		await window.fetchSuggestionsInitial();
	} catch (e) {
		console.error(
			"An unexpected error occurred during suggestion approval:",
			e
		);
		window.showNotification("An unexpected error occurred.", "error");
	}
};

/**
 * Formats an ISO date string as the "YYYY-MM-DDTHH:mm" value a native
 * <input type="datetime-local"> expects, in local time. Returns "" for a
 * missing/invalid input.
 */
function toDatetimeLocalValue(iso) {
	if (!iso) return "";
	var d = new Date(iso);
	if (isNaN(d.getTime())) return "";
	var pad = function (n) {
		return String(n).padStart(2, "0");
	};
	return (
		d.getFullYear() +
		"-" +
		pad(d.getMonth() + 1) +
		"-" +
		pad(d.getDate()) +
		"T" +
		pad(d.getHours()) +
		":" +
		pad(d.getMinutes())
	);
}

/**
 * Lets an admin edit a suggestion's fields before approving it, then create
 * the task with those edits. Appends its own document.body modal (not
 * classic view markup), so it works unchanged from the React beta UI --
 * beta's useSuggestions.js calls this by name directly (hybrid data-flow
 * pattern, see src/beta/README.md). Rescued from js/suggestions/ui-suggestions.js
 * (deleted); its date field now uses a native <input type="datetime-local">
 * instead of flatpickr, since nothing else in this surviving app uses it.
 */
window.showEditSuggestionModal = function (suggestionId) {
	if (!window.hasPermission("approve_suggestions")) {
		window.showNotification(
			"You do not have permission to edit suggestions",
			"error"
		);
		return;
	}

	const suggestion = window.suggestions.find((s) => s.id === suggestionId);
	if (!suggestion) {
		window.showNotification("Suggestion not found", "error");
		return;
	}

	const modal = document.createElement("div");
	modal.className = "modal-overlay";
	modal.innerHTML = `
		<div class="modal-content large">
			<h3>✏️ Edit Suggestion Before Approval</h3>
			<p><strong>Original suggestion by:</strong> ${
				window.users[suggestion.suggestedBy]?.displayName ||
				suggestion.suggestedBy
			}</p>
			<p><strong>Submitted:</strong> ${window.formatDate(suggestion.createdAt)}</p>
			<hr style="border-color: var(--color-border); margin: 20px 0;">

			<div class="form-group">
				<label class="form-label">Task Description *</label>
				<textarea
					id="editSuggestionDescription"
					class="form-input"
					rows="3"
					maxlength="500"
					required
				>${window.escapeHtml(suggestion.description)}</textarea>
			</div>

			<div class="form-group">
				<label class="form-label">Justification/Notes</label>
				<textarea
					id="editSuggestionJustification"
					class="form-input"
					rows="2"
					placeholder="Admin notes or justification..."
				>${window.escapeHtml(suggestion.justification || "")}</textarea>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label class="form-label">Points (Reward)</label>
					<input
						type="number"
						id="editSuggestionPoints"
						class="form-input"
						value="${suggestion.suggestedPoints || 10}"
						min="1"
						max="100"
					/>
				</div>
				<div class="form-group">
					<label class="form-label">Penalty Points</label>
					<input
						type="number"
						id="editSuggestionPenalty"
						class="form-input"
						value="${Math.floor((suggestion.suggestedPoints || 10) / 2)}"
						min="0"
						max="50"
					/>
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label class="form-label">Due Date</label>
					<input
						type="datetime-local"
						id="editSuggestionDueDate"
						class="form-input"
						value="${toDatetimeLocalValue(suggestion.suggestedDueDate)}"
					/>
				</div>
				<div class="form-group">
					<label class="form-label">
						<input type="checkbox" id="editSuggestionRepeating" />
						Make this a repeating task
					</label>
				</div>
			</div>

			<div class="form-group" id="editRepeatOptions" style="display: none;">
				<label class="form-label">Repeat Every</label>
				<select id="editSuggestionRepeatInterval" class="form-input">
					<option value="daily">Daily</option>
					<option value="weekly">Weekly</option>
					<option value="monthly">Monthly</option>
				</select>
			</div>

			<div class="form-group">
				<label class="form-label">Assign To</label>
				<select id="editSuggestionAssignee" class="form-input">
					${window.getSlaves().map(function(pig) {
						var dn = window.users[pig] ? window.users[pig].displayName : pig;
						return '<option value="' + pig + '">' + dn + ' (' + pig + ')</option>';
					}).join('')}
				</select>
			</div>

			<div class="suggestion-changes-preview" id="changesPreview" style="display: none;">
				<h4>📝 Changes Made:</h4>
				<div id="changesList"></div>
			</div>

			<div class="modal-actions">
				<button id="approveSuggestionEdited" class="action-btn approve-btn">
					Approve & Create Task
				</button>
				<button id="previewSuggestionChanges" class="action-btn check-btn">
					Preview Changes
				</button>
				<button id="cancelSuggestionEdit" class="action-btn delete-btn">
					Cancel
				</button>
			</div>
		</div>
	`;

	document.body.appendChild(modal);

	// Handle repeating checkbox
	const repeatingCheckbox = document.getElementById(
		"editSuggestionRepeating"
	);
	const repeatOptions = document.getElementById("editRepeatOptions");
	if (repeatingCheckbox && repeatOptions) {
		repeatingCheckbox.addEventListener("change", function () {
			repeatOptions.style.display = this.checked ? "block" : "none";
		});
	}

	// Preview changes functionality
	document.getElementById("previewSuggestionChanges").onclick = function () {
		window.previewSuggestionChanges(suggestion);
	};

	// Approve button functionality
	document.getElementById("approveSuggestionEdited").onclick =
		async function () {
			await window.approveEditedSuggestion(suggestionId);
		};

	// Cancel button
	document.getElementById("cancelSuggestionEdit").onclick = function () {
		document.body.removeChild(modal);
	};

	// Click outside to close
	modal.onclick = function (e) {
		if (e.target === modal) {
			document.body.removeChild(modal);
		}
	};
};

/**
 * Preview changes made to the suggestion, called by showEditSuggestionModal's
 * own "Preview Changes" button. Rescued from js/suggestions/ui-suggestions.js.
 */
window.previewSuggestionChanges = function (originalSuggestion) {
	const description = document
		.getElementById("editSuggestionDescription")
		.value.trim();
	const justification = document
		.getElementById("editSuggestionJustification")
		.value.trim();
	const points =
		parseInt(document.getElementById("editSuggestionPoints").value) || 10;
	const penalty =
		parseInt(document.getElementById("editSuggestionPenalty").value) || 5;
	const dueDate = document.getElementById("editSuggestionDueDate").value;
	const isRepeating = document.getElementById(
		"editSuggestionRepeating"
	).checked;
	const repeatInterval = document.getElementById(
		"editSuggestionRepeatInterval"
	).value;

	const changes = [];

	if (description !== originalSuggestion.description) {
		changes.push(`<div class="change-item">
			<strong>Description:</strong><br>
			<span class="old-value">Old: ${window.escapeHtml(
				originalSuggestion.description
			)}</span><br>
			<span class="new-value">New: ${window.escapeHtml(description)}</span>
		</div>`);
	}

	if (points !== originalSuggestion.suggestedPoints) {
		changes.push(`<div class="change-item">
			<strong>Points:</strong> ${originalSuggestion.suggestedPoints} → ${points}
		</div>`);
	}

	if (penalty !== Math.floor(originalSuggestion.suggestedPoints / 2)) {
		changes.push(`<div class="change-item">
			<strong>Penalty Points:</strong> ${Math.floor(
				originalSuggestion.suggestedPoints / 2
			)} → ${penalty}
		</div>`);
	}

	if (dueDate !== toDatetimeLocalValue(originalSuggestion.suggestedDueDate)) {
		changes.push(`<div class="change-item">
			<strong>Due Date:</strong> ${
				originalSuggestion.suggestedDueDate
					? window.formatDate(originalSuggestion.suggestedDueDate)
					: "None"
			} → ${dueDate ? window.formatDate(dueDate) : "None"}
		</div>`);
	}

	if (isRepeating) {
		changes.push(`<div class="change-item">
			<strong>Repeating:</strong> Added ${repeatInterval} repetition
		</div>`);
	}

	if (justification !== (originalSuggestion.justification || "")) {
		changes.push(`<div class="change-item">
			<strong>Justification:</strong><br>
			<span class="old-value">Old: ${window.escapeHtml(
				originalSuggestion.justification || "None"
			)}</span><br>
			<span class="new-value">New: ${window.escapeHtml(
				justification || "None"
			)}</span>
		</div>`);
	}

	const changesPreview = document.getElementById("changesPreview");
	const changesList = document.getElementById("changesList");

	if (changes.length > 0) {
		changesList.innerHTML = changes.join("");
		changesPreview.style.display = "block";
	} else {
		changesList.innerHTML =
			'<div class="no-changes">No changes made to original suggestion.</div>';
		changesPreview.style.display = "block";
	}
};

/**
 * Approves the edited suggestion and creates the task, then DELETES the
 * suggestion completely. Rescued from js/suggestions/ui-suggestions.js.
 */
window.approveEditedSuggestion = async function (suggestionId) {
	const suggestion = window.suggestions.find((s) => s.id === suggestionId);
	if (!suggestion) {
		window.showNotification("Suggestion not found", "error");
		return;
	}

	// Get all the edited values
	const description = document
		.getElementById("editSuggestionDescription")
		.value.trim();
	const justification = document
		.getElementById("editSuggestionJustification")
		.value.trim();
	const points =
		parseInt(document.getElementById("editSuggestionPoints").value) || 10;
	const penalty =
		parseInt(document.getElementById("editSuggestionPenalty").value) || 5;
	const dueDate = document.getElementById("editSuggestionDueDate").value;
	const isRepeating = document.getElementById(
		"editSuggestionRepeating"
	).checked;
	const repeatInterval = document.getElementById(
		"editSuggestionRepeatInterval"
	).value;
	const assignee = document.getElementById("editSuggestionAssignee").value;

	// Validation
	if (!description) {
		window.showNotification("Please enter a task description", "error");
		return;
	}

	if (points < 1 || points > 100) {
		window.showNotification("Points must be between 1 and 100", "error");
		return;
	}

	if (penalty < 0 || penalty > 50) {
		window.showNotification(
			"Penalty points must be between 0 and 50",
			"error"
		);
		return;
	}

	// Validate due date if provided
	if (dueDate) {
		const selectedDate = new Date(dueDate);
		const now = new Date();

		if (isNaN(selectedDate.getTime())) {
			window.showNotification("Invalid due date format", "error");
			return;
		}

		if (selectedDate < now) {
			window.showNotification("Due date cannot be in the past", "error");
			return;
		}
	}

	try {
		// Create the task with edited values - this is now a normal task, not a suggestion
		const task = {
			text: description,
			status: "todo",
			type: "regular",
			createdAt: new Date().toISOString(),
			createdBy: window.currentUser, // Admin who approved it
			master_username: window.activeMasterContext,
			assignedTo: assignee,
			points: points,
			penaltyPoints: penalty,
			dueDate: dueDate || null,
			isRepeating: isRepeating,
			repeatInterval: isRepeating ? repeatInterval : null,
			completedAt: null,
			completedBy: null,
			approvedAt: null,
			approvedBy: null,
			isOverdue: false,
			// NOTE: Since this is no longer a suggestion but a regular task,
			// we don't include originalSuggestionid or originalSuggestedby fields
			// The suggestion is being completely removed from the system
		};

		// Insert the new task
		const { error: taskError } = await window.supabase
			.from("tasks")
			.insert([task]);

		if (taskError) {
			console.error(
				"Error creating task from edited suggestion:",
				taskError
			);
			window.showNotification("Failed to create task", "error");
			return;
		}

		// DELETE the suggestion completely (instead of updating status to "approved")
		// This fulfills the requirement that edited suggestions are completely removed
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

		// Close modal immediately after successful processing
		const allModals = document.querySelectorAll(".modal-overlay");
		allModals.forEach((modalElement) => {
			if (modalElement.parentNode) {
				modalElement.parentNode.removeChild(modalElement);
			}
		});

		window.showNotification(
			`Suggestion converted to task! Created with ${points} points${
				isRepeating ? " (Repeating)" : ""
			}. Original suggestion removed.`
		);

		// Refresh data
		await window.fetchTasksInitial();
		await window.fetchSuggestionsInitial();
	} catch (error) {
		console.error("Error in approveEditedSuggestion:", error);
		window.showNotification(
			"An error occurred while processing the suggestion",
			"error"
		);
	}
};
