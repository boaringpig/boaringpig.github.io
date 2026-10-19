// PendingAuthorizations.jsx - purchases of "requires authorization" rewards
// waiting on a master's decision.
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { EmptyState } from "../common/EmptyState";
import styles from "./PendingAuthorizations.module.css";

export function PendingAuthorizations({ purchases, onAuthorize, onDeny }) {
	var pending = purchases.filter(function (p) {
		return p.status === "pending_authorization";
	});

	if (pending.length === 0) {
		return <EmptyState title="No pending authorizations" />;
	}

	return (
		<div>
			{pending.map(function (p) {
				var buyer = window.users[p.userId];
				return (
					<Card key={p.id} className={styles.card}>
						<p className={styles.title}>
							{p.rewards ? p.rewards.title : "Unknown reward"} by{" "}
							{buyer ? buyer.displayName : p.userId}
						</p>
						<p className={styles.meta}>
							{p.purchaseCost} points &middot; requested {window.formatDate(p.purchaseDate)}
						</p>
						<div className={styles.actions}>
							<Button onClick={function () { onAuthorize(p.id); }}>Authorize</Button>
							<Button variant="danger" onClick={function () { onDeny(p.id); }}>
								Deny
							</Button>
						</div>
					</Card>
				);
			})}
		</div>
	);
}
