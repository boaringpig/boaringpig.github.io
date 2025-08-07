// database.tasks.js
// This file contains all the database-related functions for tasks.

/**
 * Fetches all tasks from Supabase.
 */
window.fetchTasksInitial = async function () {
	const { data, error } = await window.supabase.from("tasks").select("*");
	if (error) {
		console.error("Error fetching tasks:", error);
		window.showError("Failed to load tasks.");
	} else {
		window.tasks = data.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);
		window.renderTasks();
		window.updateStats();
		if (window.activeTab === "calendar" && window.fullCalendarInstance) {
			window.fullCalendarInstance.refetchEvents();
		} else if (window.activeTab === "calendar") {
			window.renderCalendar();
		}
	}
};

/**
 * Creates a new task (regular or demerit) and saves it to Supabase.
 */
window.createTask = async function () {
	if (!window.hasPermission("create_task")) {
		window.showNotification(
			"You do not have permission to create tasks",
			"error"
		);
		return;
	}

	const taskInput = document.getElementById("taskInput");
	const taskText = taskInput.value.trim();
	const isDemerit = document.getElementById("isDemerit")
		? document.getElementById("isDemerit").checked
		: false;

	if (taskText === "") {
		window.showNotification("Please enter a task description", "error");
		return;
	}

	let task;

	try {
		if (isDemerit) {
			const penaltyPoints =
				parseInt(document.getElementById("penaltyPoints").value) || 5;

			task = {
				text: taskText,
				status: "demerit_issued",
				type: "demerit",
				createdAt: new Date().toISOString(),
				createdBy: window.currentUser,
				assignedTo: "schinken",
				points: 0,
				penaltyPoints: penaltyPoints,
				dueDate: null,
				isRepeating: false,
				repeatInterval: null,
				completedAt: null,
				completedBy: null,
				approvedAt: null,
				approvedBy: null,
				isOverdue: false,
				appealStatus: null,
				appealedAt: null,
				appealReviewedAt: null,
				appealReviewedBy: null,
				acceptedAt: null,
				appealText: null,
				// Add the new fields here, setting them to null for tasks not from a suggestion
				originalSuggestionId: null,
				originalSuggestedBy: null,
			};
			await window.updateUserPoints(
				"schinken",
				penaltyPoints,
				"subtract"
			);
		} else {
			const points =
				parseInt(document.getElementById("taskPoints").value) || 10;
			const penaltyPoints =
				parseInt(document.getElementById("penaltyPoints").value) || 5;

			// Use the new Flatpickr-compatible input
			const dueDate = document.getElementById("taskDueDate").value;

			const isRepeating = document.getElementById("isRepeating")
				? document.getElementById("isRepeating").checked
				: false;
			const repeatInterval = document.getElementById("repeatInterval")
				? document.getElementById("repeatInterval").value
				: null;

			// More robust date validation for the new date picker
			if (dueDate) {
				const selectedDate = new Date(dueDate);
				const now = new Date();

				// Check if the date is valid
				if (isNaN(selectedDate.getTime())) {
					window.showNotification("Invalid due date format", "error");
					return;
				}

				// Check if the date is in the past
				if (selectedDate < now) {
					window.showNotification(
						"Due date cannot be in the past",
						"error"
					);
					return;
				}
			}

			task = {
				text: taskText,
				status: "todo",
				type: "regular",
				createdAt: new Date().toISOString(),
				createdBy: window.currentUser,
				assignedTo: "schinken",
				points: points,
				penaltyPoints: penaltyPoints,
				dueDate: dueDate || null,
				isRepeating: isRepeating,
				repeatInterval: isRepeating ? repeatInterval : null,
				completedAt: null,
				completedBy: null,
				approvedAt: null,
				approvedBy: null,
				isOverdue: false,
				// Add the new fields here, setting them to null for tasks not from a suggestion
				originalSuggestionId: null,
				originalSuggestedBy: null,
			};
		}

		const { error: taskError } = await window.supabase
			.from("tasks")
			.insert([task]);
		if (taskError) {
			console.error("Error creating task:", taskError);
			window.showNotification(
				"Failed to create task. Please try again.",
				"error"
			);
		} else {
			taskInput.value = "";
			const taskPointsEl = document.getElementById("taskPoints");
			const penaltyPointsEl = document.getElementById("penaltyPoints");
			const taskDueDateEl = document.getElementById("taskDueDate");
			const isRepeatingEl = document.getElementById("isRepeating");
			const isDemeritEl = document.getElementById("isDemerit");
			const demeritWarningEl = document.getElementById("demeritWarning");
			const repeatOptionsEl = document.getElementById("repeatOptions");

			if (taskPointsEl) {
				taskPointsEl.value = "10";
				taskPointsEl.closest(".form-group").style.display = "block";
			}
			if (penaltyPointsEl) penaltyPointsEl.value = "5";
			if (taskDueDateEl) {
				taskDueDateEl.value = "";
				taskDueDateEl.closest(".form-group").style.display = "block";
			}
			if (isRepeatingEl) isRepeatingEl.checked = false;
			if (isDemeritEl) isDemeritEl.checked = false;
			if (demeritWarningEl) demeritWarningEl.style.display = "none";
			if (repeatOptionsEl) repeatOptionsEl.style.display = "none";

			if (isDemerit) {
				window.showNotification(
					`Demerit task issued to user. ${task.penaltyPoints} points deducted.`,
					"warning"
				);
			} else {
				window.showNotification("Task created successfully!");
			}
			await window.fetchTasksInitial();
		}
	} catch (e) {
		console.error("An unexpected error occurred during task creation:", e);
		window.showNotification(
			"An unexpected error occurred. Check console for details.",
			"error"
		);
	}
};

