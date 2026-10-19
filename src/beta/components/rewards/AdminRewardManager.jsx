// AdminRewardManager.jsx - the master-facing reward management panel:
// create/edit/delete rewards, tune the instant-purchase settings, and
// authorize/deny pending purchases.
import { useState } from "react";
import { RewardForm } from "./RewardForm";
import { RewardCard } from "./RewardCard";
import { RewardSettingsForm } from "./RewardSettingsForm";
import { PendingAuthorizations } from "./PendingAuthorizations";
import { EmptyState } from "../common/EmptyState";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import styles from "./AdminRewardManager.module.css";

export function AdminRewardManager({ rewardsState }) {
	var [editingReward, setEditingReward] = useState(null);

	async function handleSave(form, id) {
		if (id) {
			await rewardsState.updateReward(id, form.title, form.description, Number(form.cost), form.type);
		} else {
			await rewardsState.addReward(form.title, form.description, Number(form.cost), form.type);
		}
		setEditingReward(null);
	}

	function handleDelete(id) {
		window.showConfirmModal("Delete this reward?", function (confirmed) {
			if (confirmed) rewardsState.deleteReward(id);
		});
	}

	return (
		<div>
			<RewardForm
				editingReward={editingReward}
				onSave={handleSave}
				onCancelEdit={function () {
					setEditingReward(null);
				}}
			/>

			<h2 className={styles.heading}>Current Rewards</h2>
			{rewardsState.rewardsStatus === "loading" ? (
				<LoadingSpinner />
			) : rewardsState.rewardsStatus === "error" ? (
				<ErrorState
					message={rewardsState.rewardsError ? rewardsState.rewardsError.message : ""}
					onRetry={rewardsState.reloadRewards}
				/>
			) : rewardsState.rewards.length === 0 ? (
				<EmptyState title="No rewards defined" />
			) : (
				<div className={styles.grid}>
					{rewardsState.rewards.map(function (reward) {
						return (
							<RewardCard
								key={reward.id}
								reward={reward}
								isAdmin
								onEdit={setEditingReward}
								onDelete={handleDelete}
							/>
						);
					})}
				</div>
			)}

			<h2 className={styles.heading}>Reward System Settings</h2>
			<RewardSettingsForm
				settings={rewardsState.settings}
				onSave={rewardsState.updateRewardSystemSettings}
				onReset={rewardsState.resetInstantPurchaseLimit}
			/>

			<h2 className={styles.heading}>Pending Reward Authorizations</h2>
			<PendingAuthorizations
				purchases={rewardsState.purchases}
				onAuthorize={rewardsState.authorizePurchase}
				onDeny={rewardsState.denyPurchase}
			/>
		</div>
	);
}
