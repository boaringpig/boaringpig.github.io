// ui.modals.js
// This file contains all the modal-related UI functions.

/**
 * Displays a generic modal with custom content.
 * @param {string} htmlContent - HTML content to display in the modal.
 */
window.showModal = function (htmlContent) {
	var modal = document.getElementById("eventModal");
	var modalContent = document.getElementById("modalContent");
	var closeButton = document.getElementById("closeModal");
	if (modal && modalContent) {
		modalContent.innerHTML = htmlContent;
		modal.classList.remove("hidden");
		if (closeButton) {
			closeButton.onclick = function () {
				modal.classList.add("hidden");
			};
		}
		modal.onclick = function (e) {
			if (e.target === modal) {
				modal.classList.add("hidden");
			}
		};
	}
};

/**
 * Displays a generic confirmation modal with "Confirm" and "Cancel" buttons.
 * @param {string} message - The message to display in the modal.
 * @param {function(boolean): void} onConfirm - Callback function invoked with `true` if confirmed, `false` if canceled.
 */
window.showConfirmModal = function (message, onConfirm) {
	var modal = document.createElement("div");
	modal.className = "modal-overlay";
	modal.innerHTML =
		'<div class="modal-content">' +
		"<p>" +
		message +
		"</p>" +
		'<div class="modal-actions">' +
		'<button id="modalConfirm" class="action-btn approve-btn">Confirm</button>' +
		'<button id="modalCancel" class="action-btn delete-btn">Cancel</button>' +
		"</div>" +
		"</div>";
	document.body.appendChild(modal);
	document.getElementById("modalConfirm").onclick = function () {
		onConfirm(true);
		document.body.removeChild(modal);
	};
	document.getElementById("modalCancel").onclick = function () {
		onConfirm(false);
		document.body.removeChild(modal);
	};
};

/**
 * Displays a modal specifically for appealing a demerit task, including a text input for the reason.
 * @param {object} task - The demerit task object being appealed.
 * @param {function(string): void} onSubmit - Callback function invoked with the appeal text when submitted.
 */
window.showAppealModal = function (task, onSubmit) {
	var modal = document.createElement("div");
	modal.className = "modal-overlay";
	modal.innerHTML =
		'<div class="modal-content">' +
		"<h3>Appeal Demerit Task</h3>" +
		"<p><strong>Task:</strong> " +
		window.escapeHtml(task.text) +
		"</p>" +
		"<p><strong>Penalty:</strong> -" +
		task.penaltyPoints +
		" points</p>" +
		'<div class="appeal-warning">' +
		'<div class="warning-title">⚠️ Appeal Risk Warning</div>' +
		"<div>If approved: +" +
		task.penaltyPoints +
		" points restored</div>" +
		"<div>If denied: -" +
		task.penaltyPoints +
		" additional points (double penalty)</div>" +
		"<div><strong>Total risk if denied: " +
		task.penaltyPoints * 2 +
		" points</strong></div>" +
		"</div>" +
		'<div class="form-group">' +
		'<label class="form-label" for="appealTextInput">Reason for Appeal (Required)</label>' +
		'<textarea id="appealTextInput" class="form-input" rows="4" placeholder="Explain why you are appealing this demerit..."></textarea>' +
		"</div>" +
		'<div id="appealError" class="error-message" style="display:none; margin-top: 10px;"></div>' +
		'<div class="modal-actions">' +
		'<button id="modalSubmitAppeal" class="action-btn approve-btn">Submit Appeal</button>' +
		'<button id="modalCancelAppeal" class="action-btn delete-btn">Cancel</button>' +
		"</div>" +
		"</div>";
	document.body.appendChild(modal);

	document.getElementById("modalSubmitAppeal").onclick = function () {
		var appealText = document
			.getElementById("appealTextInput")
			.value.trim();
		var appealError = document.getElementById("appealError");
		if (appealText.length < 10) {
			appealError.textContent =
				"Appeal text must be at least 10 characters long.";
			appealError.style.display = "block";
		} else {
			onSubmit(appealText);
			document.body.removeChild(modal);
		}
	};
	document.getElementById("modalCancelAppeal").onclick = function () {
		document.body.removeChild(modal);
	};
};
