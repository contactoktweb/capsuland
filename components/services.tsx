"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Factory, Leaf, FileText, CheckCircle2, FlaskConical, ShieldCheck } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
}

const iconMap: Record<string, any> = {
  Factory,
  Leaf,
  FileText,
  FlaskConical,
  ShieldCheck,
}

interface ServiceItem {
  title: string
  description: string
  benefits?: string[]
  iconName?: string
  image?: string
}

interface ServicesProps {
  data?: {
    badge?: string
    title?: string
    items?: ServiceItem[]
  }
}

export default function Services({ data }: ServicesProps) {
  const defaultItems: ServiceItem[] = [
    {
      title: "Maquila y Desarrollo",
      description: "Servicio completo de manufactura de capsulas blandas con formulacion personalizada y control de calidad riguroso.",
      benefits: [
        "Desarrollo de formulaciones personalizadas",
        "Control de calidad en cada etapa",
        "Capacidad de produccion escalable",
        "Soporte regulatorio integral",
      ],
      iconName: "Factory",
      image: "/images/maquila.jpg",
    },
    {
      title: "Suplementos",
      description: "Suplementos dietarios en capsula blanda. Omega-3, vitaminas, antioxidantes y composiciones integrales.",
      iconName: "Leaf",
    },
    {
      title: "Asuntos Regulatorios",
      description: "Gestion de registros sanitarios, permisos INVIMA y cumplimiento de normatividad farmaceutica.",
      iconName: "FileText",
    }
  ]

  const items = data?.items && data.items.length > 0 ? data.items : defaultItems
  const badge = data?.badge || "Nuestros Servicios"
  const title = data?.title || "Soluciones integrales en capsula blanda"

  return (
    <section id="servicios" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div {...fadeUp} className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
            <span className="w-2 h-2 rounded-full bg-teal" />
            {badge}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal max-w-2xl text-balance">
            {title}
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {items.map((item, idx) => {
            const IconComponent = iconMap[item.iconName || ""] || Factory
            const isFirst = idx === 0
            const isThird = idx === 2
            const bentoClass = isFirst
              ? "md:col-span-2 lg:col-span-2 group relative overflow-hidden rounded-2xl border border-charcoal/5 bg-light p-8 flex flex-col justify-between hover:shadow-xl transition-shadow"
              : isThird
                ? "lg:col-span-3 group relative overflow-hidden rounded-2xl border border-charcoal/5 bg-light p-8 flex flex-col justify-between hover:shadow-xl transition-shadow"
                : "group relative overflow-hidden rounded-2xl border border-charcoal/5 bg-light p-8 flex flex-col justify-between hover:shadow-xl transition-shadow"

            return (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={bentoClass}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${idx === 1 ? "bg-orange/10 text-orange" : "bg-teal/10 text-teal"}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed max-w-xl mb-4">
                    {item.description}
                  </p>
                  {item.benefits && item.benefits.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-xs text-charcoal/70">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="absolute -right-4 -bottom-4 w-48 h-36 object-cover rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
