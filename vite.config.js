import { defineConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import { minifyHtmlStringsPlugin } from "./vite-plugin-minify-html-strings.js";

export default defineConfig({
	base: "", // Empty string - this is key!
	build: {
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		assetsDir: "assets",
		rollupOptions: {
			output: {
				assetFileNames: "assets/[name].[hash][extname]",
				chunkFileNames: "assets/[name].[hash].js",
				entryFileNames: "assets/[name].[hash].js",
			},
		},
	},
	plugins: [
		{
			...minifyHtmlStringsPlugin(),
			enforce: "pre",
		},
		ViteMinifyPlugin({
			collapseWhitespace: true,
			removeComments: true,
		}),
	],
});
