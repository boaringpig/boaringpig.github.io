// StartTrackerForm.jsx - starts a new live cost tracker (master only).
import { useState } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import styles from "./StartTrackerForm.module.css";

export function StartTrackerForm({ onStart }) {
	var [description, setDescription] = useState("Cost Tracker Running");
	var [rate, setRate] = useState(50);
	var [currency, setCurrency] = useState("€");
	var [interval, setInterval_] = useState(60000);
	var [submitting, setSubmitting] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setSubmitting(true);
		try {
			await onStart(description, Number(rate) || 0, currency, Number(interval), []);
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
				<Button type="submit" loading={submitting}>
					Start tracker
				</Button>
			</form>
		</Card>
	);
}
