// SpiralCanvas.jsx - the animated canvas itself. Owns the single
// requestAnimationFrame loop and a ResizeObserver (tracks the canvas's own
// container, not just window resizes, since this sits in a flex layout next
// to a sidebar). spiralsRef is a mutable array the loop reads every frame
// without triggering React re-renders -- see SpiralGeneratorModal.jsx for
// why state is split this way.
import { useEffect, useRef } from "react";
import { drawSpiral } from "../../utils/spiralMath";
import styles from "./SpiralCanvas.module.css";

export function SpiralCanvas({ canvasRef, spiralsRef, backgroundColor }) {
	var backgroundColorRef = useRef(backgroundColor);

	useEffect(
		function () {
			backgroundColorRef.current = backgroundColor;
		},
		[backgroundColor]
	);

	useEffect(function () {
		var canvas = canvasRef.current;
		var ctx = canvas.getContext("2d");

		function resize() {
			var parent = canvas.parentElement;
			canvas.width = parent.clientWidth;
			canvas.height = parent.clientHeight;
			spiralsRef.current.forEach(function (spiral) {
				spiral.x = canvas.width / 2;
				spiral.y = canvas.height / 2;
			});
		}

		var observer = new ResizeObserver(resize);
		observer.observe(canvas.parentElement);
		resize();

		var frameId = requestAnimationFrame(function loop(time) {
			frameId = requestAnimationFrame(loop);
			ctx.fillStyle = backgroundColorRef.current;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			spiralsRef.current.forEach(function (spiral) {
				drawSpiral(ctx, spiral, time);
			});
		});

		return function () {
			cancelAnimationFrame(frameId);
			observer.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps -- spiralsRef is
		// a stable ref identity for the component's lifetime; the loop always
		// reads spiralsRef.current fresh, so it never needs to restart.
	}, []);

	return <canvas ref={canvasRef} className={styles.canvas} />;
}
