// SavedSpiralsList.jsx - a master's saved spiral-generator configs. "Load"
// reopens the generator pre-filled (via onLoad, which the parent uses to
// mount SpiralGeneratorModal with initialConfig/initialSavedId/initialName);
// "Rename" edits just the name; "Delete" removes it.
import { useState } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";
import styles from "./SavedSpiralsList.module.css";

export function SavedSpiralsList({ savedSpirals, status, error, onReload, onLoad, onRename, onDelete }) {
	var [renamingId, setRenamingId] = useState(null);
	var [renameValue, setRenameValue] = useState("");

	function startRename(spiral) {
		setRenamingId(spiral.id);
		setRenameValue(spiral.name);
	}

	function confirmRename(spiral) {
		var trimmed = renameValue.trim();
		if (trimmed) onRename(spiral, trimmed);
		setRenamingId(null);
	}

	return (
		<Card>
			<h3 className={styles.heading}>Saved Spirals</h3>
			{status === "loading" ? <LoadingSpinner label="Loading saved spirals..." /> : null}
			{status === "error" ? (
				<ErrorState
					message={"Couldn't load saved spirals: " + (error ? error.message : "unknown error")}
					onRetry={onReload}
				/>
			) : null}
			{status === "ready" && savedSpirals.length === 0 ? (
				<EmptyState title="No saved spirals yet" hint="Save one from inside the generator." />
			) : null}
			{status === "ready"
				? savedSpirals.map(function (spiral) {
						return (
							<div key={spiral.id} className={styles.row}>
								{renamingId === spiral.id ? (
									<div className={styles.renameRow}>
										<TextInput
											value={renameValue}
											onChange={function (e) { setRenameValue(e.target.value); }}
										/>
										<Button variant="secondary" onClick={function () { confirmRename(spiral); }}>
											Save
										</Button>
										<Button variant="secondary" onClick={function () { setRenamingId(null); }}>
											Cancel
										</Button>
									</div>
								) : (
									<>
										<div>
											<strong>{spiral.name}</strong>
											<div className={styles.meta}>
												Updated {new Date(spiral.updated_at).toLocaleString()}
											</div>
										</div>
										<div className={styles.actions}>
											<Button variant="secondary" onClick={function () { onLoad(spiral); }}>
												Load
											</Button>
											<Button variant="secondary" onClick={function () { startRename(spiral); }}>
												Rename
											</Button>
											<Button variant="danger" onClick={function () { onDelete(spiral.id); }}>
												Delete
											</Button>
										</div>
									</>
								)}
							</div>
						);
				  })
				: null}
		</Card>
	);
}
