"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle } from "lucide-react"

export function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
  })

  const services = [
    "Móveis de Banho",
    "Espelhos",
    "Lavatórios",
    "Lavatórios de Pousar",
    "Complementos",
    "Murais - KLOSS",
    "Projeto Completo",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create WhatsApp message
    const message = `Olá! Gostaria de solicitar um orçamento:
    
Nome: ${formData.name}
Telefone: ${formData.phone}
Serviço: ${formData.service || "Não especificado"}`

    // WhatsApp link (replace with your actual WhatsApp number)
    const whatsappNumber = "351912345678" // Replace with your number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, "_blank")
  }

  return (
    <Card className="p-8 bg-white/95 backdrop-blur-md shadow-2xl border-0">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-serif font-light tracking-tight mb-2">Peça Seu Orçamento</h3>
        <p className="text-sm text-muted-foreground font-light">Resposta rápida via WhatsApp</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Nome Completo
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Seu nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Telefone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+351 912 345 678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service" className="text-sm font-medium">
            Serviço Pretendido
          </Label>
          <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Selecione o serviço" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full h-12 bg-[#25D366] hover:bg-[#20BA5A] text-white text-base" size="lg">
          <MessageCircle className="mr-2" size={20} />
          Enviar para WhatsApp
        </Button>

        <p className="text-xs text-center text-muted-foreground font-light">
          Ao clicar, você será direcionado para o WhatsApp
        </p>
      </form>
    </Card>
  )
}
