"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getMainImage } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { client } from "@/sanity/lib/client"
import { globalSettingsQuery } from "@/sanity/lib/queries"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart()
  const [settings, setSettings] = useState<any>(null)
  
const COLOMBIA_LOCATIONS: Record<string, string[]> = {
  "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Apartadó", "Rionegro", "Otro"],
  "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Sabanagrande", "Puerto Colombia", "Otro"],
  "Bogotá D.C.": ["Bogotá"],
  "Bolívar": ["Cartagena", "Magangué", "Turbaco", "El Carmen de Bolívar", "Arjona", "Otro"],
  "Boyacá": ["Tunja", "Sogamoso", "Duitama", "Chiquinquirá", "Puerto Boyacá", "Otro"],
  "Caldas": ["Manizales", "La Dorada", "Chinchiná", "Villamaría", "Riosucio", "Otro"],
  "Cauca": ["Popayán", "Santander de Quilichao", "El Tambo", "Puerto Tejada", "Piendamó", "Otro"],
  "Cesar": ["Valledupar", "Aguachica", "Agustín Codazzi", "Bosconia", "Curumaní", "Otro"],
  "Córdoba": ["Montería", "Santa Cruz de Lorica", "Tierralta", "Cereté", "Sahagún", "Otro"],
  "Cundinamarca": ["Soacha", "Chía", "Zipaquirá", "Facatativá", "Fusagasugá", "Otro"],
  "Huila": ["Neiva", "Pitalito", "Garzón", "La Plata", "Otro"],
  "La Guajira": ["Riohacha", "Maicao", "Uribia", "San Juan del Cesar", "Otro"],
  "Magdalena": ["Santa Marta", "Ciénaga", "Zona Bananera", "Fundación", "El Banco", "Otro"],
  "Meta": ["Villavicencio", "Acacías", "Granada", "Puerto López", "Puerto Gaitán", "Otro"],
  "Nariño": ["Pasto", "Tumaco", "Ipiales", "Túquerres", "Otro"],
  "Norte de Santander": ["Cúcuta", "Ocaña", "Villa del Rosario", "Los Patios", "Pamplona", "Otro"],
  "Quindío": ["Armenia", "Calarcá", "Montenegro", "La Tebaida", "Quimbaya", "Otro"],
  "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "Otro"],
  "Santander": ["Bucaramanga", "Floridablanca", "Barrancabermeja", "Girón", "Piedecuesta", "Otro"],
  "Sucre": ["Sincelejo", "Corozal", "San Marcos", "Tolú", "Otro"],
  "Tolima": ["Ibagué", "Espinal", "Melgar", "Chaparral", "Honda", "Otro"],
  "Valle del Cauca": ["Cali", "Buenaventura", "Palmira", "Tuluá", "Yumbo", "Cartago", "Jamundí", "Otro"],
  "Otro": ["Otro"]
}
const DEPARTMENTS = Object.keys(COLOMBIA_LOCATIONS)

  useEffect(() => {
    client.fetch(globalSettingsQuery)
      .then(setSettings)
      .catch(err => console.error("Error fetching global settings in checkout:", err))
  }, [])

  const [formData, setFormData] = useState({
    nombre: "",
    tipoDocumento: "CC",
    cedula: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    departamento: "",
    notas: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === "departamento") {
      setFormData((prev) => ({ ...prev, departamento: value, ciudad: "" }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg("")

    try {
      const payload = {
        customerName: formData.nombre,
        tipoDocumento: formData.tipoDocumento,
        cedula: formData.cedula,
        email: formData.email,
        phone: formData.telefono,
        address: `${formData.direccion}, ${formData.ciudad}, ${formData.departamento}`,
        city: formData.ciudad,
        departamento: formData.departamento,
        notas: formData.notas,
        subtotal: totalPrice,
        total: totalPrice,
        items: items.map((item) => ({
          productId: item.product._id,
          referencia: item.product.referencia,
          presentation: item.product.selectedPresentation || "",
          quantity: item.quantity,
          price: item.product.price,
          image: getMainImage(item.product) || "",
        })),
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Ocurrió un error al procesar el pedido.")
      }

      // Save order details to localStorage before clearing cart so success page can display them
      const orderDataToSave = {
        items: items.map(i => ({
           referencia: i.product.referencia,
           price: i.product.price,
           quantity: i.quantity,
           image: getMainImage(i.product)
        })),
        total: totalPrice,
      }
      localStorage.setItem("capsuland_last_order", JSON.stringify(orderDataToSave))

      clearCart()
      router.push("/gracias")
    } catch (err: any) {
      console.error("Checkout submission failed:", err)
      setErrorMsg(err.message || "No se pudo completar el pedido. Por favor, intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <main>
        <Header settings={settings} />
        <section className="pt-32 pb-24 bg-white min-h-screen">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-24 h-24 rounded-full bg-charcoal/5 flex items-center justify-center">
                <Icon icon="ph:shopping-bag-light" className="w-10 h-10 text-charcoal/30" />
              </div>
              <h1 className="text-2xl font-bold text-charcoal">Tu carrito está vacío</h1>
              <p className="text-charcoal/60">
                Explora nuestra tienda y agrega productos a tu carrito.
              </p>
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-semibold px-8 py-3 rounded-full transition-all hover:scale-105"
              >
                <Icon icon="ph:storefront-light" className="w-4 h-4" />
                Ir a la Tienda
              </Link>
            </motion.div>
          </div>
        </section>
        <Footer settings={settings} />
      </main>
    )
  }

  return (
    <main>
      <Header settings={settings} />

      <section className="pt-28 pb-16 bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-6">
          {/* Back link */}
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-teal transition-colors mb-8"
          >
            <Icon icon="ph:arrow-left-light" className="w-4 h-4" />
            Continuar comprando
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-10 flex items-center gap-3">
            <Icon icon="ph:credit-card-light" className="w-8 h-8 text-teal" />
            Página de Pago
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} id="checkout-form">
                <h2 className="text-lg font-bold text-charcoal mb-6 flex items-center gap-2">
                  <Icon icon="ph:map-pin-light" className="w-5 h-5 text-teal" />
                  Información de Envío
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Icon icon="ph:user-light" className="w-3.5 h-3.5" />
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Icon icon="ph:cards-light" className="w-3.5 h-3.5" />
                      Tipo de Documento
                    </label>
                    <div className="relative">
                      <select
                        name="tipoDocumento"
                        value={formData.tipoDocumento}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all appearance-none bg-white"
                      >
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="NIT">NIT</option>
                        <option value="Pasaporte">Pasaporte</option>
                      </select>
                      <Icon icon="ph:caret-down-light" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/50 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Icon icon="ph:identification-card-light" className="w-3.5 h-3.5" />
                      Cédula / Documento
                    </label>
                    <input
                      type="text"
                      name="cedula"
                      value={formData.cedula}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                      placeholder="Número de documento"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Icon icon="ph:envelope-light" className="w-3.5 h-3.5" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Icon icon="ph:phone-light" className="w-3.5 h-3.5" />
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                      placeholder="300 123 4567"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Icon icon="ph:map-pin-line-light" className="w-3.5 h-3.5" />
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                      placeholder="Calle, número, apartamento"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Icon icon="ph:flag-light" className="w-3.5 h-3.5" />
                      Departamento
                    </label>
                    <div className="relative">
                      <select
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all appearance-none bg-white"
                      >
                        <option value="" disabled>Selecciona un departamento</option>
                        {DEPARTMENTS.map(dep => (
                          <option key={dep} value={dep}>{dep}</option>
                        ))}
                      </select>
                      <Icon icon="ph:caret-down-light" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/50 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Icon icon="ph:buildings-light" className="w-3.5 h-3.5" />
                      Ciudad
                    </label>
                    <div className="relative">
                      <select
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                        required
                        disabled={!formData.departamento}
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-400"
                      >
                        <option value="" disabled>Selecciona una ciudad</option>
                        {formData.departamento && COLOMBIA_LOCATIONS[formData.departamento]?.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      <Icon icon="ph:caret-down-light" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/50 pointer-events-none" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Icon icon="ph:note-pencil-light" className="w-3.5 h-3.5" />
                      Notas adicionales (opcional)
                    </label>
                    <textarea
                      name="notas"
                      value={formData.notas}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all resize-none"
                      placeholder="Instrucciones especiales de entrega..."
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-light rounded-2xl border border-charcoal/5 p-6 sticky top-28">
                <h2 className="text-lg font-bold text-charcoal mb-6 flex items-center gap-2">
                  <Icon icon="ph:receipt-light" className="w-5 h-5 text-teal" />
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                  {items.map((item) => {
                    const img = getMainImage(item.product)
                    return (
                      <div
                        key={item.id || item.product.slug}
                        className="flex gap-3 bg-white rounded-xl p-3 border border-charcoal/5"
                      >
                        <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {img ? (
                            <Image
                              src={img}
                              alt={item.product.referencia}
                              width={64}
                              height={64}
                              className="w-full h-full object-contain p-1"
                            />
                          ) : (
                            <Icon icon="ph:image-light" className="w-6 h-6 text-charcoal/20" />
                          )}
                        </div>

                        <div className="flex-grow min-w-0">
                          <h3 className="text-xs font-bold text-charcoal truncate">
                            {item.product.referencia}
                          </h3>
                          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                            {item.product.selectedPresentation && (
                              <span className="text-[10px] font-semibold text-teal bg-teal/10 px-1.5 py-0.5 rounded">
                                {item.product.selectedPresentation}
                              </span>
                            )}
                            <div className="flex items-center gap-1 text-[10px] text-teal font-medium">
                              <Icon icon="ph:shield-check-light" className="w-3 h-3" />
                              {item.product.registroInvima}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id || item.product.slug, item.quantity - 1)
                                }
                                className="w-6 h-6 rounded-md border border-charcoal/15 flex items-center justify-center text-charcoal/50 hover:bg-charcoal/5"
                              >
                                <Icon icon="ph:minus-light" className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id || item.product.slug, item.quantity + 1)
                                }
                                className="w-6 h-6 rounded-md border border-charcoal/15 flex items-center justify-center text-charcoal/50 hover:bg-charcoal/5"
                              >
                                <Icon icon="ph:plus-light" className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-end">
                                {item.product.originalPrice && (
                                  <span className="text-[9px] text-charcoal/30 line-through decoration-charcoal/20 leading-none">
                                    $
                                    {(
                                      item.product.originalPrice * item.quantity
                                    ).toLocaleString("es-CO")}
                                  </span>
                                )}
                                <span className="text-xs font-bold text-charcoal">
                                  ${(item.product.price * item.quantity).toLocaleString("es-CO")}
                                </span>
                              </div>
                              <button
                                onClick={() => removeItem(item.id || item.product.slug)}
                                className="text-charcoal/30 hover:text-red-500 transition-colors"
                                aria-label={`Eliminar ${item.product.referencia}`}
                              >
                                <Icon icon="ph:trash-light" className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Totals */}
                <div className="border-t border-charcoal/10 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-charcoal/60">
                    <span>Subtotal</span>
                    <span>${totalPrice.toLocaleString("es-CO")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-charcoal/60">
                    <span>Envío</span>
                    <span className="text-teal font-medium">Por definir</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-charcoal pt-2 border-t border-charcoal/10">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString("es-CO")}</span>
                  </div>
                </div>

                {/* Submit */}
                {errorMsg && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-start gap-2 animate-fade-in">
                    <Icon icon="ph:warning-circle-fill" className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-orange hover:bg-orange-dark disabled:opacity-60 disabled:cursor-wait text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.01] shadow-lg shadow-orange/20 text-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    <>
                      <Icon icon="ph:check-circle-light" className="w-5 h-5" />
                      Confirmar Pedido
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  )
}
