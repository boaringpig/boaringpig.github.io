// LoadingSpinner.jsx - the "loading" state for any list/page in the app.
import styles from "./LoadingSpinner.module.css";

export function LoadingSpinner({ label = "Loading..." }) {
	return (
		<div className={styles.wrap} role="status">
			<span className={styles.spinner} aria-hidden="true" />
			<span>{label}</span>
		</div>
	);
}
