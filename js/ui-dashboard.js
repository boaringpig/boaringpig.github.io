// ui.dashboard.js
// This file contains all the UI rendering functions for the dashboard.

/**
 * Renders the dashboard view with user stats, activity log, and admin controls.
 */
window.renderDashboard = function () {
	if (!window.hasPermission("view_dashboard")) return;

	var userActivity = window.userActivityLog.filter(function (a) {
		return a.user === "schinken";
	});
	var lastActivity = userActivity[0];
	var isUserOnline = lastActivity && lastActivity.action === "login";
	var activeTasks = window.tasks.filter(function (t) {
		return (
			t.status !== "completed" &&
			t.type !== "demerit" &&
			t.assignedTo === "schinken"
		);
	});
	var completedTasks = window.tasks.filter(function (t) {
		return t.status === "completed" && t.assignedTo === "schinken";
	});
	var allNonDemeritTasks = window.tasks.filter(function (t) {
		return t.type !== "demerit" && t.assignedTo === "schinken";
	});
	var completionRate =
		allNonDemeritTasks.length > 0
			? Math.round(
					(completedTasks.length / allNonDemeritTasks.length) * 100
			  )
			: 0;
	var demeritTasksCount = window.tasks.filter(function (t) {
		return t.type === "demerit";
	}).length;

	var userStatusEl = document.getElementById("userStatus");
	var activeTasksEl = document.getElementById("activeTasks");
	var completionRateEl = document.getElementById("completionRate");
	var demeritsIssuedCountEl = document.getElementById("demeritsIssuedCount");

	if (userStatusEl) {
		userStatusEl.textContent = isUserOnline ? "Online" : "Offline";
		userStatusEl.style.color = isUserOnline ? "#059669" : "#dc2626";
	}
	if (activeTasksEl) activeTasksEl.textContent = activeTasks.length;
	if (completionRateEl) completionRateEl.textContent = completionRate + "%";
	if (demeritsIssuedCountEl)
		demeritsIssuedCountEl.textContent = demeritTasksCount;

	// Update active cost trackers count
	window.updateActiveCostTrackersCount();

	// Add admin points control to the dashboard stats
	window.addAdminPointsControl();

	window.renderUserActivityLog();
	window.renderUserProgress();
	window.renderActiveCostTrackersAdmin();
};

/**
 * Adds the admin points control to the dashboard
 */
window.addAdminPointsControl = function () {
	if (!window.hasPermission("manage_users")) return;

	// Check if control already exists
	if (document.getElementById("adminPointsControl")) {
		// If it exists, just update it
		window.updateAdminPointsDisplay();
		return;
	}

	const dashboardStats = document.querySelector(".dashboard-stats");
	if (!dashboardStats) return;

	const userPoints = window.users["schinken"].points || 0;
	let pointsColor =
		userPoints < 0 ? "#ff6b6b" : userPoints === 0 ? "#ffff00" : "#00ff00";

	const pointsControlCard = document.createElement("div");
	pointsControlCard.className = "stat-card";
	pointsControlCard.id = "adminPointsControl";
	pointsControlCard.innerHTML = `
		<h3>👑 Admin: Set User Points</h3>
		<div class="stat-number" style="color: ${pointsColor}; margin-bottom: 15px;">${userPoints}</div>
		<div style="display: flex; gap: 10px; align-items: center;">
			<input 
				type="number" 
				id="adminPointsInput" 
				class="form-input" 
				placeholder="New points value"
				value="${userPoints}"
				style="width: 120px; padding: 8px; font-size: 14px;"
				onkeypress="if(event.key==='Enter') window.setUserPoints()"
				onfocus="this.select()"
			>
			<button 
				class="action-btn approve-btn" 
				onclick="window.setUserPoints()"
				style="padding: 8px 16px; font-size: 14px;"
			>
				Set
			</button>
		</div>
		<div style="margin-top: 10px; font-size: 12px; color: var(--text-color-medium);">
			Current: ${window.users["schinken"].displayName}
		</div>
	`;

	// Insert the control card at the beginning of dashboard stats
	dashboardStats.insertBefore(pointsControlCard, dashboardStats.firstChild);
};

/**
 * Updates the points display in the admin control
 */
window.updateAdminPointsDisplay = function () {
	const pointsControl = document.getElementById("adminPointsControl");
	if (!pointsControl) return;

	const userPoints = window.users["schinken"].points || 0;
	let pointsColor =
		userPoints < 0 ? "#ff6b6b" : userPoints === 0 ? "#ffff00" : "#00ff00";

	const statNumber = pointsControl.querySelector(".stat-number");
	const input = pointsControl.querySelector("#adminPointsInput");

	if (statNumber) {
		statNumber.textContent = userPoints;
		statNumber.style.color = pointsColor;
	}
	if (input) {
		input.value = userPoints;
		// Also update placeholder to show current value
		input.placeholder = `Current: ${userPoints}`;
	}
};

/**
 * Renders the user activity log on the dashboard.
 */
