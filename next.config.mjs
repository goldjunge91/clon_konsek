/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  cacheMaxMemorySize: 0,
  reactStrictMode: true,
  
  // devIndicators: {
  //   buildActivityPosition: 'bottom-right',
  // },
  images: {
    unoptimized: true
  },
  // swcMinify: true,
  images: {
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
    ],
  },
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
      };
    }
    return config;
  },
};

export default nextConfig;
