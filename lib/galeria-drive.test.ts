import { describe, expect, it, vi } from "vitest"
import {
  buildDriveListUrl,
  driveListFiles,
  mapToPhotos,
  mapToVideos,
  photoThumbnailSrc,
  photoUcViewSrc,
  videoPreviewSrc,
} from "./galeria-drive"

describe("buildDriveListUrl", () => {
  it("inclui folderId na query e a API key", () => {
    const url = buildDriveListUrl("abc123", "keyX")
    expect(url).toContain("https://www.googleapis.com/drive/v3/files?")
    expect(url).toMatch(/q=.*abc123/)
    expect(url).toContain("key=keyX")
  })
})

describe("photoThumbnailSrc / photoUcViewSrc / videoPreviewSrc", () => {
  it("codifica o id no thumbnail", () => {
    expect(photoThumbnailSrc("id/with+chars")).toContain(encodeURIComponent("id/with+chars"))
    expect(photoThumbnailSrc("abc", 800)).toContain("sz=w800")
  })

  it("gera URLs uc e preview", () => {
    expect(photoUcViewSrc("FILE1")).toContain("id=FILE1")
    expect(videoPreviewSrc("FILE1")).toContain("/file/d/FILE1/preview")
  })
})

describe("mapToPhotos / mapToVideos", () => {
  it("filtra só imagens e define src + fallback", () => {
    const photos = mapToPhotos([
      { id: "i1", name: "a.png", mimeType: "image/png" },
      { id: "v1", name: "a.mp4", mimeType: "video/mp4" },
      { id: "d1", name: "doc", mimeType: "application/pdf" },
    ])
    expect(photos).toHaveLength(1)
    expect(photos[0].id).toBe("i1")
    expect(photos[0].src).toContain("thumbnail")
    expect(photos[0].srcFallback).toContain("uc?export=view")
  })

  it("usa thumbnailLink como fallback quando existe", () => {
    const photos = mapToPhotos([
      {
        id: "i1",
        name: "a.png",
        mimeType: "image/png",
        thumbnailLink: "https://lh3.googleusercontent.com/x",
      },
    ])
    expect(photos[0].srcFallback).toBe("https://lh3.googleusercontent.com/x")
  })

  it("filtra só vídeos", () => {
    const videos = mapToVideos([
      { id: "i1", name: "a.png", mimeType: "image/png" },
      { id: "v1", name: "a.mp4", mimeType: "video/mp4" },
    ])
    expect(videos).toHaveLength(1)
    expect(videos[0].previewUrl).toContain("preview")
  })
})

describe("driveListFiles", () => {
  it("devolve ficheiros em HTTP 200", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        files: [{ id: "1", name: "x.png", mimeType: "image/png" }],
      }),
    })
    const r = await driveListFiles("folderZ", "k", fetchFn as unknown as typeof fetch)
    expect(r.files).toHaveLength(1)
    expect(r.error).toBeUndefined()
    expect(fetchFn).toHaveBeenCalledTimes(1)
  })

  it("devolve erro em HTTP 403", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({ error: { message: "API keys are not allowed" } }),
    })
    const r = await driveListFiles("f", "k", fetchFn as unknown as typeof fetch)
    expect(r.files).toHaveLength(0)
    expect(r.error).toBe("API keys are not allowed")
  })

  it("devolve erro se folderId vazio", async () => {
    const fetchFn = vi.fn()
    const r = await driveListFiles("  ", "k", fetchFn as unknown as typeof fetch)
    expect(r.error).toBeDefined()
    expect(fetchFn).not.toHaveBeenCalled()
  })
})