window.renderUserActivityLog = function () {
	var activityLogEl = document.getElementById("userActivityLog");
	if (!activityLogEl) return;
	var filteredActivityLog = window.userActivityLog.filter(function (a) {
		return a.user === "schinken" || a.user === "skeen";
	});
	if (filteredActivityLog.length === 0) {
		activityLogEl.innerHTML =
			'<div class="empty-state">No user activity recorded</div>';
	} else {
		activityLogEl.innerHTML = filteredActivityLog
			.slice(0, 20)
			.map(function (activity) {
				var actionText;
				if (activity.user === "schinken") {
					actionText =
						activity.action === "login"
							? "🔓 User Logged In"
							: activity.action === "logout"
							? "🔒 User Logged Out"
							: activity.action === "points_changed"
							? "🎯 Points Changed"
							: "📝 " + activity.action;
				} else {
					actionText =
						activity.action === "login"
							? "🔓 Admin Logged In"
							: activity.action === "logout"
							? "🔒 Admin Logged Out"
							: activity.action === "points_changed"
							? "👑 Admin Changed Points"
							: "👑 " + activity.action;
				}

				// Add details if available
				if (activity.details) {
					actionText +=
						"<br><small style='color: var(--text-color-medium);'>" +
						activity.details +
						"</small>";
				}

				return (
					'<div class="activity-item">' +
					'<div class="activity-action activity-' +
					activity.action +
					'">' +
					actionText +
					"</div>" +
					'<div class="activity-time">' +
					window.formatDate(activity.timestamp) +
					"</div>" +
					"</div>"
				);
			})
			.join("");
	}
};

/**
 * Renders the user's progress summary on the dashboard with proper negative points handling.
 */
window.renderUserProgress = function () {
	var progressList = document.getElementById("userProgressList");
	if (!progressList) return;
	var user = window.users["schinken"];
	var userTasks = window.tasks.filter(function (t) {
		return t.assignedTo === "schinken" && t.type !== "demerit";
	});
	var completed = userTasks.filter(function (t) {
		return t.status === "completed";
	});
	var pending = userTasks.filter(function (t) {
		return t.status === "todo" || t.status === "pending_approval";
	});
	var overdue = userTasks.filter(function (t) {
		return window.isTaskOverdue(t) && t.status !== "completed";
	});
	var demeritTasks = window.tasks.filter(function (t) {
		return t.type === "demerit" && t.assignedTo === "schinken";
	});
	var completionRate =
		userTasks.length > 0
			? Math.round((completed.length / userTasks.length) * 100)
			: 0;

	// Determine point styling based on value
	var pointsClass = "";
	var pointsStyle = "";
	if (user.points < 0) {
		pointsClass = "negative-points";
		pointsStyle =
			"color: #ff6b6b; font-weight: bold; text-shadow: 0 0 5px rgba(255, 107, 107, 0.5);";
	} else if (user.points === 0) {
		pointsStyle = "color: #ffff00; font-weight: bold;";
	} else {
		pointsStyle = "color: #00ff00; font-weight: bold;";
	}

	progressList.innerHTML =
		'<div class="progress-item">' +
		"<div>" +
		'<div class="user-name">' +
		user.displayName +
		"</div>" +
		'<div class="progress-bar">' +
		'<div class="progress-fill" style="width: ' +
		completionRate +
		'%"></div>' +
		"</div>" +
		"</div>" +
		'<div class="user-stats">' +
		'<span class="' +
		pointsClass +
		'" style="' +
		pointsStyle +
		'">' +
		user.points +
		" pts</span>" +
		"<span>" +
		completed.length +
		" done</span>" +
		"<span>" +
		pending.length +
		" pending</span>" +
		"<span>" +
		overdue.length +
		" overdue</span>" +
		"<span>" +
		demeritTasks.length +
		" demerits</span>" +
		"</div>" +
		"</div>";
};

/**
 * Updates the overall statistics displayed in the footer with negative points support.
 */
window.updateStats = function () {
	var relevantTasks = window.tasks.filter(function (t) {
		return (
			window.currentUser === "skeen" ||
			t.assignedTo === window.currentUser
		);
	});
	var total = relevantTasks.filter(function (t) {
		return t.type !== "demerit";
	}).length;
	var pending = relevantTasks.filter(function (t) {
		return (
			(t.status === "todo" || t.status === "pending_approval") &&
			t.type !== "demerit"
		);
	}).length;
	var completed = relevantTasks.filter(function (t) {
		return t.status === "completed";
	}).length;

	var totalTasksEl = document.getElementById("totalTasksStat");
	var pendingCountEl = document.getElementById("pendingCountStat");
	var completedCountEl = document.getElementById("completedCountStat");
	var myPointsEl = document.getElementById("myPointsStat");

	if (totalTasksEl) totalTasksEl.textContent = total;
	if (pendingCountEl) pendingCountEl.textContent = pending;
	if (completedCountEl) completedCountEl.textContent = completed;

	if (myPointsEl && window.users[window.currentUser]) {
		var points = window.users[window.currentUser].points;
		myPointsEl.textContent = points;

		// Style the points based on value
		myPointsEl.className = "stat-number";
		if (points < 0) {
			myPointsEl.classList.add("negative");
			myPointsEl.style.color = "#ff6b6b";
			myPointsEl.style.textShadow = "0 0 10px rgba(255, 107, 107, 0.5)";
		} else if (points === 0) {
			myPointsEl.classList.add("zero");
			myPointsEl.style.color = "#ffff00";
			myPointsEl.style.textShadow = "0 0 10px rgba(255, 255, 0, 0.5)";
		} else {
			myPointsEl.classList.add("positive");
			myPointsEl.style.color = "#00ff00";
			myPointsEl.style.textShadow = "0 0 10px rgba(0, 255, 0, 0.5)";
		}
	}
};

// Add this to js/ui-dashboard.js - Enhanced renderDashboard function with invoice tracking

/**
 * Renders the dashboard view with user stats, activity log, admin controls, and invoice totals.
 */
window.renderDashboard = function () {
	if (!window.hasPermission("view_dashboard")) return;

	var userActivity = window.userActivityLog.filter(function (a) {
		return a.user === "schinken";
	});
	var lastActivity = userActivity[0];
	var isUserOnline = lastActivity && lastActivity.action === "login";
	var activeTasks = window.tasks.filter(function (t) {
		return (
			t.status !== "completed" &&
			t.type !== "demerit" &&
			t.assignedTo === "schinken"
		);
	});
	var completedTasks = window.tasks.filter(function (t) {
		return t.status === "completed" && t.assignedTo === "schinken";
	});
	var allNonDemeritTasks = window.tasks.filter(function (t) {
		return t.type !== "demerit" && t.assignedTo === "schinken";
	});
	var completionRate =
		allNonDemeritTasks.length > 0
			? Math.round(
					(completedTasks.length / allNonDemeritTasks.length) * 100
			  )
			: 0;
	var demeritTasksCount = window.tasks.filter(function (t) {
		return t.type === "demerit";
	}).length;

	var userStatusEl = document.getElementById("userStatus");
	var activeTasksEl = document.getElementById("activeTasks");
	var completionRateEl = document.getElementById("completionRate");
	var demeritsIssuedCountEl = document.getElementById("demeritsIssuedCount");

	if (userStatusEl) {
		userStatusEl.textContent = isUserOnline ? "Online" : "Offline";
		userStatusEl.style.color = isUserOnline ? "#059669" : "#dc2626";
	}
	if (activeTasksEl) activeTasksEl.textContent = activeTasks.length;
	if (completionRateEl) completionRateEl.textContent = completionRate + "%";
	if (demeritsIssuedCountEl)
		demeritsIssuedCountEl.textContent = demeritTasksCount;

	// Update active cost trackers count
	window.updateActiveCostTrackersCount();

	// NEW: Update invoice totals
	window.updateInvoiceTotals();

	// Add admin points control to the dashboard stats
	window.addAdminPointsControl();

	window.renderUserActivityLog();
	window.renderUserProgress();
	window.renderActiveCostTrackersAdmin();
};

/**
 * NEW: Updates the invoice totals on the dashboard
 */
window.updateInvoiceTotals = function () {
	// Calculate invoice statistics from cost-tracker tasks
	const invoiceTasks = window.tasks.filter((t) => t.type === "cost-tracker");
	const paidInvoices = invoiceTasks.filter((t) => t.status === "completed");
	const pendingInvoices = invoiceTasks.filter(
		(t) => t.status === "pending_approval"
	);
	const deniedInvoices = invoiceTasks.filter((t) => t.status === "failed");

	// Calculate totals
	let totalPaid = 0;
	let totalPending = 0;
	let totalDenied = 0;

	paidInvoices.forEach((invoice) => {
		const amount = window.extractTotalFromTaskText(invoice.text);
		if (amount) {
			// Extract numeric value from currency string (e.g., "€123.45" -> 123.45)
			const numericAmount = parseFloat(amount.replace(/[^\d.-]/g, ""));
			if (!isNaN(numericAmount)) {
				totalPaid += numericAmount;
			}
		}
	});

	pendingInvoices.forEach((invoice) => {
		const amount = window.extractTotalFromTaskText(invoice.text);
		if (amount) {
			const numericAmount = parseFloat(amount.replace(/[^\d.-]/g, ""));
			if (!isNaN(numericAmount)) {
				totalPending += numericAmount;
			}
		}
	});

	deniedInvoices.forEach((invoice) => {
		const amount = window.extractTotalFromTaskText(invoice.text);
		if (amount) {
			const numericAmount = parseFloat(amount.replace(/[^\d.-]/g, ""));
			if (!isNaN(numericAmount)) {
				totalDenied += numericAmount;
			}
		}
	});

	// Update existing stat cards or create new ones
	window.updateInvoiceStatCards(
		totalPaid,
		totalPending,
		totalDenied,
		paidInvoices.length,
		pendingInvoices.length,
		deniedInvoices.length
	);
};

/**
 * NEW: Updates or creates invoice stat cards on the dashboard
 */
