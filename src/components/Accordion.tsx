'use client'

import { useState } from 'react'

type AccordionItem = {
  id: string
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: string[]
}

const Accordion = ({ items, allowMultiple = false, defaultOpen = [] }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
      )
    } else {
      setOpenItems((prev) => (prev.includes(itemId) ? [] : [itemId]))
    }
  }

  return (
    <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)

        return (
          <div key={item.id} className="bg-white">
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between px-4 py-5 sm:p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center">
                {item.icon && <span className="mr-3 flex-shrink-0">{item.icon}</span>}
                <span className="text-left text-lg font-medium text-gray-900">{item.title}</span>
              </div>
              <span className="ml-6 flex-shrink-0">
                <svg
                  className={`h-5 w-5 transform text-gray-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {/* Content */}
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-gray-600">{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion 