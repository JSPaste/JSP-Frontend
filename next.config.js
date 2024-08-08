/** @type {import('next').NextConfig} */
const nextConfig = Object.seal({
	output: undefined,
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		reactCompiler: true,
		optimizeCss: true
	}
});

nextConfig.output = process.env.NEXT_STANDALONE ? 'standalone' : undefined;

export default nextConfig;
