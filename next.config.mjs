

import nextra from "nextra";
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  cacheMaxMemorySize: 0,
  reactStrictMode: true,
  // devIndicators: {
  //   buildActivityPosition: 'bottom-right',
  // },
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
  distDir: '.next',

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
      // });
    });
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        net: false,
        tls: false,
        fs: false,
        perf_hooks: false,
      };
      // config.externals = [
      //   ...(config.externals || []),
      //   /^@docusaurus\/.+$/,
      //   /^@generated\/.+$/,
      // ];
    }
    return config;
  },
};
const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
});
export default withNextra(nextConfig);
