"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    alert("Obrigado! Entraremos em contacto em breve.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      details: ["+351 123 456 789", "+351 987 654 321"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@carbostone.pt", "vendas@carbostone.pt"],
    },
    {
      icon: MapPin,
      title: "Morada",
      details: ["Rua Principal, 123", "1000-000 Lisboa, Portugal"],
    },
    {
      icon: Clock,
      title: "Horário",
      details: ["Seg-Sex: 9h - 18h", "Sáb: 9h - 13h"],
    },
  ]

  return (
    <div className="min-h-screen bg-black pt-40 text-zinc-100">
      <Navigation />

      {/* Hero */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">Entre em Contacto</h1>
          <p className="text-lg font-light max-w-3xl mx-auto leading-relaxed text-zinc-400">
            Estamos prontos para transformar a sua casa de banho. Fale connosco hoje mesmo
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-light tracking-tight mb-6">Envie-nos uma Mensagem</h2>
              <p className="text-sm font-light text-zinc-400 mb-8 leading-relaxed">
                Preencha o formulário e entraremos em contacto em breve para discutir o seu projeto.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-light mb-2">
                    Nome Completo *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-white/20 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-red-600/60"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-light mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-white/20 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-red-600/60"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-light mb-2">
                    Telefone *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-white/20 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-red-600/60"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-light mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none border-white/20 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-red-600/60"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-red-600 text-white hover:bg-red-700">
                  Enviar Mensagem
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-light tracking-tight mb-6">Informações de Contacto</h2>
              <p className="text-sm font-light text-zinc-400 mb-8 leading-relaxed">
                Pode também contactar-nos diretamente através dos seguintes meios.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Card key={index} className="border-white/10 bg-zinc-950 p-6 text-zinc-100 shadow-none">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-red-600/40 bg-black text-zinc-100">
                          <Icon size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-light tracking-wide mb-2">{item.title}</h3>
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-sm font-light text-zinc-400">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>

             
            </div>
          </div>
        </div>
      </section>

      {/* Map/CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-light tracking-tight mb-6">Visite o Nosso Showroom</h2>
          <p className="text-lg font-light max-w-2xl mx-auto leading-relaxed text-zinc-400">
            Veja pessoalmente a qualidade dos nossos produtos e conheça a nossa equipa
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
