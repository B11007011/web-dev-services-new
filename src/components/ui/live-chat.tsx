'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Tawk_API?: any
    Tawk_LoadStart?: Date
  }
}

export function LiveChat() {
  useEffect(() => {
    // Tawk.to integration script
    const s1 = document.createElement('script')
    s1.async = true
    s1.src = 'https://embed.tawk.to/YOUR_TAWK_TO_ID/default' // You'll need to replace this with your Tawk.to ID
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')
    document.head.appendChild(s1)

    return () => {
      // Cleanup
      if (document.head.contains(s1)) {
        document.head.removeChild(s1)
      }
      if (window.Tawk_API) {
        delete window.Tawk_API
      }
      if (window.Tawk_LoadStart) {
        delete window.Tawk_LoadStart
      }
    }
  }, [])

  return null
} 