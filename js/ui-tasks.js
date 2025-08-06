// ui.tasks.js
// This file contains all the UI rendering functions for tasks.

/**
 * Renders tasks in the appropriate view (admin or user) based on current user's role.
 */
window.renderTasks = function () {
	var user = window.users[window.currentUser];
	if (user.role === "skeen") {
		window.renderAdminView();
	} else {
		window.renderUserView();
	}
};

/**
 * Renders the admin view with sections for pending appeals, suggested tasks,
 * tasks pending approval, and all tasks.
 */
window.renderAdminView = function () {
	var pendingAppeals = window.tasks.filter(function (t) {
		return t.type === "demerit" && t.appealStatus === "pending";
	});
	var appealsContainer = document.getElementById("pendingAppeals");
	if (appealsContainer) {
		if (pendingAppeals.length === 0) {
			appealsContainer.innerHTML =
				'<div class="empty-state">No appeals pending review</div>';
		} else {
			appealsContainer.innerHTML = pendingAppeals
				.map(function (task) {
					return (
						'<div class="task-item appeal-pending">' +
						'<div class="task-content">' +
						"<div>" +
						'<span class="status-badge status-pending">Appeal Pending</span>' +
						'<span class="task-text">' +
						window.escapeHtml(task.text) +
						"</span>" +
						'<span class="points-badge-small">-' +
						task.penaltyPoints +
						" pts (risk: -" +
						task.penaltyPoints * 2 +
						")</span>" +
						'<div class="task-meta">' +
						"User: " +
						(window.users[task.assignedTo]
							? window.users[task.assignedTo].displayName
							: task.assignedTo) +
						"<br>Appealed: " +
						window.formatDate(task.appealedAt) +
						"<br>Original demerit: " +
						window.formatDate(task.createdAt) +
						(task.acceptedAt
							? "<br>Accepted: " +
							  window.formatDate(task.acceptedAt)
							: "<br>Status: Not accepted") +
						(task.appealText
							? "<br>Appeal Reason: " +
							  window.escapeHtml(task.appealText)
							: "") +
						"</div>" +
						"</div>" +
						'<div class="task-actions">' +
						'<button class="action-btn approve-btn" onclick="approveAppeal(' +
						task.id +
						')">Approve Appeal</button>' +
						'<button class="action-btn reject-btn" onclick="denyAppeal(' +
						task.id +
						')">Deny Appeal (Double Penalty)</button>' +
						"</div>" +
						"</div>" +
						"</div>"
					);
				})
				.join("");
		}
	}

	// This is the new function call to render pending suggestions for the admin.
	window.renderAdminSuggestions();

	var pendingTasks = window.tasks.filter(function (t) {
		return t.status === "pending_approval" && t.type !== "demerit";
	});
	var pendingContainer = document.getElementById("pendingTasks");
	if (pendingContainer) {
		if (pendingTasks.length === 0) {
			pendingContainer.innerHTML =
				'<div class="empty-state">No tasks pending approval</div>';
		} else {
			pendingContainer.innerHTML = pendingTasks
				.map(function (task) {
					var taskType = task.type || "regular";
					var taskContent = "";

					if (taskType === "cost-tracker") {
						const totalAmount =
							window.extractTotalFromTaskText(task.text) || "N/A";
						taskContent = `
							<div>
								<span class="status-badge status-pending">Invoice Payment ${
									task.status === "pending_approval"
										? "Pending Admin Approval"
										: "Required"
								}</span>
								<span class="task-text">💰 ${window.escapeHtml(task.text.split("\n")[0])}</span>
								<span class="points-badge-small cost-badge">${totalAmount}</span>
								<div class="task-meta">
									<strong>Invoice Details:</strong><br>
									Total Amount: ${totalAmount}<br>
									Penalty if not paid: -100 points<br>
									${
										task.dueDate
											? "Payment Due: " +
											  window.formatDate(task.dueDate) +
											  "<br>"
											: ""
									}
									${
										task.status === "pending_approval"
											? "User marked as paid: " +
											  window.formatDate(
													task.completedAt
											  ) +
											  "<br>"
											: ""
									}
									Created by: ${
										window.users[task.createdBy]
											? window.users[task.createdBy]
													.displayName
											: task.createdBy
									}
								</div>
							</div>
							<div class="task-actions">
								<button class="action-btn check-btn" onclick="window.viewCostTrackerTask(${
									task.id
								})">View Invoice</button>
								${
									task.status === "pending_approval"
										? `
									<button class="action-btn approve-btn" onclick="window.approveInvoice(${task.id})">Approve Payment</button>
									<button class="action-btn reject-btn" onclick="rejectTask(${task.id})">Deny Payment</button>
								`
										: ""
								}
								<button class="action-btn delete-btn" onclick="deleteTask(${
									task.id
								})">Delete</button>
							</div>
						`;
					} else {
						// Existing regular task content
						taskContent = `
							<div>
								<span class="status-badge status-pending">Pending Approval</span>
								<span class="task-text">${window.escapeHtml(task.text)}</span>
								<span class="points-badge-small">+${task.points} pts</span>
								<div class="task-meta">
									Completed by: ${
										window.users[task.completedBy]
											? window.users[task.completedBy]
													.displayName
											: task.completedBy
									}
									${task.dueDate ? "<br>Due: " + window.formatDate(task.dueDate) : ""}
									${task.isRepeating ? "<br>売 Repeating" : ""}
								</div>
							</div>
							<div class="task-actions">
								<button class="action-btn approve-btn" onclick="approveTask(${
									task.id
								})">Approve</button>
								<button class="action-btn reject-btn" onclick="rejectTask(${
									task.id
								})">Reject & Penalize</button>
								<button class="action-btn delete-btn" onclick="deleteTask(${
									task.id
								})">Delete</button>
							</div>
						`;
					}
					return `<div class="task-item pending-approval ${
						task.isOverdue ? "overdue" : ""
					}"><div class="task-content">${taskContent}</div></div>`;
				})
				.join("");
		}
	}
	var allTasksContainer = document.getElementById("allTasksAdmin");
	if (allTasksContainer) {
		if (window.tasks.length === 0) {
			allTasksContainer.innerHTML =
				'<div class="empty-state">No tasks created yet</div>';
		} else {
			allTasksContainer.innerHTML = window.tasks
				.map(function (task) {
					var classes = "";
					if (task.status === "completed") classes += "completed ";
					if (task.isOverdue) classes += "overdue ";
					if (task.type === "demerit") classes += "demerit-task ";
					if (task.type === "spiral") classes += "spiral-task ";
					if (task.type === "cost-tracker")
						classes += "cost-tracker-task ";

					const totalAmount =
						task.type === "cost-tracker"
							? window.extractTotalFromTaskText(task.text)
							: null;

					return (
						'<div class="task-item ' +
						classes +
						'">' +
						'<div class="task-content">' +
						"<div>" +
						'<span class="status-badge ' +
						window.getStatusClass(
							task.status,
							task.isOverdue,
							task.type,
							task.appealStatus
						) +
						'">' +
						window.getStatusText(
							task.status,
							task.isOverdue,
							task.type,
							task.appealStatus
						) +
						"</span>" +
						'<span class="task-text">' +
						window.escapeHtml(task.text.split("\n")[0]) + // Show only first line for invoices
						"</span>" +
						(task.type === "cost-tracker" && totalAmount
							? '<span class="points-badge-small cost-badge">' +
							  totalAmount +
							  "</span>"
							: "") +
						(task.type === "regular"
							? '<span class="points-badge-small">+' +
							  task.points +
							  " pts</span>"
							: "") +
						(task.type === "demerit"
							? '<span class="points-badge-small">-' +
							  task.penaltyPoints +
							  " pts</span>"
							: "") +
						(task.type === "cost-tracker"
							? '<span class="points-badge-small">-100 pts penalty</span>'
							: "") +
						(task.type === "demerit" && task.appealStatus
							? '<span class="points-badge-small appeal-status ' +
							  task.appealStatus +
							  '">' +
							  task.appealStatus +
							  "</span>"
							: "") +
						(task.type === "demerit" && task.acceptedAt
							? '<span class="points-badge-small" style="background: #e0e7ff; color: #3730a3;">Accepted</span>'
							: "") +
						'<div class="task-meta">' +
						"Assigned to: " +
						(window.users[task.assignedTo]
							? window.users[task.assignedTo].displayName
							: task.assignedTo) +
						(task.completedBy
							? "<br>Completed by: " +
							  (window.users[task.completedBy]
									? window.users[task.completedBy].displayName
									: task.completedBy)
							: "") +
						(task.dueDate
							? "<br>Due: " + window.formatDate(task.dueDate)
							: "") +
						(task.isRepeating ? "<br>🔄 Repeating" : "") +
						(task.type === "demerit" ? "<br>⚠️ Demerit Task" : "") +
						(task.type === "spiral" ? "<br>🌀 Spiral Task" : "") +
						(task.type === "cost-tracker" ? "<br>💰 Invoice" : "") +
						(task.completedAt
							? "<br>Completed: " +
							  window.formatDate(task.completedAt)
							: "") +
						(task.approvedBy
							? "<br>Approved: " +
							  window.formatDate(task.approvedBy)
							: "") +
						(task.rejectedBy
							? "<br>Rejected: " +
							  window.formatDate(task.rejectedBy)
							: "") +
						(task.acceptedAt
							? "<br>Accepted: " +
							  window.formatDate(task.acceptedAt)
							: "") +
						(task.appealedAt
							? "<br>Appealed: " +
							  window.formatDate(task.appealedAt)
							: "") +
						(task.appealReviewedAt
							? "<br>Reviewed: " +
							  window.formatDate(task.appealReviewedAt) +
							  " by " +
							  (window.users[task.appealReviewedBy]
									? window.users[task.appealReviewedBy]
											.displayName
									: task.appealReviewedBy)
							: "") +
						(task.appealText
							? "<br>Appeal Reason: " +
							  window.escapeHtml(task.appealText)
							: "") +
						"</div>" +
						"</div>" +
						'<div class="task-actions">' +
						'<button class="action-btn delete-btn" onclick="deleteTask(' +
						task.id +
						')">Delete</button>' +
						"</div>" +
						"</div>" +
						"</div>"
					);
				})
				.join("");
		}
	}
	setTimeout(function () {
		window.setupRefreshButton("refreshDataBtnAdmin", 30);
	}, 0);
};

