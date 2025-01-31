/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'tecxmate.com', 'en.tecxmate.com', 'vi.tecxmate.com', 'tw.tecxmate.com'],
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  output: 'server',
}

module.exports = nextConfig 