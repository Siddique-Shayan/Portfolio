import { motion } from 'framer-motion'
import { FiCheck, FiCopy, FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { contact } from '@/data/portfolio.js'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientBlobs } from '@/components/ui/GradientBlobs'
import { Magnetic } from '@/components/ui/Magnetic'
import { useClipboard } from '@/hooks/useClipboard'
import { staggerContainer, fadeUp, viewportOnce } from '@/animations/variants'
import { ContactForm } from './ContactForm'

const contactItems = [
  { id: 'email', label: 'Email', value: contact.email, icon: FiMail, copyable: true },
  { id: 'phone', label: 'Phone', value: contact.phone, icon: FiPhone, copyable: true },
  { id: 'location', label: 'Location', value: contact.location, icon: FiMapPin, copyable: false },
]

const socialButtons = [
  { id: 'github', label: 'GitHub', href: contact.github, icon: FiGithub },
  { id: 'linkedin', label: 'LinkedIn', href: contact.linkedin, icon: FiLinkedin },
]

function ContactRow({ label, value, icon: Icon, copyable }: (typeof contactItems)[number]) {
  const { copied, copy } = useClipboard()

  return (
    <motion.div variants={fadeUp}>
      <GlassCard className="flex items-center gap-4 p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500">
          <Icon size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
          <p className="truncate text-sm font-medium text-[var(--text-primary)]">{value}</p>
        </div>
        {copyable && (
          <button
            type="button"
            onClick={() => copy(value)}
            aria-label={`Copy ${label.toLowerCase()}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-glass)] hover:text-primary-500"
          >
            {copied ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
          </button>
        )}
      </GlassCard>
    </motion.div>
  )
}

export function Contact() {
  return (
    <SectionWrapper id="contact" ariaLabel="Contact">
      <div className="absolute inset-0 -z-10">
        <GradientBlobs variant="subtle" />
      </div>
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something together"
        description={contact.availability}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer(0.1)} className="flex flex-col gap-4">
            {contactItems.map((item) => (
              <ContactRow key={item.id} {...item} />
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="mt-6 flex gap-4"
          >
            {socialButtons.map((social) => (
              <motion.div key={social.id} variants={fadeUp}>
                <Magnetic>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:text-primary-500"
                  >
                    <social.icon /> {social.label}
                  </a>
                </Magnetic>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <ContactForm />
      </div>
    </SectionWrapper>
  )
}
