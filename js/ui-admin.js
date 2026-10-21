// ui-admin.js
// UI for the super-admin "Manage Masters" panel: listing masters, creating
// new ones, and editing their account/terminology.

/**
 * Reads the "Create New Master" form and creates the master account.
 */
window.handleCreateMaster = async function () {
	var usernameEl = document.getElementById("newMasterUsername");
	var passwordEl = document.getElementById("newMasterPassword");
	var displayNameEl = document.getElementById("newMasterDisplayName");
	var groupLabelEl = document.getElementById("newMasterGroupLabel");
	var masterLabelEl = document.getElementById("newMasterLabel");
	var masterLabelPluralEl = document.getElementById("newMasterLabelPlural");
	var slaveLabelEl = document.getElementById("newSlaveLabel");
	var slaveLabelPluralEl = document.getElementById("newSlaveLabelPlural");
	var isAdminEl = document.getElementById("newMasterIsAdmin");

	var created = await window.createMaster({
		username: usernameEl ? usernameEl.value : "",
		password: passwordEl ? passwordEl.value : "",
		displayName: displayNameEl ? displayNameEl.value : "",
		groupLabel: groupLabelEl ? groupLabelEl.value.trim() : "",
		masterLabel: masterLabelEl ? masterLabelEl.value.trim() : "",
		masterLabelPlural: masterLabelPluralEl
			? masterLabelPluralEl.value.trim()
			: "",
		slaveLabel: slaveLabelEl ? slaveLabelEl.value.trim() : "",
		slaveLabelPlural: slaveLabelPluralEl
			? slaveLabelPluralEl.value.trim()
			: "",
		isAdmin: isAdminEl ? isAdminEl.checked : false,
	});

	if (created) {
		[
			usernameEl,
			passwordEl,
			displayNameEl,
			groupLabelEl,
			masterLabelEl,
			masterLabelPluralEl,
			slaveLabelEl,
			slaveLabelPluralEl,
		].forEach(function (el) {
			if (el) el.value = "";
		});
		if (isAdminEl) isAdminEl.checked = false;
		await window.renderMastersList();
	}
};

/**
 * Renders the list of all masters with edit/deactivate controls.
 */
window.renderMastersList = async function () {
	var container = document.getElementById("mastersList");
	if (!container) return;

	var masters = await window.fetchAllMasters();

	if (!masters || masters.length === 0) {
		container.innerHTML = '<div class="empty-state">No masters yet.</div>';
		return;
	}

	container.innerHTML = masters
		.map(function (m) {
			var isActive = m.status === "active";
			return (
				'<div class="task-item ' +
				(isActive ? "" : "completed") +
				'">' +
				'<div class="task-content">' +
				"<div>" +
				'<span class="status-badge ' +
				(isActive ? "status-todo" : "status-completed") +
				'">' +
				(isActive ? "Active" : "Inactive") +
				"</span>" +
				(m.isAdmin
					? ' <span class="status-badge status-todo">Admin</span>'
					: "") +
				(m.classicUiForced
					? ' <span class="status-badge status-todo">Classic Only</span>'
					: "") +
				'<span class="task-text">' +
				window.escapeHtml(m.displayName) +
				" (" +
				window.escapeHtml(m.username) +
				")</span>" +
				'<div class="task-meta">' +
				"Group: " +
				window.escapeHtml(m.groupLabel) +
				" &middot; " +
				window.escapeHtml(m.masterLabel) +
				" / " +
				window.escapeHtml(m.slaveLabel) +
				"</div>" +
				"</div>" +
				'<div class="task-actions">' +
				'<button class="action-btn check-btn" onclick="window.showEditMasterModal(\'' +
				m.username +
				"')\">Edit</button>" +
				(isActive
					? '<button class="action-btn reject-btn" onclick="window.deactivateMaster(\'' +
						m.username +
						"')\">Deactivate</button>"
					: '<button class="action-btn approve-btn" onclick="window.reactivateMaster(\'' +
						m.username +
						"')\">Reactivate</button>") +
				"</div>" +
				"</div>" +
				"</div>"
			);
		})
		.join("");
};

/**
 * Opens a modal to edit a master's account details and group terminology.
 */
