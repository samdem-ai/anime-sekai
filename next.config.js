/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["api.animeiat.co", "media.kitsu.io"],
  },
};

module.exports = nextConfig;
