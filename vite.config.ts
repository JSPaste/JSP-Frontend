import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { visualizer } from 'rollup-plugin-visualizer';
import solid from 'vike-solid/vite';
import vike from 'vike/plugin';
import type { UserConfig } from 'vite';

export default {
	appType: 'custom',
	build: {
		reportCompressedSize: false,
		cssMinify: 'lightningcss'
	},
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets: browserslistToTargets(browserslist('defaults'))
		}
	},
	plugins: [
		solid(),
		tailwindcss(),
		vike({
			redirects: {
				'/github': 'https://github.com/jspaste',
				// TODO: Expose Backend API route locations
				'/@documentName/r': '/api/document/@documentName/raw',
				'/@documentName/raw': '/api/document/@documentName/raw'
			},
			prerender: {
				partial: true
			}
		}),
		visualizer({
			emitFile: true,
			filename: 'bundle.html',
			template: 'treemap'
		})
	],
	resolve: {
		alias: {
			'@x-component': resolve('./src/components'),
			'@x-hook': resolve('./src/hooks'),
			'@x-page': resolve('./src/pages'),
			'@x-util': resolve('./src/utils')
		}
	}
} satisfies UserConfig;
