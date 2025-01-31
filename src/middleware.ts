import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'vi', 'tw']
const defaultLocale = 'en'

// Language code mapping for common variations
const languageMapping: { [key: string]: string } = {
  'zh': 'tw',
  'zh-TW': 'tw',
  'zh-HK': 'tw',
  'zh-Hant': 'tw',
  'vi-VN': 'vi',
  'en-US': 'en',
  'en-GB': 'en'
}

function getPreferredLanguage(request: NextRequest): string {
  // Get accept-language header
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  // Parse accept-language header
  const preferredLanguages = acceptLanguage.split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase())

  // Check each preferred language
  for (const lang of preferredLanguages) {
    // Check direct match
    if (locales.includes(lang)) {
      return lang
    }
    // Check mapped languages
    if (languageMapping[lang]) {
      return languageMapping[lang]
    }
    // Check language without region
    const mainLang = lang.split('-')[0]
    if (languageMapping[mainLang]) {
      return languageMapping[mainLang]
    }
  }

  return defaultLocale
}

function getLocaleFromSubdomain(request: NextRequest) {
  const host = request.headers.get('host')
  if (!host) return defaultLocale

  // Extract subdomain
  const subdomain = host.split('.')[0]
  if (locales.includes(subdomain)) {
    return subdomain
  }

  return getPreferredLanguage(request)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const host = request.headers.get('host')
  if (!host) return NextResponse.next()

  const currentSubdomain = host.split('.')[0]
  
  // If already on a valid language subdomain, don't redirect
  if (locales.includes(currentSubdomain)) {
    return NextResponse.next()
  }

  // If on main domain, redirect to appropriate language subdomain
  const locale = getPreferredLanguage(request)
  const domain = host.includes('.') ? host.split('.').slice(1).join('.') : host
  const newUrl = new URL(`https://${locale}.${domain}${pathname}`)
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 