import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CACHE_TIMES = {
  static: 31536000, // 1 year
  fonts: 31536000,  // 1 year
  images: 86400,    // 1 day
  api: 60,          // 1 minute
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Handle CSS files specifically
  if (request.nextUrl.pathname.endsWith('.css')) {
    response.headers.set('Cache-Control', `public, max-age=${CACHE_TIMES.static}, immutable`);
    response.headers.set('Link', `<${request.nextUrl.pathname}>; rel=preload; as=style`);
    // Add priority hint for CSS
    response.headers.set('Priority', 'high');
    return response;
  }
  
  // Handle JavaScript files
  if (request.nextUrl.pathname.endsWith('.js')) {
    response.headers.set('Cache-Control', `public, max-age=${CACHE_TIMES.static}, immutable`);
    response.headers.set('Link', `<${request.nextUrl.pathname}>; rel=preload; as=script`);
    return response;
  }
  
  // Cache fonts with appropriate 'as' value
  if (request.nextUrl.pathname.match(/\.(woff2?|ttf|otf|eot)$/)) {
    response.headers.set('Cache-Control', `public, max-age=${CACHE_TIMES.fonts}, immutable`);
    response.headers.set('Link', `<${request.nextUrl.pathname}>; rel=preload; as=font; crossorigin`);
  }
  
  // Cache images
  if (request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|ico|svg)$/)) {
    response.headers.set('Cache-Control', `public, max-age=${CACHE_TIMES.images}, stale-while-revalidate=3600`);
  }
  
  // Cache API responses
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', `public, s-maxage=${CACHE_TIMES.api}, stale-while-revalidate=300`);
  }
  
  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
} 