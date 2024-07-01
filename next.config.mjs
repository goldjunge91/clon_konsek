/* eslint-disable tsdoc/syntax */
// import nextra from "nextra";
// import dotenv from 'dotenv';
import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  cacheMaxMemorySize: 0,
  reactStrictMode: true,
  // devIndicators: {
  //   buildActivityPosition: 'bottom-right',
  // },
  swcMinify: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    SECRET_KEY: process.env.SECRET_KEY,
    ENCRYPTION_SECRET_KEY: process.env.ENCRYPTION_SECRET_KEY,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    ENCRYPTION_IV: process.env.ENCRYPTION_IV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
  },
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
        perf_hooks: false,
      };
    }
    return config;
  },
};
// const withNextra = nextra({
//   theme: 'nextra-theme-docs',
//   themeConfig: './theme.config.jsx',
//   defaultShowCopyCode: true,
//   flexsearch: {
//     codeblocks: true
//   },
//   staticImage: true,
// contentDirs: ['pages'],  // Hier geben wir an, wo sich die Dokumentation befindet
// });
// export default withNextra(nextConfig);
export default (nextConfig);

// const withNextra = nextra({
  //   theme: 'nextra-theme-docs',
  //   themeConfig: './theme.config.jsx',
  //   defaultShowCopyCode: true,
  //   flexsearch: {
    //     codeblocks: true
    //   },
    //   staticImage: true,
    //   contentDirs: ['pages'],  // Hier geben wir an, wo sich die Dokumentation befindet
// });

// export default withNextra(nextConfig);
    // import nextra from "nextra";
    // import dotenv from 'dotenv';

    // if (process.env.NODE_ENV === 'production') {
    //   dotenv.config({ path: '.env.production' });
    // }

