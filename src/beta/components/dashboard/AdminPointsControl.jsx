// AdminPointsControl.jsx - lets a master set a slave's points to an exact
// value. Calls window.updateUserPoints directly (js/database-user.js) -
// that function already takes explicit parameters, so no DOM-fallback
// refactor was needed for it (see src/beta/README.md).
import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import styles from "./AdminPointsControl.module.css";

export function AdminPointsControl({ slaves }) {
	var app = useApp();
	var [selected, setSelected] = useState(slaves[0] ? slaves[0].username : "");
	var [points, setPoints] = useState(0);

	useEffect(
		function () {
			var slave = slaves.find(function (s) {
				return s.username === selected;
			});
			if (slave) setPoints(slave.points);
			else if (slaves[0]) setSelected(slaves[0].username);
		},
		[slaves, selected]
	);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!selected) return;
		var slave = slaves.find(function (s) {
			return s.username === selected;
		});
		var oldPoints = slave ? slave.points : 0;
		await window.updateUserPoints(selected, Number(points) || 0, "set");
		window.showNotification(
			(slave ? slave.displayName : selected) +
				" points changed from " +
				oldPoints +
				" to " +
				(Number(points) || 0),
			"success"
		);
	}

	if (slaves.length === 0) return null;

	return (
		<Card>
			<h3 className={styles.heading}>Set {app.groupTerms.slaveLabel} points</h3>
			<form className={styles.form} onSubmit={handleSubmit}>
				<select
					className={styles.select}
					value={selected}
					onChange={function (e) {
						setSelected(e.target.value);
					}}
					aria-label={"Select " + app.groupTerms.slaveLabel}
				>
					{slaves.map(function (s) {
						return (
							<option key={s.username} value={s.username}>
								{s.displayName}
							</option>
						);
					})}
				</select>
				<TextInput
					label="New points"
					type="number"
					value={points}
					onChange={function (e) {
						setPoints(e.target.value);
					}}
				/>
				<Button type="submit">Set</Button>
			</form>
		</Card>
	);
}
