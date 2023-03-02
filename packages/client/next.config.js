/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_serverName]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
