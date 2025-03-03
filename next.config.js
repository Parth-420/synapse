/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Remove trailing slashes from URLs
  trailingSlash: false,
  // Note: Custom redirects cannot be used with "output: export"
};

module.exports = nextConfig;