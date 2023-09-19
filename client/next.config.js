/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "fipezo-server.vercel.app",
      "fipezo.com",
      "fipezo",
      "fipezo-website",
      "fipezo-bucket.s3.ap-south-1.amazonaws.com",
    ],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/sitemap-generator");
    }
    return config;
  },
  env: {
    CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY,
    SERVER_URL: process.env.SERVER_URL,
  },
};

module.exports = nextConfig;
