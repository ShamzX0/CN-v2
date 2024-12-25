/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.coingecko.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'static.coingecko.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.moralis.io',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cryptologos.cc',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'alternative.me',
                pathname: '/crypto/fear-and-greed-index.png',
            },
            {
                protocol: 'https',
                hostname: 'coin-images.coingecko.com', // Added this hostname
                pathname: '/**', // Match all paths from this domain
            },
        ],
    },
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        return config;
    },
};

module.exports = nextConfig;
