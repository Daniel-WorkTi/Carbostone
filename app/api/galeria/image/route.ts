import { type NextRequest, NextResponse } from "next/server"

/**
 * Proxy de imagens do Drive: o browser pede ao nosso servidor, que usa a API key
 * (alt=media). Evita bloqueios de <img> direto a thumbnail/uc?export=view.
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")
  const apiKey = process.env.GDRIVE_API_KEY
  if (!id?.trim() || !apiKey) {
    return new NextResponse(null, { status: 404 })
  }

  const url = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?alt=media&key=${encodeURIComponent(apiKey)}`
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) {
    return new NextResponse(null, { status: 404 })
  }

  let contentType = res.headers.get("content-type") || "application/octet-stream"
  if (contentType.includes("application/json") || contentType.startsWith("text/")) {
    return new NextResponse(null, { status: 404 })
  }
  if (contentType === "application/octet-stream") {
    contentType = "image/jpeg"
  }

  const buf = await res.arrayBuffer()
  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  })
}
