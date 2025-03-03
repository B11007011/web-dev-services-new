import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from 'webpack';

/** @type {import('next').NextConfig} */
const config: NextConfig = {
 
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure webpack for JSON and optimize chunks
  webpack: (config: WebpackConfig, { isServer }) => {
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

    // Optimize chunks for client-side only
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          automaticNameDelimiter: '-',
          cacheGroups: {
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
  },
  reactStrictMode: true,
  poweredByHeader: false,
  // Add chunk optimization
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default config;
