"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    label: "Direccion",
    value: "Km 3.5 Via Funza - Cota, Costado Sur",
  },
  {
    icon: Phone,
    label: "Telefono",
    value: "310 304 7673",
    href: "tel:+573103047673",
  },
  {
    icon: Mail,
    label: "Email",
    value: "comercial1@capsuland.com",
    href: "mailto:comercial1@capsuland.com",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun - Vie: 8:00 AM - 5:00 PM",
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
}

export default function Contact() {
  return (
    <section
      id="contacto"
      className="relative py-24 md:py-32 bg-charcoal overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(100,140,135,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(75,75,75,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(75,75,75,0.05)_1px,transparent_1px)] bg-[length:60px_60px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
            <span className="w-2 h-2 rounded-full bg-teal" />
            Contacto
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance">
            Hablemos de tu proyecto
          </h2>
        </motion.div>

        {/* Glass panel */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Contact info */}
            <div className="flex flex-col gap-6">
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Informacion de Contacto
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Estamos listos para ayudarte con tu proyecto de capsulas blandas.
                Comunicate con nuestro equipo comercial.
              </p>

              <div className="flex flex-col gap-5 mt-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  const content = (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-teal" />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wide mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm text-white/90">{item.value}</p>
                      </div>
                    </div>
                  )
                  if (item.href) {
                    return (
                      <a key={item.label} href={item.href} className="hover:opacity-80 transition-opacity">
                        {content}
                      </a>
                    )
                  }
                  return <div key={item.label}>{content}</div>
                })}
              </div>
            </div>

            {/* Right: Form */}
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/50 uppercase tracking-wide" htmlFor="nombre">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/50 uppercase tracking-wide" htmlFor="empresa">
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    type="text"
                    placeholder="Tu empresa"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-white/50 uppercase tracking-wide" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-white/50 uppercase tracking-wide" htmlFor="mensaje">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  rows={4}
                  placeholder="Cuentanos sobre tu proyecto..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange/25 hover:bg-orange-dark transition-colors mt-2"
              >
                Enviar Mensaje
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
