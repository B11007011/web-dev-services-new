import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from 'webpack';

/** @type {import('next').NextConfig} */
const config: NextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  
  images: {
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Configure webpack for optimization
  webpack: (config: WebpackConfig, { dev, isServer }) => {
    // Ensure module and rules exist
    if (!config.module) config.module = { rules: [] };
    if (!config.module.rules) config.module.rules = [];

    // Add module rules
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
      resolve: {
        alias: {
          '@': '.',
        },
      },
    });

    // Production optimizations
    if (!dev && !isServer) {
      if (!config.optimization) config.optimization = {};
      
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          automaticNameDelimiter: '-',
          cacheGroups: {
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|framer-motion)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module: any) {
                if (!module.context) return 'vendor';
                const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                if (!match) return 'vendor';
                const packageName = match[1];
                return `npm.${packageName.replace('@', '')}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name: 'shared',
              enforce: true,
              priority: 10,
            },
          },
        },
        minimize: true,
        minimizer: config.optimization.minimizer,
      };
    }

    return config;
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Cache optimization
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 minute
    pagesBufferLength: 2,
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Experimental features
  experimental: {
    scrollRestoration: true,
    optimizeCss: true,
  },
};

export default config;
