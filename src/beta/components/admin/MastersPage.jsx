// MastersPage.jsx - the admin-only "Masters" tab: create new master
// accounts, edit existing ones (account + terminology + beta/theme),
// deactivate/reactivate. Backed by js/database-admin.js, same as the
// classic "Masters" tab (js/ui-admin.js) - see useAllMasters.js. Also
// hosts SiteSettingsForm (the site-wide title/login heading) -- admin-only
// since it affects every group, unlike the rest of this page's per-group
// settings.
import { useState } from "react";
import { useAllMasters } from "../../hooks/useAllMasters";
import { MasterEditForm } from "./MasterEditForm";
import { SiteSettingsForm } from "./SiteSettingsForm";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { EmptyState } from "../common/EmptyState";
import styles from "./MastersPage.module.css";

export function MastersPage() {
	var state = useAllMasters();
	var [editing, setEditing] = useState(null); // null | masterObject

	async function handleCreate(form) {
		var created = await state.createMaster(form);
		if (created) await state.reload();
	}

	async function handleSaveExisting(username, form) {
		await state.updateMasterAccount(username, {
			displayName: form.displayName,
			password: form.password,
			isAdmin: form.isAdmin,
		});
		await state.updateMasterTerminology(username, form);
		setEditing(null);
		await state.reload();
	}

	if (editing) {
		return (
			<MasterEditForm
				master={editing}
				onSaveExisting={handleSaveExisting}
				onCancel={function () {
					setEditing(null);
				}}
			/>
		);
	}

	return (
		<div>
			<SiteSettingsForm />

			<MasterEditForm onCreate={handleCreate} />

			<h2 className={styles.heading}>All Masters</h2>
			{state.status === "loading" ? (
				<LoadingSpinner />
			) : state.masters.length === 0 ? (
				<EmptyState title="No masters yet" />
			) : (
				state.masters.map(function (master) {
					var isActive = master.status === "active";
					return (
						<Card key={master.username} className={styles.row}>
							<div>
								<div className={styles.badgeRow}>
									<Badge tone={isActive ? "success" : "neutral"}>
										{isActive ? "Active" : "Inactive"}
									</Badge>
									{master.isAdmin ? <Badge tone="warning">Admin</Badge> : null}
								</div>
								<strong>{master.displayName}</strong> ({master.username})
								<div className={styles.meta}>
									Group: {master.groupLabel} &middot; {master.masterLabel} / {master.slaveLabel}
								</div>
							</div>
							<div className={styles.actions}>
								<Button
									variant="secondary"
									onClick={function () {
										setEditing(master);
									}}
								>
									Edit
								</Button>
								{isActive ? (
									<Button
										variant="danger"
										onClick={function () {
											state.deactivateMaster(master.username);
										}}
									>
										Deactivate
									</Button>
								) : (
									<Button
										onClick={function () {
											state.reactivateMaster(master.username);
										}}
									>
										Reactivate
									</Button>
								)}
							</div>
						</Card>
					);
				})
			)}
		</div>
	);
}
