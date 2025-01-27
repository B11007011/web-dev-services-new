import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en'
  }
};

export default config;
