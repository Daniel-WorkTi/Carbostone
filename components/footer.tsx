import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-light tracking-wider">CarboStone</h3>
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              Compósitos premium para casa de banho. Qualidade, elegância e durabilidade.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-light tracking-wider uppercase">Links Rápidos</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm font-light hover:text-muted transition-colors">
                Início
              </Link>
              <Link href="/sobre" className="text-sm font-light hover:text-muted transition-colors">
                Sobre Nós
              </Link>
              <Link href="/servicos" className="text-sm font-light hover:text-muted transition-colors">
                Serviços
              </Link>
              <Link href="/contacto" className="text-sm font-light hover:text-muted transition-colors">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-light tracking-wider uppercase">Serviços</h4>
            <nav className="flex flex-col space-y-2">
              <p className="text-sm font-light">Móveis de Casa de Banho</p>
              <p className="text-sm font-light">Instalação Profissional</p>
              <p className="text-sm font-light">Projetos Personalizados</p>
              <p className="text-sm font-light">Consultoria de Design</p>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-light tracking-wider uppercase">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-1" />
                <p className="text-sm font-light">+351 123 456 789</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-1" />
                <p className="text-sm font-light">info@carbostone.pt</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1" />
                <p className="text-sm font-light">Lisboa, Portugal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted-foreground/20">
          <p className="text-center text-sm font-light text-muted-foreground">
            © 2026 CarboStone Compósitos, LDA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
