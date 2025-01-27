"use client"

import React, { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  onItemClick?: (e: React.MouseEvent<HTMLElement>, id: string) => void
  activeSection?: string
  isMenuOpen?: boolean
  onMenuToggle?: (isOpen: boolean) => void
}

export function NavBar({ items, className, onItemClick, activeSection, isMenuOpen = false, onMenuToggle }: NavBarProps) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleItemClick = (e: React.MouseEvent<HTMLElement>, url: string) => {
    e.preventDefault()
    if (onItemClick) {
      onItemClick(e, url)
    }
  }

  useEffect(() => {
    setMounted(true)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  if (!mounted) return null

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "px-4 py-3 md:py-3",
        className
      )}
      style={{
        paddingTop: 'env(safe-area-inset-top, 0.75rem)',
      }}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => onMenuToggle?.(!isMenuOpen)}
          className={cn(
            "md:hidden fixed top-0 right-4 z-50",
            "w-10 h-10 flex items-center justify-center",
            "rounded-full bg-white/10 backdrop-blur-md",
            "border border-white/20",
            "safe-top",
            "active:scale-95 transition-transform"
          )}
        >
          {isMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>

        {/* Desktop Navigation */}
        <div className={cn(
          "hidden md:flex items-center justify-start gap-1",
          "bg-white/10 border border-white/20 backdrop-blur-md",
          "py-2 px-3 rounded-full shadow-lg"
        )}>
          {items.map((item) => {
            const itemId = item.url.replace('#', '')
            const isActive = activeSection === itemId

            return (
              <button
                key={item.name}
                type="button"
                onClick={(e) => handleItemClick(e, item.url)}
                className={cn(
                  "relative px-4 py-1.5 rounded-full",
                  "text-[15px] font-medium",
                  "text-gray-300 hover:text-white",
                  "transition-all duration-200",
                  "active:scale-95",
                  isActive && "text-white bg-white/10"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="lamp-desktop"
                    className="absolute inset-0 w-full rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-t-full opacity-80">
                      <div className="absolute w-12 h-6 bg-blue-500/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-blue-500/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-blue-500/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </button>
            )
          })}
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "fixed inset-0 z-40",
                "bg-gradient-to-b from-gray-900/95 to-black/95",
                "backdrop-blur-md",
                "flex flex-col items-center justify-center",
                "safe-top safe-bottom",
                "px-4"
              )}
            >
              <div className="flex flex-col items-stretch gap-3 w-full max-w-sm mx-auto">
                {items.map((item) => {
                  const itemId = item.url.replace('#', '')
                  const isActive = activeSection === itemId

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={(e) => handleItemClick(e, item.url)}
                      className={cn(
                        "flex items-center gap-3",
                        "px-6 py-4 rounded-2xl",
                        "text-lg font-medium text-left",
                        "text-gray-300 hover:text-white",
                        "transition-all duration-200",
                        "active:scale-95",
                        "relative overflow-hidden",
                        isActive ? "bg-white/15" : "hover:bg-white/10"
                      )}
                    >
                      <item.icon size={24} className="shrink-0" />
                      <span className="truncate">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="lamp-mobile"
                          className="absolute inset-0 -z-10"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
