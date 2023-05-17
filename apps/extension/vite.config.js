import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import fs from 'fs';

/** @type {import('vite').UserConfig} */
const config = {
	build: {
		rollupOptions: {
			input: {
				contentScript: path.resolve(__dirname, 'src/contentScript.ts')
			},
			output: {
				file: path.resolve(__dirname, 'build/contentScript.js')
			}
		}
	},
	plugins: [
		{
			name: 'manifest',
			apply: 'build',
			enforce: 'post',
			buildEnd: () => {
				// get manifest.template.json and json parse it
				const manifest = JSON.parse(
					fs.readFileSync(path.resolve(__dirname, 'manifest.template.json'), 'utf8')
				);

				// find the contentScript with timestamp in build folder and put that filename into a variable
				const contentScript = fs
					.readdirSync(path.resolve(__dirname, 'build/app/immutable'))
					.find((file) => file.startsWith('contentScript'));
				console.log({
					contentScript
				});

				// put that filename into the new manifest.json object under content_scripts[0].js[0]
				manifest.content_scripts[0].js[0] = `app/immutable/${contentScript}`;
				// write the new manifest.json object as manifest.json in the build folder
				fs.writeFileSync(path.resolve(__dirname, 'static/manifest.json'), JSON.stringify(manifest));
			}
		},
		sveltekit()
	]
};

export default config;
