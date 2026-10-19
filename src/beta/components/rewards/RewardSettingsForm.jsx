// RewardSettingsForm.jsx - the instant-purchase-limit admin settings.
import { useEffect, useState } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import styles from "./RewardSettingsForm.module.css";

export function RewardSettingsForm({ settings, onSave, onReset }) {
	var [limit, setLimit] = useState(settings.instantPurchaseLimit || 0);
	var [resetDuration, setResetDuration] = useState(settings.resetDurationDays || 0);
	var [requiresAuth, setRequiresAuth] = useState(settings.requiresAuthorizationAfterLimit !== false);

	useEffect(
		function () {
			setLimit(settings.instantPurchaseLimit || 0);
			setResetDuration(settings.resetDurationDays || 0);
			setRequiresAuth(settings.requiresAuthorizationAfterLimit !== false);
		},
		[settings]
	);

	function handleSave(e) {
		e.preventDefault();
		onSave(Number(limit) || 0, Number(resetDuration) || 0, requiresAuth);
	}

	return (
		<Card>
			<h3 className={styles.heading}>Reward System Settings</h3>
			<form onSubmit={handleSave}>
				<div className={styles.row}>
					<TextInput
						label="Instant purchase limit (total points)"
						type="number"
						min="0"
						value={limit}
						onChange={function (e) {
							setLimit(e.target.value);
						}}
					/>
					<TextInput
						label="Limit reset duration (days, 0 = manual only)"
						type="number"
						min="0"
						value={resetDuration}
						onChange={function (e) {
							setResetDuration(e.target.value);
						}}
					/>
				</div>
				<label className={styles.checkboxRow}>
					<input
						type="checkbox"
						checked={requiresAuth}
						onChange={function (e) {
							setRequiresAuth(e.target.checked);
						}}
					/>
					Require authorization after limit reached
				</label>
				<p className={styles.readout}>
					Current instant spend: {settings.currentInstantSpend || 0} / {settings.instantPurchaseLimit || 0} points
				</p>
				<p className={styles.readout}>
					Last reset: {settings.lastResetAt ? window.formatDate(settings.lastResetAt) : "N/A"}
				</p>
				<div className={styles.actions}>
					<Button type="submit">Update settings</Button>
					<Button type="button" variant="secondary" onClick={onReset}>
						Reset instant spend now
					</Button>
				</div>
			</form>
		</Card>
	);
}
