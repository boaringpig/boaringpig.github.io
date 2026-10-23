// useTextSequence.js - state + logic for the scripted text loop that plays
// over the spiral canvas, shared between TextOverlayDisplay (the floating
// text itself, rendered over the canvas) and TextSequenceControls (the
// script/timing controls, rendered in the sidebar) -- split in two because
// the overlay must be absolutely positioned over the canvas while its
// controls belong in the same scrollable sidebar as everything else
// (matching classic's #controls layout, where Text Animation is one
// control-group among several, not something that floats over the canvas).
//
// Ported from js/spiral-integration.js's showNextText/showText/hideText --
// a recursive setTimeout chain, since each line's display duration depends
// on its type (text vs delay), not a fixed tick. Not performance-critical,
// so this isn't "React-ified" further than it needs to be.
import { useEffect, useRef, useState } from "react";

var DEFAULT_SCRIPT = [
	"Welcome to the Spiral Generator",
	"DELAY:2000",
	"Watch the patterns dance",
	"DELAY:1500",
	"Customize every parameter",
	"DELAY:2000",
	"Create your own visual symphony",
	"DELAY:3000",
	"The possibilities are infinite",
].join("\n");

function parseScript(script) {
	var lines = script.split("\n").filter(function (line) {
		return line.trim();
	});
	return lines
		.map(function (line) {
			line = line.trim();
			if (line.indexOf("DELAY:") === 0) {
				var delay = parseInt(line.substring(6));
				return isNaN(delay) ? null : { type: "delay", value: delay };
			}
			return { type: "text", value: line };
		})
		.filter(Boolean);
}

/**
 * @param {object} [initial] - seeds state from a previously-saved config
 *   (SpiralViewerModal's playback-only use) instead of the defaults.
 */
export function useTextSequence(initial) {
	var init = initial || {};
	var [script, setScript] = useState(init.script || DEFAULT_SCRIPT);
	var [interval, setInterval_] = useState(init.interval || 2000);
	var [holdDuration, setHoldDuration] = useState(init.holdDuration || 3000);
	var [animSpeed, setAnimSpeed] = useState(init.animSpeed || 0.5);
	var [fontSize, setFontSize] = useState(init.fontSize || 2.5);
	var [color, setColor] = useState(init.color || "#ffffff");
	var [isRunning, setIsRunning] = useState(false);
	var [display, setDisplay] = useState({ text: "Start the text loop!", shown: false, instant: false });

	var timerRef = useRef(null);
	var indexRef = useRef(0);
	var scriptRef = useRef([]);
	var isRunningRef = useRef(false);
	var holdDurationRef = useRef(holdDuration);
	var animSpeedRef = useRef(animSpeed);

	useEffect(function () { holdDurationRef.current = holdDuration; }, [holdDuration]);
	useEffect(function () { animSpeedRef.current = animSpeed; }, [animSpeed]);

	function showText(text) {
		// Reset instantly (no transition), then animate in on the next frame
		// -- the same "force a reflow between reset and animate" trick the
		// classic version uses via transition:none + offsetHeight read.
		setDisplay({ text: text, shown: false, instant: true });
		requestAnimationFrame(function () {
			requestAnimationFrame(function () {
				setDisplay({ text: text, shown: true, instant: false });
			});
		});
	}

	function hideText() {
		setDisplay(function (prev) {
			return { text: prev.text, shown: false, instant: false };
		});
	}

	function showNext() {
		if (!isRunningRef.current) {
			hideText();
			return;
		}
		if (indexRef.current >= scriptRef.current.length) {
			indexRef.current = 0;
		}
		var current = scriptRef.current[indexRef.current];
		if (!current) return;

		if (current.type === "text") {
			setTimeout(function () {
				showText(current.value);
			}, 50);
			indexRef.current++;
			// "interval"/Display Time intentionally isn't factored in here --
			// matches classic's showNextText exactly, where that slider is
			// read but never actually used in this calculation either.
			var animMs = animSpeedRef.current * 1000;
			var totalDisplayTime = animMs + holdDurationRef.current + animMs + 50;
			timerRef.current = setTimeout(showNext, totalDisplayTime);
		} else {
			hideText();
			indexRef.current++;
			timerRef.current = setTimeout(showNext, current.value);
		}
	}

	function startLoop() {
		if (timerRef.current) clearTimeout(timerRef.current);
		scriptRef.current = parseScript(script);
		indexRef.current = 0;
		isRunningRef.current = true;
		setIsRunning(true);
		showNext();
	}

	function stopLoop() {
		isRunningRef.current = false;
		setIsRunning(false);
		if (timerRef.current) clearTimeout(timerRef.current);
		setDisplay({ text: "Start the text loop!", shown: false, instant: false });
	}

	useEffect(function () {
		return function () {
			isRunningRef.current = false;
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	return {
		display: display,
		script: script, setScript: setScript,
		interval: interval, setInterval: setInterval_,
		holdDuration: holdDuration, setHoldDuration: setHoldDuration,
		animSpeed: animSpeed, setAnimSpeed: setAnimSpeed,
		fontSize: fontSize, setFontSize: setFontSize,
		color: color, setColor: setColor,
		isRunning: isRunning,
		startLoop: startLoop,
		stopLoop: stopLoop,
	};
}
