"use client"

import { motion } from "framer-motion"

interface ProcessStep {
  title: string
  desc?: string
  description?: string
  num?: string
  stepNumber?: string | number
}

interface ProcessProps {
  data?: {
    badge?: string
    title?: string
    description?: string
    steps?: ProcessStep[]
  }
}

const defaultSteps: ProcessStep[] = [
  {
    title: "Necesidades",
    desc: "Identificamos los requerimientos especificos de cada cliente y producto.",
  },
  {
    title: "Formulacion",
    desc: "Nuestro equipo de I+D desarrolla la formulacion optima para cada capsula.",
  },
  {
    title: "Materia Prima",
    desc: "Seleccion y verificacion de materias primas con los mas altos estandares.",
  },
  {
    title: "Produccion",
    desc: "Manufactura en lineas certificadas con control de calidad en cada etapa.",
  },
  {
    title: "Control de Calidad",
    desc: "Analisis de calidad de producto terminado para garantizar la excelencia.",
  },
  {
    title: "Empaque",
    desc: "Empaque primario y secundario segun especificaciones del cliente.",
  },
  {
    title: "INVIMA",
    desc: "Gestion completa de registros sanitarios y aprobacion regulatoria.",
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
}

export default function Process({ data }: ProcessProps) {
  const badge = data?.badge || "Metodologia"
  const title = data?.title || "Nuestro Proceso"
  
  const rawSteps = data?.steps && data.steps.length > 0 ? data.steps : defaultSteps
  const steps = rawSteps.map((s, i) => ({
    title: s.title,
    desc: s.desc || s.description || "",
    num: s.num || s.stepNumber?.toString() || (i + 1).toString().padStart(2, "0")
  }))

  const description = data?.description || `${steps.length} pasos rigurosos que garantizan la calidad y confiabilidad de cada lote producido.`

  return (
    <section id="proceso" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#0f2926 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />
      {/* Decorative background blob */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Sticky Title */}
          <motion.div {...fadeUp} className="md:sticky md:top-32 md:self-start">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
              <span className="w-2 h-2 rounded-full bg-teal" />
              {badge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4">
              {title}
            </h2>
            <p className="text-charcoal/60 leading-relaxed max-w-md">
              {description}
            </p>
          </motion.div>

          {/* Right: Steps with teal line */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-teal/15" />

            <div className="flex flex-col gap-8">
              {steps.map((step, i) => {
                const stepNumber = step.num || (i + 1).toString().padStart(2, "0")
                return (
                  <motion.div
                    key={stepNumber}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="relative flex gap-6 group"
                  >
                    {/* Circle on line */}
                    <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-white border-2 border-teal/30 flex items-center justify-center group-hover:border-orange group-hover:bg-orange/5 transition-colors">
                      <span className="text-sm font-bold text-teal group-hover:text-orange transition-colors">
                        {stepNumber}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <h3 className="text-lg font-bold text-charcoal mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-charcoal/60 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
