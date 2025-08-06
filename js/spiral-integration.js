// js/spiral-integration.js - Corrected and Enhanced Version
// This file manages the spiral canvas and its integration with the task system.

// We wrap the entire module in an Immediately Invoked Function Expression (IIFE)
// to create a private scope and avoid polluting the global namespace.
window.spiral = (function () {
	// Let's use a 2D canvas instead of Three.js to match the user's request.
	let canvas, ctx;
	let spirals = [];
	let isTextLoopRunning = false;
	let animationFrameId = null;
	let config = {};
	let activeSpiralIndex = 0; // Tracks the currently selected spiral for editing

	// Text animation variables
	let textOverlay = null;
	let textScriptElement = null; // Renamed to avoid conflict with the array
	let textScript = [];
	let textIndex = 0;
	let textTimerId = null;
	let textAnimInterval = 2000;
	let textAnimHold = 3000;
	let textAnimSpeed = 0.5;
	let textSize = 2.5;
	let textColor = "#ffffff";

	// This is the missing `init` function that caused the `ReferenceError`.
	// It is crucial for setting up the 3D scene and event listeners.
	function init() {
		console.log("Spiral integration initializing...");

		// Stop any existing animation loop before starting a new one
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}

		canvas = document.getElementById("spiral-canvas");
		if (!canvas) {
			console.error("Spiral canvas element not found!");
			return;
		}

		ctx = canvas.getContext("2d");

		// Set up text overlay
		textOverlay = document.getElementById("text-overlay");
		textScriptElement = document.getElementById("text-script");

		// Attach event listeners to controls
		attachControlListeners();

		// Handle window resizing
		window.addEventListener("resize", onWindowResize, false);
		onWindowResize(); // Initial call to set size

		// Load default spirals if none exist
		if (spirals.length === 0) {
			addSpiral();
		}

		// Set default text for the text generator
		initDefaultText();

		// Start the animation loop
		animate();

		console.log("Spiral integration initialized successfully.");
	}

	/**
	 * Stops the animation loop for the spiral generator.
	 * This is a key part of the fix to prevent background processes.
	 */
	function stopAnimation() {
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
			console.log("Spiral animation stopped.");
		}
	}

	function onWindowResize() {
		if (canvas) {
			const parent = canvas.parentElement;
			canvas.width = parent.clientWidth;
			canvas.height = parent.clientHeight;
			// Update all spiral positions to center
			spirals.forEach((spiral) => {
				spiral.x = canvas.width / 2;
				spiral.y = canvas.height / 2;
			});
		}
	}

	function animate(time) {
		const currentTime = time;
		animationFrameId = requestAnimationFrame(animate);

		// Clear canvas with background color
		const bgColor = document.getElementById("bg-color").value;
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw all spirals
		spirals.forEach((spiral) => {
			spiral.draw(currentTime);
		});
	}

	// This is a new class for a 2D spiral, mimicking the behavior of the `index.html` file.
	class Spiral {
		constructor(id, props = {}) {
			this.id = id;
			this.speed = props.speed || 1;
			this.radiusPercent = props.radiusPercent || 50; // Store as percentage
			this.arms = props.arms || 3;
			this.thickness = props.thickness || 3;
			this.color = props.color || "#4fc3f7";
			this.opacity = props.opacity || 0.8;
			this.timeOffset = props.timeOffset || 0;
			this.rotation = props.rotation || 0;
			this.x = canvas.width / 2;
			this.y = canvas.height / 2;
		}

		// Get the current radius in pixels
		get radius() {
			const screenSize = Math.min(canvas.width, canvas.height);
			return (this.radiusPercent / 100) * screenSize * 2;
		}

		draw(time) {
			const adjustedTime =
				(time + this.timeOffset * 1000) * this.speed * 0.001;

			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate((this.rotation * Math.PI) / 180 + adjustedTime * 0.5);

			ctx.strokeStyle = this.color;
			ctx.lineWidth = this.thickness;
			ctx.globalAlpha = this.opacity;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";

			for (let i = 0; i < this.arms; i++) {
				ctx.save();
				ctx.rotate((i * 2 * Math.PI) / this.arms);

				ctx.beginPath();
				let firstPoint = true;

				for (let r = 0; r < this.radius; r += 0.5) {
					const angle = r * 0.08 + adjustedTime;
					const x = r * Math.cos(angle);
					const y = r * Math.sin(angle);

					if (firstPoint) {
						ctx.moveTo(x, y);
						firstPoint = false;
					} else {
						ctx.lineTo(x, y);
					}
				}

				ctx.stroke();
				ctx.restore();
			}

			ctx.restore();
		}
	}

	function addSpiral() {
		const newSpiralProps = {
			radiusPercent: 50,
			arms: 3,
			thickness: 3,
			color: "#4fc3f7",
			opacity: 0.8,
			speed: 1,
			timeOffset: 0,
			rotation: 0,
		};
		const newSpiral = new Spiral(spirals.length, newSpiralProps);
		spirals.push(newSpiral);
		activeSpiralIndex = spirals.length - 1;
		renderSpiralList();
		updateControlsFromSpiral(newSpiral);
	}

	function deleteSpiral(index) {
		if (spirals[index]) {
			spirals.splice(index, 1);
			activeSpiralIndex = Math.max(0, activeSpiralIndex - 1);
			renderSpiralList();
			if (spirals.length === 0) {
				clearControls();
			} else {
				updateControlsFromSpiral(spirals[activeSpiralIndex]);
			}
		}
	}

	function clearAllSpirals() {
		spirals = [];
		activeSpiralIndex = -1;
		renderSpiralList();
		clearControls();
	}

	function renderSpiralList() {
		const spiralListDiv = document.getElementById("spiral-list");
		if (spiralListDiv) {
			spiralListDiv.innerHTML = "";
			spirals.forEach((spiral, index) => {
				const item = document.createElement("div");
				item.className = `spiral-list-item ${
					index === activeSpiralIndex ? "active" : ""
				}`;
				item.innerHTML = `
					<span>Spiral ${index + 1}</span>
					<div class="actions">
						<button onclick="window.spiral.selectSpiral(${index})" class="action-btn check-btn">Edit</button>
						<button onclick="window.spiral.deleteSpiral(${index})" class="action-btn delete-btn">Delete</button>
					</div>
				`;
				spiralListDiv.appendChild(item);
			});
		}
	}

	function selectSpiral(index) {
		activeSpiralIndex = index;
		renderSpiralList();
		updateControlsFromSpiral(spirals[index]);
	}

	function clearControls() {
		const inputs = [
			"speed",
			"radius",
			"arms",
			"thickness",
			"color",
			"opacity",
			"time-offset",
			"rotation",
		];
		inputs.forEach((id) => {
			const input = document.getElementById(id);
			if (input) {
				input.value = input.min;
			}
		});
		document.getElementById("color").value = "#000000";
	}

	function updateControlsFromSpiral(spiral) {
		document.getElementById("speed").value = spiral.speed;
		document.getElementById("radius").value = spiral.radiusPercent;
		document.getElementById("arms").value = spiral.arms;
		document.getElementById("thickness").value = spiral.thickness;
		document.getElementById("color").value = spiral.color;
		document.getElementById("opacity").value = spiral.opacity;
		document.getElementById("time-offset").value = spiral.timeOffset;
		document.getElementById("rotation").value = spiral.rotation;
		updateControlValueDisplays();
	}

	function updateControlValueDisplays() {
		const inputs = [
			"speed",
			"radius",
			"arms",
			"thickness",
			"color",
			"opacity",
			"time-offset",
			"rotation",
		];
		inputs.forEach((id) => {
			const input = document.getElementById(id);
			const valueDisplay = document.getElementById(`${id}-val`);
			if (input && valueDisplay) {
				let value = input.value;
				if (id === "radius") value += "%";
				if (id === "rotation") value += "°";
				if (id === "speed" || id === "opacity" || id === "time-offset")
					value = parseFloat(value).toFixed(1);
				valueDisplay.textContent = value;
			}
		});
		document.getElementById("text-interval-val").textContent =
			document.getElementById("text-interval").value + "ms";
		document.getElementById("text-hold-val").textContent =
			document.getElementById("text-hold").value + "ms";
		document.getElementById("text-anim-speed-val").textContent =
			parseFloat(
				document.getElementById("text-anim-speed").value
			).toFixed(1) + "s";
		document.getElementById("text-size-val").textContent =
			parseFloat(document.getElementById("text-size").value).toFixed(1) +
			"rem";
	}

	function attachControlListeners() {
		const controls = [
			"speed",
			"radius",
			"arms",
			"thickness",
			"color",
			"opacity",
			"time-offset",
			"rotation",
		];
		controls.forEach((id) => {
			const input = document.getElementById(id);
			if (input) {
				input.addEventListener("input", function () {
					updateSpiralProperty(id, this.value);
					updateControlValueDisplays();
				});
			}
		});

		const textControls = [
			"text-interval",
			"text-hold",
			"text-anim-speed",
			"text-size",
			"text-color",
		];
		textControls.forEach((id) => {
			const input = document.getElementById(id);
			if (input) {
				input.addEventListener("input", function () {
					if (id === "text-size") {
						textOverlay.style.fontSize = this.value + "rem";
					} else if (id === "text-color") {
						textOverlay.style.color = this.value;
					}
					updateControlValueDisplays();
				});
			}
		});

		document
			.getElementById("bg-color")
			.addEventListener("input", function () {
				// Update background on 2D context
				const newColor = this.value;
				if (ctx) {
					const oldColor = ctx.fillStyle;
					ctx.fillStyle = newColor;
					// Redraw the screen with the new background color
					if (oldColor !== newColor) {
						ctx.fillRect(0, 0, canvas.width, canvas.height);
					}
				}
			});
	}

	function updateSpiralProperty(prop, value) {
		const spiral = spirals[activeSpiralIndex];
		if (!spiral) return;

		let newValue = parseFloat(value) || value;
		if (prop === "color") newValue = value;

		if (prop === "radius") {
			spiral.radiusPercent = newValue;
		} else if (prop === "rotation") {
			spiral.rotation = newValue;
		} else if (prop === "time-offset") {
			spiral.timeOffset = newValue;
		} else {
			spiral[prop] = newValue;
		}
	}

	function startTextSequence() {
		if (isTextLoopRunning) {
			stopTextSequence();
		}
		isTextLoopRunning = true;
		textIndex = 0;
		parseTextScript();
		showNextText();
	}

	function stopTextSequence() {
		isTextLoopRunning = false;
		if (textTimerId) {
			clearTimeout(textTimerId);
		}
		hideText();
	}

	function parseTextScript() {
		const script = textScriptElement.value;
		const lines = script.split("\n").filter((line) => line.trim());
		textScript = [];

		lines.forEach((line) => {
			line = line.trim();
			if (line.startsWith("DELAY:")) {
				const delay = parseInt(line.substring(6));
				if (!isNaN(delay)) {
					textScript.push({ type: "delay", value: delay });
				}
			} else if (line) {
				textScript.push({ type: "text", value: line });
			}
		});
	}

	function showNextText() {
		if (!isTextLoopRunning) {
			hideText();
			return;
		}

		// Loop back to beginning if we've reached the end
		if (textIndex >= textScript.length) {
			textIndex = 0;
		}

		const current = textScript[textIndex];

		if (current.type === "text") {
			// Add a small delay before showing new text to ensure proper state reset
			setTimeout(() => {
				showText(current.value);
			}, 50);
			textIndex++;

			const interval = parseInt(
				document.getElementById("text-interval").value
			);
			const holdDuration = parseInt(
				document.getElementById("text-hold").value
			);
			const animationDuration = textAnimSpeed * 1000; // Convert to milliseconds
			// Total time = fade in + hold duration + fade out + small delay
			const totalDisplayTime =
				animationDuration + holdDuration + animationDuration + 50;

			textTimerId = setTimeout(showNextText, totalDisplayTime);
		} else if (current.type === "delay") {
			hideText();
			textIndex++;
			textTimerId = setTimeout(showNextText, current.value);
		}
	}

	function showText(text) {
		// Ensure we start from a clean state
		textOverlay.style.transition = "none";
		textOverlay.style.transform = "translate(-50%, -50%) scale(0)";
		textOverlay.style.opacity = "0";
		textOverlay.textContent = text;
		textOverlay.style.fontSize = textSize + "rem";
		textOverlay.style.color = textColor;
		textOverlay.style.transformOrigin = "center center";

		// Force reflow to ensure the reset is applied
		textOverlay.offsetHeight;

		// Now apply transition and animate in
		textOverlay.style.transition = `opacity ${textAnimSpeed}s ease-out, transform ${textAnimSpeed}s ease-out`;
		textOverlay.style.opacity = "1";
		textOverlay.style.transform = "translate(-50%, -50%) scale(1)";

		// Schedule the fade out based on hold duration
		const holdDuration = parseInt(
			document.getElementById("text-hold").value
		);
		const fadeInTime = textAnimSpeed * 1000;

		setTimeout(() => {
			if (isTextLoopRunning) {
				hideText();
			}
		}, fadeInTime + holdDuration);
	}

	function hideText() {
		textOverlay.style.transition = `opacity ${textAnimSpeed}s ease-out, transform ${textAnimSpeed}s ease-out`;
		textOverlay.style.opacity = "0";
		textOverlay.style.transform = "translate(-50%, -50%) scale(2)"; // Scale up significantly as if moving toward viewer
	}

	function initDefaultText() {
		if (textScriptElement) {
			textScriptElement.value = `Welcome to the Spiral Generator
DELAY:2000
Watch the patterns dance
DELAY:1500
Customize every parameter
DELAY:2000
Create your own visual symphony
DELAY:3000
The possibilities are infinite`;
		}
		if (textOverlay) {
			textOverlay.textContent = "Start the text loop!";
			textOverlay.style.color =
				document.getElementById("text-color").value;
			textOverlay.style.fontSize =
				document.getElementById("text-size").value + "rem";
		}
	}

	// --- Configuration Handling ---

	function getSpiralConfiguration() {
		const config = {
			spirals: spirals.map((spiral) => ({
				id: spiral.id,
				speed: spiral.speed,
				radiusPercent: spiral.radiusPercent,
				arms: spiral.arms,
				thickness: spiral.thickness,
				color: spiral.color,
				opacity: spiral.opacity,
				timeOffset: spiral.timeOffset,
				rotation: spiral.rotation,
			})),
			textSettings: {
				script: textScriptElement.value,
				interval: document.getElementById("text-interval").value,
				holdDuration: document.getElementById("text-hold").value,
				animationSpeed:
					document.getElementById("text-anim-speed").value,
				size: document.getElementById("text-size").value,
				color: document.getElementById("text-color").value,
			},
			globalSettings: {
				backgroundColor: document.getElementById("bg-color").value,
				selectedSpiralIndex: activeSpiralIndex,
			},
		};
		return config;
	}

	function applyConfiguration(config) {
		if (!config) {
			console.error("No configuration provided to apply.");
			return;
		}

		// Clear existing spirals
		clearAllSpirals();

		// Apply spiral settings
		if (config.spirals && Array.isArray(config.spirals)) {
			config.spirals.forEach((props) => {
				const newSpiral = new Spiral(props.id, props);
				spirals.push(newSpiral);
			});
			renderSpiralList();
			if (spirals.length > 0) {
				selectSpiral(0);
			}
		}

		// Apply text settings
		if (config.textSettings) {
			if (textScriptElement)
				textScriptElement.value = config.textSettings.script || "";
			if (document.getElementById("text-interval"))
				document.getElementById("text-interval").value =
					config.textSettings.interval || 2000;
			if (document.getElementById("text-hold"))
				document.getElementById("text-hold").value =
					config.textSettings.holdDuration || 3000;
			if (document.getElementById("text-anim-speed"))
				document.getElementById("text-anim-speed").value =
					config.textSettings.animationSpeed || 0.5;
			if (document.getElementById("text-size"))
				document.getElementById("text-size").value =
					config.textSettings.size || 2.5;
			if (document.getElementById("text-color"))
				document.getElementById("text-color").value =
					config.textSettings.color || "#ffffff";
			updateControlValueDisplays();
		}

		// Apply background color
		if (config.globalSettings) {
			document.getElementById("bg-color").value =
				config.globalSettings.backgroundColor || "#000000";
			ctx.fillStyle = document.getElementById("bg-color").value;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		console.log("Spiral configuration applied.");
	}

	function saveSpiralConfig() {
		const config = getSpiralConfiguration();
		const dataStr = JSON.stringify(config, null, 2);
		const blob = new Blob([dataStr], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "spiral-config.json";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		window.showNotification(
			"Spiral configuration saved successfully.",
			"success"
		);
	}

	function loadSpiralConfig() {
		const fileInput = document.getElementById("config-file");
		if (fileInput) {
			fileInput.click();
		}
	}

	function handleSpiralConfigFile(event) {
		const file = event.target.files[0];
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.onload = function (e) {
			try {
				const config = JSON.parse(e.target.result);
				applyConfiguration(config);
				window.showNotification(
					"Spiral configuration loaded successfully.",
					"success"
				);
			} catch (error) {
				console.error("Failed to parse config file:", error);
				window.showNotification(
					"Failed to load configuration. Invalid file format.",
					"error"
				);
			}
		};
		reader.readAsText(file);
	}

	// --- Task Integration ---

	async function sendSpiralConfigAsTask() {
		const config = getSpiralConfiguration();
		window.showSpiralTaskConfigModal(config);

		// Stop the animation after sending the task
		stopAnimation();
	}

	// This function is moved to the global window object in the tool-init.js file
	// to make it accessible to the spiral integration code.
	window.showSpiralTaskConfigModal = function (spiralConfig) {
		// ... existing code for creating and handling the task config modal ...
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
					// FIX: Removed the spiralConfig property from the task object to prevent the database error.
					// spiralConfig: spiralConfig, // Store the spiral configuration
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

						// Stop the animation after closing the modal
						stopAnimation();

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
	};

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
		stop: stopAnimation, // Expose stopAnimation as a public method
	};
})();
