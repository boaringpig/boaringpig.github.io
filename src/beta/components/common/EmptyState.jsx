// EmptyState.jsx - shown when a list has loaded successfully but has zero
// items (as opposed to LoadingSpinner (still loading) or ErrorState (failed)).
import styles from "./EmptyState.module.css";

export function EmptyState({ icon = "—", title, hint }) {
	return (
		<div className={styles.wrap}>
			<div className={styles.icon} aria-hidden="true">
				{icon}
			</div>
			<p className={styles.title}>{title}</p>
			{hint ? <p className={styles.hint}>{hint}</p> : null}
		</div>
	);
}
