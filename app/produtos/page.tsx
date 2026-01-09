"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Grid3x3, LayoutGrid } from "lucide-react"
import Link from "next/link"
import { ProductModal } from "@/components/product-modal"

export default function ProdutosPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = [
    {
      id: "moveis-banho",
      name: "Móveis de Banho",
      description: "Móveis suspensos e de chão em compósito de alta qualidade",
      count: 6,
      images: [
        {
          src: `/img/img33.jpeg`,
          alt: `Móvel de Banho Suspenso Branco`,
          title: `Móvel Suspenso Premium Branco`,
          price: "Sob consulta",
          description:
            "Móvel de banho suspenso em compósito de alta qualidade com acabamento branco mate. Design minimalista e contemporâneo que proporciona elegância e funcionalidade ao seu espaço.",
          features: [
            "Material: Compósito de alta densidade",
            "Acabamento: Branco mate resistente a manchas",
            "Gavetas com sistema de fecho suave",
            "Totalmente resistente à humidade",
            "Instalação suspensa para fácil limpeza",
            "Dimensões personalizáveis",
          ],
          images: [
            {
              src: `/img/img31.jpeg`,
              alt: "Vista frontal",
            },
            {
              src: `/img/img29.jpeg`,
              alt: "Vista lateral",
            },
            {
              src: `/img/img36.jpeg`,
              alt: "Detalhe",
            },
            {
              src: `/img/img47.jpeg`,
              alt: "Instalado",
            },
            {
              src: `/img/img45.jpeg`,
              alt: "Gavetas abertas",
            },
          ],
        },
        {
          src: `/imgm/model1.jpeg`,
          alt: `Móvel de Banho Suspenso Preto`,
          title: `Móvel Suspenso Premium Preto`,
          price: "Sob consulta",
          description:
            "Móvel de banho suspenso em compósito com acabamento preto mate sofisticado. Combina estilo arrojado com durabilidade excepcional para criar um ambiente luxuoso.",
          features: [
            "Material: Compósito premium de alta resistência",
            "Acabamento: Preto mate soft-touch",
            "Sistema de gavetas com travão hidráulico",
            "100% impermeável e resistente a produtos químicos",
            "Design flutuante moderno",
            "Várias configurações de tamanho disponíveis",
          ],
          images: [
            {
              src: `/imgm/model1.jpeg`,
              alt: "Vista frontal",
            },
            {
              src: `/imgm/model2.jpeg`,
              alt: "Detalhe puxadores",
            },
            {
              src: `/imgm/model3.jpeg`,
              alt: "Em contexto",
            },
            {
              src: `/imgm/model4.jpeg`,
              alt: "Arrumação",
            },
          ],
        },
        {
          src: `/img/modelo1.jpeg`,
          alt: `Móvel de Banho Duplo`,
          title: `Móvel Suspenso Duplo`,
          price: "Sob consulta",
          description:
            "Móvel de banho suspenso duplo para casas de banho espaçosas. Oferece amplo espaço de arrumação e dois lavatórios integrados para máximo conforto.",
          features: [
            "Dois lavatórios integrados em compósito",
            "Amplo espaço de arrumação com múltiplas gavetas",
            "Estrutura reforçada para suporte extra",
            "Divisórias internas organizadoras",
            "Acabamento premium resistente",
            "Ideal para casas de banho principais",
          ],
          images: [
            {
              src: `/img/modelo1.jpeg`,
              alt: "Vista completa",
            },
            {
              src: `/img/modelo2.jpeg`,
              alt: "Detalhe lavatório",
            },
            {
              src: `/img/modelo3.jpeg`,
              alt: "Arrumação interior",
            },
          ],
        },
        {
          src: `/imgm/img1.jpeg`,
          alt: `Móvel de Banho Madeira`,
          title: `Móvel Suspenso Acabamento Madeira`,
          price: "Sob consulta",
          description:
            "Móvel de banho com acabamento em madeira natural que traz calor e elegância. Combina a beleza da madeira com a durabilidade do compósito.",
          features: [
            "Acabamento em madeira natural ou laminado",
            "Proteção extra contra humidade",
            "Design orgânico e acolhedor",
            "Gavetas espaçosas",
            "Combinável com diversos estilos",
            "Manutenção simples",
          ],
          images: [
            {
              src: `/imgm/img11.jpeg`,
              alt: "Vista frontal",
            },
            {
              src: `/imgm/img46.jpeg`,
              alt: "Detalhe textura",
            },
            {
              src: `/imgm/img49.jpeg`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/imgm/img21.jpeg`,
          alt: `Móvel de Banho Minimalista`,
          title: `Móvel Suspenso Minimalista`,
          price: "Sob consulta",
          description:
            "Design ultra-minimalista com linhas puras e sem puxadores visíveis. Sistema de abertura push-to-open para estética limpa e contemporânea.",
          features: [
            "Design sem puxadores (push-to-open)",
            "Linhas geométricas limpas",
            "Acabamento ultra-liso",
            "Integração perfeita com lavatório",
            "Estética minimalista escandinava",
            "Cores neutras disponíveis",
          ],
          images: [
            {
              src: `/imgm/img22.jpeg`,
              alt: "Linhas limpas",
            },
            {
              src: `/imgm/img23.jpeg`,
              alt: "Sem puxadores",
            },
            {
              src: `/imgm/img34.jpeg`,
              alt: "Casa de banho minimalista",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=modern luxury bathroom vanity unit compact`,
          alt: `Móvel de Banho Compacto`,
          title: `Móvel Suspenso Compacto`,
          price: "Sob consulta",
          description:
            "Solução perfeita para espaços reduzidos sem comprometer o estilo. Design inteligente que maximiza arrumação em dimensões compactas.",
          features: [
            "Ideal para casas de banho pequenas",
            "Arrumação otimizada",
            "Design proporcional e equilibrado",
            "Várias cores disponíveis",
            "Instalação rápida e simples",
            "Excelente relação qualidade-preço",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=modern luxury bathroom vanity unit compact small bathroom`,
              alt: "Em casa de banho pequena",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=modern luxury bathroom vanity unit compact storage solutions`,
              alt: "Soluções de arrumação",
            },
          ],
        },
      ],
    },
    {
      id: "espelhos",
      name: "Espelhos",
      description: "Espelhos com iluminação LED integrada e designs contemporâneos",
      count: 5,
      images: [
        {
          src: `/imgm/img5.jpeg`,
          alt: `Espelho LED Retangular`,
          title: `Espelho LED Premium Retangular`,
          price: "Sob consulta",
          description:
            "Espelho retangular com iluminação LED integrada e sistema anti-embaciamento. Proporciona iluminação perfeita para qualquer momento do dia.",
          features: [
            "LED integrado de alta eficiência",
            "Sistema anti-embaciamento",
            "Interruptor touch sensitivo",
            "Luz branca ajustável (3000K-6000K)",
            "Moldura elegante em alumínio",
            "Consumo energético reduzido",
          ],
          images: [
            {
              src: `/imgm/img5.jpeg`,
              alt: "Aceso",
            },
            {
              src: `/imgm/img6.jpeg`,
              alt: "Detalhe botão",
            },
            {
              src: `/imgm/img40.jpeg`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED lighting round`,
          alt: `Espelho LED Redondo`,
          title: `Espelho LED Premium Redondo`,
          price: "Sob consulta",
          description:
            "Espelho circular moderno com aro LED que cria uma iluminação envolvente e uniforme. Design suave que complementa qualquer decoração.",
          features: [
            "Formato circular elegante",
            "Iluminação LED periférica",
            "Diversos diâmetros disponíveis",
            "Acabamento premium",
            "Sistema de montagem oculto",
            "Certificação IP44",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED lighting round glowing`,
              alt: "Iluminado",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED lighting round different sizes`,
              alt: "Diversos tamanhos",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED backlit`,
          alt: `Espelho LED Retroiluminado`,
          title: `Espelho LED Retroiluminado`,
          price: "Sob consulta",
          description:
            "Espelho com retroiluminação LED que cria um efeito flutuante sofisticado. Iluminação indireta que adiciona profundidade e ambientação.",
          features: [
            "Retroiluminação LED indireta",
            "Efeito de profundidade",
            "Controlo de intensidade",
            "Design flutuante",
            "Múltiplas formas disponíveis",
            "Atmosfera relaxante",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED backlit floating effect`,
              alt: "Efeito flutuante",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED backlit ambient lighting`,
              alt: "Iluminação ambiente",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED backlit modern bathroom night`,
              alt: "Ambiente noturno",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED full length`,
          alt: `Espelho LED Grande`,
          title: `Espelho LED Corpo Inteiro`,
          price: "Sob consulta",
          description:
            "Espelho de corpo inteiro com iluminação LED lateral. Perfeito para vestir e preparação completa com visão total.",
          features: [
            "Altura completa",
            "Iluminação lateral uniforme",
            "Ideal para quartos e closets",
            "Fixação segura à parede",
            "Espelho de alta qualidade",
            "Design contemporâneo",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED full length person reflection`,
              alt: "Reflexo completo",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED full length in dressing room`,
              alt: "Em closet",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED magnifying`,
          alt: `Espelho LED com Ampliação`,
          title: `Espelho LED com Ampliação`,
          price: "Sob consulta",
          description:
            "Espelho com ampliação 5x ou 10x e iluminação LED dedicada. Essencial para maquilhagem e cuidados pessoais de precisão.",
          features: [
            "Ampliação 5x ou 10x",
            "Iluminação LED direcionada",
            "Braço articulado",
            "Dupla face (normal e ampliado)",
            "Montagem na parede",
            "Ideal para rotinas de beleza",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED magnifying extended arm`,
              alt: "Braço estendido",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom mirror LED magnifying close up detail`,
              alt: "Detalhe ampliação",
            },
          ],
        },
      ],
    },
    {
      id: "lavatorios",
      name: "Lavatórios",
      description: "Lavatórios de encastre em mármore, granito e compósito",
      count: 5,
      images: [
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin marble white`,
          alt: `Lavatório Integrado Mármore Branco`,
          title: `Lavatório Integrado Mármore`,
          price: "Sob consulta",
          description:
            "Lavatório integrado em mármore branco com acabamento elegante e resistente. Ideal para casas de banho de luxo.",
          features: [
            "Encastre perfeito",
            "Acabamento em mármore branco",
            "Corpo de lavatório de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração sofisticada",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin marble white front view`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin marble white side view`,
              alt: "Vista lateral",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin marble white detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin marble white installed`,
              alt: "Instalado",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin marble white basin view`,
              alt: "Vista do lavatório",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin black composite`,
          alt: `Lavatório Integrado Compósito Preto`,
          title: `Lavatório Integrado Compósito`,
          price: "Sob consulta",
          description:
            "Lavatório integrado em compósito preto com acabamento sofisticado e durável. Ideal para ambientes modernos e contemporâneos.",
          features: [
            "Encastre perfeito",
            "Acabamento em compósito preto",
            "Corpo de lavatório de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração moderna",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin black composite front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin black composite detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin black composite installed`,
              alt: "Instalado",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin black composite basin view`,
              alt: "Vista do lavatório",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin double`,
          alt: `Lavatório Integrado Duplo`,
          title: `Lavatório Integrado Duplo`,
          price: "Sob consulta",
          description:
            "Lavatório integrado duplo com design moderno e acabamento de alta qualidade. Ideal para casas de banho espaçosas e confortáveis.",
          features: [
            "Duplo lavatório integrado",
            "Acabamento em mármore ou granito",
            "Corpo de lavatório de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração sofisticada",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin double full view`,
              alt: "Vista completa",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin double detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin double installed`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin concrete`,
          alt: `Lavatório Integrado Betão`,
          title: `Lavatório Integrado Betão`,
          price: "Sob consulta",
          description:
            "Lavatório integrado em betão com acabamento resistente e durável. Ideal para ambientes modernos e contemporâneos.",
          features: [
            "Encastre perfeito",
            "Acabamento em betão",
            "Corpo de lavatório de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração moderna",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin concrete front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin concrete detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin concrete installed`,
              alt: "Instalado",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin concrete basin view`,
              alt: "Vista do lavatório",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin minimal rectangular`,
          alt: `Lavatório Integrado Retangular`,
          title: `Lavatório Integrado Retangular`,
          price: "Sob consulta",
          description:
            "Lavatório integrado retangular com design minimalista e acabamento de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Encastre perfeito",
            "Acabamento retangular",
            "Corpo de lavatório de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração sofisticada",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin minimal rectangular front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin minimal rectangular detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom integrated sink basin minimal rectangular installed`,
              alt: "Instalado",
            },
          ],
        },
      ],
    },
    {
      id: "lavatorios-pousar",
      name: "Lavatórios de Pousar",
      description: "Lavatórios de sobrepor em designs exclusivos e sofisticados",
      count: 6,
      images: [
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom round white marble`,
          alt: `Lavatório de Pousar Redondo Branco`,
          title: `Lavatório de Pousar Redondo`,
          price: "Sob consulta",
          description:
            "Lavatório de pousar redondo em mármore branco com design sofisticado e acabamento de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Formato redondo",
            "Acabamento em mármore branco",
            "Corpo de lavatório de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração sofisticada",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom round white marble front view`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom round white marble detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom round white marble installed`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom oval black`,
          alt: `Lavatório de Pousar Oval Preto`,
          title: `Lavatório de Pousar Oval`,
          price: "Sob consulta",
          description:
            "Lavatório de pousar oval em preto com design sofisticado e acabamento de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Formato oval",
            "Acabamento em preto",
            "Corpo de lavatório de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração sofisticada",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom oval black front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom oval black detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom oval black installed`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom square modern`,
          alt: `Lavatório de Pousar Quadrado`,
          title: `Lavatório de Pousar Quadrado`,
          price: "Sob consulta",
          description:
            "Lavatório de pousar quadrado com design moderno e acabamento de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Formato quadrado",
            "Acabamento moderno",
            "Corpo de lavatório de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração moderna",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom square modern front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom square modern detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom square modern installed`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom rectangular minimal`,
          alt: `Lavatório de Pousar Retangular`,
          title: `Lavatório de Pousar Retangular`,
          price: "Sob consulta",
          description:
            "Lavatório de pousar retangular com design minimalista e acabamento de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Formato retangular",
            "Acabamento minimalista",
            "Corpo de lavatório de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração sofisticada",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom rectangular minimal front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom rectangular minimal detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom rectangular minimal installed`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom organic shape`,
          alt: `Lavatório de Pousar Orgânico`,
          title: `Lavatório de Pousar Design Orgânico`,
          price: "Sob consulta",
          description:
            "Lavatório de pousar com design orgânico e acabamento de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Design orgânico",
            "Acabamento de alta qualidade",
            "Corpo de lavatório de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração sofisticada",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom organic shape front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom organic shape detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom organic shape installed`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom terrazzo`,
          alt: `Lavatório de Pousar Terrazzo`,
          title: `Lavatório de Pousar Terrazzo`,
          price: "Sob consulta",
          description:
            "Lavatório de pousar em terrazzo com design moderno e acabamento de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Formato terrazzo",
            "Acabamento moderno",
            "Corpo de lavatório de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração moderna",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom terrazzo front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom terrazzo detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury vessel sink bathroom terrazzo installed`,
              alt: "Instalado",
            },
          ],
        },
      ],
    },
    {
      id: "complementos",
      name: "Complementos",
      description: "Acessórios e acabamentos para completar a sua casa de banho",
      count: 4,
      images: [
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories towel rack black`,
          alt: `Toalheiro Premium`,
          title: `Toalheiro Premium Preto`,
          price: "Sob consulta",
          description:
            "Toalheiro premium em preto com design moderno e acabamento de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Toalheiro em preto",
            "Design moderno",
            "Acabamento de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração moderna",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories towel rack black front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories towel rack black detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories towel rack black installed`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories storage cabinet`,
          alt: `Armário de Arrumação`,
          title: `Armário de Arrumação Premium`,
          price: "Sob consulta",
          description:
            "Armário de arrumação premium com design moderno e acabamento de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Armário de arrumação em preto",
            "Design moderno",
            "Acabamento de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração moderna",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories storage cabinet front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories storage cabinet detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories storage cabinet installed`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories shelf floating`,
          alt: `Prateleira Flutuante`,
          title: `Prateleira Flutuante Premium`,
          price: "Sob consulta",
          description:
            "Prateleira flutuante premium com design moderno e acabamento de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Prateleira flutuante em preto",
            "Design moderno",
            "Acabamento de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração moderna",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories shelf floating front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories shelf floating detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories shelf floating installed`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories set modern`,
          alt: `Conjunto de Acessórios`,
          title: `Conjunto de Acessórios Premium`,
          price: "Sob consulta",
          description:
            "Conjunto de acessórios premium com design moderno e acabamento de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Conjunto de acessórios em preto",
            "Design moderno",
            "Acabamento de alta qualidade",
            "Resistente a água e manchas",
            "Compatível com diversos acabamentos",
            "Ideal para decoração moderna",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories set modern front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories set modern detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom accessories set modern installed`,
              alt: "Instalado",
            },
          ],
        },
      ],
    },
    {
      id: "murais-kloss",
      name: "Murais - KLOSS",
      description: "Revestimentos murais em compósito KLOSS de alta performance",
      count: 4,
      images: [
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS marble texture white`,
          alt: `Mural KLOSS Mármore Branco`,
          title: `Revestimento KLOSS Mármore Branco`,
          price: "Sob consulta",
          description:
            "Revestimento mural em compósito KLOSS com acabamento em mármore branco de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Acabamento em mármore branco",
            "Material compósito KLOSS",
            "Durabilidade excepcional",
            "Compatível com diversos acabamentos",
            "Ideal para decoração sofisticada",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS marble texture white front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS marble texture white detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS marble texture white installed`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS concrete texture`,
          alt: `Mural KLOSS Betão`,
          title: `Revestimento KLOSS Betão`,
          price: "Sob consulta",
          description:
            "Revestimento mural em compósito KLOSS com acabamento em betão de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Acabamento em betão",
            "Material compósito KLOSS",
            "Durabilidade excepcional",
            "Compatível com diversos acabamentos",
            "Ideal para decoração sofisticada",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS concrete texture front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS concrete texture detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS concrete texture installed`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS wood texture`,
          alt: `Mural KLOSS Madeira`,
          title: `Revestimento KLOSS Madeira`,
          price: "Sob consulta",
          description:
            "Revestimento mural em compósito KLOSS com acabamento em madeira de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Acabamento em madeira",
            "Material compósito KLOSS",
            "Durabilidade excepcional",
            "Compatível com diversos acabamentos",
            "Ideal para decoração sofisticada",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS wood texture front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS wood texture detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS wood texture installed`,
              alt: "Instalado",
            },
          ],
        },
        {
          src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS stone texture black`,
          alt: `Mural KLOSS Pedra Preta`,
          title: `Revestimento KLOSS Pedra Preta`,
          price: "Sob consulta",
          description:
            "Revestimento mural em compósito KLOSS com acabamento em pedra preta de alta qualidade. Ideal para casas de banho de luxo.",
          features: [
            "Acabamento em pedra preta",
            "Material compósito KLOSS",
            "Durabilidade excepcional",
            "Compatível com diversos acabamentos",
            "Ideal para decoração sofisticada",
          ],
          images: [
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS stone texture black front`,
              alt: "Vista frontal",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS stone texture black detail`,
              alt: "Detalhe",
            },
            {
              src: `/placeholder.svg?height=800&width=800&query=luxury bathroom wall panel composite KLOSS stone texture black installed`,
              alt: "Instalado",
            },
          ],
        },
      ],
    },
  ]

  const openProductModal = (product: any, categoryName: string) => {
    setSelectedProduct({
      ...product,
      category: categoryName,
    })
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/luxury-bathroom-showroom-elegant-display.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              <Grid3x3 className="mr-2" size={16} />
              Catálogo Principal
            </Badge>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-balance">
              Explore Nossa Coleção Premium
            </h1>
            <p className="text-xl font-light leading-relaxed max-w-2xl text-muted-foreground">
              Produtos principais selecionados por categoria. Móveis de alta qualidade em compósito com design
              sofisticado e durabilidade excepcional. Mais modelos disponíveis sob consulta.
            </p>
          </div>
        </div>
      </section>

          {/* Quick Navigation */}
      <section className="py-4 md:py-6 bg-background/95 backdrop-blur-sm sticky top-0 z-40 border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
            <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider hidden sm:inline">
              Categorias:
            </span>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                className="hover:bg-primary hover:text-primary-foreground font-medium transition-colors text-xs md:text-sm px-2 md:px-3"
                onClick={() => {
                  const element = document.getElementById(category.id)
                  if (element) {
                    const offset = 80
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                    window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
                  }
                }}
              >
                {category.name}
                <Badge variant="secondary" className="ml-1 md:ml-2 font-semibold text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories with Products */}
      {categories.map((category, categoryIndex) => (
        <section
          key={category.id}
          id={category.id}
          className={`py-24 ${categoryIndex % 2 === 0 ? "bg-background" : "bg-muted"}`}
        >
          <div className="container mx-auto px-4">
            {/* Category Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-6xl font-light text-muted-foreground/30">
                  {String(categoryIndex + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-2">{category.name}</h2>
                  <p className="text-lg font-light text-muted-foreground">{category.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-light text-muted-foreground">
                <LayoutGrid size={16} />
                <span>{category.count} Modelos Principais • Mais Opções Disponíveis</span>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.images.map((product, index) => (
                <Card
                  key={index}
                  className="group p-0 overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl cursor-pointer"
                  onClick={() => openProductModal(product, category.name)}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.src || "/placeholder.svg"}
                      alt={product.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" variant="secondary" className="w-full">
                        Ver Detalhes
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-light mb-1 line-clamp-1">{product.title}</h3>
                    <p className="text-xs text-muted-foreground font-light">{product.price}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Category CTA */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/contacto">
                  Solicitar Orçamento para {category.name}
                  <ChevronRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6">Não Encontrou o Que Procura?</h2>
          <p className="text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed text-muted-foreground">
            Criamos projetos personalizados à medida das suas necessidades. Entre em contacto connosco para uma solução
            exclusiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-muted" asChild>
              <Link href="/contacto">Contactar Agora</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/servicos">Ver Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} />
      )}

      <Footer />
    </div>
  )
}
