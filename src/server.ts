import { LogLevels, logger } from '@x-util/logger.ts';
import { serve } from 'bun';
import { get as envvar } from 'env-var';
import { renderPage } from 'vike/server';

process.on('SIGTERM', async () => await frontend.stop());

export const env = {
	port: envvar('PORT').default(3000).asPortNumber(),
	logLevel: envvar('LOGLEVEL').default(LogLevels.info).asIntPositive()
} as const;

logger.set(env.logLevel);

const encodings = {
	br: '.br',
	// zstd: '.zst',
	gzip: '.gz'
} as const;

const encodingsSortedKeys = Object.keys(encodings) as (keyof typeof encodings)[];

const encodingCompatibleMIME =
	/^\s*(?:text\/[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;

// TODO: 103 Early Hints -> https://github.com/oven-sh/bun/issues/8690
const frontend = serve({
	async fetch(req) {
		const reqURL = new URL(req.url);

		// Static files
		let localStatic = `./client${reqURL.pathname}`;
		let content = Bun.file(localStatic);

		if (!(await content.exists())) {
			content = Bun.file((localStatic += '/index.html'));
		}

		if (await content.exists()) {
			const headers: HeadersInit = {};

			if (encodingCompatibleMIME.test(content.type)) {
				const acceptEncodings = new Set(
					req.headers
						.get('Accept-Encoding')
						?.split(',')
						.map((encoding) => encoding.trim())
				);

				for (const encoding of encodingsSortedKeys) {
					if (!acceptEncodings.has(encoding)) continue;

					const candidateContent = Bun.file(localStatic + encodings[encoding]);

					if (await candidateContent.exists()) {
						headers['Content-Encoding'] = encoding;
						headers['Content-Type'] = content.type;
						headers.Vary = 'Accept-Encoding';
						content = candidateContent;
						break;
					}
				}
			}

			if (reqURL.pathname.startsWith('/assets/')) {
				headers['Cache-Control'] = 'max-age=31536000, public, immutable';
			} else {
				headers['Cache-Control'] = 'max-age=3600, public, no-transform';
			}

			if (localStatic.endsWith('.html')) {
				headers['Cache-Control'] = 'max-age=0, no-store';
			}

			logger.debug(req.method, reqURL.pathname);

			return new Response(content, { headers });
		}

		// Dynamic pages
		const pageContext = await renderPage({ urlOriginal: reqURL.href });
		const response = pageContext.httpResponse;

		if (!response) {
			logger.debug(req.method, reqURL.pathname, '(DYNAMIC UNKNOWN)');

			return new Response(null, { status: 500 });
		}

		const { readable, writable } = new TransformStream();

		response.pipe(writable);

		logger.debug(req.method, reqURL.pathname, '(DYNAMIC)');

		return new Response(readable, {
			status: response.statusCode,
			headers: response.headers
		});
	},
	port: env.port
});

logger.info(`Listening on http://${frontend.hostname}:${frontend.port}`);