/**
 * Renders the user's view of tasks, including regular tasks, demerit tasks, and invoices.
 */
window.renderUserView = function () {
	var userTasks = window.tasks.filter(function (t) {
		return t.assignedTo === window.currentUser;
	});
	var myTasksContainer = document.getElementById("myTasks");
	if (myTasksContainer) {
		if (userTasks.length === 0) {
			myTasksContainer.innerHTML =
				'<div class="empty-state">No tasks available</div>';
		} else {
			myTasksContainer.innerHTML = userTasks
				.map(function (task) {
					var classes = "";
					if (task.type === "demerit")
						classes += "demerit-task-user ";
					if (task.isOverdue) classes += "overdue ";
					if (task.status === "completed") classes += "completed ";
					if (task.status === "pending_approval")
						classes += "pending-approval ";
					if (task.appealStatus === "pending")
						classes += "appeal-pending ";

					// New task types
					if (task.type === "spiral") classes += "spiral-task-user ";
					if (task.type === "cost-tracker")
						classes += "cost-tracker-task-user ";

					var actionButtons = "";
					var taskDescription = window.escapeHtml(task.text);

					if (task.type === "spiral") {
						actionButtons = `<button class="action-btn check-btn" onclick="window.viewSpiralTask(${task.id})">View Spiral</button>`;
					} else if (task.type === "cost-tracker") {
						// Cost tracker tasks are invoices that need to be marked as paid by user
						if (task.status === "todo") {
							actionButtons = `<button class="action-btn check-btn" onclick="window.viewCostTrackerTask(${task.id})">View Invoice</button>
											<button class="action-btn approve-btn" onclick="window.markInvoiceAsPaid(${task.id})">Mark as Paid</button>`;
						} else if (task.status === "pending_approval") {
							actionButtons = `<button class="action-btn check-btn" onclick="window.viewCostTrackerTask(${task.id})">View Invoice</button>
											<span style="color: #fcd34d; font-weight: bold;">⏳ Payment Pending Admin Approval</span>`;
						} else if (task.status === "completed") {
							actionButtons = `<button class="action-btn check-btn" onclick="window.viewCostTrackerTask(${task.id})">View Paid Invoice</button>`;
						} else if (task.status === "failed") {
							actionButtons = `<button class="action-btn check-btn" onclick="window.viewCostTrackerTask(${task.id})">View Denied Invoice</button>
											<span style="color: #f87171; font-weight: bold;">❌ Payment Denied</span>`;
						} else {
							actionButtons = `<button class="action-btn check-btn" onclick="window.viewCostTrackerTask(${task.id})">View Invoice</button>`;
						}
					} else if (
						task.type === "regular" &&
						task.status === "todo" &&
						!task.isOverdue
					) {
						actionButtons = `<button class="action-btn check-btn" onclick="checkOffTask(${task.id})">Mark Complete</button>`;
					} else if (
						task.type === "regular" &&
						task.isOverdue &&
						task.status === "todo"
					) {
						actionButtons = `<button class="action-btn check-btn" onclick="checkOffTask(${task.id})">Mark Complete (Overdue)</button>`;
					} else if (
						task.type === "demerit" &&
						!task.acceptedAt &&
						!task.appealStatus
					) {
						actionButtons = `<button class="action-btn accept-btn" onclick="acceptDemerit(${task.id})">Accept Demerit</button>
										 <button class="action-btn appeal-btn" onclick="appealDemerit(${task.id})">Appeal Demerit</button>`;
					}

					const totalAmount =
						task.type === "cost-tracker"
							? window.extractTotalFromTaskText(task.text)
							: null;

					// Correctly handle the Mark Complete button for repeating tasks.
					if (task.isRepeating && task.status === "todo") {
						actionButtons += `<button class="action-btn check-btn" onclick="checkOffTask(${task.id})">Mark Complete</button>`;
					}

					return (
						'<div class="task-item ' +
						classes +
						'">' +
						'<div class="task-content">' +
						"<div>" +
						'<span class="status-badge ' +
						window.getStatusClass(
							task.status,
							task.isOverdue,
							task.type,
							task.appealStatus
						) +
						'">' +
						window.getStatusText(
							task.status,
							task.isOverdue,
							task.type,
							task.appealStatus
						) +
						"</span>" +
						'<span class="task-text">' +
						(task.type === "cost-tracker" ? "💰 " : "") +
						(task.type === "cost-tracker"
							? window.escapeHtml(task.text.split("\n")[0])
							: taskDescription) +
						"</span>" +
						(task.type === "cost-tracker" && totalAmount
							? '<span class="points-badge-small cost-badge">' +
							  totalAmount +
							  "</span>"
							: "") +
						(task.type === "regular"
							? '<span class="points-badge-small">+' +
							  task.points +
							  " pts</span>"
							: "") +
						(task.type === "demerit"
							? '<span class="points-badge-small">-' +
							  task.penaltyPoints +
							  " pts</span>"
							: "") +
						(task.type === "cost-tracker"
							? '<span class="points-badge-small">-100 pts penalty</span>'
							: "") +
						(task.type === "demerit" && task.appealStatus
							? '<span class="points-badge-small appeal-status ' +
							  task.appealStatus +
							  '">' +
							  task.appealStatus +
							  "</span>"
							: "") +
						(task.type === "demerit" && task.acceptedAt
							? '<span class="points-badge-small" style="background: #e0e7ff; color: #3730a3;">Accepted</span>'
							: "") +
						'<div class="task-meta">' +
						(task.type === "demerit"
							? "Issued by: " +
							  (window.users[task.createdBy]
									? window.users[task.createdBy].displayName
									: task.createdBy)
							: task.type === "cost-tracker"
							? "Invoice from: " +
							  (window.users[task.createdBy]
									? window.users[task.createdBy].displayName
									: task.createdBy)
							: "Created by: " +
							  (window.users[task.createdBy]
									? window.users[task.createdBy].displayName
									: task.createdBy)) +
						(task.dueDate
							? "<br>" +
							  (task.type === "cost-tracker"
									? "Payment Due: "
									: "Due: ") +
							  window.formatDate(task.dueDate)
							: "") +
						(task.isRepeating ? "<br>🔄 Repeating" : "") +
						(task.type === "demerit" ? "<br>⚠️ Demerit Task" : "") +
						(task.type === "spiral" ? "<br>🌀 Spiral Task" : "") +
						(task.type === "cost-tracker"
							? "<br>💰 Invoice - " +
							  (task.status === "pending_approval"
									? "Payment Required"
									: task.status === "completed"
									? "Paid"
									: "Invoice")
							: "") +
						(task.completedBy
							? "<br>Completed by: " +
							  (window.users[task.completedBy]
									? window.users[task.completedBy].displayName
									: task.completedBy)
							: "") +
						(task.approvedBy
							? "<br>Approved by: " +
							  (window.users[task.approvedBy]
									? window.users[task.approvedBy].displayName
									: task.approvedBy)
							: "") +
						(task.rejectedBy
							? "<br>Rejected by: " +
							  (window.users[task.rejectedBy]
									? window.users[task.rejectedBy].displayName
									: task.rejectedBy)
							: "") +
						(task.acceptedAt
							? "<br>Accepted: " +
							  window.formatDate(task.acceptedAt)
							: "") +
						(task.appealedAt
							? "<br>Appealed: " +
							  window.formatDate(task.appealedAt)
							: "") +
						(task.appealReviewedAt
							? "<br>Reviewed: " +
							  window.formatDate(task.appealReviewedAt) +
							  " by " +
							  (window.users[task.appealReviewedBy]
									? window.users[task.appealReviewedBy]
											.displayName
									: task.appealReviewedBy)
							: "") +
						(task.appealText
							? "<br>Appeal Reason: " +
							  window.escapeHtml(task.appealText)
							: "") +
						"</div>" +
						"</div>" +
						'<div class="task-actions">' +
						actionButtons +
						"</div>" +
						"</div>" +
						"</div>"
					);
				})
				.join("");
		}
	}
	setTimeout(function () {
		window.setupRefreshButton("refreshDataBtnUser", 30);
	}, 0);
};

