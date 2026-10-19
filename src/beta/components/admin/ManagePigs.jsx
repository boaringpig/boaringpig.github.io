// ManagePigs.jsx - a master's own "add/deactivate slave" panel. Mirrors
// js/database-pigs.js's addNewPig/deactivatePig/reactivatePig, calling them
// with explicit params instead of letting them read the classic DOM form
// (see that file's updated doc comment).
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useSlaves } from "../../hooks/useSlaves";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import { Badge } from "../common/Badge";
import { EmptyState } from "../common/EmptyState";
import styles from "./ManagePigs.module.css";

export function ManagePigs() {
	var app = useApp();
	var state = useSlaves();
	var [form, setForm] = useState({ username: "", password: "", displayName: "" });
	var [submitting, setSubmitting] = useState(false);

	function updateField(key, value) {
		setForm(function (prev) {
			return Object.assign({}, prev, { [key]: value });
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setSubmitting(true);
		try {
			await window.addNewPig(form);
			setForm({ username: "", password: "", displayName: "" });
			state.reload();
		} finally {
			setSubmitting(false);
		}
	}

	function handleDeactivate(username) {
		window.deactivatePig(username);
	}

	function handleReactivate(username) {
		window.reactivatePig(username);
	}

	return (
		<div>
			<Card>
				<h2 className={styles.heading}>
					Add New {app.groupTerms.slaveLabel}
				</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					<TextInput
						label="Username"
						value={form.username}
						onChange={function (e) {
							updateField("username", e.target.value);
						}}
						placeholder="lowercase, min 3 chars"
						required
					/>
					<TextInput
						label="Password"
						type="password"
						value={form.password}
						onChange={function (e) {
							updateField("password", e.target.value);
						}}
						placeholder="min 4 chars"
						required
					/>
					<TextInput
						label="Display name"
						value={form.displayName}
						onChange={function (e) {
							updateField("displayName", e.target.value);
						}}
						placeholder="optional"
					/>
					<Button type="submit" loading={submitting}>
						Add {app.groupTerms.slaveLabel}
					</Button>
				</form>
			</Card>

			<h2 className={styles.heading}>Current {app.groupTerms.slaveLabelPlural}</h2>
			{state.allSlaves.length === 0 ? (
				<EmptyState title={"No " + app.groupTerms.slaveLabelPlural + " added yet"} />
			) : (
				state.allSlaves.map(function (slave) {
					var isActive = slave.status === "active";
					return (
						<Card key={slave.username} className={styles.row}>
							<div>
								<Badge tone={isActive ? "success" : "neutral"}>
									{isActive ? "Active" : "Inactive"}
								</Badge>{" "}
								<strong>{slave.displayName}</strong> ({slave.username}) &middot;{" "}
								{slave.points} pts
								{slave.statusMessage ? (
									<span className={styles.statusMessage}> &middot; {slave.statusMessage}</span>
								) : null}
							</div>
							{isActive ? (
								<Button
									variant="danger"
									onClick={function () {
										handleDeactivate(slave.username);
									}}
								>
									Deactivate
								</Button>
							) : (
								<Button
									onClick={function () {
										handleReactivate(slave.username);
									}}
								>
									Reactivate
								</Button>
							)}
						</Card>
					);
				})
			)}
		</div>
	);
}
