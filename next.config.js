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
  experimental: {
    isrMemoryCacheSize: 0,
    serverActions: true,
  },
  staticPageGenerationTimeout: 0,
  dynamicParams: true,
  generateStaticParams: false,
}

module.exports = nextConfig 