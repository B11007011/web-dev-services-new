'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, Palette, Code2, Rocket } from 'lucide-react'
import { useTranslations } from '@/providers/TranslationsProvider'

type ProcessTranslations = {
  title: string;
  subtitle: string;
  steps: Array<{
    number: string;
    title: string;
    description: string;
    details: string[];
  }>;
}

const Process = () => {
  const content = useTranslations<ProcessTranslations>('process') || {
    title: 'Our Development Process',
    subtitle: 'A systematic approach to delivering exceptional results with proven methodologies',
    steps: [
      {
        number: '01',
        title: 'Discovery & Strategy',
        description: 'We begin with a deep dive into your business objectives, market analysis, and technical requirements to create a comprehensive strategy.',
        details: [
          'Business Goals Analysis',
          'Target Audience Research',
          'Competitor Analysis',
          'Technology Stack Selection',
          'Project Scope Definition',
          'Budget & Timeline Planning',
          'Risk Assessment'
        ]
      },
      {
        number: '02',
        title: 'Design & UX',
        description: 'Our design team creates stunning, user-centric interfaces that align with your brand and optimize user engagement.',
        details: [
          'UI/UX Strategy',
          'Brand Integration',
          'Wireframing & Mockups',
          'Interactive Prototypes',
          'User Flow Optimization',
          'Mobile-First Design',
          'Accessibility Standards'
        ]
      },
      {
        number: '03',
        title: 'Development & QA',
        description: 'Using modern technologies and best practices, we build robust, scalable solutions with comprehensive testing.',
        details: [
          'Agile Development',
          'Code Quality Standards',
          'Performance Optimization',
          'Security Implementation',
          'Cross-browser Testing',
          'Mobile Responsiveness',
          'Integration Testing'
        ]
      },
      {
        number: '04',
        title: 'Launch & Growth',
        description: 'We ensure a successful launch with continuous monitoring, optimization, and support for sustainable growth.',
        details: [
          'Pre-launch Checklist',
          'SEO Implementation',
          'Performance Monitoring',
          'Analytics Setup',
          'Security Monitoring',
          'Continuous Updates',
          '24/7 Support System'
        ]
      }
    ]
  }

  const icons = [Search, Palette, Code2, Rocket]

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-950 via-black to-blue-950" id="process">
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
            className="text-xl text-white/80"
          >
            {content.subtitle}
          </motion.p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    {React.createElement(icons[index], { className: "w-8 h-8 text-blue-400" })}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70 mb-4">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-center text-white/60 group-hover:text-white/80 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-white/20 to-transparent" />
    </section>
  )
}

export default Process 