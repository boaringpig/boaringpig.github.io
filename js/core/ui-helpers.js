// ui.helpers.js
// This file contains general-purpose UI helper functions.

/**
 * Displays an error message on the login screen.
 * @param {string} message - The error message to display.
 */
window.showError = function (message) {
	var errorDiv = document.getElementById("errorMessage");
	if (errorDiv) {
		errorDiv.textContent = message;
		errorDiv.style.display = "block";
	}
};

/**
 * Displays a success message on the login screen.
 * @param {string} message - The success message to display.
 */
window.showSuccess = function (message) {
	var successDiv = document.getElementById("successMessage");
	if (successDiv) {
		successDiv.textContent = message;
		successDiv.style.display = "block";
	}
};

/**
 * Hides both error and success messages on the login screen.
 */
window.hideError = function () {
	var errorDiv = document.getElementById("errorMessage");
	var successDiv = document.getElementById("successMessage");
	if (errorDiv) errorDiv.style.display = "none";
	if (successDiv) successDiv.style.display = "none";
};

/**
 * Displays a transient notification at the top right of the screen.
 * @param {string} message - The message to display.
 * @param {string} type - The type of notification (e.g., 'success', 'error', 'warning').
 */
window.showNotification = function (message, type) {
	if (typeof type === "undefined") type = "success";
	var notification = document.createElement("div");
	notification.className = "notification " + type;
	notification.textContent = message;
	document.body.appendChild(notification);
	setTimeout(function () {
		notification.classList.add("show");
	}, 100);
	setTimeout(function () {
		notification.classList.remove("show");
		setTimeout(function () {
			if (document.body.contains(notification)) {
				document.body.removeChild(notification);
			}
		}, 300);
	}, 3000);
};

/**
 * Escapes HTML characters in a string to prevent XSS.
 * @param {string} text - The text to escape.
 * @returns {string} The escaped HTML string.
 */
window.escapeHtml = function (text) {
	var div = document.createElement("div");
	div.textContent = text;
	return div.innerHTML.replace(/`/g, "&#96;");
};

/**
 * Formats an ISO date string into a localized date and time string.
 * @param {string} dateString - The ISO date string to format.
 * @returns {string} The formatted date and time string, or an empty string if input is null/empty.
 */
window.formatDate = function (dateString) {
	if (!dateString) return "";
	var date = new Date(dateString);
	return (
		date.toLocaleDateString() +
		" " +
		date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
	);
};

/**
 * Returns the appropriate CSS class for a task status badge.
 * @param {string} status - The primary status of the task.
 * @param {boolean} isOverdue - True if the task is overdue.
 * @param {string} type - The type of task ('regular', 'demerit', 'cost-tracker').
 * @param {string} appealStatus - The appeal status of a demerit task.
 * @returns {string} The CSS class name for the status badge.
 */
window.getStatusClass = function (status, isOverdue, type, appealStatus) {
	if (type === "cost-tracker") {
		if (status === "pending_approval") return "status-pending";
		if (status === "completed") return "status-completed";
		if (status === "failed") return "status-overdue";
		return "status-pending";
	}
	if (type === "demerit") {
		if (appealStatus === "pending") return "status-pending-appeal";
		if (appealStatus === "approved") return "status-completed";
		if (appealStatus === "denied") return "status-overdue";
		if (status === "demerit_accepted") return "status-demerit-accepted";
		return "status-demerit";
	}
	if (isOverdue) return "status-overdue";
	if (status === "completed") return "status-completed";
	if (status === "failed") return "status-overdue";
	return "status-pending";
};

/**
 * Returns the human-readable text for a task status.
 * @param {string} status - The primary status of the task.
 * @param {boolean} isOverdue - True if the task is overdue.
 * @param {string} type - The type of task ('regular', 'demerit', 'cost-tracker').
 * @param {string} appealStatus - The appeal status of a demerit task.
 * @returns {string} The display text for the task status.
 */
window.getStatusText = function (status, isOverdue, type, appealStatus) {
	if (type === "cost-tracker") {
		if (status === "todo") return "Payment Required";
		if (status === "pending_approval") return "Payment Pending Approval";
		if (status === "completed") return "Payment Approved";
		if (status === "failed") return "Payment Denied";
		return "Invoice";
	}
	if (type === "demerit") {
		if (appealStatus === "pending") return "Appeal Pending";
		if (appealStatus === "approved") return "Appeal Approved";
		if (appealStatus === "denied") return "Appeal Denied";
		if (status === "demerit_accepted") return "Demerit Accepted";
		return "Demerit Issued";
	}
	if (isOverdue) return "Overdue";
	if (status === "completed") return "Completed";
	if (status === "failed") return "Failed";
	if (status === "pending_approval") return "Pending Approval";
	return "To Do";
};

/**
 * Returns the appropriate CSS class for a suggestion status badge.
 * @param {string} status - The status of the suggestion.
 * @returns {string} The CSS class name.
 */
window.getSuggestionStatusClass = function (status) {
	switch (status) {
		case "approved":
			return "status-completed";
		case "rejected":
			return "status-overdue";
		default:
			return "status-pending";
	}
};

/**
 * Checks if a task is overdue.
 * @param {object} task - The task object.
 * @returns {boolean} True if the task is overdue and not completed, false otherwise.
 */
window.isTaskOverdue = function (task) {
	if (!task.dueDate || task.status === "completed") return false;
	return new Date(task.dueDate) < new Date();
};

/**
 * Extracts the total amount from a cost tracker task text.
 * @param {string} taskText - The task text containing cost information.
 * @returns {string|null} The total amount string or null if not found.
 */
window.extractTotalFromTaskText = function (taskText) {
	const totalMatch = taskText.match(/TOTAL AMOUNT DUE:\s*([€£$]\d+\.\d+)/);
	return totalMatch ? totalMatch[1] : null;
};
