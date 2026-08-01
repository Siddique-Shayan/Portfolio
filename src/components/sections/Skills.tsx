import { motion } from 'framer-motion'
import { skills } from '@/data/portfolio.js'
import { getIcon } from '@/utils/iconMap'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { staggerContainer, fadeUp, viewportOnce } from '@/animations/variants'

export function Skills() {
  return (
    <SectionWrapper id="skills" ariaLabel="Skills" className="bg-[var(--bg-elevated)]/40">
      <SectionHeading
        eyebrow="Skills"
        title="Tools I reach for"
        description="Languages, frameworks, cloud infrastructure, and the AI stack I use to ship production software."
      />

      <div className="flex flex-col gap-12">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="mb-5 font-display text-lg font-semibold text-[var(--text-primary)]">{group.category}</h3>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.06)}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              {group.items.map((item) => {
                const Icon = getIcon(item.icon)
                return (
                  <motion.div
                    key={item.name}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 p-4 transition-colors hover:border-primary-400/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-glass)] text-lg text-primary-500 transition-transform duration-300 group-hover:scale-110">
                        {Icon ? <Icon /> : item.name.slice(0, 2)}
                      </span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{item.name}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border-subtle)]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={viewportOnce}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-purple-500"
                      />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
