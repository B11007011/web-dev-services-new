'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from '@/providers/TranslationsProvider'
import { Activity, Clock, Users, Zap } from 'lucide-react'

type StatsTranslations = {
  projects: { number: string; label: string }
  clients: { number: string; label: string }
  experience: { number: string; label: string }
  support: { number: string; label: string }
}

const Stats = () => {
  const [animated, setAnimated] = useState(false)
  const content = useTranslations<StatsTranslations>('stats')

  const stats = [
    { 
      ...content.projects,
      icon: Activity,
      gradient: "from-blue-500 to-blue-600",
      glowColor: "group-hover:shadow-blue-500/40"
    },
    { 
      ...content.clients,
      icon: Users,
      gradient: "from-purple-500 to-purple-600",
      glowColor: "group-hover:shadow-purple-500/40"
    },
    { 
      ...content.experience,
      icon: Clock,
      gradient: "from-pink-500 to-pink-600",
      glowColor: "group-hover:shadow-pink-500/40"
    },
    { 
      ...content.support,
      icon: Zap,
      gradient: "from-cyan-500 to-cyan-600",
      glowColor: "group-hover:shadow-cyan-500/40"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('stats-section')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section id="stats-section" className="relative py-20 bg-[#0B1120] overflow-hidden">
      <div className="absolute inset-0 bg-[#0B1120]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={animated ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-[#0F172A] rounded-2xl p-6 h-full border border-gray-800/50 hover:border-gray-700/50 transition-colors duration-300">
                {/* Glow Effect */}
                <div className={`absolute -inset-px bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-sm transition-all duration-300 ${stat.glowColor}`} />
                
                {/* Content */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={animated ? { scale: 1 } : {}}
                      transition={{ 
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.1 + 0.2 
                      }}
                      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    >
                      {stat.number}
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={animated ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                    className="text-lg text-gray-400"
                  >
                    {stat.label}
                  </motion.div>

                  {/* Bottom Line */}
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats 