import { useCounter } from '@/hooks/useCounter'
import { cn } from '@/utils/cn'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  className?: string
}

export function AnimatedCounter({ value, suffix = '', className }: AnimatedCounterProps) {
  const { ref, value: current } = useCounter(value)

  return (
    <span ref={ref} className={cn('font-display tabular-nums', className)}>
      {current}
      {suffix}
    </span>
  )
}
