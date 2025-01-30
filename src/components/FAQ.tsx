'use client'

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
    <section className="py-20 relative" id="faq">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-blue-50/50" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600">
            {content.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {content.items.map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow-lg border border-gray-100 rounded-lg overflow-hidden hover:border-blue-200 transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 transform transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-gray-600">
                      {faq.answer.split('\\n\\n').map((paragraph, i) => (
                        <p key={i} className="mb-4 last:mb-0 whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">{content.contactText}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            {content.contactLink}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQ 