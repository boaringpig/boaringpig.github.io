// SpiralViewerModal.jsx - read-only playback of a spiral config attached to
// a `type: "spiral"` task (see SpiralTaskModal's spiralConfig column and
// TaskItem's "View Spiral" button). Same full-screen canvas as
// SpiralGeneratorModal, minus the sidebar/editing controls, and the text
// loop auto-starts instead of waiting for a "Start" button click.
import { useEffect, useRef } from "react";
import { DEFAULT_SPIRAL_PROPS } from "../../utils/spiralMath";
import { SpiralCanvas } from "./SpiralCanvas";
import { TextOverlayDisplay } from "./TextOverlayDisplay";
import { useTextSequence } from "./useTextSequence";
import styles from "./SpiralGeneratorModal.module.css";

export function SpiralViewerModal({ config, onClose }) {
	var canvasRef = useRef(null);
	var spiralsRef = useRef(
		((config && config.spirals) || []).map(function (props) {
			return Object.assign({ x: 0, y: 0 }, DEFAULT_SPIRAL_PROPS, props);
		})
	);
	var textSettings = (config && config.textSettings) || {};
	var backgroundColor =
		(config && config.globalSettings && config.globalSettings.backgroundColor) || "#000000";
	var textSequence = useTextSequence(textSettings);

	useEffect(function () {
		textSequence.startLoop();

		function handleKeyDown(e) {
			if (e.key === "Escape") onClose();
		}
		document.addEventListener("keydown", handleKeyDown);
		return function () {
			textSequence.stopLoop();
			document.removeEventListener("keydown", handleKeyDown);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps -- runs once on mount only
	}, []);

	return (
		<div className={styles.overlay}>
			<button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close spiral viewer">
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
			</div>
		</div>
	);
}
