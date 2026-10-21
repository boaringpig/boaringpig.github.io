// ToolsPage.jsx - the Tools tab (master-only): the Spiral generator (new +
// saved library) and the cost tracker, consolidated out of Tasks/Dashboard
// into one place.
import { useState } from "react";
import { useSavedSpirals } from "../../hooks/useSavedSpirals";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { SpiralGeneratorModal } from "../spiral/SpiralGeneratorModal";
import { SavedSpiralsList } from "./SavedSpiralsList";
import { CostTrackerPanel } from "../costTrackers/CostTrackerPanel";
import styles from "./ToolsPage.module.css";

export function ToolsPage() {
	var savedSpirals = useSavedSpirals();
	var [showGenerator, setShowGenerator] = useState(false);
	var [generatorConfig, setGeneratorConfig] = useState(null);
	var [generatorId, setGeneratorId] = useState(null);
	var [generatorName, setGeneratorName] = useState("");

	function openNewSpiral() {
		setGeneratorConfig(null);
		setGeneratorId(null);
		setGeneratorName("");
		setShowGenerator(true);
	}

	function openSavedSpiral(spiral) {
		setGeneratorConfig(spiral.config);
		setGeneratorId(spiral.id);
		setGeneratorName(spiral.name);
		setShowGenerator(true);
	}

	function closeGenerator() {
		setShowGenerator(false);
		savedSpirals.reload();
	}

	function handleRename(spiral, newName) {
		savedSpirals.saveSpiral({ id: spiral.id, name: newName, config: spiral.config });
	}

	return (
		<div>
			<Card className={styles.section}>
				<div className={styles.sectionHeader}>
					<h2 className={styles.heading}>Spirals</h2>
					<Button onClick={openNewSpiral}>🌀 New Spiral</Button>
				</div>
				<SavedSpiralsList
					savedSpirals={savedSpirals.savedSpirals}
					status={savedSpirals.status}
					error={savedSpirals.error}
					onReload={savedSpirals.reload}
					onLoad={openSavedSpiral}
					onRename={handleRename}
					onDelete={savedSpirals.deleteSpiral}
				/>
			</Card>

			<Card className={styles.section}>
				<h2 className={styles.heading}>Cost Tracker</h2>
				<CostTrackerPanel />
			</Card>

			{showGenerator ? (
				<SpiralGeneratorModal
					onClose={closeGenerator}
					initialConfig={generatorConfig}
					initialSavedId={generatorId}
					initialName={generatorName}
				/>
			) : null}
		</div>
	);
}
