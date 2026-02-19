import Header from "@/components/header"
import Hero from "@/components/hero"
import TrustMarquee from "@/components/trust-marquee"
import Services from "@/components/services"
import About from "@/components/about"
import Process from "@/components/process"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustMarquee />
      <Services />
      <About />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
