import { motion } from 'framer-motion'
import { FiCompass, FiTarget } from 'react-icons/fi'
import { profile, experience } from '@/data/portfolio.js'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { fadeUp, slideInLeft, slideInRight, staggerContainer, viewportOnce } from '@/animations/variants'

export function About() {
  return (
    <SectionWrapper id="about" ariaLabel="About me">
      <SectionHeading eyebrow="About Me" title="The engineer behind the code" description={profile.bio} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideInLeft}
          className="flex flex-col gap-6"
        >
          <GlassCard className="p-6">
            <div className="mb-3 flex items-center gap-2 text-primary-500">
              <FiTarget />
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">Goals</h3>
            </div>
            <p className="text-[var(--text-secondary)]">{profile.goals}</p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="mb-3 flex items-center gap-2 text-accent-purple-500">
              <FiCompass />
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">Currently Learning</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.currentlyLearning.map((item) => (
                <Badge key={item} tone="primary">
                  {item}
                </Badge>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.15)}
          className="relative flex flex-col gap-8 pl-6"
        >
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-primary-400 via-accent-purple-400 to-transparent" aria-hidden="true" />
          {experience.map((item) => (
            <motion.div key={`${item.company}-${item.role}`} variants={fadeUp} className="relative">
              <span className="absolute -left-6 top-1.5 h-3 w-3 rounded-full border-2 border-primary-500 bg-[var(--bg-base)]" aria-hidden="true" />
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                {item.duration || 'Timeline TBD'}
              </p>
              <h4 className="font-display text-base font-semibold text-[var(--text-primary)]">
                {item.role} · {item.company}
              </h4>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.description}</p>
            </motion.div>
          ))}
          <motion.div variants={slideInRight} className="relative">
            <span className="absolute -left-6 top-1.5 h-3 w-3 rounded-full border-2 border-accent-emerald-400 bg-[var(--bg-base)]" aria-hidden="true" />
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">Now</p>
            <h4 className="font-display text-base font-semibold text-[var(--text-primary)]">
              Building & learning, one production feature at a time
            </h4>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
