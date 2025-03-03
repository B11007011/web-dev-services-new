import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from 'webpack';

/** @type {import('next').NextConfig} */
const config: NextConfig = {
 
  images: {
    unoptimized: true, // Disable image optimization for static export
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure webpack for JSON and optimize chunks
  webpack: (config: WebpackConfig, { dev, isServer }) => {
    // Ensure module and rules exist
    if (!config.module) config.module = { rules: [] };
    if (!config.module.rules) config.module.rules = [];

    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
      resolve: {
        alias: {
          '@': '.',
        },
      },
    });

    if (!isServer && !dev) {
      // Optimize CSS chunks
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 244000,
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.(css|scss)$/,
              chunks: 'all',
              enforce: true,
              priority: 20,
            },
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
              name: 'vendors',
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
              name: 'commons',
            },
          },
        },
      };
    }

    return config;
  },
  // Add compression
  compress: true,
  // Disable experimental features that might cause issues
  experimental: {
    scrollRestoration: true,
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', '@radix-ui/react-*'],
    // Add modern CSS optimization
    modernBrowsers: true,
    legacyBrowsers: false,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  // Add chunk optimization
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  generateEtags: true,
  // Optimize page loading
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default config;
