// MotdBanner.jsx - slave-facing, always-visible (any tab) Message of the Day
// banner. Mounted inside Header.jsx (as a full-width row under the title/
// controls) so it's part of the top bar itself, not a separate block
// pushed down into the page content below the nav tabs.
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
