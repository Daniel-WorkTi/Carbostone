import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PurenLogo } from "@/components/puren-logo"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Award, Users, Clock, Target, ArrowRight } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Utilizamos apenas os melhores materiais e técnicas de produção",
    },
    {
      icon: Users,
      title: "Equipa Experiente",
      description: "Profissionais qualificados com anos de experiência",
    },
    {
      icon: Clock,
      title: "Compromisso",
      description: "Cumprimos prazos e garantimos a sua satisfação",
    },
    {
      icon: Target,
      title: "Precisão",
      description: "Atenção aos detalhes em cada projeto",
    },
  ]

  return (
    <div className="min-h-screen bg-background pt-40 text-foreground">
      <Navigation />

      {/* Hero — alinhado ao tom claro da home */}
      <section className="border-b border-border/60 bg-background py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-balance font-druke text-4xl font-light uppercase tracking-tight text-foreground md:text-6xl">
            Sobre a CarboStone
          </h1>
          <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-muted-foreground">
            Desde 2004, fabricamos soluções em compósitos para casa de banho com foco em qualidade, personalização e
            durabilidade
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-balance font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-4xl">
                A Nossa História
              </h2>
              <div className="space-y-4 font-light leading-relaxed text-muted-foreground">
                <p>
                  A CarboStone (Carbostone, Lda) foi fundada em 2004 e tem sede em Porto de Mós, Portugal. A empresa
                  dedica-se ao fabrico de lavatórios, bases de chuveiro e banheiras, oferecendo soluções versáteis para
                  diferentes projetos e espaços.
                </p>
                <p>
                  As várias possibilidades de medidas, a fácil coloração das peças e a possibilidade de personalização
                  permitem adaptar cada peça às necessidades do cliente. Mediante consulta, existe ainda a possibilidade
                  de corte em obra, para garantir um ajuste perfeito a qualquer espaço.
                </p>
                <p>
                  Prezamos o fabrico de qualidade, utilizando moldes de alumínio e resinas de alta qualidade. O resultado
                  é um produto não poroso, considerado um material muito higiénico e antibacteriano, com uniformidade de
                  textura e personalização de cor.
                </p>
                <p>
                  Com excelente resistência à água e a manchas, elevada resistência química e elevada resistência
                  mecânica, as nossas soluções combinam durabilidade, facilidade de manutenção e uma instalação mais
                  simples, mantendo um toque e um acabamento extremamente apelativos.
                </p>
              </div>
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60">
              <img
                src="/modern-bathroom-showroom-elegant-interior.jpg"
                alt="CarboStone Showroom"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PUREN */}
      <section className="border-y border-border/60 bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex justify-center lg:justify-end">
              <PurenLogo variant="section" />
            </div>
            <div className="text-center lg:text-left">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Marca PUREN</p>
              <h2 className="sr-only">PUREN</h2>
              <div className="space-y-5 font-light leading-relaxed text-muted-foreground">
                <p>
                  A CarboStone é também proprietária oficial da marca{" "}
                  <strong className="font-medium text-foreground">PUREN</strong>, reservando-se o direito à gestão da
                  mesma.
                </p>
                <p>
                  A PUREN é uma marca de comercialização de <strong className="font-medium text-foreground">móveis</strong>
                  , <strong className="font-medium text-foreground">espelhos</strong>,{" "}
                  <strong className="font-medium text-foreground">lavatórios</strong> e{" "}
                  <strong className="font-medium text-foreground">torneiras</strong>, com{" "}
                  <strong className="font-medium text-foreground">distribuidores autorizados</strong> na comercialização
                  da marca.
                </p>
              </div>
              <div className="mt-10 flex justify-center lg:justify-start">
                <Button asChild variant="outline" className="border-border hover:border-red-600 hover:bg-red-600 hover:text-white">
                  <Link href="/puren">
                    Página PUREN
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values — cartões no estilo da home */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-druke text-3xl font-light uppercase tracking-tight text-foreground md:text-4xl">
              Os Nossos Valores
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
              Princípios que guiam o nosso trabalho diário
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className="group border-border/60 bg-white/80 p-8 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-red-500/30 hover:shadow-lg"
                >
                  <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted ring-1 ring-border/60 transition-all duration-300 group-hover:bg-red-600 group-hover:ring-red-600">
                    <Icon size={32} className="text-foreground/80 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="mb-3 font-druke text-xl font-light uppercase tracking-wide">{value.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground">{value.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border/60 bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="mb-2 font-druke text-4xl font-light text-foreground md:text-5xl">15+</div>
              <p className="text-sm font-light uppercase tracking-wider text-muted-foreground">Anos de Experiência</p>
            </div>
            <div>
              <div className="mb-2 font-druke text-4xl font-light text-foreground md:text-5xl">500+</div>
              <p className="text-sm font-light uppercase tracking-wider text-muted-foreground">Projetos Concluídos</p>
            </div>
            <div>
              <div className="mb-2 font-druke text-4xl font-light text-foreground md:text-5xl">98%</div>
              <p className="text-sm font-light uppercase tracking-wider text-muted-foreground">Clientes Satisfeitos</p>
            </div>
            <div>
              <div className="mb-2 font-druke text-4xl font-light text-foreground md:text-5xl">24/7</div>
              <p className="text-sm font-light uppercase tracking-wider text-muted-foreground">Suporte Disponível</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
