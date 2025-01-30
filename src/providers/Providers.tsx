'use client'

import { ThemeProvider } from './ThemeProvider'
import { LiveChat } from '@/components/ui/live-chat'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <LiveChat />
    </ThemeProvider>
  )
} 