// ChatPage.jsx - the Chat tab: message history for the active group plus a
// composer. Mirrors js/ui-chat.js's auto-scroll/load-older behavior.
import { useEffect, useRef } from "react";
import { useChat } from "../../hooks/useChat";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";
import { ChatMessage } from "./ChatMessage";
import { ChatComposer } from "./ChatComposer";
import styles from "./ChatPage.module.css";

export function ChatPage() {
	var chat = useChat();
	var listRef = useRef(null);
	var wasNearBottomRef = useRef(true);

	useEffect(
		function () {
			var el = listRef.current;
			if (!el) return;
			if (wasNearBottomRef.current) {
				el.scrollTop = el.scrollHeight;
			}
		},
		[chat.messages]
	);

	function handleScroll() {
		var el = listRef.current;
		if (!el) return;
		wasNearBottomRef.current =
			el.scrollHeight - el.scrollTop - el.clientHeight < 80;
	}

	return (
		<Card>
			<h2 className={styles.heading}>Group Chat</h2>

			{chat.status === "loading" ? <LoadingSpinner label="Loading chat..." /> : null}
			{chat.status === "error" ? (
				<ErrorState
					message={"Couldn't load chat: " + (chat.error ? chat.error.message : "unknown error")}
					onRetry={chat.reload}
				/>
			) : null}

			{chat.status === "ready" ? (
				<>
					{chat.hasMoreOlder ? (
						<Button variant="secondary" onClick={chat.loadOlder} className={styles.loadOlder}>
							Load older messages
						</Button>
					) : null}

					<div className={styles.list} ref={listRef} onScroll={handleScroll}>
						{chat.messages.length === 0 ? (
							<EmptyState icon="💬" title="No messages yet. Say hello!" />
						) : (
							chat.messages.map(function (message) {
								return <ChatMessage key={message.id} message={message} />;
							})
						)}
					</div>

					<ChatComposer onSend={chat.sendMessage} />
				</>
			) : null}
		</Card>
	);
}
