import { motion } from 'framer-motion'
import { achievements } from '@/data/portfolio.js'
import { getIcon } from '@/utils/iconMap'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants'

export function Achievements() {
  return (
    <SectionWrapper id="achievements" ariaLabel="Achievements">
      <SectionHeading eyebrow="Achievements" title="Impact in numbers" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {achievements.stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <GlassCard className="flex h-full flex-col items-center justify-center gap-1 p-6 text-center">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl"
              />
              <p className="text-xs text-[var(--text-secondary)]">{stat.label2 ?? stat.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        {achievements.badges.map((badge) => {
          const Icon = getIcon(badge.icon)
          return (
            <motion.div
              key={badge.label}
              variants={fadeUp}
              className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--text-primary)]"
            >
              {Icon && <Icon className="text-primary-500" />}
              {badge.label}
            </motion.div>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
