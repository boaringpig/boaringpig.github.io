// NavTabs.jsx - the tab bar. Which tabs show up depends on role, mirroring
// the classic app's js/ui.js#showMainApp visibility rules.
import { useApp } from "../../context/AppContext";
import styles from "./NavTabs.module.css";

export function NavTabs({ activeTab, onChange }) {
	var app = useApp();

	var tabs = [
		{ key: "tasks", label: "Tasks" },
		{ key: "chat", label: "Chat" },
		{ key: "calendar", label: "Calendar" },
	];

	if (app.isMaster) {
		tabs.push({ key: "dashboard", label: "Dashboard" });
	}
	if (app.isSlave) {
		tabs.push({ key: "suggest", label: "Suggest Task" });
	} else {
		tabs.push({ key: "suggest", label: "Suggestions" });
	}
	tabs.push({ key: "shop", label: "Rewards Shop" });
	if (app.isMaster) {
		tabs.push({ key: "admin", label: "Admin Settings" });
	}
	if (app.isAdmin) {
		tabs.push({ key: "masters", label: "Masters" });
	}

	return (
		<nav className={styles.nav} aria-label="Main">
			{tabs.map(function (tab) {
				var isActive = tab.key === activeTab;
				return (
					<button
						key={tab.key}
						className={isActive ? styles.tabActive : styles.tab}
						aria-current={isActive ? "page" : undefined}
						onClick={function () {
							onChange(tab.key);
						}}
					>
						{tab.label}
					</button>
				);
			})}
		</nav>
	);
}
