"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, FlaskConical, Globe2 } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
}

const iconMap: Record<string, any> = {
  FlaskConical,
  CheckCircle2,
}

interface AboutPoint {
  title: string
  description: string
  iconName?: string
}

interface AboutProps {
  data?: {
    badge?: string
    title?: string
    quote?: string
    points?: AboutPoint[]
    features?: AboutPoint[]
    mainImage?: string
    secondaryImage?: string
    experienceYears?: number
    yearsOfExperience?: string | number
  }
}

export default function About({ data }: AboutProps) {
  const defaultPoints: AboutPoint[] = [
    {
      title: "Innovacion Constante",
      description: "Desarrollamos formulaciones avanzadas que marcan tendencia en la industria farmaceutica.",
      iconName: "FlaskConical",
    },
    {
      title: "Calidad Certificada",
      description: "Cumplimos con los estandares BPM mas estrictos para garantizar seguridad total.",
      iconName: "CheckCircle2",
    }
  ]

  const badge = data?.badge || "Nuestra Trayectoria"
  const title = data?.title || "Con alcance global, operamos desde 2011."
  const quote = data?.quote || "Somos el aliado estrategico que garantiza calidad y respaldo continuo para su negocio."
  const points = data?.features || data?.points || defaultPoints
  const mainImage = data?.mainImage || "/images/scientist.jpg"
  const secondaryImage = data?.secondaryImage || "/images/hero-capsule.jpg"
  const experienceYears = data?.yearsOfExperience !== undefined 
    ? data.yearsOfExperience 
    : data?.experienceYears !== undefined 
      ? `${data.experienceYears}+` 
      : "25+"

  return (
    <section id="nosotros" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#0f2926 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Content - Editorial Style */}
          <motion.div {...fadeUp} className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-teal mb-6 bg-teal/10 px-3 py-1 rounded-full">
              <Globe2 className="w-3 h-3" />
              {badge}
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-8 leading-[1.1] text-balance">
              {title}
            </h2>

            {quote && (
              <p className="text-lg text-charcoal/70 leading-relaxed mb-8 border-l-4 border-orange pl-6 italic">
                "{quote}"
              </p>
            )}

            <div className="space-y-6 mb-10">
              {points.map((point, idx) => {
                const IconComponent = iconMap[point.iconName || ""] || CheckCircle2
                return (
                  <div key={point.title} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${idx % 2 === 0 ? "bg-teal/10 text-teal" : "bg-orange/10 text-orange"}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal text-lg">{point.title}</h3>
                      <p className="text-charcoal/60 text-sm leading-relaxed mt-1">
                        {point.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-4 text-sm font-bold text-white shadow-xl shadow-charcoal/20 hover:bg-teal transition-all duration-300 hover:scale-105"
              >
                Conocer Mas
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Right: Creative Collage */}
          <motion.div
            className="relative order-1 lg:order-2 min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Background Blotches */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-orange/10 rounded-full blur-3xl" />

            {/* Main Image - Scientist */}
            <div className="relative w-[80%] h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-10 rotate-[-2deg] transition-transform hover:rotate-0 duration-500">
              <Image
                src={mainImage}
                alt="Cientifica experta"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Secondary Image - Detail/Capsules - Floating Card */}
            <motion.div
              className="absolute -bottom-10 -left-4 md:left-0 w-48 md:w-64 aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={secondaryImage}
                alt="Detalle de capsula"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Floating Glass Stat Card */}
            <motion.div
              className="absolute top-10 -right-4 md:right-0 bg-white/95 backdrop-blur-xl border border-teal/10 p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-30 max-w-[180px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-4xl font-heading font-bold text-teal">{experienceYears}</span>
              <p className="text-xs font-bold uppercase tracking-wider text-charcoal/80 mt-1">Anos de Experiencia Global</p>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
