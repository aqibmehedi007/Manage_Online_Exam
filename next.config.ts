import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  allowedDevOrigins: ['192.168.0.214'],
  output: "standalone",
};

export default nextConfig;
