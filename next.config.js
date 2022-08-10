/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.midilibre.fr"],
  },
};

module.exports = nextConfig;
