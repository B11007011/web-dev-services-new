'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider } from './ThemeProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeProvider>
      <div suppressHydrationWarning>
        {mounted && children}
      </div>
    </ThemeProvider>
  )
} 