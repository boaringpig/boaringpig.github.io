// TrackerCard.jsx - one running cost tracker, with a live-updating elapsed
// time/cost readout (re-computed every second from started_at - no server
// round-trip needed for the ticking display itself).
import { useEffect, useState } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import styles from "./TrackerCard.module.css";

function intervalLabel(ms) {
	if (ms === 1000) return "second";
	if (ms === 3600000) return "hour";
	return "minute";
}

function computeTotals(tracker, now) {
	var elapsed = Math.max(0, now - new Date(tracker.started_at).getTime());
	var intervalMs = parseInt(tracker.increment_interval) || 60000;
	var rate = parseFloat(tracker.rate) || 0;
	var timeCost = (elapsed / intervalMs) * rate;

	var penalties = [];
	try {
		penalties = JSON.parse(tracker.penalties || "[]");
	} catch (e) {
		penalties = [];
	}
	var penaltyTotal = penalties.reduce(function (sum, p) {
		return sum + (parseFloat(p.amount) || 0);
	}, 0);

	var hours = Math.floor(elapsed / 3600000);
	var minutes = Math.floor((elapsed % 3600000) / 60000);
	var seconds = Math.floor((elapsed % 60000) / 1000);
	var timeText =
		String(hours).padStart(2, "0") +
		":" +
		String(minutes).padStart(2, "0") +
		":" +
		String(seconds).padStart(2, "0");

	return {
		timeText: timeText,
		penalties: penalties,
		penaltyTotal: penaltyTotal,
		grandTotal: timeCost + penaltyTotal,
	};
}

export function TrackerCard({ tracker, isAdmin, onStop, onAddPenalty, onRemovePenalty }) {
	var [now, setNow] = useState(Date.now());
	var [penaltyDescription, setPenaltyDescription] = useState("");
	var [penaltyAmount, setPenaltyAmount] = useState("");

	useEffect(function () {
		var id = window.setInterval(function () {
			setNow(Date.now());
		}, 1000);
		return function () {
			window.clearInterval(id);
		};
	}, []);

	var totals = computeTotals(tracker, now);
	var owner = window.users[tracker.created_by];

	return (
		<Card className={styles.card}>
			<p className={styles.description}>{tracker.description}</p>
			<p className={styles.meta}>
				by {owner ? owner.displayName : tracker.created_by} &middot; {tracker.currency}
				{parseFloat(tracker.rate).toFixed(2)} per {intervalLabel(parseInt(tracker.increment_interval))}
			</p>
			<div className={styles.readout}>
				<span>{totals.timeText}</span>
				<span className={styles.amount}>
					{tracker.currency}
					{totals.grandTotal.toFixed(2)}
				</span>
			</div>

			{totals.penalties.length > 0 ? (
				<ul className={styles.penaltyList}>
					{totals.penalties.map(function (p) {
						return (
							<li key={p.id}>
								{p.description}: {tracker.currency}
								{parseFloat(p.amount).toFixed(2)}
								{isAdmin ? (
									<button
										className={styles.removePenalty}
										onClick={function () {
											onRemovePenalty(tracker.id, p.id);
										}}
										aria-label={"Remove penalty " + p.description}
									>
										&times;
									</button>
								) : null}
							</li>
						);
					})}
				</ul>
			) : null}

			{isAdmin ? (
				<>
					<div className={styles.penaltyForm}>
						<TextInput
							label="Add penalty"
							placeholder="Description"
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
							variant="secondary"
							disabled={!penaltyDescription.trim() || !penaltyAmount}
							onClick={function () {
								onAddPenalty(tracker.id, penaltyDescription, Number(penaltyAmount));
								setPenaltyDescription("");
								setPenaltyAmount("");
							}}
						>
							Add
						</Button>
					</div>
					<div className={styles.stopActions}>
						<Button variant="danger" onClick={function () { onStop(tracker.id, true); }}>
							Stop &amp; invoice
						</Button>
						<Button variant="secondary" onClick={function () { onStop(tracker.id, false); }}>
							Stop (no invoice)
						</Button>
					</div>
				</>
			) : null}
		</Card>
	);
}
