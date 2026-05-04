"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Factory, Leaf, FileText, CheckCircle2 } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
}

const benefits = [
  "Desarrollo de formulaciones personalizadas",
  "Control de calidad en cada etapa",
  "Capacidad de produccion escalable",
  "Soporte regulatorio integral",
]

export default function Services() {
  return (
    <section id="servicios" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div {...fadeUp} className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
            <span className="w-2 h-2 rounded-full bg-teal" />
            Nuestros Servicios
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal max-w-2xl text-balance">
            Soluciones integrales en capsula blanda
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {/* Card 1: Large - Maquila */}
          <motion.div
            {...fadeUp}
            className="md:col-span-2 lg:col-span-2 group relative overflow-hidden rounded-2xl border border-charcoal/5 bg-light p-8 flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                <Factory className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">
                Maquila y Desarrollo
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed max-w-md mb-4">
                Servicio completo de manufactura de capsulas blandas con
                formulacion personalizada y control de calidad riguroso.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-charcoal/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <Image
              src="/images/maquila.jpg"
              alt="Linea de manufactura de capsulas"
              width={300}
              height={200}
              className="absolute -right-4 -bottom-4 w-48 h-36 object-cover rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity"
            />
          </motion.div>

          {/* Card 2: Standard - Suplementos */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-charcoal/5 bg-light p-8 flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-orange" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">
                Suplementos
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Suplementos dietarios en capsula blanda. Omega-3, vitaminas,
                antioxidantes y composiciones integrales.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Standard - Regulatory Affairs */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 group relative overflow-hidden rounded-2xl border border-charcoal/5 bg-light p-8 flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">
                Asuntos Regulatorios
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed max-w-2xl">
                Gestion de registros sanitarios, permisos INVIMA
                y cumplimiento de normatividad farmaceutica.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
