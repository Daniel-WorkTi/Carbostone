import type React from "react"
import type { Metadata } from "next"
import { Fjalla_One, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SiteDecor } from "@/components/site-decor"
import "./globals.css"

const titleFont = Fjalla_One({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CarboStone - Móveis de Casa de Banho Premium",
  description:
    "CarboStone (Carbostone, Lda) — fundada em 2004, sediada em Porto de Mós. Fabricamos lavatórios, bases de chuveiro e banheiras em compósito, com personalização, resistência e qualidade premium.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className={`${inter.variable} ${titleFont.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <SiteDecor />
        <div className="relative z-10">{children}</div>
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
