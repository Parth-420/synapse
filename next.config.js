/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Remove trailing slashes from URLs
  trailingSlash: false,
};

module.exports = nextConfig;