'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { NavigationBar } from "@/components/ui/navigation-wrapper";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <html lang={params.locale || 'en'} className="scroll-smooth">
      <head>
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="vi" href="/vi" />
        <link rel="alternate" hrefLang="x-default" href="/" />
      </head>
      <body className={inter.className}>
        <NavigationBar />
        <div className="pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
