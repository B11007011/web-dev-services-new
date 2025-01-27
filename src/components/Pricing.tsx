'use client'

import { Check, Zap } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '999',
      description: 'Perfect for small businesses and startups',
      features: [
        'Custom Website Design',
        'Mobile Responsive',
        'Basic SEO Setup',
        '3 Pages',
        '1 Month Support',
        'Contact Form',
        'Basic Analytics',
        'SSL Certificate'
      ],
      cta: 'Start Basic',
      isPopular: false
    },
    {
      name: 'Professional',
      price: '1999',
      description: 'Ideal for growing businesses',
      features: [
        'Everything in Basic',
        'E-commerce Integration',
        'Advanced SEO',
        '10 Pages',
        '3 Months Support',
        'Analytics Integration',
        'Social Media Integration',
        'Performance Optimization',
        'Content Management System',
        'Payment Gateway Integration'
      ],
      cta: 'Go Professional',
      isPopular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale applications',
      features: [
        'Everything in Professional',
        'Custom Features',
        'Priority Support',
        'Unlimited Pages',
        '12 Months Support',
        'Performance Optimization',
        'Security Hardening',
        'Custom Integrations',
        'Dedicated Project Manager',
        'API Development'
      ],
      cta: 'Contact Us',
      isPopular: false
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative" id="pricing">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-300">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-gray-800 ${
                plan.isPopular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-sm px-4 py-1 rounded-bl-lg flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-400 ml-2">/project</span>
                  )}
                </div>
                <ul className="space-y-4 mb-8 min-h-[320px]">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-pink-700'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => window.location.href = '#contact'}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Need a custom solution?</p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:opacity-80 transition-opacity"
          >
            Contact us for custom pricing
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Pricing 