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

// Mapping between subdomains and paths
const subdomainToPath: { [key: string]: string } = {
  'en': 'en',
  'vi': 'vi',
  'tw': 'zh-TW'
}

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

export function middleware(request: NextRequest) {
  // Get hostname and pathname from request
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Check if we are in development environment
  const isDev = hostname.includes('localhost') || hostname.includes('127.0.0.1')

  // Get the current subdomain
  const currentSubdomain = hostname.split('.')[0]

  // If on a valid language subdomain
  if (locales.includes(currentSubdomain)) {
    // If root path, redirect to the appropriate language path
    if (pathname === '/' || pathname === '') {
      const langPath = subdomainToPath[currentSubdomain]
      const url = request.nextUrl.clone()
      url.pathname = `/${langPath}`
      return NextResponse.redirect(url)
    }
    
    // Check if current path matches subdomain's language
    const expectedPath = subdomainToPath[currentSubdomain]
    const currentPath = pathname.split('/')[1]?.toLowerCase()
    const expectedPathLower = expectedPath.toLowerCase()
    
    // If path doesn't match subdomain's language, redirect
    if (currentPath !== expectedPathLower) {
      const url = request.nextUrl.clone()
      const restOfPath = pathname.substring(pathname.indexOf('/', 1) || pathname.length)
      url.pathname = `/${expectedPath}${restOfPath}`
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }

  // If not on a language subdomain, redirect to appropriate one
  const preferredLanguage = getPreferredLanguage(request)
  
  try {
    let newUrl: URL
    if (isDev) {
      const port = hostname.includes(':') ? `:${hostname.split(':')[1]}` : ':3000'
      newUrl = new URL(`http://${preferredLanguage}.localhost${port}/${subdomainToPath[preferredLanguage]}`)
    } else {
      const mainDomain = hostname.includes('.') ? hostname.split('.').slice(1).join('.') : hostname
      newUrl = new URL(`https://${preferredLanguage}.${mainDomain}/${subdomainToPath[preferredLanguage]}`)
    }

    // Add search params if any
    newUrl.search = request.nextUrl.search
    
    return NextResponse.redirect(newUrl)
  } catch (error) {
    console.error('Error in middleware:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
} 