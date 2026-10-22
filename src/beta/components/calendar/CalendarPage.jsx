// CalendarPage.jsx - a real FullCalendar month/week/day/list grid, ported
// from js/calendar/ui-calendar.js's renderCalendar. FullCalendar + RRule are
// loaded once as global <script> tags in index.html (shared with no one
// else now that classic is retired) rather than pulled in as an npm
// dependency - this keeps the beta bundle dependency-light the same way the
// spiral canvas math was hand-ported instead of adding a canvas library.
import { useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "../../context/AppContext";
import { useTasks } from "../../hooks/useTasks";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorState } from "../common/ErrorState";
import { Modal } from "../common/Modal";
import { taskStatusLabel } from "../../utils/taskStatus";
import styles from "./CalendarPage.module.css";

function buildEvents(tasks) {
	// The rrule CDN script (loaded as a plain <script>, not a module) names
	// its UMD global "rrule" (lowercase), with the RRule class as a property
	// on it -- not a bare "RRule" global. Classic's own ui-calendar.js checks
	// `typeof RRule !== "undefined"`, which is always false for this exact
	// reason, so classic's "repeating" tasks have never actually recurred on
	// the calendar (they just show once, titled "(Repeating)"). Fixed here
	// rather than carried forward, since the whole point of this port is a
	// real recurring-event grid.
	var RRule = typeof window.rrule !== "undefined" ? window.rrule.RRule : undefined;
	return tasks.map(function (task) {
		if (task.isRepeating && task.repeatInterval && task.dueDate && RRule) {
			var freqMap = {
				daily: RRule.DAILY,
				weekly: RRule.WEEKLY,
				monthly: RRule.MONTHLY,
			};
			return {
				id: String(task.id),
				title: task.text + " (Repeating)",
				rrule: {
					freq: freqMap[task.repeatInterval] || RRule.DAILY,
					dtstart: task.dueDate,
				},
				duration: "01:00",
				classNames: ["fc-event-repeating"],
				extendedProps: { originalTask: task },
			};
		}
		return {
			id: String(task.id),
			title: task.text,
			start: task.dueDate,
			end: task.endDateTime || null,
			allDay: !task.dueDate || task.dueDate.length === 10,
			classNames: ["fc-event-normal"],
			extendedProps: { originalTask: task },
		};
	});
}

function TaskDetail({ task }) {
	var start = task.dueDate ? window.formatDate(task.dueDate) : "N/A";
	var end = task.endDateTime ? window.formatDate(task.endDateTime) : null;
	var allDay = task.dueDate && task.dueDate.length === 10;
	var createdBy = task.createdBy && window.users[task.createdBy] ? window.users[task.createdBy].displayName : task.createdBy;
	var completedBy = task.completedBy && window.users[task.completedBy] ? window.users[task.completedBy].displayName : task.completedBy;
	var approvedBy = task.approvedBy && window.users[task.approvedBy] ? window.users[task.approvedBy].displayName : task.approvedBy;

	return (
		<div className={styles.detail}>
			<p className={styles.detailRow}><strong>Type:</strong> {task.isRepeating ? "Repeating Task" : "One-time Task"}</p>
			<p className={styles.detailRow}><strong>Status:</strong> {taskStatusLabel(task)}</p>
			<p className={styles.detailRow}><strong>Start:</strong> {start}</p>
			{end ? <p className={styles.detailRow}><strong>End:</strong> {end}</p> : null}
			<p className={styles.detailRow}><strong>All Day:</strong> {allDay ? "Yes" : "No"}</p>
			<p className={styles.detailRow}><strong>Description:</strong> {task.text || "No description available."}</p>
			{task.points ? <p className={styles.detailRow}><strong>Points:</strong> {task.points}</p> : null}
			{task.penaltyPoints ? <p className={styles.detailRow}><strong>Penalty:</strong> {task.penaltyPoints}</p> : null}
			{task.createdBy ? <p className={styles.detailRow}><strong>Created By:</strong> {createdBy}</p> : null}
			{task.completedBy ? <p className={styles.detailRow}><strong>Completed By:</strong> {completedBy}</p> : null}
			{task.approvedBy ? <p className={styles.detailRow}><strong>Approved By:</strong> {approvedBy}</p> : null}
			{task.appealText ? <p className={styles.detailRow}><strong>Appeal Reason:</strong> {task.appealText}</p> : null}
		</div>
	);
}

export function CalendarPage() {
	var app = useApp();
	var state = useTasks();
	var containerRef = useRef(null);
	var calendarRef = useRef(null);
	var [selectedTask, setSelectedTask] = useState(null);

	var relevant = useMemo(
		function () {
			return state.tasks.filter(function (task) {
				if (!task || !task.dueDate) return false;
				if (!app.isSlave) return true;
				return task.assignedTo === app.currentUser || (window.mySharedTaskIds || []).includes(task.id);
			});
		},
		[state.tasks, app.isSlave, app.currentUser]
	);

	var events = useMemo(function () { return buildEvents(relevant); }, [relevant]);

	// Build the calendar once; re-rendering on every task update would
	// discard whatever month/view the user is currently looking at.
	useEffect(
		function () {
			if (!containerRef.current || typeof window.FullCalendar === "undefined") return undefined;
			var calendar = new window.FullCalendar.Calendar(containerRef.current, {
				initialView: "dayGridMonth",
				headerToolbar: {
					left: "prev,next today",
					center: "title",
					right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
				},
				height: "auto",
				contentHeight: "auto",
				aspectRatio: 1.8,
				eventClick: function (info) {
					setSelectedTask(info.event.extendedProps.originalTask);
				},
			});
			calendar.render();
			calendarRef.current = calendar;
			return function () {
				calendar.destroy();
				calendarRef.current = null;
			};
		},
		[]
	);

	useEffect(
		function () {
			var calendar = calendarRef.current;
			if (!calendar) return;
			calendar.removeAllEventSources();
			calendar.addEventSource(events);
		},
		[events]
	);

	// The grid container is rendered unconditionally (not behind an early
	// loading/error return) so containerRef is already attached to the DOM
	// the first time the calendar-construction effect below runs -- an early
	// return here would mean the container never exists on that first
	// commit, and since that effect only runs once (empty deps), the
	// calendar would never get created at all.
	return (
		<div>
			{state.status === "loading" ? <LoadingSpinner label="Loading tasks..." /> : null}
			{state.status === "error" ? (
				<ErrorState message={state.error ? state.error.message : ""} onRetry={state.reload} />
			) : null}
			<div ref={containerRef} className={styles.calendarContainer} />
			{selectedTask ? (
				<Modal title={selectedTask.text} onClose={function () { setSelectedTask(null); }}>
					<TaskDetail task={selectedTask} />
				</Modal>
			) : null}
		</div>
	);
}
