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
      {
        protocol: 'https',
        hostname: 'lovely-flamingo-139.convex.cloud',
      },
      {
        protocol: 'https',
        hostname: 'sleek-capybara-771.convex.cloud',
      },
        ],
        domains: ["uploadthing.com"],
    },
};

export default nextConfig;
