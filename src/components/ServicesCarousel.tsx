"use client"

import { memo, useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { useTranslations } from '@/providers/TranslationsProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'

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

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const serviceImages = {
  "New Website Design & Development": "/images/hero/services/pexels-junior-teixeira-1064069-2047905.jpg",
  "Website Maintenance & Upgrades": "/images/hero/services/pexels-ismailhamzapolat-28038387.jpg",
  "Website UI/UX Design": "/images/hero/services/pexels-nickoloui-2473183.jpg",
  "Website Consulting": "/images/hero/services/pexels-regeci-9544053.jpg",
  "Email & CRM Solutions": "/images/hero/services/pexels-aykut-aktas-109304778-10946066.jpg",
  "Enterprise Solutions": "/images/hero/services/pexels-cottonbro-7013230.jpg"
};

const ServiceCard = memo(({ service, onClick }: { service: any; onClick: () => void }) => {
  const title = service.title.split(' ').slice(1).join(' ');
  const imagePath = serviceImages[title];

  return (
  <motion.div
      className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/30 transition-all duration-300 h-full flex flex-col overflow-hidden group"
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    onClick={onClick}
  >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        style={{ 
          backgroundImage: `url(${imagePath})`,
          filter: 'brightness(0.7) contrast(1.2)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-black/70 to-purple-900/80 opacity-80 group-hover:opacity-70 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 text-white/90 group-hover:text-white transition-colors">
      {service.title.split(' ')[0]}
    </div>
    
    <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">
          {title}
    </h3>
    
        <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4">
      {service.description}
    </p>
    
    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
      {service.features.map((feature: string, i: number) => (
        <motion.li 
          key={i}
              className="flex items-start gap-1.5 sm:gap-2 text-white/70 group-hover:text-white/90 transition-colors"
          whileHover={{ x: 5 }}
        >
              <span className="flex-shrink-0 text-blue-400/90 text-xs sm:text-sm mt-0.5">✦</span>
          <span>{feature}</span>
        </motion.li>
      ))}
    </ul>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-45 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
      </div>
  </motion.div>
  );
});

const Carousel = memo(
  ({
    handleClick,
    controls,
    services,
    isCarouselActive,
  }: {
    handleClick: (service: any, index: number) => void
    controls: any
    services: any[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const isScreenSizeMd = useMediaQuery("(max-width: 1024px)")
    const cylinderWidth = isScreenSizeSm ? 600 : isScreenSizeMd ? 900 : 1400
    const faceCount = services.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {services.map((service, i) => (
            <motion.div
              key={`service-${i}`}
              className="absolute flex h-full origin-center items-center justify-center"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(service, i)}
            >
              <div className="w-[85%] h-[85%]">
                <ServiceCard service={service} onClick={() => handleClick(service, i)} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

export function ServicesCarousel() {
  const [activeService, setActiveService] = useState<any | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()
  const content = useTranslations<ServiceTranslations>('services');
  const displayContent = Object.keys(content).length === 0 ? defaultServices : content;

  const handleClick = (service: any) => {
    setActiveService(service)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveService(null)
    setIsCarouselActive(true)
  }

  return (
    <section 
      id="services"
      className="relative py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-blue-950 via-black to-blue-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 font-serif"
          >
            {displayContent.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto"
          >
            {displayContent.subtitle}
          </motion.p>
        </div>

        <motion.div layout className="relative">
          <AnimatePresence mode="sync">
            {activeService && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                layout="position"
                onClick={handleClose}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 md:p-8 lg:p-12"
                style={{ willChange: "opacity" }}
                transition={transitionOverlay}
              >
                <div className="w-full max-w-xl">
                  <ServiceCard service={activeService} onClick={handleClose} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden">
            <Carousel
              handleClick={handleClick}
              controls={controls}
              services={displayContent.items}
              isCarouselActive={isCarouselActive}
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-white/20 to-transparent" />
    </section>
  );
} 