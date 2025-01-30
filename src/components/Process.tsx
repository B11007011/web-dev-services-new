'use client'

import { motion } from 'framer-motion'
import { Search, Palette, Code2, Rocket } from 'lucide-react'

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
    <section className="py-20 relative" id="process">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-blue-50/50" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Our Development Process
          </h2>
          <p className="text-xl text-gray-600">
            A systematic approach to delivering exceptional results
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-50 via-blue-600/30 to-blue-50 -translate-y-1/2" />
          
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
                <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:border-blue-200 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
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