'use client'

import React from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from '@/hooks/use-media-query'

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string
    link: string
    thumbnail: string
  }[]
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const firstRow = products.slice(0, 5)
  const secondRow = products.slice(5, 10)
  const thirdRow = products.slice(10, 15)
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const springConfig = { 
    stiffness: isMobile ? 150 : 300, 
    damping: isMobile ? 15 : 30, 
    bounce: isMobile ? 50 : 100 
  }

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? 500 : 1000]),
    springConfig
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? -500 : -1000]),
    springConfig
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [isMobile ? 10 : 15, 0]),
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [isMobile ? 10 : 20, 0]),
    springConfig
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [isMobile ? -300 : -700, isMobile ? 200 : 500]),
    springConfig
  )

  return (
    <div
      ref={ref}
      className="h-[200vh] md:h-[300vh] py-20 md:py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      role="region"
      aria-label="Featured Projects Showcase"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative z-10"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 md:space-x-20 mb-10 md:mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-10 md:mb-20 space-x-10 md:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-10 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-3xl md:text-7xl font-bold dark:text-white">
        The Ultimate <br /> development studio
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-4 md:mt-8 dark:text-neutral-200">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  )
}

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string
    link: string
    thumbnail: string
  }
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
        transition: { duration: 0.3 }
      }}
      key={product.title}
      className="group/product h-64 md:h-96 w-[20rem] md:w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary rounded-lg overflow-hidden"
        aria-label={`View project: ${product.title}`}
      >
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover object-left-top absolute h-full w-full inset-0 transition-transform duration-300 group-hover/product:scale-105"
          alt={`Preview of ${product.title}`}
          loading="lazy"
          sizes="(max-width: 768px) 20rem, 30rem"
        />
      </Link>
      <div 
        className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-70 bg-black transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      ></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white transition-opacity duration-300 text-lg md:text-xl font-semibold">
        {product.title}
      </h2>
    </motion.div>
  )
} 