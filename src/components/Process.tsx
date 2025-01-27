'use client'

import { motion } from 'framer-motion'
import { Code2, Palette, Rocket, Search } from 'lucide-react'

const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description: 'We start by understanding your business goals, target audience, and technical requirements. Our team conducts thorough research and creates a detailed project roadmap.',
      icon: Search,
      details: [
        'Requirements Analysis',
        'Market Research',
        'Technical Specifications',
        'Project Timeline',
        'Budget Planning'
      ]
    },
    {
      number: '02',
      title: 'Design & Prototyping',
      description: 'Our designers create intuitive user interfaces and engaging user experiences. We focus on modern aesthetics while ensuring optimal functionality.',
      icon: Palette,
      details: [
        'UI/UX Design',
        'Wireframing',
        'Interactive Prototypes',
        'Design System',
        'User Testing'
      ]
    },
    {
      number: '03',
      title: 'Development & Testing',
      description: 'Using cutting-edge technologies, we build robust and scalable solutions. Every feature is thoroughly tested to ensure quality and reliability.',
      icon: Code2,
      details: [
        'Frontend Development',
        'Backend Integration',
        'Quality Assurance',
        'Performance Testing',
        'Security Checks'
      ]
    },
    {
      number: '04',
      title: 'Launch & Support',
      description: 'We ensure a smooth deployment and provide ongoing support. Our team monitors performance and implements continuous improvements.',
      icon: Rocket,
      details: [
        'Deployment Strategy',
        'Performance Monitoring',
        'SEO Optimization',
        'Maintenance',
        '24/7 Support'
      ]
    }
  ]

  return (
    <section className="py-20 bg-[#0B1120]" id="process">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Our Development Process
          </h2>
          <p className="text-xl text-gray-400">
            A systematic approach to delivering exceptional results
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#0B1120] via-blue-600/30 to-[#0B1120] -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-[#0F172A] rounded-xl p-8 shadow-lg relative z-10 border border-gray-800/50 h-full hover:shadow-blue-500/10 hover:shadow-2xl transition-all duration-300">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon size={28} />
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                        viewport={{ once: true }}
                        className="text-gray-400"
                      >
                        {detail}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Connection Dot */}
                  <div className="hidden lg:block absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process 