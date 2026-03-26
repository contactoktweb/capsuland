import Link from "next/link"
import { Icon } from "@iconify/react"

const quickLinks = [
  { label: "Inicio", href: "/", icon: "ph:house-light" },
  { label: "Tienda", href: "/tienda", icon: "ph:storefront-light" },
  { label: "Servicios", href: "/#servicios", icon: "ph:flask-light" },
  { label: "Nosotros", href: "/#nosotros", icon: "ph:users-light" },
  { label: "Proceso", href: "/#proceso", icon: "ph:gear-six-light" },
  { label: "Contacto", href: "/#contacto", icon: "ph:envelope-light" },
]

const services = [
  { label: "Maquila y Desarrollo", icon: "ph:factory-light" },
  { label: "Medicamentos", icon: "ph:pill-light" },
  { label: "Suplementos Dietarios", icon: "ph:leaf-light" },
  { label: "Asuntos Regulatorios", icon: "ph:clipboard-text-light" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/logo.png"
                alt="CAPSULAND Logo"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Laboratorio farmaceutico especializado en la fabricacion
              de capsulas blandas de gelatina con estandares internacionales.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Enlaces
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-teal transition-colors flex items-center gap-2"
                  >
                    <Icon icon={link.icon} className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Servicios
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.label}>
                  <span className="text-sm text-white/50 flex items-center gap-2">
                    <Icon icon={s.icon} className="w-4 h-4" />
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Contacto
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Icon icon="ph:map-pin-light" className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                <span className="text-sm text-white/50">
                  Km 3.5 Via Funza - Cota, Costado Sur
                </span>
              </div>
              <a href="tel:+573103047673" className="flex items-center gap-3 text-white/50 hover:text-teal transition-colors">
                <Icon icon="ph:phone-light" className="w-4 h-4 text-teal shrink-0" />
                <span className="text-sm">310 304 7673</span>
              </a>
              <a href="mailto:comercial1@capsuland.com" className="flex items-center gap-3 text-white/50 hover:text-teal transition-colors">
                <Icon icon="ph:envelope-light" className="w-4 h-4 text-teal shrink-0" />
                <span className="text-sm">comercial1@capsuland.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-xs text-white/30">
              {currentYear} CAPSULAND. Todos los derechos reservados.
            </p>
            <a
              href="https://www.kytcode.lat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1"
            >
              Desarrollado por K&T <Icon icon="ph:heart-fill" className="w-3 h-3 text-white" />
            </a>
          </div>
          <div className="flex gap-6">
            <span className="text-xs text-white/30 hover:text-white/50 transition-colors cursor-pointer">
              Politica de Privacidad
            </span>
            <span className="text-xs text-white/30 hover:text-white/50 transition-colors cursor-pointer">
              Terminos y Condiciones
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
