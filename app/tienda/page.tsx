"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  products,
  getMainImage,
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@/lib/products"
import { useCart } from "@/lib/cart-context"

export default function TiendaPage() {
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("")

  /** Productos filtrados */
  const filtered = useMemo(() => {
    let result = products

    if (activeCategory) {
      result = result.filter((p) => p.categoria === activeCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.referencia.toLowerCase().includes(q) ||
          p.beneficios.toLowerCase().includes(q) ||
          p.registroInvima.toLowerCase().includes(q) ||
          p.categoria.toLowerCase().includes(q)
      )
    }

    return result
  }, [searchQuery, activeCategory])

  const clearFilters = () => {
    setSearchQuery("")
    setActiveCategory("")
  }

  return (
    <main>
      <Header />

      {/* Search & Filter Bar */}
      <section className="pt-24 pb-0 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-charcoal/40 mb-6">
            <Link href="/" className="hover:text-teal transition-colors flex items-center gap-1">
              <Icon icon="ph:house-light" className="w-3.5 h-3.5" />
              Inicio
            </Link>
            <Icon icon="ph:caret-right-light" className="w-3 h-3" />
            <span className="text-charcoal font-medium">Tienda</span>
          </nav>

          {/* Title row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">
                Nuestros Suplementos
              </h1>
              <p className="text-charcoal/50 text-sm flex items-center gap-2">
                <Icon icon="ph:flask-light" className="w-4 h-4 text-teal" />
                Fabricados en nuestro laboratorio con registro INVIMA y normas BPM
              </p>
            </div>
            <p className="text-sm text-charcoal/40">
              <span className="font-bold text-charcoal">{filtered.length}</span> de{" "}
              {products.length} productos
            </p>
          </div>

          {/* Search + Category row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-2">
            {/* Search */}
            <div className="relative flex-grow">
              <Icon
                icon="ph:magnifying-glass-light"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/30"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, beneficio o registro INVIMA..."
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-charcoal/10 bg-light text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
                id="store-search"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal/60 transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <Icon icon="ph:x-circle-light" className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Select */}
            <div className="relative min-w-[220px]">
              <Icon
                icon="ph:funnel-light"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/30 pointer-events-none"
              />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full appearance-none pl-12 pr-10 py-3.5 rounded-xl border border-charcoal/10 bg-light text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all cursor-pointer"
                id="store-category"
              >
                <option value="">Todas las categorías</option>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <Icon
                icon="ph:caret-down-light"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40 pointer-events-none"
              />
            </div>

            {/* Clear button */}
            {(searchQuery || activeCategory) && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-charcoal/10 bg-light hover:bg-charcoal/5 text-sm font-medium text-charcoal/60 hover:text-charcoal transition-all flex-shrink-0"
              >
                <Icon icon="ph:x-light" className="w-4 h-4" />
                Limpiar
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12 bg-white min-h-[50vh]">
        <div className="mx-auto max-w-7xl px-6">
          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Icon
                icon="ph:magnifying-glass-light"
                className="w-14 h-14 text-charcoal/15 mx-auto mb-4"
              />
              <p className="text-lg font-semibold text-charcoal/60 mb-2">
                No se encontraron productos
              </p>
              <p className="text-sm text-charcoal/40 mb-6">
                Intenta con otra búsqueda o categoría
              </p>
              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-teal hover:text-teal-dark transition-colors inline-flex items-center gap-1.5"
              >
                <Icon icon="ph:arrow-counter-clockwise-light" className="w-4 h-4" />
                Ver todos los productos
              </button>
            </motion.div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, index) => {
                const mainImage = getMainImage(product)

                return (
                  <motion.article
                    key={product.slug}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: (index % 4) * 0.04 }}
                    className="group relative bg-white rounded-2xl border border-charcoal/5 hover:border-charcoal/10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden"
                  >
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-white/90 backdrop-blur-sm text-charcoal/70 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-charcoal/10 flex items-center gap-1">
                        <Icon icon="ph:tag-light" className="w-3 h-3" />
                        {product.categoria}
                      </span>
                    </div>

                    {/* Product Image */}
                    <Link href={`/tienda/${product.slug}`} className="block">
                      <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center overflow-hidden">
                        {mainImage ? (
                          <Image
                            src={mainImage}
                            alt={`${product.referencia} - Suplemento dietario certificado INVIMA`}
                            width={400}
                            height={400}
                            className="w-[78%] h-[78%] object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2 text-charcoal/25">
                            <Icon
                              icon="ph:image-light"
                              className="w-14 h-14"
                            />
                            <span className="text-xs font-medium">
                              Imagen próximamente
                            </span>
                          </div>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm text-charcoal text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                            <Icon icon="ph:eye-light" className="w-4 h-4" />
                            Ver detalle
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <Link href={`/tienda/${product.slug}`}>
                        <h2 className="text-sm font-bold text-charcoal mb-2 leading-tight min-h-[40px] flex items-start hover:text-teal transition-colors">
                          {product.referencia}
                        </h2>
                      </Link>

                      {/* INVIMA */}
                      <div className="flex items-center gap-1.5 bg-teal/5 rounded-lg px-2.5 py-1.5 mb-3 w-fit">
                        <Icon
                          icon="ph:shield-check-light"
                          className="w-3.5 h-3.5 text-teal flex-shrink-0"
                        />
                        <span className="text-[10px] font-bold text-teal">
                          INVIMA: {product.registroInvima}
                        </span>
                      </div>

                      <p
                        className="text-xs text-charcoal/55 line-clamp-2 flex-grow mb-4"
                        title={product.beneficios}
                      >
                        {product.beneficios}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-charcoal/5">
                        <div className="flex flex-col">
                          {product.originalPrice && (
                            <span className="text-[10px] text-charcoal/30 line-through decoration-charcoal/20">
                              ${product.originalPrice.toLocaleString("es-CO")}
                            </span>
                          )}
                          <span className="text-xl font-bold text-charcoal">
                            ${product.price.toLocaleString("es-CO")}
                          </span>
                        </div>
                        <button
                          onClick={() => addItem(product)}
                          className="inline-flex items-center gap-1.5 bg-orange hover:bg-orange-dark text-white text-xs font-semibold px-4 py-2 rounded-full transition-all hover:scale-105 shadow-sm shadow-orange/20"
                          aria-label={`Agregar ${product.referencia} al carrito`}
                        >
                          <Icon
                            icon="ph:shopping-cart-simple-light"
                            className="w-4 h-4"
                          />
                          Agregar
                        </button>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

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
