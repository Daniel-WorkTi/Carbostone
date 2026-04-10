"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle,
  Award,
  Users,
  Star,
  Ruler,
  Palette,
  Shield,
  Clock,
  Quote,
  MapPin,
  BadgeCheck,
} from "lucide-react"
import Link from "next/link"
import { QuoteForm } from "@/components/quote-form"
import { useState } from "react"
import { SiGoogle, SiTrustpilot } from "react-icons/si"

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

  /** Placeholders visuais — trocar nomes/imagens quando tiver o catálogo final. */
  const categories = [
    {
      name: "Lavatório de pousar",
      count: "Sob consulta",
      image: "/luxury-round-vessel-sink-marble-white.jpg",
    },
    {
      name: "Lavatório integrado",
      count: "Sob consulta",
      image: "/luxury-integrated-marble-bathroom-sink.jpg",
    },
    {
      name: "Bancada com lavatório",
      count: "Sob consulta",
      image: "/luxury-bathroom-countertop-marble-white.jpg",
    },
    {
      name: "Lavatório minimal",
      count: "Sob consulta",
      image: "/luxury-bathroom-countertop-modern-minimal.jpg",
    },
    {
      name: "Conjunto suspensa + lavatório",
      count: "Sob consulta",
      image: "/modern-suspended-bathroom-vanity-white-minimal.jpg",
    },
    {
      name: "Linha premium suspensa",
      count: "Sob consulta",
      image: "/modern-luxury-white-suspended-bathroom-vanity.jpg",
    },
    {
      name: "Projeto showroom",
      count: "Sob consulta",
      image: "/luxury-bathroom-showroom-elegant-display.jpg",
    },
    {
      name: "Ambiente completo",
      count: "Sob consulta",
      image: "/luxury-modern-bathroom-interior-architecture.jpg",
    },
    {
      name: "Acabamentos especiais",
      count: "Sob consulta",
      image: "/modern-bathroom-showroom-elegant-interior.jpg",
    },
  ]

  const featuredProducts = [
    {
      name: "Lavatório de Pousar Redondo",
      category: "Lavatórios",
      image: "/luxury-round-vessel-sink-marble-white.jpg",
      price: "Sob consulta",
    },
    {
      name: "Lavatório Integrado Mármore",
      category: "Lavatórios",
      image: "/luxury-integrated-marble-bathroom-sink.jpg",
      price: "Sob consulta",
    },
    {
      name: "Lavatório — linha PUREN",
      category: "Lavatórios",
      image: "/luxury-bathroom-countertop-marble-white.jpg",
      price: "Sob consulta",
    },
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      location: "Lisboa",
      rating: 5,
      date: "Jan 2025",
      source: "google" as const,
      text: "Qualidade excecional! Transformaram completamente a minha casa de banho. O acabamento é impecável e a equipa muito profissional.",
    },
    {
      name: "João Santos",
      location: "Porto",
      rating: 5,
      date: "Dez 2024",
      source: "google" as const,
      text: "Excelente relação qualidade-preço. Os materiais são de alta qualidade e o design ficou exatamente como eu queria.",
    },
    {
      name: "Ana Costa",
      location: "Braga",
      rating: 5,
      date: "Nov 2024",
      source: "trustpilot" as const,
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

      {/* Hero + Features */}
      <div className="relative overflow-x-hidden overflow-y-visible">
        <section className="relative flex h-screen min-h-[32rem] items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-muted">
            <img
              src="/images/hero-empresa.jpg"
              alt="CarboStone"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/72" />
          </div>

          <div className="relative z-10 container mx-auto px-4 pt-40">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-balance font-druke text-5xl font-light uppercase leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
                CarboStone
              </h1>
              <p className="mx-auto mb-10 max-w-2xl text-xl font-light leading-relaxed text-white/90 md:text-2xl">
                Lavatórios em compósito e acabamentos de elevada durabilidade. Peça já o seu projeto ou explore o
                catálogo.
              </p>
              <Button size="lg" className="px-8 py-6 text-lg" asChild>
                <Link href="/produtos">
                  Ver lavatórios
                  <ArrowRight className="ml-2" size={24} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid - Enhanced */}
        <section className="relative py-24 overflow-x-hidden overflow-y-visible bg-muted">
        {/* Fundo “profissional” (sólido + degradê bem sutil) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-muted" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
          <div className="absolute -top-24 right-10 h-56 w-56 rounded-full bg-red-600/8 blur-3xl" />

          {/* Pattern (line-art) com formas de móveis/lavatórios */}
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.10]"
            viewBox="0 0 1200 700"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <pattern id="carbostone-furniture" x="0" y="0" width="520" height="360" patternUnits="userSpaceOnUse">
                {/* Lavatório (line-art) — mais espaçado e mais “clean” */}
                <path
                  d="M126 98c0-10 8-18 18-18h188c10 0 18 8 18 18v52c0 26-21 47-47 47H173c-26 0-47-21-47-47V98Z"
                  stroke="rgba(220,38,38,0.55)"
                  strokeWidth="2"
                />
                <path
                  d="M236 122c0-8 6-14 14-14s14 6 14 14-6 14-14 14-14-6-14-14Z"
                  stroke="rgba(24,24,27,0.20)"
                  strokeWidth="2"
                />
                <path
                  d="M188 198h128c0 34-27 68-64 68s-64-34-64-68Z"
                  stroke="rgba(24,24,27,0.14)"
                  strokeWidth="2"
                />
              </pattern>

              {/* Vinheta sutil para integrar com o hero escuro */}
              <linearGradient id="pattern-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="rgba(0,0,0,0.10)" />
                <stop offset="0.35" stopColor="rgba(0,0,0,0.02)" />
                <stop offset="1" stopColor="rgba(0,0,0,0)" />
              </linearGradient>

              {/* “Recortes” de transparência para não ficar carregado */}
              <radialGradient id="pattern-holes" cx="0" cy="0" r="1">
                <stop offset="0" stopColor="rgba(0,0,0,0)" />
                <stop offset="0.55" stopColor="rgba(0,0,0,0)" />
                <stop offset="1" stopColor="rgba(0,0,0,0.12)" />
              </radialGradient>
            </defs>

            <rect x="0" y="0" width="1200" height="700" fill="url(#carbostone-furniture)" />
            <rect x="0" y="0" width="1200" height="700" fill="url(#pattern-fade)" />
            <g opacity="0.8">
              <circle cx="280" cy="140" r="140" fill="url(#pattern-holes)" />
              <circle cx="980" cy="520" r="220" fill="url(#pattern-holes)" />
            </g>
          </svg>
        </div>

        <div className="container relative z-10 mx-auto px-4">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-druke font-light tracking-tight mb-4 uppercase">
              Porque Escolher a CarboStone
            </h2>
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comprometidos com a excelência em cada detalhe
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white/80 p-8 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-2xl"
                >
                  <div className="relative mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted ring-1 ring-border/60 transition-all duration-300 group-hover:bg-red-600 group-hover:ring-red-600">
                    <Icon size={30} className="text-foreground/80 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <h3 className="relative text-xl font-druke font-light tracking-wide uppercase mb-3">{feature.title}</h3>
                  <p className="relative text-base font-light text-muted-foreground leading-relaxed">{feature.desc}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
      </div>

      {/* Categories Showcase */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-4">Lavatórios</h2>
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Foco na gama de lavatórios — mais modelos no catálogo e sob medida.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <div
                key={`lav-cat-${index}-${category.name}`}
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
                    <p className="text-base text-white/90">{category.count}</p>
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
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-4">Lavatórios em destaque</h2>
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Alguns exemplos da nossa gama — valores sob consulta.
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
                Ver catálogo de lavatórios
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
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <a
                  href="https://www.google.com/search?q=CarboStone+avalia%C3%A7%C3%B5es"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-light text-white/90 backdrop-blur hover:bg-white/15 transition-colors"
                >
                  <SiGoogle className="h-4 w-4" style={{ color: "#4285F4" }} />
                  <span className="font-druke uppercase tracking-widest">Google</span>
                  <span className="text-white/70">Reviews</span>
                  <span className="text-yellow-400">★★★★★</span>
                </a>
                <a
                  href="https://www.trustpilot.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-light text-white/90 backdrop-blur hover:bg-white/15 transition-colors"
                >
                  <SiTrustpilot className="h-4 w-4" style={{ color: "#00B67A" }} />
                  <span className="font-druke uppercase tracking-widest">Trustpilot</span>
                  <span className="text-yellow-400">★★★★★</span>
                </a>
              </div>

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
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-muted via-background to-muted">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,38,38,0.06),_transparent_55%)]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Avaliações reais</p>
            <h2 className="mb-4 text-4xl font-light tracking-tight md:text-5xl font-druke uppercase">
              O Que Dizem Os Nossos Clientes
            </h2>
            <p className="text-base font-light leading-relaxed text-muted-foreground">
              Experiências de quem confiou na CarboStone para a casa de banho.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {testimonials.map((testimonial, index) => {
              const initials = testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
              return (
                <Card
                  key={index}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-white/90 p-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500/25 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-border/50 bg-muted/40 px-6 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-sm font-semibold text-white shadow-inner">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{testimonial.name}</p>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {testimonial.location}
                          </span>
                          <span className="text-border">·</span>
                          <span>{testimonial.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 rounded-full border border-border/60 bg-background/80 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {testimonial.source === "google" ? (
                        <SiGoogle className="h-3.5 w-3.5" style={{ color: "#4285F4" }} />
                      ) : (
                        <SiTrustpilot className="h-3.5 w-3.5" style={{ color: "#00B67A" }} />
                      )}
                      {testimonial.source === "google" ? "Google" : "Trustpilot"}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verificado
                      </span>
                    </div>

                    <Quote className="mb-3 h-8 w-8 text-red-600/25" aria-hidden />
                    <blockquote className="flex-1 text-[15px] font-light leading-relaxed text-foreground/90">
                      {testimonial.text}
                    </blockquote>
                  </div>
                </Card>
              )
            })}
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
                <div className="mb-6 text-8xl font-druke font-light leading-none tracking-tight text-muted/30 md:text-[10rem] lg:text-[12rem] xl:text-[13rem]">
                  {item.step}
                </div>
                <h3 className="text-xl font-serif font-light mb-3">{item.title}</h3>
                <p className="text-base font-light text-muted-foreground leading-relaxed">{item.desc}</p>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-28 lg:top-32 -right-4 text-muted/30" size={24} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Form Section with Google Maps */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-4">
        Peça o Seu Orçamento
      </h2>
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
      </div>

      {/* Right side - Quote Form + Info */}
      <div className="order-1 lg:order-2">
        <QuoteForm />

        {/* Info abaixo do formulário */}
        <div className="mt-12 grid gap-8 md:grid-cols-3 text-center md:text-left">
          <div>
            <h3 className="text-xl font-serif font-light mb-2">Morada</h3>
            <p className="text-base font-light text-muted-foreground leading-relaxed">
              Rua da Indústria, 123
              <br />
              1234-567 Lisboa, Portugal
            </p>
          </div>

          <div>
            <h3 className="text-xl font-serif font-light mb-2">Horário</h3>
            <p className="text-base font-light text-muted-foreground leading-relaxed">
              Segunda a Sexta: 9h00 - 18h00
              <br />
              Sábado: 9h00 - 13h00
            </p>
          </div>

          <div>
            <h3 className="text-xl font-serif font-light mb-2">Contacto</h3>
            <p className="text-base font-light text-muted-foreground leading-relaxed">
              Tel: +351 123 456 789
              <br />
              Email: info@carbostone.pt
            </p>
          </div>
        </div>
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
