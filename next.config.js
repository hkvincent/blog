/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "images.unsplash.com",
                protocol: "https",
            },
            {
                hostname: "blog-directus.zeabur.app",
                protocol: "https",
            },
        ],
        domains: ["blog-directus.zeabur.app", "images.unsplash.com"],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
