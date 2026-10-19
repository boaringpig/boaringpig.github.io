// contrast.js
// Plain JS WCAG contrast-ratio math, with no framework dependency, so both
// the classic admin UI (js/ui-admin.js) and the React beta UI
// (src/beta/components/admin/MasterEditForm.jsx) can share one
// implementation instead of two copies that could drift apart.
//
// Reference: https://www.w3.org/TR/WCAG21/#contrast-minimum

/**
 * Parses a "#rrggbb" (or "#rgb") string into [r, g, b] in the 0-255 range.
 * Returns null if the string isn't a valid hex color.
 */
function hexToRgb(hex) {
	if (typeof hex !== "string") return null;
	var normalized = hex.trim().replace(/^#/, "");
	if (normalized.length === 3) {
		normalized = normalized
			.split("")
			.map(function (c) {
				return c + c;
			})
			.join("");
	}
	if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return null;
	return [
		parseInt(normalized.slice(0, 2), 16),
		parseInt(normalized.slice(2, 4), 16),
		parseInt(normalized.slice(4, 6), 16),
	];
}

function channelToLinear(c) {
	var s = c / 255;
	return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/**
 * WCAG relative luminance of a "#rrggbb" color, in [0, 1].
 */
function relativeLuminance(hex) {
	var rgb = hexToRgb(hex);
	if (!rgb) return null;
	var r = channelToLinear(rgb[0]);
	var g = channelToLinear(rgb[1]);
	var b = channelToLinear(rgb[2]);
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * WCAG contrast ratio between two "#rrggbb" colors, as a number >= 1.
 * Returns null if either color is invalid.
 */
function contrastRatio(hexA, hexB) {
	var lumA = relativeLuminance(hexA);
	var lumB = relativeLuminance(hexB);
	if (lumA === null || lumB === null) return null;
	var lighter = Math.max(lumA, lumB);
	var darker = Math.min(lumA, lumB);
	return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks a text/background pair against WCAG AA.
 * @param {string} textHex
 * @param {string} bgHex
 * @param {boolean} isLargeText - large text only needs 3:1, normal text needs 4.5:1.
 */
function checkContrast(textHex, bgHex, isLargeText) {
	var ratio = contrastRatio(textHex, bgHex);
	var required = isLargeText ? 3 : 4.5;
	return {
		ratio: ratio,
		required: required,
		passes: ratio !== null && ratio >= required,
	};
}

/**
 * Runs the standard set of checks a theme needs: primary/secondary text
 * against each of the three surface levels, for both normal and large text.
 * @param {{bg, card, elevated, textPrimary, textSecondary}} theme
 * @returns {Array<{label, ratio, required, passes}>}
 */
function checkThemeContrast(theme) {
	var surfaces = [
		{ key: "bg", label: "Background" },
		{ key: "card", label: "Card" },
		{ key: "elevated", label: "Elevated" },
	];
	var texts = [
		{ key: "textPrimary", label: "Primary text", large: false },
		{ key: "textSecondary", label: "Secondary text", large: false },
	];

	var results = [];
	texts.forEach(function (text) {
		surfaces.forEach(function (surface) {
			var check = checkContrast(theme[text.key], theme[surface.key], text.large);
			results.push({
				label: text.label + " on " + surface.label,
				ratio: check.ratio,
				required: check.required,
				passes: check.passes,
			});
		});
	});
	return results;
}

var contrastApi = {
	hexToRgb: hexToRgb,
	relativeLuminance: relativeLuminance,
	contrastRatio: contrastRatio,
	checkContrast: checkContrast,
	checkThemeContrast: checkThemeContrast,
};

if (typeof window !== "undefined") {
	window.ContrastUtils = contrastApi;
}

export {
	hexToRgb,
	relativeLuminance,
	contrastRatio,
	checkContrast,
	checkThemeContrast,
};
export default contrastApi;
