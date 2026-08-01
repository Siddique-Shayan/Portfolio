import { motion } from 'framer-motion'
import { FiDownload, FiExternalLink, FiFileText } from 'react-icons/fi'
import { resume } from '@/data/portfolio.js'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { slideInLeft, slideInRight, viewportOnce } from '@/animations/variants'
import { ResumeViewer } from './ResumeViewer'

export function Resume() {
  return (
    <SectionWrapper id="resume" ariaLabel="Resume" className="bg-[var(--bg-elevated)]/40">
      <SectionHeading eyebrow="Resume" title="My resume, at a glance" />

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={slideInLeft} className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-500">
              <FiFileText size={22} />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-[var(--text-primary)]">{resume.fileName}</p>
              <p className="text-sm text-[var(--text-secondary)]">PDF · updated resume</p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Prefer a document over scrolling? Download the full resume or open it in a new tab — it covers
            experience, skills, and project highlights in one page.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href={resume.path} download variant="primary" icon={<FiDownload />}>
              Download Resume
            </Button>
            <Button href={resume.path} external variant="secondary" icon={<FiExternalLink />}>
              Open in New Tab
            </Button>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={slideInRight}>
          <ResumeViewer />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
