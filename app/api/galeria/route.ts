import { NextResponse } from "next/server"
import {
  driveListFiles,
  mapToPhotos,
  mapToVideos,
  type GalleryPhotoItem,
  type GalleryVideoItem,
} from "@/lib/galeria-drive"

export type GaleriaApiPayload = {
  photos: GalleryPhotoItem[]
  videos: GalleryVideoItem[]
  configured: boolean
  message?: string
  diagnostics?: { photos?: string; videos?: string }
}

export async function GET() {
  const apiKey = process.env.GDRIVE_API_KEY || ""
  const photosFolderId = process.env.GDRIVE_FOLDER_PHOTOS || ""
  const videosFolderId = process.env.GDRIVE_FOLDER_VIDEOS || ""

  if (!apiKey || !photosFolderId || !videosFolderId) {
    const payload: GaleriaApiPayload = {
      photos: [],
      videos: [],
      configured: false,
      message:
        "Configuração em falta: defina GDRIVE_API_KEY, GDRIVE_FOLDER_PHOTOS e GDRIVE_FOLDER_VIDEOS no .env local e na Vercel (Settings → Environment Variables). As pastas no Drive devem estar com partilha: qualquer pessoa com o link (leitor).",
    }
    return NextResponse.json(payload, { status: 200 })
  }

  const [photoResult, videoResult] = await Promise.all([
    driveListFiles(photosFolderId, apiKey, fetch),
    driveListFiles(videosFolderId, apiKey, fetch),
  ])

  const photos = mapToPhotos(photoResult.files)
  const videos = mapToVideos(videoResult.files)

  const diagnostics: GaleriaApiPayload["diagnostics"] = {}
  if (photoResult.error) diagnostics.photos = photoResult.error
  if (videoResult.error) diagnostics.videos = videoResult.error
  const hasDiag = Object.keys(diagnostics).length > 0

  const mimeMismatchPhotos =
    !photoResult.error && photoResult.files.length > 0 && photos.length === 0

  let message: string | undefined
  if (photoResult.error || videoResult.error) {
    message =
      "O Drive devolveu erro ao listar ficheiros. Confirme: API Drive ativada no Google Cloud, chave válida (restrições de referrer podem bloquear a Vercel), pastas e ficheiros acessíveis com o link."
  } else if (mimeMismatchPhotos) {
    message =
      "A pasta de fotos tem ficheiros, mas nenhum foi reconhecido como imagem (MIME image/*). Envie JPG, PNG ou WebP como ficheiros normais."
  } else if (photos.length === 0 && photoResult.files.length === 0) {
    message = "Nenhum ficheiro na pasta de fotos (pasta vazia ou ID incorreto)."
  }

  const payload: GaleriaApiPayload = {
    photos,
    videos,
    configured: true,
    ...(hasDiag ? { diagnostics } : {}),
    ...(message ? { message } : {}),
  }

  return NextResponse.json(payload, { status: 200 })
}
