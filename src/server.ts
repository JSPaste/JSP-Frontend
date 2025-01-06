import { get as envvar } from 'env-var';
import { encodingCompatibleExtension } from '#util/encoding.ts';
import { LogLevels, logger } from '#util/logger.ts';

process.on('SIGTERM', async () => await frontend.stop());

export const env = {
	port: envvar('PORT').default(3000).asPortNumber(),
	logLevel: envvar('LOGLEVEL').default(LogLevels.info).asIntPositive()
} as const;

logger.set(env.logLevel);

const encodingsExtensions = ['br', 'gz'];

const frontend = Bun.serve({
	async fetch(req) {
		const reqURL = new URL(req.url);

		let routeFile = `./www${reqURL.pathname}`;
		let contentFile = Bun.file(routeFile);

		// Select SPA for inexistent files
		if (!(await contentFile.exists())) {
			routeFile = './www/index.html';
			contentFile = Bun.file(routeFile);
		}

		const headers: HeadersInit = {};

		// Check if file extension is compatible encoded
		if (encodingCompatibleExtension.test(routeFile)) {
			const encodingsHeader = req.headers
				.get('Accept-Encoding')
				?.split(',')
				.map((encoding) => encoding.trim());

			const encodingCandidate = encodingsExtensions.find((encoding) => encodingsHeader?.includes(encoding));

			if (encodingCandidate) {
				headers['Content-Encoding'] = encodingCandidate;
				headers['Content-Type'] = contentFile.type;
				headers.Vary = 'Accept-Encoding';
				contentFile = Bun.file(`${routeFile}.${encodingCandidate}`);
			}
		}

		if (reqURL.pathname.startsWith('/assets/')) {
			headers['Cache-Control'] = 'max-age=31536000, public, immutable';
		} else if (routeFile.endsWith('.html')) {
			headers['Cache-Control'] = 'max-age=0, no-store';
		} else {
			headers['Cache-Control'] = 'max-age=3600, public, no-transform';
		}

		logger.debug(req.method, reqURL.pathname);

		return new Response(contentFile, { headers });
	},
	static: {
		'/github': Response.redirect('https://github.com/jspaste', 301)
	},
	port: env.port
});

logger.info(`Listening on http://${frontend.hostname}:${frontend.port}`);
