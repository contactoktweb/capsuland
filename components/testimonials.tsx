"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Quote, ArrowRight } from "lucide-react"
import { useState } from "react"

const testimonials = [
  {
    name: "Dr. Carlos Mendez",
    role: "Director de Operaciones",
    company: "PharmaCo",
    text: "Trabajar con CAPSULAND transformo por completo nuestra cadena de produccion. La calidad y consistencia de cada lote supero nuestras expectativas.",
    rating: 5,
  },
  {
    name: "Dra. Maria Fernanda Lopez",
    role: "Gerente de Calidad",
    company: "NutriVida",
    text: "El soporte regulatorio y la capacidad tecnica de CAPSULAND nos permitieron lanzar al mercado en tiempo record con todos los permisos al dia.",
    rating: 5,
  },
  {
    name: "Ing. Roberto Silva",
    role: "Director Comercial",
    company: "BioSalud",
    text: "La capacidad de produccion y flexibilidad para adaptarse a nuestras formulaciones especificas es realmente excepcional. Un socio estrategico invaluable.",
    rating: 5,
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
}

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 items-center">

          {/* Left: Rating Card (Premium Dark) */}
          <motion.div
            {...fadeUp}
            className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#0f2926] to-black text-white p-10 md:p-12 shadow-2xl shadow-teal/20"
          >
            {/* Header Content */}
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-medium tracking-widest uppercase mb-6 backdrop-blur-sm">
                Experiencias
              </span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-2">
                4.9
                <span className="text-2xl text-white/50 font-sans font-normal ml-2">/ 5.0</span>
              </h2>

              <div className="flex gap-1.5 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange text-orange" />
                ))}
              </div>

              <p className="text-lg text-white/90 font-light leading-relaxed mb-8">
                Mas de <span className="font-bold text-white">30,000+</span> clientes confian en nuestros estandares de calidad internacional.
              </p>

              <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0f2926] bg-white/10 backdrop-blur-sm overflow-hidden relative">
                      {/* Placeholder avatars contextually implied */}
                      <div className="absolute inset-0 bg-white/20" />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-white/70">Ultimas resenas</span>
              </div>
            </div>

            {/* Decorative Background Image Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/testimonial.jpg"
                alt="Background texture"
                fill
                className="object-cover opacity-20 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>

          {/* Right: Testimonial & Navigation */}
          <div className="flex flex-col">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 relative"
            >
              <Quote className="absolute -top-10 -left-6 w-32 h-32 text-teal/5 rotate-180 pointer-events-none" />

              <h3 className="relative text-3xl md:text-4xl lg:text-5xl leading-tight text-charcoal mb-8 italic">
                "{testimonials[active].text}"
              </h3>

              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-orange rounded-full" />
                <div>
                  <p className="font-bold text-lg text-charcoal">{testimonials[active].name}</p>
                  <p className="text-sm text-charcoal/60 uppercase tracking-wider">{testimonials[active].role}, {testimonials[active].company}</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation List */}
            <div className="grid md:grid-cols-3 gap-4 border-t border-charcoal/10 pt-8">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`group text-left transition-all duration-300 ${active === i ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                >
                  <p className={`text-sm font-bold mb-1 transition-colors ${active === i ? "text-teal" : "text-charcoal"}`}>
                    0{i + 1}
                  </p>
                  <p className="text-lg font-medium text-charcoal group-hover:text-teal transition-colors">
                    {t.company}
                  </p>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
