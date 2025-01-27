import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const config: NextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure webpack for JSON
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
      resolve: {
        alias: {
          '@': '.',
        },
      },
    });
    return config;
  }
};

export default config;
