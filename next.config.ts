import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
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
