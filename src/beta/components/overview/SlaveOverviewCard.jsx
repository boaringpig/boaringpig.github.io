// SlaveOverviewCard.jsx - one slave's at-a-glance status in the Master
// Overview grid: points, online/offline, whether a cost tracker is running
// for them, a pending-count badge, and completion rate. Click opens the
// detail modal (see MasterOverviewPage).
import { Card } from "../common/Card";
import styles from "./SlaveOverviewCard.module.css";

function pointsClass(points) {
	if (points < 0) return styles.negative;
	if (points === 0) return styles.zero;
	return styles.positive;
}

export function SlaveOverviewCard({
	slave,
	online,
	tracker,
	pendingCount,
	completionRate,
	onClick,
}) {
	return (
		<Card
			className={styles.card}
			onClick={onClick}
			role="button"
			tabIndex={0}
			onKeyDown={function (e) {
				if (e.key === "Enter" || e.key === " ") onClick();
			}}
		>
			<div className={styles.header}>
				<span className={styles.name}>{slave.displayName}</span>
				<span
					className={online ? styles.onlineDot : styles.offlineDot}
					title={online ? "Online" : "Offline"}
				/>
			</div>
			{slave.statusMessage ? (
				<div className={styles.status}>{slave.statusMessage}</div>
			) : null}
			<div className={[styles.points, pointsClass(slave.points)].join(" ")}>
				{slave.points} pts
			</div>
			<div className={styles.metaRow}>
				<span>{completionRate}% complete</span>
				{pendingCount > 0 ? (
					<span className={styles.pendingBadge}>{pendingCount} pending</span>
				) : null}
			</div>
			{tracker ? (
				<div className={styles.trackerBadge}>💰 Tracker running</div>
			) : null}
		</Card>
	);
}
