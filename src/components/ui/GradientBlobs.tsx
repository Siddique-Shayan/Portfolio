import { cn } from '@/utils/cn'

interface GradientBlobsProps {
  className?: string
  variant?: 'default' | 'subtle'
}

/** Decorative, purely-CSS animated gradient blobs used to add depth behind sections. */
export function GradientBlobs({ className, variant = 'default' }: GradientBlobsProps) {
  const opacity = variant === 'subtle' ? 'opacity-40' : 'opacity-70'
  return (
    <div className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)} aria-hidden="true">
      <div
        className={cn(
          'absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary-500/25 blur-3xl animate-blob',
          opacity,
        )}
      />
      <div
        className={cn(
          'absolute -right-24 top-40 h-96 w-96 rounded-full bg-accent-purple-500/25 blur-3xl animate-blob',
          opacity,
        )}
        style={{ animationDelay: '2s' }}
      />
      <div
        className={cn(
          'absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent-emerald-400/20 blur-3xl animate-blob',
          opacity,
        )}
        style={{ animationDelay: '4s' }}
      />
    </div>
  )
}
