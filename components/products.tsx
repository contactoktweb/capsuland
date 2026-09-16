"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { products, getMainImage, hasProductImage, type Product } from "@/lib/products"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
}

/** Selección determinista inicial con imágenes para SSR, luego aleatoria en cliente */
const INITIAL_FEATURED = products.filter(hasProductImage).slice(0, 4)

interface ProductsProps {
  products?: Product[]
  title?: string
  subtitle?: string
}

export default function Products({ products: propProducts, title: propTitle, subtitle: propSubtitle }: ProductsProps) {
  const [featured, setFeatured] = useState<Product[]>(INITIAL_FEATURED)

  useEffect(() => {
    const list = propProducts && propProducts.length > 0 ? propProducts : products
    const valid = list.filter(hasProductImage)
    const shuffled = [...valid].sort(() => Math.random() - 0.5)
    setFeatured(shuffled.slice(0, 4))
  }, [propProducts])

  const sectionTitle = propTitle || "Suplementos Dietarios"
  const sectionSubtitle = propSubtitle || "Descubre nuestra línea de suplementos en cápsula blanda con registro INVIMA, desarrollados con los más altos estándares de calidad."

  return (
    <section id="productos" className="py-24 md:py-32 bg-light">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="mb-16 text-center">
          <span className="inline-flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
            <Icon icon="ph:star-four-light" className="w-4 h-4" />
            Productos Destacados
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            {sectionTitle}
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-lg">
            {sectionSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featured.map((product, index) => {
            const mainImage = getMainImage(product)

            return (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl border border-charcoal/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                <Link href={`/tienda/${product.slug}`} className="block">
                  <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    {mainImage && (
                      <Image
                        src={mainImage}
                        alt={`${product.referencia} - Suplemento dietario certificado INVIMA`}
                        width={400}
                        height={400}
                        className="w-[85%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                </Link>

                <div className="p-5 flex flex-col flex-grow">
                  <Link href={`/tienda/${product.slug}`}>
                    <h3 className="text-base font-bold text-charcoal mb-2 leading-tight min-h-[44px] flex items-start hover:text-teal transition-colors">
                      {product.referencia}
                    </h3>
                  </Link>

                  {/* INVIMA siempre visible */}
                  <div className="flex items-center gap-1.5 bg-teal/5 rounded-lg px-3 py-1.5 mb-3 w-fit">
                    <Icon icon="ph:shield-check-light" className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                    <span className="text-[11px] font-semibold text-teal">
                      INVIMA: {product.registroInvima}
                    </span>
                  </div>

                  <p className="text-xs text-charcoal/60 line-clamp-2 flex-grow" title={product.beneficios}>
                    {product.beneficios}
                  </p>

                  <div className="mt-4 pt-3 border-t border-charcoal/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      {(!product.price || product.price <= 0) ? (
                        <span className="text-sm font-bold text-orange">
                          Próximamente
                        </span>
                      ) : (
                        <>
                          {product.originalPrice && (
                            <span className="text-[10px] text-charcoal/30 line-through decoration-charcoal/20">
                              ${product.originalPrice.toLocaleString("es-CO")}
                            </span>
                          )}
                          <span className="text-xl font-bold text-teal">
                            ${product.price.toLocaleString("es-CO")}
                          </span>
                        </>
                      )}
                    </div>
                    <Link
                      href={`/tienda/${product.slug}`}
                      className="text-xs font-semibold text-orange hover:text-orange-dark transition-colors flex items-center gap-1"
                    >
                      Ver detalle
                      <Icon icon="ph:arrow-right-light" className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Ver Todos */}
        <motion.div {...fadeUp} className="text-center">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal/90 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            <Icon icon="ph:storefront-light" className="w-5 h-5" />
            Ver Todos los Productos
            <Icon icon="ph:arrow-right-light" className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
