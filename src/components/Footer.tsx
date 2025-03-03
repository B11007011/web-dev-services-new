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

const defaultFooter: FooterTranslations = {
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
};

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [email, setEmail] = useState('')
  
  const content = useTranslations<FooterTranslations>('footer');
  const displayContent = Object.keys(content).length === 0 ? defaultFooter : content;

  if (!displayContent || !displayContent.sections) {
    return null;
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
        { label: 'Free Consultation', href: '#contact' }
      ]
    }
  }

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/tecxmate/about/',
      icon: <Linkedin className="w-5 h-5" />,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/tecxmate',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>,
      color: 'hover:text-pink-400'
    },
    {
      name: 'WhatsApp',
      href: 'https://api.whatsapp.com/send/?phone=%2B886971654047&text&type=phone_number&app_absent=0',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>,
      color: 'hover:text-green-400'
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/tecxmate',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>,
      color: 'hover:text-blue-600'
    },
    {
      name: 'X',
      href: 'https://x.com/tecxmate',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>,
      color: 'hover:text-gray-400'
    },
    // {
    //   name: 'Threads',
    //   href: 'https://www.threads.net/@tecxmate',
    //   icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //     <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.899-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.066-2.332-.317-3.181-1.078-.995-.895-1.528-2.235-1.528-3.843 0-1.608.533-2.948 1.528-3.843.85-.761 1.98-1.145 3.181-1.078 1.59.086 2.844.688 3.73 1.79.461.574.815 1.252 1.059 2.032.632-.744 1.099-1.547 1.384-2.405-1.81-1.238-3.959-1.874-6.408-1.874-2.545 0-4.682.832-6.17 2.41-1.4 1.483-2.12 3.486-2.12 5.957s.72 4.474 2.12 5.957c1.487 1.578 3.624 2.41 6.17 2.41 2.002 0 3.804-.472 5.357-1.405a7.661 7.661 0 002.189-1.974c.717-.87 1.286-1.859 1.698-2.953.459-1.219.68-2.357.68-3.472 0-.931-.123-1.836-.367-2.703-.709-2.522-2.143-4.493-4.258-5.858C17.342 2.786 14.923 2.022 12 2v2c2.424.03 4.562.777 6.347 2.21 1.781 1.428 2.974 3.397 3.55 5.85.194.827.291 1.631.291 2.413 0 .958-.189 1.951-.571 2.975a9.65 9.65 0 01-1.492 2.697 9.563 9.563 0 01-2.155 2.01c-1.698 1.125-3.745 1.695-6.096 1.695z"/>
    //   </svg>,
    //   color: 'hover:text-black'
    // },
    // {
    //   name: 'TikTok',
    //   href: 'https://www.tiktok.com/@tecxmate',
    //   icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //     <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    //   </svg>,
    //   color: 'hover:text-pink-600'
    // },
    // {
    //   name: 'Pinterest',
    //   href: 'https://www.pinterest.com/tecxmate',
    //   icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //     <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
    //   </svg>,
    //   color: 'hover:text-red-600'
    // }
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
              <Image
                src="/logo/3.svg"
                alt="Logo"
                width={350}
                height={140}
                className="w-[500px] h-[100px]"
                priority
              />
            </Link>
            <p className="text-base text-gray-400">
              {displayContent.company.description}
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
          {Object.entries(displayContent.sections).map(([key, section]: [string, { title: string; links: Array<{ label: string; href: string; }> }]) => (
            <div key={key} className="col-span-1">
              <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link: { label: string; href: string }) => (
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
                {displayContent.newsletter.title}
              </h3>
              <p className="text-base text-gray-400">
                {displayContent.newsletter.subtitle}
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder={displayContent.newsletter.placeholder}
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
                    <span>{displayContent.newsletter.subscribing}</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{displayContent.newsletter.subscribed}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{displayContent.newsletter.button}</span>
                  </>
                )}
              </button>
            </form>
            {submitStatus === 'error' && (
              <p className="text-red-500 text-sm text-center mt-3">
                {displayContent.newsletter.error}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              {displayContent.copyright.replace('{year}', new Date().getFullYear().toString())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 