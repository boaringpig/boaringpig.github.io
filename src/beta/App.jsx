// App.jsx
//
// Top-level layout. Tab switching is a single useState - no router library.
// For an app this size (a handful of tabs, no deep links needed) that's
// simpler to read than configuring a router, which is why we skipped it;
// see src/beta/README.md's "Why no router" note if you want to add one later.
import { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Header } from "./components/layout/Header";
import { NavTabs } from "./components/layout/NavTabs";
import { TasksPage } from "./components/tasks/TasksPage";
import { CalendarPage } from "./components/calendar/CalendarPage";
import { DashboardPage } from "./components/dashboard/DashboardPage";
import { SuggestionsPage } from "./components/suggestions/SuggestionsPage";
import { ShopPage } from "./components/rewards/ShopPage";
import { AdminPage } from "./components/admin/AdminPage";
import { MastersPage } from "./components/admin/MastersPage";
import { ChatPage } from "./components/chat/ChatPage";
import { LiveTrackerBanner } from "./components/costTrackers/LiveTrackerBanner";
import { MotdBanner } from "./components/motd/MotdBanner";
import "./styles/tokens.css";
import "./styles/global.css";

function PageSwitch({ activeTab }) {
	var app = useApp();
	switch (activeTab) {
		case "tasks":
			return <TasksPage />;
		case "calendar":
			return <CalendarPage />;
		case "dashboard":
			return app.isMaster ? <DashboardPage /> : null;
		case "suggest":
			return <SuggestionsPage />;
		case "shop":
			return <ShopPage />;
		case "chat":
			return <ChatPage />;
		case "admin":
			return app.isMaster ? <AdminPage /> : null;
		case "masters":
			return app.isAdmin ? <MastersPage /> : null;
		default:
			return null;
	}
}

function AppShell() {
	var app = useApp();
	var [activeTab, setActiveTab] = useState("tasks");

	var themeStyle = {
		"--color-bg": app.theme.bg,
		"--color-card": app.theme.card,
		"--color-elevated": app.theme.elevated,
		"--color-text-primary": app.theme.textPrimary,
		"--color-text-secondary": app.theme.textSecondary,
	};

	return (
		<div className="betaApp" style={themeStyle}>
			<Header />
			<NavTabs activeTab={activeTab} onChange={setActiveTab} />
			<main className="betaContainer">
				<MotdBanner />
				<PageSwitch activeTab={activeTab} />
			</main>
			<LiveTrackerBanner />
		</div>
	);
}

export function App() {
	return (
		<AppProvider>
			<AppShell />
		</AppProvider>
	);
}
