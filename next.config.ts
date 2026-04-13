import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  allowedDevOrigins: ["192.168.139.121", "localhost"],
};

export default nextConfig;
