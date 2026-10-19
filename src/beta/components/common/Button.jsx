// Button.jsx
//
// A plain <button> wrapper. Why wrap it at all instead of using <button>
// everywhere? So every button in the app gets the same hover/focus/
// disabled/loading look for free, defined once in Button.module.css,
// instead of every feature component re-inventing those states.
import styles from "./Button.module.css";

/**
 * @param {object} props
 * @param {"primary"|"secondary"|"danger"} [props.variant]
 * @param {boolean} [props.loading] - shows a spinner and disables the button.
 * @param {boolean} [props.disabled]
 */
export function Button({
	variant = "primary",
	loading = false,
	disabled = false,
	children,
	className,
	...rest
}) {
	var variantClass =
		variant === "secondary"
			? styles.secondary
			: variant === "danger"
			? styles.danger
			: styles.primary;

	return (
		<button
			className={[styles.button, variantClass, className].filter(Boolean).join(" ")}
			disabled={disabled || loading}
			aria-busy={loading || undefined}
			{...rest}
		>
			{loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
			<span className={loading ? styles.labelLoading : undefined}>{children}</span>
		</button>
	);
}
