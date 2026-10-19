// RewardForm.jsx - create/edit a reward. `editingReward` (null for "create")
// pre-fills the form; saving calls addReward or updateReward accordingly.
import { useEffect, useState } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import styles from "./RewardForm.module.css";

var emptyForm = { title: "", description: "", cost: 10, type: "instant" };

export function RewardForm({ editingReward, onSave, onCancelEdit }) {
	var [form, setForm] = useState(emptyForm);
	var [submitting, setSubmitting] = useState(false);

	useEffect(
		function () {
			setForm(
				editingReward
					? {
							title: editingReward.title,
							description: editingReward.description,
							cost: editingReward.cost,
							type: editingReward.type,
					  }
					: emptyForm
			);
		},
		[editingReward]
	);

	function updateField(key, value) {
		setForm(function (prev) {
			return Object.assign({}, prev, { [key]: value });
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (!form.title.trim() || !form.cost || Number(form.cost) < 1) return;
		setSubmitting(true);
		try {
			await onSave(form, editingReward ? editingReward.id : null);
			setForm(emptyForm);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Card>
			<h3 className={styles.heading}>{editingReward ? "Edit Reward" : "Add Reward"}</h3>
			<form onSubmit={handleSubmit}>
				<TextInput
					label="Title"
					value={form.title}
					onChange={function (e) {
						updateField("title", e.target.value);
					}}
					required
				/>
				<TextInput
					label="Description"
					multiline
					rows={2}
					value={form.description}
					onChange={function (e) {
						updateField("description", e.target.value);
					}}
				/>
				<div className={styles.row}>
					<TextInput
						label="Cost (points)"
						type="number"
						min="1"
						value={form.cost}
						onChange={function (e) {
							updateField("cost", e.target.value);
						}}
					/>
					<div className={styles.selectGroup}>
						<label className={styles.selectLabel}>Purchase type</label>
						<select
							className={styles.select}
							value={form.type}
							onChange={function (e) {
								updateField("type", e.target.value);
							}}
						>
							<option value="instant">Instant purchase</option>
							<option value="authorized">Requires authorization</option>
						</select>
					</div>
				</div>
				<div className={styles.actions}>
					<Button type="submit" loading={submitting}>
						{editingReward ? "Save changes" : "Add reward"}
					</Button>
					{editingReward ? (
						<Button type="button" variant="secondary" onClick={onCancelEdit}>
							Cancel
						</Button>
					) : null}
				</div>
			</form>
		</Card>
	);
}
