// ui.calendar.js
// This file contains the UI rendering function for the calendar.

/**
 * Renders the calendar view using FullCalendar.
 */
window.renderCalendar = function () {
	var calendarEl = document.getElementById("fullcalendar");
	if (!calendarEl) return;
	if (window.fullCalendarInstance) {
		window.fullCalendarInstance.destroy();
	}

	var calendarEvents = [];
	if (window.tasks && Array.isArray(window.tasks)) {
		calendarEvents = window.tasks
			.filter(function (task) {
				return (
					task &&
					task.assignedTo === window.currentUser &&
					task.dueDate
				);
			})
			.map(function (task) {
				if (task.isRepeating && task.repeatInterval && task.dueDate) {
					if (typeof RRule !== "undefined") {
						var rruleFreq;
						switch (task.repeatInterval) {
							case "daily":
								rruleFreq = RRule.DAILY;
								break;
							case "weekly":
								rruleFreq = RRule.WEEKLY;
								break;
							case "monthly":
								rruleFreq = RRule.MONTHLY;
								break;
							default:
								rruleFreq = RRule.DAILY;
						}
						return {
							id: task.id,
							title: task.text + " (Repeating)",
							rrule: {
								freq: rruleFreq,
								dtstart: task.dueDate,
							},
							duration: "01:00",
							description: task.text,
							classNames: ["fc-event-repeating"],
							extendedProps: {
								originalTask: task,
							},
						};
					} else {
						// Fallback if RRule is not defined, though it should be
						return {
							id: task.id,
							title: task.text + " (Repeating)",
							start: task.dueDate,
							allDay: !task.dueDate || task.dueDate.length === 10,
							description: task.text,
							classNames: ["fc-event-repeating"],
							extendedProps: {
								originalTask: task,
							},
						};
					}
				} else {
					return {
						id: task.id,
						title: task.text,
						start: task.dueDate,
						end: task.endDateTime || null,
						allDay: !task.dueDate || task.dueDate.length === 10,
						description: task.text,
						classNames: ["fc-event-normal"],
						extendedProps: {
							originalTask: task,
						},
					};
				}
			});
	}

	var calendarConfig = {
		initialView: "dayGridMonth",
		headerToolbar: {
			left: "prev,next today",
			center: "title",
			right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
		},
		height: "auto",
		contentHeight: "auto",
		aspectRatio: 1.8,
		events: calendarEvents,
		eventClick: function (info) {
			var task = info.event.extendedProps.originalTask;
			var start = task.dueDate ? window.formatDate(task.dueDate) : "N/A";
			var end = task.endDateTime
				? window.formatDate(task.endDateTime)
				: "N/A";
			var allDay =
				task.dueDate && task.dueDate.length === 10 ? "Yes" : "No";
			var description = task.text || "No description available.";
			var eventType = task.isRepeating
				? "Repeating Task"
				: "One-time Task";
			var statusText = window.getStatusText(
				task.status,
				window.isTaskOverdue(task),
				task.type,
				task.appealStatus
			);

			var modalHtml =
				'<h3 class="">' +
				window.escapeHtml(task.text) +
				"</h3>" +
				'<p class=""><strong>Type:</strong> ' +
				eventType +
				"</p>" +
				'<p class=""><strong>Status:</strong> ' +
				statusText +
				"</p>" +
				'<p class=""><strong>Start:</strong> ' +
				start +
				"</p>" +
				(task.endDateTime
					? '<p class=""><strong>End:</strong> ' + end + "</p>"
					: "") +
				'<p class=""><strong>All Day:</strong> ' +
				allDay +
				"</p>" +
				'<p class=""><strong>Description:</strong> ' +
				window.escapeHtml(description) +
				"</p>" +
				(task.points
					? '<p class=""><strong>Points:</strong> ' +
					  task.points +
					  "</p>"
					: "") +
				(task.penaltyPoints
					? '<p class=""><strong>Penalty:</strong> ' +
					  task.penaltyPoints +
					  "</p>"
					: "") +
				(task.createdBy
					? '<p class=""><strong>Created By:</strong> ' +
					  (window.users[task.createdBy]
							? window.users[task.createdBy].displayName
							: task.createdBy) +
					  "</p>"
					: "") +
				(task.completedBy
					? '<p class=""><strong>Completed By:</strong> ' +
					  (window.users[task.completedBy]
							? window.users[task.completedBy].displayName
							: task.completedBy) +
					  "</p>"
					: "") +
				(task.approvedBy
					? '<p class=""><strong>Approved By:</strong> ' +
					  (window.users[task.approvedBy]
							? window.users[task.approvedBy].displayName
							: task.approvedBy) +
					  "</p>"
					: "") +
				(task.appealText
					? '<p class=""><strong>Appeal Reason:</strong> ' +
					  window.escapeHtml(task.appealText) +
					  "</p>"
					: "");

			window.showModal(modalHtml);
		},
	};

	try {
		window.fullCalendarInstance = new FullCalendar.Calendar(
			calendarEl,
			calendarConfig
		);
		window.fullCalendarInstance.render();
	} catch (error) {
		console.error("Error initializing FullCalendar:", error);
		var fallbackHtml =
			'<div style="padding: 20px; text-align: center; color: #666;">' +
			"<h3>Calendar Loading...</h3>" +
			"<p>There was an issue loading the calendar. Please refresh the page.</p>" +
			'<div style="margin-top: 20px;">' +
			"<strong>Tasks with due dates:</strong><br>";
		if (calendarEvents.length > 0) {
			fallbackHtml += calendarEvents
				.map(function (event) {
					return (
						"• " + event.title + " - " + (event.start || "No date")
					);
				})
				.join("<br>");
		} else {
			fallbackHtml += "No tasks scheduled";
		}
		fallbackHtml += "</div></div>";
		calendarEl.innerHTML = fallbackHtml;
	}
};