window.updateInvoiceStatCards = function (
	totalPaid,
	totalPending,
	totalDenied,
	paidCount,
	pendingCount,
	deniedCount
) {
	const dashboardStats = document.querySelector(".dashboard-stats");
	if (!dashboardStats) return;

	// Check if invoice stat cards already exist
	let paidStatCard = document.getElementById("invoicePaidStat");
	let pendingStatCard = document.getElementById("invoicePendingStat");
	let deniedStatCard = document.getElementById("invoiceDeniedStat");

	// Determine currency symbol (use Euro as default, could be made dynamic)
	const currency = "€";

	// Create or update paid invoices card
	if (!paidStatCard) {
		paidStatCard = document.createElement("div");
		paidStatCard.className = "stat-card";
		paidStatCard.id = "invoicePaidStat";
		dashboardStats.appendChild(paidStatCard);
	}

	paidStatCard.innerHTML = `
		<h3>💰 Invoices Paid</h3>
		<div class="stat-number" style="color: #00ff00;">${currency}${totalPaid.toFixed(
		2
	)}</div>
		<div class="stat-meta" style="font-size: 12px; color: var(--terminal-gray-light); margin-top: 5px;">
			${paidCount} invoice${paidCount !== 1 ? "s" : ""} completed
		</div>
	`;

	// Create or update pending invoices card
	if (!pendingStatCard) {
		pendingStatCard = document.createElement("div");
		pendingStatCard.className = "stat-card";
		pendingStatCard.id = "invoicePendingStat";
		dashboardStats.appendChild(pendingStatCard);
	}

	pendingStatCard.innerHTML = `
		<h3>⏳ Invoices Pending</h3>
		<div class="stat-number" style="color: #ffff00;">${currency}${totalPending.toFixed(
		2
	)}</div>
		<div class="stat-meta" style="font-size: 12px; color: var(--terminal-gray-light); margin-top: 5px;">
			${pendingCount} invoice${pendingCount !== 1 ? "s" : ""} awaiting approval
		</div>
	`;

	// Create or update denied invoices card
	if (!deniedStatCard) {
		deniedStatCard = document.createElement("div");
		deniedStatCard.className = "stat-card";
		deniedStatCard.id = "invoiceDeniedStat";
		dashboardStats.appendChild(deniedStatCard);
	}

	deniedStatCard.innerHTML = `
		<h3>❌ Invoices Denied</h3>
		<div class="stat-number" style="color: #ff6b6b;">${currency}${totalDenied.toFixed(
		2
	)}</div>
		<div class="stat-meta" style="font-size: 12px; color: var(--terminal-gray-light); margin-top: 5px;">
			${deniedCount} invoice${deniedCount !== 1 ? "s" : ""} denied payment
		</div>
	`;

	// Add hover effects for the new cards
	[paidStatCard, pendingStatCard, deniedStatCard].forEach((card) => {
		card.addEventListener("mouseenter", function () {
			this.style.boxShadow = "0 0 15px rgba(0, 255, 0, 0.3)";
		});
		card.addEventListener("mouseleave", function () {
			this.style.boxShadow = "";
		});
	});
};

/**
 * NEW: Enhanced version of extractTotalFromTaskText to handle various currency formats
 */
window.extractTotalFromTaskText = function (taskText) {
	if (!taskText) return null;

	// Look for "TOTAL AMOUNT DUE:" pattern with currency symbols
	const totalMatch = taskText.match(
		/TOTAL AMOUNT DUE:\s*([€£$¥]\d+(?:\.\d{2})?)/
	);
	if (totalMatch) {
		return totalMatch[1];
	}

	// Fallback: look for any currency amount pattern
	const currencyMatch = taskText.match(/([€£$¥]\d+(?:\.\d{2})?)/);
	if (currencyMatch) {
		return currencyMatch[1];
	}

	return null;
};

/**
 * NEW: Get detailed invoice statistics for advanced reporting
 */
window.getInvoiceStatistics = function () {
	const invoiceTasks = window.tasks.filter((t) => t.type === "cost-tracker");

	const stats = {
		total: invoiceTasks.length,
		paid: 0,
		pending: 0,
		denied: 0,
		overdue: 0,
		totalPaidAmount: 0,
		totalPendingAmount: 0,
		totalDeniedAmount: 0,
		averageInvoiceValue: 0,
		invoicesByMonth: {},
		recentInvoices: [],
	};

	let totalAmount = 0;
	const now = new Date();

	invoiceTasks.forEach((invoice) => {
		const amount = window.extractTotalFromTaskText(invoice.text);
		const numericAmount = amount
			? parseFloat(amount.replace(/[^\d.-]/g, ""))
			: 0;

		if (!isNaN(numericAmount)) {
			totalAmount += numericAmount;
		}

		// Count by status
		switch (invoice.status) {
			case "completed":
				stats.paid++;
				stats.totalPaidAmount += numericAmount;
				break;
			case "pending_approval":
				stats.pending++;
				stats.totalPendingAmount += numericAmount;
				break;
			case "failed":
				stats.denied++;
				stats.totalDeniedAmount += numericAmount;
				break;
		}

		// Check if overdue
		if (invoice.dueDate && invoice.status !== "completed") {
			const dueDate = new Date(invoice.dueDate);
			if (dueDate < now) {
				stats.overdue++;
			}
		}

		// Group by month
		const createdDate = new Date(invoice.createdAt);
		const monthKey = `${createdDate.getFullYear()}-${(
			createdDate.getMonth() + 1
		)
			.toString()
			.padStart(2, "0")}`;
		if (!stats.invoicesByMonth[monthKey]) {
			stats.invoicesByMonth[monthKey] = { count: 0, totalAmount: 0 };
		}
		stats.invoicesByMonth[monthKey].count++;
		stats.invoicesByMonth[monthKey].totalAmount += numericAmount;

		// Recent invoices (last 7 days)
		const daysSinceCreated = (now - createdDate) / (1000 * 60 * 60 * 24);
		if (daysSinceCreated <= 7) {
			stats.recentInvoices.push({
				id: invoice.id,
				amount: amount,
				status: invoice.status,
				createdAt: invoice.createdAt,
				dueDate: invoice.dueDate,
			});
		}
	});

	stats.averageInvoiceValue = stats.total > 0 ? totalAmount / stats.total : 0;

	return stats;
};

