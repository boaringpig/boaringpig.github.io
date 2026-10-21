// SpiralSidebar.jsx - spiral list management, the active spiral's property
// controls, background color, save/load config, and "Send as Task".
import { useRef, useState } from "react";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import styles from "./SpiralSidebar.module.css";

var PROPERTY_FIELDS = [
	{ key: "speed", label: "Speed", min: 0.1, max: 5, step: 0.1 },
	{ key: "radiusPercent", label: "Radius", min: 10, max: 100, step: 1, suffix: "%" },
	{ key: "arms", label: "Arms", min: 1, max: 20, step: 1 },
	{ key: "thickness", label: "Thickness", min: 1, max: 20, step: 1 },
	{ key: "opacity", label: "Opacity", min: 0.1, max: 1, step: 0.1 },
	{ key: "timeOffset", label: "Time Offset", min: 0, max: 10, step: 0.1 },
	{ key: "rotation", label: "Rotation", min: 0, max: 360, step: 1, suffix: "°" },
];

export function SpiralSidebar({
	textControls,
	spirals,
	activeIndex,
	activeSnapshot,
	onAdd,
	onDelete,
	onSelect,
	onClearAll,
	onPropertyChange,
	backgroundColor,
	onBackgroundChange,
	onSave,
	onLoadFile,
	onOpenTaskModal,
	savedSpiralName,
	onSaveToLibrary,
}) {
	var fileInputRef = useRef(null);
	var [libraryName, setLibraryName] = useState(savedSpiralName || "");

	return (
		<div className={styles.sidebar}>
			{textControls}
			<div className={styles.controlGroup}>
				<h3>Spirals</h3>
				<div className={styles.spiralList}>
					{spirals.map(function (spiral, index) {
						return (
							<div
								key={spiral.id}
								className={index === activeIndex ? styles.spiralItemActive : styles.spiralItem}
							>
								<span>Spiral {index + 1}</span>
								<div className={styles.actions}>
									<Button variant="secondary" onClick={function () { onSelect(index); }}>
										Edit
									</Button>
									<Button variant="danger" onClick={function () { onDelete(index); }}>
										Delete
									</Button>
								</div>
							</div>
						);
					})}
				</div>
				<Button variant="secondary" onClick={onAdd}>
					Add New Spiral
				</Button>
			</div>

			{activeSnapshot ? (
				<div className={styles.controlGroup}>
					<h3>Current Spiral Properties</h3>
					{PROPERTY_FIELDS.map(function (field) {
						return (
							<div className={styles.controlRow} key={field.key}>
								<label>{field.label}:</label>
								<input
									type="range"
									min={field.min}
									max={field.max}
									step={field.step}
									value={activeSnapshot[field.key]}
									onChange={function (e) {
										onPropertyChange(field.key, Number(e.target.value));
									}}
								/>
								<span className={styles.valueDisplay}>
									{field.key === "speed" || field.key === "opacity" || field.key === "timeOffset"
										? Number(activeSnapshot[field.key]).toFixed(1)
										: activeSnapshot[field.key]}
									{field.suffix || ""}
								</span>
							</div>
						);
					})}
					<div className={styles.controlRow}>
						<label>Color:</label>
						<input
							type="color"
							value={activeSnapshot.color}
							onChange={function (e) {
								onPropertyChange("color", e.target.value);
							}}
						/>
					</div>
				</div>
			) : null}

			<div className={styles.controlGroup}>
				<h3>Configuration</h3>
				<div className={styles.controlRow}>
					<Button variant="secondary" onClick={onSave}>
						Save Config
					</Button>
					<Button variant="secondary" onClick={function () { fileInputRef.current.click(); }}>
						Load Config
					</Button>
				</div>
				<input
					type="file"
					accept=".json"
					ref={fileInputRef}
					style={{ display: "none" }}
					onChange={function (e) {
						if (e.target.files[0]) onLoadFile(e.target.files[0]);
						e.target.value = "";
					}}
				/>
			</div>

			<div className={styles.controlGroup}>
				<h3>Save to Library</h3>
				<TextInput
					label="Name"
					value={libraryName}
					onChange={function (e) { setLibraryName(e.target.value); }}
					placeholder="e.g. Calming blue swirl"
				/>
				<Button
					variant="secondary"
					disabled={!libraryName.trim()}
					onClick={function () { onSaveToLibrary(libraryName.trim()); }}
				>
					{savedSpiralName ? "Update Saved Spiral" : "Save to Library"}
				</Button>
			</div>

			<div className={styles.controlGroup}>
				<h3>Global Settings</h3>
				<div className={styles.controlRow}>
					<label>Background:</label>
					<input
						type="color"
						value={backgroundColor}
						onChange={function (e) { onBackgroundChange(e.target.value); }}
					/>
				</div>
				<Button variant="danger" onClick={onClearAll}>
					Clear All Spirals
				</Button>
			</div>

			<Button onClick={onOpenTaskModal} className={styles.sendAsTask}>
				Send as Task
			</Button>
		</div>
	);
}
