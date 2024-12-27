import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { visualizer } from 'rollup-plugin-visualizer';
import type { UserConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default {
	appType: 'custom',
	build: {
		cssMinify: 'lightningcss',
		outDir: './dist/www/',
		reportCompressedSize: false,
		rollupOptions: {
			output: {
				entryFileNames: 'assets/router-[hash].js',
				chunkFileNames: 'assets/chunk-[hash].js',
				assetFileNames: 'assets/asset-[hash][extname]'
			}
		}
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
		visualizer({
			emitFile: true,
			filename: 'bundle.html',
			template: 'treemap'
		})
	],
	resolve: {
		alias: {
			'#component': resolve('./src/components'),
			'#util': resolve('./src/utils')
		}
	}
} satisfies UserConfig;
