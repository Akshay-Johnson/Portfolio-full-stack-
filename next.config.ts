/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // ⭐ Correct place for external server packages (Next 16+)
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
};

module.exports = nextConfig;
