'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useTranslations } from '@/providers/TranslationsProvider'

type FAQTranslations = {
  title: string;
  subtitle: string;
  contactText: string;
  contactLink: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const content = useTranslations<FAQTranslations>('faq') || {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions about our services and process',
    contactText: 'Still have questions?',
    contactLink: 'Contact our support team',
    items: [
      {
        question: 'What technologies do you use for web development?',
        answer: 'We use modern technologies like React, Next.js, TypeScript, and Tailwind CSS for frontend development. For backend, we utilize Node.js, Python, and various cloud services. Our tech stack is always up-to-date with industry standards.'
      },
      {
        question: 'How do you ensure website security?',
        answer: 'We implement multiple layers of security including SSL certificates, secure authentication, data encryption, regular security audits, and protection against common vulnerabilities (XSS, CSRF, SQL injection). We also provide ongoing security monitoring and updates.'
      },
      {
        question: 'What is your development process?',
        answer: 'Our agile development process includes:\n\n1. Requirements gathering and analysis\n2. UI/UX design and prototyping\n3. Iterative development with regular client feedback\n4. Thorough testing and QA\n5. Deployment and optimization\n6. Post-launch support and maintenance'
      },
      {
        question: 'Do you provide SEO optimization?',
        answer: 'Yes, we implement comprehensive SEO strategies including:\n\n• Technical SEO optimization\n• Meta tags and schema markup\n• Performance optimization\n• Mobile responsiveness\n• Content optimization\n• Regular SEO audits and reports'
      },
      {
        question: 'What kind of support do you offer after launch?',
        answer: 'We offer flexible support packages including:\n\n• 24/7 technical support\n• Regular maintenance updates\n• Performance monitoring\n• Security patches\n• Content updates\n• Feature enhancements\n\nSupport plans can be customized based on your needs.'
      },
      {
        question: 'How do you handle project pricing?',
        answer: 'We offer transparent pricing based on project scope and requirements. Each project is unique, so we provide detailed quotes after understanding your specific needs. We also offer:\n\n• Flexible payment plans\n• Milestone-based payments\n• Clear project timelines\n• No hidden costs'
      }
    ]
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-950 via-black to-blue-950" id="faq">
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

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {content.items.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="font-medium text-white">{faq.question}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-white/70">
                          {faq.answer.split('\\n\\n').map((paragraph, i) => (
                            <p key={i} className="mb-4 last:mb-0 whitespace-pre-line">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60 mb-4">{content.contactText}</p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
            whileHover={{ x: 5 }}
          >
            {content.contactLink}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-white/20 to-transparent" />
    </section>
  )
}

export default FAQ 