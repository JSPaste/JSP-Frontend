import { $ } from 'bun';

const buildStandalone = async () => {
	await $`bun build ./src/server.ts --outfile=./dist/server/frontend --compile --minify --sourcemap=inline`;

	// TODO: https://github.com/oven-sh/bun/pull/15167
	await $`rm -rf ./dist/server/assets/ ./dist/server/chunks/ ./dist/server/entries/ ./dist/server/*.*`;
	await $`rm -f ./dist/client/bundle.html`;
};

console.info('[BUILD] Building standalone...');
await buildStandalone();
