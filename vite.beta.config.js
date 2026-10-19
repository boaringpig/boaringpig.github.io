// vite.beta.config.js
//
// Builds the React beta dashboard (src/beta/main.jsx) as a single,
// self-contained ES module with a fixed filename, so js/beta-toggle.js can
// dynamically import() a real, pre-built file in production instead of raw
// .jsx source (which GitHub Pages serves as-is, with no build step -- a
// browser can't parse JSX or resolve bare specifiers like "react" on its
// own). Deliberately separate from vite.config.js/dist/: that config's
// multi-entry HTML build isn't used for deployment at all (GitHub Pages
// serves the repo root directly), so this is a second, narrowly-scoped
// build whose *output* (beta-dist/) is the thing actually shipped.
//
// Run with: npm run build:beta
// Whenever src/beta/** changes, rebuild and commit beta-dist/ again -- there
// is no CI step that does this automatically (see the comment above
// js/beta-toggle.js's enterBetaMode for why that's an accepted tradeoff).
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	esbuild: {
		legalComments: "none",
	},
	define: {
		// Vite's regular (non-lib) build sets this automatically so React's
		// production/development branches get dead-code-eliminated; library
		// mode does not, since a library is meant to work in any consumer's
		// environment -- but this bundle is never consumed by another
		// bundler, it's loaded directly by the browser, so there's no
		// `process` global to read at runtime unless we hardcode this.
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
	build: {
		outDir: "beta-dist",
		emptyOutDir: true,
		cssCodeSplit: false,
		minify: "esbuild",
		lib: {
			entry: "src/beta/main.jsx",
			formats: ["es"],
			fileName: () => "beta-bundle.js",
		},
		rollupOptions: {
			output: {
				assetFileNames: "beta-bundle.[ext]",
			},
		},
	},
});
