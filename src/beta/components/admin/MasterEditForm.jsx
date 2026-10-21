// MasterEditForm.jsx - create a new master, or edit an existing one
// (account details, terminology, beta flag, theme). Both modes share this
// one form; `master` is null when creating.
import { useState } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import { ContrastChecklist } from "./ContrastChecklist";
import styles from "./MasterEditForm.module.css";

var DEFAULT_THEME = {
	bg: "#09090b",
	card: "#131316",
	elevated: "#1a1a20",
	textPrimary: "#fafafa",
	textSecondary: "#a1a1aa",
};

function initialState(master) {
	return {
		username: master ? master.username : "",
		password: "",
		displayName: master ? master.displayName : "",
		isAdmin: master ? master.isAdmin : false,
		groupLabel: master ? master.groupLabel : "Household",
		masterLabel: master ? master.masterLabel : "Master",
		masterLabelPlural: master ? master.masterLabelPlural : "Masters",
		slaveLabel: master ? master.slaveLabel : "pig",
		slaveLabelPlural: master ? master.slaveLabelPlural : "pigs",
		classicUiForced: master ? master.classicUiForced : false,
		theme: master ? master.theme : DEFAULT_THEME,
	};
}

export function MasterEditForm({ master, onCreate, onSaveExisting, onCancel }) {
	var [form, setForm] = useState(initialState(master));
	var [submitting, setSubmitting] = useState(false);
	var isEditing = !!master;

	function update(key, value) {
		setForm(function (prev) {
			return Object.assign({}, prev, { [key]: value });
		});
	}

	function updateTheme(key, value) {
		setForm(function (prev) {
			return Object.assign({}, prev, { theme: Object.assign({}, prev.theme, { [key]: value }) });
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setSubmitting(true);
		try {
			if (isEditing) {
				await onSaveExisting(master.username, form);
			} else {
				await onCreate(form);
				setForm(initialState(null));
			}
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Card>
			<h2 className={styles.heading}>{isEditing ? "Edit " + master.username : "Create New Master"}</h2>
			<form onSubmit={handleSubmit}>
				{!isEditing ? (
					<TextInput
						label="Username"
						value={form.username}
						onChange={function (e) {
							update("username", e.target.value);
						}}
						required
					/>
				) : null}
				<TextInput
					label={isEditing ? "New password (leave blank to keep current)" : "Password"}
					type="password"
					value={form.password}
					onChange={function (e) {
						update("password", e.target.value);
					}}
					required={!isEditing}
				/>
				<TextInput
					label="Display name"
					value={form.displayName}
					onChange={function (e) {
						update("displayName", e.target.value);
					}}
				/>
				<label className={styles.checkboxRow}>
					<input
						type="checkbox"
						checked={form.isAdmin}
						onChange={function (e) {
							update("isAdmin", e.target.checked);
						}}
					/>
					Admin access
				</label>

				<div className={styles.row}>
					<TextInput
						label="Group label"
						placeholder="The Polycule, The Drift..."
						value={form.groupLabel}
						onChange={function (e) {
							update("groupLabel", e.target.value);
						}}
					/>
					<TextInput
						label="Master label"
						placeholder="Master, Sir, Daddy..."
						value={form.masterLabel}
						onChange={function (e) {
							update("masterLabel", e.target.value);
						}}
					/>
				</div>
				<div className={styles.row}>
					<TextInput
						label="Master label (plural)"
						value={form.masterLabelPlural}
						onChange={function (e) {
							update("masterLabelPlural", e.target.value);
						}}
					/>
					<TextInput
						label="Slave label"
						placeholder="pig, pet, sub..."
						value={form.slaveLabel}
						onChange={function (e) {
							update("slaveLabel", e.target.value);
						}}
					/>
				</div>
				<TextInput
					label="Slave label (plural)"
					value={form.slaveLabelPlural}
					onChange={function (e) {
						update("slaveLabelPlural", e.target.value);
					}}
				/>

				<hr className={styles.divider} />

				<label className={styles.checkboxRow}>
					<input
						type="checkbox"
						checked={form.classicUiForced}
						onChange={function (e) {
							update("classicUiForced", e.target.checked);
						}}
					/>
					Force classic styling for this group (disable beta)
				</label>

				<div className={styles.colorRow}>
					{[
						["bg", "Background"],
						["card", "Card"],
						["elevated", "Elevated"],
						["textPrimary", "Primary text"],
						["textSecondary", "Secondary text"],
					].map(function (entry) {
						var key = entry[0];
						var label = entry[1];
						return (
							<label key={key} className={styles.colorField}>
								{label}
								<input
									type="color"
									value={form.theme[key]}
									onChange={function (e) {
										updateTheme(key, e.target.value);
									}}
								/>
							</label>
						);
					})}
				</div>

				<ContrastChecklist theme={form.theme} />

				<div className={styles.actions}>
					<Button type="submit" loading={submitting}>
						{isEditing ? "Save changes" : "Create master"}
					</Button>
					{isEditing ? (
						<Button type="button" variant="secondary" onClick={onCancel}>
							Cancel
						</Button>
					) : null}
				</div>
			</form>
		</Card>
	);
}
