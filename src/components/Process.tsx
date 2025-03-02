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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayContent.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <GlareCard>
                <div className="relative h-[400px]">
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={processImages[index]}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover object-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                      quality={90}
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-black/80 to-purple-900/90 mix-blend-multiply" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* Step Number */}
                    <div className="text-3xl mb-4 text-white/90 group-hover:text-white transition-colors flex items-center gap-3">
                      <span className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg w-12 h-12 flex items-center justify-center font-bold">
                        {step.number}
                      </span>
                      {React.createElement(icons[index], { className: "w-8 h-8 text-blue-400" })}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {step.title}
                    </h3>

                    <p className="text-white/80 mb-4 text-sm line-clamp-2">
                      {step.description}
                    </p>

                    <ul className="space-y-2 mt-auto">
                      {step.details.map((detail, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start gap-2 text-white/70 group-hover:text-white/90 transition-colors text-sm"
                          whileHover={{ x: 5 }}
                        >
                          <span className="flex-shrink-0 text-blue-400 mt-0.5">✔</span>
                          <span className="line-clamp-1">{detail}</span>
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

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-white/20 to-transparent" />
    </section>
  )
}

export default Process 