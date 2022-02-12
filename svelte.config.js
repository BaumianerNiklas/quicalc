import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import { resolve } from "node:path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		// target: "#svelte", // according to Vercel this is not necessary (it also breaks the vercel build)

		vite: {
			resolve: {
				alias: {
					$components: resolve("./src/components"),
					$util: resolve("./src/util"),
					$typings: resolve("./src/typings"),
				},
			},
		},
	},
};

export default config;
