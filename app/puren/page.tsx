import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Store,
  Boxes,
  Frame,
  Bath,
  Droplets,
  ChevronRight,
  Sparkles,
  Shield,
  MapPin,
} from "lucide-react"

const pilaresMarca = [
  {
    icon: Sparkles,
    titulo: "Inovação",
    texto:
      "Antecipamos tendências de casa de banho e do canal B2B: propostas que encaixam em projetos atuais sem sacrificar identidade de marca.",
  },
  {
    icon: Shield,
    titulo: "Qualidade",
    texto:
      "Homologação rigorosa de fornecedores, critérios de acabamento e consistência entre coleções — o que leva o selo PUREN passa por validação CarboStone.",
  },
  {
    icon: MapPin,
    titulo: "Rede autorizada",
    texto:
      "Parceiros oficiais com formação e suporte: o cliente final encontra a gama onde deve, com rastreabilidade e acompanhamento comercial.",
  },
]

const gamaProdutos = [
  {
    icon: Boxes,
    titulo: "Móveis",
    texto:
      "Volumes, arrumação e soluções suspensas ou de chão — base para organizar o espaço antes de escolher lavatório e torneira.",
  },
  {
    icon: Frame,
    titulo: "Espelhos",
    texto:
      "Luz, profundidade visual e funcionalidade: espelhos que completam o conjunto sem parecer um ‘extra’ desligado do resto da peça.",
  },
  {
    icon: Bath,
    titulo: "Lavatórios",
    texto:
      "Da bancada integrada ao lavatório autónomo, com foco em uso diário, limpeza e harmonia com mobiliário e metais.",
  },
  {
    icon: Droplets,
    titulo: "Torneiras",
    texto:
      "Misturadoras e complementos que fecham o circuito hídrico com a mesma linguagem formal escolhida para o móvel e o lavatório.",
  },
]

const distribuidoresOficiais: { id: string; nome: string; logoSrc?: string }[] = [
  { id: "1", nome: "Distribuidor oficial 1" },
  { id: "2", nome: "Distribuidor oficial 2" },
  { id: "3", nome: "Distribuidor oficial 3" },
  { id: "4", nome: "Distribuidor oficial 4" },
  { id: "5", nome: "Distribuidor oficial 5" },
  { id: "6", nome: "Distribuidor oficial 6" },
]