// js/ui-tasks.js - Enhanced spiral task viewing
// Replace the viewSpiralTask function with this enhanced version

window.viewSpiralTask = function (taskId) {
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "spiral") {
		window.showNotification("This is not a spiral task.", "error");
		return;
	}

	console.log("Viewing spiral task:", task);
	console.log("Spiral config:", task.spiralConfig || task.spiralconfig);

	const modal = document.getElementById("spiralModal");
	if (modal) {
		modal.classList.remove("hidden");

		// Initialize spiral viewer
		if (window.spiral && window.spiral.init) {
			// Small delay to ensure modal is visible before initializing
			setTimeout(() => {
				console.log("Initializing spiral viewer...");
				window.spiral.init();

				// Apply the saved configuration if it exists
				const config = task.spiralConfig || task.spiralconfig;
				if (config) {
					console.log("Applying saved spiral configuration:", config);
					window.spiral.applyConfiguration(config);
				} else {
					console.log("No saved configuration found, using default");
					window.spiral.initDefaultText();
				}

				// Hide or disable controls for user view to make it read-only
				const controls = document.getElementById("controls");
				if (controls && window.currentUser !== "skeen") {
					// For regular users, hide the controls to make it view-only
					controls.style.display = "none";

					// Add a notice that this is view-only
					const notice = document.createElement("div");
					notice.style.cssText = `
						position: fixed;
						top: 60px;
						right: 20px;
						background: var(--terminal-bg);
						border: 1px solid var(--terminal-green);
						color: var(--terminal-green);
						padding: 15px;
						z-index: 1001;
						font-weight: bold;
						border-radius: 0;
					`;
					notice.textContent =
						"👁️ View-Only Mode - Enjoy the spiral!";
					notice.id = "spiralViewNotice";
					document.body.appendChild(notice);
				} else if (controls) {
					// For admin users, show controls but add a different notice
					controls.style.display = "block";

					const notice = document.createElement("div");
					notice.style.cssText = `
						position: fixed;
						top: 60px;
						right: 20px;
						background: var(--terminal-bg);
						border: 1px solid var(--terminal-green);
						color: var(--terminal-green);
						padding: 15px;
						z-index: 1001;
						font-weight: bold;
						border-radius: 0;
					`;
					notice.textContent =
						"🔧 Admin Mode - You can modify the spiral";
					notice.id = "spiralViewNotice";
					document.body.appendChild(notice);
				}
			}, 100);
		} else {
			console.error("Spiral integration not available");
			window.showNotification("Spiral viewer not available", "error");
		}

		// Modify the close button to clean up the notice
		const originalHideSpiralGenerator = window.hideSpiralGenerator;
		window.hideSpiralGenerator = function () {
			// Remove the notice if it exists
			const notice = document.getElementById("spiralViewNotice");
			if (notice) {
				document.body.removeChild(notice);
			}

			// Call the original hide function
			if (originalHideSpiralGenerator) {
				originalHideSpiralGenerator();
			}

			// Restore the original function
			window.hideSpiralGenerator = originalHideSpiralGenerator;
		};
	} else {
		console.error("Spiral modal not found");
		window.showNotification("Spiral modal not available", "error");
	}
};

