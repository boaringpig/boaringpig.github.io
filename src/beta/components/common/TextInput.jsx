// TextInput.jsx - a labeled form field (works for type="text"/"password"/
// "number"/"date" etc, and renders a <textarea> when `multiline` is set).
// Centralizing the label+input pairing means every form in the app gets
// consistent spacing and an inline error message for free.
import styles from "./TextInput.module.css";

export function TextInput({ label, error, multiline = false, id, ...rest }) {
	var inputId = id || "field-" + label?.replace(/\s+/g, "-").toLowerCase();
	return (
		<div className={styles.group}>
			{label ? (
				<label className={styles.label} htmlFor={inputId}>
					{label}
				</label>
			) : null}
			{multiline ? (
				<textarea id={inputId} className={styles.input} {...rest} />
			) : (
				<input id={inputId} className={styles.input} {...rest} />
			)}
			{error ? <p className={styles.error}>{error}</p> : null}
		</div>
	);
}
