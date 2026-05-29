import Header from "@/components/header"
import Hero from "@/components/hero"
import TrustMarquee from "@/components/trust-marquee"
import Services from "@/components/services"
import Products from "@/components/products"
import About from "@/components/about"
import Process from "@/components/process"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { client } from "@/sanity/lib/client"
import { homepageQuery, globalSettingsQuery, productsQuery } from "@/sanity/lib/queries"

// Force dynamic fetch to keep content fresh
export const revalidate = 0

export default async function Home() {
  const [homepage, settings, products] = await Promise.all([
    client.fetch(homepageQuery),
    client.fetch(globalSettingsQuery),
    client.fetch(productsQuery),
  ])

  return (
    <main>
      <Header settings={settings} />
      <Hero data={homepage?.hero} />
      <TrustMarquee data={homepage?.trustMarquee} />
      <Services data={homepage?.services} />
      <Products products={products} />
      <About data={homepage?.about} />
      <Process data={homepage?.process} />
      <Testimonials data={homepage?.testimonials} />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </main>
  )
}
