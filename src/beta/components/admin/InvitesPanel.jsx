// InvitesPanel.jsx - master-facing invite link generation/management.
// Redemption itself is unreachable from here: an unauthenticated visitor
// never loads the beta bundle, so that flow only exists in the classic app
// (js/invites.js).
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useInvites } from "../../hooks/useInvites";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Badge } from "../common/Badge";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";
import styles from "./InvitesPanel.module.css";

function inviteBadgeTone(effectiveStatus) {
	if (effectiveStatus === "pending") return "warning";
	if (effectiveStatus === "redeemed") return "success";
	return "neutral";
}

export function InvitesPanel() {
	var app = useApp();
	var state = useInvites();
	var [copiedCode, setCopiedCode] = useState(null);

	function handleCopy(code) {
		navigator.clipboard.writeText(window.buildInviteLink(code));
		setCopiedCode(code);
		setTimeout(function () {
			setCopiedCode(null);
		}, 2000);
	}

	return (
		<Card>
			<h2 className={styles.heading}>Invites</h2>
			<p className={styles.hint}>
				Generate a link to invite someone new as a {app.groupTerms.slaveLabel} in this group.
			</p>
			<Button onClick={state.generateInvite}>Generate Invite Link</Button>

			{state.status === "loading" ? <LoadingSpinner label="Loading invites..." /> : null}
			{state.status === "error" ? (
				<ErrorState
					message={"Couldn't load invites: " + (state.error ? state.error.message : "unknown error")}
					onRetry={state.reload}
				/>
			) : null}
			{state.status === "ready" && state.invites.length === 0 ? (
				<EmptyState title="No invites generated yet" />
			) : null}

			{state.status === "ready" && state.invites.length > 0
				? state.invites.map(function (invite) {
						var isExpired =
							invite.status === "pending" &&
							invite.expires_at &&
							new Date(invite.expires_at) < new Date();
						var effectiveStatus = isExpired ? "expired" : invite.status;
						var canAct = invite.status === "pending" && !isExpired;

						return (
							<div key={invite.id} className={styles.row}>
								<div>
									<Badge tone={inviteBadgeTone(effectiveStatus)}>
										{effectiveStatus.charAt(0).toUpperCase() + effectiveStatus.slice(1)}
									</Badge>{" "}
									<code>{invite.code}</code>
									{invite.redeemed_by ? (
										<span className={styles.hint}> &middot; redeemed by {invite.redeemed_by}</span>
									) : null}
								</div>
								{canAct ? (
									<div className={styles.actions}>
										<Button variant="secondary" onClick={function () { handleCopy(invite.code); }}>
											{copiedCode === invite.code ? "Copied!" : "Copy Link"}
										</Button>
										<Button
											variant="danger"
											onClick={function () {
												state.revokeInvite(invite.code);
											}}
										>
											Revoke
										</Button>
									</div>
								) : null}
							</div>
						);
				  })
				: null}
		</Card>
	);
}
