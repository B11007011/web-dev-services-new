'use client'

import { useState, useEffect, useCallback } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return
    
    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      const scrolled = window.scrollY
      setIsVisible(scrolled > 300)
    })
  }, [])

  // Handle mounting
  useEffect(() => {
    setMounted(true)
    handleScroll() // Initial check
  }, [handleScroll])

  // Handle scroll with throttle
  useEffect(() => {
    if (!mounted) return

    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [mounted, handleScroll])

  const scrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return
    
    requestAnimationFrame(() => {
      const c = document.documentElement.scrollTop || document.body.scrollTop
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop)
        window.scrollTo(0, c - c / 8)
      }
    })
  }, [])

  if (!mounted) return null

  return (
    <div 
      className="fixed bottom-0 right-0 p-4 pointer-events-none z-[200] transform transition-transform duration-300 ease-in-out will-change-transform"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
      }}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl pointer-events-auto transform hover:scale-110 active:scale-95 transition-all duration-200 will-change-transform"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  )
}