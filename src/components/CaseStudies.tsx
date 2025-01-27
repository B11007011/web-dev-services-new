'use client'

import Image from 'next/image'
import { useState } from 'react'

const CaseStudies = () => {
  const [activeCase, setActiveCase] = useState(0)

  const cases = [
    {
      title: 'E-commerce Platform',
      client: 'Fashion Retailer',
      description: 'Built a modern e-commerce platform with real-time inventory, AI-powered recommendations, and seamless payment integration.',
      results: [
        '150% increase in online sales',
        '40% improvement in user engagement',
        '3x faster checkout process'
      ],
      image: '/placeholder-case1.jpg',
      tags: ['E-commerce', 'React', 'Node.js', 'AI']
    },
    {
      title: 'Mobile Banking App',
      client: 'Financial Institution',
      description: 'Developed a secure, user-friendly mobile banking application with biometric authentication and real-time transactions.',
      results: [
        '1M+ active users',
        '99.9% uptime',
        '4.8/5 app store rating'
      ],
      image: '/placeholder-case2.jpg',
      tags: ['FinTech', 'React Native', 'Security', 'AWS']
    },
    {
      title: 'Healthcare Platform',
      client: 'Medical Services Provider',
      description: 'Created a comprehensive healthcare platform for remote consultations, appointment scheduling, and medical record management.',
      results: [
        '60% reduction in wait times',
        '90% patient satisfaction',
        '45% cost reduction'
      ],
      image: '/placeholder-case3.jpg',
      tags: ['Healthcare', 'Next.js', 'HIPAA', 'Cloud']
    }
  ]

  return (
    <section className="py-20 bg-white" id="case-studies">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Case Studies</h2>
          <p className="text-xl text-gray-600">
            Real results for real businesses
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation */}
          <div className="lg:w-1/3">
            <div className="space-y-4">
              {cases.map((caseItem, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                    activeCase === index
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveCase(index)}
                >
                  <h3 className="text-xl font-semibold mb-2">{caseItem.title}</h3>
                  <p className={activeCase === index ? 'text-blue-100' : 'text-gray-600'}>
                    {caseItem.client}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64 md:h-96">
                <Image
                  src={cases[activeCase].image}
                  alt={cases[activeCase].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {cases[activeCase].tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">{cases[activeCase].description}</p>
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Key Results:</h4>
                  <ul className="space-y-3">
                    {cases[activeCase].results.map((result, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies 