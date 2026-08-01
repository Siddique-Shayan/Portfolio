import { motion } from 'framer-motion'
import { FiAward, FiBookOpen } from 'react-icons/fi'
import { education, certifications } from '@/data/portfolio.js'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants'

function EmptyState({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--border-subtle)] p-10 text-center text-[var(--text-muted)]"
    >
      <span className="text-2xl text-[var(--text-secondary)]">{icon}</span>
      <p className="text-sm">{label}</p>
    </motion.div>
  )
}

export function EducationCertifications() {
  return (
    <SectionWrapper id="education" ariaLabel="Education and certifications">
      <SectionHeading eyebrow="Education & Certifications" title="Foundations & credentials" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-5 font-display text-lg font-semibold text-[var(--text-primary)]">Education</h3>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer(0.1)} className="flex flex-col gap-4">
            {education.length > 0 ? (
              education.map((item) => (
                <GlassCard key={item.institution} className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{item.duration}</p>
                  <h4 className="font-display text-base font-semibold text-[var(--text-primary)]">{item.degree}</h4>
                  <p className="text-sm text-primary-500">{item.institution}</p>
                </GlassCard>
              ))
            ) : (
              <EmptyState icon={<FiBookOpen />} label="Education details will be added here soon." />
            )}
          </motion.div>
        </div>

        <div>
          <h3 className="mb-5 font-display text-lg font-semibold text-[var(--text-primary)]">Certifications</h3>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer(0.1)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {certifications.length > 0 ? (
              certifications.map((cert) => (
                <GlassCard key={cert.name} className="p-5">
                  <h4 className="font-display text-base font-semibold text-[var(--text-primary)]">{cert.name}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{cert.issuer}</p>
                </GlassCard>
              ))
            ) : (
              <div className="sm:col-span-2">
                <EmptyState icon={<FiAward />} label="Certifications will be added here soon." />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
