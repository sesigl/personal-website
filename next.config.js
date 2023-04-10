/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  reactStrictMode: true,
  eslint: {
    dirs: ["./src"],
  },
};

module.exports = nextConfig;
