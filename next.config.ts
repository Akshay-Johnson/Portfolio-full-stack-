import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],

  // ⭐ Add empty turbopack config to silence error
  turbopack: {},
};

export default nextConfig;
