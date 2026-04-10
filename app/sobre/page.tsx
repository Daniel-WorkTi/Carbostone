import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PurenLogo } from "@/components/puren-logo"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
    <div className="min-h-screen bg-black pt-40 text-zinc-100">
      <Navigation />

      {/* Hero */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">Sobre a CarboStone</h1>
          <p className="text-lg font-light max-w-3xl mx-auto leading-relaxed text-zinc-400">
            Desde 2004, fabricamos soluções em compósitos para casa de banho com foco em qualidade, personalização e
            durabilidade
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light tracking-tight mb-6 text-balance">A Nossa História</h2>
              <div className="space-y-4 text-zinc-400 font-light leading-relaxed">
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
            <div className="aspect-square bg-zinc-900 rounded-sm overflow-hidden ring-1 ring-white/10">
              <img src="/modern-bathroom-showroom-elegant-interior.jpg" alt="CarboStone Showroom" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* PUREN */}
      <section className="border-y border-white/10 bg-zinc-950 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex justify-center lg:justify-end">
              <PurenLogo variant="section" />
            </div>
            <div className="text-center lg:text-left">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Marca PUREN</p>
            <h2 className="sr-only">PUREN</h2>
            <div className="space-y-5 text-zinc-400 font-light leading-relaxed">
              <p>
                A CarboStone é também proprietária oficial da marca <strong className="font-medium text-zinc-100">PUREN</strong>,
                reservando-se o direito à gestão da mesma.
              </p>
              <p>
                A PUREN é uma marca de comercialização de{" "}
                <strong className="font-medium text-zinc-100">móveis</strong>,{" "}
                <strong className="font-medium text-zinc-100">espelhos</strong>,{" "}
                <strong className="font-medium text-zinc-100">lavatórios</strong> e{" "}
                <strong className="font-medium text-zinc-100">torneiras</strong>, com{" "}
                <strong className="font-medium text-zinc-100">distribuidores autorizados</strong> na comercialização da
                marca.
              </p>
            </div>
            <div className="mt-10 flex justify-center lg:justify-start">
              <Button asChild variant="outline" className="border-white/25 text-zinc-100 hover:bg-red-600 hover:border-red-600 hover:text-white">
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

      {/* Values */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-tight mb-4">Os Nossos Valores</h2>
            <p className="text-lg font-light text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Princípios que guiam o nosso trabalho diário
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm border border-red-600/50 bg-black text-zinc-100">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-light tracking-wide">{value.title}</h3>
                  <p className="text-sm font-light text-zinc-400 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-light mb-2">15+</div>
              <p className="text-sm font-light text-muted-foreground uppercase tracking-wider">Anos de Experiência</p>
            </div>
            <div>
              <div className="text-5xl font-light mb-2">500+</div>
              <p className="text-sm font-light text-muted-foreground uppercase tracking-wider">Projetos Concluídos</p>
            </div>
            <div>
              <div className="text-5xl font-light mb-2">98%</div>
              <p className="text-sm font-light text-muted-foreground uppercase tracking-wider">Clientes Satisfeitos</p>
            </div>
            <div>
              <div className="text-5xl font-light mb-2">24/7</div>
              <p className="text-sm font-light text-muted-foreground uppercase tracking-wider">Suporte Disponível</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
