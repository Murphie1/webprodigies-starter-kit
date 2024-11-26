/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ucarecdn.com", "img.clerk.com",
            },
        ],
        domains: ["uploadthing.com"],
    },
}

export default nextConfig
