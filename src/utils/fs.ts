import { resolve } from 'node:path';
import { Glob } from 'bun';

export const findFiles = async (directory: string, globPattern = '**', match?: RegExp) => {
	const glob = new Glob(globPattern);

	const relativeFiles = await Array.fromAsync(
		glob.scan({
			cwd: directory,
			onlyFiles: true
		})
	);

	if (match) {
		return relativeFiles.filter((file) => match.test(file));
	}

	return relativeFiles;
};

export const writeFile = async (
	location: string,
	data: Blob | NodeJS.TypedArray | ArrayBufferLike | string | Bun.BlobPart[]
) => {
	await Bun.write(resolve(location), data);
};
