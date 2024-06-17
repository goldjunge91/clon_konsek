/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: 'export',
	cacheMaxMemorySize: 0,
	reactStrictMode: true, // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
	devIndicators: {
		buildActivityPosition: 'bottom-right',
	},
	swcMinify: true,
	images: {
		unoptimized: false,
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
			{
				protocol: 'https',
				hostname: 'avatars.googleusercontent.com',
			},
			{
				protocol: 'http',
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'http',
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: '/u/**',
			},
			{
				protocol: 'https',
				hostname: 'konsek.de',
				port: '',
				pathname: '/wp-content/themes/twentytwentythree/assets/fonts/**',
			},
			{
				protocol: 'https',
				hostname: 'konsek.de',
				port: '',
				pathname: '*/fonts/**',
			},
		],
	},
	webpack: (config, { isServer }) => {
		config.module.rules.push(
			{
				// https://www.npmjs.com/package/@svgr/webpack

				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
			// {
			// 	test: /\.css$/,
			// 	use: ["style-loader", "css-loader", "postcss-loader"],
			// }
		);
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
				path: false,
				os: false,
			};
		}
		return config;
	},
};
export default nextConfig;
