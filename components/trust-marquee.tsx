"use client"

const certifications = [
  "INVIMA",
  "BPM",
  "ISO 9001",
  "FDA Compliance",
  "GMP Certified",
  "Registro Sanitario",
]

export default function TrustMarquee() {
  return (
    <section className="py-8 bg-white border-y border-teal/10 overflow-hidden">
      <div className="relative flex">
        <div className="flex shrink-0 animate-[marquee_25s_linear_infinite] gap-12 items-center">
          {[...certifications, ...certifications].map((cert, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-charcoal/10 text-charcoal/40 hover:text-teal hover:border-teal/40 transition-colors cursor-default whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-current" />
              <span className="text-sm font-medium tracking-wide uppercase">
                {cert}
              </span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 animate-[marquee_25s_linear_infinite] gap-12 items-center ml-12" aria-hidden>
          {[...certifications, ...certifications].map((cert, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-charcoal/10 text-charcoal/40 hover:text-teal hover:border-teal/40 transition-colors cursor-default whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-current" />
              <span className="text-sm font-medium tracking-wide uppercase">
                {cert}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
