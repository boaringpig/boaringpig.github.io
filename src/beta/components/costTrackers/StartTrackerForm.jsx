// StartTrackerForm.jsx - starts a new live cost tracker (master only).
// Optionally saves the entered config as a reusable preset alongside
// starting it, and can be prefilled from a saved preset via presetToApply
// (selecting "Use" on a SavedPresetsList row) -- same save/reuse pattern as
// the spiral generator's saved-library feature.
import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { useSlaves } from "../../hooks/useSlaves";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import styles from "./StartTrackerForm.module.css";

export function StartTrackerForm({ onStart, onSavePreset, presetToApply }) {
	var app = useApp();
	var slavesState = useSlaves();
	var [description, setDescription] = useState("Cost Tracker Running");
	var [rate, setRate] = useState(50);
	var [currency, setCurrency] = useState("€");
	var [interval, setInterval_] = useState(60000);
	var [assignedTo, setAssignedTo] = useState([]);
	var [submitting, setSubmitting] = useState(false);
	var [stagedPenalties, setStagedPenalties] = useState([]);
	var [penaltyDescription, setPenaltyDescription] = useState("");
	var [penaltyAmount, setPenaltyAmount] = useState("");
	var [presetName, setPresetName] = useState("");

	function toggleAssignee(username) {
		setAssignedTo(function (prev) {
			return prev.includes(username)
				? prev.filter(function (u) {
						return u !== username;
				  })
				: prev.concat(username);
		});
	}

	useEffect(
		function () {
			if (!presetToApply) return;
			setDescription(presetToApply.description || "Cost Tracker Running");
			setRate(presetToApply.rate);
			setCurrency(presetToApply.currency);
			setInterval_(presetToApply.increment_interval);
		},
		[presetToApply]
	);

	if (!window.hasPermission("create_task")) return null;

	function addStagedPenalty() {
		setStagedPenalties(function (prev) {
			return prev.concat({
				description: penaltyDescription.trim(),
				amount: Number(penaltyAmount),
			});
		});
		setPenaltyDescription("");
		setPenaltyAmount("");
	}

	function removeStagedPenalty(index) {
		setStagedPenalties(function (prev) {
			return prev.filter(function (_, i) {
				return i !== index;
			});
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setSubmitting(true);
		try {
			if (presetName.trim() && onSavePreset) {
				await onSavePreset({
					id: presetToApply ? presetToApply.id : undefined,
					name: presetName.trim(),
					description: description,
					rate: Number(rate) || 0,
					currency: currency,
					incrementInterval: Number(interval),
				});
			}
			await onStart(description, Number(rate) || 0, currency, Number(interval), stagedPenalties, assignedTo);
			setStagedPenalties([]);
			setPresetName("");
			setAssignedTo([]);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Card>
			<h3 className={styles.heading}>Start a Cost Tracker</h3>
			<form className={styles.form} onSubmit={handleSubmit}>
				<TextInput
					label="Description"
					value={description}
					onChange={function (e) {
						setDescription(e.target.value);
					}}
				/>
				<div className={styles.row}>
					<TextInput
						label="Rate"
						type="number"
						min="0"
						step="0.01"
						value={rate}
						onChange={function (e) {
							setRate(e.target.value);
						}}
					/>
					<div className={styles.selectGroup}>
						<label className={styles.selectLabel}>Currency</label>
						<select
							className={styles.select}
							value={currency}
							onChange={function (e) {
								setCurrency(e.target.value);
							}}
						>
							<option value="€">Euro (€)</option>
							<option value="£">Pound (£)</option>
							<option value="$">Dollar ($)</option>
						</select>
					</div>
					<div className={styles.selectGroup}>
						<label className={styles.selectLabel}>Per</label>
						<select
							className={styles.select}
							value={interval}
							onChange={function (e) {
								setInterval_(e.target.value);
							}}
						>
							<option value={1000}>Second</option>
							<option value={60000}>Minute</option>
							<option value={3600000}>Hour</option>
						</select>
					</div>
				</div>

				<div className={styles.penaltyForm}>
					<TextInput
						label="Penalty description"
						value={penaltyDescription}
						onChange={function (e) {
							setPenaltyDescription(e.target.value);
						}}
					/>
					<TextInput
						label="Amount"
						type="number"
						min="0"
						step="0.01"
						value={penaltyAmount}
						onChange={function (e) {
							setPenaltyAmount(e.target.value);
						}}
					/>
					<Button
						type="button"
						variant="secondary"
						disabled={!penaltyDescription.trim() || !penaltyAmount}
						onClick={addStagedPenalty}
					>
						Add penalty
					</Button>
				</div>
				{stagedPenalties.length > 0 ? (
					<ul className={styles.penaltyList}>
						{stagedPenalties.map(function (p, i) {
							return (
								<li key={i}>
									{p.description}: {currency}
									{p.amount.toFixed(2)}
									<button
										type="button"
										className={styles.removePenalty}
										onClick={function () {
											removeStagedPenalty(i);
										}}
										aria-label={"Remove staged penalty " + p.description}
									>
										&times;
									</button>
								</li>
							);
						})}
					</ul>
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
										checked={assignedTo.includes(slave.username)}
										onChange={function () {
											toggleAssignee(slave.username);
										}}
									/>
									{slave.displayName}
								</label>
							);
						})
					)}
				</fieldset>

				<TextInput
					label="Save as preset (optional)"
					placeholder="Name this config to reuse it later"
					value={presetName}
					onChange={function (e) {
						setPresetName(e.target.value);
					}}
				/>

				<Button type="submit" loading={submitting} disabled={assignedTo.length === 0}>
					Start tracker
				</Button>
			</form>
		</Card>
	);
}
