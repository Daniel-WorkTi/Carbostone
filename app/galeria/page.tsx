"use client"

import { useEffect, useMemo, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Camera, Video } from "lucide-react"
import { Button } from "@/components/ui/button"

type GalleryItem = {
  id: string
  name: string
  kind: "photo" | "video"
  src?: string
  previewUrl?: string
}

type GalleryPayload = {
  photos: GalleryItem[]
  videos: GalleryItem[]
  configured: boolean
  message?: string
}

const placeholderSlots = Array.from({ length: 9 }, (_, i) => i)

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
        <div className="absolute inset-0 opacity-30">
          <img
            src="/luxury-bathroom-showroom-elegant-display.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-white/70 px-4 py-2 text-sm uppercase tracking-widest text-foreground backdrop-blur">
            <Camera className="h-4 w-4" />
            Obras
          </div>
          <h1 className="mt-6 text-4xl font-druke font-light uppercase tracking-tight text-foreground md:text-6xl">Galeria</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-light text-muted-foreground">
            Fotos e vídeos das nossas obras. As imagens abaixo são de exemplo — substitua-as pelos ficheiros reais da
            empresa quando estiverem disponíveis.
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

      {/* Feed (estilo Instagram) */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          {payload && !payload.configured && (
            <div className="mb-8 rounded-2xl border border-border bg-muted/30 px-5 py-4 text-sm font-light text-muted-foreground">
              {payload.message || "Drive não configurado."}
            </div>
          )}

          {tab === "photos" ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
              {(photos.length
                ? photos
                : placeholderSlots.map((i) => ({
                    id: String(i),
                    name: `Obra ${i + 1}`,
                    kind: "photo" as const,
                  }))
              ).map((item, idx) => (
                <div
                  key={`photo-${item.id}-${idx}`}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60"
                >
                  <img
                    src={item.src || "/luxury-integrated-marble-bathroom-sink.jpg"}
                    alt={item.name || `Obra ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="absolute bottom-3 left-3 right-3 text-xs font-light text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {item.name || `Obra ${idx + 1}`}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(videos.length
                ? videos
                : placeholderSlots.slice(0, 6).map((i) => ({
                    id: `v-${i}`,
                    name: `Vídeo ${i + 1}`,
                    kind: "video" as const,
                  }))
              ).map((item, idx) => (
                <div
                  key={`video-${item.id}-${idx}`}
                  className="group relative aspect-video overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60"
                >
                  {item.previewUrl ? (
                    <iframe
                      src={item.previewUrl}
                      className="h-full w-full"
                      allow="autoplay"
                      allowFullScreen
                      title={item.name || `Vídeo ${idx + 1}`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm font-light text-foreground">{item.name || `Vídeo ${idx + 1}`}</p>
                        <p className="mt-1 text-xs font-light text-muted-foreground">Preview a definir</p>
                      </div>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-[11px] font-light text-foreground backdrop-blur">
                    <Video className="h-3.5 w-3.5" />
                    Vídeo
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
