/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // Combine remotePatterns and domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "lovely-flamingo-139.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "combative-meerkat-957.convex.cloud",
      },
    ],
    domains: [
      "uploadthing.com",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  // Add the SWC plugin for next-superjson-plugin
  swcPlugins: [
    ["next-superjson-plugin", {}],
  ],
};

export default nextConfig;
