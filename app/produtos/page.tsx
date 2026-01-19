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
    <div className="min-h-screen bg-background">
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
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              <Grid3x3 className="mr-2" size={16} />
              Catálogo Principal
            </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-balance">
              Explore Nossa Coleção Premium
            </h1>
            <p className="text-xl font-light leading-relaxed max-w-2xl text-muted-foreground">
              Produtos principais selecionados por categoria. Móveis de alta qualidade em compósito com design
              sofisticado e durabilidade excepcional. Mais modelos disponíveis sob consulta.
            </p>
          </div>
        </div>
      </section>

          {/* Quick Navigation */}
      <section className="py-4 md:py-6 bg-background/95 backdrop-blur-sm sticky top-0 z-40 border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
            <Button variant="secondary" size="sm" className="hidden md:inline-flex" asChild>
              <Link href="/admin/catalogo" target="_blank" rel="noreferrer">
                <User className="mr-2" size={16} />
                Admin
              </Link>
            </Button>
            <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider hidden sm:inline">
              Categorias:
            </span>
            {visibleCategories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                className="hover:bg-primary hover:text-primary-foreground font-medium transition-colors text-xs md:text-sm px-2 md:px-3"
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
                <Badge variant="secondary" className="ml-1 md:ml-2 font-semibold text-xs">
                  {(groupedProducts[category.id] || []).length}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories with Products */}
      {visibleCategories.map((category, categoryIndex) => {
        const products = groupedProducts[category.id] || []
        return (
        <section
          key={category.id}
          id={category.id}
          className={`py-24 ${categoryIndex % 2 === 0 ? "bg-background" : "bg-muted"}`}
        >
          <div className="container mx-auto px-4">
            {/* Category Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-6xl font-light text-muted-foreground/30">
                  {String(categoryIndex + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-2">{category.name}</h2>
                  <p className="text-lg font-light text-muted-foreground">
                    Produtos premium sob medida para o seu projeto.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-light text-muted-foreground">
                <LayoutGrid size={16} />
                <span>{products.length} produtos</span>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group p-0 overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl"
                >
                  <div className="h-56 md:h-64 overflow-hidden bg-muted">
                    <img
                      src={product.imageCover || product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="text-lg font-light">{product.name}</h3>
                      <span className="text-sm font-semibold">
                        {product.valueType === "sob_consulta" ? "Sob consulta" : product.value || "Sob consulta"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description || "Detalhes disponíveis sob consulta."}
                    </p>
                    <Button variant="outline" size="sm" asChild>
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
              <Button variant="outline" size="lg" asChild>
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
          <p className="text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed text-muted-foreground">
            Criamos projetos personalizados à medida das suas necessidades. Entre em contacto connosco para uma solução
            exclusiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-muted" asChild>
              <Link href="/contacto">Contactar Agora</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/servicos">Ver Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
