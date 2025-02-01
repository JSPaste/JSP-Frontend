export {};

console.info('[BUILD] Building server...');

const result = await Bun.build({
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
