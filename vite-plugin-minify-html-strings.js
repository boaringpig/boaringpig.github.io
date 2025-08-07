// vite-plugin-minify-html-strings.js
export function minifyHtmlStringsPlugin() {
	return {
		name: "vite-plugin-minify-html-strings",
		transform(code, id) {
			// Only process JavaScript
			if (!id.endsWith(".js")) {
				return null;
			}

			// Regex to find template literals that look like HTML
			const htmlRegex = /`\s*<[a-zA-Z](.|\n)*?>\s*`/g;

			// Replace multiline whitespace with a single space
			const minifiedCode = code.replace(htmlRegex, (match) => {
				return match.replace(/\s+/g, " ").trim();
			});

			return {
				code: minifiedCode,
				map: null, // No source map generation for simplicity
			};
		},
	};
}
