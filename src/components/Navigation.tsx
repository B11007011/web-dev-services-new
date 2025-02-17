'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

export function Navigation() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href={`/${locale}`} className="flex-shrink-0 flex items-center">
              <img 
                className="h-8 w-auto" 
                src="/tecxmate chinese 皇貴科技.png" 
                alt="TecXmate 皇貴科技" 
              />
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={`/${locale}${item.href}`}
                className={cn(
                  'inline-flex items-center px-1 pt-1 text-sm font-medium',
                  pathname === item.href
                    ? 'text-indigo-600 border-b-2 border-indigo-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={locale}
                onChange={(e) => {
                  const newLocale = e.target.value
                  window.location.href = pathname.replace(`/${locale}`, `/${newLocale}`)
                }}
              >
                <option value="en">English</option>
                <option value="vi">Tiếng Việt</option>
              </select>
            </div>

            <Link
              href={`/${locale}#contact`}
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 