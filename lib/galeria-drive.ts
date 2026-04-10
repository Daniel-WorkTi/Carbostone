/**
 * Lógica da galeria Google Drive (testável sem Next).
 * URLs: thumbnail costuma funcionar melhor em <img> do que uc?export=view.
 */

export type DriveFile = {
  id: string
  name: string
  mimeType: string
  modifiedTime?: string
  thumbnailLink?: string
  webViewLink?: string
}

export type GalleryPhotoItem = {
  id: string
  name: string
  kind: "photo"
  mimeType: string
  src: string
  srcFallback: string
  webViewLink?: string
  modifiedTime?: string
}

export type GalleryVideoItem = {
  id: string
  name: string
  kind: "video"
  mimeType: string
  previewUrl: string
  webViewLink?: string
  modifiedTime?: string
}

export function buildDriveListUrl(folderId: string, apiKey: string): string {
  const params = new URLSearchParams()
  params.set("q", `'${folderId}' in parents and trashed=false`)
  params.set("fields", "files(id,name,mimeType,modifiedTime,thumbnailLink,webViewLink)")
  params.set("pageSize", "200")
  params.set("orderBy", "modifiedTime desc")
  params.set("supportsAllDrives", "true")
  params.set("includeItemsFromAllDrives", "true")
  params.set("key", apiKey)
  return `https://www.googleapis.com/drive/v3/files?${params.toString()}`
}

/** Preferido para grelha: miniatura pública com largura máxima. */
export function photoThumbnailSrc(fileId: string, width = 1600): string {
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w${width}`
}

export function photoUcViewSrc(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}`
}

export function videoPreviewSrc(fileId: string): string {
  return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview`
}

export type DriveListResult = { files: DriveFile[]; error?: string }

export async function driveListFiles(
  folderId: string,
  apiKey: string,
  fetchFn: typeof fetch,
): Promise<DriveListResult> {
  if (!folderId.trim() || !apiKey.trim()) {
    return { files: [], error: "folderId ou apiKey em falta" }
  }

  const url = buildDriveListUrl(folderId, apiKey)
  let res: Response
  try {
    res = await fetchFn(url, { cache: "no-store" })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "fetch falhou"
    return { files: [], error: msg }
  }

  let json: unknown
  try {
    json = await res.json()
  } catch {
    return { files: [], error: "Resposta Drive inválida (JSON)" }
  }

  const body = json as { files?: DriveFile[]; error?: { message?: string; code?: number } }

  if (!res.ok) {
    const msg = body.error?.message || `Drive API HTTP ${res.status}`
    return { files: [], error: msg }
  }

  return { files: Array.isArray(body.files) ? body.files : [] }
}

export function mapToPhotos(files: DriveFile[]): GalleryPhotoItem[] {
  return files
    .filter((f) => f.mimeType.startsWith("image/"))
    .map((f) => ({
      id: f.id,
      name: f.name,
      kind: "photo" as const,
      mimeType: f.mimeType,
      src: photoThumbnailSrc(f.id),
      srcFallback: f.thumbnailLink || photoUcViewSrc(f.id),
      webViewLink: f.webViewLink,
      modifiedTime: f.modifiedTime,
    }))
}

export function mapToVideos(files: DriveFile[]): GalleryVideoItem[] {
  return files
    .filter((f) => f.mimeType.startsWith("video/"))
    .map((f) => ({
      id: f.id,
      name: f.name,
      kind: "video" as const,
      mimeType: f.mimeType,
      previewUrl: videoPreviewSrc(f.id),
      webViewLink: f.webViewLink,
      modifiedTime: f.modifiedTime,
    }))
}
