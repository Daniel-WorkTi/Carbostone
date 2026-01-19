import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD || ""
    if (!adminPassword) {
      return NextResponse.json({ error: "Senha não configurada." }, { status: 500 })
    }
    if (typeof password !== "string") {
      return NextResponse.json({ error: "Senha inválida." }, { status: 400 })
    }
    if (password === adminPassword) {
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ error: "Senha inválida." }, { status: 401 })
  } catch {
    return NextResponse.json({ error: "Erro ao validar senha." }, { status: 500 })
  }
}
