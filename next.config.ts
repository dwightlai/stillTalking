import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/topics/relationships",
        destination: "/topics/family-relationships",
        permanent: true,
      },
      {
        source: "/topics/money-work",
        destination: "/topics/money-and-support",
        permanent: true,
      },
      {
        source: "/topics/guides",
        destination: "/resources",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
