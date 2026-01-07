"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Sparkles, Award, Users, Star, Ruler, Palette, Shield, Clock } from "lucide-react"
import Link from "next/link"
import { QuoteForm } from "@/components/quote-form"
import { useState } from "react"

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null)

  const features = [
    { icon: Award, title: "Qualidade Premium", desc: "Materiais de primeira linha importados" },
    { icon: Ruler, title: "Medidas Personalizadas", desc: "Móveis feitos à sua medida" },
    { icon: Palette, title: "Design Exclusivo", desc: "Acabamentos sofisticados" },
    { icon: Shield, title: "Garantia de 5 Anos", desc: "Proteção total do investimento" },
    { icon: Users, title: "Equipa Especializada", desc: "Profissionais com 20+ anos" },
    { icon: Clock, title: "Instalação Rápida", desc: "Montagem em 24-48h" },
  ]

  const categories = [
    { name: "Móveis Suspensos", count: 15, image: "/modern-suspended-bathroom-vanity-white-minimal.jpg" },
    { name: "Bancadas Premium", count: 12, image: "/luxury-bathroom-countertop-marble-white.jpg" },
    { name: "Armários", count: 18, image: "/elegant-bathroom-cabinet-tall-storage.jpg" },
    { name: "Espelhos com LED", count: 10, image: "/bathroom-mirror-with-led-lighting-modern.jpg" },
  ]

  const featuredProducts = [
    {
      name: "Móvel Suspenso Premium Branco",
      category: "Móveis de Banho",
      image: "/modern-luxury-white-suspended-bathroom-vanity.jpg",
      price: "Sob consulta",
    },
    {
      name: "Espelho LED Retangular",
      category: "Espelhos",
      image: "/luxury-led-bathroom-mirror-rectangular.jpg",
      price: "Sob consulta",
    },
    {
      name: "Lavatório de Pousar Redondo",
      category: "Lavatórios",
      image: "/luxury-round-vessel-sink-marble-white.jpg",
      price: "Sob consulta",
    },
    {
      name: "Móvel Suspenso Duplo Premium",
      category: "Móveis de Banho",
      image: "/modern-luxury-double-bathroom-vanity-suspended.jpg",
      price: "Sob consulta",
    },
    {
      name: "Espelho LED Redondo",
      category: "Espelhos",
      image: "/luxury-round-led-bathroom-mirror-backlit.jpg",
      price: "Sob consulta",
    },
    {
      name: "Lavatório Integrado Mármore",
      category: "Lavatórios",
      image: "/luxury-integrated-marble-bathroom-sink.jpg",
      price: "Sob consulta",
    },
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      location: "Lisboa",
      rating: 5,
      text: "Qualidade excecional! Transformaram completamente a minha casa de banho. O acabamento é impecável e a equipa muito profissional.",
    },
    {
      name: "João Santos",
      location: "Porto",
      rating: 5,
      text: "Excelente relação qualidade-preço. Os materiais são de alta qualidade e o design ficou exatamente como eu queria.",
    },
    {
      name: "Ana Costa",
      location: "Braga",
      rating: 5,
      text: "Recomendo vivamente! Desde o atendimento até à instalação, tudo perfeito. Os móveis são lindíssimos e muito funcionais.",
    },
  ]

  const benefits = [
    "Materiais resistentes à humidade e água",
    "Acabamentos em compósito de alta durabilidade",
    "Instalação profissional incluída",
    "Projeto 3D gratuito antes da compra",
    "Orçamento sem compromisso",
    "Assistência pós-venda dedicada",
    "Opções de personalização ilimitadas",
    "Entrega e montagem em toda Portugal",
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section - Full Height without Form */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-muted">
          <img
            src="/luxury-modern-bathroom-interior-marble-elegant.jpg"
            alt="Luxury Bathroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <p className="text-sm text-white font-light tracking-widest uppercase">Desde 2005 a criar luxo</p>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight mb-6 text-white text-balance leading-[1.1]">
              Elegância que
              <br />
              Transforma Espaços
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-12 leading-relaxed text-white/90">
              Móveis premium em compósito para casas de banho sofisticadas. Design personalizado, qualidade superior,
              instalação profissional.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6" asChild>
                <Link href="/produtos">
                  Ver Catálogo Completo
                  <ArrowRight className="ml-2" size={24} />
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-serif font-light text-white mb-2">20+</div>
                <div className="text-sm text-white/70 uppercase tracking-wide">Anos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-light text-white mb-2">5000+</div>
                <div className="text-sm text-white/70 uppercase tracking-wide">Projetos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-light text-white mb-2">98%</div>
                <div className="text-sm text-white/70 uppercase tracking-wide">Satisfeitos</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Features Grid - Enhanced */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-4">
              Porque Escolher a CarboStone
            </h2>
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comprometidos com a excelência em cada detalhe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-8 text-center hover:shadow-xl transition-shadow duration-300 border-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-light tracking-wide mb-3">{feature.title}</h3>
                  <p className="text-base font-light text-muted-foreground leading-relaxed">{feature.desc}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-4">Nossa Coleção Premium</h2>
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore as nossas categorias de produtos exclusivos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => setSelectedImage({ src: category.image, title: category.name })}
              >
                <div className="relative aspect-[4/5] bg-muted rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-3xl font-serif font-light mb-2">{category.name}</h3>
                    <p className="text-base text-white/90">{category.count} Modelos Disponíveis</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-4">Produtos em Destaque</h2>
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Seleção dos nossos modelos mais populares e exclusivos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden bg-muted mb-4 rounded-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-light tracking-wide uppercase">{product.category}</p>
                  <h3 className="text-xl font-serif font-light tracking-tight">{product.name}</h3>
                  <p className="text-lg text-primary font-light">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/produtos">
                Ver Todos os Produtos
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-8">O Que Nos Torna Únicos</h2>
              <p className="text-lg font-light leading-relaxed mb-8 text-primary-foreground/90">
                Na CarboStone, combinamos tradição artesanal com tecnologia de ponta para criar móveis que superam todas
                as expectativas. Cada projeto é uma obra única, desenvolvida especialmente para si.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-primary-foreground mt-1 flex-shrink-0" />
                    <p className="text-base font-light leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-primary-foreground/10 rounded-lg overflow-hidden">
                <img
                  src="/luxury-bathroom-showroom-elegant-display.jpg"
                  alt="Showroom CarboStone"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary-foreground/10 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-4">
              O Que Dizem Os Nossos Clientes
            </h2>
            <p className="text-lg font-light text-muted-foreground leading-relaxed">
              A satisfação dos nossos clientes é a nossa maior conquista
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={20} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-base font-light leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-medium text-base">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-4">Como Funciona</h2>
            <p className="text-lg font-light text-muted-foreground leading-relaxed">
              Do conceito à instalação em 4 passos simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consulta Inicial",
                desc: "Reunião para entender as suas necessidades e espaço disponível",
              },
              { step: "02", title: "Projeto 3D", desc: "Criamos uma visualização 3D realista do seu futuro móvel" },
              { step: "03", title: "Produção", desc: "Fabricação artesanal com materiais premium selecionados" },
              { step: "04", title: "Instalação", desc: "Montagem profissional com acabamento impecável" },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="text-6xl font-serif font-light text-muted/30 mb-6">{item.step}</div>
                <h3 className="text-xl font-serif font-light mb-3">{item.title}</h3>
                <p className="text-base font-light text-muted-foreground leading-relaxed">{item.desc}</p>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-12 -right-4 text-muted/30" size={24} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/elegant-marble-texture-pattern.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Sparkles className="mx-auto mb-8" size={56} />
          <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-8 text-balance leading-[1.1]">
            Pronto Para Transformar
            <br />A Sua Casa de Banho?
          </h2>
          <p className="text-xl font-light max-w-3xl mx-auto mb-12 leading-relaxed text-primary-foreground/90">
            Agende uma consulta gratuita e receba um orçamento personalizado sem compromisso.
            <br />
            Visitamos o seu espaço e criamos a solução perfeita para si.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              variant="outline"
              className="bg-primary-foreground text-primary hover:bg-muted text-lg px-10 py-6"
              asChild
            >
              <Link href="/contacto">
                Contactar Agora
                <ArrowRight className="ml-2" size={24} />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-10 py-6" asChild>
              <Link href="/produtos">Ver Catálogo Completo</Link>
            </Button>
          </div>

          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-muted border-2 border-primary" />
              ))}
            </div>
            <p className="text-sm font-light">Junte-se a mais de 5000 clientes satisfeitos</p>
          </div>
        </div>
      </section>

      {/* Contact & Form Section with Google Maps */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-4">Peça o Seu Orçamento</h2>
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Preencha o formulário e receba um orçamento personalizado via WhatsApp
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Google Maps */}
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] lg:aspect-square bg-muted rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.7234567890123!2d-9.1393!3d38.7223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQzJzIwLjMiTiA5wrAwOCcyMS41Ilc!5e0!3m2!1spt-PT!2spt!4v1234567890123!5m2!1spt-PT!2spt"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização CarboStone"
                />
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-light mb-2">Morada</h3>
                  <p className="text-base font-light text-muted-foreground">
                    Rua da Indústria, 123
                    <br />
                    1234-567 Lisboa, Portugal
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-light mb-2">Horário</h3>
                  <p className="text-base font-light text-muted-foreground">
                    Segunda a Sexta: 9h00 - 18h00
                    <br />
                    Sábado: 9h00 - 13h00
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-light mb-2">Contacto</h3>
                  <p className="text-base font-light text-muted-foreground">
                    Tel: +351 123 456 789
                    <br />
                    Email: info@carbostone.pt
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Quote Form */}
            <div className="order-1 lg:order-2">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-6xl w-full">
            <img
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            <p className="text-white text-center text-2xl font-serif mt-4">{selectedImage.title}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
