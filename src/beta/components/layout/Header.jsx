// Header.jsx - top bar: group name, group switcher (only shown for a slave
// shared across more than one master's group), points, exit-beta, logout.
import { useApp } from "../../context/AppContext";
import { Button } from "../common/Button";
import styles from "./Header.module.css";

export function Header() {
	var app = useApp();
	var user = window.users[app.currentUser] || {};

	function handleExitBeta() {
		app.exitBeta();
	}

	function handleLogout() {
		// Hide the beta root first, then run the classic logout (which
		// unsubscribes realtime channels and shows the login screen).
		app.exitBeta();
		window.logout();
	}

	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<h1 className={styles.title}>{app.groupTerms.groupLabel}</h1>
				<p className={styles.subtitle}>Beta dashboard</p>
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
				{!app.isMaster ? (
					<span className={styles.points}>{user.points || 0} points</span>
				) : null}
				<Button variant="secondary" onClick={handleExitBeta}>
					Exit beta
				</Button>
				<Button variant="secondary" onClick={handleLogout}>
					Logout
				</Button>
			</div>
		</header>
	);
}
