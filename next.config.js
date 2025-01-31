/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'tecxmate.com', 'en.tecxmate.com', 'vi.tecxmate.com', 'tw.tecxmate.com', 'vercel.app'],
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  output: 'standalone',
  experimental: {
    serverActions: {
      enabled: true
    }
  },
  skipMiddlewareUrlNormalize: false,
  skipTrailingSlashRedirect: false,
}

module.exports = nextConfig 