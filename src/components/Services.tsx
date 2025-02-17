'use client'

import { cn } from "@/lib/utils"
import { motion } from 'framer-motion'
import { useTranslations } from '@/providers/TranslationsProvider'
import { GlareCard } from '@/components/ui/GlareCard'
import Image from 'next/image'

type ServiceTranslations = {
  title: string;
  subtitle: string;
  items: Array<{
    title: string;
    description: string;
    features: string[];
  }>;
}

const serviceImages = {
  "New Website Design & Development": "/images/hero/services/pexels-junior-teixeira-1064069-2047905.jpg",
  "Website Maintenance & Upgrades": "/images/hero/services/pexels-ismailhamzapolat-28038387.jpg",
  "Website UI/UX Design": "/images/hero/services/pexels-nickoloui-2473183.jpg",
  "Website Consulting": "/images/hero/services/pexels-regeci-9544053.jpg",
  "Email & CRM Solutions": "/images/hero/services/pexels-aykut-aktas-109304778-10946066.jpg",
  "Enterprise Solutions": "/images/hero/services/pexels-cottonbro-7013230.jpg"
};

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

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const title = service.title.split(' ').slice(1).join(' ');
  const imagePath = serviceImages[title] || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group h-[700px]"
    >
      <GlareCard className="h-full">
        <div className="relative h-full">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={imagePath}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              quality={90}
              priority={index < 3}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-black/80 to-purple-900/90 mix-blend-multiply" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col">
            {/* Icon */}
            <div className="text-4xl mb-6 text-white/90 group-hover:text-white transition-colors">
              {service.title.split(' ')[0]}
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-6">
              {title}
            </h3>
            
            {/* Description */}
            <p className="text-white/80 mb-8 text-base">
              {service.description}
            </p>
            
            {/* Features List - with more space */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
              <ul className="space-y-4 pr-2">
                {service.features.map((feature: string, i: number) => (
                  <motion.li 
                    key={i}
                    className="flex items-start gap-3 text-white/70 group-hover:text-white/90 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span className="flex-shrink-0 text-blue-400 mt-1">✔</span>
                    <span className="text-base leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </GlareCard>
    </motion.div>
  );
};

export function Services() {
  const content = useTranslations<ServiceTranslations>('services');
  const displayContent = Object.keys(content).length === 0 ? defaultServices : content;

  return (
    <section 
      id="services"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-950 via-black to-blue-950"
    >
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayContent.items.map((service, idx) => (
            <ServiceCard key={idx} service={service} index={idx} />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-white/20 to-transparent" />
    </section>
  );
} 