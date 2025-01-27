"use client"

import { useEffect, useState, useCallback } from 'react'
import { Home, Laptop, Users, Phone, Newspaper, Code, Lightbulb } from 'lucide-react'
import { NavBar } from "./tubelight-navbar"
import LanguageSwitcher from '../LanguageSwitcher'
import { usePathname } from 'next/navigation'

export function NavigationBar() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [translations, setTranslations] = useState({
    nav: {
      home: 'Home',
    //  stats: 'Stats',
      services: 'Services',
      features: 'Features',
      process: 'Process',
      technologies: 'Technologies',
      portfolio: 'Portfolio',
    //  caseStudies: 'Case Studies',
    //  team: 'Team',
      blog: 'Blog',
    //  testimonials: 'Testimonials',
      pricing: 'Pricing',
    //  faq: 'FAQ',
      contact: 'Contact'
    }
  });

  useEffect(() => {
    const loadTranslations = async () => {
      const messages = await import(`../../../messages/${locale}.json`);
      setTranslations(messages);
    };
    loadTranslations();
  }, [locale]);

  // Mount effect
  useEffect(() => {
    setMounted(true)
  }, [])

  // Menu state effect
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
  }, [isMenuOpen])

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault()
    
    // Close menu first
    setIsMenuOpen(false)
    
    // Get target section
    const targetId = id.replace('#', '')
    const element = document.getElementById(targetId)
    
    if (element) {
      // Update active section
      setActiveSection(targetId)
      
      // Scroll to element
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      // Adjust for navbar height
      const navbarHeight = 80
      window.scrollBy(0, -navbarHeight)
    }
  }, [])

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + window.innerHeight / 3

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionBottom = sectionTop + section.clientHeight
        const sectionId = section.getAttribute('id') || ''

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: translations.nav.home, url: '#hero', icon: Home },
   // { name: translations.nav.stats, url: '#stats', icon: Laptop },
    { name: translations.nav.services, url: '#services', icon: Laptop },
    { name: translations.nav.features, url: '#features', icon: Code },
    { name: translations.nav.process, url: '#process', icon: Lightbulb },
    { name: translations.nav.technologies, url: '#technologies', icon: Code },
    { name: translations.nav.portfolio, url: '#portfolio', icon: Laptop },
   // { name: translations.nav.caseStudies, url: '#case-studies', icon: Newspaper },
   // { name: translations.nav.team, url: '#team', icon: Users },
    { name: translations.nav.blog, url: '#blog', icon: Newspaper },
 //   { name: translations.nav.testimonials, url: '#testimonials', icon: Users },
    { name: translations.nav.pricing, url: '#pricing', icon: Laptop },
  //  { name: translations.nav.faq, url: '#faq', icon: Lightbulb },
    { name: translations.nav.contact, url: '#contact', icon: Phone }
  ]

  if (!mounted) return null

  return (
    <div className="relative">
      <NavBar 
        items={navItems} 
        className="bg-gray-900/60" 
        onItemClick={handleClick}
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        onMenuToggle={setIsMenuOpen}
      />
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
    </div>
  )
} 

