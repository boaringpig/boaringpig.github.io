// main.jsx
//
// Entry point the classic app's js/beta-toggle.js dynamically import()s.
// If you're new to React: `createRoot(el).render(<App/>)` is how a React
// tree gets attached to a plain DOM element - everything inside <App/> is
// then managed by React until unmount() is called.
import { createRoot } from "react-dom/client";
import { App } from "./App";

var root = null;

export function mountBetaApp(rootEl) {
	if (root) return; // already mounted
	root = createRoot(rootEl);
	root.render(<App />);
}

export function unmountBetaApp() {
	if (!root) return;
	root.unmount();
	root = null;
}
