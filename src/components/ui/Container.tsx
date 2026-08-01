import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
}

export function Container({ children, className, as = 'div' }: ContainerProps) {
  const Tag = as
  return <Tag className={cn('mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12', className)}>{children}</Tag>
}
