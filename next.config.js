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
};

module.exports = nextConfig;
