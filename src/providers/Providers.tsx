'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider } from './ThemeProvider'
import dynamic from 'next/dynamic'

const LiveChat = dynamic(() => import('@/components/ui/live-chat').then(mod => mod.LiveChat), {
  ssr: false
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeProvider>
      <div suppressHydrationWarning>
        {mounted && children}
        {mounted && <LiveChat />}
      </div>
    </ThemeProvider>
  )
} 