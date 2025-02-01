import { brotliCompressSync, gzipSync } from 'node:zlib';
import { encodingCompatibleExtension } from '#util/encoding.ts';
import { findFiles, writeFile } from '#util/fs.ts';

const rootClientDirectory = './dist/www/';
const relativeClientFiles = await findFiles(rootClientDirectory, undefined, encodingCompatibleExtension);
const rootClientFiles = relativeClientFiles.map((file) => rootClientDirectory + file);

await Promise.all(
	rootClientFiles.map(async (file) => {
		const fileContent = await Bun.file(file).arrayBuffer();

		console.info('[BUILD] Compressing:', file);

		await writeFile(`${file}.gz`, gzipSync(fileContent));
		await writeFile(`${file}.br`, brotliCompressSync(fileContent));
	})
);
