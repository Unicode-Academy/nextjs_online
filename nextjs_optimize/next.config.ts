import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "cdnphoto.dantri.com.vn",
      },
      {
        hostname: "static-images.vnncdn.net",
      },
    ],
  },
};

export default nextConfig;
