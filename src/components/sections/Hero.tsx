import { motion } from 'framer-motion'
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { hero, profile, socialLinks } from '@/data/portfolio.js'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { ProfileImage } from '@/components/ui/ProfileImage'
import { ParticleBackground } from '@/components/ui/ParticleBackground'
import { GradientBlobs } from '@/components/ui/GradientBlobs'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useScrollToSection } from '@/hooks/useScrollToSection'
import { staggerContainer, fadeUp } from '@/animations/variants'

const socialIcons: Record<string, typeof FiGithub> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
}

export function Hero() {
  const { text } = useTypewriter(hero.roles, { typingSpeed: 65, deletingSpeed: 35 })
  const scrollToSection = useScrollToSection()

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <div className="bg-grid absolute inset-0 -z-20 opacity-60" />
      <GradientBlobs />
      <ParticleBackground />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          animate="visible"
          className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:justify-between lg:gap-16"
        >
          <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
            <motion.span
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-4 py-1.5 text-sm text-[var(--text-secondary)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availableForWork ? 'Available for new opportunities' : profile.location}
            </motion.span>

            <motion.p variants={fadeUp} className="mb-3 text-lg text-[var(--text-secondary)]">
              {hero.greeting}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
            >
              {hero.name}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-4 flex h-9 items-center text-xl font-medium sm:text-2xl"
            >
              <span className="text-gradient font-display">{text}</span>
              <span className="ml-0.5 inline-block h-6 w-[2px] animate-pulse bg-primary-500" aria-hidden="true" />
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {hero.description}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button href={hero.ctaPrimary.href} download variant="primary" icon={<FiDownload />}>
                {hero.ctaPrimary.label}
              </Button>
              <Button href={hero.ctaSecondary.href} variant="secondary">
                {hero.ctaSecondary.label}
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
              {socialLinks
                .filter((link) => socialIcons[link.key])
                .map((link) => {
                  const Icon = socialIcons[link.key]
                  return (
                    <Magnetic key={link.key}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        aria-label={link.label}
                        className="glass flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:text-primary-500"
                      >
                        <Icon size={18} />
                      </a>
                    </Magnetic>
                  )
                })}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="relative shrink-0 animate-float">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary-500/30 via-accent-purple-500/20 to-transparent blur-2xl" />
            <ProfileImage size={300} className="sm:h-[340px] sm:w-[340px]" />
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => scrollToSection('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          aria-label="Scroll to About section"
          className="absolute inset-x-0 bottom-4 mx-auto flex w-fit flex-col items-center gap-2 text-xs text-[var(--text-muted)]"
        >
          Scroll
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <FiArrowDown />
          </motion.span>
        </motion.button>
      </Container>
    </section>
  )
}
