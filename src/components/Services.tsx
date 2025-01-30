'use client'

import { motion } from 'framer-motion'
import { useTranslations } from '@/providers/TranslationsProvider'

type ServiceTranslations = {
  title: string;
  subtitle: string;
  items: Array<{
    title: string;
    description: string;
    features: string[];
  }>;
}

const defaultServices = {
  title: "🚀 Our Services",
  subtitle: "Comprehensive virtual solutions to accelerate your business growth",
  items: [
    {
      title: "🌐 Web Development",
      description: "Modern, responsive websites built for speed and scalability",
      features: [
        "Next.js & React Architecture",
        "Custom Web Applications",
        "E-commerce Storefronts"
      ]
    },
    {
      title: "📱 Mobile Development",
      description: "Cross-platform apps that captivate iOS and Android users",
      features: [
        "React Native Development",
        "IoT Integration"
      ]
    },
    {
      title: "🛒 E-commerce Solutions",
      description: "End-to-end online stores designed to boost sales",
      features: [
        "Shopping Cart + Chat Integration",
        "Secure Payment Gateway Setup",
        "Automated Inventory Management"
      ]
    },
    {
      title: "🎯 Digital Marketing",
      description: "Data-driven strategies to dominate your market",
      features: [
        "SEO & Conversion Rate Optimization",
        "Social Media Campaigns",
        "ROI Analytics & Training"
      ]
    },
    {
      title: "✨ UI/UX Design",
      description: "Intuitive interfaces that users love at first click",
      features: [
        "Wireframing & Prototyping",
        "User Experience Audits"
      ]
    },
    {
      title: "☁️ Cloud Solutions",
      description: "Scalable infrastructure for seamless growth",
      features: [
        "API/Stream Integration",
        "Server & Database Management"
      ]
    }
  ]
};

export function Services() {
  const content = useTranslations<ServiceTranslations>('services') || defaultServices;

  return (
    <section 
      id="services"
      className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-950 via-black to-blue-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                <div className="text-4xl mb-6 text-white/80 group-hover:text-white transition-colors">
                  {service.title.split(' ')[0]} {/* Show only the emoji */}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title.split(' ').slice(1).join(' ')} {/* Show title without emoji */}
                </h3>
                
                <p className="text-white/70 mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-3 text-white/60 group-hover:text-white/80 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span className="flex-shrink-0 text-blue-400">✔</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-white/20 to-transparent" />
    </section>
  );
} 