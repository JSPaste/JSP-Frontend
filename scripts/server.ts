import { join } from 'node:path/posix';
import { $, build } from 'bun';

const root = process.cwd();
const serverOutDir = './dist/server/';
const serverOutDirAbs = join(root, serverOutDir);
const serverEntrypoint = ['./src/server.ts'];

const buildServer = async () => {
	const result = await build({
		entrypoints: serverEntrypoint,
		target: 'bun',
		outdir: serverOutDirAbs,
		format: 'esm',
		naming: 'index.js',
		splitting: false,
		sourcemap: 'inline',
		minify: true
	});

	if (!result.success) {
		console.error(result.logs);
		process.exit(1);
	}

	// TODO: https://github.com/oven-sh/bun/pull/15167
	await $`rm -rf ./dist/server/assets/ ./dist/server/chunks/ ./dist/server/entries/ ./dist/server/*.html ./dist/server/*.mjs`;
	await $`rm -f ./dist/client/bundle.html`;
};

console.info('[BUILD] Building server...');
await buildServer();
