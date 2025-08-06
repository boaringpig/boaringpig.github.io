// js/cost-tracker-modal-content.js
// This file creates the cost tracker modal content dynamically

/**
 * Creates the cost tracker modal content and injects it into the DOM
 * This replaces the static HTML that was previously in the HTML file
 */
window.initializeCostTrackerModalContent = function () {
	const costTrackerApp = document.getElementById("cost-tracker-app");
	if (!costTrackerApp) {
		console.warn("Cost tracker app container not found");
		return;
	}

	// Create the cost tracker interface dynamically
	costTrackerApp.innerHTML = `
        <h1>💰 Cost Tracker</h1>

        <div class="main-content">
            <div class="tracker-section">
                <div class="settings">
                    <div class="input-group">
                        <label for="rate">Rate per unit:</label>
                        <input
                            type="number"
                            id="rate"
                            value="50"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div class="input-group">
                        <label for="currency">Currency:</label>
                        <select id="currency">
                            <option value="€">Euro (€)</option>
                            <option value="£">Pound (£)</option>
                            <option value="$">Dollar ($)</option>
                        </select>
                    </div>

                    <div class="input-group">
                        <label for="interval">Increment every:</label>
                        <select id="interval">
                            <option value="1000">1 Second</option>
                            <option value="60000" selected>1 Minute</option>
                            <option value="3600000">1 Hour</option>
                        </select>
                    </div>
                </div>

                <div class="timer-display" id="timer">00:00:00</div>

                <div class="cost-display">
                    <div class="cost-label">Current Cost</div>
                    <div class="cost-amount" id="currentCost">€0.00</div>
                </div>

                <div class="controls">
                    <button id="startBtn">Start</button>
                    <button id="stopBtn" disabled class="stop-btn">Stop</button>
                    <button id="resetBtn" class="reset-btn">Reset</button>
                    <!-- NEW: Start Live Tracker Button -->
                    <button id="startLiveBtn" class="action-btn check-btn">Start Live Tracker</button>
                </div>
            </div>

            <div class="penalties-section">
                <div class="penalties-header">📋 Additional Costs / Penalties</div>
                <div class="penalty-input">
                    <input
                        type="text"
                        id="penaltyDescription"
                        placeholder="Description (e.g., Late delivery fee)"
                    />
                    <input
                        type="number"
                        id="penaltyAmount"
                        placeholder="Amount"
                        min="0"
                        step="0.01"
                    />
                    <button id="addPenaltyBtn" class="add-penalty-btn">Add</button>
                </div>
                <div id="penaltyList"></div>
            </div>
        </div>

        <div class="final-total" id="finalTotal">
            <div class="cost-label">Final Invoice</div>
            <div id="billBreakdown"></div>
            <div class="modal-actions">
                <button
                    class="send-as-task-btn"
                    onclick="window.costTracker.sendCostConfigAsTask()"
                >
                    Send as Task
                </button>
            </div>
        </div>
    `;

	console.log("Cost tracker modal content initialized");
};

/**
 * Initialize the cost tracker modal content when the page loads
 */
document.addEventListener("DOMContentLoaded", function () {
	// Small delay to ensure all other scripts have loaded
	setTimeout(() => {
		window.initializeCostTrackerModalContent();
	}, 100);
});

/**
 * Also initialize when the modal is shown (fallback)
 */
window.addEventListener("load", function () {
	setTimeout(() => {
		if (!document.getElementById("cost-tracker-app").innerHTML.trim()) {
			window.initializeCostTrackerModalContent();
		}
	}, 200);
});
