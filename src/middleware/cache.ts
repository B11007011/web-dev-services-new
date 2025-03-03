import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Cache static assets with optimized settings
  if (request.nextUrl.pathname.match(/\.(js|css|woff2?)$/)) {
    // Cache JS, CSS, and fonts for 1 year
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|ico|svg|webp)$/)) {
    // Cache images for 1 week with stale-while-revalidate
    response.headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
  }
  
  // Cache API responses with stale-while-revalidate
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600');
  }
  
  // Add performance and security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  
  // Enable compression
  response.headers.set('Accept-Encoding', 'gzip, deflate, br');
  
  // Add resource hints
  response.headers.set('Link', '</fonts/inter.woff2>; rel=preload; as=font; crossorigin');
  
  return response;
} 