/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "m.media-amazon.com",
      "images.unsplash.com",
      "i.ibb.co",
      "i.imgur.com",
      "i.pinimg.com",
    ],
  },
  env: {
    stripe_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};

module.exports = nextConfig;
