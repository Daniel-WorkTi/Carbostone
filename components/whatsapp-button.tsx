"use client"

import { MessageCircle } from "lucide-react"
import { useState } from "react"

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const phoneNumber = "351912345678" // Altere para o número real do WhatsApp

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=Olá, gostaria de saber mais sobre os vossos móveis de casa de banho.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contactar via WhatsApp"
    >
      <div className="relative">
        <div className="bg-[#25D366] text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]">
          <MessageCircle size={28} className="animate-pulse" />
        </div>
        {isHovered && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg whitespace-nowrap shadow-xl animate-fadeIn">
            <div className="text-sm font-light">Fale connosco no WhatsApp</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-primary"></div>
          </div>
        )}
      </div>
    </a>
  )
}
