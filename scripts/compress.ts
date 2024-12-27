import { brotliCompressSync, gzipSync } from 'node:zlib';
import { $ } from 'bun';
import { findFiles, writeFile } from '#util/fs.ts';

// TODO: https://github.com/oven-sh/bun/pull/15167
await $`rm -f ./dist/www/bundle.html`;

const rootClientDirectory = './dist/www/';
const relativeClientFiles = await findFiles(rootClientDirectory, undefined, /\.(js|mjs|cjs|json|css|html|wasm|svg)$/);
const rootClientFiles = relativeClientFiles.map((file) => rootClientDirectory + file);

await Promise.all(
	rootClientFiles.map(async (file) => {
		const fileContent = await Bun.file(file).arrayBuffer();

		console.info('[BUILD] Compressing:', file);

		await writeFile(`${file}.gz`, gzipSync(fileContent));
		await writeFile(`${file}.br`, brotliCompressSync(fileContent));
	})
);
