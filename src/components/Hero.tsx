'use client'

import { motion } from 'framer-motion'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { useTranslations } from '@/providers/TranslationsProvider'
import { ArrowRight, Code2, Rocket, Shield } from 'lucide-react'

type HeroTranslations = {
  title: string;
  subtitle: string;
  cta: string;
}

const features = [
  {
    icon: Code2,
    text: "Modern Tech Stack",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Shield,
    text: "Secure & Scalable",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Rocket,
    text: "Fast Performance",
    color: "from-pink-400 to-pink-600"
  }
]

export default function Hero() {
  const content = useTranslations<HeroTranslations>('hero');

  return (
    <section id="hero" className="relative min-h-[100vh] w-full bg-[#0B1120] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <BackgroundGradientAnimation />
        <div className="absolute inset-0 bg-[#0B1120]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100vh] px-4">
        <div className="w-full max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative inline-block"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-50"
              />
              <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight">
                {content.title}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto"
            >
              {content.subtitle}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="flex items-center space-x-2 bg-[#0F172A] rounded-full px-4 py-2 border border-gray-800"
                >
                  <div className={`p-1 rounded-full bg-gradient-to-r ${feature.color}`}>
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="relative inline-block group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <button className="relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg font-semibold text-white text-lg flex items-center space-x-2 hover:shadow-xl hover:shadow-purple-500/20 transition duration-300 hover:scale-105">
                <span>{content.cta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-purple-500/50 to-transparent" />
        </div>
      </div>
    </section>
  );
} 