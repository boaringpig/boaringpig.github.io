// StatsRow.jsx - the small stat tiles at the top of the dashboard.
import { Card } from "../common/Card";
import styles from "./StatsRow.module.css";

export function StatsRow({ stats }) {
	return (
		<div className={styles.row}>
			{stats.map(function (stat) {
				return (
					<Card key={stat.label} className={styles.tile}>
						<div className={styles.number}>{stat.value}</div>
						<div className={styles.label}>{stat.label}</div>
					</Card>
				);
			})}
		</div>
	);
}
