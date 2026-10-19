// RewardCard.jsx - one reward in the shop grid (slave view) or admin list.
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import styles from "./RewardCard.module.css";

export function RewardCard({ reward, onPurchase, onEdit, onDelete, isAdmin }) {
	return (
		<Card className={styles.card}>
			<h3 className={styles.title}>{reward.title}</h3>
			<p className={styles.description}>{reward.description}</p>
			<div className={styles.badgeRow}>
				<Badge tone="neutral">{reward.cost} points</Badge>
				<Badge tone={reward.type === "instant" ? "success" : "warning"}>
					{reward.type === "instant" ? "Instant" : "Needs authorization"}
				</Badge>
			</div>
			{isAdmin ? (
				<div className={styles.actions}>
					<Button variant="secondary" onClick={function () { onEdit(reward); }}>
						Edit
					</Button>
					<Button variant="danger" onClick={function () { onDelete(reward.id); }}>
						Delete
					</Button>
				</div>
			) : (
				<Button onClick={function () { onPurchase(reward.id); }}>Purchase</Button>
			)}
		</Card>
	);
}
