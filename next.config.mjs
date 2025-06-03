/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wallpapers.com",
      },
      {
        protocol: "https",
        hostname: "cdn2.iconfinder.com",
      },
    ],
  },
};

export default nextConfig;
