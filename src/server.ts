import { serve } from 'bun';
import { get as envvar } from 'env-var';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { LogLevels, logger } from '#util/logger.ts';

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
		root: './www/',
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

// TODO: https://github.com/oven-sh/bun/issues/8690
const frontend = serve({
	fetch: server.fetch,
	port: env.port
});

logger.info(`Listening on http://${frontend.hostname}:${frontend.port}`);
