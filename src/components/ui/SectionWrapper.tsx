import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Container } from './Container'
import { cn } from '@/utils/cn'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
  containerClassName?: string
  ariaLabel?: string
}

/** Consistent section chrome: id anchor, vertical rhythm, and a shared fade-in-on-scroll wrapper. */
export function SectionWrapper({ id, children, className, containerClassName, ariaLabel }: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('relative py-24 sm:py-28 lg:py-32 scroll-mt-24', className)}
    >
      <Container className={containerClassName}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </Container>
    </section>
  )
}
