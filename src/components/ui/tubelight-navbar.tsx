"use client"

import React, { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon, Menu, X, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { QuoteForm } from "./quote-form"
import LanguageSwitcher from '../LanguageSwitcher'

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  onItemClick?: (e: React.MouseEvent<HTMLElement>, id: string) => void
  onLogoClick?: (e: React.MouseEvent<HTMLElement>) => void
  activeSection?: string
  isMenuOpen?: boolean
  onMenuToggle?: (isOpen: boolean) => void
}

export function NavBar({ items, className, onItemClick, onLogoClick, activeSection, isMenuOpen = false, onMenuToggle }: NavBarProps) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(isMenuOpen)

  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 1024
    setIsMobile(mobile)
    if (!mobile && menuVisible) {
      onMenuToggle?.(false)
      setMenuVisible(false)
      document.body.classList.remove('overflow-hidden')
    }
  }, [menuVisible, onMenuToggle])

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20)
  }, [])

  const toggleMenu = useCallback(() => {
    const newState = !menuVisible
    setMenuVisible(newState)
    onMenuToggle?.(newState)
    if (newState) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [menuVisible, onMenuToggle])

  const handleItemClick = (e: React.MouseEvent<HTMLElement>, url: string) => {
    e.preventDefault()
    if (onItemClick) {
      onItemClick(e, url)
    }
    if (isMobile) {
      toggleMenu()
    }
  }

  useEffect(() => {
    setMounted(true)
    handleResize()
    handleScroll()
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      document.documentElement.classList.add('touch-device')
    }
    
    window.addEventListener("resize", handleResize, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      document.body.classList.remove('overflow-hidden')
    }
  }, [handleResize, handleScroll])

  useEffect(() => {
    setMenuVisible(isMenuOpen)
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isMenuOpen])

  if (!mounted) return null

  return (
    <>
    <motion.nav
      initial={false}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100]",
        "transition-all duration-300",
        "backdrop-saturate-150",
        isScrolled
          ? "bg-gray-900/90 backdrop-blur-md shadow-lg"
          : "bg-gray-800/95",
        className
      )}
      style={{
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {/* Integrated Navigation Bar */}
      <div className="h-16 max-w-7xl mx-auto px-4 relative flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a 
            href="#" 
            onClick={onLogoClick}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-10 h-10">
              <img 
                src="/tecxmate chinese 皇貴科技.png"
                alt="TecXmate 皇貴科技"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-lg leading-none">TecXmate</span>
              <span className="text-gray-400 text-xs leading-none">皇貴科技</span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className={cn(
          "hidden lg:flex items-center justify-center gap-1 flex-1 ml-8",
          "py-2 px-3 rounded-full"
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
                  "touch-device:hover:scale-95",
                  isActive && "text-white bg-gray-700/80"
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

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {/* Request Quote Button */}
          <button
            onClick={() => setIsQuoteFormOpen(true)}
            className={cn(
              "hidden lg:flex items-center gap-2 px-4 py-1.5",
              "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
              "text-sm text-white font-medium rounded-full",
              "hover:shadow-lg hover:shadow-purple-500/20",
              "transition-all duration-200",
              "active:scale-95",
              "touch-device:hover:scale-95"
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            Request a Quote
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className={cn(
              "lg:hidden flex items-center justify-center",
              "w-10 h-10 rounded-full",
              "bg-gray-800/90 backdrop-blur-md",
              "border border-gray-600/50",
              "active:scale-95 transition-transform",
              "touch-device:hover:scale-95",
              "z-[101]"
            )}
          >
            {menuVisible ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence mode="wait">
        {menuVisible && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1,
              height: "calc(100vh - 64px)",
              transition: {
                height: {
                  duration: 0.3,
                  ease: "easeOut"
                },
                opacity: {
                  duration: 0.2,
                  ease: "easeOut"
                }
              }
            }}
            exit={{ 
              opacity: 0,
              height: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: "easeIn"
                },
                opacity: {
                  duration: 0.2,
                  ease: "easeIn"
                }
              }
            }}
            className={cn(
              "fixed inset-x-0 top-[64px] z-[99]",
              "bg-gradient-to-b from-gray-900/95 to-gray-800/95",
              "backdrop-blur-md",
              "flex flex-col items-center",
              "px-4 pt-4 pb-safe",
              "overflow-hidden"
            )}
            style={{
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <motion.div 
              className="w-full h-full overflow-y-auto touch-manipulation"
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.1 }
              }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex flex-col items-stretch gap-3 w-full max-w-sm mx-auto pb-8">
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
                        "touch-device:hover:scale-95",
                        "relative overflow-hidden",
                        isActive ? "bg-gray-700/80" : "hover:bg-gray-800/60"
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

                <div className="flex items-center justify-center mb-2">
                  <LanguageSwitcher />
                </div>

                {/* Mobile Quote Button */}
                <button
                  onClick={() => {
                    setIsQuoteFormOpen(true)
                    onMenuToggle?.(false)
                  }}
                  className={cn(
                    "flex items-center gap-2",
                    "px-5 py-3 rounded-xl",
                    "text-base font-medium text-left text-white",
                    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                    "transition-all duration-200",
                    "active:scale-95",
                    "touch-device:hover:scale-95"
                  )}
                >
                  <FileText className="w-5 h-5" />
                  Request a Quote
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>

    {/* Quote Form Modal */}
    <QuoteForm isOpen={isQuoteFormOpen} onClose={() => setIsQuoteFormOpen(false)} />
    </>
  )
}
