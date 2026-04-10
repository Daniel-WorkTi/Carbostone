import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PurenLogo } from "@/components/puren-logo"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Store, Boxes, Frame, Bath, Droplets, ChevronRight } from "lucide-react"

const distribuidoresOficiais: { id: string; nome: string; logoSrc?: string }[] = [
  { id: "1", nome: "Distribuidor oficial 1" },
  { id: "2", nome: "Distribuidor oficial 2" },
  { id: "3", nome: "Distribuidor oficial 3" },
  { id: "4", nome: "Distribuidor oficial 4" },
  { id: "5", nome: "Distribuidor oficial 5" },
  { id: "6", nome: "Distribuidor oficial 6" },
]

const gamaProdutos = [
  {
    icon: Boxes,
    titulo: "Móveis",
    texto: "Mobiliário para casa de banho alinhado com o posicionamento PUREN.",
  },
  {
    icon: Frame,
    titulo: "Espelhos",
    texto: "Espelhos e soluções de iluminação para projetos completos.",
  },
  {
    icon: Bath,
    titulo: "Lavatórios",
    texto: "Lavatórios em compósito com foco em durabilidade e higiene.",
  },
  {
    icon: Droplets,
    titulo: "Torneiras",
    texto: "Misturadoras e acabamentos para fechar o projeto.",
  },
]

export default function PurenPage() {
  return (
    <div className="min-h-screen bg-background pt-40 text-foreground">
      <Navigation />

      {/* Hero — alinhado à home: claro + imagem, sem bloco preto */}
      <section className="relative border-b border-border bg-muted/60 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/35 to-transparent" />
        <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-20 lg:py-24">
          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Marca PUREN</p>
            <h1 className="sr-only">PUREN — CarboStone</h1>
            <div className="mt-6 flex justify-center md:justify-start">
              <PurenLogo variant="section" className="!max-h-[200px] md:!max-h-[240px] !max-w-[280px] md:!max-w-sm" />
            </div>
            <p className="mt-6 text-sm font-light text-muted-foreground">CarboStone</p>
            <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-muted-foreground">
              Móveis, espelhos, lavatórios e torneiras. Rede de distribuidores autorizados; gestão da marca pela
              CarboStone.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Button size="lg" asChild>
                <Link href="/produtos">
                  Ver catálogo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contacto">Contacto</Link>
              </Button>
            </div>
            <p className="mt-10 max-w-lg border-t border-border pt-8 text-left text-sm leading-relaxed text-muted-foreground">
              A CarboStone é proprietária oficial da marca PUREN e reserva-se o direito à sua gestão. Comercialização
              através de distribuidores autorizados.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-lg ring-1 ring-border/60 md:aspect-square">
              <img
                src="/luxury-bathroom-countertop-marble-white.jpg"
                alt="Ambiente casa de banho"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Imagens PUREN (placeholders) */}
      <section className="border-b border-border bg-background py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 flex flex-col gap-3 text-center md:text-left">
            <h2 className="font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-4xl">
              PUREN em obra
            </h2>
            <p className="max-w-2xl text-base font-light text-muted-foreground">
              Aqui vamos colocar fotos reais da PUREN. Por enquanto, ficam imagens repetidas/placeholder para o layout já
              ficar montado.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/luxury-bathroom-showroom-elegant-display.jpg", title: "Showroom" },
              { src: "/luxury-bathroom-countertop-marble-white.jpg", title: "Acabamentos" },
              { src: "/luxury-integrated-marble-bathroom-sink.jpg", title: "Lavatórios" },
              { src: "/luxury-bathroom-showroom-elegant-display.jpg", title: "Showroom" },
              { src: "/luxury-bathroom-countertop-marble-white.jpg", title: "Acabamentos" },
              { src: "/luxury-integrated-marble-bathroom-sink.jpg", title: "Lavatórios" },
            ].map((item, idx) => (
              <div
                key={`puren-img-${idx}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-75" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-light tracking-wide text-white/90">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Texto marca */}
      <section className="border-b border-border bg-background py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-4xl">
            Comercialização e rede
          </h2>
          <div className="mt-8 space-y-5 text-base font-light leading-relaxed text-muted-foreground">
            <p>
              A <strong className="font-medium text-foreground">PUREN</strong> é uma marca de comercialização de{" "}
              <strong className="font-medium text-foreground">móveis</strong>,{" "}
              <strong className="font-medium text-foreground">espelhos</strong>,{" "}
              <strong className="font-medium text-foreground">lavatórios</strong> e{" "}
              <strong className="font-medium text-foreground">torneiras</strong>, com{" "}
              <strong className="font-medium text-foreground">distribuidores autorizados</strong>, em linha com os
              critérios CarboStone.
            </p>
          </div>
          <blockquote className="mt-10 border-l-4 border-red-600 pl-6 text-lg font-light italic leading-relaxed text-foreground/90">
            Da produção ao projeto final, cada linha PUREN responde a exigências reais de uso e de obra.
          </blockquote>
        </div>
      </section>

      {/* Gama — cartões como na home */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-4xl">
              Gama PUREN
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base font-light text-muted-foreground">
              Quatro famílias de produto para projetos de casa de banho.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gamaProdutos.map((item) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.titulo}
                  className="group border border-border/60 bg-card/90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-600/35 hover:shadow-lg"
                >
                  <CardContent className="flex flex-col gap-4 p-6 text-center sm:text-left">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted ring-1 ring-border/60 transition-all duration-300 group-hover:bg-red-600 group-hover:ring-red-600 sm:mx-0">
                      <Icon className="h-7 w-7 text-foreground transition-colors group-hover:text-white" strokeWidth={1.5} aria-hidden />
                    </div>
                    <h3 className="font-druke text-lg uppercase tracking-wide text-foreground">{item.titulo}</h3>
                    <p className="text-sm font-light leading-relaxed text-muted-foreground">{item.texto}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Distribuidores */}
      <section className="border-t border-border bg-background py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center md:text-left">
            <h2 className="font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-4xl">
              Distribuidores oficiais
            </h2>
            <p className="mt-3 max-w-xl text-base font-light text-muted-foreground">
              Parceiros autorizados a comercializar a marca. Substitua os placeholders pelos logótipos reais.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {distribuidoresOficiais.map((d) => (
              <div
                key={d.id}
                className="flex min-h-[150px] flex-col justify-center rounded-2xl border-2 border-dashed border-border bg-muted/40 px-6 py-8 transition-colors hover:border-red-600/30 hover:bg-muted/70"
              >
                {d.logoSrc ? (
                  <img src={d.logoSrc} alt={d.nome} className="mx-auto max-h-16 w-full max-w-[200px] object-contain" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted ring-1 ring-border">
                      <Store className="h-5 w-5 opacity-60" aria-hidden />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider">{d.nome}</span>
                    <span className="text-[11px] font-light">Logótipo a definir</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — faixa vermelha (marca), não preto contínuo */}
      <section className="bg-red-600 py-14 text-white">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 md:flex-row md:text-left">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="font-druke text-2xl font-light uppercase tracking-tight md:text-3xl">Informação comercial</h2>
            <p className="mt-2 text-base font-light text-white/90">
              Fichas técnicas, especificações e integração na rede PUREN — fale com a CarboStone.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="border-0 bg-white text-red-700 shadow-sm hover:bg-white/95"
              asChild
            >
              <Link href="/contacto">
                Pedir informações
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/70 bg-transparent text-white hover:bg-white/15"
              asChild
            >
              <Link href="/sobre">Sobre a CarboStone</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
