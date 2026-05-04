"use client"

import { motion } from "framer-motion"
import { Icon } from "@iconify/react"

/** Departamentos del organigrama corporativo de Capsuland */
const departments = [
  {
    name: "Dirección Técnica",
    icon: "ph:flask-fill",
    accent: "text-teal border-teal/30 bg-teal/5 shadow-teal/10",
    glow: "shadow-[0_0_20px_rgba(20,184,166,0.15)]",
  },
  {
    name: "Garantía y Control de Calidad",
    icon: "ph:shield-check-fill",
    accent: "text-emerald-600 border-emerald-300 bg-emerald-50 shadow-emerald-500/10",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
  {
    name: "Asuntos Regulatorios",
    icon: "ph:clipboard-text-fill",
    accent: "text-sky-600 border-sky-300 bg-sky-50 shadow-sky-500/10",
    glow: "shadow-[0_0_20px_rgba(14,165,233,0.15)]",
  },
  {
    name: "Mantenimiento",
    icon: "ph:wrench-fill",
    accent: "text-violet-600 border-violet-300 bg-violet-50 shadow-violet-500/10",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  },
  {
    name: "Producción y Maquila",
    icon: "ph:factory-fill",
    accent: "text-orange border-orange/30 bg-orange/5 shadow-orange/10",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
  },
  {
    name: "Logística y Distribución",
    icon: "ph:truck-fill",
    accent: "text-amber-600 border-amber-300 bg-amber-50 shadow-amber-500/10",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
  {
    name: "Investigación y Desarrollo",
    icon: "ph:atom-fill",
    accent: "text-rose-600 border-rose-300 bg-rose-50 shadow-rose-500/10",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
  },
  {
    name: "Comercial",
    icon: "ph:handshake-fill",
    accent: "text-cyan-600 border-cyan-300 bg-cyan-50 shadow-cyan-500/10",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  },
]

/**
 * Posiciones orbitales en porcentaje (center = 50%, 50%).
 * Radio es responsive pero podemos fijarlo al 40% del contenedor para que los nodos
 * se ubiquen cerca de los bordes.
 */
const orbitalPositions = (() => {
  const r = 38
  return departments.map((_, i) => {
    const angle = (i * 360) / departments.length - 90
    const rad = (angle * Math.PI) / 180
    return {
      top: `${50 + r * Math.sin(rad)}%`,
      left: `${50 + r * Math.cos(rad)}%`,
    }
  })
})()

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
}

export default function Testimonials() {
  return (
    <section className="py-16 md:py-28 bg-white relative overflow-hidden flex flex-col items-center">
      {/* Background patterns to make it less minimalist */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/[0.02] to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(#0f2926 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />
      
      {/* Soft decorative glow behind the chart */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl px-4 sm:px-6 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <motion.div {...fadeUp} className="text-center mb-10 md:mb-16 w-full max-w-3xl">
          <span className="inline-flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold tracking-widest uppercase text-teal mb-4 bg-teal/5 py-1.5 px-4 rounded-full border border-teal/10">
            <span className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_#14b8a6]" />
            Estructura Organizacional
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-4 tracking-tight">
            Nuestro equipo de trabajo
          </h2>
          <p className="text-charcoal/70 text-sm md:text-base leading-relaxed">
            Una estructura sólida y altamente especializada, orientada a la excelencia en cada etapa del
            proceso productivo farmacéutico B2B.
          </p>
        </motion.div>

        {/* ── Responsive Orbital Layout ── */}
        <div className="relative w-full max-w-[340px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[850px] aspect-square mx-auto mt-4 md:mt-8">
          
          {/* Orbit rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-full border-[1.5px] border-dashed border-charcoal/10 w-[56%] h-[56%] animate-[spin_240s_linear_infinite]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-full border border-charcoal/5 w-[82%] h-[82%] shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]" />
          </div>

          {/* Connector lines SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {orbitalPositions.map((pos, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={parseFloat(pos.left)}
                y2={parseFloat(pos.top)}
                stroke="currentColor"
                className="text-charcoal/10"
                strokeWidth="0.2"
                strokeDasharray="1 1"
              />
            ))}
          </svg>

          {/* Central Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
            whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute z-30"
            style={{ top: "50%", left: "50%" }}
          >
            <div className="w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px] rounded-full bg-gradient-to-br from-[#0f2926] via-[#153a35] to-[#1a4a44] shadow-[0_20px_50px_-12px_rgba(15,41,38,0.5)] flex flex-col items-center justify-center text-white border-4 border-white ring-4 ring-teal/20 relative overflow-hidden group cursor-default">
              
              {/* Inner animated glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <Icon
                icon="ph:buildings-fill"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 mb-1 md:mb-2 text-teal/80 z-10 drop-shadow-md"
              />
              <span className="text-[7px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold tracking-[0.25em] uppercase text-teal/70 z-10 mb-0.5">
                Gerencia
              </span>
              <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-black tracking-wide z-10">
                General
              </span>
            </div>
          </motion.div>

          {/* Orbiting department nodes */}
          {departments.map((dept, i) => {
            const pos = orbitalPositions[i]
            return (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
                whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.15 + i * 0.08 }}
                className="absolute z-20"
                style={{
                  top: pos.top,
                  left: pos.left,
                }}
              >
                <div className="flex flex-col items-center gap-1.5 md:gap-3 group cursor-default">
                  {/* Node Icon Box */}
                  <div
                    className={`relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] rounded-xl sm:rounded-2xl border-2 flex items-center justify-center bg-white ${dept.accent} ${dept.glow} group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300`}
                  >
                    <Icon
                      icon={dept.icon}
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                    />
                  </div>
                  {/* Node Label */}
                  <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-charcoal/80 text-center max-w-[70px] sm:max-w-[90px] md:max-w-[120px] lg:max-w-[140px] leading-tight group-hover:text-charcoal transition-colors drop-shadow-sm">
                    {dept.name}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