/**
 * Marks a task as complete and sets its status to 'pending_approval'.
 * @param {number} taskId - The ID of the task to check off.
 */
window.checkOffTask = async function (taskId) {
	if (!window.hasPermission("check_task")) {
		window.showNotification(
			"You do not have permission to check off tasks",
			"error"
		);
		return;
	}
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task) return;
	if (task.type === "demerit") {
		window.showNotification(
			"Demerit tasks cannot be marked as complete.",
			"error"
		);
		return;
	}
	if (task.assignedTo && task.assignedTo !== window.currentUser) {
		window.showNotification("This task is not assigned to you", "error");
		return;
	}
	const updates = {
		status: "pending_approval",
		completedAt: new Date().toISOString(),
		completedBy: window.currentUser,
	};
	const { error } = await window.supabase
		.from("tasks")
		.update(updates)
		.eq("id", taskId);
	if (error) {
		console.error("Error updating task:", error);
		window.showNotification("Failed to update task", "error");
	} else {
		window.showNotification("Task marked as complete! Awaiting approval.");
		await window.fetchTasksInitial();
	}
};

/**
 * Approves a completed task, changing its status to 'completed' and awarding points.
 * For cost-tracker tasks (invoices), no points are awarded.
 * @param {number} taskId - The ID of the task to approve.
 */
window.approveTask = async function (taskId) {
	if (!window.hasPermission("approve_task")) {
		window.showNotification(
			"You do not have permission to approve tasks",
			"error"
		);
		return;
	}
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task) return;

	const updates = {
		status: "completed",
		approvedAt: new Date().toISOString(),
		approvedBy: window.currentUser,
	};

	const { error: taskError } = await window.supabase
		.from("tasks")
		.update(updates)
		.eq("id", taskId);
	if (taskError) {
		console.error("Error approving task:", taskError);
		window.showNotification("Failed to approve task", "error");
		return;
	}

	// Handle different task types
	if (task.type === "cost-tracker") {
		// Cost tracker tasks (invoices) don't award points, just mark as paid
		const totalAmount =
			window.extractTotalFromTaskText(task.text) || "Unknown";
		window.showNotification(
			`Invoice approved and marked as paid! Amount: ${totalAmount}`
		);
	} else {
		// Regular tasks award points
		await window.updateUserPoints(task.completedBy, task.points, "add");
		window.showNotification(
			`Task approved! ${task.points} points awarded to ${
				window.users[task.completedBy]?.displayName
			}`
		);

		// Handle repeating tasks
		if (task.isRepeating && task.dueDate) {
			window.createRepeatingTask(task);
		}
	}

	await window.fetchTasksInitial();
};

