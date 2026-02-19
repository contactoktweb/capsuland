"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Plus } from "lucide-react"
import { useEffect, useState } from "react"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }

    const timer = setTimeout(() => requestAnimationFrame(animate), 800)
    return () => clearTimeout(timer)
  }, [target])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function Hero() {
  const { scrollY } = useScroll()

  const imageScale = useTransform(scrollY, [0, 800], [1, 1.15])
  const textY = useTransform(scrollY, [0, 800], [0, -60])
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.5, 0.85])

  const stats = [
    { value: 20, suffix: "M+", label: "Capsulas / Ano" },
    { value: 15, suffix: "+", label: "Años Experiencia" },
    { value: 98, suffix: "%", label: "Satisfaccion" },
    { value: 3, suffix: "", label: "Certificaciones" },
  ]

  return (
    <section
      id="inicio"
      className="relative h-screen min-h-[700px] overflow-hidden"
    >
      {/* Background Image with zoom effect */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <Image
          src="/images/hero-capsule.jpg"
          alt="Capsulas blandas y estructura molecular"
          fill
          className="object-cover object-[25%_center]"
          priority
        />
      </motion.div>

      {/* Overlays removed for transparency/vividness */}

      {/* Subtle bottom fade just for text readability if needed, otherwise removed or minimal */}
      {/* Smart Gradient for Text Readability - subtle left-side only */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent pointer-events-none" />

      {/* Main Content */}
      <motion.div
        className="relative h-full flex flex-col justify-center"
        style={{ y: textY }}
      >
        <div className="mx-auto max-w-7xl w-full px-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
              Laboratorio Farmaceutico
            </span>
          </motion.div>

          {/* Large Display Typography - Innovative Style */}
          <div className="max-w-5xl">
            <motion.h1
              className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[9rem] font-bold leading-[0.85] tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.span
                className="block text-white mix-blend-overlay opacity-90"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 0.9 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
              >
                {"Ciencia"}
              </motion.span>
              <motion.span
                className="block text-transparent stroke-white"
                style={{ WebkitTextStroke: "2px rgba(255,255,255,0.7)" }}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.33, 1, 0.68, 1] }}
              >
                {"Encuentra"}
              </motion.span>
              <motion.span
                className="block text-orange drop-shadow-[0_0_30px_rgba(242,140,40,0.6)]"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7, ease: [0.33, 1, 0.68, 1] }}
              >
                {"Innovacion."}
              </motion.span>
            </motion.h1>
          </div>

          {/* Subtitle - more visible */}
          <motion.p
            className="mt-8 max-w-lg text-base md:text-lg leading-relaxed text-white/90 font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Fabricamos capsulas blandas de gelatina con los mas altos
            estandares internacionales de calidad.
          </motion.p>

          {/* CTA Buttons - punchier */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <a
              href="#contacto"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.4)] hover:bg-gray-100 transition-all duration-300 hover:gap-5"
            >
              Cotizar Ahora
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#servicios"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-white/25 px-8 py-4 text-sm font-semibold text-white hover:border-white hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              Explorar Servicios
            </a>
          </motion.div>
        </div>

        {/* Circular Floating CTA */}
        <motion.a
          href="#servicios"
          className="absolute right-8 bottom-32 md:right-16 md:bottom-40 w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center gap-1 text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_50px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer group"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.3, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.08 }}
        >
          <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase leading-tight text-center text-white">
            {"Explorar"}
            <br />
            {"Nuestros"}
            <br />
            {"Servicios"}
          </span>
          <Plus className="w-4 h-4 mt-1 text-white transition-transform group-hover:rotate-90 duration-300" />
        </motion.a>
      </motion.div>

      {/* Stats Bar at Bottom - glass with more punch */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-black/85 backdrop-blur-xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-center gap-4 py-6 md:py-8 px-4 ${i < stats.length - 1 ? "md:border-r md:border-white/15" : ""
                  } ${i < 2 ? "border-b md:border-b-0 border-white/15" : ""}`}
              >
                <span className="text-2xl md:text-3xl font-serif font-bold text-orange drop-shadow-[0_1px_6px_rgba(242,140,40,0.4)]">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs text-white/80 uppercase tracking-wider leading-tight font-sans">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Vertical scroll indicator */}
      <motion.div
        className="absolute left-6 bottom-28 md:bottom-32 hidden md:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span
          className="text-[10px] text-white/40 tracking-widest uppercase font-sans"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-teal to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
