import { brotliCompressSync, gzipSync } from 'node:zlib';
import { logger } from '@x-util/logger.ts';
import { findFiles, writeFile } from './utils.ts';

const rootClientDirectory = './dist/client/';
const relativeClientFiles = await findFiles(rootClientDirectory, undefined, /\.(js|mjs|cjs|json|css|html|wasm|svg)$/);
const rootClientFiles = relativeClientFiles.map((file) => rootClientDirectory + file);

await Promise.all(
	rootClientFiles.map(async (file) => {
		const fileContent = await Bun.file(file).arrayBuffer();

		logger.info('[BUILD] Compressing:', file);

		await writeFile(
			`${file}.gz`,
			gzipSync(fileContent, {
				level: 9
			})
		);

		await writeFile(`${file}.br`, brotliCompressSync(fileContent));
	})
);
