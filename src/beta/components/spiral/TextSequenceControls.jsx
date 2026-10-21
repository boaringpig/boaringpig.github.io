// TextSequenceControls.jsx - the script/timing controls for the text loop,
// rendered in the sidebar (see useTextSequence.js for why this is split
// from the floating text display itself).
import { Button } from "../common/Button";
import styles from "./TextSequenceControls.module.css";

export function TextSequenceControls(props) {
	return (
		<div className={styles.controlGroup}>
			<h3>Text Animation</h3>
			<textarea
				className={styles.script}
				value={props.script}
				onChange={function (e) { props.setScript(e.target.value); }}
				placeholder="Enter your text script here. Use 'DELAY:ms' for delays."
			/>
			<div className={styles.controlRow}>
				<label>Display Time:</label>
				<input type="range" min="500" max="5000" value={props.interval}
					onChange={function (e) { props.setInterval(Number(e.target.value)); }} />
				<span className={styles.valueDisplay}>{props.interval}ms</span>
			</div>
			<div className={styles.controlRow}>
				<label>Hold Duration:</label>
				<input type="range" min="1000" max="8000" value={props.holdDuration}
					onChange={function (e) { props.setHoldDuration(Number(e.target.value)); }} />
				<span className={styles.valueDisplay}>{props.holdDuration}ms</span>
			</div>
			<div className={styles.controlRow}>
				<label>Animation Speed:</label>
				<input type="range" min="0.1" max="2" step="0.1" value={props.animSpeed}
					onChange={function (e) { props.setAnimSpeed(Number(e.target.value)); }} />
				<span className={styles.valueDisplay}>{props.animSpeed.toFixed(1)}s</span>
			</div>
			<div className={styles.controlRow}>
				<label>Text Size:</label>
				<input type="range" min="1" max="6" step="0.1" value={props.fontSize}
					onChange={function (e) { props.setFontSize(Number(e.target.value)); }} />
				<span className={styles.valueDisplay}>{props.fontSize.toFixed(1)}rem</span>
			</div>
			<div className={styles.controlRow}>
				<label>Text Color:</label>
				<input type="color" value={props.color}
					onChange={function (e) { props.setColor(e.target.value); }} />
			</div>
			<div className={styles.buttonRow}>
				<Button variant="secondary" onClick={props.startLoop} disabled={props.isRunning}>
					Start Text Loop
				</Button>
				<Button variant="secondary" onClick={props.stopLoop} disabled={!props.isRunning}>
					Stop Text Loop
				</Button>
			</div>
		</div>
	);
}
