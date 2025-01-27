'use client'

import Link from 'next/link'

type BreadcrumbItem = {
  label: string
  href: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  separator?: string | React.ReactNode
  maxItems?: number
}

const Breadcrumbs = ({
  items,
  separator = '/',
  maxItems = 3
}: BreadcrumbsProps) => {
  const visibleItems = items.length > maxItems
    ? [
        ...items.slice(0, 1),
        { label: '...', href: '' },
        ...items.slice(-2)
      ]
    : items

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link
            href="/"
            className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </li>

        {visibleItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="mx-2 text-gray-400">{separator}</span>
            {item.href ? (
              <Link
                href={item.href}
                className={`hover:text-blue-600 transition-colors duration-200 ${
                  index === visibleItems.length - 1
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-500'
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs 