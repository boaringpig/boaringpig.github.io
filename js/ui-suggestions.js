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
 * Renders pending task suggestions on the admin dashboard with edit functionality.
 * This replaces the existing renderAdminSuggestions function.
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
				const daysAgo = Math.floor(
					(new Date() - new Date(suggestion.createdAt)) /
						(1000 * 60 * 60 * 24)
				);
				const timeAgoText =
					daysAgo === 0
						? "Today"
						: daysAgo === 1
						? "1 day ago"
						: `${daysAgo} days ago`;

				return (
					'<div class="task-item pending-approval suggestion-item">' +
					'<div class="task-content">' +
					"<div>" +
					'<span class="status-badge ' +
					window.getSuggestionStatusClass(suggestion.status) +
					'">Suggested Task</span>' +
					'<span class="task-text">' +
					window.escapeHtml(suggestion.description) +
					"</span>" +
					'<span class="points-badge-small">+' +
					suggestion.suggestedPoints +
					" pts</span>" +
					'<div class="task-meta">' +
					"<strong>Suggested by:</strong> " +
					(window.users[suggestion.suggestedBy]
						? window.users[suggestion.suggestedBy].displayName
						: suggestion.suggestedBy) +
					" (" +
					timeAgoText +
					")<br>" +
					(suggestion.justification
						? "<strong>Justification:</strong> " +
						  window.escapeHtml(suggestion.justification) +
						  "<br>"
						: "") +
					(suggestion.suggestedDueDate
						? "<strong>Suggested Due:</strong> " +
						  window.formatDate(suggestion.suggestedDueDate) +
						  "<br>"
						: "") +
					"<strong>Submitted:</strong> " +
					window.formatDate(suggestion.createdAt) +
					"</div>" +
					"</div>" +
					'<div class="task-actions">' +
					'<button class="action-btn check-btn" onclick="window.showEditSuggestionModal(' +
					suggestion.id +
					')">✏️ Edit & Approve</button>' +
					'<button class="action-btn approve-btn" onclick="window.quickApproveSuggestion(' +
					suggestion.id +
					')">✅ Quick Approve</button>' +
					'<button class="action-btn reject-btn" onclick="window.rejectSuggestion(' +
					suggestion.id +
					')">❌ Reject</button>' +
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

/**
 * Quick approve suggestion without editing (original functionality)
 */
window.quickApproveSuggestion = async function (suggestionId) {
	const suggestion = window.suggestions.find((s) => s.id === suggestionId);
	if (!suggestion) return;

	// Show confirmation modal
	window.showConfirmModal(
		`Quickly approve this suggestion without editing?\n\nTask: ${suggestion.description}\nPoints: ${suggestion.suggestedPoints}\n\nThis will create the task exactly as suggested.`,
		async (confirmed) => {
			if (!confirmed) return;

			// Use the original approve function
			await window.approveSuggestion(suggestionId);
		}
	);
};

/**
 * Enhanced reject suggestion with reason
 */
window.rejectSuggestionWithReason = function (suggestionId) {
	const suggestion = window.suggestions.find((s) => s.id === suggestionId);
	if (!suggestion) return;

	const modal = document.createElement("div");
	modal.className = "modal-overlay";
	modal.innerHTML = `
		<div class="modal-content">
			<h3>❌ Reject Suggestion</h3>
			<p><strong>Task:</strong> ${window.escapeHtml(suggestion.description)}</p>
			<p><strong>Suggested by:</strong> ${
				window.users[suggestion.suggestedBy]?.displayName ||
				suggestion.suggestedBy
			}</p>
			
			<div class="form-group">
				<label class="form-label">Reason for Rejection (Optional)</label>
				<textarea 
					id="rejectionReason" 
					class="form-input" 
					rows="3"
					placeholder="Explain why this suggestion is being rejected..."
				></textarea>
			</div>

			<div class="modal-actions">
				<button id="confirmReject" class="action-btn reject-btn">Reject Suggestion</button>
				<button id="cancelReject" class="action-btn delete-btn">Cancel</button>
			</div>
		</div>
	`;

	document.body.appendChild(modal);

	document.getElementById("confirmReject").onclick = async function () {
		const reason = document.getElementById("rejectionReason").value.trim();

		const suggestionUpdates = {
			status: "rejected",
			reviewedBy: window.currentUser,
			reviewedAt: new Date().toISOString(),
			adminnotes: reason || "No reason provided",
		};

		const { error } = await window.supabase
			.from("suggestions")
			.update(suggestionUpdates)
			.eq("id", suggestionId);

		if (error) {
			console.error("Error rejecting suggestion:", error);
			window.showNotification("Failed to reject suggestion", "error");
		} else {
			window.showNotification(
				`Suggestion rejected${reason ? " with reason" : ""}`
			);
			await window.fetchSuggestionsInitial();
		}

		document.body.removeChild(modal);
	};

	document.getElementById("cancelReject").onclick = function () {
		document.body.removeChild(modal);
	};

	modal.onclick = function (e) {
		if (e.target === modal) {
			document.body.removeChild(modal);
		}
	};
};
/**
 * Shows the edit suggestion modal with all editable fields
 * @param {number} suggestionId - The ID of the suggestion to edit
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
			<hr style="border-color: var(--terminal-green); margin: 20px 0;">
			
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
						type="text" 
						id="editSuggestionDueDate" 
						class="form-input" 
						placeholder="Select a date and time..."
						value="${suggestion.suggestedDueDate || ""}"
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
					<option value="schinken">Pig (schinken)</option>
					<!-- Add more users here if needed -->
				</select>
			</div>

			<div class="suggestion-changes-preview" id="changesPreview" style="display: none;">
				<h4 style="color: var(--terminal-green);">📝 Changes Made:</h4>
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

	// Initialize date picker
	const dueDateInput = document.getElementById("editSuggestionDueDate");
	if (dueDateInput && typeof flatpickr !== "undefined") {
		flatpickr(dueDateInput, {
			enableTime: true,
			dateFormat: "Y-m-dTH:i",
			time_24hr: true,
			minuteIncrement: 1,
			placeholder: "Select a date and time...",
		});
	}

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
 * Preview changes made to the suggestion
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
	const assignee = document.getElementById("editSuggestionAssignee").value;

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

	if (dueDate !== (originalSuggestion.suggestedDueDate || "")) {
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
 * Approve the edited suggestion and create the task
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
		// Create the task with edited values
		const task = {
			text: description,
			status: "todo",
			type: "regular",
			createdAt: new Date().toISOString(),
			createdBy: window.currentUser, // Admin who approved it
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
			// Add reference to original suggestion
			originalSuggestionid: suggestionId,
			originalSuggestedby: suggestion.suggestedBy,
		};

		// Update the suggestion status with admin notes
		const suggestionUpdates = {
			status: "approved",
			reviewedBy: window.currentUser,
			reviewedAt: new Date().toISOString(),
			adminnotes: `Edited before approval. Original points: ${
				suggestion.suggestedPoints
			}, Final points: ${points}. ${
				justification ? "Admin notes: " + justification : ""
			}`,
		};

		// Insert task and update suggestion
		const { error: taskError } = await window.supabase
			.from("tasks")
			.insert([task]);

		const { error: suggestionError } = await window.supabase
			.from("suggestions")
			.update(suggestionUpdates)
			.eq("id", suggestionId);

		if (taskError || suggestionError) {
			console.error(
				"Error approving edited suggestion:",
				taskError || suggestionError
			);
			window.showNotification("Failed to approve suggestion", "error");
			return;
		}

		// Close modal
		const modal = document.querySelector(".modal-overlay");
		if (modal) {
			document.body.removeChild(modal);
		}

		window.showNotification(
			`Suggestion approved and edited! Task created with ${points} points${
				isRepeating ? " (Repeating)" : ""
			}`
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
