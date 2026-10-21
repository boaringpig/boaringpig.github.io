// SpiralGeneratorModal.jsx - the Spiral Generator, a decorative canvas
// animation used only to flavor-create a task (see SpiralTaskModal). This
// is its own full-screen overlay rather than the shared Modal component:
// Modal.jsx is a small centered dialog built for a single content block,
// while this needs a canvas+sidebar layout and shouldn't close on an
// accidental backdrop click (that would discard an in-progress animation),
// only via the explicit close button or Escape.
//
// State is deliberately split in two: `spiralsRef` is the mutable list the
// animation loop reads every frame and never triggers a re-render by
// itself (editing a slider wouldn't need the whole canvas/list to
// re-render 60x/sec); `activeSnapshot` is a small plain-object mirror of
// just the currently-selected spiral's 8 properties, kept in real React
// state so the control panel's inputs stay in sync on every change.
// `spiralsVersion` is a bump-only counter that forces the list/controls to
// re-render on add/delete/clear/load, when the *set* of spirals changes
// shape rather than just a property value.
import { useEffect, useRef, useState } from "react";
import { createSpiral, DEFAULT_SPIRAL_PROPS } from "../../utils/spiralMath";
import { saveSpiralConfig, loadSpiralConfigFile } from "../../utils/spiralConfigIO";
import { useSavedSpirals } from "../../hooks/useSavedSpirals";
import { SpiralCanvas } from "./SpiralCanvas";
import { SpiralSidebar } from "./SpiralSidebar";
import { useTextSequence } from "./useTextSequence";
import { TextOverlayDisplay } from "./TextOverlayDisplay";
import { TextSequenceControls } from "./TextSequenceControls";
import { SpiralTaskModal } from "./SpiralTaskModal";
import styles from "./SpiralGeneratorModal.module.css";

function snapshotOf(spiral) {
	if (!spiral) return null;
	return Object.assign({}, spiral);
}

/**
 * initialConfig/initialName/initialSavedId: set when opened from
 * SavedSpiralsList's "Load" action (src/beta/components/tools/) -- applies
 * a previously-saved config on mount and remembers which saved row it came
 * from, so "Save to Library" updates that same row instead of always
 * inserting a new one.
 */
