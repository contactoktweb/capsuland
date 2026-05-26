import Header from "@/components/header"
import Footer from "@/components/footer"
import StoreClient from "@/components/store-client"
import { client } from "@/sanity/lib/client"
import { productsQuery, categoriesQuery } from "@/sanity/lib/queries"
import Link from "next/link"
import { Icon } from "@iconify/react"

// Force dynamic fetch
export const revalidate = 0

export default async function TiendaPage() {
  const products = await client.fetch(productsQuery)
  const categories = await client.fetch(categoriesQuery)

  return (
    <main>
      <Header />
      <StoreClient products={products} categories={categories} />

      {/* Maquila CTA */}
      <section className="py-16 md:py-20 bg-light">
        <div className="mx-auto max-w-5xl px-6">
          <div className="bg-gradient-to-br from-charcoal to-charcoal/95 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 bg-teal/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange/10 rounded-full blur-3xl" />

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 rounded-full px-4 py-1.5 mb-5">
                  <Icon icon="ph:factory-light" className="w-4 h-4 text-teal" />
                  <span className="text-xs font-semibold text-teal uppercase tracking-wider">
                    Servicios de Maquila
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  ¿Necesitas fabricar tu propia línea de suplementos?
                </h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Somos laboratorio farmacéutico certificado. Fabricamos cápsulas
                  blandas con tu marca, desde la formulación hasta el registro
                  INVIMA y el empaque final.
                </p>
              </div>

              <div className="flex flex-col gap-3 md:items-end">
                <Link
                  href="/#contacto"
                  className="inline-flex items-center justify-center gap-2 bg-teal hover:bg-teal-dark text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-teal/20 text-sm"
                >
                  <Icon icon="ph:chat-circle-text-light" className="w-5 h-5" />
                  Solicitar Cotización
                </Link>
                <Link
                  href="/#servicios"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-3.5 rounded-full transition-all border border-white/15 text-sm"
                >
                  <Icon icon="ph:flask-light" className="w-5 h-5" />
                  Ver Servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

