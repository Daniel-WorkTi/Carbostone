import { PUREN_LOGO_SRC } from "@/lib/puren-brand"
import { cn } from "@/lib/utils"

type PurenLogoProps = {
  /** hero: página PUREN; section: Sobre e blocos secundários */
  variant?: "hero" | "section"
  className?: string
}

export function PurenLogo({ variant = "section", className }: PurenLogoProps) {
  return (
    <img
      src={PUREN_LOGO_SRC}
      alt="PUREN — marca"
      width={1024}
      height={1024}
      className={cn(
        "h-auto w-full object-contain object-center",
        variant === "hero" &&
          "max-h-[min(52vh,520px)] max-w-3xl drop-shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl",
        variant === "section" &&
          "max-h-[240px] max-w-md drop-shadow-md sm:max-h-[300px] sm:max-w-lg md:max-h-[380px] md:max-w-xl lg:max-h-[420px] lg:max-w-2xl",
        className,
      )}
    />
  )
}
