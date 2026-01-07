"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageGalleryProps {
  images: { src: string; alt: string; category?: string }[]
  columns?: number
}

export function ImageGallery({ images, columns = 4 }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1)
    }
  }

  const handlePrev = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-4`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square bg-muted overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-30"
            onClick={handlePrev}
            disabled={selectedImage === 0}
          >
            <ChevronLeft size={48} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-30"
            onClick={handleNext}
            disabled={selectedImage === images.length - 1}
          >
            <ChevronRight size={48} />
          </Button>

          <img
            src={images[selectedImage].src || "/placeholder.svg"}
            alt={images[selectedImage].alt}
            className="max-w-[90%] max-h-[90%] object-contain"
          />

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="text-lg font-light">{images[selectedImage].alt}</p>
            <p className="text-sm text-white/70 mt-1">
              {selectedImage + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
