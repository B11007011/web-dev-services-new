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

const defaultFAQ: FAQTranslations = {
  title: 'Frequently Asked Questions',
  subtitle: 'Find answers to common questions about our services, process, and solutions',
  contactText: 'Still have questions?',
  contactLink: 'Contact our support team',
  items: [
    {
      question: 'What technologies do you use for web development?',
      answer: 'We use modern technologies like React, Next.js, TypeScript, and Tailwind CSS for frontend development. For backend, we utilize Node.js, Python, and various cloud services. Our tech stack includes:\n\n• Frontend: React, Next.js, TypeScript, Tailwind CSS\n• Backend: Node.js, Python, Go\n• Database: PostgreSQL, MongoDB, Redis\n• Cloud: AWS, Azure, GCP\n• CMS: Headless CMS solutions\n• DevOps: Docker, Kubernetes, CI/CD\n\nOur tech stack is always up-to-date with industry standards and best practices.'
    },
    {
      question: 'How do you ensure website security?',
      answer: 'We implement multiple layers of security including:\n\n• SSL certificates and HTTPS encryption\n• Secure authentication systems with 2FA\n• Data encryption at rest and in transit\n• Regular security audits and penetration testing\n• Protection against XSS, CSRF, SQL injection\n• DDoS protection and WAF implementation\n• Continuous security monitoring\n• Regular security updates and patches\n• Secure payment gateway integration\n• Data backup and disaster recovery\n• Compliance with GDPR, CCPA, and other regulations'
    },
    {
      question: 'What is your development process?',
      answer: 'Our agile development process includes:\n\n1. Discovery & Planning\n   • Requirements gathering\n   • Technical analysis\n   • Project roadmap creation\n\n2. Design & Prototyping\n   • UI/UX design\n   • Interactive prototypes\n   • Client feedback integration\n\n3. Development\n   • Agile sprints\n   • Regular updates\n   • Continuous integration\n\n4. Testing & QA\n   • Automated testing\n   • Performance testing\n   • Security testing\n\n5. Deployment\n   • Staged rollout\n   • Performance optimization\n   • Infrastructure setup\n\n6. Post-launch\n   • Monitoring\n   • Maintenance\n   • Continuous improvement'
    },
    {
      question: 'Do you provide SEO optimization?',
      answer: 'Yes, we implement comprehensive SEO strategies including:\n\n• Technical SEO\n  - Meta tags and schema markup\n  - Site structure optimization\n  - Mobile optimization\n  - Core Web Vitals optimization\n\n• Content SEO\n  - Keyword research and strategy\n  - Content optimization\n  - Local SEO setup\n\n• Off-page SEO\n  - Backlink strategy\n  - Social signals\n  - Brand mentions\n\n• Analytics & Monitoring\n  - Google Analytics setup\n  - Search Console integration\n  - Regular performance reports'
    },
    {
      question: 'What kind of support do you offer after launch?',
      answer: 'We offer comprehensive support packages including:\n\n• Technical Support\n  - 24/7 emergency support\n  - Bug fixes and updates\n  - Security monitoring\n\n• Maintenance\n  - Regular updates\n  - Performance optimization\n  - Security patches\n\n• Content Updates\n  - Content management\n  - Regular backups\n  - Database maintenance\n\n• Monitoring\n  - Uptime monitoring\n  - Performance tracking\n  - Security scanning\n\nSupport plans can be customized based on your needs.'
    },
    {
      question: 'How do you handle project pricing?',
      answer: 'We offer transparent pricing based on project scope and requirements:\n\n• Fixed Price Projects\n  - Clear deliverables\n  - Defined timeline\n  - Milestone-based payments\n\n• Time & Material\n  - Flexible scope\n  - Regular billing\n  - Resource allocation\n\n• Retainer Model\n  - Ongoing support\n  - Reserved resources\n  - Priority service\n\nAll pricing includes:\n• No hidden costs\n• Clear payment schedules\n• Detailed project planning'
    },
    {
      question: 'What makes your web development services unique?',
      answer: 'Our services stand out through:\n\n• Innovation\n  - Latest technologies\n  - Modern architectures\n  - Progressive solutions\n\n• Quality\n  - Rigorous testing\n  - Best practices\n  - Code quality standards\n\n• Performance\n  - Speed optimization\n  - Scalable solutions\n  - Efficient code\n\n• Support\n  - Dedicated team\n  - Quick response\n  - Ongoing maintenance'
    },
    {
      question: 'How do you handle website maintenance and updates?',
      answer: 'Our maintenance and update process includes:\n\n• Regular Maintenance\n  - Weekly backups\n  - Security updates\n  - Performance checks\n\n• Content Updates\n  - CMS management\n  - Content optimization\n  - Media management\n\n• Technical Updates\n  - Code updates\n  - Plugin updates\n  - Framework updates\n\n• Monitoring\n  - 24/7 uptime monitoring\n  - Performance tracking\n  - Security scanning'
    },
    {
      question: 'What is your approach to mobile responsiveness?',
      answer: 'We ensure mobile excellence through:\n\n• Design\n  - Mobile-first approach\n  - Responsive layouts\n  - Touch-friendly interfaces\n\n• Development\n  - Cross-device testing\n  - Performance optimization\n  - Progressive enhancement\n\n• Testing\n  - Device testing\n  - Browser testing\n  - User experience validation'
    },
    {
      question: 'How do you handle project timelines and deadlines?',
      answer: 'Our project management approach includes:\n\n• Planning\n  - Detailed timeline creation\n  - Resource allocation\n  - Milestone definition\n\n• Execution\n  - Agile methodology\n  - Regular updates\n  - Progress tracking\n\n• Communication\n  - Weekly meetings\n  - Status reports\n  - Instant updates\n\n• Risk Management\n  - Early identification\n  - Mitigation strategies\n  - Contingency planning'
    }
  ]
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const content = useTranslations<FAQTranslations>('faq');
  const displayContent = Object.keys(content).length === 0 ? defaultFAQ : content;

  if (!displayContent || !displayContent.items) {
    return null;
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

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {displayContent.items.map((faq, index) => (
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
          <p className="text-white/60 mb-4">{displayContent.contactText}</p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
            whileHover={{ x: 5 }}
          >
            {displayContent.contactLink}
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