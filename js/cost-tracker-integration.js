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

			this.initializeElements();
			this.bindEvents();
			this.updateDisplay();
		}

		initializeElements() {
			this.timerDisplay = document.getElementById("timer");
			this.currentCostDisplay = document.getElementById("currentCost");
			this.finalTotalDiv = document.getElementById("finalTotal");
			this.billBreakdownDiv = document.getElementById("billBreakdown");

			this.startBtn = document.getElementById("startBtn");
			this.stopBtn = document.getElementById("stopBtn");
			this.resetBtn = document.getElementById("resetBtn");

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

		start() {
			if (!this.isRunning) {
				this.startTime = Date.now() - this.elapsedTime;
				this.isRunning = true;
				this.timerInterval = setInterval(() => this.updateTimer(), 100);
				this.costInterval = setInterval(
					() => this.incrementCost(),
					parseInt(this.intervalSelect.value)
				);
				if (this.startBtn) this.startBtn.disabled = true;
				if (this.stopBtn) this.stopBtn.disabled = false;
				if (this.finalTotalDiv)
					this.finalTotalDiv.classList.remove("show");
			}
		}

		stop() {
			if (this.isRunning) {
				this.isRunning = false;
				clearInterval(this.timerInterval);
				clearInterval(this.costInterval);
				if (this.startBtn) this.startBtn.disabled = false;
				if (this.stopBtn) this.stopBtn.disabled = true;
				this.showFinalTotal();
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
				this.penalties.push({
					description: description,
					amount: amount,
					id: Date.now(),
				});
				if (this.penaltyDescriptionInput)
					this.penaltyDescriptionInput.value = "";
				if (this.penaltyAmountInput) this.penaltyAmountInput.value = "";
				this.updatePenaltyList();
			}
		}

		removePenalty(id) {
			this.penalties = this.penalties.filter(
				(penalty) => penalty.id !== id
			);
			this.updatePenaltyList();
		}

		updatePenaltyList() {
			const currency = this.currencySelect
				? this.currencySelect.value
				: "€";
			let html = "";
			this.penalties.forEach((penalty) => {
				html += `
					<div class="penalty-item">
						<div class="penalty-description">${penalty.description}</div>
						<div class="penalty-amount">${this.formatCurrency(
							penalty.amount,
							currency
						)}</div>
						<button class="remove-penalty" onclick="window.costTracker.removePenalty(${
							penalty.id
						})">×</button>
					</div>
				`;
			});
			if (this.penaltyListDiv) this.penaltyListDiv.innerHTML = html;
		}

		formatCurrency(amount, currency) {
			return `${currency}${amount.toFixed(2)}`;
		}
	}

	function init() {
		// Initialize the application only if the elements exist
		const container = document.getElementById("cost-tracker-app");
		if (container) {
			costTrackerInstance = new CostTracker();
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

		// Fixed penalty points for all invoices
		const penaltyPoints = 100; // All invoices carry a 100 point penalty for non-payment

		const task = {
			text: finalDescription,
			status: "todo", // Starts as "todo" - user must mark as paid first
			type: "cost-tracker",
			createdAt: new Date().toISOString(),
			createdBy: window.currentUser,
			assignedTo: "schinken", // Invoice is sent to the user
			points: 0, // Invoices don't give reward points
			penaltyPoints: penaltyPoints, // Fixed 100 point penalty for non-payment
			// Set due date for payment (optional - 7 days from now)
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
				window.hideCostTracker();
				await window.fetchTasksInitial();

				// Store the detailed cost info for admin reference
				try {
					localStorage.setItem(
						`invoice_${Date.now()}`,
						JSON.stringify({
							timestamp: new Date().toISOString(),
							createdBy: window.currentUser,
							assignedTo: "schinken",
							totalAmount: costDetails.grandTotal,
							penaltyPoints: 100,
							costDetails: costDetails,
						})
					);
				} catch (storageError) {
					console.warn(
						"Could not store invoice details in localStorage:",
						storageError
					);
				}
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
	};
})();
