import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Features from '@/components/Features'
import Stats from '@/components/Stats'
// ... import other components

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <Features />
      {/* Add other components */}
    </main>
  )
} 