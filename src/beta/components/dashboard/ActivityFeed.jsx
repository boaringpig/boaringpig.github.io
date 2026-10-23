// ActivityFeed.jsx - recent activity across the whole group (tasks,
// suggestions, rewards, cost trackers, logins/logouts, ...). Defaults to
// just today's events (a long full history was unreadable), with type/user
// filters narrowing further within the selected day, and a day-by-day
// pager (ActivityDayNav) at the bottom to step to any other day that has
// activity logged on it.
import { useMemo, useState } from "react";
import { EmptyState } from "../common/EmptyState";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import { ActivityDayNav, dateKey, todayKey } from "./ActivityDayNav";
import styles from "./ActivityFeed.module.css";

var CATEGORIES = [
	{ value: "login", label: "Login" },
	{ value: "logout", label: "Logout" },
	{ value: "tasks", label: "Tasks" },
	{ value: "suggestions", label: "Suggestions" },
	{ value: "rewards", label: "Rewards & Shop" },
	{ value: "cost_trackers", label: "Cost Trackers" },
	{ value: "other", label: "Other" },
];

function categorize(action) {
	if (action === "login") return "login";
	if (action === "logout") return "logout";
	if (/suggestion/i.test(action)) return "suggestions";
	if (/reward|purchase/i.test(action)) return "rewards";
	if (/cost tracker/i.test(action)) return "cost_trackers";
	if (/task|demerit|appeal|invoice/i.test(action)) return "tasks";
	return "other";
}

export function ActivityFeed({ activity, status, error, onRetry }) {
	var [userFilter, setUserFilter] = useState("");
	var [categoryFilter, setCategoryFilter] = useState("");
	var [selectedDate, setSelectedDate] = useState(todayKey);

	var userOptions = useMemo(
		function () {
			var seen = {};
			var options = [];
			activity.forEach(function (a) {
				if (seen[a.user]) return;
				seen[a.user] = true;
				var user = window.users[a.user];
				options.push({ value: a.user, label: user ? user.displayName : a.user });
			});
			options.sort(function (a, b) {
				return a.label.localeCompare(b.label);
			});
			return options;
		},
		[activity]
	);

	var activityDays = useMemo(
		function () {
			var days = new Set();
			activity.forEach(function (a) {
				days.add(dateKey(new Date(a.timestamp)));
			});
			return days;
		},
		[activity]
	);

	var dayActivity = useMemo(
		function () {
			return activity.filter(function (a) {
				return dateKey(new Date(a.timestamp)) === selectedDate;
			});
		},
		[activity, selectedDate]
	);

	var filtered = useMemo(
		function () {
			return dayActivity.filter(function (a) {
				if (userFilter && a.user !== userFilter) return false;
				if (categoryFilter && categorize(a.action) !== categoryFilter) return false;
				return true;
			});
		},
		[dayActivity, userFilter, categoryFilter]
	);

	if (status === "loading") return <LoadingSpinner label="Loading activity..." />;
	if (status === "error") {
		return <ErrorState message={error ? error.message : ""} onRetry={onRetry} />;
	}

	return (
		<div>
			<div className={styles.filters}>
				<select
					className={styles.filterSelect}
					value={userFilter}
					onChange={function (e) { setUserFilter(e.target.value); }}
				>
					<option value="">All users</option>
					{userOptions.map(function (opt) {
						return (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						);
					})}
				</select>
				<select
					className={styles.filterSelect}
					value={categoryFilter}
					onChange={function (e) { setCategoryFilter(e.target.value); }}
				>
					<option value="">All activity</option>
					{CATEGORIES.map(function (cat) {
						return (
							<option key={cat.value} value={cat.value}>
								{cat.label}
							</option>
						);
					})}
				</select>
			</div>
			{activity.length === 0 ? (
				<EmptyState title="No recent activity" />
			) : dayActivity.length === 0 ? (
				<EmptyState
					title={
						selectedDate === todayKey()
							? "No activity yet today"
							: "No activity on this day"
					}
				/>
			) : filtered.length === 0 ? (
				<EmptyState title="No activity matches those filters" />
			) : (
				<ul className={styles.list}>
					{filtered.map(function (a, i) {
						var user = window.users[a.user];
						return (
							<li key={i} className={styles.item}>
								<span className={styles.user}>{user ? user.displayName : a.user}</span>{" "}
								<span className={styles.action}>{a.action.replace(/_/g, " ")}</span>
								{a.details ? <span className={styles.details}> &mdash; {a.details}</span> : null}
								<span className={styles.time}>{window.formatDate(a.timestamp)}</span>
							</li>
						);
					})}
				</ul>
			)}

			<ActivityDayNav
				selectedDate={selectedDate}
				onSelectDate={setSelectedDate}
				activityDays={activityDays}
			/>
		</div>
	);
}