window.viewCostTrackerTask = function (taskId) {
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "cost-tracker") {
		window.showNotification("This is not a cost tracker invoice.", "error");
		return;
	}

	// Parse the cost information from the task text
	const taskText = task.text;
	const totalAmount = window.extractTotalFromTaskText(taskText) || "N/A";

	let modalContent = `
		<h3>💰 Cost Tracker Invoice</h3>
		<p><strong>Invoice from:</strong> ${
			window.users[task.createdBy]?.displayName || task.createdBy
		}</p>
		<p><strong>Issued on:</strong> ${window.formatDate(task.createdAt)}</p>
		<p><strong>Status:</strong> ${window.getStatusText(
			task.status,
			false,
			task.type
		)}</p>
		${
			task.dueDate
				? `<p><strong>Payment Due:</strong> ${window.formatDate(
						task.dueDate
				  )}</p>`
				: ""
		}
		<p><strong>Penalty if not paid:</strong> -100 points</p>
		<hr>
		<div style="white-space: pre-line; font-family: monospace; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 15px 0;">
			${window.escapeHtml(taskText)}
		</div>
		<hr>
		<h3 style="color: #ff6b6b;">Total Amount Due: <strong>${totalAmount}</strong></h3>
	`;

	window.showModal(modalContent);
};

