import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils'
import { Providers } from '@/providers/Providers'
import ScrollToTop from '@/components/ScrollToTop'
import { headers } from 'next/headers'

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: 'Web Development Services',
  description: 'Professional web development services for modern businesses',
};

// Get language from subdomain
function getLanguageFromHost(host: string): string {
  const subdomain = host.split('.')[0]
  switch (subdomain) {
    case 'vi':
      return 'vi'
    case 'tw':
      return 'zh-TW'
    default:
      return 'en'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers()
  const host = headersList.get('host') || ''
  const isDev = host.includes('localhost') || host.includes('127.0.0.1')
  const lang = getLanguageFromHost(host)
  
  // Construct base domain for alternates
  const domain = isDev 
    ? `localhost:3000`
    : host.includes('.') ? host.split('.').slice(1).join('.') : host

  // Construct full URLs for alternates
  const protocol = isDev ? 'http' : 'https'
  const alternates = {
    en: `${protocol}://en.${domain}/en`,
    vi: `${protocol}://vi.${domain}/vi`,
    'zh-TW': `${protocol}://tw.${domain}/zh-TW`
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="alternate" href={alternates.en} hrefLang="en" />
        <link rel="alternate" href={alternates.vi} hrefLang="vi" />
        <link rel="alternate" href={alternates['zh-TW']} hrefLang="zh-TW" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <Providers>
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
} 
