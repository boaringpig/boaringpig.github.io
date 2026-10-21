// TaskForm.jsx - the "create task" form (master only). On submit it builds
// the same `overrides` object window.createTask (js/database-tasks.js)
// accepts, instead of that function reading classic DOM inputs - see
// src/beta/README.md's "Hybrid data flow" section.
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useSlaves } from "../../hooks/useSlaves";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import { SpiralGeneratorModal } from "../spiral/SpiralGeneratorModal";
import styles from "./TaskForm.module.css";

var emptyForm = {
	text: "",
	isDemerit: false,
	points: 10,
	penaltyPoints: 5,
	dueDate: "",
	isRepeating: false,
	repeatInterval: "daily",
	assignmentMode: "individual",
};

export function TaskForm({ onCreated }) {
	var app = useApp();
	var slavesState = useSlaves();
	var [form, setForm] = useState(emptyForm);
	var [selected, setSelected] = useState([]);
	var [submitting, setSubmitting] = useState(false);
	var [showSpiral, setShowSpiral] = useState(false);

	function updateField(key, value) {
		setForm(function (prev) {
			return Object.assign({}, prev, { [key]: value });
		});
	}

	function toggleSlave(username) {
		setSelected(function (prev) {
			return prev.includes(username)
				? prev.filter(function (u) {
						return u !== username;
				  })
				: prev.concat(username);
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (!form.text.trim()) return;
		setSubmitting(true);
		try {
			await window.createTask({
				text: form.text,
				isDemerit: form.isDemerit,
				points: form.points,
				penaltyPoints: form.penaltyPoints,
				dueDate: form.dueDate || null,
				isRepeating: form.isRepeating,
				repeatInterval: form.isRepeating ? form.repeatInterval : null,
				selectedPigs: selected,
				assignmentMode: form.assignmentMode,
			});
			setForm(emptyForm);
			setSelected([]);
			if (onCreated) onCreated();
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Card>
			<div className={styles.headingRow}>
				<h2 className={styles.heading}>Create New Task</h2>
				<Button type="button" variant="secondary" onClick={function () { setShowSpiral(true); }}>
					🌀 Create Spiral Task
				</Button>
			</div>
			{showSpiral ? (
				<SpiralGeneratorModal onClose={function () { setShowSpiral(false); }} />
			) : null}
			<form onSubmit={handleSubmit}>
				<TextInput
					label="Task description"
					value={form.text}
					onChange={function (e) {
						updateField("text", e.target.value);
					}}
					required
				/>

				<label className={styles.checkboxRow}>
					<input
						type="checkbox"
						checked={form.isDemerit}
						onChange={function (e) {
							updateField("isDemerit", e.target.checked);
						}}
					/>
					This is a demerit (penalty only, no points)
				</label>

				<div className={styles.row}>
					{!form.isDemerit ? (
						<TextInput
							label="Points"
							type="number"
							min="0"
							value={form.points}
							onChange={function (e) {
								updateField("points", e.target.value);
							}}
						/>
					) : null}
					<TextInput
						label="Penalty points"
						type="number"
						min="0"
						value={form.penaltyPoints}
						onChange={function (e) {
							updateField("penaltyPoints", e.target.value);
						}}
					/>
					{!form.isDemerit ? (
						<TextInput
							label="Due date"
							type="datetime-local"
							value={form.dueDate}
							onChange={function (e) {
								updateField("dueDate", e.target.value);
							}}
						/>
					) : null}
				</div>

				{!form.isDemerit ? (
					<>
						<label className={styles.checkboxRow}>
							<input
								type="checkbox"
								checked={form.isRepeating}
								onChange={function (e) {
									updateField("isRepeating", e.target.checked);
								}}
							/>
							Repeats
						</label>
						{form.isRepeating ? (
							<select
								className={styles.select}
								value={form.repeatInterval}
								onChange={function (e) {
									updateField("repeatInterval", e.target.value);
								}}
							>
								<option value="daily">Daily</option>
								<option value="weekly">Weekly</option>
								<option value="monthly">Monthly</option>
							</select>
						) : null}
					</>
				) : null}

				<fieldset className={styles.fieldset}>
					<legend>
						Assign to {app.groupTerms.slaveLabelPlural}
					</legend>
					{slavesState.slaves.length === 0 ? (
						<p className={styles.hint}>
							No {app.groupTerms.slaveLabelPlural} added yet.
						</p>
					) : (
						slavesState.slaves.map(function (slave) {
							return (
								<label key={slave.username} className={styles.checkboxRow}>
									<input
										type="checkbox"
										checked={selected.includes(slave.username)}
										onChange={function () {
											toggleSlave(slave.username);
										}}
									/>
									{slave.displayName}
								</label>
							);
						})
					)}
				</fieldset>

				{!form.isDemerit && selected.length > 1 ? (
					<select
						className={styles.select}
						value={form.assignmentMode}
						onChange={function (e) {
							updateField("assignmentMode", e.target.value);
						}}
						aria-label="Assignment mode"
					>
						<option value="individual">One copy per {app.groupTerms.slaveLabel}</option>
						<option value="shared">Shared (one task, anyone can complete it)</option>
					</select>
				) : null}

				<Button type="submit" loading={submitting} disabled={!form.text.trim()}>
					{form.isDemerit ? "Issue Demerit" : "Create Task"}
				</Button>
			</form>
		</Card>
	);
}
