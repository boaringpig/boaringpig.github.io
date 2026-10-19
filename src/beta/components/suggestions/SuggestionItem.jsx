// SuggestionItem.jsx - one suggestion row. `forAdmin` switches between the
// slave's read-only "my suggestions" view and the master's review actions.
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import styles from "./SuggestionItem.module.css";

function statusTone(status) {
	if (status === "pending") return "warning";
	if (status === "rejected") return "danger";
	return "success";
}

export function SuggestionItem({ suggestion, forAdmin, onApprove, onEdit, onReject }) {
	var reviewer = window.users[suggestion.reviewedBy];
	return (
		<Card className={styles.card}>
			<div className={styles.badgeRow}>
				<Badge tone={statusTone(suggestion.status)}>{suggestion.status}</Badge>
				<Badge tone="neutral">{suggestion.suggestedPoints} pts</Badge>
			</div>
			<p className={styles.description}>{suggestion.description}</p>
			{suggestion.justification ? (
				<p className={styles.justification}>{suggestion.justification}</p>
			) : null}
			<p className={styles.metaLine}>
				Submitted {window.formatDate(suggestion.createdAt)}
				{suggestion.suggestedDueDate
					? " · Suggested due " + window.formatDate(suggestion.suggestedDueDate)
					: ""}
				{suggestion.reviewedAt
					? " · Reviewed by " + (reviewer ? reviewer.displayName : suggestion.reviewedBy)
					: ""}
			</p>
			{forAdmin && suggestion.status === "pending" ? (
				<div className={styles.actions}>
					<Button onClick={function () { onApprove(suggestion.id); }}>Approve</Button>
					<Button variant="secondary" onClick={function () { onEdit(suggestion.id); }}>
						Edit &amp; approve
					</Button>
					<Button variant="danger" onClick={function () { onReject(suggestion.id); }}>
						Reject
					</Button>
				</div>
			) : null}
		</Card>
	);
}
