"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { client } from "@/sanity/lib/client"
import { globalSettingsQuery } from "@/sanity/lib/queries"

function GraciasContent({ settings }: { settings: any }) {
  const searchParams = useSearchParams()
  const orderIdParam = searchParams.get("order_id") || searchParams.get("external_reference")
  const paymentStatus = searchParams.get("status") || searchParams.get("collection_status")
  const paymentId = searchParams.get("payment_id") || searchParams.get("collection_id")

  const [orderNumber, setOrderNumber] = useState("")
  const [lastOrder, setLastOrder] = useState<any>(null)

  useEffect(() => {
    if (orderIdParam) {
      setOrderNumber(orderIdParam.startsWith("CAP-") ? orderIdParam : `#${orderIdParam.slice(-8).toUpperCase()}`)
    } else {
      const num = `CAP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      setOrderNumber(num)
    }

    try {
      const storedOrder = localStorage.getItem("capsuland_last_order")
      if (storedOrder) {
        setLastOrder(JSON.parse(storedOrder))
        localStorage.removeItem("capsuland_last_order")
      }
    } catch (e) {
      console.error(e)
    }
  }, [orderIdParam])

  return (
    <main>
      <Header settings={settings} />

      <section className="pt-32 pb-24 bg-gradient-to-br from-teal/5 via-white to-orange/5 min-h-screen flex items-center">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-teal/10 flex items-center justify-center mb-8"
            >
              <Icon icon="ph:check-circle-light" className="w-14 h-14 text-teal" />
            </motion.div>

            {/* Mercado Pago Payment Status Badge */}
            {paymentStatus === "approved" ? (
              <div className="inline-flex items-center gap-2 bg-teal/10 text-teal border border-teal/20 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                <Icon icon="ph:check-circle-bold" className="w-4 h-4" />
                Pago Aprobado por Mercado Pago
              </div>
            ) : paymentStatus === "pending" ? (
              <div className="inline-flex items-center gap-2 bg-orange/10 text-orange border border-orange/20 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                <Icon icon="ph:clock-bold" className="w-4 h-4" />
                Pago en Proceso (Mercado Pago)
              </div>
            ) : null}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-charcoal mb-4"
            >
              {paymentStatus === "approved"
                ? "¡Pago exitoso y pedido confirmado!"
                : "¡Gracias por tu compra!"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-charcoal/60 mb-8 max-w-lg"
            >
              {paymentStatus === "approved"
                ? "Tu pago ha sido procesado de forma segura por Mercado Pago. Comenzaremos de inmediato la preparación de tus suplementos."
                : "Tu pedido ha sido recibido exitosamente. Te contactaremos pronto para coordinar los detalles de envío."}
            </motion.p>

            {/* Order Number */}
            {orderNumber && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl border border-charcoal/5 shadow-sm p-6 mb-10 w-full max-w-sm"
              >
                <p className="text-xs font-medium text-charcoal/50 uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
                  <Icon icon="ph:hash-light" className="w-3.5 h-3.5" />
                  Número de Orden
                </p>
                <p className="text-2xl font-bold text-teal font-mono tracking-wider">
                  {orderNumber}
                </p>
                {paymentId && (
                  <p className="text-[11px] text-charcoal/40 font-mono mt-1">
                    Ref. Mercado Pago: #{paymentId}
                  </p>
                )}
                <p className="text-xs text-charcoal/40 mt-2">
                  Guarda este número para hacer seguimiento a tu pedido
                </p>
              </motion.div>
            )}

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 w-full"
            >
              <div className="bg-white rounded-xl border border-charcoal/5 p-4 text-center">
                <Icon icon="ph:envelope-light" className="w-8 h-8 text-teal mx-auto mb-2" />
                <p className="text-xs font-semibold text-charcoal">Confirmación por Email</p>
                <p className="text-[10px] text-charcoal/50 mt-1">Recibirás un correo con los detalles</p>
              </div>
              <div className="bg-white rounded-xl border border-charcoal/5 p-4 text-center">
                <Icon icon="ph:package-light" className="w-8 h-8 text-teal mx-auto mb-2" />
                <p className="text-xs font-semibold text-charcoal">Preparación</p>
                <p className="text-[10px] text-charcoal/50 mt-1">Tu pedido será preparado pronto</p>
              </div>
              <div className="bg-white rounded-xl border border-charcoal/5 p-4 text-center">
                <Icon icon="ph:truck-light" className="w-8 h-8 text-teal mx-auto mb-2" />
                <p className="text-xs font-semibold text-charcoal">Envío</p>
                <p className="text-[10px] text-charcoal/50 mt-1">Te notificaremos el despacho</p>
              </div>
            </motion.div>

            {/* Last Order Section */}
            {lastOrder && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="w-full mb-10 text-left bg-white rounded-2xl border border-charcoal/5 shadow-sm p-6 max-w-2xl mx-auto"
              >
                <h2 className="text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
                  <Icon icon="ph:shopping-cart-light" className="w-5 h-5 text-teal" />
                  Productos Comprados
                </h2>
                <div className="space-y-4">
                  {lastOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4 items-center border-b border-charcoal/5 pb-4 last:border-0 last:pb-0">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {item.image ? (
                          <Image src={item.image} alt={item.referencia} width={64} height={64} className="w-full h-full object-contain p-1" />
                        ) : (
                          <Icon icon="ph:image-light" className="w-6 h-6 text-charcoal/20" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-charcoal text-sm">{item.referencia}</h3>
                        <p className="text-xs text-charcoal/60">Cant: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-teal text-sm">${(item.price * item.quantity).toLocaleString("es-CO")}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-charcoal/10 font-bold text-lg text-charcoal">
                  <span>Total Pagado</span>
                  <span>${lastOrder.total?.toLocaleString("es-CO")}</span>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/tienda"
                className="inline-flex items-center justify-center gap-2 bg-teal hover:bg-teal-dark text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-sm"
              >
                <Icon icon="ph:shopping-bag-light" className="w-4 h-4" />
                Seguir Comprando
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-charcoal/5 text-charcoal font-semibold px-8 py-3.5 rounded-full transition-all border border-charcoal/15"
              >
                <Icon icon="ph:house-light" className="w-4 h-4" />
                Volver al Inicio
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  )
}

export default function GraciasPage() {
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    client
      .fetch(globalSettingsQuery)
      .then(setSettings)
      .catch((err) => console.error("Error fetching global settings in gracias page:", err))
  }, [])

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-teal border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <GraciasContent settings={settings} />
    </Suspense>
  )
}
