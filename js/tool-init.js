// js/tool-init.js
// This file initializes the tool buttons and their functionality.

/**
 * Initializes the tool buttons for spiral generator and cost tracker.
 * This function is called when the main app is shown.
 */
window.initializeToolButtons = function () {
	console.log("initializeToolButtons called");

	// Ensure modal functions are available before setting up buttons
	const setupButtons = () => {
		const showSpiralGeneratorBtn = document.getElementById(
			"showSpiralGeneratorBtn"
		);
		const showCostTrackerBtn =
			document.getElementById("showCostTrackerBtn");

		if (showSpiralGeneratorBtn) {
			console.log("Setting up spiral generator button");
			// Remove existing onclick to prevent conflicts
			showSpiralGeneratorBtn.onclick = null;

			showSpiralGeneratorBtn.addEventListener("click", (e) => {
				e.preventDefault();
				console.log("Spiral generator button clicked");
				if (
					window.showSpiralGenerator &&
					typeof window.showSpiralGenerator === "function"
				) {
					window.showSpiralGenerator();
				} else {
					console.error(
						"showSpiralGenerator function is not available."
					);
					if (window.showNotification) {
						window.showNotification(
							"Spiral generator is not available.",
							"error"
						);
					} else {
						alert("Spiral generator is not available.");
					}
				}
			});
		} else {
			console.warn("Spiral generator button not found");
		}

		if (showCostTrackerBtn) {
			console.log("Setting up cost tracker button");
			// Remove existing onclick to prevent conflicts
			showCostTrackerBtn.onclick = null;

			showCostTrackerBtn.addEventListener("click", (e) => {
				e.preventDefault();
				console.log("Cost tracker button clicked");
				if (
					window.showCostTracker &&
					typeof window.showCostTracker === "function"
				) {
					window.showCostTracker();
				} else {
					console.error("showCostTracker function is not available.");
					if (window.showNotification) {
						window.showNotification(
							"Cost tracker is not available.",
							"error"
						);
					} else {
						alert("Cost tracker is not available.");
					}
				}
			});
		} else {
			console.warn("Cost tracker button not found");
		}

		console.log("Tool buttons setup complete");
	};

	// Check if modal functions are available, if not, wait a bit
	if (window.showSpiralGenerator && window.showCostTracker) {
		setupButtons();
	} else {
		console.log("Modal functions not ready, waiting...");
		setTimeout(() => {
			if (window.showSpiralGenerator && window.showCostTracker) {
				setupButtons();
			} else {
				console.error(
					"Modal functions still not available after timeout"
				);
				setupButtons(); // Setup anyway, errors will be handled in click handlers
			}
		}, 500);
	}
};

/**
 * Ensure modal functions are defined (fallback definitions)
 */
window.ensureModalFunctions = function () {
	if (!window.showSpiralGenerator) {
		window.showSpiralGenerator = function () {
			const modal = document.getElementById("spiralModal");
			if (modal) {
				modal.classList.remove("hidden");
				if (window.spiral && window.spiral.init) {
					window.spiral.init();
					window.spiral.initDefaultText();
				}
			} else {
				console.error("Spiral modal not found");
			}
		};
	}

	if (!window.hideSpiralGenerator) {
		window.hideSpiralGenerator = function () {
			const modal = document.getElementById("spiralModal");
			if (modal) {
				modal.classList.add("hidden");
			}
		};
	}

	if (!window.showCostTracker) {
		window.showCostTracker = function () {
			const modal = document.getElementById("costTrackerModal");
			if (modal) {
				modal.classList.remove("hidden");
				if (window.costTracker && window.costTracker.init) {
					window.costTracker.init();
				}

				// Add click outside to close functionality
				modal.onclick = function (e) {
					if (e.target === modal) {
						window.hideCostTracker();
					}
				};
			} else {
				console.error("Cost tracker modal not found");
			}
		};
	}

	if (!window.hideCostTracker) {
		window.hideCostTracker = function () {
			const modal = document.getElementById("costTrackerModal");
			if (modal) {
				// Reset the cost tracker before hiding
				if (window.costTracker && window.costTracker.resetOnClose) {
					window.costTracker.resetOnClose();
				}
				modal.classList.add("hidden");
				console.log("Cost tracker modal closed and reset");
			}
		};
	}
};

// Initialize modal functions on load
window.addEventListener("load", () => {
	window.ensureModalFunctions();
});

// Also ensure they're available when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
	window.ensureModalFunctions();
});
