import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'vi', 'zh-TW']
const defaultLocale = 'en'

// Language code mapping for common variations
const languageMapping: { [key: string]: string } = {
  'zh': 'zh-TW',
  'zh-TW': 'zh-TW',
  'zh-HK': 'zh-TW',
  'zh-Hant': 'zh-TW',
  'vi-VN': 'vi',
  'en-US': 'en',
  'en-GB': 'en'
}

// Mapping between subdomains and paths
const subdomainToPath: { [key: string]: string } = {
  'en': 'en',
  'vi': 'vi',
  'zh-TW': 'zh-TW'
}

// Cache age definitions
const CACHE_AGES = {
  static: 31536000, // 1 year for static assets
  page: 3600,       // 1 hour for pages
  api: 300,         // 5 minutes for API responses
}

// Asset types that should be cached
const STATIC_ASSETS = [
  'image', 'font', 'script', 'style', 'manifest'
]

function getPreferredLanguage(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  const preferredLanguages = acceptLanguage.split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase())

  for (const lang of preferredLanguages) {
    if (locales.includes(lang)) return lang
    if (languageMapping[lang]) return languageMapping[lang]
    const mainLang = lang.split('-')[0]
    if (languageMapping[mainLang]) return languageMapping[mainLang]
  }

  return defaultLocale
}

function getAssetType(pathname: string): string | null {
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) return 'image'
  if (pathname.match(/\.(woff|woff2|ttf|otf|eot)$/)) return 'font'
  if (pathname.match(/\.(js|mjs)$/)) return 'script'
  if (pathname.match(/\.css$/)) return 'style'
  if (pathname.match(/manifest\.json$/)) return 'manifest'
  return null
}

export async function middleware(request: NextRequest) {
  const { pathname, search, hash } = request.nextUrl
  
  // Handle static assets caching
  const assetType = getAssetType(pathname)
  if (assetType && STATIC_ASSETS.includes(assetType)) {
    const response = NextResponse.next()
    response.headers.set('Cache-Control', `public, max-age=${CACHE_AGES.static}, immutable`)
    return response
  }

  // Handle page caching
  if (!pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    response.headers.set('Cache-Control', `public, max-age=${CACHE_AGES.page}, stale-while-revalidate`)
    return response
  }

  // Handle API caching
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    response.headers.set('Cache-Control', `public, max-age=${CACHE_AGES.api}, stale-while-revalidate`)
    return response
  }

  // Get hostname
  const hostname = request.headers.get('host') || ''

  // Get subdomain
  const subdomain = hostname.split('.')[0]

  // Redirect www to non-www
  if (hostname.startsWith('www.')) {
    return NextResponse.redirect(
      new URL(pathname + search + hash, `https://${hostname.replace('www.', '')}`)
    )
  }

  // Handle language-specific subdomains
  let locale = subdomain
  if (!locales.includes(locale)) {
    locale = 'en'
  }

  // Clone the URL and set the pathname
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`

  // Return rewritten response
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api)
    '/((?!_next|api).*)',
    // Optional: Match API routes
    '/api/:path*',
  ],
} 