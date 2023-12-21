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
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    FB_APP_ID: process.env.FB_APP_ID,
    MAILERLITE_KEY: process.env.MAILERLITE_KEY,
    RAZORPAY_KEY: process.env.RAZORPAY_KEY,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
  },
};

module.exports = nextConfig;
