import { redirect } from "next/navigation"

/** Antiga rota «Serviços» — passa a ser a linha PUREN. */
export default function ServicosPage() {
  redirect("/puren")
}
