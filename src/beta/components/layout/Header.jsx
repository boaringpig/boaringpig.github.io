// Header.jsx - top bar: group name, group switcher (only shown for a slave
// shared across more than one master's group), status message editor,
// points, logout.
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";
import { TextInput } from "../common/TextInput";
import { LiveTrackerPill } from "../costTrackers/LiveTrackerPill";
import styles from "./Header.module.css";

export function Header() {
	var app = useApp();
	var user = window.users[app.currentUser] || {};
	var [editingStatus, setEditingStatus] = useState(false);
	var [statusDraft, setStatusDraft] = useState(app.statusMessage);
	var [savingStatus, setSavingStatus] = useState(false);

	function toggleThemeMode() {
		app.setThemeMode(app.themeMode === "light" ? "dark" : "light");
	}

	function handleLogout() {
		// window.logout() (js/core/auth.js) unsubscribes realtime channels,
		// tears down the React tree via window.exitBetaMode(), and shows the
		// login screen again.
		window.logout();
	}

	function openStatusEditor() {
		setStatusDraft(app.statusMessage);
		setEditingStatus(true);
	}

	async function handleSaveStatus(e) {
		e.preventDefault();
		setSavingStatus(true);
		try {
			await window.updateMyStatusMessage(statusDraft);
			app.refresh();
			setEditingStatus(false);
		} finally {
			setSavingStatus(false);
		}
	}

	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<h1 className={styles.title}>{app.groupTerms.groupLabel}</h1>
				<p className={styles.subtitle}>{app.groupTerms.appSubtitle}</p>
			</div>
			<div className={styles.right}>
				{app.myMasterOptions.length > 1 ? (
					<select
						className={styles.groupSelect}
						value={app.activeMasterContext}
						onChange={function (e) {
							app.switchGroup(e.target.value);
						}}
						aria-label="Switch group"
					>
						{app.myMasterOptions.map(function (masterUsername) {
							var master = window.users[masterUsername];
							return (
								<option key={masterUsername} value={masterUsername}>
									{master ? master.displayName : masterUsername}
								</option>
							);
						})}
					</select>
				) : null}
				<span className={styles.userBadge}>{app.displayName}</span>
				<LiveTrackerPill />
				<Button variant="secondary" onClick={openStatusEditor}>
					✏️ Status
				</Button>
				<Button variant="secondary" onClick={toggleThemeMode}>
					{app.themeMode === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
				</Button>
				{!app.isMaster ? (
					<span className={styles.points}>{user.points || 0} points</span>
				) : null}
				<Button variant="secondary" onClick={handleLogout}>
					Logout
				</Button>
			</div>

			{editingStatus ? (
				<Modal title="Set Status Message" onClose={function () { setEditingStatus(false); }}>
					<form onSubmit={handleSaveStatus}>
						<TextInput
							label="Status message"
							value={statusDraft}
							onChange={function (e) {
								setStatusDraft(e.target.value);
							}}
							placeholder="e.g. 🐷 feeling good today"
							maxLength={100}
							autoFocus
						/>
						<Button type="submit" loading={savingStatus}>
							Save
						</Button>
					</form>
				</Modal>
			) : null}
		</header>
	);
}
