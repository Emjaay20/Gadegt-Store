import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'technoir-hub.duckdns.org',
      }

    ],
  },
};

export default nextConfig;
