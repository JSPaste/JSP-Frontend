import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { visualizer } from 'rollup-plugin-visualizer';
import type { UserConfig } from 'vite';
import solid from 'vite-plugin-solid';

const devMode = process.env.NODE_ENV === 'development';

export default {
	appType: 'spa',
	cacheDir: './node_modules/.tmp',
	build: {
		target: 'es2022',
		cssMinify: 'lightningcss',
		outDir: './dist/www/',
		reportCompressedSize: false,
		rollupOptions: {
			output: {
				entryFileNames: 'assets/router-[hash].js',
				chunkFileNames: 'assets/chunk-[hash].js',
				assetFileNames: 'assets/chunk-[hash][extname]'
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
			emitFile: devMode,
			filename: 'bundle.html',
			template: 'treemap'
		})
	],
	resolve: {
		alias: {
			'#component': resolve('./src/components'),
			'#screen': resolve('./src/screens'),
			'#util': resolve('./src/utils')
		}
	}
} satisfies UserConfig;
