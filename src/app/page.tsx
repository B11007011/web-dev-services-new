import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Features from '@/components/Features'
import Process from '@/components/Process'
import Stats from '@/components/Stats'
import Technologies from '@/components/Technologies'
import Portfolio from '@/components/Portfolio'
import CaseStudies from '@/components/CaseStudies'
import Team from '@/components/Team'
import Blog from '@/components/Blog'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
//import CTA from '@/components/CTA'
import Contact from '@/components/Contact'

const heroContent = {
  title: "We Build Amazing Websites",
  subtitle: "Transform your business with modern web solutions",
  cta: "Get Started"
};

export default function Home() {
  return (
    <main className="min-h-screen">
        <Hero dict={heroContent} />
        <section id="stats">
          <Stats />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="process">
          <Process />
        </section>
        <section id="technologies">
          <Technologies />
        </section>
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="case-studies">
          <CaseStudies />
        </section>
        <section id="team">
          <Team />
        </section>
        <section id="blog">
          <Blog />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <section id="contact">
          <Contact />
        </section>
    </main>
  )
}
