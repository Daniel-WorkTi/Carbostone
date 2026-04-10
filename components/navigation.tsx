"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"
  /** Fora da home a barra fica sempre escura; na home só após scroll. */
  const showDarkBar = !isHome || isScrolled

  /** PUREN no lugar do antigo item «Serviços» (após Sobre Nós). */
  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/produtos", label: "Produtos" },
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/puren", label: "PUREN" },
    { href: "/galeria", label: "Galeria" },
    { href: "/contacto", label: "Contacto" },
  ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999]">
      <div
        className={[
          "mx-auto w-full transition-all duration-300",
          showDarkBar
            ? "bg-black/70 backdrop-blur-xl shadow-lg shadow-black/25 border-b border-white/10"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="container mx-auto px-4">
          <div className="flex h-40 items-center justify-between">
            <Link href="/" className="flex items-center gap-3" aria-label="CarboStone">
              <img
                src="/images/logo2.png"
                alt="CarboStone Logo"
                className="h-32 md:h-36 w-auto transition-transform duration-300 hover:scale-[1.02]"
              />
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "relative text-sm uppercase tracking-widest font-bold text-white/90 transition-colors hover:text-white",
                      "after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-red-600 after:transition-transform after:duration-300",
                      "hover:after:scale-x-100",
                      isActive ? "text-white after:scale-x-100" : "",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Mobile trigger */}
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className={[
                "md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full backdrop-blur transition-colors",
                showDarkBar
                  ? "border border-white/15 bg-black/40 text-white hover:border-red-600/40"
                  : "border border-white/20 bg-white/10 text-white hover:border-red-600/40",
              ].join(" ")}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm uppercase tracking-widest transition-colors",
                    isActive ? "bg-red-600 text-white" : "text-zinc-200 hover:bg-zinc-900 hover:text-white",
                  ].join(" ")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
