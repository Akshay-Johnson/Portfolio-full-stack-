import type { NextConfig } from "next";
import type { Configuration } from "webpack";

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

  webpack: (config: Configuration) => {
    config.externals = config.externals || [];
    (config.externals as any).push("@sparticuz/chromium");
    return config;
  },
};

export default nextConfig;
