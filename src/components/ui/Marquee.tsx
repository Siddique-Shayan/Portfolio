import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface MarqueeProps {
  children: ReactNode
  reverse?: boolean
  className?: string
  pauseOnHover?: boolean
}

/** Infinite-scrolling row built from two duplicated tracks — pure CSS animation, no JS per-frame cost. */
export function Marquee({ children, reverse = false, className, pauseOnHover = true }: MarqueeProps) {
  return (
    <div className={cn('group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]', className)}>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={cn(
            'flex shrink-0 items-center gap-12 pr-12',
            reverse ? 'animate-marquee-reverse' : 'animate-marquee',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