/**
 * NEW: Console debug function to view invoice statistics
 */
window.debugInvoiceStats = function () {
	const stats = window.getInvoiceStatistics();
	console.log("=== Invoice Statistics ===");
	console.log("Total Invoices:", stats.total);
	console.log("Paid:", stats.paid, `(€${stats.totalPaidAmount.toFixed(2)})`);
	console.log(
		"Pending:",
		stats.pending,
		`(€${stats.totalPendingAmount.toFixed(2)})`
	);
	console.log(
		"Denied:",
		stats.denied,
		`(€${stats.totalDeniedAmount.toFixed(2)})`
	);
	console.log("Overdue:", stats.overdue);
	console.log(
		"Average Invoice Value:",
		`€${stats.averageInvoiceValue.toFixed(2)}`
	);
	console.log("Recent Invoices (7 days):", stats.recentInvoices.length);
	console.log("Monthly Breakdown:", stats.invoicesByMonth);
	return stats;
};

// Add these enhanced functions to js/ui-dashboard.js for detailed invoice management

/**
 * NEW: Enhanced updateInvoiceStatCards with clickable details
 */
window.updateInvoiceStatCards = function (
	totalPaid,
	totalPending,
	totalDenied,
	paidCount,
	pendingCount,
	deniedCount
) {
	const dashboardStats = document.querySelector(".dashboard-stats");
	if (!dashboardStats) return;

	// Check if invoice stat cards already exist
	let paidStatCard = document.getElementById("invoicePaidStat");
	let pendingStatCard = document.getElementById("invoicePendingStat");
	let deniedStatCard = document.getElementById("invoiceDeniedStat");

	// Determine currency symbol (use Euro as default, could be made dynamic)
	const currency = "€";

	// Create or update paid invoices card
	if (!paidStatCard) {
		paidStatCard = document.createElement("div");
		paidStatCard.className = "stat-card clickable-stat-card";
		paidStatCard.id = "invoicePaidStat";
		paidStatCard.style.cursor = "pointer";
		dashboardStats.appendChild(paidStatCard);
	}

	paidStatCard.innerHTML = `
		<h3>💰 Invoices Paid</h3>
		<div class="stat-number" style="color: #00ff00;">${currency}${totalPaid.toFixed(
		2
	)}</div>
		<div class="stat-meta" style="font-size: 12px; color: var(--terminal-gray-light); margin-top: 5px;">
			${paidCount} invoice${paidCount !== 1 ? "s" : ""} completed
		</div>
		<div class="stat-action-hint" style="font-size: 10px; color: var(--terminal-green); margin-top: 8px;">
			Click to view details
		</div>
	`;

	// Create or update pending invoices card
	if (!pendingStatCard) {
		pendingStatCard = document.createElement("div");
		pendingStatCard.className = "stat-card clickable-stat-card";
		pendingStatCard.id = "invoicePendingStat";
		pendingStatCard.style.cursor = "pointer";
		dashboardStats.appendChild(pendingStatCard);
	}

	pendingStatCard.innerHTML = `
		<h3>⏳ Invoices Pending</h3>
		<div class="stat-number" style="color: #ffff00;">${currency}${totalPending.toFixed(
		2
	)}</div>
		<div class="stat-meta" style="font-size: 12px; color: var(--terminal-gray-light); margin-top: 5px;">
			${pendingCount} invoice${pendingCount !== 1 ? "s" : ""} awaiting approval
		</div>
		<div class="stat-action-hint" style="font-size: 10px; color: var(--terminal-green); margin-top: 8px;">
			Click to view details
		</div>
	`;

	// Create or update denied invoices card
	if (!deniedStatCard) {
		deniedStatCard = document.createElement("div");
		deniedStatCard.className = "stat-card clickable-stat-card";
		deniedStatCard.id = "invoiceDeniedStat";
		deniedStatCard.style.cursor = "pointer";
		dashboardStats.appendChild(deniedStatCard);
	}

	deniedStatCard.innerHTML = `
		<h3>❌ Invoices Denied</h3>
		<div class="stat-number" style="color: #ff6b6b;">${currency}${totalDenied.toFixed(
		2
	)}</div>
		<div class="stat-meta" style="font-size: 12px; color: var(--terminal-gray-light); margin-top: 5px;">
			${deniedCount} invoice${deniedCount !== 1 ? "s" : ""} denied payment
		</div>
		<div class="stat-action-hint" style="font-size: 10px; color: var(--terminal-green); margin-top: 8px;">
			Click to view details
		</div>
	`;

	// Add click event listeners to show detailed invoice breakdowns
	paidStatCard.onclick = () => window.showInvoiceDetailsModal("completed");
	pendingStatCard.onclick = () =>
		window.showInvoiceDetailsModal("pending_approval");
	deniedStatCard.onclick = () => window.showInvoiceDetailsModal("failed");

	// Add enhanced hover effects for the new cards
	[paidStatCard, pendingStatCard, deniedStatCard].forEach((card) => {
		card.addEventListener("mouseenter", function () {
			this.style.transform = "scale(1.02)";
			this.style.boxShadow = "0 0 15px rgba(0, 255, 0, 0.3)";
		});
		card.addEventListener("mouseleave", function () {
			this.style.transform = "scale(1)";
			this.style.boxShadow = "";
		});
	});
};

