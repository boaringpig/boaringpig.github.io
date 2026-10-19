// MotdManageList.jsx - master-facing Message of the Day management: add,
// reorder (move up/down), and delete. Mounted in AdminPage.
import { useMotd } from "../../hooks/useMotd";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";
import { MotdMessageForm } from "./MotdMessageForm";
import styles from "./MotdManageList.module.css";

export function MotdManageList() {
	var motd = useMotd();

	return (
		<Card>
			<h2 className={styles.heading}>Message of the Day</h2>
			<MotdMessageForm onAdd={motd.addMessage} />

			{motd.status === "loading" ? <LoadingSpinner label="Loading messages..." /> : null}
			{motd.status === "error" ? (
				<ErrorState
					message={"Couldn't load messages: " + (motd.error ? motd.error.message : "unknown error")}
					onRetry={motd.reload}
				/>
			) : null}
			{motd.status === "ready" && motd.messages.length === 0 ? (
				<EmptyState title="No messages added yet" />
			) : null}

			{motd.status === "ready" && motd.messages.length > 0
				? motd.messages.map(function (message, index) {
						var isFirst = index === 0;
						var isLast = index === motd.messages.length - 1;
						var isCurrent = motd.currentMessage && motd.currentMessage.id === message.id;

						return (
							<div key={message.id} className={styles.row}>
								<div>
									{isCurrent ? <Badge tone="success">Showing now</Badge> : null} {message.body}
								</div>
								<div className={styles.actions}>
									<Button
										variant="secondary"
										disabled={isFirst}
										onClick={function () {
											motd.moveUp(message.id);
										}}
									>
										↑
									</Button>
									<Button
										variant="secondary"
										disabled={isLast}
										onClick={function () {
											motd.moveDown(message.id);
										}}
									>
										↓
									</Button>
									<Button
										variant="danger"
										onClick={function () {
											motd.deleteMessage(message.id);
										}}
									>
										Delete
									</Button>
								</div>
							</div>
						);
				  })
				: null}
		</Card>
	);
}
