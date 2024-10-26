import { join } from 'node:path/posix';
import { logger } from '@x-util/logger.ts';
import { $ } from 'bun';

const root = process.cwd();
const serverOutDir = './dist/server/';
const serverOutDirAbs = join(root, serverOutDir);
const serverEntrypoint = ['./src/server.ts'];

const buildStandalone = async () => {
	const result = await Bun.build({
		entrypoints: serverEntrypoint,
		target: 'bun',
		outdir: serverOutDirAbs,
		format: 'esm',
		naming: 'index.js',
		splitting: false,
		packages: 'bundle',
		sourcemap: 'inline',
		minify: true
	});

	if (!result.success) {
		logger.error(result.logs);
		process.exit(1);
	}

	// Cleanup
	await $`rm -rf ./dist/server/assets/`;
	await $`rm -rf ./dist/server/chunks/`;
	await $`rm -rf ./dist/server/entries/`;
	await $`rm -rf ./dist/server/*.mjs`;
};

logger.info('[BUILD] Creating standalone...');
await buildStandalone();
