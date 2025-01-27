import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'

import Process from '@/components/Process'

import Portfolio from '@/components/Portfolio'

import Pricing from '@/components/Pricing'
import Contact from '@/components/Contact'
import FAQ from '@/components/FAQ'
import Team from '@/components/Team'
// ... import other components

export default function LocalePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <Services />
      
      <Process />
      
      <Portfolio />
      <Team />
     
      <Pricing />
      <FAQ />
      <Contact />
      {/* Add other components */}
    </main>
  )
} 