// ActivityFeed.jsx - recent login/logout/points-changed events.
import { EmptyState } from "../common/EmptyState";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import styles from "./ActivityFeed.module.css";

export function ActivityFeed({ activity, status, error, onRetry }) {
	if (status === "loading") return <LoadingSpinner label="Loading activity..." />;
	if (status === "error") {
		return <ErrorState message={error ? error.message : ""} onRetry={onRetry} />;
	}
	if (activity.length === 0) return <EmptyState title="No recent activity" />;
	return (
		<ul className={styles.list}>
			{activity.map(function (a, i) {
				var user = window.users[a.user];
				return (
					<li key={i} className={styles.item}>
						<span className={styles.user}>{user ? user.displayName : a.user}</span>{" "}
						<span className={styles.action}>{a.action.replace(/_/g, " ")}</span>
						{a.details ? <span className={styles.details}> &mdash; {a.details}</span> : null}
						<span className={styles.time}>{window.formatDate(a.timestamp)}</span>
					</li>
				);
			})}
		</ul>
	);
}
