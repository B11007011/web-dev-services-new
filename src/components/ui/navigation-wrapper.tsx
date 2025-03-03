"use client"

import { useEffect, useState, useCallback, ReactNode } from 'react'
import { Home, Laptop, Users, Phone, Newspaper, Code, Lightbulb, HelpCircle } from 'lucide-react'
import { NavBar } from "./tubelight-navbar"
import LanguageSwitcher from '../LanguageSwitcher'
import { usePathname } from 'next/navigation'

interface NavigationWrapperProps {
  children: ReactNode;
}

const NavigationWrapper = ({ children }: NavigationWrapperProps) => {
  return (
    <div className="navigation-wrapper">
      {children}
    </div>
  );
};

export default NavigationWrapper;

export function NavigationBar() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [translations, setTranslations] = useState({
    nav: {
      home: 'Home',
      services: 'Services',
      process: 'Process',
      portfolio: 'Portfolio',
      pricing: 'Pricing',
     
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

  const scrollToSection = useCallback((targetId: string) => {
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

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault()
    
    // Close menu first
    setIsMenuOpen(false)
    
    // Get target section
    const targetId = id.replace('#', '')
    scrollToSection(targetId)
  }, [scrollToSection])

  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsMenuOpen(false)
    scrollToSection('hero')
  }, [scrollToSection])

  // Update active section on scroll with throttling
  useEffect(() => {
    let ticking = false;
    const sections = new Map();

    // Cache section elements
    document.querySelectorAll('section[id]').forEach((section) => {
      sections.set(section.id, {
        element: section,
        offsetTop: (section as HTMLElement).offsetTop,
        height: section.clientHeight
      });
    });

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight / 3;

          for (const [id, section] of sections) {
            const { offsetTop, height } = section;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
              setActiveSection(id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: translations.nav.home, url: '#hero', icon: Home },
    { name: translations.nav.services, url: '#services', icon: Laptop },
    { name: translations.nav.process, url: '#process', icon: Lightbulb },
    { name: translations.nav.portfolio, url: '#portfolio', icon: Laptop },
    { name: translations.nav.pricing, url: '#pricing', icon: Laptop },
   
  ]

  if (!mounted) return null

  return (
    <div className="relative z-[100]">
      <NavBar 
        items={navItems} 
        className="bg-gray-900/60" 
        onItemClick={handleClick}
        onLogoClick={handleLogoClick}
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        onMenuToggle={setIsMenuOpen}
      />
    </div>
  )
} 

