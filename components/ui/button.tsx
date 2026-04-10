import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        /** Marca / destaque principal (CarboStone) */
        default:
          'bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-600/35 dark:bg-red-600 dark:hover:bg-red-700',
        /** Eliminar, sair, ações irreversíveis */
        destructive:
          'bg-red-700 text-white shadow-sm hover:bg-red-800 focus-visible:ring-red-600/45 dark:bg-red-700 dark:hover:bg-red-800',
        /** Submeter, guardar, entrar */
        cta:
          'bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus-visible:ring-blue-500/45 dark:bg-blue-600 dark:hover:bg-blue-700',
        /** Criar, adicionar, confirmações positivas */
        success:
          'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 focus-visible:ring-emerald-500/45 dark:bg-emerald-600 dark:hover:bg-emerald-700',
        /** Avisos / atenção */
        warning:
          'bg-amber-500 text-amber-950 shadow-sm hover:bg-amber-600 focus-visible:ring-amber-500/45 dark:bg-amber-500 dark:hover:bg-amber-600',
        outline:
          'border-2 border-black bg-transparent text-foreground shadow-none hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black',
        /** Secundário neutro (cancelar, fechar) */
        outlineMuted:
          'border-2 border-slate-300 bg-transparent text-slate-800 shadow-none hover:bg-slate-100 hover:border-slate-400 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800',
        /** Editar, ver detalhes */
        outlineInfo:
          'border-2 border-blue-600 bg-transparent text-blue-700 shadow-none hover:bg-blue-50 dark:border-blue-500 dark:text-blue-300 dark:hover:bg-blue-950/50',
        outlineSuccess:
          'border-2 border-emerald-600 bg-transparent text-emerald-800 shadow-none hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-950/40',
        outlineWarning:
          'border-2 border-amber-500 bg-transparent text-amber-900 shadow-none hover:bg-amber-50 dark:border-amber-500 dark:text-amber-200 dark:hover:bg-amber-950/40',
        secondary:
          'bg-black text-white shadow-sm hover:bg-black/85 focus-visible:ring-black/30 dark:bg-black dark:hover:bg-black/85',
        ghost:
          'hover:bg-black/10 hover:text-foreground dark:hover:bg-white/10',
        link: 'text-red-600 underline-offset-4 hover:underline dark:text-red-500',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
