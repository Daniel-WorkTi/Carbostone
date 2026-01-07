import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Wrench, Ruler, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Package,
      title: "Móveis de Casa de Banho",
      description:
        "Ampla seleção de móveis premium em compósito, incluindo móveis suspensos, bancadas, armários e acessórios elegantes.",
      features: ["Materiais de alta qualidade", "Design moderno", "Acabamentos premium", "Variedade de estilos"],
    },
    {
      icon: Ruler,
      title: "Projetos Personalizados",
      description:
        "Desenvolvemos soluções sob medida que se adaptam perfeitamente ao seu espaço e às suas necessidades específicas.",
      features: ["Medição no local", "Design 3D", "Consultoria profissional", "Produção exclusiva"],
    },
    {
      icon: Wrench,
      title: "Instalação Profissional",
      description: "Equipa técnica especializada garante uma instalação perfeita, rápida e sem complicações.",
      features: ["Técnicos certificados", "Equipamento profissional", "Limpeza incluída", "Garantia de instalação"],
    },
    {
      icon: Sparkles,
      title: "Manutenção e Suporte",
      description: "Serviço pós-venda completo para manter os seus móveis em perfeitas condições ao longo do tempo.",
      features: ["Garantia estendida", "Assistência técnica", "Peças de reposição", "Conselhos de manutenção"],
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">Os Nossos Serviços</h1>
          <p className="text-lg font-light max-w-3xl mx-auto leading-relaxed text-muted-foreground">
            Soluções completas para transformar a sua casa de banho num espaço de luxo e conforto
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center">
                      <Icon size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-light tracking-wide mb-3">{service.title}</h3>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-sm font-light flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-tight mb-4">Como Trabalhamos</h2>
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Um processo simples e transparente do início ao fim
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consulta Inicial", description: "Discutimos as suas necessidades e ideias" },
              { step: "02", title: "Proposta & Design", description: "Apresentamos soluções personalizadas" },
              { step: "03", title: "Produção", description: "Fabricamos com materiais premium" },
              { step: "04", title: "Instalação", description: "Equipa profissional instala no local" },
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="text-6xl font-light text-primary opacity-20">{item.step}</div>
                <h3 className="text-xl font-light tracking-wide">{item.title}</h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-balance">
            Interessado nos nossos serviços?
          </h2>
          <p className="text-lg font-light max-w-2xl mx-auto mb-8 leading-relaxed text-muted-foreground">
            Contacte-nos hoje para discutir o seu projeto e receber um orçamento personalizado
          </p>
          <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-muted" asChild>
            <Link href="/contacto">
              Pedir Orçamento
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
