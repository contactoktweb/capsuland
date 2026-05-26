"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
}

interface GlobalSettings {
  siteTitle?: string
  siteDescription?: string
  logo?: string
  email?: string
  phone?: string
  address?: string
  socials?: Array<{ platform: string; url: string }>
}

interface ContactProps {
  settings?: GlobalSettings
}

export default function Contact({ settings }: ContactProps) {
  const defaultContactInfo = [
    {
      icon: MapPin,
      label: "Direccion",
      value: "Km 3,5 Via Funza - Siberia, Parque Ind. San Jose Bodega 4B",
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
      value: "comercial2@capsuland.com",
      href: "mailto:comercial2@capsuland.com",
    },
    {
      icon: Mail,
      label: "Email Comercial",
      value: "coordinadorcomercial@capsuland.com",
      href: "mailto:coordinadorcomercial@capsuland.com",
    },
  ]

  const contactInfo = settings
    ? [
        {
          icon: MapPin,
          label: "Direccion",
          value: settings.address || "Km 3,5 Via Funza - Siberia, Parque Ind. San Jose Bodega 4B",
        },
        {
          icon: Phone,
          label: "Telefono",
          value: settings.phone || "310 304 7673",
          href: `tel:${(settings.phone || "310 304 7673").replace(/[^\d+]/g, "")}`,
        },
        {
          icon: Mail,
          label: "Email",
          value: settings.email || "comercial2@capsuland.com",
          href: `mailto:${settings.email || "comercial2@capsuland.com"}`,
        },
      ]
    : defaultContactInfo

  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    mensaje: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nombre,
          company: formData.empresa,
          email: formData.email,
          message: formData.mensaje,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
        })
        setFormData({ nombre: "", empresa: "", email: "", mensaje: "" })
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || "Ocurrió un error al enviar el mensaje.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Error de red. Por favor verifica tu conexión e intenta de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance">
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
              <h3 className="text-xl font-bold text-white mb-2">
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
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/50 uppercase tracking-wide" htmlFor="nombre">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
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
                    value={formData.empresa}
                    onChange={handleChange}
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
                  required
                  value={formData.email}
                  onChange={handleChange}
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
                    required
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuentanos sobre tu proyecto..."
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 transition-colors resize-none"
                  />
                </div>
                
                {submitStatus && (
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${
                      submitStatus.success
                        ? "bg-teal/10 border-teal/20 text-teal-light"
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}
                  >
                    {submitStatus.success ? (
                      <CheckCircle className="w-5 h-5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0" />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange/25 hover:bg-orange-dark disabled:opacity-60 transition-colors mt-2"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
  )
}
