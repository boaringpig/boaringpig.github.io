// js/spiral-integration.js - Enhanced version with proper task creation
// Replace the sendSpiralConfigAsTask function with this enhanced version

window.spiral = (function () {
	// ... existing code remains the same until sendSpiralConfigAsTask function ...

	async function sendSpiralConfigAsTask() {
		const config = getSpiralConfiguration();

		// Show a modal to get task configuration from admin
		showSpiralTaskConfigModal(config);
	}

	function showSpiralTaskConfigModal(spiralConfig) {
		const modal = document.createElement("div");
		modal.className = "modal-overlay";
		modal.innerHTML = `
			<div class="modal-content">
				<h3>🌀 Create Spiral Task</h3>
				<p>Configure the task settings for this spiral:</p>
				
				<div class="form-group">
					<label class="form-label">Task Description</label>
					<input 
						type="text" 
						id="spiralTaskDescription" 
						class="form-input" 
						value="Experience the Spiral Animation" 
						placeholder="Enter task description..."
						maxlength="200"
					/>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label class="form-label">Points (Reward)</label>
						<input 
							type="number" 
							id="spiralTaskPoints" 
							class="form-input" 
							value="10" 
							min="1" 
							max="100"
						/>
					</div>
					<div class="form-group">
						<label class="form-label">Penalty Points</label>
						<input 
							type="number" 
							id="spiralTaskPenalty" 
							class="form-input" 
							value="5" 
							min="0" 
							max="50"
						/>
					</div>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label class="form-label">Due Date (Optional)</label>
						<input 
							type="text" 
							id="spiralTaskDueDate" 
							class="form-input" 
							placeholder="Select a date and time..."
						/>
					</div>
					<div class="form-group">
						<label class="form-label">
							<input type="checkbox" id="spiralTaskRepeating" />
							Repeating Task
						</label>
					</div>
				</div>

				<div class="form-group" id="spiralRepeatOptions" style="display: none;">
					<label class="form-label">Repeat Every</label>
					<select id="spiralRepeatInterval" class="form-input">
						<option value="daily">Daily</option>
						<option value="weekly">Weekly</option>
						<option value="monthly">Monthly</option>
					</select>
				</div>

				<div class="modal-actions">
					<button id="createSpiralTask" class="action-btn approve-btn">Create Task</button>
					<button id="cancelSpiralTask" class="action-btn delete-btn">Cancel</button>
				</div>
			</div>
		`;

		document.body.appendChild(modal);

		// Initialize date picker for the spiral task due date
		const dueDateInput = document.getElementById("spiralTaskDueDate");
		if (dueDateInput && typeof flatpickr !== "undefined") {
			flatpickr(dueDateInput, {
				enableTime: true,
				dateFormat: "Y-m-dTH:i",
				time_24hr: true,
				minuteIncrement: 1,
				placeholder: "Select a date and time...",
			});
		}

		// Handle repeating task checkbox
		const repeatingCheckbox = document.getElementById(
			"spiralTaskRepeating"
		);
		const repeatOptions = document.getElementById("spiralRepeatOptions");
		if (repeatingCheckbox && repeatOptions) {
			repeatingCheckbox.addEventListener("change", function () {
				repeatOptions.style.display = this.checked ? "block" : "none";
			});
		}

		// Handle create button
		document.getElementById("createSpiralTask").onclick =
			async function () {
				const description = document
					.getElementById("spiralTaskDescription")
					.value.trim();
				const points =
					parseInt(
						document.getElementById("spiralTaskPoints").value
					) || 10;
				const penaltyPoints =
					parseInt(
						document.getElementById("spiralTaskPenalty").value
					) || 5;
				const dueDate =
					document.getElementById("spiralTaskDueDate").value;
				const isRepeating = document.getElementById(
					"spiralTaskRepeating"
				).checked;
				const repeatInterval = isRepeating
					? document.getElementById("spiralRepeatInterval").value
					: null;

				if (!description) {
					window.showNotification(
						"Please enter a task description",
						"error"
					);
					return;
				}

				// Validate due date if provided
				if (dueDate) {
					const selectedDate = new Date(dueDate);
					const now = new Date();

					if (isNaN(selectedDate.getTime())) {
						window.showNotification(
							"Invalid due date format",
							"error"
						);
						return;
					}

					if (selectedDate < now) {
						window.showNotification(
							"Due date cannot be in the past",
							"error"
						);
						return;
					}
				}

				// Create the task with all required fields
				const task = {
					text: description,
					status: "todo",
					type: "spiral",
					createdAt: new Date().toISOString(),
					createdBy: window.currentUser,
					assignedTo: "schinken",
					points: points,
					penaltyPoints: penaltyPoints,
					dueDate: dueDate || null,
					isRepeating: isRepeating,
					repeatInterval: repeatInterval,
					completedAt: null,
					completedBy: null,
					approvedAt: null,
					approvedBy: null,
					isOverdue: false,
					spiralConfig: spiralConfig, // Store the spiral configuration
					// Add other required fields with default values
					appealStatus: null,
					appealedAt: null,
					appealReviewedAt: null,
					appealReviewedBy: null,
					acceptedAt: null,
					appealText: null,
					rejectedAt: null,
					rejectedBy: null,
				};

				try {
					const { error: taskError } = await window.supabase
						.from("tasks")
						.insert([task]);

					if (taskError) {
						console.error("Error creating spiral task:", taskError);
						window.showNotification(
							"Failed to create spiral task.",
							"error"
						);
					} else {
						window.showNotification(
							`Spiral task "${description}" created successfully! Points: ${points}, Penalty: ${penaltyPoints}${
								isRepeating ? " (Repeating)" : ""
							}`
						);

						// Close the spiral modal and task config modal
						document.body.removeChild(modal);
						window.hideSpiralGenerator();

						// Refresh tasks
						await window.fetchTasksInitial();
					}
				} catch (error) {
					console.error("Error in spiral task creation:", error);
					window.showNotification(
						"An error occurred while creating the task.",
						"error"
					);
				}
			};

		// Handle cancel button
		document.getElementById("cancelSpiralTask").onclick = function () {
			document.body.removeChild(modal);
		};

		// Click outside to close
		modal.onclick = function (e) {
			if (e.target === modal) {
				document.body.removeChild(modal);
			}
		};
	}

	// ... rest of the existing code remains the same ...

	// Update the exposed public functions to use the new implementation
	return {
		init,
		addSpiral,
		deleteSpiral,
		clearAllSpirals,
		startTextSequence,
		stopTextSequence,
		saveSpiralConfig,
		loadSpiralConfig,
		handleSpiralConfigFile,
		sendSpiralConfigAsTask, // This now uses the enhanced version
		getSpiralConfiguration,
		applyConfiguration,
		initDefaultText,
	};
})();