export default function PurenPage() {
  return (
    <div className="min-h-screen bg-background pt-40 text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/80 to-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
        <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-20 lg:py-24">
          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
              Casa de banho · Gama coordenada · Grupo CarboStone
            </p>
            <h1 className="mt-6 font-druke text-4xl font-light uppercase tracking-tight text-foreground md:text-5xl">
              PUREN
            </h1>
            <p className="mt-6 font-druke text-2xl font-light uppercase leading-snug tracking-tight text-foreground md:text-3xl">
              Casa de banho com identidade, qualidade e rede autorizada
            </p>
            <div className="mt-6 max-w-xl space-y-4 text-base font-light leading-relaxed text-muted-foreground">
              <p>
                <strong className="font-medium text-foreground">PUREN</strong> é uma marca inovadora no mercado,
                especializada na comercialização de{" "}
                <strong className="font-medium text-foreground">móveis, espelhos, lavatórios e torneiras</strong> de alta
                qualidade. <strong className="font-medium text-foreground">Pertence à CarboStone</strong>, que detém os
                direitos exclusivos de gestão e desenvolvimento da marca, garantindo um padrão elevado de produtos e de
                serviços — do relacionamento com fornecedores ao suporte junto dos parceiros e clientes finais.
              </p>
              <p>
                Em projeto ou em loja, o que se procura é{" "}
                <strong className="font-medium text-foreground">uma linguagem única</strong> entre armazenamento, espelho,
                lavatório e metais: menos improvisos na obra, mais harmonia visual e técnica. Esta gama foi pensada para quem
                especifica, instala ou revê espaços completos sem depender de misturar origens que não foram pensadas em
                conjunto.
              </p>
              <p>
                Integra o <strong className="font-medium text-foreground">ecossistema CarboStone</strong>: a mesma exigência de
                rigor aplicada a outra frente comercial — retalho e canal profissional — com curadoria de linhas e continuidade
                de oferta ao longo do tempo.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Button size="lg" asChild>
                <Link href="/produtos">
                  Ver lavatórios CarboStone
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contacto">Contacto comercial</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-lg ring-1 ring-border/60 md:aspect-square">
              <img
                src="/images/heroPuren.png"
                alt="Ambiente casa de banho — gama PUREN"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quem é a PUREN — texto directo em blocos */}
      <section className="border-b border-border bg-background py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center md:text-left">
            <h2 className="font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-4xl">
              Posicionamento e operação
            </h2>
            <p className="mt-3 text-sm font-medium uppercase tracking-wider text-red-600">
              Catálogo curado · Imagem e parceiros · Complemento à CarboStone
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-6 text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            <p>
              No mercado de casa de banho, <strong className="font-medium text-foreground">a fragmentação</strong> —
              móvel de uma origem, torneira de outra, espelho sem coordenação com o lavatório — é uma fonte comum de retrabalho
              e de desgaste na relação com o cliente final. A operação por detrás desta gama existe para{" "}
              <strong className="font-medium text-foreground">reduzir esse ruído</strong>: critérios de entrada no catálogo,
              alinhamento estético entre famílias de produto e regras claras para quem representa a marca no terreno.
            </p>
            <p>
              A <strong className="font-medium text-foreground">gestão centralizada pela CarboStone</strong> permite
              decidir com coerência sobre lançamentos, comunicação e rede: não há «dois donos» da mesma promessa. Quem
              trabalha com o grupo reconhece o mesmo ADN de exigência — aqui aplicado a uma oferta{" "}
              <strong className="font-medium text-foreground">modular e replicável</strong>, pensada para volumes de projeto
              e para o retalho especializado.
            </p>
            <p>
              <strong className="font-medium text-foreground">Não substitui</strong> o núcleo forte da CarboStone em
              pedras naturais, quartzo e soluções à medida; <strong className="font-medium text-foreground">completa-o</strong>{" "}
              quando o cliente precisa de fechar a sala de banho com peças standardizadas mas alinhadas entre si, com a
              credibilidade de quem gere a marca de ponta a ponta.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
            {pilaresMarca.map((p) => {
              const Icon = p.icon
              return (
                <Card
                  key={p.titulo}
                  className="border-border/60 bg-card/95 text-center shadow-sm transition-shadow hover:shadow-md sm:text-left"
                >
                  <CardContent className="flex flex-col gap-3 p-6">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-red-600 sm:mx-0">
                      <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                    </div>
                    <h3 className="font-druke text-lg uppercase tracking-wide text-foreground">{p.titulo}</h3>
                    <p className="text-sm font-light leading-relaxed text-muted-foreground">{p.texto}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Distribuição autorizada */}
      <section className="border-b border-border bg-muted/50 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <h2 className="font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-4xl">
                Distribuição autorizada
              </h2>
              <p className="mt-4 max-w-md text-sm font-medium text-red-600">
                Pontos estratégicos · Qualidade e confiança · Funcionalidade e design
              </p>
            </div>
            <div className="space-y-5 text-base font-light leading-relaxed text-muted-foreground">
              <p>
                Com uma <strong className="font-medium text-foreground">rede de distribuidores autorizados</strong>, esta
                marca assegura que os produtos estejam disponíveis em{" "}
                <strong className="font-medium text-foreground">pontos de venda estratégicos</strong>, preservando a qualidade
                e a confiança que os nossos clientes merecem.
              </p>
              <p>
                Através dessa rede, procuramos proporcionar acesso aos melhores artigos, sempre com foco em{" "}
                <strong className="font-medium text-foreground">funcionalidade</strong>,{" "}
                <strong className="font-medium text-foreground">design</strong> e{" "}
                <strong className="font-medium text-foreground">inovação</strong>. Para o parceiro, traduz-se em formação,
                argumentário e continuidade de gama; para quem compra, em saber que o canal foi homologado pela CarboStone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compromisso / fecho narrativo */}
      <section className="border-b border-border bg-background py-14 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <blockquote className="border-l-4 border-red-600 pl-6 text-left text-lg font-light leading-relaxed text-foreground md:text-xl md:pl-8">
            <strong className="font-medium">
              Seja para renovar o seu espaço ou para criar um ambiente completamente novo
            </strong>
            , <strong className="font-medium">PUREN</strong> tem a solução ideal. Os produtos são pensados para oferecer não só{" "}
            <strong className="font-medium">estética</strong>, mas também <strong className="font-medium">durabilidade</strong>{" "}
            no uso quotidiano — do primeiro dia ao longo dos anos.
          </blockquote>
        </div>
      </section>

      {/* Gama — cartões */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-4xl">
              Em que trabalhamos
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base font-light text-muted-foreground">
              Cada família cobre uma peça-chave do espaço; em conjunto, permitem especificar a sala de banho de ponta a ponta
              com linguagem comum — sem depender de ‘mix’ improvisado entre marcas inconciliáveis.
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

      {/* Galeria / ambientes */}
      <section className="border-b border-border bg-background py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 flex flex-col gap-3 text-center md:text-left">
            <h2 className="font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-4xl">
              Ambientes & referência visual
            </h2>
            <p className="max-w-2xl text-base font-light text-muted-foreground">
              Inspiração de acabamentos e linhas compatíveis com a filosofia PUREN — substitua por fotografia oficial da
              marca quando disponível.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/luxury-bathroom-showroom-elegant-display.jpg", title: "Ambiente showroom" },
              { src: "/luxury-bathroom-countertop-marble-white.jpg", title: "Bancadas & volumes" },
              { src: "/luxury-integrated-marble-bathroom-sink.jpg", title: "Lavatórios" },
              { src: "/modern-suspended-bathroom-vanity-white-minimal.jpg", title: "Linha suspensa" },
              { src: "/luxury-modern-bathroom-interior-architecture.jpg", title: "Projeto integral" },
              { src: "/modern-bathroom-showroom-elegant-interior.jpg", title: "Detalhe de acabamento" },
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

      {/* Distribuidores */}
      <section className="border-t border-border bg-background py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center md:text-left">
            <h2 className="font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-4xl">
              Distribuidores oficiais
            </h2>
            <p className="mt-3 max-w-2xl text-base font-light text-muted-foreground">
              Parceiros autorizados a comercializar a marca PUREN. Substitua os placeholders pelos logótipos e dados
              reais da rede.
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

      {/* CTA */}
      <section className="bg-red-600 py-14 text-white">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 md:flex-row md:text-left">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="font-druke text-2xl font-light uppercase tracking-tight md:text-3xl">Informação comercial</h2>
            <p className="mt-2 text-base font-light text-white/90">
              Fichas técnicas, especificações e integração na rede PUREN — fale com a CarboStone.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <Button size="lg" className="border-0 bg-white text-red-700 shadow-sm hover:bg-white/95" asChild>
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