/**
 * NEW: Shows detailed invoice breakdown modal
 */
window.showInvoiceDetailsModal = function (filterStatus) {
	const invoiceTasks = window.tasks.filter(
		(t) => t.type === "cost-tracker" && t.status === filterStatus
	);

	let statusTitle = "";
	let statusColor = "";
	let statusIcon = "";

	switch (filterStatus) {
		case "completed":
			statusTitle = "Paid Invoices";
			statusColor = "#00ff00";
			statusIcon = "💰";
			break;
		case "pending_approval":
			statusTitle = "Pending Invoices";
			statusColor = "#ffff00";
			statusIcon = "⏳";
			break;
		case "failed":
			statusTitle = "Denied Invoices";
			statusColor = "#ff6b6b";
			statusIcon = "❌";
			break;
		default:
			statusTitle = "All Invoices";
			statusColor = "#00ff00";
			statusIcon = "📄";
	}

	// Calculate total for this category
	let categoryTotal = 0;
	invoiceTasks.forEach((invoice) => {
		const amount = window.extractTotalFromTaskText(invoice.text);
		if (amount) {
			const numericAmount = parseFloat(amount.replace(/[^\d.-]/g, ""));
			if (!isNaN(numericAmount)) {
				categoryTotal += numericAmount;
			}
		}
	});

	// Generate invoice list HTML
	let invoiceListHTML = "";
	if (invoiceTasks.length === 0) {
		invoiceListHTML = `<div class="empty-state">No ${statusTitle.toLowerCase()} found</div>`;
	} else {
		invoiceListHTML = invoiceTasks
			.map((invoice) => {
				const amount =
					window.extractTotalFromTaskText(invoice.text) || "N/A";
				const daysAgo = Math.floor(
					(new Date() - new Date(invoice.createdAt)) /
						(1000 * 60 * 60 * 24)
				);
				const isOverdue =
					invoice.dueDate &&
					new Date(invoice.dueDate) < new Date() &&
					invoice.status !== "completed";

				return `
				<div class="invoice-detail-item" ${
					isOverdue ? 'style="border-left: 3px solid #ff6b6b;"' : ""
				}>
					<div class="invoice-detail-header">
						<span class="invoice-amount" style="color: ${statusColor}; font-weight: bold;">${amount}</span>
						<span class="invoice-date">${
							daysAgo === 0
								? "Today"
								: daysAgo === 1
								? "1 day ago"
								: `${daysAgo} days ago`
						}</span>
						${isOverdue ? '<span class="overdue-badge">OVERDUE</span>' : ""}
					</div>
					<div class="invoice-description">
						${window.escapeHtml(invoice.text.split("\n")[0])}
					</div>
					<div class="invoice-metadata">
						Created: ${window.formatDate(invoice.createdAt)}
						${invoice.dueDate ? " | Due: " + window.formatDate(invoice.dueDate) : ""}
						${
							invoice.completedAt
								? " | Completed: " +
								  window.formatDate(invoice.completedAt)
								: ""
						}
						${
							invoice.approvedAt
								? " | Approved: " +
								  window.formatDate(invoice.approvedAt)
								: ""
						}
					</div>
					<div class="invoice-actions">
						<button class="action-btn check-btn" onclick="window.viewCostTrackerTask(${
							invoice.id
						})">View Full Invoice</button>
						${
							filterStatus === "pending_approval"
								? `<button class="action-btn approve-btn" onclick="window.approveInvoice(${invoice.id}); window.hideModal();">Approve Payment</button>
							 <button class="action-btn reject-btn" onclick="window.rejectTask(${invoice.id}); window.hideModal();">Deny Payment</button>`
								: ""
						}
					</div>
				</div>
			`;
			})
			.join("");
	}

	const modalContent = `
		<div class="invoice-details-modal">
			<h3 style="color: ${statusColor};">${statusIcon} ${statusTitle}</h3>
			<div class="invoice-summary">
				<div class="summary-stat">
					<span class="summary-label">Total Count:</span>
					<span class="summary-value">${invoiceTasks.length}</span>
				</div>
				<div class="summary-stat">
					<span class="summary-label">Total Amount:</span>
					<span class="summary-value" style="color: ${statusColor};">€${categoryTotal.toFixed(
		2
	)}</span>
				</div>
				<div class="summary-stat">
					<span class="summary-label">Average:</span>
					<span class="summary-value">€${
						invoiceTasks.length > 0
							? (categoryTotal / invoiceTasks.length).toFixed(2)
							: "0.00"
					}</span>
				</div>
			</div>
			<hr style="border-color: var(--terminal-green); margin: 20px 0;">
			<div class="invoice-details-list" style="max-height: 400px; overflow-y: auto;">
				${invoiceListHTML}
			</div>
			<div class="modal-actions" style="margin-top: 20px;">
				<button class="action-btn approve-btn" onclick="window.exportInvoiceData('${filterStatus}')">Export Data</button>
				<button class="action-btn delete-btn" onclick="window.hideModal()">Close</button>
			</div>
		</div>
	`;

	window.showModal(modalContent);
};

