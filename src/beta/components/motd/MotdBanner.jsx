// MotdBanner.jsx - slave-facing, always-visible (any tab) Message of the Day
// banner, mirroring the classic app's #motdBanner placement under the nav
// tabs. Mounted once near the top of App.jsx's shell, next to LiveTrackerBanner.
import { useApp } from "../../context/AppContext";
import { useMotd } from "../../hooks/useMotd";
import styles from "./MotdBanner.module.css";

export function MotdBanner() {
	var app = useApp();
	var motd = useMotd();

	if (!app.isSlave || !motd.currentMessage) return null;

	return (
		<div className={styles.banner}>
			<span aria-hidden="true">📣</span> {motd.currentMessage.body}
		</div>
	);
}
