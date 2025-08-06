// js/cost-tracker-integration.js
// This file contains the logic for the cost tracker and its integration.

window.costTracker = (function () {
	let costTrackerInstance = null;

	class CostTracker {
		constructor() {
			this.startTime = 0;
			this.elapsedTime = 0;
			this.timerInterval = null;
			this.costInterval = null;
			this.isRunning = false;
			this.totalCost = 0;
			this.penalties = [];
			this.activeLiveTrackerId = null;

			this.initializeElements();
			this.bindEvents();
			this.updateDisplay();
			this.checkForActiveLiveTracker();
		}

		initializeElements() {
			this.timerDisplay = document.getElementById("timer");
			this.currentCostDisplay = document.getElementById("currentCost");
			this.finalTotalDiv = document.getElementById("finalTotal");
			this.billBreakdownDiv = document.getElementById("billBreakdown");

			this.startBtn = document.getElementById("startBtn");
			this.stopBtn = document.getElementById("stopBtn");
			this.resetBtn = document.getElementById("resetBtn");
			this.startLiveBtn = document.getElementById("startLiveBtn");

			this.rateInput = document.getElementById("rate");
			this.currencySelect = document.getElementById("currency");
			this.intervalSelect = document.getElementById("interval");

			this.penaltyDescriptionInput =
				document.getElementById("penaltyDescription");
			this.penaltyAmountInput = document.getElementById("penaltyAmount");
			this.addPenaltyBtn = document.getElementById("addPenaltyBtn");
			this.penaltyListDiv = document.getElementById("penaltyList");
		}

		bindEvents() {
			if (this.startBtn)
				this.startBtn.addEventListener("click", () => this.start());
			if (this.stopBtn)
				this.stopBtn.addEventListener("click", () => this.stop());
			if (this.resetBtn)
				this.resetBtn.addEventListener("click", () => this.reset());
			if (this.startLiveBtn)
				this.startLiveBtn.addEventListener("click", () =>
					this.startLive()
				);

			if (this.currencySelect)
				this.currencySelect.addEventListener("change", () =>
					this.calculateCurrentCost()
				);
			if (this.rateInput)
				this.rateInput.addEventListener("input", () =>
					this.calculateCurrentCost()
				);

			if (this.addPenaltyBtn)
				this.addPenaltyBtn.addEventListener("click", () =>
					this.addPenalty()
				);
			if (this.penaltyDescriptionInput)
				this.penaltyDescriptionInput.addEventListener(
					"keypress",
					(e) => {
						if (e.key === "Enter") this.addPenalty();
					}
				);
			if (this.penaltyAmountInput)
				this.penaltyAmountInput.addEventListener("keypress", (e) => {
					if (e.key === "Enter") this.addPenalty();
				});
		}

		resetOnOpen() {
			// Reset everything when modal opens, but don't reset if there's an active live tracker
			if (!this.activeLiveTrackerId) {
				this.stop();
				this.elapsedTime = 0;
				this.totalCost = 0;
				this.penalties = [];
				this.updateTimer();
				this.calculateCurrentCost();
				this.updatePenaltyList();
				if (this.finalTotalDiv)
					this.finalTotalDiv.classList.remove("show");
				if (this.startBtn) this.startBtn.disabled = false;
				if (this.stopBtn) this.stopBtn.disabled = true;
				console.log("Cost tracker reset on modal open");
			} else {
				console.log(
					"Cost tracker not reset - active live tracker present"
				);
			}
		}

		checkForActiveLiveTracker() {
			// Check if there's already an active live tracker when opening the modal
			if (
				window.activeCostTrackers &&
				Array.isArray(window.activeCostTrackers)
			) {
				const runningTrackers = window.activeCostTrackers.filter(
					(t) =>
						t.status === "running" &&
						t.created_by === window.currentUser
				);

				if (runningTrackers.length > 0) {
					const tracker = runningTrackers[0];
					this.activeLiveTrackerId = tracker.id;

					// Update UI to reflect active live tracker
					if (this.startLiveBtn) {
						this.startLiveBtn.textContent = "Stop Live Tracker";
						this.startLiveBtn.className = "action-btn delete-btn";
						this.startLiveBtn.onclick = () => this.stopLive();
					}

					// Start local timer to sync with live tracker
					const startTime = new Date(tracker.started_at);
					const elapsed = Date.now() - startTime.getTime();
					this.elapsedTime = Math.max(0, elapsed);
					this.start();

					// Load existing penalties from live tracker
					try {
						const existingPenalties = JSON.parse(
							tracker.penalties || "[]"
						);
						this.penalties = existingPenalties.map((p) => ({
							id: p.id || Date.now(),
							description: p.description,
							amount: parseFloat(p.amount) || 0,
						}));
						this.updatePenaltyList();
					} catch (e) {
						console.warn("Error loading existing penalties:", e);
					}

					console.log("Resumed existing live tracker:", tracker.id);
				}
			}
		}

		start() {
			if (!this.isRunning) {
				this.startTime = Date.now() - this.elapsedTime;
				this.isRunning = true;
				this.timerInterval = setInterval(() => this.updateTimer(), 100);
				this.costInterval = setInterval(
					() => this.incrementCost(),
					parseInt(this.intervalSelect.value)
				);

				// Update button states - but don't disable if live tracker is running
				if (!this.activeLiveTrackerId) {
					if (this.startBtn) this.startBtn.disabled = true;
					if (this.stopBtn) this.stopBtn.disabled = false;
				}

				if (this.finalTotalDiv)
					this.finalTotalDiv.classList.remove("show");
			}
		}

		stop() {
			if (this.isRunning) {
				this.isRunning = false;
				clearInterval(this.timerInterval);
				clearInterval(this.costInterval);

				// Update button states - but don't enable if live tracker is running
				if (!this.activeLiveTrackerId) {
					if (this.startBtn) this.startBtn.disabled = false;
					if (this.stopBtn) this.stopBtn.disabled = true;
					this.showFinalTotal();
				}
			}
		}

		async startLive() {
			if (!window.hasPermission("create_task")) {
				window.showNotification(
					"You do not have permission to start live trackers",
					"error"
				);
				return;
			}

			// Stop any existing live tracker first
			await window.stopAllActiveCostTrackers();

			const description = "Live Cost Tracker";
			const rate = parseFloat(this.rateInput.value) || 50;
			const currency = this.currencySelect.value || "€";
			const interval = parseInt(this.intervalSelect.value) || 60000;

			// Include any existing local penalties when starting live tracker
			const existingPenalties = this.penalties.map((p) => ({
				id: p.id,
				description: p.description,
				amount: p.amount,
				added_at: new Date().toISOString(),
			}));

			try {
				const trackerId = await window.startLiveCostTracker(
					description,
					rate,
					currency,
					interval,
					existingPenalties
				);

				if (trackerId) {
					this.activeLiveTrackerId = trackerId;

					// Start the local timer when starting live tracker
					this.start();

					if (this.startLiveBtn) {
						this.startLiveBtn.textContent = "Stop Live Tracker";
						this.startLiveBtn.className = "action-btn delete-btn";
						this.startLiveBtn.onclick = () => this.stopLive();
					}

					// Disable regular start/stop buttons while live tracker is running
					if (this.startBtn) this.startBtn.disabled = true;
					if (this.stopBtn) this.stopBtn.disabled = true;

					window.showNotification(
						"Live cost tracker started with local timer!"
					);
				}
			} catch (error) {
				console.error("Error starting live tracker:", error);
				window.showNotification(
					"Failed to start live tracker",
					"error"
				);
			}
		}

		async stopLive() {
			if (this.activeLiveTrackerId) {
				try {
					// Stop the local timer first
					this.stop();

					// Then stop the live tracker in the database
					await window.stopLiveCostTracker(
						this.activeLiveTrackerId,
						true
					);
					this.activeLiveTrackerId = null;

					if (this.startLiveBtn) {
						this.startLiveBtn.textContent = "Start Live Tracker";
						this.startLiveBtn.className = "action-btn check-btn";
						this.startLiveBtn.onclick = () => this.startLive();
					}

					// Re-enable regular start/stop buttons
					if (this.startBtn) this.startBtn.disabled = false;
					if (this.stopBtn) this.stopBtn.disabled = true;

					window.showNotification(
						"Live cost tracker stopped and invoice created!"
					);
				} catch (error) {
					console.error("Error stopping live tracker:", error);
					window.showNotification(
						"Failed to stop live tracker",
						"error"
					);
				}
			}
		}

		reset() {
			this.stop();
			this.elapsedTime = 0;
			this.totalCost = 0;
			this.penalties = [];
			this.updateTimer();
			this.calculateCurrentCost();
			this.updatePenaltyList();
			if (this.finalTotalDiv) this.finalTotalDiv.classList.remove("show");
			if (this.startBtn) this.startBtn.disabled = false;
			if (this.stopBtn) this.stopBtn.disabled = true;

			// Reset live tracker button if it exists
			if (this.startLiveBtn) {
				this.startLiveBtn.textContent = "Start Live Tracker";
				this.startLiveBtn.className = "action-btn check-btn";
				this.startLiveBtn.onclick = () => this.startLive();
			}
			this.activeLiveTrackerId = null;

			console.log("Cost tracker reset to initial state");
		}

		updateTimer() {
			if (this.isRunning) {
				this.elapsedTime = Date.now() - this.startTime;
				this.calculateCurrentCost();
			}
			const totalSeconds = Math.floor(this.elapsedTime / 1000);
			const hours = Math.floor(totalSeconds / 3600);
			const minutes = Math.floor((totalSeconds % 3600) / 60);
			const seconds = totalSeconds % 60;

			if (this.timerDisplay) {
				this.timerDisplay.textContent = `${hours
					.toString()
					.padStart(2, "0")}:${minutes
					.toString()
					.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
			}
		}

		incrementCost() {
			this.calculateCurrentCost();
			if (this.currentCostDisplay) {
				this.currentCostDisplay.classList.add("pulse");
				setTimeout(() => {
					this.currentCostDisplay.classList.remove("pulse");
				}, 500);
			}
		}

		calculateCurrentCost() {
			const rate = this.rateInput
				? parseFloat(this.rateInput.value) || 0
				: 0;
			const intervalMs = this.intervalSelect
				? parseInt(this.intervalSelect.value)
				: 1000;
			const fractionalUnits = this.elapsedTime / intervalMs;
			this.totalCost = fractionalUnits * rate;
			this.updateDisplay();
		}

		updateDisplay() {
			const currency = this.currencySelect
				? this.currencySelect.value
				: "€";
			const formattedCost = this.formatCurrency(this.totalCost, currency);
			if (this.currentCostDisplay)
				this.currentCostDisplay.textContent = formattedCost;
		}

		showFinalTotal() {
			this.generateBillBreakdown();
			if (this.finalTotalDiv) this.finalTotalDiv.classList.add("show");
		}

		generateBillBreakdown() {
			const currency = this.currencySelect
				? this.currencySelect.value
				: "€";
			const intervalText = this.getIntervalText();
			const timeText = this.getElapsedTimeText();

			let html = "";
			let timeBasedCost = this.formatCurrency(this.totalCost, currency);

			html += `
				<div class="bill-item">
					<div class="bill-description">${timeText} @ ${this.formatCurrency(
				parseFloat(this.rateInput.value) || 0,
				currency
			)} per ${intervalText}</div>
					<div class="bill-amount">${timeBasedCost}</div>
				</div>
			`;

			let penaltyTotal = 0;
			this.penalties.forEach((penalty) => {
				penaltyTotal += penalty.amount;
				html += `
					<div class="bill-item">
						<div class="bill-description">${penalty.description}</div>
						<div class="bill-amount">${this.formatCurrency(penalty.amount, currency)}</div>
					</div>
				`;
			});

			const grandTotal = this.totalCost + penaltyTotal;
			html += `
				<div class="bill-item">
					<div class="bill-description"><strong>TOTAL</strong></div>
					<div class="bill-amount">${this.formatCurrency(grandTotal, currency)}</div>
				</div>
			`;

			if (this.billBreakdownDiv) this.billBreakdownDiv.innerHTML = html;
		}

		getCostDetails() {
			const currency = this.currencySelect
				? this.currencySelect.value
				: "€";
			const timeBasedCost = {
				description: `${this.getElapsedTimeText()} @ ${this.formatCurrency(
					parseFloat(this.rateInput.value) || 0,
					currency
				)} per ${this.getIntervalText()}`,
				amount: this.formatCurrency(this.totalCost, currency),
			};
			const penalties = this.penalties.map((p) => ({
				description: p.description,
				amount: this.formatCurrency(p.amount, currency),
			}));
			const grandTotal =
				this.totalCost +
				this.penalties.reduce((sum, p) => sum + p.amount, 0);

			return {
				timeBasedCost,
				penalties,
				grandTotal: this.formatCurrency(grandTotal, currency),
				timestamp: new Date().toISOString(),
			};
		}

		getIntervalText() {
			const interval = this.intervalSelect
				? parseInt(this.intervalSelect.value)
				: 1000;
			switch (interval) {
				case 1000:
					return "second";
				case 60000:
					return "minute";
				case 3600000:
					return "hour";
				default:
					return "unit";
			}
		}

		getElapsedTimeText() {
			const totalSeconds = Math.floor(this.elapsedTime / 1000);
			const hours = Math.floor(totalSeconds / 3600);
			const minutes = Math.floor((totalSeconds % 3600) / 60);
			const seconds = totalSeconds % 60;

			if (hours > 0) {
				return `${hours}h ${minutes}m ${seconds}s`;
			} else if (minutes > 0) {
				return `${minutes}m ${seconds}s`;
			} else {
				return `${seconds}s`;
			}
		}

		addPenalty() {
			const description = this.penaltyDescriptionInput
				? this.penaltyDescriptionInput.value.trim()
				: "";
			const amount = this.penaltyAmountInput
				? parseFloat(this.penaltyAmountInput.value) || 0
				: 0;

			if (description && amount > 0) {
				if (this.activeLiveTrackerId) {
					// Add penalty to live tracker in database
					window.addPenaltyToLiveTracker(
						this.activeLiveTrackerId,
						description,
						amount
					);
					// Also add to local penalties array for immediate UI feedback
					this.penalties.push({
						description: description,
						amount: amount,
						id: Date.now(),
					});
				} else {
					// Add penalty to local tracker only
					this.penalties.push({
						description: description,
						amount: amount,
						id: Date.now(),
					});
				}

				// Always update local penalty list for immediate feedback
				this.updatePenaltyList();

				// Clear input fields
				if (this.penaltyDescriptionInput)
					this.penaltyDescriptionInput.value = "";
				if (this.penaltyAmountInput) this.penaltyAmountInput.value = "";

				// Show success notification
				window.showNotification(
					`Penalty added: ${description} (${this.formatCurrency(
						amount,
						this.currencySelect?.value || "€"
					)})`,
					"success"
				);
			} else {
				// Show error if fields are invalid
				window.showNotification(
					"Please enter a valid description and amount",
					"error"
				);
			}
		}

		removePenalty(id) {
			if (this.activeLiveTrackerId) {
				// Try to remove from live tracker first
				window.removePenaltyFromLiveTracker(
					this.activeLiveTrackerId,
					id
				);
			}

			// Always remove from local penalties array
			this.penalties = this.penalties.filter(
				(penalty) => penalty.id !== id
			);
			this.updatePenaltyList();
		}

		updatePenaltyList() {
			const currency = this.currencySelect
				? this.currencySelect.value
				: "€";

			if (!this.penaltyListDiv) {
				console.warn("Penalty list div not found");
				return;
			}

			let html = "";

			if (this.penalties.length === 0) {
				html =
					'<div class="empty-penalty-state" style="color: var(--terminal-gray); font-style: italic; padding: 10px; text-align: center;">No penalties added yet</div>';
			} else {
				this.penalties.forEach((penalty) => {
					html += `
						<div class="penalty-item">
							<div class="penalty-description">${
								window.escapeHtml
									? window.escapeHtml(penalty.description)
									: penalty.description
							}</div>
							<div class="penalty-amount">${this.formatCurrency(
								penalty.amount,
								currency
							)}</div>
							<button class="remove-penalty" onclick="window.costTracker.removePenalty(${
								penalty.id
							})" title="Remove penalty">×</button>
						</div>
					`;
				});
			}

			this.penaltyListDiv.innerHTML = html;
			console.log(
				`Updated penalty list with ${this.penalties.length} penalties`
			);
		}

		formatCurrency(amount, currency) {
			return `${currency}${amount.toFixed(2)}`;
		}
	}

	function init() {
		// Initialize the application only if the elements exist
		const container = document.getElementById("cost-tracker-app");
		if (container) {
			console.log("Initializing cost tracker...");
			costTrackerInstance = new CostTracker();

			// Reset tracker when modal is opened (init is called each time modal opens)
			costTrackerInstance.resetOnOpen();

			console.log("Cost tracker initialized successfully");
		} else {
			console.warn("Cost tracker container not found");
		}
	}

	async function sendCostConfigAsTask() {
		const costDetails = costTrackerInstance.getCostDetails();

		// Create task description with cost breakdown
		const taskDescription = `💰 INVOICE - Cost Tracker

Time-based Cost: ${costDetails.timeBasedCost.description} = ${costDetails.timeBasedCost.amount}`;

		// Add penalties to description if any exist
		let penaltiesText = "";
		if (costDetails.penalties && costDetails.penalties.length > 0) {
			penaltiesText =
				"\n\nAdditional Costs:\n" +
				costDetails.penalties
					.map((p) => `• ${p.description}: ${p.amount}`)
					.join("\n");
		}

		const finalDescription =
			taskDescription +
			penaltiesText +
			`\n\n💸 TOTAL AMOUNT DUE: ${costDetails.grandTotal}\n\n⚠️ This is an invoice that must be approved for payment. Failure to approve will result in penalty points.`;

		const task = {
			text: finalDescription,
			status: "todo",
			type: "cost-tracker",
			createdAt: new Date().toISOString(),
			createdBy: window.currentUser,
			assignedTo: "schinken",
			points: 0,
			penaltyPoints: 100,
			dueDate: new Date(
				Date.now() + 7 * 24 * 60 * 60 * 1000
			).toISOString(),
			isRepeating: false,
			repeatInterval: null,
		};

		try {
			const { error: taskError } = await window.supabase
				.from("tasks")
				.insert([task]);

			if (taskError) {
				console.error(
					"Error creating cost tracker invoice:",
					taskError
				);
				window.showNotification("Failed to send invoice.", "error");
			} else {
				window.showNotification(
					`Invoice sent successfully! Total: ${costDetails.grandTotal} (Penalty for non-payment: 100 points)`
				);

				// Reset and close the cost tracker after sending
				costTrackerInstance.reset();
				window.hideCostTracker();
				await window.fetchTasksInitial();
			}
		} catch (error) {
			console.error("Error creating cost tracker invoice:", error);
			window.showNotification("Failed to send invoice.", "error");
		}
	}

	// Expose public functions
	return {
		init,
		removePenalty: (id) => costTrackerInstance?.removePenalty(id),
		sendCostConfigAsTask,
		resetOnClose: () => {
			if (costTrackerInstance) {
				// Don't reset if there's an active live tracker
				if (!costTrackerInstance.activeLiveTrackerId) {
					costTrackerInstance.reset();
					console.log("Cost tracker reset on modal close");
				} else {
					console.log(
						"Cost tracker not reset on close - active live tracker present"
					);
				}
			}
		},
	};
})();
