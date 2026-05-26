"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import CartSidebar from "@/components/cart-sidebar"

const navLinks = [
  { label: "Inicio", href: "/", icon: "ph:house-light" },
  { label: "Tienda", href: "/tienda", icon: "ph:storefront-light" },
  { label: "Servicios", href: "/#servicios", icon: "ph:flask-light" },
  { label: "Nosotros", href: "/#nosotros", icon: "ph:users-light" },
  { label: "Proceso", href: "/#proceso", icon: "ph:gear-six-light" },
  { label: "Contacto", href: "/#contacto", icon: "ph:envelope-light" },
]

interface GlobalSettings {
  siteTitle?: string
  siteDescription?: string
  logo?: string
  email?: string
  phone?: string
  address?: string
  socials?: Array<{ platform: string; url: string }>
}

interface HeaderProps {
  settings?: GlobalSettings
}

export default function Header({ settings }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems } = useCart()
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm py-4 transition-all duration-300">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src={settings?.logo || "/images/logo.png"}
              alt={settings?.siteTitle ? `${settings.siteTitle} Logo` : "CAPSULAND Logo"}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isAnchor = link.href.startsWith("/#")
              const anchorHref =
                isAnchor && isHome ? link.href.replace("/", "") : link.href

              return isAnchor && isHome ? (
                <a
                  key={link.href}
                  href={anchorHref}
                  className="relative text-sm font-medium text-charcoal/70 hover:text-teal transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-teal transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors group ${
                    pathname === link.href
                      ? "text-teal"
                      : "text-charcoal/70 hover:text-teal"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-teal transition-all duration-300 ${
                      pathname === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA + Cart */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${(settings?.phone || "310 304 7673").replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-2 text-sm text-charcoal/70 hover:text-teal transition-colors"
            >
              <Icon icon="ph:phone-light" className="w-4 h-4" />
              <span>{settings?.phone || "310 304 7673"}</span>
            </a>

            {/* Cart button → opens sidebar */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-charcoal/5 hover:bg-teal/10 text-charcoal hover:text-teal transition-all"
              aria-label="Abrir carrito de compras"
            >
              <Icon icon="ph:shopping-cart-light" className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange/20 hover:bg-orange-dark transition-all hover:scale-105"
            >
              <Icon icon="ph:shopping-bag-light" className="w-4 h-4" />
              Comprar
            </Link>
          </div>

          {/* Mobile right side: cart + toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center w-9 h-9 rounded-full bg-charcoal/5 text-charcoal"
              aria-label="Abrir carrito"
            >
              <Icon icon="ph:shopping-cart-light" className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            <button
              className="text-charcoal"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? (
                <Icon icon="ph:x-light" className="w-6 h-6" />
              ) : (
                <Icon icon="ph:list-light" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-teal/10 shadow-xl"
            >
              <nav className="flex flex-col px-6 py-4 gap-1">
                {navLinks.map((link) => {
                  const isAnchor = link.href.startsWith("/#")
                  const anchorHref =
                    isAnchor && isHome ? link.href.replace("/", "") : link.href

                  const inner = (
                    <span className="flex items-center gap-3">
                      <Icon icon={link.icon} className="w-5 h-5 text-charcoal/40" />
                      {link.label}
                    </span>
                  )

                  return isAnchor && isHome ? (
                    <a
                      key={link.href}
                      href={anchorHref}
                      onClick={() => setMobileOpen(false)}
                      className="text-charcoal/80 hover:text-teal transition-colors py-3 font-medium border-b border-charcoal/5 last:border-0"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`py-3 font-medium transition-colors border-b border-charcoal/5 last:border-0 ${
                        pathname === link.href
                          ? "text-teal"
                          : "text-charcoal/80 hover:text-teal"
                      }`}
                    >
                      {inner}
                    </Link>
                  )
                })}
                <Link
                  href="/tienda"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange/20 mt-3"
                >
                  <Icon icon="ph:shopping-bag-light" className="w-4 h-4" />
                  Comprar Ahora
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
