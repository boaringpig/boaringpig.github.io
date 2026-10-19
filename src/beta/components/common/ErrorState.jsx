// ErrorState.jsx - shown when a fetch fails. Always offers a retry action
// since every data hook in this app exposes a `reload()` function.
import { Button } from "./Button";
import styles from "./ErrorState.module.css";

export function ErrorState({ message = "Something went wrong.", onRetry }) {
	return (
		<div className={styles.wrap} role="alert">
			<p className={styles.message}>{message}</p>
			{onRetry ? (
				<Button variant="secondary" onClick={onRetry}>
					Try again
				</Button>
			) : null}
		</div>
	);
}