/**
 * User marks an invoice as paid (sets to pending_approval for admin review)
 */
window.markInvoiceAsPaid = function (taskId) {
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "cost-tracker") {
		window.showNotification("This is not an invoice.", "error");
		return;
	}

	const totalAmount = window.extractTotalFromTaskText(task.text) || "Unknown";

	window.showConfirmModal(
		`Mark this invoice as paid?\n\nAmount: ${totalAmount}\n\nThis will notify the admin that you have made the payment and request approval.`,
		async (confirmed) => {
			if (!confirmed) return;

			const updates = {
				status: "pending_approval",
				completedAt: new Date().toISOString(),
				completedBy: window.currentUser,
			};

			const { error: taskError } = await window.supabase
				.from("tasks")
				.update(updates)
				.eq("id", taskId);

			if (taskError) {
				console.error("Error marking invoice as paid:", taskError);
				window.showNotification(
					"Failed to mark invoice as paid",
					"error"
				);
				return;
			}

			window.showNotification(
				`Invoice marked as paid! Awaiting admin approval. Amount: ${totalAmount}`
			);
			await window.fetchTasksInitial();
		}
	);
};

/**
 * Admin approves an invoice payment
 */
window.approveInvoice = function (taskId) {
	const task = window.tasks.find((t) => t.id === taskId);
	if (!task || task.type !== "cost-tracker") {
		window.showNotification("This is not an invoice.", "error");
		return;
	}

	const totalAmount = window.extractTotalFromTaskText(task.text) || "Unknown";

	window.showConfirmModal(
		`Approve this invoice payment?\n\nAmount: ${totalAmount}\n\nThis confirms the payment has been received.`,
		async (confirmed) => {
			if (!confirmed) return;

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
				console.error("Error approving invoice:", taskError);
				window.showNotification("Failed to approve invoice", "error");
				return;
			}

			window.showNotification(
				`Invoice payment approved! Amount: ${totalAmount}`
			);
			await window.fetchTasksInitial();
		}
	);
};
