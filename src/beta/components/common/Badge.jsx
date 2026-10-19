// Badge.jsx - small status pill (used for task status, purchase status, etc).
import styles from "./Badge.module.css";

/**
 * @param {"neutral"|"success"|"warning"|"danger"} [props.tone]
 */
export function Badge({ tone = "neutral", children }) {
	var toneClass =
		tone === "success"
			? styles.success
			: tone === "warning"
			? styles.warning
			: tone === "danger"
			? styles.danger
			: styles.neutral;
	return <span className={[styles.badge, toneClass].join(" ")}>{children}</span>;
}
