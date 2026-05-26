import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'www.optcgapi.com',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'motion/react'],
    },
}

export default nextConfig
