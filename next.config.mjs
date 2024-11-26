/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ucarecdn.com",
            },
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
        ],
        domains: ["uploadthing.com"],
    },
};

export default nextConfig;
