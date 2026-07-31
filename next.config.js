const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
	output: "standalone",
	// your Next.js configuration
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.scdn.co",
			},
		],
		// Add image optimization settings
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60,
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.pdf$/i,
			type: "asset/source",
		});

		return config;
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(), payment=()",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "Content-Security-Policy",
						value:
							"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://cdn-v1.intelliticks.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://i.scdn.co; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com https://api.spotify.com https://accounts.spotify.com https://*.intelliticks.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
					},
				],
			},
		];
	},
	// Add performance optimizations
	reactStrictMode: true,
	compiler: {
		removeConsole:
			process.env.NODE_ENV === "production"
				? {
						exclude: ["error", "warn"],
				  }
				: false,
	},
});
