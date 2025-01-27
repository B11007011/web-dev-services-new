'use client'

import { useState } from 'react'

type Tab = {
  id: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
}

type TabsProps = {
  tabs: Tab[]
  defaultTab?: string
  variant?: 'line' | 'pill'
}

const Tabs = ({ tabs, defaultTab = tabs[0]?.id, variant = 'line' }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const variantStyles = {
    line: {
      nav: 'border-b border-gray-200',
      tab: 'px-4 py-2 border-b-2 -mb-px',
      activeTab: 'border-blue-600 text-blue-600',
      inactiveTab: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    },
    pill: {
      nav: 'space-x-2',
      tab: 'px-4 py-2 rounded-full',
      activeTab: 'bg-blue-600 text-white',
      inactiveTab: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
    }
  }

  const styles = variantStyles[variant]

  return (
    <div>
      {/* Tab Navigation */}
      <nav className={`flex ${styles.nav}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center font-medium transition-colors duration-200 ${styles.tab} ${
              activeTab === tab.id ? styles.activeTab : styles.inactiveTab
            }`}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`transition-opacity duration-200 ${
              activeTab === tab.id ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tabs 