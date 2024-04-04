/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    reactStrictMode: true,
    swcMinify: true,
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


// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//         reactStrictMode: true,
//     swcMinify: true,
//     images:{
//         // domains: ['lh3.googleusercontent.com'],
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'avatars.githubusercontent.com',
//                 port: '',
//                 pathname: '/u/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'avatars.googleusercontent.com',
//                 port: '',
//                 pathname: '/u/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'lh3.googleusercontent.com',
//                 port: '',
//                 pathname: '/u/**',
//             },
//         ],
//     }
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //     reactStrictMode: true,
// //     swcMinify: true,
// //     images: {
// //         domains: ['lh3.googleusercontent.com'],
// //     },
// // }
