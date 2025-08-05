// js/spiral-integration.js
// This file contains the logic for the spiral generator and its integration.

window.spiral = (function () {
	// Private variables, initialized only when init() is called
	let canvas, ctx, textOverlay;

	let spirals = [];
	let selectedSpiralIndex = 0;
	let animationId;
	let startTime = 0;
	let textScript = [];
	let textIndex = 0;
	let textTimer;
	let isTextSequenceRunning = false;
	let textAnimationSpeed = 0.5;
	let textSize = 2.5;
	let textColor = "#ffffff";

	// Spiral class
	class Spiral {
		constructor(id) {
			this.id = id;
			this.speed = 1;
			this.radiusPercent = 50;
			this.arms = 3;
			this.thickness = 3;
			this.color = "#4fc3f7";
			this.opacity = 0.8;
			this.timeOffset = 0;
			this.rotation = 0;
			// Ensure x and y are set after canvas is defined
			this.x = canvas ? canvas.width / 2 : 0;
			this.y = canvas ? canvas.height / 2 : 0;
		}

		get radius() {
			if (!canvas) return 0;
			const screenSize = Math.min(canvas.width, canvas.height);
			return (this.radiusPercent / 100) * screenSize * 2;
		}

		draw(time) {
			if (!ctx) return;
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

	function resizeCanvas() {
		if (!canvas) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		spirals.forEach((spiral) => {
			spiral.x = canvas.width / 2;
			spiral.y = canvas.height / 2;
		});
	}

	function init() {
		canvas = document.getElementById("spiral-canvas");
		textOverlay = document.getElementById("text-overlay");

		if (!canvas) {
			console.error(
				"Spiral canvas element not found. Spiral functionality will not be available."
			);
			return;
		}
		ctx = canvas.getContext("2d");

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		// Reset state
		spirals = [];
		selectedSpiralIndex = 0;
		if (animationId) cancelAnimationFrame(animationId);

		addSpiral(); // Start with one spiral
		setupListeners();
		updateValueDisplays();
		animate();
		initDefaultText();
	}

	function setupListeners() {
		[
			"speed",
			"arms",
			"thickness",
			"opacity",
			"time-offset",
			"rotation",
		].forEach((id) => {
			const el = document.getElementById(id);
			if (el) {
				el.addEventListener("input", (e) => {
					if (spirals[selectedSpiralIndex]) {
						const prop = id.replace("-", "");
						spirals[selectedSpiralIndex][
							prop === "timeoffset" ? "timeOffset" : prop
						] = parseFloat(e.target.value);
					}
					updateValueDisplays();
				});
			}
		});

		const radiusEl = document.getElementById("radius");
		if (radiusEl) {
			radiusEl.addEventListener("input", (e) => {
				if (spirals[selectedSpiralIndex]) {
					spirals[selectedSpiralIndex].radiusPercent = parseFloat(
						e.target.value
					);
				}
				updateValueDisplays();
			});
		}

		const colorEl = document.getElementById("color");
		if (colorEl) {
			colorEl.addEventListener("input", (e) => {
				if (spirals[selectedSpiralIndex]) {
					spirals[selectedSpiralIndex].color = e.target.value;
				}
			});
		}

		const textAnimSpeedEl = document.getElementById("text-anim-speed");
		if (textAnimSpeedEl) {
			textAnimSpeedEl.addEventListener("input", (e) => {
				textAnimationSpeed = parseFloat(e.target.value);
				updateValueDisplays();
			});
		}

		const textSizeEl = document.getElementById("text-size");
		if (textSizeEl) {
			textSizeEl.addEventListener("input", (e) => {
				textSize = parseFloat(e.target.value);
				updateValueDisplays();
			});
		}

		const textColorEl = document.getElementById("text-color");
		if (textColorEl) {
			textColorEl.addEventListener("input", (e) => {
				textColor = e.target.value;
			});
		}

		const textIntervalEl = document.getElementById("text-interval");
		if (textIntervalEl)
			textIntervalEl.addEventListener("input", updateValueDisplays);

		const textHoldEl = document.getElementById("text-hold");
		if (textHoldEl)
			textHoldEl.addEventListener("input", updateValueDisplays);
	}

	function addSpiral() {
		const spiral = new Spiral(spirals.length);
		spirals.push(spiral);
		updateSpiralList();
		selectSpiral(spirals.length - 1);
	}

	function updateSpiralList() {
		const list = document.getElementById("spiral-list");
		if (!list) return;
		list.innerHTML = "";

		spirals.forEach((spiral, index) => {
			const item = document.createElement("div");
			item.className = "spiral-item";
			if (index === selectedSpiralIndex) item.classList.add("selected");

			item.innerHTML = `
				<span>Spiral ${index + 1}</span>
				<button class="delete-btn" onclick="window.spiral.deleteSpiral(${index})">×</button>
			`;

			item.onclick = (e) => {
				if (!e.target.classList.contains("delete-btn")) {
					selectSpiral(index);
				}
			};

			list.appendChild(item);
		});
	}

	function selectSpiral(index) {
		selectedSpiralIndex = index;
		if (spirals[index]) {
			updateControlsFromSpiral(spirals[index]);
		}
		updateSpiralList();
	}

	function deleteSpiral(index) {
		spirals.splice(index, 1);
		if (selectedSpiralIndex >= spirals.length) {
			selectedSpiralIndex = Math.max(0, spirals.length - 1);
		}
		updateSpiralList();
		if (spirals.length > 0) {
			updateControlsFromSpiral(spirals[selectedSpiralIndex]);
		}
	}

	function clearAllSpirals() {
		spirals = [];
		selectedSpiralIndex = 0;
		updateSpiralList();
	}

	function updateControlsFromSpiral(spiral) {
		const speedEl = document.getElementById("speed");
		const radiusEl = document.getElementById("radius");
		const armsEl = document.getElementById("arms");
		const thicknessEl = document.getElementById("thickness");
		const colorEl = document.getElementById("color");
		const opacityEl = document.getElementById("opacity");
		const timeOffsetEl = document.getElementById("time-offset");
		const rotationEl = document.getElementById("rotation");
		if (speedEl) speedEl.value = spiral.speed;
		if (radiusEl) radiusEl.value = spiral.radiusPercent;
		if (armsEl) armsEl.value = spiral.arms;
		if (thicknessEl) thicknessEl.value = spiral.thickness;
		if (colorEl) colorEl.value = spiral.color;
		if (opacityEl) opacityEl.value = spiral.opacity;
		if (timeOffsetEl) timeOffsetEl.value = spiral.timeOffset;
		if (rotationEl) rotationEl.value = spiral.rotation;
		updateValueDisplays();
	}

	function updateValueDisplays() {
		const speedValEl = document.getElementById("speed-val");
		const radiusValEl = document.getElementById("radius-val");
		const armsValEl = document.getElementById("arms-val");
		const thicknessValEl = document.getElementById("thickness-val");
		const opacityValEl = document.getElementById("opacity-val");
		const timeOffsetValEl = document.getElementById("time-offset-val");
		const rotationValEl = document.getElementById("rotation-val");
		const textIntervalValEl = document.getElementById("text-interval-val");
		const textHoldValEl = document.getElementById("text-hold-val");
		const textAnimSpeedValEl = document.getElementById(
			"text-anim-speed-val"
		);
		const textSizeValEl = document.getElementById("text-size-val");

		if (speedValEl)
			speedValEl.textContent = document.getElementById("speed").value;
		if (radiusValEl)
			radiusValEl.textContent =
				document.getElementById("radius").value + "%";
		if (armsValEl)
			armsValEl.textContent = document.getElementById("arms").value;
		if (thicknessValEl)
			thicknessValEl.textContent =
				document.getElementById("thickness").value;
		if (opacityValEl)
			opacityValEl.textContent = document.getElementById("opacity").value;
		if (timeOffsetValEl)
			timeOffsetValEl.textContent =
				document.getElementById("time-offset").value;
		if (rotationValEl)
			rotationValEl.textContent =
				document.getElementById("rotation").value + "°";

		const displayTime = document.getElementById("text-interval")
			? parseInt(document.getElementById("text-interval").value)
			: 2000;
		const holdTime = document.getElementById("text-hold")
			? parseInt(document.getElementById("text-hold").value)
			: 3000;
		const animSpeed = textAnimationSpeed;
		const fadeTime = parseFloat(animSpeed) * 1000;
		const totalTime = fadeTime + holdTime + fadeTime;

		if (textIntervalValEl)
			textIntervalValEl.textContent = displayTime + "ms";
		if (textHoldValEl)
			textHoldValEl.textContent =
				holdTime + "ms (total: " + totalTime + "ms)";
		if (textAnimSpeedValEl)
			textAnimSpeedValEl.textContent = textAnimationSpeed + "s";
		if (textSizeValEl) textSizeValEl.textContent = textSize + "rem";
	}

	function parseTextScript() {
		const scriptEl = document.getElementById("text-script");
		if (!scriptEl) return;
		const script = scriptEl.value;
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

	function startTextSequence() {
		parseTextScript();
		textIndex = 0;
		isTextSequenceRunning = true;
		showNextText();
	}

	function stopTextSequence() {
		isTextSequenceRunning = false;
		if (textTimer) {
			clearTimeout(textTimer);
		}
		hideText();
	}

	function showNextText() {
		if (!isTextSequenceRunning) {
			hideText();
			return;
		}

		if (textIndex >= textScript.length) {
			textIndex = 0;
		}

		const current = textScript[textIndex];

		if (current && current.type === "text") {
			setTimeout(() => {
				showText(current.value);
			}, 50);
			textIndex++;

			const interval = document.getElementById("text-interval")
				? parseInt(document.getElementById("text-interval").value)
				: 2000;
			const holdDuration = document.getElementById("text-hold")
				? parseInt(document.getElementById("text-hold").value)
				: 3000;
			const animationDuration = textAnimationSpeed * 1000;
			const totalDisplayTime =
				animationDuration + holdDuration + animationDuration + 50;

			textTimer = setTimeout(showNextText, totalDisplayTime);
		} else if (current && current.type === "delay") {
			hideText();
			textIndex++;
			textTimer = setTimeout(showNextText, current.value);
		}
	}

	function showText(text) {
		if (!textOverlay) return;
		textOverlay.style.transition = "none";
		textOverlay.style.transform = "translate(-50%, -50%) scale(0)";
		textOverlay.style.opacity = "0";
		textOverlay.textContent = text;
		textOverlay.style.fontSize = textSize + "rem";
		textOverlay.style.color = textColor;
		textOverlay.style.transformOrigin = "center center";

		textOverlay.offsetHeight;

		textOverlay.style.transition = `opacity ${textAnimationSpeed}s ease-out, transform ${textAnimationSpeed}s ease-out`;
		textOverlay.style.opacity = "1";
		textOverlay.style.transform = "translate(-50%, -50%) scale(1)";

		const holdDuration = document.getElementById("text-hold")
			? parseInt(document.getElementById("text-hold").value)
			: 3000;
		const fadeInTime = textAnimationSpeed * 1000;

		setTimeout(() => {
			if (isTextSequenceRunning) {
				hideText();
			}
		}, fadeInTime + holdDuration);
	}

	function hideText() {
		if (!textOverlay) return;
		textOverlay.style.transition = `opacity ${textAnimationSpeed}s ease-out, transform ${textAnimationSpeed}s ease-out`;
		textOverlay.style.opacity = "0";
		textOverlay.style.transform = "translate(-50%, -50%) scale(2)";
	}

	function animate() {
		const currentTime = Date.now() - startTime;

		const bgColorEl = document.getElementById("bg-color");
		const bgColor = bgColorEl ? bgColorEl.value : "#000000";
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		spirals.forEach((spiral) => {
			spiral.draw(currentTime);
		});

		animationId = requestAnimationFrame(animate);
	}

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
				script: document.getElementById("text-script")
					? document.getElementById("text-script").value
					: "",
				interval: document.getElementById("text-interval")
					? parseInt(document.getElementById("text-interval").value)
					: 2000,
				holdDuration: document.getElementById("text-hold")
					? parseInt(document.getElementById("text-hold").value)
					: 3000,
				animationSpeed: textAnimationSpeed,
				size: textSize,
				color: textColor,
			},
			globalSettings: {
				backgroundColor: document.getElementById("bg-color")
					? document.getElementById("bg-color").value
					: "#000000",
				selectedSpiralIndex: selectedSpiralIndex,
			},
		};
		return config;
	}

	function saveSpiralConfig() {
		const config = getSpiralConfiguration();
		const dataStr = JSON.stringify(config, null, 2);
		const blob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(blob);

		const exportFileDefaultName =
			"spiral_config_" +
			new Date().toISOString().slice(0, 19).replace(/:/g, "-") +
			".json";

		const linkElement = document.createElement("a");
		linkElement.href = url;
		linkElement.download = exportFileDefaultName;
		document.body.appendChild(linkElement);
		linkElement.click();
		document.body.removeChild(linkElement);
		URL.revokeObjectURL(url);
	}

	function loadSpiralConfig() {
		const configFileEl = document.getElementById("config-file");
		if (configFileEl) configFileEl.click();
	}

	function handleSpiralConfigFile(event) {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = function (e) {
			try {
				const config = JSON.parse(e.target.result);
				applyConfiguration(config);
			} catch (error) {
				window.showNotification(
					"Error loading configuration: Invalid JSON file",
					"error"
				);
				console.error("Configuration load error:", error);
			}
		};
		reader.readAsText(file);
	}

	function applyConfiguration(config) {
		if (!canvas) {
			console.error("Canvas not ready for configuration application.");
			return;
		}

		spirals = [];
		if (config.spirals && Array.isArray(config.spirals)) {
			config.spirals.forEach((spiralData) => {
				const spiral = new Spiral(spiralData.id);
				spiral.speed = spiralData.speed || 1;
				spiral.radiusPercent = spiralData.radiusPercent || 50;
				spiral.arms = spiralData.arms || 3;
				spiral.thickness = spiralData.thickness || 3;
				spiral.color = spiralData.color || "#4fc3f7";
				spiral.opacity = spiralData.opacity || 0.8;
				spiral.timeOffset = spiralData.timeOffset || 0;
				spiral.rotation = spiralData.rotation || 0;
				spiral.x = canvas.width / 2;
				spiral.y = canvas.height / 2;
				spirals.push(spiral);
			});
		}

		if (config.textSettings) {
			const scriptEl = document.getElementById("text-script");
			const intervalEl = document.getElementById("text-interval");
			const holdEl = document.getElementById("text-hold");
			const animSpeedEl = document.getElementById("text-anim-speed");
			const sizeEl = document.getElementById("text-size");
			const colorEl = document.getElementById("text-color");

			if (scriptEl) scriptEl.value = config.textSettings.script || "";
			if (intervalEl)
				intervalEl.value = config.textSettings.interval || 2000;
			if (holdEl) holdEl.value = config.textSettings.holdDuration || 3000;
			if (animSpeedEl)
				animSpeedEl.value = config.textSettings.animationSpeed || 0.5;
			if (sizeEl) sizeEl.value = config.textSettings.size || 2.5;
			if (colorEl) colorEl.value = config.textSettings.color || "#ffffff";

			textAnimationSpeed = config.textSettings.animationSpeed || 0.5;
			textSize = config.textSettings.size || 2.5;
			textColor = config.textSettings.color || "#ffffff";
		}

		if (config.globalSettings) {
			const bgColorEl = document.getElementById("bg-color");
			if (bgColorEl)
				bgColorEl.value =
					config.globalSettings.backgroundColor || "#000000";
			selectedSpiralIndex = Math.min(
				config.globalSettings.selectedSpiralIndex || 0,
				spirals.length - 1
			);
		}

		updateSpiralList();
		if (spirals.length > 0) {
			selectSpiral(Math.max(0, selectedSpiralIndex));
		}
		updateValueDisplays();

		window.showNotification("Configuration loaded successfully!");
	}

	async function sendSpiralConfigAsTask() {
		const config = getSpiralConfiguration();
		// Create the task in the database with the config
		const task = {
			text: `New Spiral Task from Admin`,
			status: "todo",
			type: "spiral",
			createdAt: new Date().toISOString(),
			createdBy: window.currentUser,
			assignedTo: "schinken",
			spiralConfig: config,
		};
		const { error: taskError } = await window.supabase
			.from("tasks")
			.insert([task]);
		if (taskError) {
			console.error("Error creating spiral task:", taskError);
			window.showNotification("Failed to create spiral task.", "error");
		} else {
			window.showNotification("Spiral task created successfully!");
			window.hideSpiralGenerator();
			await window.fetchTasksInitial();
		}
	}

	function initDefaultText() {
		const textScriptEl = document.getElementById("text-script");
		if (textScriptEl) {
			textScriptEl.value = `Welcome to the Spiral Generator
DELAY:2000
Watch the patterns dance
DELAY:1500
Customize every parameter
DELAY:2000
Create your own visual symphony
DELAY:3000
The possibilities are infinite`;
		}
	}

	// Expose public functions
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
		sendSpiralConfigAsTask,
		getSpiralConfiguration,
		applyConfiguration,
		initDefaultText,
	};
})();
