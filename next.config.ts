import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  serverExternalPackages: [],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
