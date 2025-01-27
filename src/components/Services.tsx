'use client'

import { PinContainer } from '@/components/ui/pin-container'
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
  title: "Our Services",
  subtitle: "Comprehensive digital solutions to help your business grow",
  items: []
};

const Services = () => {
  const content = useTranslations<ServiceTranslations>('services') || defaultServices;

  const services = (content.items || []).map((item) => ({
    ...item,
    icon: getServiceIcon(item.title)
  }));

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-black via-gray-900 to-black relative z-0" id="services">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {content.title}
          </h2>
          <p className="text-xl text-gray-300">
            {content.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="h-[32rem]">
              <PinContainer title={service.title} href="#contact">
                <div className="flex flex-col gap-4 w-[20rem] p-4 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20">
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    {service.title}
                  </h3>
                  <p className="text-gray-300">{service.description}</p>
                  <ul className="space-y-2">
                    {(service.features || []).map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <svg
                          className="w-4 h-4 mr-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
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
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Helper function to get service icons
function getServiceIcon(title: string) {
  const icons = {
    web: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    mobile: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    design: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  };

  // Return appropriate icon based on service title
  if (title?.toLowerCase().includes('web')) return icons.web;
  if (title?.toLowerCase().includes('mobile') || title?.toLowerCase().includes('app')) return icons.mobile;
  return icons.design;
}

export default Services 