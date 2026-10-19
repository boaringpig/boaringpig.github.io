// ChatMessage.jsx - a single chat message row.
import styles from "./ChatMessage.module.css";

export function ChatMessage({ message }) {
	var sender = window.users[message.sender_username];
	var displayName = sender ? sender.displayName : message.sender_username;
	var statusMessage = sender && sender.statusMessage ? sender.statusMessage : "";

	return (
		<div className={styles.row}>
			<div className={styles.meta}>
				<strong>{displayName}</strong>
				{statusMessage ? <span className={styles.status}> {statusMessage}</span> : null}
				<span className={styles.time}>{new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
			</div>
			<div className={styles.body}>{message.body}</div>
		</div>
	);
}
