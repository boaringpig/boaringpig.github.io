// UserProgressList.jsx - each slave's current points, color-coded like the
// classic dashboard (negative = red, zero = yellow, positive = green).
import { useApp } from "../../context/AppContext";
import { Card } from "../common/Card";
import { EmptyState } from "../common/EmptyState";
import styles from "./UserProgressList.module.css";

function pointsClass(points) {
	if (points < 0) return styles.negative;
	if (points === 0) return styles.zero;
	return styles.positive;
}

export function UserProgressList({ slaves }) {
	var app = useApp();
	if (slaves.length === 0) {
		return <EmptyState title={"No " + app.groupTerms.slaveLabelPlural + " to display"} />;
	}
	return (
		<div className={styles.list}>
			{slaves.map(function (slave) {
				return (
					<Card key={slave.username} className={styles.row}>
						<span>{slave.displayName}</span>
						<span className={pointsClass(slave.points)}>{slave.points} pts</span>
					</Card>
				);
			})}
		</div>
	);
}
