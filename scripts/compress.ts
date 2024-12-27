import { brotliCompressSync, gzipSync } from 'node:zlib';
import { findFiles, writeFile } from '@x-util/fs.ts';

const rootClientDirectory = './dist/client/';
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
