"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm py-4 transition-all duration-300">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="CAPSULAND Logo"
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-charcoal/70 hover:text-teal transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-teal transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+573103047673"
            className="flex items-center gap-2 text-sm text-charcoal/70 hover:text-teal transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>310 304 7673</span>
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange/20 hover:bg-orange-dark transition-all hover:scale-105"
          >
            Cotizar Ahora
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-charcoal"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-charcoal/80 hover:text-teal transition-colors py-2 font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange/20"
              >
                Cotizar Ahora
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
