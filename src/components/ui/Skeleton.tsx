import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
}

/** Shimmering placeholder used while lazy-loaded sections/images are still resolving. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-2xl bg-[linear-gradient(110deg,var(--bg-elevated)_8%,var(--border-subtle)_18%,var(--bg-elevated)_33%)] bg-[length:200%_100%]',
        className,
      )}
      aria-hidden="true"
    />
  )
}

export function SectionSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
      <Skeleton className="mx-auto mb-6 h-8 w-48" />
      <Skeleton className="mx-auto mb-14 h-4 w-72" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-56 w-full" />
        ))}
      </div>
    </div>
  )
}
