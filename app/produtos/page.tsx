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
    <div className="min-h-screen bg-background pt-40 text-foreground">
      <Navigation />

      {/* Hero — tom claro como home / sobre */}
      <section className="relative overflow-hidden border-b border-border/60 bg-muted py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
          <img
            src="/luxury-bathroom-showroom-elegant-display.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/95" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-6">
              <Badge className="border-red-600/35 bg-red-600/10 text-foreground">
                <Grid3x3 className="mr-2" size={16} />
                Lavatórios
              </Badge>
            </div>
            <h1 className="mb-6 text-balance font-druke text-4xl font-light uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Lavatórios
            </h1>
            <p className="max-w-2xl text-xl font-light leading-relaxed text-muted-foreground">
              Catálogo dedicado a lavatórios em compósito. Modelos adicionais e medidas especiais sob consulta.
            </p>
          </div>
        </div>
      </section>

      {/* Navegação rápida */}
      <section className="sticky top-0 z-40 border-b border-border/60 bg-background/95 py-4 shadow-sm backdrop-blur-md md:py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <Button variant="outline" size="sm" className="hidden border-border md:inline-flex" asChild>
              <Link href="/admin/catalogo" target="_blank" rel="noreferrer">
                <User className="mr-2" size={16} />
                Admin
              </Link>
            </Button>
            <span className="hidden text-xs font-medium uppercase tracking-wider text-muted-foreground sm:inline">
              Categorias:
            </span>
            {lavatorioCategories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                className="px-2 text-xs font-medium text-foreground transition-colors hover:bg-red-600 hover:text-white md:px-3 md:text-sm"
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
                <Badge variant="secondary" className="ml-1 border-border/60 bg-muted font-semibold text-xs text-foreground md:ml-2">
                  {(groupedProducts[category.id] || []).length}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {lavatorioCategories.length === 0 && (
        <section className="bg-muted py-24">
          <div className="container mx-auto px-4 text-center">
            <p className="mx-auto max-w-xl text-lg font-light text-muted-foreground">
              Ainda não há categoria «Lavatórios» na base de dados. No painel de administração, mantenha apenas esta
              categoria visível ou crie-a com o identificador <span className="font-mono text-sm text-foreground">lavatorios</span>.
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
            className={`py-24 ${categoryIndex % 2 === 0 ? "bg-background" : "bg-muted"}`}
          >
            <div className="container mx-auto px-4">
              <div className="mb-12">
                <div className="mb-4 flex items-center gap-3">
                  <div className="font-druke text-5xl font-light text-muted-foreground/50 md:text-6xl">
                    {String(categoryIndex + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h2 className="mb-2 font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-5xl">
                      {category.name}
                    </h2>
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

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden border-border/60 bg-white/80 p-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-red-500/35 hover:shadow-lg"
                  >
                    <div className="h-56 overflow-hidden bg-muted md:h-64">
                      <img
                        src={product.imageCover || product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-6 text-foreground">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h3 className="text-lg font-light">{product.name}</h3>
                        <span className="text-sm font-semibold text-red-600">
                          {product.valueType === "sob_consulta" ? "Sob consulta" : product.value || "Sob consulta"}
                        </span>
                      </div>
                      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                        {product.description || "Detalhes disponíveis sob consulta."}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border hover:border-red-600 hover:bg-red-600 hover:text-white"
                        asChild
                      >
                        <Link href="/contacto">
                          Pedir orçamento
                          <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button size="lg" asChild>
                  <Link href="/contacto">
                    Solicitar Orçamento para {category.name}
                    <ChevronRight className="ml-2" size={20} />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA final — claro */}
      <section className="border-t border-border/60 bg-background py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-5xl">
            Não encontrou o que procura?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl font-light leading-relaxed text-muted-foreground">
            Criamos projetos personalizados à medida das suas necessidades. Entre em contacto connosco para uma solução
            exclusiva.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contacto">Contactar agora</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-red-600 hover:bg-red-600 hover:text-white"
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
