'use client'

import { PinContainer } from '@/components/ui/pin-container'
import { useTranslations } from '@/providers/TranslationsProvider'
import { motion, useTransform, useScroll } from 'framer-motion'

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
        "Neu.js & React Architecture",
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

  const services = (content.items || []).map((item) => ({
    ...item,
    icon: getServiceIcon(item.title)
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section 
      className="py-24 lg:py-32 relative z-0 overflow-hidden" 
      id="services"
      aria-label="Services Section"
    >
      {/* Background Effects with Parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-blue-50/50 opacity-70"
        style={{
          y: useTransform(useScroll().scrollY, [0, 1000], [0, 150])
        }}
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-[clamp(3rem,6vw,4.5rem)] font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {content.title}
          </h2>
          <p className="text-[clamp(1.25rem,2.25vw,1.75rem)] text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-16 max-w-[1400px] mx-auto"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="flex items-stretch aspect-[3/4]"
              whileHover="hover"
              whileTap="tap"
            >
              <PinContainer title={service.title} href="#contact">
                <div 
                  className="group flex flex-col h-full w-full p-8 bg-white shadow-lg rounded-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300"
                  role="article"
                  aria-label={`${service.title} service card`}
                >
                  <motion.div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300"
                    variants={iconVariants}
                  >
                    <div className="text-4xl text-blue-500" aria-hidden="true">
                      {service.icon}
                    </div>
                  </motion.div>
                  
                  <h3 className="text-[clamp(1.5rem,2.25vw,1.75rem)] font-bold mt-6 mb-3 text-gray-900">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-[clamp(1.125rem,1.75vw,1.25rem)] leading-relaxed mb-6 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mt-auto" role="list">
                    {(service.features || []).map((feature, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start text-gray-600 gap-3 group/item"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <span className="flex-shrink-0 text-blue-500 group-hover/item:text-blue-600 transition-colors" aria-hidden="true">
                          ✔
                        </span>
                        <span className="text-[clamp(0.875rem,1.25vw,1rem)] group-hover/item:text-gray-900 transition-colors font-medium">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-32"
        >
          <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            ✨ Ready to Transform Your Business?
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a 
              href="#contact" 
              className="min-w-[12rem] px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Contact Us
            </motion.a>
            <motion.a 
              href="#audit" 
              className="min-w-[12rem] px-8 py-4 rounded-xl bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Get a Free Audit
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Helper function to get service icons with larger, more detailed icons
function getServiceIcon(title: string) {
  const icons = {
    web: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    mobile: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2zm4-4h.01M7 15h10" />
      </svg>
    ),
    design: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    cloud: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    marketing: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    ecommerce: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  };

  const title_lower = title?.toLowerCase() || '';
  if (title_lower.includes('web')) return icons.web;
  if (title_lower.includes('mobile') || title_lower.includes('app')) return icons.mobile;
  if (title_lower.includes('cloud')) return icons.cloud;
  if (title_lower.includes('market')) return icons.marketing;
  if (title_lower.includes('commerce') || title_lower.includes('shop')) return icons.ecommerce;
  return icons.design;
} 