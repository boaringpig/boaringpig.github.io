// spiralConfigIO.js - save/load a spiral generator config as a JSON file.
// Same browser APIs and config shape as the classic app's
// js/spiral-integration.js (saveSpiralConfig/handleSpiralConfigFile), so
// files saved from one UI load fine in the other.

export function saveSpiralConfig(config) {
	var dataStr = JSON.stringify(config, null, 2);
	var blob = new Blob([dataStr], { type: "application/json" });
	var url = URL.createObjectURL(blob);
	var a = document.createElement("a");
	a.href = url;
	a.download = "spiral-config.json";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

/**
 * Reads a File (from a file input's change event) and calls onLoaded with
 * the parsed config, or onError(message) if the file isn't valid JSON.
 */
export function loadSpiralConfigFile(file, onLoaded, onError) {
	var reader = new FileReader();
	reader.onload = function (e) {
		try {
			var config = JSON.parse(e.target.result);
			onLoaded(config);
		} catch (error) {
			onError("Failed to load configuration. Invalid file format.");
		}
	};
	reader.readAsText(file);
}
