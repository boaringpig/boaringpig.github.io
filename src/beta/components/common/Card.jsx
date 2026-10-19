// Card.jsx - the basic "surface" container used throughout the app.
// `raised` switches it from the --color-card background to the lighter
// --color-elevated background (e.g. for a card that sits on top of another
// card, like a modal or a nested panel).
import styles from "./Card.module.css";

export function Card({ raised = false, className, children, ...rest }) {
	return (
		<div
			className={[raised ? styles.raised : styles.card, className]
				.filter(Boolean)
				.join(" ")}
			{...rest}
		>
			{children}
		</div>
	);
}
