import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'vi', 'tw']
const defaultLocale = 'en'

function getLocaleFromSubdomain(request: NextRequest) {
  const host = request.headers.get('host')
  if (!host) return defaultLocale

  // Extract subdomain
  const subdomain = host.split('.')[0]
  if (locales.includes(subdomain)) {
    return subdomain
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const locale = getLocaleFromSubdomain(request)
  
  // If on wrong subdomain, redirect to correct one
  const host = request.headers.get('host')
  if (host) {
    const currentSubdomain = host.split('.')[0]
    if (currentSubdomain !== locale && locales.includes(locale)) {
      const domain = host.split('.').slice(1).join('.')
      const newUrl = new URL(`https://${locale}.${domain}${pathname}`)
      return NextResponse.redirect(newUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 