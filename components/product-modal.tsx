"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, X, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

interface ProductImage {
  src: string
  alt: string
}

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    title: string
    price: string
    category: string
    description: string
    features: string[]
    images: ProductImage[]
  }
}

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 gap-0 overflow-hidden">
        <div className="grid lg:grid-cols-[60%,40%] h-full max-h-[95vh]">
          <div className="relative bg-muted min-h-[300px] lg:min-h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={product.images[currentImageIndex]?.src || "/placeholder.svg?height=800&width=800"}
                alt={product.images[currentImageIndex]?.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Carousel Controls */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg h-12 w-12 z-10"
                  onClick={prevImage}
                >
                  <ChevronLeft size={28} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg h-12 w-12 z-10"
                  onClick={nextImage}
                >
                  <ChevronRight size={28} />
                </Button>

                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-5 py-2.5 rounded-full text-sm font-light backdrop-blur-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </>
            )}

            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-3 transition-all bg-background ${
                      idx === currentImageIndex
                        ? "border-white ring-2 ring-white scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.src || "/placeholder.svg"} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="overflow-y-auto p-8 lg:p-10 bg-background">
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
                {product.category}
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-4 leading-tight">{product.title}</h2>
              <p className="text-3xl font-light text-primary">{product.price}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 tracking-wide">Descrição</h3>
              <p className="text-muted-foreground font-light leading-relaxed text-base">{product.description}</p>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-medium mb-4 tracking-wide">Características</h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground font-light text-base">
                    <span className="text-primary mt-1.5 text-lg">•</span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <Button className="w-full h-12 text-base" size="lg" asChild>
                <Link href="/contacto">
                  <MessageCircle className="mr-2" size={20} />
                  Solicitar Orçamento
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 text-base bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600"
                size="lg"
                asChild
              >
                <a href="https://wa.me/351123456789" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2" size={20} />
                  Contactar via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-full bg-black/50 hover:bg-black/70 text-white h-10 w-10 z-20"
          onClick={onClose}
        >
          <X size={20} />
        </Button>
      </DialogContent>
    </Dialog>
  )
}
