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
  subtitle: "Comprehensive web development and digital solutions for your global business needs",
  items: [
    {
      title: "🌐 New Website Design & Development",
      description: "Custom website solutions for every industry and business need",
      features: [
        "Startup Landing Pages",
        "Personal & Project Portfolio",
        "Education Websites",
        "Corporate & Business Websites",
        "E-commerce Solutions",
        "AI Web Solutions",
        "News, Blog & Media Websites",
        "Real Estate & Rental Websites",
        "Healthcare & Pharmaceutical Websites"
      ]
    },
    {
      title: "🛠️ Website Maintenance & Upgrades",
      description: "Comprehensive maintenance and security services for your website",
      features: [
        "High-Speed Hosting",
        "Domain Registration",
        "Website Diagnostics",
        "Regular Maintenance",
        "Malware Protection",
        "Security Enhancement",
        "Performance Optimization"
      ]
    },
    {
      title: "🎨 Website UI/UX Design",
      description: "Beautiful and functional design solutions for modern websites",
      features: [
        "Redesign Old Websites",
        "Custom Design Requests",
        "Multiple Style Options",
        "Responsive Design",
        "User Experience Optimization",
        "Brand Identity Integration",
        "Modern UI Components"
      ]
    },
    {
      title: "💡 Website Consulting",
      description: "Expert guidance and solutions for your web presence",
      features: [
        "Technical Consultation",
        "Platform Selection",
        "Architecture Planning",
        "Performance Analysis",
        "Security Assessment",
        "SEO Strategy",
        "Scalability Planning"
      ]
    },
    {
      title: "📧 Email & CRM Solutions",
      description: "Automated email systems and customer relationship management",
      features: [
        "Email Engine Setup",
        "Apollo Integration",
        "Amazon Pinpoint",
        "CRM Implementation",
        "Automation Workflows",
        "Customer Data Management",
        "Analytics & Reporting"
      ]
    },
    {
      title: "💼 Enterprise Solutions",
      description: "Custom software solutions for enterprises and SMEs",
      features: [
        "Custom ERP Systems",
        "Business Process Automation",
        "Integration Services",
        "Data Management",
        "Workflow Optimization",
        "Scalable Architecture",
        "Enterprise Security"
      ]
    }
  ]
};

export function Services() {
  const content = useTranslations<ServiceTranslations>('services');
  const displayContent = Object.keys(content).length === 0 ? defaultServices : content;

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
            {displayContent.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            {displayContent.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayContent.items.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative h-full flex flex-col"
              style={{ minHeight: "400px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 h-full flex flex-col">
                
                <div className="text-4xl mb-6 text-white/80 group-hover:text-white transition-colors">
                  {service.title.split(' ')[0]}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 flex-grow">
                  {service.title.split(' ').slice(1).join(' ')}
                </h3>
                
                <p className="text-white/70 mb-6 flex-grow">
                  {service.description}
                </p>
                
                <ul className="space-y-3 flex-grow">
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