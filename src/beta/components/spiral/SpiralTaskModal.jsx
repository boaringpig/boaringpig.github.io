// SpiralTaskModal.jsx - "Send as Task" sub-modal, nested inside
// SpiralGeneratorModal. Unlike that one, this is a plain content dialog, so
// it reuses the shared Modal component. Inserts a `type: "spiral"` task
// directly (bypassing window.createTask), matching how classic
// (js/spiral-integration.js's showSpiralTaskConfigModal) and this
// codebase's other special task types (demerit, cost-tracker) already do
// it -- not a new pattern. No spiral config is ever persisted, same as
// classic.
import { useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import styles from "./SpiralTaskModal.module.css";

export function SpiralTaskModal({ onClose, onSent }) {
	var [description, setDescription] = useState("Experience the Spiral Animation");
	var [points, setPoints] = useState(10);
	var [penaltyPoints, setPenaltyPoints] = useState(5);
	var [dueDate, setDueDate] = useState("");
	var [isRepeating, setIsRepeating] = useState(false);
	var [repeatInterval, setRepeatInterval] = useState("daily");
	var [submitting, setSubmitting] = useState(false);

	async function handleCreate() {
		var trimmed = description.trim();
		if (!trimmed) {
			window.showNotification("Please enter a task description", "error");
			return;
		}

		if (dueDate) {
			var selectedDate = new Date(dueDate);
			if (isNaN(selectedDate.getTime())) {
				window.showNotification("Invalid due date format", "error");
				return;
			}
			if (selectedDate < new Date()) {
				window.showNotification("Due date cannot be in the past", "error");
				return;
			}
		}

		setSubmitting(true);
		try {
			var task = {
				text: trimmed,
				status: "todo",
				type: "spiral",
				createdAt: new Date().toISOString(),
				createdBy: window.currentUser,
				master_username: window.activeMasterContext,
				assignedTo: window.getSlaves()[0] || window.currentUser,
				points: Number(points) || 10,
				penaltyPoints: Number(penaltyPoints) || 5,
				dueDate: dueDate || null,
				isRepeating: isRepeating,
				repeatInterval: isRepeating ? repeatInterval : null,
				completedAt: null,
				completedBy: null,
				approvedAt: null,
				approvedBy: null,
				isOverdue: false,
				appealStatus: null,
				appealedAt: null,
				appealReviewedAt: null,
				appealReviewedBy: null,
				acceptedAt: null,
				appealText: null,
				rejectedAt: null,
				rejectedBy: null,
			};

			var { error } = await window.supabase.from("tasks").insert([task]);

			if (error) {
				console.error("Error creating spiral task:", error);
				window.showNotification("Failed to create spiral task.", "error");
				return;
			}

			window.showNotification(
				"Spiral task \"" + trimmed + "\" created successfully!",
				"success"
			);
			onSent();
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Modal title="🌀 Create Spiral Task" onClose={onClose}>
			<TextInput
				label="Task Description"
				value={description}
				onChange={function (e) { setDescription(e.target.value); }}
				maxLength={200}
			/>
			<div className={styles.row}>
				<TextInput
					label="Points (Reward)"
					type="number"
					min="1"
					max="100"
					value={points}
					onChange={function (e) { setPoints(e.target.value); }}
				/>
				<TextInput
					label="Penalty Points"
					type="number"
					min="0"
					max="50"
					value={penaltyPoints}
					onChange={function (e) { setPenaltyPoints(e.target.value); }}
				/>
			</div>
			<div className={styles.row}>
				<TextInput
					label="Due Date (Optional)"
					type="datetime-local"
					value={dueDate}
					onChange={function (e) { setDueDate(e.target.value); }}
				/>
				<label className={styles.checkboxRow}>
					<input
						type="checkbox"
						checked={isRepeating}
						onChange={function (e) { setIsRepeating(e.target.checked); }}
					/>
					Repeating Task
				</label>
			</div>
			{isRepeating ? (
				<div className={styles.row}>
					<label className={styles.selectLabel}>
						Repeat Every
						<select
							className={styles.select}
							value={repeatInterval}
							onChange={function (e) { setRepeatInterval(e.target.value); }}
						>
							<option value="daily">Daily</option>
							<option value="weekly">Weekly</option>
							<option value="monthly">Monthly</option>
						</select>
					</label>
				</div>
			) : null}
			<div className={styles.actions}>
				<Button loading={submitting} onClick={handleCreate}>
					Create Task
				</Button>
				<Button variant="secondary" onClick={onClose}>
					Cancel
				</Button>
			</div>
		</Modal>
	);
}
