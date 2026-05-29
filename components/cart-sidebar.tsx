"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { getMainImage } from "@/lib/products"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[100] h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/5">
              <div className="flex items-center gap-3">
                <Icon icon="ph:shopping-bag-light" className="w-6 h-6 text-charcoal" />
                <h2 className="text-lg font-bold text-charcoal">
                  Tu Carrito
                </h2>
                {totalItems > 0 && (
                  <span className="bg-teal/10 text-teal text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-charcoal/5 hover:bg-charcoal/10 flex items-center justify-center transition-colors"
                aria-label="Cerrar carrito"
              >
                <Icon icon="ph:x-light" className="w-5 h-5 text-charcoal/60" />
              </button>
            </div>

            {/* Empty State */}
            {items.length === 0 && (
              <div className="flex-grow flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 rounded-full bg-charcoal/5 flex items-center justify-center mb-5">
                  <Icon icon="ph:shopping-cart-light" className="w-10 h-10 text-charcoal/20" />
                </div>
                <p className="text-base font-semibold text-charcoal/60 mb-2">
                  Tu carrito está vacío
                </p>
                <p className="text-sm text-charcoal/40 mb-6">
                  Explora nuestra tienda y agrega productos
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-semibold px-6 py-2.5 rounded-full transition-all text-sm"
                >
                  <Icon icon="ph:storefront-light" className="w-4 h-4" />
                  Continuar Comprando
                </button>
              </div>
            )}

            {/* Items List */}
            {items.length > 0 && (
              <>
                <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const img = getMainImage(item.product)

                      return (
                        <motion.div
                          key={item.product.slug}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex gap-4 bg-light rounded-xl p-3 border border-charcoal/5"
                        >
                          {/* Image */}
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-charcoal/5">
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

                          {/* Info */}
                          <div className="flex-grow min-w-0">
                            <h3 className="text-xs font-bold text-charcoal truncate mb-0.5">
                              {item.product.referencia}
                            </h3>
                            <div className="flex items-center gap-1 text-[10px] text-teal font-medium">
                              <Icon icon="ph:shield-check-light" className="w-3 h-3" />
                              {item.product.registroInvima}
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity controls */}
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.slug,
                                      item.quantity - 1
                                    )
                                  }
                                  className="w-6 h-6 rounded-md border border-charcoal/15 flex items-center justify-center text-charcoal/50 hover:bg-charcoal/5 transition-colors"
                                  aria-label="Reducir cantidad"
                                >
                                  <Icon icon="ph:minus-light" className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold w-6 text-center text-charcoal">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.slug,
                                      item.quantity + 1
                                    )
                                  }
                                  className="w-6 h-6 rounded-md border border-charcoal/15 flex items-center justify-center text-charcoal/50 hover:bg-charcoal/5 transition-colors"
                                  aria-label="Aumentar cantidad"
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
                                    $
                                    {(
                                      item.product.price * item.quantity
                                    ).toLocaleString("es-CO")}
                                  </span>
                                </div>
                                <button
                                  onClick={() => removeItem(item.product.slug)}
                                  className="text-charcoal/30 hover:text-red-500 transition-colors"
                                  aria-label={`Eliminar ${item.product.referencia}`}
                                >
                                  <Icon icon="ph:trash-light" className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="border-t border-charcoal/5 px-6 py-5 bg-light/50 space-y-4">
                  <div className="flex justify-between text-sm text-charcoal/60">
                    <span>Subtotal</span>
                    <span>${totalPrice.toLocaleString("es-CO")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-charcoal/60">
                    <span>Envío</span>
                    <span className="text-teal font-medium text-xs">Por definir</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-charcoal pt-2 border-t border-charcoal/10">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString("es-CO")}</span>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.01] shadow-lg shadow-orange/20 text-sm"
                  >
                    <Icon icon="ph:credit-card-light" className="w-5 h-5" />
                    Ir al Checkout
                  </Link>

                  <button
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 text-sm font-medium text-charcoal/50 hover:text-charcoal transition-colors py-2"
                  >
                    <Icon icon="ph:arrow-left-light" className="w-4 h-4" />
                    Seguir comprando
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
