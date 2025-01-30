'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Github, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from '@/providers/TranslationsProvider'

type FooterTranslations = {
  company: {
    description: string;
  };
  newsletter: {
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
    subscribing: string;
    subscribed: string;
    error: string;
  };
  sections: {
    services: {
      title: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    };
    company: {
      title: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    };
    support: {
      title: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    };
  };
  copyright: string;
}

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [email, setEmail] = useState('')
  
  const content = useTranslations<FooterTranslations>('footer') || {
    company: {
      description: 'Transforming ideas into exceptional digital experiences with modern technology.'
    },
    newsletter: {
      title: 'Get Development Updates',
      subtitle: 'Subscribe to receive the latest tech insights and development tips',
      placeholder: 'Enter your email',
      button: 'Subscribe',
      subscribing: 'Subscribing...',
      subscribed: 'Subscribed!',
      error: 'Failed to subscribe. Please try again.'
    },
    sections: {
      services: {
        title: 'Services',
        links: [
          { label: 'Web Development', href: '#services' },
          { label: 'UI/UX Design', href: '#services' },
          { label: 'Mobile Development', href: '#services' }
        ]
      },
      company: {
        title: 'Company',
        links: [
          { label: 'Our Process', href: '#process' },
          { label: 'Portfolio', href: '#portfolio' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' }
        ]
      },
      support: {
        title: 'Support',
        links: [
          { label: 'Contact Us', href: '#contact' },
          { label: 'Free Consultation', href: '#contact' }
        ]
      }
    },
    copyright: '© {year} All rights reserved.'
  }

  const footerSections = {
    services: {
      title: 'Services',
      links: [
        { label: 'Web Development', href: '#services' },
        { label: 'UI/UX Design', href: '#services' },
        { label: 'Mobile Development', href: '#services' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { label: 'Our Process', href: '#process' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: '#contact' },
        { label: 'Free Consultation', href: '#contact' }
      ]
    }
  }

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: <Linkedin className="w-5 h-5" />,
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: <Github className="w-5 h-5" />,
      color: 'hover:text-purple-400'
    }
  ]

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/xnnjvnlq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _subject: "New Newsletter Subscription",
          email: email,
          subscription: "newsletter"
        })
      })

      const responseData = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setEmail('')
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 3000)
      } else {
        console.error('Newsletter subscription error:', responseData)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-[#0B1120] text-gray-300 relative mt-0">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5" />
      
      <div className="container mx-auto px-4 py-12 sm:py-16 relative">
        {/* Top Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} className="w-10 h-10" />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                WebDev Services
              </span>
            </Link>
            <p className="text-base text-gray-400">
              {content.company.description}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors duration-300 ${social.color} p-2 hover:scale-110 transform`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(content.sections).map(([key, section]) => (
            <div key={key} className="col-span-1">
              <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-base text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group py-1"
                    >
                      <span className="h-px w-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 transition-all duration-300 group-hover:w-4"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-12 pb-8">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                {content.newsletter.title}
              </h3>
              <p className="text-base text-gray-400">
                {content.newsletter.subtitle}
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder={content.newsletter.placeholder}
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{content.newsletter.subscribing}</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{content.newsletter.subscribed}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{content.newsletter.button}</span>
                  </>
                )}
              </button>
            </form>
            {submitStatus === 'error' && (
              <p className="text-red-500 text-sm text-center mt-3">
                {content.newsletter.error}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              {content.copyright.replace('{year}', new Date().getFullYear().toString())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 