/**
 * Rejects a task, setting its status to 'failed' and applying a penalty.
 * For cost-tracker tasks (invoices), this denies payment.
 * @param {number} taskId - The ID of the task to reject.
 */
window.rejectTask = function (taskId) {
	if (!window.hasPermission("approve_task")) {
		window.showNotification(
			"You do not have permission to reject tasks",
			"error"
		);
		return;
	}
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task) return;

	const isInvoice = task.type === "cost-tracker";
	const confirmMessage = isInvoice
		? `Are you sure you want to deny payment for this invoice? This will apply a ${
				task.penaltyPoints
		  } point penalty to ${window.users[task.assignedTo]?.displayName}.`
		: `Are you sure you want to reject this task? This will apply a ${
				task.penaltyPoints
		  } point penalty to ${window.users[task.completedBy]?.displayName}.`;

	window.showConfirmModal(confirmMessage, async (confirmed) => {
		if (!confirmed) {
			return;
		}
		const updates = {
			status: "failed",
			rejectedAt: new Date().toISOString(),
			rejectedBy: window.currentUser,
		};
		const { error: taskError } = await window.supabase
			.from("tasks")
			.update(updates)
			.eq("id", taskId);
		if (taskError) {
			console.error("Error rejecting task:", taskError);
			window.showNotification("Failed to reject task", "error");
			return;
		}

		// Apply penalty points
		const targetUser = isInvoice ? task.assignedTo : task.completedBy;
		await window.updateUserPoints(
			targetUser,
			task.penaltyPoints,
			"subtract"
		);

		const actionText = isInvoice ? "Payment denied" : "Task rejected";
		window.showNotification(
			`${actionText}! ${task.penaltyPoints} penalty points applied to ${window.users[targetUser]?.displayName}`,
			"warning"
		);
		await window.fetchTasksInitial();
	});
};

/**
 * Deletes a task.
 * @param {number} taskId - The ID of the task to delete.
 */
window.deleteTask = function (taskId) {
	if (!window.hasPermission("delete_task")) {
		window.showNotification(
			"You do not have permission to delete tasks",
			"error"
		);
		return;
	}
	window.showConfirmModal(
		"Are you sure you want to delete this task?",
		async (confirmed) => {
			if (!confirmed) {
				return;
			}
			const { error } = await window.supabase
				.from("tasks")
				.delete()
				.eq("id", taskId);
			if (error) {
				console.error("Error deleting task:", error);
				window.showNotification("Failed to delete task", "error");
			} else {
				window.showNotification("Task deleted successfully");
				await window.fetchTasksInitial();
			}
		}
	);
};

/**
 * Allows a user to accept a demerit task.
 * @param {number} taskId - The ID of the demerit task to accept.
 */
window.acceptDemerit = async function (taskId) {
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "demerit") return;
	const updates = {
		acceptedAt: new Date().toISOString(),
		status: "demerit_accepted",
	};
	const { error } = await window.supabase
		.from("tasks")
		.update(updates)
		.eq("id", taskId);
	if (error) {
		console.error("Error accepting demerit:", error);
		window.showNotification("Failed to accept demerit", "error");
	} else {
		window.showNotification(
			"Demerit accepted. You can still appeal if you believe this is unfair."
		);
		await window.fetchTasksInitial();
	}
};

/**
 * Allows a user to appeal a demerit task.
 * @param {number} taskId - The ID of the demerit task to appeal.
 */
window.appealDemerit = function (taskId) {
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "demerit") return;
	if (task.acceptedAt) {
		window.showNotification(
			"This demerit has already been accepted and cannot be appealed.",
			"error"
		);
		return;
	}
	window.showAppealModal(task, async (appealText) => {
		const updates = {
			appealStatus: "pending",
			appealedAt: new Date().toISOString(),
			appealText: appealText,
		};
		const { error } = await window.supabase
			.from("tasks")
			.update(updates)
			.eq("id", taskId);
		if (error) {
			console.error("Error submitting appeal:", error);
			window.showNotification("Failed to submit appeal", "error");
		} else {
			window.showNotification(
				"Appeal submitted. Awaiting admin review.",
				"warning"
			);
			await window.fetchTasksInitial();
		}
	});
};

