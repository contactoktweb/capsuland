import { AlertCircle } from "lucide-react"

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1E2322] text-white px-6 relative overflow-hidden">
      {/* Background patterns similar to contact section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(100,140,135,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(75,75,75,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(75,75,75,0.05)_1px,transparent_1px)] bg-[length:60px_60px]" />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-8">
          <AlertCircle className="w-8 h-8 text-teal-500" />
        </div>
        
        <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          Sitio en mantenimiento
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
          Estamos mejorando nuestra plataforma
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 text-balance mb-12">
          En este momento nos encontramos realizando actualizaciones para ofrecerte una mejor experiencia. 
          Estaremos de vuelta muy pronto.
        </p>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full max-w-md">
          <p className="text-sm text-white/60 mb-4">Para consultas urgentes puedes contactarnos en:</p>
          <div className="flex flex-col gap-3">
            <a href="mailto:comercial2@capsuland.com" className="text-white hover:text-teal-400 transition-colors font-medium">
              comercial2@capsuland.com
            </a>
            <a href="tel:+573103047673" className="text-white hover:text-teal-400 transition-colors font-medium">
              +57 310 304 7673
            </a>
          </div>
        </div>
      </div>
      
      {/* Branding Footer for Maintenance */}
      <div className="absolute bottom-6 text-center w-full z-10">
        <a href="https://www.kytcode.lat" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors">
          Desarrollado por K&T <span className="text-white">🤍</span> {new Date().getFullYear()}
        </a>
      </div>
    </div>
  )
}
