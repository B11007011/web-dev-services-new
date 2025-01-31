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
    targetAudience: string;
    cta: string;
  }>;
}

const defaultContent: PricingTranslations = {
  title: 'Website Development Plans',
  subtitle: 'Choose the perfect solution for your business growth',
  plans: [
    {
      name: 'Standard Multi-page',
      price: '$46,800',
      description: 'Perfect for digital transformation',
      targetAudience: 'Ideal for small businesses, consultants, and professionals',
      features: [
        '8 pages custom design',
        'Responsive mobile-first design',
        'Blog/News management system',
        'Dynamic content effects',
        'Contact form system',
        'Flexible content blocks',
        'Content management system',
        'Basic SEO optimization',
        'Google Analytics setup'
      ],
      cta: 'Get Started'
    },
    {
      name: 'Business Catalog',
      price: '$55,800',
      description: 'Professional catalog solution for products/services',
      targetAudience: 'Perfect for manufacturers, tech companies, and product showcases',
      features: [
        'Product catalog system',
        'Product page templates',
        'Full-site dynamic effects',
        'File download system',
        'Floating action buttons',
        'Flexible content management',
        'Advanced CMS features',
        'Advanced SEO features',
        'Multi-department contact forms'
      ],
      cta: 'Most Popular'
    },
    {
      name: 'Multi-language',
      price: '$62,800',
      description: 'International business solution',
      targetAudience: 'Ideal for international companies and export businesses',
      features: [
        'Custom language switcher',
        'Multi-language content system',
        'Product catalog system',
        'Dynamic content effects',
        'Floating action menu',
        'Content management system',
        'International SEO setup',
        'Multi-region optimization',
        'Global audience analytics'
      ],
      cta: 'Go Global'
    },
    {
      name: 'E-commerce',
      price: '$88,000',
      description: 'Complete online store solution',
      targetAudience: 'Perfect for retail and online businesses',
      features: [
        'Product management system',
        'Order management system',
        'Discount system',
        'Payment gateway integration',
        'Shipping integration',
        'Customer accounts',
        'Inventory tracking',
        'Advanced analytics',
        'Marketing tools integration'
      ],
      cta: 'Start Selling'
    },
    {
      name: 'Custom Development',
      price: 'Contact Us',
      description: 'Tailored digital solutions',
      targetAudience: 'For enterprises needing custom features and integrations',
      features: [
        'Interactive animations',
        'Custom UI/UX design',
        'Advanced development',
        'Custom backend systems',
        'Enterprise CMS',
        'API integrations',
        'Custom features',
        'Performance optimization',
        'Dedicated support team'
      ],
      cta: 'Get Quote'
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

        <div className="grid lg:grid-cols-5 gap-8 max-w-[1600px] mx-auto overflow-x-auto pb-4">
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
              
              <div className={`relative h-full flex flex-col bg-white/10 backdrop-blur-lg rounded-2xl border ${
                index === 1 ? 'border-blue-400/30' : 'border-white/20'
              } hover:border-white/30 transition-all duration-300 overflow-hidden p-6`}>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{plan.price}</div>
                  <p className="text-white/70 text-sm mb-2">{plan.description}</p>
                  <p className="text-white/50 text-xs">{plan.targetAudience}</p>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                      className="flex items-start gap-2 text-white/80 text-sm"
                    >
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`block w-full py-2 px-4 text-center text-white rounded-xl text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                      index === 1 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' 
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    {plan.cta}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-white/60"
        >
          <p className="text-sm">All plans include: SSL Certificate, Basic SEO, Google Analytics, and Mobile Responsive Design</p>
          <p className="mt-2 text-sm">First year hosting at 50% off + Free domain (.com/.com.tw)</p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-white/20 to-transparent" />
    </section>
  )
}

export default Pricing 