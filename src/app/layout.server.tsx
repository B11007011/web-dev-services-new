import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebDev Services - Modern Web Development Solutions",
  description: "Professional web development services offering custom solutions, modern technologies, and exceptional digital experiences.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'WebDev Services',
  },
  formatDetection: {
    telephone: true,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
}; 