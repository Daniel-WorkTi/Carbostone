"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CatalogAdminPanel } from "@/components/catalog-admin-panel"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"

export default function CatalogoAdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthed, setIsAuthed] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const authKey = "adminAuth"

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(authKey)
    if (stored === "1") {
      setIsAuthed(true)
    }
  }, [])

  const handleLogin = async () => {
    if (!password.trim()) {
      setError("Digite a senha.")
      return
    }
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      })
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!response.ok || !data.ok) {
        setError(data.error || (response.status === 401 ? "Senha incorreta." : "Não foi possível entrar."))
        return
      }
      window.localStorage.setItem(authKey, "1")
      setIsAuthed(true)
      setPassword("")
    } catch {
      setError("Erro de rede ou servidor. Confirme que está no URL certo e que o deploy tem ADMIN_PASSWORD.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(authKey)
    setIsAuthed(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16 md:pt-20">
        {isAuthed ? (
          <>
            <div className="bg-black text-white">
              <div className="container mx-auto px-4 bg-black">
                <div className="flex items-center justify-between py-4">
                  <h1 className="text-lg font-light">Dashboard Administrativo</h1>
                  <Button variant="destructive" className="shadow-md" onClick={handleLogout}>
                    Sair
                  </Button>
                </div>
              </div>
            </div>
            <div className="container mx-auto px-4">
              <CatalogAdminPanel />
            </div>
          </>
        ) : (
          <div className="min-h-[80vh] bg-[#0b0b0b] text-white flex items-center">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-md">
                <div className="relative rounded-2xl border border-white/10 bg-white text-black shadow-xl">
                  <div
                    className="absolute inset-0 -z-10 rounded-2xl opacity-80"
                    style={{
                      background: "linear-gradient(140deg, rgba(255,45,45,0.35), rgba(0,0,0,0))",
                      clipPath: "polygon(0 0, 100% 0, 100% 78%, 84% 100%, 0 100%)",
                    }}
                  />
                  <div className="border-b border-black/10 p-6">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-black text-white flex items-center justify-center">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          Área Administrativa
                        </p>
                        <h1 className="mt-1 text-2xl font-light">Login do Painel</h1>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Entre com a sua senha para gerir o catálogo.
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-2">
                      <Label htmlFor="admin-password">Senha</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Digite a senha"
                        className="bg-white shadow-[inset_0_1px_6px_rgba(0,0,0,0.2)]"
                      />
                    </div>
                    {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
                    <div className="mt-6 flex items-center justify-end">
                      <Button variant="cta" onClick={handleLogin} disabled={isLoading} size="lg">
                        {isLoading ? "A entrar…" : "Entrar"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
