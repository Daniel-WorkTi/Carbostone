import { NextResponse } from "next/server"

type DriveFile = {
  id: string
  name: string
  mimeType: string
  modifiedTime?: string
  thumbnailLink?: string
  webViewLink?: string
}

type GalleryItem = {
  id: string
  name: string
  kind: "photo" | "video"
  mimeType: string
  /** URL para imagem (uc?export=view) */
  src?: string
  /** URL para preview (Drive /preview) — útil para vídeo */
  previewUrl?: string
  webViewLink?: string
  modifiedTime?: string
}

const driveList = async (folderId: string, apiKey: string): Promise<DriveFile[]> => {
  const params = new URLSearchParams()
  params.set("q", `'${folderId}' in parents and trashed=false`)
  params.set("fields", "files(id,name,mimeType,modifiedTime,thumbnailLink,webViewLink)")
  params.set("pageSize", "200")
  params.set("orderBy", "modifiedTime desc")
  params.set("key", apiKey)

  const url = `https://www.googleapis.com/drive/v3/files?${params.toString()}`
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) return []
  const json = (await res.json()) as { files?: DriveFile[] }
  return Array.isArray(json.files) ? json.files : []
}

const driveViewSrc = (fileId: string) => `https://drive.google.com/uc?export=view&id=${fileId}`
const drivePreviewUrl = (fileId: string) => `https://drive.google.com/file/d/${fileId}/preview`

export async function GET() {
  const apiKey = process.env.GDRIVE_API_KEY || ""
  const photosFolderId = process.env.GDRIVE_FOLDER_PHOTOS || ""
  const videosFolderId = process.env.GDRIVE_FOLDER_VIDEOS || ""

  if (!apiKey || !photosFolderId || !videosFolderId) {
    return NextResponse.json(
      {
        photos: [] as GalleryItem[],
        videos: [] as GalleryItem[],
        configured: false,
        message:
          "Configuração em falta: defina GDRIVE_API_KEY, GDRIVE_FOLDER_PHOTOS e GDRIVE_FOLDER_VIDEOS (pastas públicas/partilhadas).",
      },
      { status: 200 },
    )
  }

  const [photoFiles, videoFiles] = await Promise.all([
    driveList(photosFolderId, apiKey),
    driveList(videosFolderId, apiKey),
  ])

  const photos: GalleryItem[] = photoFiles
    .filter((f) => f.mimeType.startsWith("image/"))
    .map((f) => ({
      id: f.id,
      name: f.name,
      kind: "photo",
      mimeType: f.mimeType,
      src: driveViewSrc(f.id),
      webViewLink: f.webViewLink,
      modifiedTime: f.modifiedTime,
    }))

  const videos: GalleryItem[] = videoFiles
    .filter((f) => f.mimeType.startsWith("video/"))
    .map((f) => ({
      id: f.id,
      name: f.name,
      kind: "video",
      mimeType: f.mimeType,
      previewUrl: drivePreviewUrl(f.id),
      webViewLink: f.webViewLink,
      modifiedTime: f.modifiedTime,
    }))

  return NextResponse.json({ photos, videos, configured: true }, { status: 200 })
}

