/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'tecxmate.com', 'en.tecxmate.com', 'vi.tecxmate.com', 'tw.tecxmate.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  // Remove i18n config since it's not compatible with static export
  // We'll handle localization through middleware and static routing
}

module.exports = nextConfig 