import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const adminPassword = (process.env.ADMIN_PASSWORD ?? "").trim()
    if (!adminPassword) {
      return NextResponse.json(
        {
          error:
            "Senha não configurada no servidor. Defina ADMIN_PASSWORD no .env ou .env.local (local) ou nas variáveis da Vercel e reinicie / faça redeploy.",
        },
        { status: 500 },
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Pedido inválido." }, { status: 400 })
    }

    const attempt =
      typeof body === "object" &&
      body !== null &&
      "password" in body &&
      typeof (body as { password: unknown }).password === "string"
        ? (body as { password: string }).password.trim()
        : ""

    if (!attempt) {
      return NextResponse.json({ error: "Digite a senha." }, { status: 400 })
    }

    if (attempt === adminPassword) {
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 })
  } catch {
    return NextResponse.json({ error: "Erro ao validar senha." }, { status: 500 })
  }
}
