// ShopPage.jsx - the Rewards Shop tab. Slaves see a purchasable grid;
// masters see the admin reward management panel.
import { useApp } from "../../context/AppContext";
import { useRewards } from "../../hooks/useRewards";
import { RewardShop } from "./RewardShop";
import { AdminRewardManager } from "./AdminRewardManager";

export function ShopPage() {
	var app = useApp();
	var rewardsState = useRewards();

	if (app.isMaster) {
		return <AdminRewardManager rewardsState={rewardsState} />;
	}

	return (
		<RewardShop
			rewards={rewardsState.rewards}
			rewardsStatus={rewardsState.rewardsStatus}
			rewardsError={rewardsState.rewardsError}
			onRetry={rewardsState.reloadRewards}
			onPurchase={rewardsState.purchaseReward}
			purchases={rewardsState.purchases}
		/>
	);
}
