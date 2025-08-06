// database-cost-trackers.js
// This file contains all the database-related functions for active cost trackers.

/**
 * Fetches all active cost trackers from Supabase.
 */
window.fetchActiveCostTrackersInitial = async function () {
	const { data, error } = await window.supabase
		.from("active_cost_trackers")
		.select("*")
		.eq("status", "running");

	if (error) {
		console.error("Error fetching active cost trackers:", error);
		window.showError("Failed to load active cost trackers.");
	} else {
		window.activeCostTrackers = data.sort(
			(a, b) => new Date(b.started_at) - new Date(a.started_at)
		);

		// Update UI for both admin and user views
		if (window.currentUser === "skeen") {
			window.renderActiveCostTrackersAdmin();
			window.updateActiveCostTrackersCount();
		} else if (window.currentUser === "schinken") {
			window.updateLiveCostTracker();
		}
	}
};

/**
 * Stops all active cost trackers (ensures only one tracker at a time)
 */
window.stopAllActiveCostTrackers = async function () {
	if (!window.hasPermission("create_task")) {
		return;
	}

	const { data: activeTrackers, error: fetchError } = await window.supabase
		.from("active_cost_trackers")
		.select("*")
		.eq("status", "running");

	if (fetchError) {
		console.error("Error fetching active trackers:", fetchError);
		return;
	}

	if (activeTrackers && activeTrackers.length > 0) {
		console.log(`Stopping ${activeTrackers.length} active tracker(s)`);

		// Update all running trackers to stopped
		const { error: updateError } = await window.supabase
			.from("active_cost_trackers")
			.update({
				status: "stopped",
				updated_at: new Date().toISOString(),
			})
			.eq("status", "running");

		if (updateError) {
			console.error("Error stopping active trackers:", updateError);
		} else {
			console.log("All active trackers stopped");
		}
	}
};

/**
 * Starts a new live cost tracker (Admin only) - ensures single tracker
 */
window.startLiveCostTracker = async function (
	description,
	rate,
	currency,
	incrementInterval,
	initialPenalties = []
) {
	if (!window.hasPermission("create_task")) {
		window.showNotification(
			"You do not have permission to start cost trackers",
			"error"
		);
		return;
	}

	// First stop any existing active trackers to ensure only one at a time
	await window.stopAllActiveCostTrackers();

	const tracker = {
		created_by: window.currentUser,
		started_at: new Date().toISOString(),
		description: description || "Cost Tracker Running",
		rate: rate || 50.0,
		currency: currency || "€",
		increment_interval: incrementInterval || 60000,
		penalties: JSON.stringify(initialPenalties), // Include initial penalties
		status: "running",
	};

	const { data, error } = await window.supabase
		.from("active_cost_trackers")
		.insert([tracker])
		.select()
		.single();

	if (error) {
		console.error("Error starting cost tracker:", error);
		window.showNotification("Failed to start cost tracker.", "error");
	} else {
		window.showNotification("Live cost tracker started successfully!");
		window.activeLiveTrackerId = data.id;
		await window.fetchActiveCostTrackersInitial();
		return data.id;
	}
};

/**
 * Stops a live cost tracker and optionally creates an invoice task
 */
