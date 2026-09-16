"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Product } from "@/lib/products"

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (idOrSlug: string) => void
  updateQuantity: (idOrSlug: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const id = product.selectedPresentation
        ? `${product.slug}__${product.selectedPresentation}`
        : `${product.slug}`

      const existingIndex = prev.findIndex(
        (i) => i.id === id || (!product.selectedPresentation && !i.product.selectedPresentation && i.product.slug === product.slug)
      )

      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { id, product, quantity }]
    })
  }, [])

  const removeItem = useCallback((idOrSlug: string) => {
    setItems((prev) => prev.filter((i) => i.id !== idOrSlug && i.product.slug !== idOrSlug))
  }, [])

  const updateQuantity = useCallback((idOrSlug: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== idOrSlug && i.product.slug !== idOrSlug))
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === idOrSlug || (i.product.slug === idOrSlug && !i.product.selectedPresentation)
          ? { ...i, quantity }
          : i
      )
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
