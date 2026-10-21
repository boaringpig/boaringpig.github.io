// spiralMath.js - pure drawing math for the Spiral Generator (no DOM/React
// deps, so it can run inside a requestAnimationFrame callback without being
// re-created every render). Ported 1:1 from js/spiral-integration.js's
// Spiral class so the classic and beta versions animate identically.

export var DEFAULT_SPIRAL_PROPS = {
	speed: 1,
	radiusPercent: 50,
	arms: 3,
	thickness: 3,
	color: "#4fc3f7",
	opacity: 0.8,
	timeOffset: 0,
	rotation: 0,
};

/**
 * Returns a new spiral data object centered on the given canvas.
 */
export function createSpiral(id, canvasWidth, canvasHeight, overrides) {
	return Object.assign(
		{
			id: id,
			x: canvasWidth / 2,
			y: canvasHeight / 2,
		},
		DEFAULT_SPIRAL_PROPS,
		overrides || {}
	);
}

/**
 * Draws one spiral onto the given 2D context at the given animation time
 * (ms, typically the rAF callback's timestamp).
 */
export function drawSpiral(ctx, spiral, time) {
	var screenSize = Math.min(ctx.canvas.width, ctx.canvas.height);
	var radius = (spiral.radiusPercent / 100) * screenSize * 2;
	var adjustedTime = (time + spiral.timeOffset * 1000) * spiral.speed * 0.001;

	ctx.save();
	ctx.translate(spiral.x, spiral.y);
	ctx.rotate((spiral.rotation * Math.PI) / 180 + adjustedTime * 0.5);

	ctx.strokeStyle = spiral.color;
	ctx.lineWidth = spiral.thickness;
	ctx.globalAlpha = spiral.opacity;
	ctx.lineCap = "round";
	ctx.lineJoin = "round";

	for (var i = 0; i < spiral.arms; i++) {
		ctx.save();
		ctx.rotate((i * 2 * Math.PI) / spiral.arms);

		ctx.beginPath();
		var firstPoint = true;
		for (var r = 0; r < radius; r += 0.5) {
			var angle = r * 0.08 + adjustedTime;
			var x = r * Math.cos(angle);
			var y = r * Math.sin(angle);
			if (firstPoint) {
				ctx.moveTo(x, y);
				firstPoint = false;
			} else {
				ctx.lineTo(x, y);
			}
		}
		ctx.stroke();
		ctx.restore();
	}

	ctx.restore();
}
