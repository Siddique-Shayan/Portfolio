import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { fadeUp } from '@/animations/variants'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      className={cn('mb-14 flex flex-col gap-4', align === 'center' ? 'items-center text-center' : 'items-start text-left', className)}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--text-secondary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={cn('max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
