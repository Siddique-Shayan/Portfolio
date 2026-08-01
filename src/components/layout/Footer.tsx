import { motion } from 'framer-motion'
import { FiGithub, FiHeart, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile, socialLinks } from '@/data/portfolio.js'
import { Container } from '@/components/ui/Container'
import { Magnetic } from '@/components/ui/Magnetic'
import { fadeUp, viewportOnce } from '@/animations/variants'

const iconFor: Record<string, typeof FiGithub> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[var(--border-subtle)] py-10">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <p className="text-sm text-[var(--text-secondary)]">
            © {year} {profile.name}
            <FiHeart className="mx-1.5 inline text-primary-500" aria-hidden="true" />
          </p>

          <div className="flex items-center gap-3">
            {socialLinks
              .filter((link) => iconFor[link.key])
              .map((link) => {
                const Icon = iconFor[link.key]
                return (
                  <Magnetic key={link.key}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={link.label}
                      className="glass flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:text-primary-500"
                    >
                      <Icon size={16} />
                    </a>
                  </Magnetic>
                )
              })}
          </div>
        </motion.div>
      </Container>
    </footer>
  )
}