/**
 * NEW: Exports invoice data to CSV
 */
window.exportInvoiceData = function (filterStatus) {
	const invoiceTasks = window.tasks.filter(
		(t) => t.type === "cost-tracker" && t.status === filterStatus
	);

	if (invoiceTasks.length === 0) {
		window.showNotification("No invoices to export", "warning");
		return;
	}

	// Create CSV content
	let csvContent =
		"Invoice ID,Amount,Status,Created Date,Due Date,Completed Date,Approved Date,Description\n";

	invoiceTasks.forEach((invoice) => {
		const amount = window.extractTotalFromTaskText(invoice.text) || "N/A";
		const numericAmount =
			amount !== "N/A" ? amount.replace(/[^\d.-]/g, "") : "0";
		const description = invoice.text.split("\n")[0].replace(/"/g, '""'); // Escape quotes for CSV

		csvContent += `${invoice.id},"${numericAmount}","${invoice.status}","${
			invoice.createdAt
		}","${invoice.dueDate || ""}","${invoice.completedAt || ""}","${
			invoice.approvedAt || ""
		}","${description}"\n`;
	});

	// Create and download CSV file
	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.setAttribute("href", url);
	link.setAttribute(
		"download",
		`invoices_${filterStatus}_${new Date().toISOString().split("T")[0]}.csv`
	);
	link.style.visibility = "hidden";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	window.showNotification(
		`Invoice data exported successfully! (${invoiceTasks.length} records)`,
		"success"
	);
};

/**
 * NEW: Helper function to hide modal (improved version)
 */
window.hideModal = function () {
	const modal = document.getElementById("eventModal");
	if (modal) {
		modal.classList.add("hidden");
	}
};

/**
 * NEW: Get monthly invoice trends for dashboard analytics
 */
window.getMonthlyInvoiceTrends = function (months = 6) {
	const invoiceTasks = window.tasks.filter((t) => t.type === "cost-tracker");
	const trends = {};
	const now = new Date();

	// Initialize months
	for (let i = months - 1; i >= 0; i--) {
		const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
		const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
			.toString()
			.padStart(2, "0")}`;
		trends[monthKey] = {
			month: date.toLocaleString("default", {
				month: "long",
				year: "numeric",
			}),
			paid: { count: 0, amount: 0 },
			pending: { count: 0, amount: 0 },
			denied: { count: 0, amount: 0 },
			total: { count: 0, amount: 0 },
		};
	}

	// Populate data
	invoiceTasks.forEach((invoice) => {
		const date = new Date(invoice.createdAt);
		const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
			.toString()
			.padStart(2, "0")}`;

		if (trends[monthKey]) {
			const amount = window.extractTotalFromTaskText(invoice.text);
			const numericAmount = amount
				? parseFloat(amount.replace(/[^\d.-]/g, ""))
				: 0;

			trends[monthKey].total.count++;
			trends[monthKey].total.amount += numericAmount;

			switch (invoice.status) {
				case "completed":
					trends[monthKey].paid.count++;
					trends[monthKey].paid.amount += numericAmount;
					break;
				case "pending_approval":
					trends[monthKey].pending.count++;
					trends[monthKey].pending.amount += numericAmount;
					break;
				case "failed":
					trends[monthKey].denied.count++;
					trends[monthKey].denied.amount += numericAmount;
					break;
			}
		}
	});

	return trends;
};

/**
 * NEW: Display monthly trends in console (for debugging/analysis)
 */
window.showMonthlyInvoiceTrends = function (months = 6) {
	const trends = window.getMonthlyInvoiceTrends(months);

	console.log("=== MONTHLY INVOICE TRENDS ===");
	console.table(
		Object.entries(trends).map(([key, data]) => ({
			Month: data.month,
			"Total Count": data.total.count,
			"Total Amount": `€${data.total.amount.toFixed(2)}`,
			"Paid Count": data.paid.count,
			"Paid Amount": `€${data.paid.amount.toFixed(2)}`,
			"Pending Count": data.pending.count,
			"Pending Amount": `€${data.pending.amount.toFixed(2)}`,
			"Denied Count": data.denied.count,
			"Denied Amount": `€${data.denied.amount.toFixed(2)}`,
		}))
	);

	return trends;
};

/**
 * NEW: Advanced invoice analytics function
 */
