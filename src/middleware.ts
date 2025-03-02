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

function getAssetType(pathname: string): string | null {
  const extension = pathname.split('.').pop()?.toLowerCase()
  if (!extension) return null

  const assetTypes: Record<string, string> = {
    'png': 'image',
    'jpg': 'image',
    'jpeg': 'image',
    'gif': 'image',
    'svg': 'image',
    'ico': 'image',
    'woff': 'font',
    'woff2': 'font',
    'ttf': 'font',
    'otf': 'font',
    'js': 'script',
    'css': 'style',
    'webmanifest': 'manifest',
    'json': 'manifest'
  }

  return assetTypes[extension] || null
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const search = request.nextUrl.search
  const host = request.headers.get('host') || ''
  
  // Handle asset caching
  const assetType = getAssetType(pathname)
  if (assetType && STATIC_ASSETS.includes(assetType)) {
    const response = NextResponse.next()
    response.headers.set(
      'Cache-Control',
      `public, max-age=${CACHE_AGES.static}, stale-while-revalidate`
    )
    return response
  }

  // Get locale from pathname
  const pathnameParts = pathname.split('/')
  const pathLocale = pathnameParts[1]
  
  // Check if the pathname already includes a valid locale
  if (locales.includes(pathLocale)) {
    const response = NextResponse.next()
    
    // Set appropriate cache headers based on the type of request
    if (pathname.startsWith('/api/')) {
      response.headers.set(
        'Cache-Control',
        `public, max-age=${CACHE_AGES.api}, stale-while-revalidate`
      )
    } else {
      response.headers.set(
        'Cache-Control',
        `public, max-age=${CACHE_AGES.page}, stale-while-revalidate`
      )
    }
    
    return response
  }

  // Get preferred language from accept-language header
  const acceptLanguage = request.headers.get('accept-language')
  let preferredLocale = defaultLocale

  if (acceptLanguage) {
    const preferredLanguages = acceptLanguage.split(',')
    for (const lang of preferredLanguages) {
      const langCode = lang.split(';')[0].trim()
      if (languageMapping[langCode]) {
        preferredLocale = languageMapping[langCode]
        break
      }
      if (locales.includes(langCode)) {
        preferredLocale = langCode
        break
      }
    }
  }

  // Redirect to the appropriate locale path
  return NextResponse.redirect(
    new URL(`/${preferredLocale}${pathname}${search}`, request.url)
  )
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api)
    '/((?!_next|api).*)',
    // Optional: Match API routes
    '/api/:path*',
  ],
} 