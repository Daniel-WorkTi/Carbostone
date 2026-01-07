import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Award, Users, Clock, Target } from "lucide-react"

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
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">Sobre a CarboStone</h1>
          <p className="text-lg font-light max-w-3xl mx-auto leading-relaxed text-muted-foreground">
            Especialistas em compósitos para casa de banho, oferecendo soluções premium que transformam espaços
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light tracking-tight mb-6 text-balance">A Nossa História</h2>
              <div className="space-y-4 text-muted-foreground font-light leading-relaxed">
                <p>
                  A CarboStone nasceu da paixão por criar espaços de casa de banho excecionais. Com anos de experiência
                  no setor de compósitos, decidimos especializar-nos em móveis premium que combinam estética e
                  funcionalidade.
                </p>
                <p>
                  Cada projeto é tratado com atenção aos detalhes, utilizando materiais de primeira qualidade e técnicas
                  de produção avançadas. O nosso compromisso é entregar soluções que superem as expectativas dos nossos
                  clientes.
                </p>
                <p>
                  Acreditamos que a casa de banho é um espaço de tranquilidade e conforto, e os nossos móveis são
                  desenhados para elevar essa experiência ao mais alto nível.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-accent rounded-sm overflow-hidden">
              <img src="/modern-bathroom-showroom-elegant-interior.jpg" alt="CarboStone Showroom" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-tight mb-4">Os Nossos Valores</h2>
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Princípios que guiam o nosso trabalho diário
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-light tracking-wide">{value.title}</h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">{value.description}</p>
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
