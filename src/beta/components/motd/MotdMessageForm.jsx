// MotdMessageForm.jsx - add-a-message form for the master's MOTD manage list.
import { useState } from "react";
import { Button } from "../common/Button";
import { TextInput } from "../common/TextInput";
import styles from "./MotdMessageForm.module.css";

export function MotdMessageForm({ onAdd }) {
	var [value, setValue] = useState("");
	var [submitting, setSubmitting] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		var trimmed = value.trim();
		if (!trimmed) return;
		setSubmitting(true);
		try {
			await onAdd(trimmed);
			setValue("");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<TextInput
				multiline
				rows={2}
				value={value}
				onChange={function (e) {
					setValue(e.target.value);
				}}
				placeholder="New message..."
				maxLength={300}
			/>
			<Button type="submit" loading={submitting} disabled={!value.trim()}>
				Add Message
			</Button>
		</form>
	);
}
