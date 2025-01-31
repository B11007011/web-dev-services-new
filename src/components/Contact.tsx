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
  title: 'Get in Touch',
  subtitle: 'Have a project in mind? Let\'s discuss how we can help bring your vision to life. Our team typically responds within 24 hours.',
  form: {
    name: 'Your Name',
    email: 'Your Email',
    phone: 'Phone Number (Optional)',
    company: 'Company Name (Optional)',
    subject: 'Project Type',
    budget: 'Estimated Budget',
    timeline: 'Expected Timeline',
    message: 'Project Details',
    submit: 'Send Message',
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
        standard: 'Standard Multi-page Website',
        catalog: 'Business Catalog Website',
        multilingual: 'Multi-language Website',
        ecommerce: 'E-commerce Website',
        custom: 'Custom Development'
      },
      budget: {
        '40-50k': '$40,000 - $50,000',
        '50-60k': '$50,000 - $60,000',
        '60-70k': '$60,000 - $70,000',
        '70-90k': '$70,000 - $90,000',
        '90k+': '$90,000+'
      },
      timeline: {
        '1-2': '1-2 months',
        '2-3': '2-3 months',
        '3-4': '3-4 months',
        '4+': '4+ months'
      }
    }
  },
  contact: {
    email: 'contact@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, Tech City, TC 12345',
    workingHours: 'Mon - Fri: 9:00 AM - 6:00 PM'
  }
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const translations = useTranslations<ContactTranslations>('contact')
  const content = translations || defaultContent

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
            {content.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            {content.subtitle}
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
                    <a href={`mailto:${content.contact.email}`} className="text-white/70 hover:text-blue-400 transition-colors">
                      {content.contact.email}
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
                    <a href={`tel:${content.contact.phone}`} className="text-white/70 hover:text-blue-400 transition-colors">
                      {content.contact.phone}
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
                    <p className="text-white/70">{content.contact.address}</p>
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
                    <p className="text-white/70">{content.contact.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <form onSubmit={handleSubmit} className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      {content.form.name} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      minLength={2}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-blue-400 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      {content.form.email} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-blue-400 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                      {content.form.phone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-blue-400 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                      {content.form.company}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-blue-400 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                    />
                  </div>
                </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                      {content.form.subject} <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-blue-400 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all appearance-none cursor-pointer"
                    >
                    <option value="" className="bg-blue-950">{content.form.placeholders.subject}</option>
                    <option value="standard" className="bg-blue-950">{content.form.options.subject.standard}</option>
                    <option value="catalog" className="bg-blue-950">{content.form.options.subject.catalog}</option>
                    <option value="multilingual" className="bg-blue-950">{content.form.options.subject.multilingual}</option>
                    <option value="ecommerce" className="bg-blue-950">{content.form.options.subject.ecommerce}</option>
                    <option value="custom" className="bg-blue-950">{content.form.options.subject.custom}</option>
                    </select>
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-white/80 mb-2">
                      {content.form.budget}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-blue-400 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-blue-950">{content.form.placeholders.budget}</option>
                      <option value="40-50k" className="bg-blue-950">{content.form.options.budget['40-50k']}</option>
                      <option value="50-60k" className="bg-blue-950">{content.form.options.budget['50-60k']}</option>
                      <option value="60-70k" className="bg-blue-950">{content.form.options.budget['60-70k']}</option>
                      <option value="70-90k" className="bg-blue-950">{content.form.options.budget['70-90k']}</option>
                      <option value="90k+" className="bg-blue-950">{content.form.options.budget['90k+']}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-white/80 mb-2">
                      {content.form.timeline}
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-blue-400 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-blue-950">{content.form.placeholders.timeline}</option>
                      <option value="1-2" className="bg-blue-950">{content.form.options.timeline['1-2']}</option>
                      <option value="2-3" className="bg-blue-950">{content.form.options.timeline['2-3']}</option>
                      <option value="3-4" className="bg-blue-950">{content.form.options.timeline['3-4']}</option>
                      <option value="4+" className="bg-blue-950">{content.form.options.timeline['4+']}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    {content.form.message} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    minLength={10}
                    placeholder={content.form.placeholders.message}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-blue-400 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{content.form.success}</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-5 h-5" />
                      <span>{content.form.submit}</span>
                    </>
                  )}
                </motion.button>

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {content.form.error}
                  </p>
                )}
              </div>
            </form>
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