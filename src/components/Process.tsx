'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, Palette, Code2, Rocket } from 'lucide-react'
import { useTranslations } from '@/providers/TranslationsProvider'
import { GlareCard } from '@/components/ui/GlareCard'
import Image from 'next/image'

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

const processImages = [
  '/images/hero/services/pexels-cottonbro-7013230.jpg',
  '/images/hero/services/pexels-aykut-aktas-109304778-10946066.jpg',
  '/images/hero/services/pexels-regeci-9544053.jpg',
  '/images/hero/services/pexels-ismailhamzapolat-28038387.jpg'
]

const defaultProcess: ProcessTranslations = {
  title: 'Our Process',
  subtitle: 'A systematic approach to delivering high-quality websites and digital solutions',
  steps: [
    {
      number: '01',
      title: 'Discovery & Consultation',
      description: 'Understanding your goals and requirements to create the perfect solution for your business.',
      details: [
        'Business Goals Analysis',
        'Technical Requirements',
        'Market Research',
        'Budget Planning',
        'Timeline Definition',
        'Technology Stack Selection',
        'Solution Architecture'
      ]
    },
    {
      number: '02',
      title: 'Design & Development',
      description: 'Crafting a high-quality website that perfectly aligns with your brand and requirements.',
      details: [
        'UI/UX Design',
        'Responsive Development',
        'Content Integration',
        'Feature Implementation',
        'Performance Optimization',
        'Security Implementation',
        'Cross-browser Testing'
      ]
    },
    {
      number: '03',
      title: 'Optimization & SEO',
      description: 'Enhancing your website\'s visibility and performance across all search engines.',
      details: [
        'Speed Optimization',
        'SEO Implementation',
        'Content Optimization',
        'Mobile Optimization',
        'Technical SEO',
        'Analytics Setup',
        'Performance Monitoring'
      ]
    },
    {
      number: '04',
      title: 'Launch & Support',
      description: 'Deploying your website and providing continuous support and maintenance.',
      details: [
        'Pre-launch Testing',
        'Deployment',
        'Client Walkthrough',
        'Documentation',
        'Security Monitoring',
        'Regular Updates',
        'Ongoing Support'
      ]
    }
  ]
};

const Process = () => {
  const content = useTranslations<ProcessTranslations>('process');
  const displayContent = Object.keys(content).length === 0 ? defaultProcess : content;

  if (!displayContent || !displayContent.steps) {
    return null;
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
            {displayContent.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80"
          >
            {displayContent.subtitle}
          </motion.p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayContent.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group h-full flex flex-col"
              >
                <GlareCard>
                  <div className="relative h-full">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={processImages[index]}
                        alt={step.title}
                        fill
                        className="object-cover opacity-20"
                        quality={90}
                      />
                    </div>
                    
                    <div className="relative z-10 p-8 h-full flex flex-col">
                      {/* Step Number */}
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                        {step.number}
                      </div>

                      {/* Icon */}
                      <div className="mb-6">
                        {React.createElement(icons[index], { className: "w-8 h-8 text-blue-400" })}
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-white mb-3">
                          {step.title}
                        </h3>
                        <p className="text-white/70 mb-4">
                          {step.description}
                        </p>
                      </div>

                      {/* Details */}
                      <ul className="space-y-2 flex-grow">
                        {step.details.map((detail, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-center text-white/60 hover:text-white/80 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlareCard>
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