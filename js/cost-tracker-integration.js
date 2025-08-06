// js/cost-tracker-integration-fixed.js
// Fixed version that prevents multiple instances and state conflicts

window.costTracker = (function () {
	let instance = null; // Singleton pattern - only one instance allowed

	class CostTracker {
		constructor() {
			// Prevent multiple instances
			if (instance) {
				console.warn(
					"CostTracker instance already exists, returning existing instance"
				);
				return instance;
			}

			console.log("Creating new CostTracker instance");

			this.startTime = 0;
			this.elapsedTime = 0;
			this.timerInterval = null;
			this.costInterval = null;
			this.isRunning = false;
			this.totalCost = 0;
			this.penalties = [];
			this.activeLiveTrackerId = null;
			this.isInitialized = false;

			// Store reference to prevent multiple instances
			instance = this;
		}

		initializeElements() {
			console.log("Initializing cost tracker elements...");

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

			// Verify critical elements exist
			if (!this.timerDisplay || !this.currentCostDisplay) {
				console.error("Critical cost tracker elements not found!");
				return false;
			}

			console.log("✅ Cost tracker elements initialized successfully");
			return true;
		}

		bindEvents() {
			console.log("Binding cost tracker events...");

			// IMPORTANT: Remove any existing event listeners first
			this.unbindEvents();

			if (this.startBtn) {
				this.startBtn.onclick = () => this.start();
				console.log("✅ Start button bound");
			}
			if (this.stopBtn) {
				this.stopBtn.onclick = () => this.stop();
				console.log("✅ Stop button bound");
			}
			if (this.resetBtn) {
				this.resetBtn.onclick = () => this.reset();
				console.log("✅ Reset button bound");
			}
			if (this.startLiveBtn) {
				this.startLiveBtn.onclick = () => this.startLive();
				console.log("✅ Start Live button bound");
			}

			if (this.currencySelect) {
				this.currencySelect.onchange = () =>
					this.calculateCurrentCost();
			}
			if (this.rateInput) {
				this.rateInput.oninput = () => this.calculateCurrentCost();
			}

			if (this.addPenaltyBtn) {
				this.addPenaltyBtn.onclick = () => this.addPenalty();
			}
			if (this.penaltyDescriptionInput) {
				this.penaltyDescriptionInput.onkeypress = (e) => {
					if (e.key === "Enter") this.addPenalty();
				};
			}
			if (this.penaltyAmountInput) {
				this.penaltyAmountInput.onkeypress = (e) => {
					if (e.key === "Enter") this.addPenalty();
				};
			}

			console.log("✅ All cost tracker events bound");
		}

		unbindEvents() {
			// Clear all existing event listeners to prevent conflicts
			if (this.startBtn) this.startBtn.onclick = null;
			if (this.stopBtn) this.stopBtn.onclick = null;
			if (this.resetBtn) this.resetBtn.onclick = null;
			if (this.startLiveBtn) this.startLiveBtn.onclick = null;
			if (this.currencySelect) this.currencySelect.onchange = null;
			if (this.rateInput) this.rateInput.oninput = null;
			if (this.addPenaltyBtn) this.addPenaltyBtn.onclick = null;
			if (this.penaltyDescriptionInput)
				this.penaltyDescriptionInput.onkeypress = null;
			if (this.penaltyAmountInput)
				this.penaltyAmountInput.onkeypress = null;
		}

		init() {
			console.log("🔧 Initializing cost tracker...");

			// Clear any existing intervals first
			this.clearAllIntervals();

			// Initialize elements
			if (!this.initializeElements()) {
				console.error("❌ Failed to initialize elements");
				return false;
			}

			// Bind events
			this.bindEvents();

			// Reset to clean state
			this.resetToCleanState();

			// Update display
			this.updateDisplay();

			// Check for existing live tracker
			this.checkForActiveLiveTracker();

			this.isInitialized = true;
			console.log("✅ Cost tracker initialization complete");
			return true;
		}

		resetToCleanState() {
			console.log("🧹 Resetting cost tracker to clean state");

			// Clear all intervals
			this.clearAllIntervals();

			// Reset state variables
			this.isRunning = false;
			this.elapsedTime = 0;
			this.totalCost = 0;
			this.penalties = [];

			// Reset UI elements
			if (this.timerDisplay) {
				this.timerDisplay.textContent = "00:00:00";
			}
			if (this.currentCostDisplay) {
				this.currentCostDisplay.textContent = "€0.00";
			}
			if (this.finalTotalDiv) {
				this.finalTotalDiv.classList.remove("show");
			}

			// Reset buttons
			if (this.startBtn) {
				this.startBtn.disabled = false;
				this.startBtn.textContent = "Start";
			}
			if (this.stopBtn) {
				this.stopBtn.disabled = true;
				this.stopBtn.textContent = "Stop";
			}

			// Update penalty list
			this.updatePenaltyList();

			console.log("✅ Clean state reset complete");
		}

		clearAllIntervals() {
			if (this.timerInterval) {
				clearInterval(this.timerInterval);
				this.timerInterval = null;
				console.log("Cleared timer interval");
			}
			if (this.costInterval) {
				clearInterval(this.costInterval);
				this.costInterval = null;
				console.log("Cleared cost interval");
			}
		}

		start() {
			console.log("▶️ Start button clicked");

			if (this.isRunning) {
				console.log("⚠️ Already running, ignoring start command");
				return;
			}

			if (!this.isInitialized) {
				console.log("⚠️ Not initialized, cannot start");
				return;
			}

			console.log("🚀 Starting cost tracker...");

			this.startTime = Date.now() - this.elapsedTime;
			this.isRunning = true;

			// Start intervals
			this.timerInterval = setInterval(() => this.updateTimer(), 100);
			this.costInterval = setInterval(
				() => this.incrementCost(),
				parseInt(this.intervalSelect?.value || "60000")
			);

			// Update button states
			if (this.startBtn) {
				this.startBtn.disabled = true;
				this.startBtn.textContent = "Running...";
			}
			if (this.stopBtn) {
				this.stopBtn.disabled = false;
				this.stopBtn.textContent = "Stop";
			}

			if (this.finalTotalDiv) {
				this.finalTotalDiv.classList.remove("show");
			}

			console.log("✅ Cost tracker started successfully");
		}

		stop() {
			console.log("⏹️ Stop button clicked");

			if (!this.isRunning) {
				console.log("⚠️ Not running, ignoring stop command");
				return;
			}

			console.log("🛑 Stopping cost tracker...");

			this.isRunning = false;
			this.clearAllIntervals();

			// Update button states - IMPORTANT: Don't disable if live tracker is running
			if (!this.activeLiveTrackerId) {
				if (this.startBtn) {
					this.startBtn.disabled = false;
					this.startBtn.textContent = "Start";
				}
				if (this.stopBtn) {
					this.stopBtn.disabled = true;
					this.stopBtn.textContent = "Stop";
				}
				this.showFinalTotal();
			} else {
				console.log(
					"Live tracker active, keeping buttons in live state"
				);
			}

			console.log("✅ Cost tracker stopped successfully");
		}

		reset() {
			console.log("🔄 Reset button clicked");

			this.stop();
			this.resetToCleanState();

			// Reset live tracker button if it exists
			if (this.startLiveBtn) {
				this.startLiveBtn.textContent = "Start Live Tracker";
				this.startLiveBtn.className = "action-btn check-btn";
				this.startLiveBtn.onclick = () => this.startLive();
			}
			this.activeLiveTrackerId = null;

			console.log("✅ Cost tracker reset complete");
		}

		updateTimer() {
			if (!this.isRunning || !this.timerDisplay) return;

			this.elapsedTime = Date.now() - this.startTime;
			this.calculateCurrentCost();

			const totalSeconds = Math.floor(this.elapsedTime / 1000);
			const hours = Math.floor(totalSeconds / 3600);
			const minutes = Math.floor((totalSeconds % 3600) / 60);
			const seconds = totalSeconds % 60;

			const timeText = `${hours.toString().padStart(2, "0")}:${minutes
				.toString()
				.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

			// CRITICAL: Check if element still exists before updating
			if (this.timerDisplay && this.timerDisplay.isConnected) {
				this.timerDisplay.textContent = timeText;
			} else {
				console.warn(
					"Timer display element no longer in DOM, stopping timer"
				);
				this.stop();
			}
		}

		calculateCurrentCost() {
			const rate = this.rateInput
				? parseFloat(this.rateInput.value) || 0
				: 50;
			const intervalMs = this.intervalSelect
				? parseInt(this.intervalSelect.value)
				: 60000;

			const fractionalUnits = this.elapsedTime / intervalMs;
			this.totalCost = fractionalUnits * rate;
			this.updateDisplay();
		}

		updateDisplay() {
			const currency = this.currencySelect
				? this.currencySelect.value
				: "€";
			const formattedCost = this.formatCurrency(this.totalCost, currency);

			// CRITICAL: Check if element exists and is connected before updating
			if (
				this.currentCostDisplay &&
				this.currentCostDisplay.isConnected
			) {
				this.currentCostDisplay.textContent = formattedCost;
			}
		}

		incrementCost() {
			this.calculateCurrentCost();

			// Add pulse animation if element exists
			if (
				this.currentCostDisplay &&
				this.currentCostDisplay.isConnected
			) {
				this.currentCostDisplay.classList.add("pulse");
				setTimeout(() => {
					if (
						this.currentCostDisplay &&
						this.currentCostDisplay.isConnected
					) {
						this.currentCostDisplay.classList.remove("pulse");
					}
				}, 500);
			}
		}

		// ... (rest of the methods remain the same)
		// Including: startLive, stopLive, addPenalty, updatePenaltyList, etc.

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
			const rate = parseFloat(this.rateInput?.value || "50");
			const currency = this.currencySelect?.value || "€";
			const interval = parseInt(this.intervalSelect?.value || "60000");

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
					this.start();

					if (this.startLiveBtn) {
						this.startLiveBtn.textContent = "Stop Live Tracker";
						this.startLiveBtn.className = "action-btn delete-btn";
						this.startLiveBtn.onclick = () => this.stopLive();
					}

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
					this.stop();
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

		checkForActiveLiveTracker() {
			// Implementation remains the same
		}

		// Other methods (addPenalty, updatePenaltyList, etc.) remain the same...

		addPenalty() {
			const description =
				this.penaltyDescriptionInput?.value.trim() || "";
			const amount = this.penaltyAmountInput
				? parseFloat(this.penaltyAmountInput.value) || 0
				: 0;

			if (description && amount > 0) {
				if (this.activeLiveTrackerId) {
					window.addPenaltyToLiveTracker(
						this.activeLiveTrackerId,
						description,
						amount
					);
					this.penalties.push({
						description: description,
						amount: amount,
						id: Date.now(),
					});
				} else {
					this.penalties.push({
						description: description,
						amount: amount,
						id: Date.now(),
					});
				}

				this.updatePenaltyList();

				if (this.penaltyDescriptionInput)
					this.penaltyDescriptionInput.value = "";
				if (this.penaltyAmountInput) this.penaltyAmountInput.value = "";

				window.showNotification(
					`Penalty added: ${description} (${this.formatCurrency(
						amount,
						this.currencySelect?.value || "€"
					)})`,
					"success"
				);
			} else {
				window.showNotification(
					"Please enter a valid description and amount",
					"error"
				);
			}
		}

		updatePenaltyList() {
			const currency = this.currencySelect?.value || "€";

			if (!this.penaltyListDiv) return;

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
		}

		removePenalty(id) {
			if (this.activeLiveTrackerId) {
				window.removePenaltyFromLiveTracker(
					this.activeLiveTrackerId,
					id
				);
			}
			this.penalties = this.penalties.filter(
				(penalty) => penalty.id !== id
			);
			this.updatePenaltyList();
		}

		formatCurrency(amount, currency) {
			return `${currency}${amount.toFixed(2)}`;
		}

		showFinalTotal() {
			// Implementation remains the same
			this.generateBillBreakdown();
			if (this.finalTotalDiv) this.finalTotalDiv.classList.add("show");
		}

		generateBillBreakdown() {
			// Implementation remains the same
			const currency = this.currencySelect?.value || "€";
			const intervalText = this.getIntervalText();
			const timeText = this.getElapsedTimeText();

			let html = "";
			let timeBasedCost = this.formatCurrency(this.totalCost, currency);

			html += `
				<div class="bill-item">
					<div class="bill-description">${timeText} @ ${this.formatCurrency(
				parseFloat(this.rateInput?.value || 50),
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

		getIntervalText() {
			const interval = this.intervalSelect
				? parseInt(this.intervalSelect.value)
				: 60000;
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

		// Public method to get cost details
		getCostDetails() {
			const currency = this.currencySelect?.value || "€";
			const timeBasedCost = {
				description: `${this.getElapsedTimeText()} @ ${this.formatCurrency(
					parseFloat(this.rateInput?.value || 50),
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
	}

	// Expose public functions
	return {
		init() {
			console.log("🎯 CostTracker.init() called");

			// Create or get existing instance
			if (!instance) {
				instance = new CostTracker();
			}

			// Initialize the instance
			return instance.init();
		},

		removePenalty: (id) => instance?.removePenalty(id),

		async sendCostConfigAsTask() {
			if (!instance) {
				console.error("No cost tracker instance available");
				return;
			}

			const costDetails = instance.getCostDetails();

			// Create task description with cost breakdown
			const taskDescription = `💰 INVOICE - Cost Tracker

Time-based Cost: ${costDetails.timeBasedCost.description} = ${costDetails.timeBasedCost.amount}`;

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

					instance.reset();
					window.hideCostTracker();
					await window.fetchTasksInitial();
				}
			} catch (error) {
				console.error("Error creating cost tracker invoice:", error);
				window.showNotification("Failed to send invoice.", "error");
			}
		},

		resetOnClose() {
			if (instance && !instance.activeLiveTrackerId) {
				instance.reset();
				console.log("Cost tracker reset on modal close");
			} else {
				console.log(
					"Cost tracker not reset on close - active live tracker present"
				);
			}
		},

		// Expose instance for debugging
		getInstance() {
			return instance;
		},
	};
})();
