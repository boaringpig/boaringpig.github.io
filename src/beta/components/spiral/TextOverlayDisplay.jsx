// TextOverlayDisplay.jsx - the floating, animated text itself, absolutely
// positioned over the spiral canvas. Controls live separately in
// TextSequenceControls (rendered in the sidebar) -- see useTextSequence.js.
import styles from "./TextOverlayDisplay.module.css";

export function TextOverlayDisplay({ display, animSpeed, fontSize, color }) {
	return (
		<div
			className={styles.overlay}
			style={{
				opacity: display.shown ? 1 : 0,
				transform: "translate(-50%, -50%) scale(" + (display.shown ? 1 : display.instant ? 0 : 2) + ")",
				transition: display.instant
					? "none"
					: "opacity " + animSpeed + "s ease-out, transform " + animSpeed + "s ease-out",
				fontSize: fontSize + "rem",
				color: color,
			}}
		>
			{display.text}
		</div>
	);
}
