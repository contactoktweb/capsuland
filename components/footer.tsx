import { MapPin, Phone, Mail } from "lucide-react"

const quickLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
]

const services = [
  "Maquila y Desarrollo",
  "Medicamentos",
  "Suplementos Dietarios",
  "Asuntos Regulatorios",
]

export default function Footer() {
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
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Enlaces
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Servicios
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}>
                  <span className="text-sm text-white/50">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Contacto
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                <span className="text-sm text-white/50">
                  Km 3.5 Via Funza - Cota, Costado Sur
                </span>
              </div>
              <a href="tel:+573103047673" className="flex items-center gap-3 text-white/50 hover:text-teal transition-colors">
                <Phone className="w-4 h-4 text-teal shrink-0" />
                <span className="text-sm">310 304 7673</span>
              </a>
              <a href="mailto:comercial1@capsuland.com" className="flex items-center gap-3 text-white/50 hover:text-teal transition-colors">
                <Mail className="w-4 h-4 text-teal shrink-0" />
                <span className="text-sm">comercial1@capsuland.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            {'2026 CAPSULAND. Todos los derechos reservados.'}
          </p>
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
