import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Tone = 'neutral' | 'primary' | 'success' | 'warning'

interface BadgeProps {
  children: ReactNode
  tone?: Tone
  icon?: ReactNode
  className?: string
}

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-[var(--bg-glass)] text-[var(--text-secondary)] border-[var(--border-subtle)]',
  primary: 'bg-primary-500/10 text-primary-500 border-primary-500/30 dark:text-primary-300',
  success: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400',
}

export function Badge({ children, tone = 'neutral', icon, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        toneClasses[tone],
        className,
      )}
    >
      {icon && <span className="text-[0.9em]" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  )
}
