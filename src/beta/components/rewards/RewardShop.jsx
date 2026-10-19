// RewardShop.jsx - the slave-facing shop: grid of purchasable rewards, plus
// a list of the slave's own purchase history.
import { useApp } from "../../context/AppContext";
import { RewardCard } from "./RewardCard";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";
import { Badge } from "../common/Badge";
import { Card } from "../common/Card";
import styles from "./RewardShop.module.css";

function purchaseTone(status) {
	if (status === "denied") return "danger";
	if (status === "pending_authorization") return "warning";
	return "success";
}

export function RewardShop({ rewards, rewardsStatus, rewardsError, onRetry, onPurchase, purchases }) {
	var app = useApp();
	var myPurchases = purchases.filter(function (p) {
		return p.userId === app.currentUser;
	});

	return (
		<div>
			<h2>Rewards Shop</h2>
			{rewardsStatus === "loading" ? (
				<LoadingSpinner label="Loading rewards..." />
			) : rewardsStatus === "error" ? (
				<ErrorState message={rewardsError ? rewardsError.message : "Failed to load"} onRetry={onRetry} />
			) : rewards.length === 0 ? (
				<EmptyState title="No rewards available" />
			) : (
				<div className={styles.grid}>
					{rewards.map(function (reward) {
						return <RewardCard key={reward.id} reward={reward} onPurchase={onPurchase} />;
					})}
				</div>
			)}

			<h2 className={styles.purchasesHeading}>My Reward Purchases</h2>
			{myPurchases.length === 0 ? (
				<EmptyState title="No purchases yet" />
			) : (
				myPurchases.map(function (p) {
					return (
						<Card key={p.id} className={styles.purchaseCard}>
							<div className={styles.badgeRow}>
								<Badge tone={purchaseTone(p.status)}>{p.status.replace(/_/g, " ")}</Badge>
							</div>
							<p className={styles.purchaseTitle}>
								{p.rewards ? p.rewards.title : "Unknown reward"}
							</p>
							<p className={styles.purchaseMeta}>
								{p.purchaseCost} points &middot; {window.formatDate(p.purchaseDate)}
							</p>
							{p.status === "denied" && p.notes ? (
								<p className={styles.purchaseMeta}>Reason: {p.notes}</p>
							) : null}
						</Card>
					);
				})
			)}
		</div>
	);
}
