"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/produtos", label: "Produtos" },
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/servicos", label: "Serviços" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/logoc.png"
              alt="CarboStone Logo"
              className="h-12 w-auto scale-250 origin-left transition-transform duration-300 hover:scale-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-light tracking-wide hover:text-white/70 transition-colors uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="outline" className="bg-white text-black hover:bg-white/90 border-white">
              Orçamento Grátis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden" aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 bg-black/50 backdrop-blur-lg -mx-4 px-4 rounded-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-light tracking-wide hover:text-white/70 transition-colors uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="outline" className="w-full bg-white text-black hover:bg-white/90 border-white">
              Orçamento Grátis
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