window.getInvoiceAnalytics = function () {
	const invoiceTasks = window.tasks.filter((t) => t.type === "cost-tracker");
	const now = new Date();
	const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
	const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

	const analytics = {
		overview: {
			totalInvoices: invoiceTasks.length,
			totalValue: 0,
			averageValue: 0,
			paidPercentage: 0,
			pendingPercentage: 0,
			deniedPercentage: 0,
		},
		timeframes: {
			last7Days: { count: 0, value: 0, paid: 0, pending: 0, denied: 0 },
			last30Days: { count: 0, value: 0, paid: 0, pending: 0, denied: 0 },
			allTime: { count: 0, value: 0, paid: 0, pending: 0, denied: 0 },
		},
		performance: {
			averageTimeToPayment: 0, // in days
			overdueInvoices: 0,
			overdueValue: 0,
		},
	};

	let totalPaymentTime = 0;
	let paidInvoicesWithTime = 0;

	invoiceTasks.forEach((invoice) => {
		const amount = window.extractTotalFromTaskText(invoice.text);
		const numericAmount = amount
			? parseFloat(amount.replace(/[^\d.-]/g, ""))
			: 0;
		const createdDate = new Date(invoice.createdAt);

		analytics.overview.totalValue += numericAmount;
		analytics.timeframes.allTime.count++;
		analytics.timeframes.allTime.value += numericAmount;

		// Check timeframes
		if (createdDate >= sevenDaysAgo) {
			analytics.timeframes.last7Days.count++;
			analytics.timeframes.last7Days.value += numericAmount;
		}
		if (createdDate >= thirtyDaysAgo) {
			analytics.timeframes.last30Days.count++;
			analytics.timeframes.last30Days.value += numericAmount;
		}

		// Status tracking
		switch (invoice.status) {
			case "completed":
				analytics.timeframes.allTime.paid++;
				if (createdDate >= sevenDaysAgo)
					analytics.timeframes.last7Days.paid++;
				if (createdDate >= thirtyDaysAgo)
					analytics.timeframes.last30Days.paid++;

				// Calculate payment time
				if (invoice.approvedAt) {
					const paymentTime =
						(new Date(invoice.approvedAt) - createdDate) /
						(1000 * 60 * 60 * 24);
					totalPaymentTime += paymentTime;
					paidInvoicesWithTime++;
				}
				break;
			case "pending_approval":
				analytics.timeframes.allTime.pending++;
				if (createdDate >= sevenDaysAgo)
					analytics.timeframes.last7Days.pending++;
				if (createdDate >= thirtyDaysAgo)
					analytics.timeframes.last30Days.pending++;
				break;
			case "failed":
				analytics.timeframes.allTime.denied++;
				if (createdDate >= sevenDaysAgo)
					analytics.timeframes.last7Days.denied++;
				if (createdDate >= thirtyDaysAgo)
					analytics.timeframes.last30Days.denied++;
				break;
		}

		// Check for overdue
		if (invoice.dueDate && invoice.status !== "completed") {
			const dueDate = new Date(invoice.dueDate);
			if (dueDate < now) {
				analytics.performance.overdueInvoices++;
				analytics.performance.overdueValue += numericAmount;
			}
		}
	});

	// Calculate percentages and averages
	if (analytics.overview.totalInvoices > 0) {
		analytics.overview.averageValue =
			analytics.overview.totalValue / analytics.overview.totalInvoices;
		analytics.overview.paidPercentage =
			(analytics.timeframes.allTime.paid /
				analytics.overview.totalInvoices) *
			100;
		analytics.overview.pendingPercentage =
			(analytics.timeframes.allTime.pending /
				analytics.overview.totalInvoices) *
			100;
		analytics.overview.deniedPercentage =
			(analytics.timeframes.allTime.denied /
				analytics.overview.totalInvoices) *
			100;
	}

	if (paidInvoicesWithTime > 0) {
		analytics.performance.averageTimeToPayment =
			totalPaymentTime / paidInvoicesWithTime;
	}

	return analytics;
};

/**
 * NEW: Console function to display comprehensive invoice analytics
 */
window.showInvoiceAnalytics = function () {
	const analytics = window.getInvoiceAnalytics();

	console.log("=== COMPREHENSIVE INVOICE ANALYTICS ===");
	console.log("");
	console.log("📊 OVERVIEW:");
	console.log(`Total Invoices: ${analytics.overview.totalInvoices}`);
	console.log(`Total Value: €${analytics.overview.totalValue.toFixed(2)}`);
	console.log(
		`Average Value: €${analytics.overview.averageValue.toFixed(2)}`
	);
	console.log(`Paid: ${analytics.overview.paidPercentage.toFixed(1)}%`);
	console.log(`Pending: ${analytics.overview.pendingPercentage.toFixed(1)}%`);
	console.log(`Denied: ${analytics.overview.deniedPercentage.toFixed(1)}%`);
	console.log("");
	console.log("⏰ TIMEFRAME BREAKDOWN:");
	console.log("Last 7 Days:", analytics.timeframes.last7Days);
	console.log("Last 30 Days:", analytics.timeframes.last30Days);
	console.log("All Time:", analytics.timeframes.allTime);
	console.log("");
	console.log("🎯 PERFORMANCE METRICS:");
	console.log(
		`Average Time to Payment: ${analytics.performance.averageTimeToPayment.toFixed(
			1
		)} days`
	);
	console.log(`Overdue Invoices: ${analytics.performance.overdueInvoices}`);
	console.log(
		`Overdue Value: €${analytics.performance.overdueValue.toFixed(2)}`
	);

	return analytics;
};

console.log("=== Invoice Dashboard Enhancement Loaded ===");
console.log("Available functions:");
console.log("- window.debugInvoiceStats() - Basic invoice statistics");
console.log("- window.showInvoiceAnalytics() - Comprehensive analytics");
console.log("- window.showMonthlyInvoiceTrends(months) - Monthly trends");
console.log("- window.getInvoiceAnalytics() - Get analytics data");
console.log("- Click on invoice stat cards in dashboard for detailed views");
console.log("");
