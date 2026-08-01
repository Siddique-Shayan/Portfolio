import type { ReactNode, PointerEvent } from 'react'
import { cn } from '@/utils/cn'

interface GlassCardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  as?: 'div' | 'article' | 'li'
}

/** Frosted-glass card with a soft cursor-tracked highlight — the base surface for most content cards. */
export function GlassCard({ children, className, glow = true, as = 'div' }: GlassCardProps) {
  const Tag = as as 'div'

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!glow) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  return (
    <Tag
      onPointerMove={onPointerMove}
      className={cn(
        'glass group relative overflow-hidden rounded-2xl transition-transform duration-300',
        glow &&
          'before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:content-[\'\'] before:[background:radial-gradient(180px_circle_at_var(--x,50%)_var(--y,50%),rgba(93,127,255,0.18),transparent_70%)] hover:before:opacity-100',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
