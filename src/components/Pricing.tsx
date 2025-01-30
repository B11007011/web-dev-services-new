'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useTranslations } from '@/providers/TranslationsProvider'

type PricingTranslations = {
  title: string;
  subtitle: string;
  plans: Array<{
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
  }>;
}

const defaultContent: PricingTranslations = {
  title: 'Pricing Plans',
  subtitle: 'Choose the perfect plan for your needs',
  plans: [
    {
      name: 'Basic',
      price: '$999',
      description: 'Perfect for small business websites',
      features: [
        'Responsive Design',
        'Basic SEO Optimization',
        '3 Pages',
        'Contact Form',
        '1 Month Support'
      ],
      cta: 'Get Started'
    },
    {
      name: 'Professional',
      price: '$2499',
      description: 'Ideal for growing businesses',
      features: [
        'Everything in Basic',
        'Advanced SEO',
        'Up to 10 Pages',
        'Blog Integration',
        'E-commerce Features',
        '3 Months Support'
      ],
      cta: 'Get Started'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large scale applications',
      features: [
        'Everything in Professional',
        'Custom Features',
        'Unlimited Pages',
        'Advanced Analytics',
        'Priority Support',
        '12 Months Support'
      ],
      cta: 'Contact Us'
    }
  ]
}

const Pricing = () => {
  const translations = useTranslations<PricingTranslations>('pricing')
  const content = translations || defaultContent

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-950 via-black to-blue-950" id="pricing">
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

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {content.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-blue-400 mb-4">{plan.price}</div>
                  <p className="text-white/70">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                      className="flex items-center gap-3 text-white/80"
                    >
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full py-3 px-6 text-center text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-colors duration-300"
                  >
                    {plan.cta}
                  </motion.a>
                </div>
              </div>
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

export default Pricing 