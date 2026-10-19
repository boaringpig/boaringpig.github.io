// ChatComposer.jsx - the message input + send button.
import { useState } from "react";
import { Button } from "../common/Button";
import styles from "./ChatComposer.module.css";

export function ChatComposer({ onSend }) {
	var [value, setValue] = useState("");
	var [sending, setSending] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		var trimmed = value.trim();
		if (!trimmed) return;
		setSending(true);
		try {
			await onSend(trimmed);
			setValue("");
		} finally {
			setSending(false);
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				className={styles.input}
				value={value}
				onChange={function (e) {
					setValue(e.target.value);
				}}
				placeholder="Type a message..."
				maxLength={500}
			/>
			<Button type="submit" loading={sending} disabled={!value.trim()}>
				Send
			</Button>
		</form>
	);
}
