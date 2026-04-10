"use client"

import { useEffect, useMemo, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Camera, Video } from "lucide-react"
import { Button } from "@/components/ui/button"

type GalleryPhoto = {
  id: string
  name: string
  kind: "photo"
  src?: string
  srcFallback?: string
}

type GalleryVideo = {
  id: string
  name: string
  kind: "video"
  previewUrl?: string
}

type GalleryPayload = {
  photos: GalleryPhoto[]
  videos: GalleryVideo[]
  configured: boolean
  message?: string
  diagnostics?: { photos?: string; videos?: string }
}

export default function GaleriaPage() {
  const [payload, setPayload] = useState<GalleryPayload | null>(null)
  const [tab, setTab] = useState<"photos" | "videos">("photos")

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/galeria", { cache: "no-store" })
        const json = (await res.json()) as GalleryPayload
        setPayload(json)
      } catch {
        setPayload({ photos: [], videos: [], configured: false, message: "Falha ao carregar a galeria." })
      }
    }
    load()
  }, [])

  const photos = useMemo(() => payload?.photos ?? [], [payload])
  const videos = useMemo(() => payload?.videos ?? [], [payload])

  return (
    <div className="min-h-screen bg-background pt-40 text-foreground">
      <Navigation />

      <section className="relative overflow-hidden bg-background py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background/80 to-background" aria-hidden />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-white/70 px-4 py-2 text-sm uppercase tracking-widest text-foreground backdrop-blur">
            <Camera className="h-4 w-4" />
            Obras
          </div>
          <h1 className="mt-6 text-4xl font-druke font-light uppercase tracking-tight text-foreground md:text-6xl">Galeria</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-light text-muted-foreground">
            Fotos e vídeos das nossas obras, carregadas a partir do Google Drive.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              type="button"
              variant={tab === "photos" ? "secondary" : "outline"}
              onClick={() => setTab("photos")}
            >
              Fotos
            </Button>
            <Button
              type="button"
              variant={tab === "videos" ? "secondary" : "outline"}
              onClick={() => setTab("videos")}
            >
              Vídeos
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          {payload === null && (
            <p className="mb-8 text-center text-sm font-light text-muted-foreground">A carregar galeria…</p>
          )}

          {payload && !payload.configured && (
            <div className="mb-8 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-5 py-4 text-sm font-light text-foreground">
              <p className="font-medium">Drive não configurado no servidor</p>
              <p className="mt-2 text-muted-foreground">
                {payload.message || "Defina as variáveis de ambiente."} Em produção, adicione-as no painel da Vercel
                para Preview e Production.
              </p>
            </div>
          )}

          {payload?.configured && payload.message && (
            <div className="mb-8 rounded-2xl border border-border bg-muted/30 px-5 py-4 text-sm font-light text-muted-foreground">
              <p>{payload.message}</p>
              {payload.diagnostics?.photos && (
                <p className="mt-2 font-mono text-xs text-foreground/80">Fotos (API): {payload.diagnostics.photos}</p>
              )}
              {payload.diagnostics?.videos && (
                <p className="mt-2 font-mono text-xs text-foreground/80">Vídeos (API): {payload.diagnostics.videos}</p>
              )}
            </div>
          )}

          {tab === "photos" &&
            (photos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
                {photos.map((item, idx) => {
                  if (!item.src) return null
                  return (
                    <div
                      key={`photo-${item.id}-${idx}`}
                      className="group relative aspect-square overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60"
                    >
                      <img
                        src={item.src}
                        alt={item.name || `Foto ${idx + 1}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        onError={(e) => {
                          const el = e.currentTarget
                          const fb = item.srcFallback
                          if (fb && el.src !== fb) el.src = fb
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <p className="absolute bottom-3 left-3 right-3 text-xs font-light text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {item.name || `Foto ${idx + 1}`}
                      </p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="py-12 text-center text-sm font-light text-muted-foreground">
                Nenhuma foto do Drive para mostrar. Adicione imagens à pasta configurada em{" "}
                <span className="font-mono text-xs">GDRIVE_FOLDER_PHOTOS</span>.
              </p>
            ))}

          {tab === "videos" &&
            (videos.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((item, idx) => {
                  if (!item.previewUrl) return null
                  return (
                    <div
                      key={`video-${item.id}-${idx}`}
                      className="group relative aspect-video overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60"
                    >
                      <iframe
                        src={item.previewUrl}
                        className="h-full w-full"
                        allow="autoplay"
                        allowFullScreen
                        title={item.name || `Vídeo ${idx + 1}`}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-[11px] font-light text-foreground backdrop-blur">
                        <Video className="h-3.5 w-3.5" />
                        Vídeo
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="py-12 text-center text-sm font-light text-muted-foreground">
                Nenhum vídeo do Drive para mostrar. Adicione vídeos à pasta configurada em{" "}
                <span className="font-mono text-xs">GDRIVE_FOLDER_VIDEOS</span>.
              </p>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
