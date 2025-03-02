'use client'

import Script from 'next/script'

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Enhanced configuration
          gtag('config', '${measurementId}', {
            send_page_view: true,
            page_title: document.title,
            page_path: window.location.pathname,
            cookie_domain: 'tecxmate.com',
            cookie_flags: 'SameSite=None;Secure',
            custom_map: {
              dimension1: 'language',
              dimension2: 'user_type',
              dimension3: 'page_template'
            }
          });

          // Track language changes
          window.addEventListener('languagechange', function() {
            gtag('event', 'language_change', {
              'language': navigator.language
            });
          });

          // Track scroll depth
          let scrollDepthTriggered = new Set();
          window.addEventListener('scroll', function() {
            const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
            [25, 50, 75, 90].forEach(threshold => {
              if (scrollDepth >= threshold && !scrollDepthTriggered.has(threshold)) {
                scrollDepthTriggered.add(threshold);
                gtag('event', 'scroll_depth', {
                  'depth': threshold
                });
              }
            });
          });
        `}
      </Script>
    </>
  )
} 