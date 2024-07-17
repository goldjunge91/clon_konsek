import process from 'process';
import dotenv from 'dotenv';
dotenv.config();

/** @type {im, { config, env }port('next').NextCimport { use } from 'react';
onfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
	// cacheMaxMemorySize: 0,
	reactStrictMode: true,
	swcMinify: true,
	images: {
		unoptimized: false,
		formats: ['image/avif', 'image/webp'],
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
				pathname: '/wp-content/themes/twentytwentythree/assets/fonts/',
			},
			{
				protocol: 'https',
				hostname: 'konsek.de',
				port: '',
				pathname: '*/fonts/**',
			},
		],
	},
	// distDir: '.next',
	// experimental: {
	//   turbo: {
	//     rules: {
	//       "*.svg": {
	//         loaders: ["@svgr/webpack"],
	//         as: "*.js",
	//       },
	//     },
	//   },
	// },
	webpack: (config, { isServer }) => {
		config.module.rules.push({
			// https://www.npmjs.com/package/@svgr/webpack
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
				path: false,
				os: false,
				net: false,
				tls: false,
				perf_hooks: false,
			};
		}
		return config;
	},
	env: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
};

export default nextConfig;
