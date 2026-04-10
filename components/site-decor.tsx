"use client"

export function SiteDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Soft color washes (brand red + neutral) */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-red-600/10 blur-3xl" />
      <div className="absolute top-32 -right-56 h-[680px] w-[680px] rounded-full bg-zinc-950/5 blur-3xl" />
      <div className="absolute -bottom-56 left-1/3 h-[720px] w-[720px] rounded-full bg-red-600/8 blur-3xl" />

      {/* Subtle line-art furniture outlines */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1400 900" fill="none">
        {/* Sink outline (top-left) */}
        <path
          d="M160 110c0-12 10-22 22-22h220c12 0 22 10 22 22v66c0 32-26 58-58 58H218c-32 0-58-26-58-58v-66Z"
          stroke="rgba(220,38,38,0.55)"
          strokeWidth="2"
        />
        <path
          d="M284 142c0-10 8-18 18-18s18 8 18 18-8 18-18 18-18-8-18-18Z"
          stroke="rgba(24,24,27,0.22)"
          strokeWidth="2"
        />

        {/* Shower tray outline (bottom-right) */}
        <rect
          x="980"
          y="640"
          width="300"
          height="88"
          rx="22"
          stroke="rgba(220,38,38,0.35)"
          strokeWidth="2"
        />
        <path
          d="M1012 684h236"
          stroke="rgba(24,24,27,0.16)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 12"
        />

        {/* Cabinet/vanity outline (center-right) */}
        <rect
          x="1090"
          y="190"
          width="140"
          height="240"
          rx="26"
          stroke="rgba(24,24,27,0.16)"
          strokeWidth="2"
        />
        <path d="M1160 228v164" stroke="rgba(220,38,38,0.22)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* Vignette to keep edges clean */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.03]" />
    </div>
  )
}

