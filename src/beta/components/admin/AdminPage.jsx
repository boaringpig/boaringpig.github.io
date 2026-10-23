// AdminPage.jsx - the "Admin Settings" tab (master-only): manage this
// group's own slaves. Reward management lives on the Shop tab (matching the
// classic app's AdminRewardManager), and cross-group management lives on
// the admin-only Masters tab.
import { ManagePigs } from "./ManagePigs";
import { InvitesPanel } from "./InvitesPanel";
import { MotdManageList } from "../motd/MotdManageList";
import { SiteSettingsForm } from "./SiteSettingsForm";

export function AdminPage() {
	return (
		<div>
			<ManagePigs />
			<InvitesPanel />
			<MotdManageList />
			<SiteSettingsForm />
		</div>
	);
}
