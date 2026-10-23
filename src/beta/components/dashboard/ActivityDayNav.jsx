// ActivityDayNav.jsx - the day-by-day navigation bar above the dashboard's
// Activity Feed: previous/next day buttons either side of a calendar-picker
// button in the middle. The calendar popover only lets you pick a day that
// actually has activity logged on it (greyed out/disabled otherwise) -
// stepping with prev/next day is still free to land on an empty day, so you
// can tell "nothing happened" from "can't get there".
import { useEffect, useRef, useState } from "react";
import { Button } from "../common/Button";
import styles from "./ActivityDayNav.module.css";

var WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function pad2(n) {
	return n < 10 ? "0" + n : "" + n;
}

export function dateKey(d) {
	return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
}

export function todayKey() {
	return dateKey(new Date());
}

export function shiftDateKey(key, deltaDays) {
	var parts = key.split("-").map(Number);
	var d = new Date(parts[0], parts[1] - 1, parts[2]);
	d.setDate(d.getDate() + deltaDays);
	return dateKey(d);
}

function formatHeading(key) {
	var parts = key.split("-").map(Number);
	var d = new Date(parts[0], parts[1] - 1, parts[2]);
	var isToday = key === todayKey();
	var label = d.toLocaleDateString(undefined, {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: d.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
	});
	return isToday ? "Today — " + label : label;
}

export function ActivityDayNav({ selectedDate, onSelectDate, activityDays }) {
	var [open, setOpen] = useState(false);
	var [viewYear, setViewYear] = useState(0);
	var [viewMonth, setViewMonth] = useState(0);
	var containerRef = useRef(null);

	useEffect(
		function () {
			var parts = selectedDate.split("-").map(Number);
			setViewYear(parts[0]);
			setViewMonth(parts[1] - 1);
		},
		[open] // eslint-disable-line react-hooks/exhaustive-deps -- re-sync the visible month only when the popover is (re)opened, not on every keystroke-free selectedDate change
	);

	useEffect(
		function () {
			if (!open) return undefined;
			function handleOutside(e) {
				if (containerRef.current && !containerRef.current.contains(e.target)) {
					setOpen(false);
				}
			}
			document.addEventListener("mousedown", handleOutside);
			return function () {
				document.removeEventListener("mousedown", handleOutside);
			};
		},
		[open]
	);

	function changeMonth(delta) {
		var d = new Date(viewYear, viewMonth + delta, 1);
		setViewYear(d.getFullYear());
		setViewMonth(d.getMonth());
	}

	function buildGrid() {
		var firstOfMonth = new Date(viewYear, viewMonth, 1);
		var startWeekday = firstOfMonth.getDay();
		var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
		var cells = [];
		for (var i = 0; i < startWeekday; i++) cells.push(null);
		for (var day = 1; day <= daysInMonth; day++) cells.push(day);
		return cells;
	}

	var cells = buildGrid();

	return (
		<div className={styles.nav}>
			<Button
				variant="secondary"
				onClick={function () { onSelectDate(shiftDateKey(selectedDate, -1)); }}
			>
				&lsaquo; Previous day
			</Button>

			<div className={styles.pickerWrap} ref={containerRef}>
				<button
					type="button"
					className={styles.pickerBtn}
					onClick={function () { setOpen(function (v) { return !v; }); }}
				>
					📅 {formatHeading(selectedDate)}
				</button>

				{open ? (
					<div className={styles.popover}>
						<div className={styles.popoverHeader}>
							<button
								type="button"
								className={styles.monthNavBtn}
								onClick={function () { changeMonth(-1); }}
								aria-label="Previous month"
							>
								&lsaquo;
							</button>
							<span>
								{new Date(viewYear, viewMonth, 1).toLocaleDateString(undefined, {
									month: "long",
									year: "numeric",
								})}
							</span>
							<button
								type="button"
								className={styles.monthNavBtn}
								onClick={function () { changeMonth(1); }}
								aria-label="Next month"
							>
								&rsaquo;
							</button>
						</div>
						<div className={styles.weekdayRow}>
							{WEEKDAY_LABELS.map(function (w) {
								return <span key={w}>{w}</span>;
							})}
						</div>
						<div className={styles.grid}>
							{cells.map(function (day, i) {
								if (day === null) return <span key={i} className={styles.cellEmpty} />;
								var key = viewYear + "-" + pad2(viewMonth + 1) + "-" + pad2(day);
								var hasActivity = activityDays.has(key);
								var isSelected = key === selectedDate;
								var isToday = key === todayKey();
								var classes = [styles.cell];
								if (hasActivity) classes.push(styles.cellHasActivity);
								if (isSelected) classes.push(styles.cellSelected);
								if (isToday) classes.push(styles.cellToday);
								return (
									<button
										key={i}
										type="button"
										className={classes.join(" ")}
										disabled={!hasActivity}
										title={hasActivity ? "Activity logged on this day" : "No activity on this day"}
										onClick={function () {
											onSelectDate(key);
											setOpen(false);
										}}
									>
										{day}
									</button>
								);
							})}
						</div>
					</div>
				) : null}
			</div>

			<Button
				variant="secondary"
				onClick={function () { onSelectDate(shiftDateKey(selectedDate, 1)); }}
			>
				Next day &rsaquo;
			</Button>
		</div>
	);
}
