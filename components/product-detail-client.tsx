"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ProductGallery from "@/components/product-gallery"
import { useCart } from "@/lib/cart-context"
import { urlFor } from "@/sanity/lib/image"
import { toast } from "sonner"

import type { ProductPresentation } from "@/lib/products"

interface Product {
  _id: string
  referencia: string
  slug: { current: string }
  price: number
  originalPrice?: number
  cantidad: string
  registroInvima: string
  beneficios: string
  descripcion: string
  modoDeUso?: string
  advertencia?: string
  categoria: string
  presentaciones?: ProductPresentation[]
  gallery?: string[]
}

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()

  const images = product.gallery || []
  const currentImage = images.length > 0 ? images[selectedImage] : null
  const galleryImageUrls = images

  // Clean title: remove redundant 'x 60 Softgels', 'x 30 Softgels' if present in the raw string
  const cleanTitle = (product.referencia || "")
    .replace(/\s*x\s*(30|60)\s*(softgels?|c[aá]psulas?|bl[ií]sters?)/gi, "")
    .trim()

  const presentations: ProductPresentation[] =
    product.presentaciones && product.presentaciones.length > 0
      ? product.presentaciones
      : [
          {
            nombre: "30 Cápsulas",
            formato: "Caja Plegadiza",
            precio: product.price,
            cantidad: product.cantidad || "30 cápsulas blandas",
          },
        ]

  const [selectedPresentationIndex, setSelectedPresentationIndex] = useState(0)
  const currentPresentation =
    presentations[selectedPresentationIndex] || presentations[0]

  const getPresentationDetails = (pres: ProductPresentation, idx: number) => {
    const nameLower = (pres.nombre || "").toLowerCase()
    const formatLower = (pres.formato || "").toLowerCase()

    const is30 =
      nameLower.includes("30") ||
      nameLower.includes("plegadiza") ||
      formatLower.includes("plegadiza") ||
      idx === 0

    const versionTitle = is30 ? "30 Cápsulas" : "60 Cápsulas"
    const formatoTitle = pres.formato || (is30 ? "Caja Plegadiza" : "Frasco")
    const peso = pres.peso && pres.peso !== "aun no disp" ? pres.peso : null

    return {
      versionTitle,
      formatoTitle,
      peso,
      is30,
    }
  }

  const currentDisplay = getPresentationDetails(
    currentPresentation,
    selectedPresentationIndex
  )

  const activePrice = currentPresentation ? currentPresentation.precio : product.price
  const activeOriginalPrice = currentPresentation
    ? currentPresentation.precioOriginal || product.originalPrice
    : product.originalPrice
  const activeCantidad =
    currentPresentation?.cantidad ||
    `${currentDisplay.versionTitle} (${currentDisplay.formatoTitle})`
  const activePeso = currentDisplay.peso

  const handleSelectPresentation = (idx: number) => {
    setSelectedPresentationIndex(idx)
    const pres = presentations[idx]
    if (!pres || images.length <= 1) return

    const { is30 } = getPresentationDetails(pres, idx)
    if (is30) {
      // Find box/plegadiza image without "frasco"
      const boxIdx = images.findIndex((img) => {
        const lower = (img || "").toLowerCase()
        return !lower.includes("frasco") && (lower.includes("front") || lower.includes("perfil"))
      })
      if (boxIdx !== -1) {
        setSelectedImage(boxIdx)
      } else {
        setSelectedImage(0)
      }
    } else {
      // Find frasco image
      const frascoIdx = images.findIndex((img) => {
        const lower = (img || "").toLowerCase()
        return lower.includes("frasco") && (lower.includes("front") || lower.includes("iz"))
      })
      if (frascoIdx !== -1) {
        setSelectedImage(frascoIdx)
      }
    }
  }

  // Format to match standard cart logic expectations
  const cartProduct = {
    slug: product.slug.current,
    referencia: `${cleanTitle} (${currentDisplay.versionTitle})`,
    price: activePrice,
    originalPrice: activeOriginalPrice,
    cantidad: `${currentDisplay.versionTitle} • ${currentDisplay.formatoTitle}`,
    registroInvima: product.registroInvima,
    beneficios: product.beneficios,
    categoria: product.categoria,
    selectedPresentation: `${currentDisplay.versionTitle} (${currentDisplay.formatoTitle})`,
    gallery: images,
  }

  const handleAddToCart = () => {
    addItem(cartProduct, quantity)
    toast.success(
      `Se agregaron ${quantity} unidades de ${cleanTitle} (${currentDisplay.versionTitle}) al carrito.`
    )
    setQuantity(1)
  }

  const handleBuyNow = () => {
    addItem(cartProduct, quantity)
    router.push("/checkout")
  }

  return (
    <>
      {/* Product Detail */}
      <section className="py-10 md:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image */}
              <div
                className={`relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden mb-4 ${
                  images.length > 0 ? "cursor-pointer" : ""
                }`}
                onClick={() => images.length > 0 && setGalleryOpen(true)}
              >
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt={`${cleanTitle} - Vista principal`}
                    width={700}
                    height={700}
                    className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-500"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-charcoal/30">
                    <Icon icon="ph:image-light" className="w-16 h-16" />
                    <span className="text-sm font-medium">Imagen próximamente</span>
                  </div>
                )}

                {/* Click hint */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm text-charcoal/60 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Icon icon="ph:arrows-out-light" className="w-3.5 h-3.5" />
                    Ver galería
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 h-20 rounded-xl bg-gray-50 border-2 overflow-hidden flex-shrink-0 transition-all ${
                        selectedImage === idx
                          ? "border-teal scale-105 shadow-sm"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${cleanTitle} miniatura ${idx + 1}`}
                        fill
                        className="object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Category */}
              <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-teal mb-3">
                <Icon icon="ph:flask-light" className="w-3.5 h-3.5" />
                Suplemento Dietario — {product.categoria}
              </span>

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">
                {cleanTitle}
              </h1>

              {/* INVIMA Badge */}
              <div className="flex items-center gap-2 bg-teal/5 border border-teal/15 rounded-xl px-4 py-3 mb-6 w-fit">
                <Icon icon="ph:shield-check-light" className="w-5 h-5 text-teal" />
                <div>
                  <p className="text-[11px] font-medium text-charcoal/50 uppercase tracking-wider">
                    Registro INVIMA
                  </p>
                  <p className="text-sm font-bold text-teal">{product.registroInvima}</p>
                </div>
              </div>

              {/* Price & Current Version Info with 10% Discount */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
                <div className="flex flex-col">
                  {(!activePrice || activePrice <= 0) ? (
                    <span className="text-3xl font-bold text-orange">
                      Próximamente
                    </span>
                  ) : (
                    <>
                      {activeOriginalPrice && activeOriginalPrice > activePrice && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm md:text-base text-charcoal/40 line-through decoration-charcoal/30">
                            ${activeOriginalPrice.toLocaleString("es-CO")}
                          </span>
                          <span className="text-[11px] font-extrabold text-orange bg-orange/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            10% OFF
                          </span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl md:text-4xl font-extrabold text-charcoal">
                          ${activePrice.toLocaleString("es-CO")}
                        </span>
                        <span className="text-xs font-bold text-charcoal/40 uppercase">
                          COP
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {activePrice > 0 && (
                  <div className="flex flex-col sm:pb-1">
                    <span className="text-xs text-charcoal/70 font-semibold flex items-center gap-1.5">
                      <Icon icon="ph:check-circle-fill" className="w-3.5 h-3.5 text-teal" />
                      {currentDisplay.versionTitle} • {currentDisplay.formatoTitle}
                    </span>
                    {activePeso && (
                      <span className="text-[11px] text-teal font-medium flex items-center gap-1 mt-0.5">
                        <Icon icon="ph:scales-light" className="w-3.5 h-3.5 text-teal" />
                        Peso neto aprox: {activePeso}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Selector de Versión (30 Cápsulas vs 60 Cápsulas) */}
              {presentations.length > 1 && (
                <div className="mb-8 p-4 rounded-2xl bg-gradient-to-br from-charcoal/[0.02] to-teal/[0.03] border border-charcoal/10">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                      <Icon icon="ph:stack-light" className="w-4 h-4 text-teal" />
                      Selecciona la versión del producto:
                    </label>
                    <span className="text-[11px] font-bold text-teal bg-teal/10 px-2.5 py-0.5 rounded-full">
                      2 versiones disponibles
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {presentations.map((pres, idx) => {
                      const isSelected = idx === selectedPresentationIndex
                      const details = getPresentationDetails(pres, idx)
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectPresentation(idx)}
                          className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative flex flex-col justify-between ${
                            isSelected
                              ? "border-teal bg-white ring-2 ring-teal shadow-md"
                              : "border-charcoal/15 bg-white hover:border-charcoal/30 hover:bg-gray-50/60"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                              <Icon
                                icon={details.is30 ? "ph:package-light" : "ph:flask-light"}
                                className={`w-4 h-4 ${
                                  isSelected ? "text-teal" : "text-charcoal/50"
                                }`}
                              />
                              <span
                                className={`text-sm md:text-base font-bold ${
                                  isSelected ? "text-teal" : "text-charcoal"
                                }`}
                              >
                                {details.versionTitle}
                              </span>
                            </div>
                            {isSelected ? (
                              <Icon
                                icon="ph:check-circle-fill"
                                className="w-5 h-5 text-teal flex-shrink-0"
                              />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-charcoal/20 flex-shrink-0" />
                            )}
                          </div>

                          <div className="flex items-center justify-between text-xs text-charcoal/60 mb-2">
                            <span>{details.formatoTitle}</span>
                            {details.peso && (
                              <span className="text-[11px] bg-charcoal/5 px-2 py-0.5 rounded-full font-medium">
                                {details.peso}
                              </span>
                            )}
                          </div>

                          <div className="pt-2 border-t border-charcoal/5 flex items-baseline justify-between mt-auto">
                            <div className="flex flex-col">
                              {pres.precioOriginal && pres.precioOriginal > pres.precio && (
                                <span className="text-[11px] text-charcoal/40 line-through decoration-charcoal/25">
                                  ${pres.precioOriginal.toLocaleString("es-CO")}
                                </span>
                              )}
                              <span className="text-base font-extrabold text-charcoal">
                                ${pres.precio ? pres.precio.toLocaleString("es-CO") : "0"}
                              </span>
                            </div>
                            {pres.precioOriginal && pres.precioOriginal > pres.precio && (
                              <span className="text-[10px] font-bold text-orange bg-orange/10 px-1.5 py-0.5 rounded">
                                -10%
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Beneficios */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="ph:star-light" className="w-4 h-4 text-orange" />
                  <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider">
                    Beneficios
                  </h2>
                </div>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {product.beneficios}
                </p>
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="ph:note-light" className="w-4 h-4 text-teal" />
                  <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider">
                    Descripción
                  </h2>
                </div>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {product.descripcion}
                </p>
              </div>

              {/* Modo de uso */}
              {product.modoDeUso && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="ph:pill-light" className="w-4 h-4 text-teal" />
                    <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider">
                      Modo de Uso
                    </h2>
                  </div>
                  <p className="text-sm text-charcoal/70">{product.modoDeUso}</p>
                </div>
              )}
              {/* Quantity + Add to cart */}
              {(!activePrice || activePrice <= 0) ? (
                <div className="mt-auto pt-6 border-t border-charcoal/5">
                  <div className="flex items-center gap-3 bg-orange/5 border border-orange/15 rounded-2xl p-4 text-orange">
                    <Icon icon="ph:clock-light" className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider mb-0.5">
                        Lanzamiento Próximo
                      </h3>
                      <p className="text-xs text-charcoal/60 leading-relaxed">
                        Este suplemento estará disponible para compra muy pronto. ¡Mantente atento a nuestras novedades!
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-auto pt-6 border-t border-charcoal/5">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-charcoal/15 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-charcoal/60 hover:bg-charcoal/5 transition-colors"
                      aria-label="Reducir cantidad"
                    >
                      <Icon icon="ph:minus-light" className="w-4 h-4" />
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center text-sm font-bold text-charcoal border-x border-charcoal/15">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-charcoal/60 hover:bg-charcoal/5 transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Icon icon="ph:plus-light" className="w-4 h-4" />
                    </button>
                  </div>
 
                  {/* Action buttons */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-charcoal/90 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] shadow-sm"
                  >
                    <Icon icon="ph:shopping-cart-simple-light" className="w-4 h-4" />
                    Agregar al Carrito
                  </button>
 
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-orange/20"
                  >
                    <Icon icon="ph:lightning-light" className="w-4 h-4" />
                    Comprar Ahora
                  </button>
                </div>
              )}

              {/* Importante */}
              {product.advertencia && (
                <div className="mt-6 bg-teal/5 border border-teal/15 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <Icon icon="ph:info-light" className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-xs font-bold text-teal uppercase tracking-wider mb-1">
                        Importante
                      </h3>
                      <p className="text-xs text-charcoal/60 leading-relaxed">
                        {product.advertencia}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-light">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold text-charcoal mb-8 flex items-center gap-2">
              <Icon icon="ph:squares-four-light" className="w-6 h-6 text-teal" />
              Otros productos que te pueden interesar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => {
                const pImages = p.gallery || []
                const pImg = pImages.length > 0 ? pImages[0] : null
                return (
                  <Link
                    key={p.slug.current}
                    href={`/tienda/${p.slug.current}`}
                    className="bg-white rounded-xl border border-charcoal/5 p-4 hover:shadow-lg transition-all group"
                  >
                    <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                      {pImg ? (
                        <Image
                          src={pImg}
                          alt={`${p.referencia} - Suplemento dietario`}
                          width={200}
                          height={200}
                          className="w-[80%] h-[80%] object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Icon icon="ph:image-light" className="w-8 h-8 text-charcoal/20" />
                      )}
                    </div>
                    <h3 className="text-xs font-bold text-charcoal mb-1 line-clamp-2 group-hover:text-teal transition-colors">
                      {p.referencia}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-teal font-medium">
                      <Icon icon="ph:shield-check-light" className="w-3 h-3" />
                      {p.registroInvima}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Modal */}
      <ProductGallery
        images={galleryImageUrls}
        productName={product.referencia}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </>
  )
}
