import { build } from 'bun';

const buildServer = async () => {
	const result = await build({
		entrypoints: ['./src/server.ts'],
		target: 'bun',
		outdir: './dist/',
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
};

console.info('[BUILD] Building server...');
await buildServer();
