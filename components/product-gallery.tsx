"use client"

import { useEffect, useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface ProductGalleryProps {
  images: string[]
  productName: string
  isOpen: boolean
  onClose: () => void
}

export default function ProductGallery({
  images,
  productName,
  isOpen,
  onClose,
}: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0)
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose, goToPrevious, goToNext])

  if (!images.length) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl mx-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 md:right-0 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Cerrar galería"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Product Name */}
            <h3 className="text-white text-center text-lg md:text-xl font-bold mb-6 px-4">
              {productName}
            </h3>

            {/* Main Image */}
            <div className="relative w-full aspect-square max-h-[60vh] bg-white/5 rounded-2xl overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-center justify-center p-6 md:p-10"
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`${productName} - Vista ${currentIndex + 1}`}
                    width={600}
                    height={600}
                    className="max-w-full max-h-full object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/50 flex items-center justify-center transition-all"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/50 flex items-center justify-center transition-all"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white/80 text-xs font-medium">
                {currentIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 justify-center flex-wrap px-4 max-w-full">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                      idx === currentIndex
                        ? "border-teal ring-2 ring-teal/30 scale-105"
                        : "border-white/20 hover:border-white/50 opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`Ver imagen ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${productName} miniatura ${idx + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain bg-white/10 p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