window.showEditMasterModal = async function (masterUsername) {
	var master = (window.allMasters || []).find(function (m) {
		return m.username === masterUsername;
	});
	if (!master) return;

	var modal = document.createElement("div");
	modal.className = "modal-overlay";
	modal.innerHTML =
		'<div class="modal-content">' +
		"<h3>Edit " +
		window.escapeHtml(master.username) +
		"</h3>" +
		'<div class="form-group">' +
		'<label class="form-label">Display Name</label>' +
		'<input type="text" id="editMasterDisplayName" class="form-input" value="' +
		window.escapeHtml(master.displayName) +
		'" />' +
		"</div>" +
		'<div class="form-group">' +
		'<label class="form-label">New Password (leave blank to keep current)</label>' +
		'<input type="password" id="editMasterPassword" class="form-input" placeholder="New password" />' +
		"</div>" +
		'<div class="form-group">' +
		'<label class="form-label"><input type="checkbox" id="editMasterIsAdmin" ' +
		(master.isAdmin ? "checked" : "") +
		" /> Admin access</label>" +
		"</div>" +
		'<div class="form-row">' +
		'<div class="form-group"><label class="form-label">Group Label</label>' +
		'<input type="text" id="editGroupLabel" class="form-input" value="' +
		window.escapeHtml(master.groupLabel) +
		'" /></div>' +
		'<div class="form-group"><label class="form-label">Master Label</label>' +
		'<input type="text" id="editMasterLabel" class="form-input" value="' +
		window.escapeHtml(master.masterLabel) +
		'" /></div>' +
		"</div>" +
		'<div class="form-row">' +
		'<div class="form-group"><label class="form-label">Master Label (Plural)</label>' +
		'<input type="text" id="editMasterLabelPlural" class="form-input" value="' +
		window.escapeHtml(master.masterLabelPlural) +
		'" /></div>' +
		'<div class="form-group"><label class="form-label">Slave Label</label>' +
		'<input type="text" id="editSlaveLabel" class="form-input" value="' +
		window.escapeHtml(master.slaveLabel) +
		'" /></div>' +
		"</div>" +
		'<div class="form-group"><label class="form-label">Slave Label (Plural)</label>' +
		'<input type="text" id="editSlaveLabelPlural" class="form-input" value="' +
		window.escapeHtml(master.slaveLabelPlural) +
		'" /></div>' +
		'<hr style="margin: 12px 0; border-color: var(--border-color, #333);" />' +
		'<div class="form-group">' +
		'<label class="form-label"><input type="checkbox" id="editClassicUiForced" ' +
		(master.classicUiForced ? "checked" : "") +
		' /> Force classic styling for this group (disable beta)</label>' +
		"</div>" +
		'<div class="form-row">' +
		'<div class="form-group"><label class="form-label">Background</label>' +
		'<input type="color" id="editThemeBg" value="' +
		master.theme.bg +
		'" /></div>' +
		'<div class="form-group"><label class="form-label">Card</label>' +
		'<input type="color" id="editThemeCard" value="' +
		master.theme.card +
		'" /></div>' +
		'<div class="form-group"><label class="form-label">Elevated</label>' +
		'<input type="color" id="editThemeElevated" value="' +
		master.theme.elevated +
		'" /></div>' +
		"</div>" +
		'<div class="form-row">' +
		'<div class="form-group"><label class="form-label">Primary text</label>' +
		'<input type="color" id="editThemeTextPrimary" value="' +
		master.theme.textPrimary +
		'" /></div>' +
		'<div class="form-group"><label class="form-label">Secondary text</label>' +
		'<input type="color" id="editThemeTextSecondary" value="' +
		master.theme.textSecondary +
		'" /></div>' +
		"</div>" +
		'<div id="contrastChecklist" style="font-size: 12px; margin-bottom: 12px;"></div>' +
		'<div class="modal-actions">' +
		'<button id="modalSaveMaster" class="action-btn approve-btn">Save</button>' +
		'<button id="modalCancelMaster" class="action-btn delete-btn">Cancel</button>' +
		"</div>" +
		"</div>";
	document.body.appendChild(modal);

	function readTheme() {
		return {
			bg: document.getElementById("editThemeBg").value,
			card: document.getElementById("editThemeCard").value,
			elevated: document.getElementById("editThemeElevated").value,
			textPrimary: document.getElementById("editThemeTextPrimary").value,
			textSecondary: document.getElementById("editThemeTextSecondary").value,
		};
	}

	function refreshContrastChecklist() {
		var checklistEl = document.getElementById("contrastChecklist");
		if (!checklistEl || !window.ContrastUtils) return;
		var results = window.ContrastUtils.checkThemeContrast(readTheme());
		checklistEl.innerHTML = results
			.map(function (r) {
				var ratioText = r.ratio ? r.ratio.toFixed(1) + ":1" : "n/a";
				var icon = r.passes ? "✅" : "⚠️";
				return (
					"<div>" +
					icon +
					" " +
					window.escapeHtml(r.label) +
					" &mdash; " +
					ratioText +
					" (needs " +
					r.required +
					":1)</div>"
				);
			})
			.join("");
	}

	[
		"editThemeBg",
		"editThemeCard",
		"editThemeElevated",
		"editThemeTextPrimary",
		"editThemeTextSecondary",
	].forEach(function (id) {
		document.getElementById(id).addEventListener("input", refreshContrastChecklist);
	});
	refreshContrastChecklist();

	document.getElementById("modalSaveMaster").onclick = async function () {
		var displayName = document
			.getElementById("editMasterDisplayName")
			.value.trim();
		var password = document.getElementById("editMasterPassword").value;
		var isAdmin = document.getElementById("editMasterIsAdmin").checked;

		await window.updateMasterAccount(masterUsername, {
			displayName: displayName,
			password: password,
			isAdmin: isAdmin,
		});

		await window.updateMasterTerminology(masterUsername, {
			groupLabel: document.getElementById("editGroupLabel").value.trim(),
			masterLabel: document.getElementById("editMasterLabel").value.trim(),
			masterLabelPlural: document
				.getElementById("editMasterLabelPlural")
				.value.trim(),
			slaveLabel: document.getElementById("editSlaveLabel").value.trim(),
			slaveLabelPlural: document
				.getElementById("editSlaveLabelPlural")
				.value.trim(),
			classicUiForced: document.getElementById("editClassicUiForced").checked,
			theme: readTheme(),
		});

		document.body.removeChild(modal);
		await window.loadUsersFromDB();
		await window.renderMastersList();
	};
	document.getElementById("modalCancelMaster").onclick = function () {
		document.body.removeChild(modal);
	};
	modal.onclick = function (e) {
		if (e.target === modal) {
			document.body.removeChild(modal);
		}
	};
};
