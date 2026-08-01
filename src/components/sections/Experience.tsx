import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { FiBriefcase } from 'react-icons/fi'
import { experience } from '@/data/portfolio.js'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 80%', 'end 60%'] })
  const lineHeight = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <SectionWrapper id="experience" ariaLabel="Professional experience" className="bg-[var(--bg-elevated)]/40">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        description="Backend, full-stack, and cloud engineering roles — reverse-chronological."
      />

      <div ref={trackRef} className="relative mx-auto max-w-3xl">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[var(--border-subtle)] sm:left-1/2" aria-hidden="true" />
        <motion.div
          style={{ scaleY: lineHeight }}
          className="absolute left-[19px] top-0 w-px origin-top bg-gradient-to-b from-primary-500 via-accent-purple-500 to-accent-cyan-400 sm:left-1/2"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-10">
          {experience.map((item, index) => {
            const alignRight = index % 2 === 1
            return (
              <motion.div
                key={`${item.company}-${item.role}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'relative pl-12 sm:w-1/2 sm:pl-0',
                  alignRight ? 'sm:ml-auto sm:pl-10' : 'sm:pr-10 sm:text-right',
                )}
              >
                <span
                  className={cn(
                    'absolute left-[13px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-[var(--bg-base)] text-primary-500 sm:left-auto',
                    alignRight ? 'sm:-left-3' : 'sm:-right-3',
                    item.current ? 'border-emerald-400' : 'border-primary-400',
                  )}
                >
                  <FiBriefcase size={12} />
                </span>

                <GlassCard className="p-5 text-left">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {item.current && <Badge tone="success">Current</Badge>}
                    {item.duration && <Badge>{item.duration}</Badge>}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{item.role}</h3>
                  <p className="text-sm font-medium text-primary-500">
                    {item.company}
                    {item.project && ` · ${item.project}`}
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.description}</p>

                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                    {item.responsibilities.map((resp) => (
                      <li key={resp} className="text-xs text-[var(--text-muted)]">
                        • {resp}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <Badge key={tech} tone="primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