/**
 * Approves a demerit appeal, restoring points to the user.
 * @param {number} taskId - The ID of the task whose appeal is to be approved.
 */
window.approveAppeal = async function (taskId) {
	if (!window.hasPermission("approve_task")) {
		window.showNotification(
			"You do not have permission to review appeals",
			"error"
		);
		return;
	}
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task) return;
	const updates = {
		appealStatus: "approved",
		appealReviewedAt: new Date().toISOString(),
		appealReviewedBy: window.currentUser,
	};
	const { error: taskError } = await window.supabase
		.from("tasks")
		.update(updates)
		.eq("id", taskId);
	if (taskError) {
		console.error("Error approving appeal:", taskError);
		window.showNotification("Failed to approve appeal", "error");
		return;
	}
	await window.updateUserPoints(task.assignedTo, task.penaltyPoints, "add");
	window.showNotification(
		`Appeal approved! ${task.penaltyPoints} points restored to ${
			window.users[task.assignedTo]?.displayName
		}`
	);
	await window.fetchTasksInitial();
};

/**
 * Denies a demerit appeal, applying an additional penalty to the user.
 * @param {number} taskId - The ID of the task whose appeal is to be denied.
 */
window.denyAppeal = function (taskId) {
	if (!window.hasPermission("approve_task")) {
		window.showNotification(
			"You do not have permission to review appeals",
			"error"
		);
		return;
	}
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task) return;
	window.showConfirmModal(
		`Are you sure you want to deny this appeal? This will apply an additional ${
			task.penaltyPoints
		} point penalty to ${
			window.users[task.assignedTo]?.displayName
		} (double penalty).`,
		async (confirmed) => {
			if (!confirmed) {
				return;
			}
			const updates = {
				appealStatus: "denied",
				appealReviewedAt: new Date().toISOString(),
				appealReviewedBy: window.currentUser,
			};
			const { error: taskError } = await window.supabase
				.from("tasks")
				.update(updates)
				.eq("id", taskId);
			if (taskError) {
				console.error("Error denying appeal:", taskError);
				window.showNotification("Failed to deny appeal", "error");
			} else {
				window.showNotification(
					`Appeal denied! Additional ${
						task.penaltyPoints
					} point penalty applied to ${
						window.users[task.assignedTo]?.displayName
					}`,
					"warning"
				);
				await window.updateUserPoints(
					task.assignedTo,
					task.penaltyPoints * 2,
					"subtract"
				);
				await window.fetchTasksInitial();
			}
		}
	);
};

/**
 * Creates a new instance of a repeating task.
 * @param {object} originalTask - The original task object that is repeating.
 */
window.createRepeatingTask = async function (originalTask) {
	const nextDueDate = new Date(originalTask.dueDate);
	switch (originalTask.repeatInterval) {
		case "daily":
			nextDueDate.setDate(nextDueDate.getDate() + 1);
			break;
		case "weekly":
			nextDueDate.setDate(nextDueDate.getDate() + 7);
			break;
		case "monthly":
			nextDueDate.setMonth(nextDueDate.getMonth() + 1);
			break;
	}

	const newTask = {
		text: originalTask.text,
		status: "todo",
		type: "regular",
		createdAt: new Date().toISOString(),
		createdBy: originalTask.createdBy,
		assignedTo: "schinken",
		points: originalTask.points,
		penaltyPoints: originalTask.penaltyPoints,
		dueDate: nextDueDate.toISOString(),
		isRepeating: true,
		repeatInterval: originalTask.repeatInterval,
		completedAt: null,
		completedBy: null,
		approvedAt: null,
		approvedBy: null,
		isOverdue: false,
		originalsuggestionid: null, // Add this line
		originalsuggestedby: null, // Add this line
	};
	const { error: taskError } = await window.supabase
		.from("tasks")
		.insert([newTask]);
	if (taskError) {
		console.error("Error creating repeating task:", taskError);
	}
};