export function SpiralGeneratorModal({ onClose, initialConfig, initialName, initialSavedId }) {
	var canvasRef = useRef(null);
	var spiralsRef = useRef([]);
	var nextIdRef = useRef(1);

	// The value itself is never read -- calling the setter is what forces a
	// re-render when the spirals list's shape changes (see listSnapshot below).
	var [, setSpiralsVersion] = useState(0);
	var [activeIndex, setActiveIndex] = useState(0);
	var [activeSnapshot, setActiveSnapshot] = useState(null);
	var [backgroundColor, setBackgroundColor] = useState("#000000");
	var [showTaskModal, setShowTaskModal] = useState(false);
	var [savedSpiralId, setSavedSpiralId] = useState(initialSavedId || null);
	var [savedSpiralName, setSavedSpiralName] = useState(initialName || "");
	var textSequence = useTextSequence();
	var savedSpirals = useSavedSpirals();

	function currentCanvasSize() {
		var canvas = canvasRef.current;
		return canvas ? { width: canvas.width, height: canvas.height } : { width: 0, height: 0 };
	}

	function addSpiral() {
		var size = currentCanvasSize();
		var spiral = createSpiral(nextIdRef.current++, size.width, size.height);
		spiralsRef.current = spiralsRef.current.concat(spiral);
		setActiveIndex(spiralsRef.current.length - 1);
		setActiveSnapshot(snapshotOf(spiral));
		setSpiralsVersion(function (v) { return v + 1; });
	}

	function deleteSpiral(index) {
		spiralsRef.current = spiralsRef.current.filter(function (_, i) { return i !== index; });
		var newActive = Math.max(0, index - 1);
		setActiveIndex(newActive);
		setActiveSnapshot(snapshotOf(spiralsRef.current[newActive]));
		setSpiralsVersion(function (v) { return v + 1; });
	}

	function selectSpiral(index) {
		setActiveIndex(index);
		setActiveSnapshot(snapshotOf(spiralsRef.current[index]));
	}

	function clearAll() {
		spiralsRef.current = [];
		setActiveIndex(0);
		setActiveSnapshot(null);
		setSpiralsVersion(function (v) { return v + 1; });
	}

	function updateActiveProperty(key, value) {
		var spiral = spiralsRef.current[activeIndex];
		if (!spiral) return;
		spiral[key] = value;
		setActiveSnapshot(snapshotOf(spiral));
	}

	function handleSave() {
		saveSpiralConfig({
			spirals: spiralsRef.current.map(function (s) {
				return Object.assign({}, s);
			}),
			textSettings: {},
			globalSettings: {
				backgroundColor: backgroundColor,
				selectedSpiralIndex: activeIndex,
			},
		});
		window.showNotification("Spiral configuration saved successfully.", "success");
	}

	function applyConfig(config) {
		var size = currentCanvasSize();
		var loaded = (config.spirals || []).map(function (props) {
			nextIdRef.current = Math.max(nextIdRef.current, (props.id || 0) + 1);
			return Object.assign(
				{ x: size.width / 2, y: size.height / 2 },
				DEFAULT_SPIRAL_PROPS,
				props
			);
		});
		spiralsRef.current = loaded;
		var newActive = (config.globalSettings && config.globalSettings.selectedSpiralIndex) || 0;
		setActiveIndex(newActive);
		setActiveSnapshot(snapshotOf(loaded[newActive] || loaded[0]));
		if (config.globalSettings && config.globalSettings.backgroundColor) {
			setBackgroundColor(config.globalSettings.backgroundColor);
		}
		setSpiralsVersion(function (v) { return v + 1; });
	}

	function handleLoadFile(file) {
		loadSpiralConfigFile(
			file,
			function (config) {
				applyConfig(config);
				setSavedSpiralId(null);
				setSavedSpiralName("");
				window.showNotification("Spiral configuration loaded successfully.", "success");
			},
			function (message) {
				window.showNotification(message, "error");
			}
		);
	}

	function handleSaveToLibrary(name) {
		savedSpirals
			.saveSpiral({
				id: savedSpiralId,
				name: name,
				config: {
					spirals: spiralsRef.current.map(function (s) {
						return Object.assign({}, s);
					}),
					textSettings: {},
					globalSettings: {
						backgroundColor: backgroundColor,
						selectedSpiralIndex: activeIndex,
					},
				},
			})
			.then(function (id) {
				if (id) setSavedSpiralId(id);
				setSavedSpiralName(name);
			});
	}

	useEffect(function () {
		if (initialConfig) {
			applyConfig(initialConfig);
		} else if (spiralsRef.current.length === 0) {
			addSpiral();
		}

		function handleKeyDown(e) {
			if (e.key === "Escape") onClose();
		}
		document.addEventListener("keydown", handleKeyDown);
		return function () {
			document.removeEventListener("keydown", handleKeyDown);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps -- runs once on mount only
	}, []);

	var listSnapshot = spiralsRef.current.map(function (s) {
		return { id: s.id };
	});

	return (
		<div className={styles.overlay}>
			<button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close spiral generator">
				&times;
			</button>
			<div className={styles.viewer}>
				<div className={styles.canvasArea}>
					<SpiralCanvas canvasRef={canvasRef} spiralsRef={spiralsRef} backgroundColor={backgroundColor} />
					<TextOverlayDisplay
						display={textSequence.display}
						animSpeed={textSequence.animSpeed}
						fontSize={textSequence.fontSize}
						color={textSequence.color}
					/>
				</div>
				<SpiralSidebar
					textControls={<TextSequenceControls {...textSequence} />}
					spirals={listSnapshot}
					activeIndex={activeIndex}
					activeSnapshot={activeSnapshot}
					onAdd={addSpiral}
					onDelete={deleteSpiral}
					onSelect={selectSpiral}
					onClearAll={clearAll}
					onPropertyChange={updateActiveProperty}
					backgroundColor={backgroundColor}
					onBackgroundChange={setBackgroundColor}
					onSave={handleSave}
					onLoadFile={handleLoadFile}
					onOpenTaskModal={function () { setShowTaskModal(true); }}
					savedSpiralName={savedSpiralName}
					onSaveToLibrary={handleSaveToLibrary}
				/>
			</div>

			{showTaskModal ? (
				<SpiralTaskModal
					onClose={function () { setShowTaskModal(false); }}
					onSent={function () {
						setShowTaskModal(false);
						onClose();
					}}
				/>
			) : null}
		</div>
	);
}
