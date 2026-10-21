// database-spirals.js
// Saved spiral configs: a reusable library a master can save a spiral
// generator config to (under a name) and reload later, instead of only
// the generator's download/upload-a-JSON-file mechanism. Classic has no UI
// for this (the beta Tools page does), but the mutation lives here per
// this codebase's convention of keeping writes in a classic window.*
// function regardless of which UI calls it.

window.saveSpiralToLibrary = async function (saved) {
	var payload = {
		name: saved.name,
		config: saved.config,
		updated_at: new Date().toISOString(),
	};

	if (saved.id) {
		var { error: updateError } = await window.supabase
			.from("saved_spirals")
			.update(payload)
			.eq("id", saved.id);
		if (updateError) {
			console.error("Error updating saved spiral:", updateError);
			window.showNotification("Failed to save spiral.", "error");
			return null;
		}
		window.showNotification("Spiral updated!", "success");
		return saved.id;
	}

	payload.master_username = window.activeMasterContext;
	payload.created_by = window.currentUser;

	var { data, error } = await window.supabase
		.from("saved_spirals")
		.insert([payload])
		.select()
		.single();

	if (error) {
		console.error("Error saving spiral:", error);
		window.showNotification("Failed to save spiral.", "error");
		return null;
	}

	window.showNotification("Spiral saved!", "success");
	return data.id;
};

window.fetchSavedSpirals = async function () {
	var { data, error } = await window.supabase
		.from("saved_spirals")
		.select("*")
		.eq("master_username", window.activeMasterContext)
		.order("updated_at", { ascending: false });

	if (error) {
		console.error("Error fetching saved spirals:", error);
		return [];
	}
	return data || [];
};

window.deleteSavedSpiral = async function (id) {
	var { error } = await window.supabase
		.from("saved_spirals")
		.delete()
		.eq("id", id);

	if (error) {
		console.error("Error deleting saved spiral:", error);
		window.showNotification("Failed to delete spiral.", "error");
		return;
	}
	window.showNotification("Spiral deleted.");
};
