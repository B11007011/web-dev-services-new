'use client'

import { motion } from 'framer-motion'
import { Mail, MessageSquare, Phone, MapPin, Clock } from 'lucide-react'
import { useTranslations } from '@/providers/TranslationsProvider'
import { useState } from 'react'

type ContactTranslations = {
  title: string;
  subtitle: string;
  form: {
    name: string;
    email: string;
    phone: string;
    company: string;
    subject: string;
    budget: string;
    timeline: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    placeholders: {
      subject: string;
      budget: string;
      timeline: string;
      message: string;
    };
    options: {
      subject: {
        standard: string;
        catalog: string;
        multilingual: string;
        ecommerce: string;
        custom: string;
      };
      budget: {
        '40-50k': string;
        '50-60k': string;
        '60-70k': string;
        '70-90k': string;
        '90k+': string;
      };
      timeline: {
        '1-2': string;
        '2-3': string;
        '3-4': string;
        '4+': string;
      };
    };
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    workingHours: string;
  };
}

const defaultContent: ContactTranslations = {
  title: 'Let\'s Build Something Great Together!',
  subtitle: 'Ready to elevate your business? Contact us today for a free consultation and bring your vision to life!',
  form: {
    name: 'Your Name',
    email: 'Your Email',
    phone: 'Phone Number (Optional)',
    company: 'Company Name (Optional)',
    subject: 'Project Type',
    budget: 'Estimated Budget',
    timeline: 'Expected Timeline',
    message: 'Project Details',
    submit: 'Book a Call',
    success: 'Thank you! We will contact you soon.',
    error: 'Failed to send message. Please try again or contact us directly.',
    placeholders: {
      subject: 'Select Project Type...',
      budget: 'Select Budget Range...',
      timeline: 'Select Timeline...',
      message: 'Please describe your project requirements, goals, and any specific features you need...'
    },
    options: {
      subject: {
        standard: 'New Website Design & Development',
        catalog: 'Website Maintenance & Upgrades',
        multilingual: 'Website UI/UX Design',
        ecommerce: 'Website Consulting',
        custom: 'Custom Enterprise Solution'
      },
      budget: {
        '40-50k': 'Under $5,000',
        '50-60k': '$5,000 - $10,000',
        '60-70k': '$10,000 - $20,000',
        '70-90k': '$20,000 - $50,000',
        '90k+': '$50,000+'
      },
      timeline: {
        '1-2': '1-2 weeks',
        '2-3': '2-4 weeks',
        '3-4': '1-2 months',
        '4+': '2+ months'
      }
    }
  },
  contact: {
    email: 'contact@tecxmate.com',
    phone: 'Contact Us on Line/WhatsApp',
    address: 'San Francisco | Taipei | Hanoi | HCMC | Bangkok | Shenzhen',
    workingHours: 'Mon - Fri: 9:00 AM - 6:00 PM (GMT+8)'
  }
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const content = useTranslations<ContactTranslations>('contact');
  const displayContent = Object.keys(content).length === 0 ? defaultContent : content;

  if (!displayContent || !displayContent.contact) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      _subject: `New Contact Form Submission - ${formData.get('subject')}`,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      subject: formData.get('subject'),
      budget: formData.get('budget'),
      timeline: formData.get('timeline'),
      message: formData.get('message')
    }

    try {
      const response = await fetch('https://formspree.io/f/xnnjvnlq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        form.reset()
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        console.error('Form submission error:', responseData)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-950 via-black to-blue-950" id="contact">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif"
          >
            {displayContent.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            {displayContent.subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 p-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Email</h3>
                    <a href={`mailto:${displayContent.contact.email}`} className="text-white/70 hover:text-blue-400 transition-colors">
                      {displayContent.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 p-6">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-blue-400" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Phone</h3>
                    <a href={`tel:${displayContent.contact.phone}`} className="text-white/70 hover:text-blue-400 transition-colors">
                      {displayContent.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 p-6">
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Address</h3>
                    <p className="text-white/70">{displayContent.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 p-6">
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-blue-400" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Working Hours</h3>
                    <p className="text-white/70">{displayContent.contact.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      {displayContent.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      {displayContent.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      {displayContent.form.phone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                      {displayContent.form.company}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      {displayContent.form.subject}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="" className="bg-gray-900">{displayContent.form.placeholders.subject}</option>
                      {Object.entries(displayContent.form.options.subject).map(([key, value]) => (
                        <option key={key} value={value} className="bg-gray-900">
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
                      {displayContent.form.budget}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="" className="bg-gray-900">{displayContent.form.placeholders.budget}</option>
                      {Object.entries(displayContent.form.options.budget).map(([key, value]) => (
                        <option key={key} value={value} className="bg-gray-900">
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-white mb-2">
                      {displayContent.form.timeline}
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="" className="bg-gray-900">{displayContent.form.placeholders.timeline}</option>
                      {Object.entries(displayContent.form.options.timeline).map(([key, value]) => (
                        <option key={key} value={value} className="bg-gray-900">
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    {displayContent.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder={displayContent.form.placeholders.message}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 text-white rounded-lg font-medium transition-all duration-200 ${
                      isSubmitting
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : displayContent.form.submit}
                  </button>
                </div>

                {submitStatus === 'success' && (
                  <div className="text-green-400 text-center">
                    {displayContent.form.success}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-red-400 text-center">
                    {displayContent.form.error}
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-white/20 to-transparent" />
    </section>
  )
}

export default Contact 