'use client'

import { motion } from 'framer-motion'
import { HeroParallax } from './ui/hero-parallax'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function Hero() {
  return (
    <section 
      id="hero"
      className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-blue-50/50" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Transform Your Vision
            </span>
            <br />
            Into Digital Reality
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We craft beautiful, high-performance websites and applications that drive real business results. Our expert team brings your ideas to life with cutting-edge technology.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
            <Link
              href="#portfolio"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 md:py-4 md:text-lg md:px-10"
            >
              View Portfolio
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={fadeInUp}
            className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            <div>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">100+</div>
              <div className="mt-2 text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">95%</div>
              <div className="mt-2 text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">10+</div>
              <div className="mt-2 text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">24/7</div>
              <div className="mt-2 text-gray-600">Support Available</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30 blur-3xl pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 animate-blob" />
      </div>
    </section>
  )
} 