"use client"

import { useEffect, useMemo, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Grid3x3, LayoutGrid, User } from "lucide-react"
import Link from "next/link"
import {
  defaultCatalog,
  normalizeCatalog,
  sortCategories,
  type CatalogData,
  type CatalogProduct,
} from "@/lib/catalogo"

export default function ProdutosPage() {
  const [catalog, setCatalog] = useState<CatalogData>(() => defaultCatalog)

  const loadCatalog = async () => {
    try {
      const response = await fetch("/api/catalogo", { cache: "no-store" })
      if (!response.ok) return
      const data = await response.json()
      const normalized = normalizeCatalog(data)
      setCatalog(normalized)
    } catch {
      // Silencioso: usa o catálogo padrão
    }
  }

  useEffect(() => {
    loadCatalog()
  }, [])

  const visibleCategories = useMemo(
    () => sortCategories(catalog.categories).filter((category) => category.visible),
    [catalog.categories],
  )

  /** Catálogo focado apenas em lavatórios (alinha com o posicionamento do site). */
  const lavatorioCategories = useMemo(
    () =>
      visibleCategories.filter(
        (c) => c.id === "lavatorios" || c.name.trim().toLowerCase() === "lavatórios",
      ),
    [visibleCategories],
  )

  const groupedProducts = useMemo(() => {
    const groups: Record<string, CatalogProduct[]> = {}
    catalog.products.forEach((product) => {
      if (!groups[product.categoryId]) {
        groups[product.categoryId] = []
      }
      groups[product.categoryId].push(product)
    })
    return groups
  }, [catalog.products])

  return (
    <div className="min-h-screen bg-black pt-40 text-zinc-100">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/luxury-bathroom-showroom-elegant-display.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="mb-6">
              <Badge className="border-red-600/40 bg-red-600/15 text-zinc-100">
              <Grid3x3 className="mr-2" size={16} />
              Lavatórios
            </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-balance">
              Lavatórios
            </h1>
            <p className="text-xl font-light leading-relaxed max-w-2xl text-zinc-400">
              Catálogo dedicado a lavatórios em compósito. Modelos adicionais e medidas especiais sob consulta.
            </p>
          </div>
        </div>
      </section>

          {/* Quick Navigation */}
      <section className="py-4 md:py-6 bg-black/95 backdrop-blur-sm sticky top-0 z-40 border-b border-white/10 shadow-none">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
            <Button variant="secondary" size="sm" className="hidden border-white/15 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 md:inline-flex" asChild>
              <Link href="/admin/catalogo" target="_blank" rel="noreferrer">
                <User className="mr-2" size={16} />
                Admin
              </Link>
            </Button>
            <span className="text-xs md:text-sm font-medium text-zinc-500 uppercase tracking-wider hidden sm:inline">
              Categorias:
            </span>
            {lavatorioCategories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                className="font-medium text-zinc-300 transition-colors hover:bg-red-600 hover:text-white text-xs md:px-3 md:text-sm px-2"
                onClick={() => {
                  const element = document.getElementById(category.id)
                  if (element) {
                    const offset = 80
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                    window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
                  }
                }}
              >
                {category.name}
                <Badge variant="secondary" className="ml-1 border-white/10 bg-zinc-800 font-semibold text-xs text-zinc-200 md:ml-2">
                  {(groupedProducts[category.id] || []).length}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories with Products */}
      {lavatorioCategories.length === 0 && (
        <section className="py-24 bg-zinc-950">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg font-light text-zinc-400 max-w-xl mx-auto">
              Ainda não há categoria «Lavatórios» na base de dados. No painel de administração, mantenha apenas esta
              categoria visível ou crie-a com o identificador <span className="font-mono text-sm">lavatorios</span>.
            </p>
          </div>
        </section>
      )}
      {lavatorioCategories.map((category, categoryIndex) => {
        const products = groupedProducts[category.id] || []
        return (
        <section
          key={category.id}
          id={category.id}
          className={`py-24 ${categoryIndex % 2 === 0 ? "bg-black" : "bg-zinc-950"}`}
        >
          <div className="container mx-auto px-4">
            {/* Category Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-6xl font-light text-zinc-700">
                  {String(categoryIndex + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-2">{category.name}</h2>
                  <p className="text-lg font-light text-zinc-400">
                    Produtos premium sob medida para o seu projeto.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-light text-zinc-500">
                <LayoutGrid size={16} />
                <span>{products.length} produtos</span>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group p-0 overflow-hidden border-2 border-white/10 bg-zinc-950 hover:border-red-600/60 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/20"
                >
                  <div className="h-56 md:h-64 overflow-hidden bg-zinc-900">
                    <img
                      src={product.imageCover || product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-6 text-zinc-100">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="text-lg font-light">{product.name}</h3>
                      <span className="text-sm font-semibold text-red-500">
                        {product.valueType === "sob_consulta" ? "Sob consulta" : product.value || "Sob consulta"}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                      {product.description || "Detalhes disponíveis sob consulta."}
                    </p>
                    <Button variant="outline" size="sm" className="border-white/25 text-zinc-100 hover:bg-red-600 hover:border-red-600 hover:text-white" asChild>
                      <Link href="/contacto">
                        Pedir orçamento
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                      </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Category CTA */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="border-white/25 text-zinc-100 hover:bg-red-600 hover:border-red-600 hover:text-white" asChild>
                <Link href="/contacto">
                  Solicitar Orçamento para {category.name}
                  <ChevronRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )})}

      {/* Bottom CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6">Não Encontrou o Que Procura?</h2>
          <p className="text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed text-zinc-400">
            Criamos projetos personalizados à medida das suas necessidades. Entre em contacto connosco para uma solução
            exclusiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contacto">Contactar Agora</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-primary-foreground hover:bg-red-600 hover:text-white hover:border-red-600 dark:border-white"
              asChild
            >
              <Link href="/puren">PUREN</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
