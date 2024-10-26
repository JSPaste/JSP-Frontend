import { LogLevels, logger } from '@x-util/logger.ts';
import { serve } from 'bun';
import { get as envvar } from 'env-var';
import { serveStatic } from 'hono/bun';
import { Hono } from 'hono/tiny';
import { renderPage } from 'vike/server';

process.on('SIGTERM', async () => await frontend.stop());

export const env = {
	port: envvar('PORT').default(3000).asPortNumber(),
	logLevel: envvar('LOGLEVEL').default(LogLevels.info).asIntPositive()
} as const;

logger.set(env.logLevel);

const server = new Hono();

server.use(
	'*',
	serveStatic({
		root: './client/',
		precompressed: true,
		onFound: (file, ctx) => {
			logger.debug('(STATIC)', ctx.req.method, ctx.req.path);

			if (ctx.req.path.startsWith('/assets/')) {
				ctx.header('Cache-Control', 'max-age=31536000, public, immutable');
			} else {
				ctx.header('Cache-Control', 'max-age=3600, public, no-transform');
			}

			if (file.endsWith('.html')) {
				ctx.header('Cache-Control', 'max-age=0, no-store');
			}
		}
	})
);

server.all('*', async (ctx) => {
	logger.debug('(DYNAMIC)', ctx.req.method, ctx.req.path);

	const pageContext = await renderPage({ urlOriginal: ctx.req.url });
	const response = pageContext.httpResponse;

	const { readable, writable } = new TransformStream();

	response.pipe(writable);

	return new Response(readable, {
		status: response.statusCode,
		headers: response.headers
	});
});

// TODO: 103 Early Hints -> https://github.com/oven-sh/bun/issues/8690
const frontend = serve({
	fetch: server.fetch,
	port: env.port
});

logger.info(`Listening on http://${frontend.hostname}:${frontend.port}`);