window.stopLiveCostTracker = async function (trackerId, createInvoice = true) {
	if (!window.hasPermission("create_task")) {
		window.showNotification(
			"You do not have permission to stop cost trackers",
			"error"
		);
		return;
	}

	const { data: tracker, error: fetchError } = await window.supabase
		.from("active_cost_trackers")
		.select("*")
		.eq("id", trackerId)
		.single();

	if (fetchError) {
		console.error("Error fetching tracker:", fetchError);
		return;
	}

	// Update tracker status to stopped
	const { error: updateError } = await window.supabase
		.from("active_cost_trackers")
		.update({
			status: "stopped",
			updated_at: new Date().toISOString(),
		})
		.eq("id", trackerId);

	if (updateError) {
		console.error("Error stopping tracker:", updateError);
		window.showNotification("Failed to stop cost tracker.", "error");
		return;
	}

	if (createInvoice) {
		// Calculate final cost
		const startTime = new Date(tracker.started_at);
		const endTime = new Date();
		const elapsedMs = endTime - startTime;
		const fractionalUnits = elapsedMs / tracker.increment_interval;
		const timeCost = fractionalUnits * tracker.rate;

		// Calculate penalties total - FIX: properly parse JSON
		let penalties = [];
		try {
			penalties = JSON.parse(tracker.penalties || "[]");
		} catch (e) {
			console.error("Error parsing penalties:", e);
			penalties = [];
		}
		const penaltyTotal = penalties.reduce(
			(sum, penalty) => sum + (penalty.amount || 0),
			0
		);
		const grandTotal = timeCost + penaltyTotal;

		// Create invoice task
		const hours = Math.floor(elapsedMs / (1000 * 60 * 60));
		const minutes = Math.floor(
			(elapsedMs % (1000 * 60 * 60)) / (1000 * 60)
		);
		const seconds = Math.floor((elapsedMs % (1000 * 60)) / 1000);
		const timeText =
			hours > 0
				? `${hours}h ${minutes}m ${seconds}s`
				: minutes > 0
				? `${minutes}m ${seconds}s`
				: `${seconds}s`;

		const intervalText =
			tracker.increment_interval === 1000
				? "second"
				: tracker.increment_interval === 60000
				? "minute"
				: "hour";

		let taskDescription = `💰 INVOICE - ${tracker.description}

Time-based Cost: ${timeText} @ ${tracker.currency}${tracker.rate.toFixed(
			2
		)} per ${intervalText} = ${tracker.currency}${timeCost.toFixed(2)}`;

		// FIX: Add penalties to invoice description
		if (penalties.length > 0) {
			taskDescription +=
				"\n\nAdditional Costs:\n" +
				penalties
					.map(
						(p) =>
							`• ${p.description}: ${tracker.currency}${(
								p.amount || 0
							).toFixed(2)}`
					)
					.join("\n");
		}

		taskDescription += `\n\n💸 TOTAL AMOUNT DUE: ${
			tracker.currency
		}${grandTotal.toFixed(
			2
		)}\n\n⚠️ This is an invoice that must be approved for payment. Failure to approve will result in penalty points.`;

		const task = {
			text: taskDescription,
			status: "todo",
			type: "cost-tracker",
			createdAt: new Date().toISOString(),
			createdBy: window.currentUser,
			assignedTo: "schinken",
			points: 0,
			penaltyPoints: 100,
			dueDate: new Date(
				Date.now() + 7 * 24 * 60 * 60 * 1000
			).toISOString(),
			isRepeating: false,
			repeatInterval: null,
		};

		const { error: taskError } = await window.supabase
			.from("tasks")
			.insert([task]);

		if (taskError) {
			console.error("Error creating invoice task:", taskError);
			window.showNotification(
				"Tracker stopped but failed to create invoice.",
				"warning"
			);
		} else {
			window.showNotification(
				`Cost tracker stopped and invoice created! Total: ${
					tracker.currency
				}${grandTotal.toFixed(2)}`
			);
			await window.fetchTasksInitial();
		}
	} else {
		window.showNotification("Cost tracker stopped.");
	}

	// Clear active tracker ID
	if (window.activeLiveTrackerId === trackerId) {
		window.activeLiveTrackerId = null;
	}

	await window.fetchActiveCostTrackersInitial();
};

/**
 * Adds a penalty to an active cost tracker
 */
window.addPenaltyToLiveTracker = async function (
	trackerId,
	description,
	amount
) {
	if (!window.hasPermission("create_task")) {
		window.showNotification(
			"You do not have permission to modify cost trackers",
			"error"
		);
		return;
	}

	const { data: tracker, error: fetchError } = await window.supabase
		.from("active_cost_trackers")
		.select("penalties")
		.eq("id", trackerId)
		.single();

	if (fetchError) {
		console.error("Error fetching tracker penalties:", fetchError);
		return;
	}

	const penalties = JSON.parse(tracker.penalties || "[]");
	penalties.push({
		id: Date.now(),
		description,
		amount,
		added_at: new Date().toISOString(),
	});

	const { error: updateError } = await window.supabase
		.from("active_cost_trackers")
		.update({
			penalties: JSON.stringify(penalties),
			updated_at: new Date().toISOString(),
		})
		.eq("id", trackerId);

	if (updateError) {
		console.error("Error adding penalty:", updateError);
		window.showNotification("Failed to add penalty.", "error");
	} else {
		window.showNotification(`Penalty added: ${description} (${amount})`);
		await window.fetchActiveCostTrackersInitial();
	}
};

/**
 * Removes a penalty from an active cost tracker
 */
window.removePenaltyFromLiveTracker = async function (trackerId, penaltyId) {
	if (!window.hasPermission("create_task")) {
		window.showNotification(
			"You do not have permission to modify cost trackers",
			"error"
		);
		return;
	}

	const { data: tracker, error: fetchError } = await window.supabase
		.from("active_cost_trackers")
		.select("penalties")
		.eq("id", trackerId)
		.single();

	if (fetchError) {
		console.error("Error fetching tracker penalties:", fetchError);
		return;
	}

	const penalties = JSON.parse(tracker.penalties || "[]");
	const updatedPenalties = penalties.filter((p) => p.id !== penaltyId);

	const { error: updateError } = await window.supabase
		.from("active_cost_trackers")
		.update({
			penalties: JSON.stringify(updatedPenalties),
			updated_at: new Date().toISOString(),
		})
		.eq("id", trackerId);

	if (updateError) {
		console.error("Error removing penalty:", updateError);
		window.showNotification("Failed to remove penalty.", "error");
	} else {
		window.showNotification("Penalty removed.");
		await window.fetchActiveCostTrackersInitial();
	}
};
