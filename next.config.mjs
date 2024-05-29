/** @type {{cacheMaxMemorySize: number, images: {remotePatterns: [{protocol: string, hostname: string},{protocol: string, hostname: string},{protocol: string, hostname: string, port: string, pathname: string},{protocol: string, hostname: string, port: string, pathname: string}], formats: string[], unoptimized: string}, webpack: (function(*, {isServer: *}): *), reactStrictMode: boolean}} */
const nextConfig = {
    cacheMaxMemorySize: 0, reactStrictMode: true, swcMinify: true, images: {
        remotePatterns: [{
            protocol: 'https', hostname: '**',
        }, {
            protocol: 'https', hostname: 'avatars.googleusercontent.com',
        }, {
            protocol: 'http', hostname: 'lh3.googleusercontent.com', port: '', pathname: '**',
        }, {
            protocol: 'http', hostname: 'lh3.googleusercontent.com', port: '', pathname: '/u/**',
        },], formats: ["image/avif", "image/webp"], unoptimized: false,
    }, webpack: (config, {isServer}) => {
        config.module.rules.push({
            // https://www.npmjs.com/package/@svgr/webpack
            test: /\.svg$/, use: ['@svgr/webpack'],
        });
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback, fs: false, path: false, os: false,
            };
        }
        return config;
    },
};
export default nextConfig;
