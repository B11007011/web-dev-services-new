import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils'
import { Providers } from '@/providers/Providers'
import ScrollToTop from '@/components/ScrollToTop'

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: 'Web Development Services',
  description: 'Professional web development services for modern businesses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <Providers>
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
} 
