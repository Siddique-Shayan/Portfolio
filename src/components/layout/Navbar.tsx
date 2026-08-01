import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { NAV_SECTIONS } from '@/constants/sections'
import { useNavigationStore } from '@/store/navigationStore'
import { useScrollTracking } from '@/hooks/useScrollTracking'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollToSection } from '@/hooks/useScrollToSection'
import { profile } from '@/data/portfolio.js'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export function Navbar() {
  useScrollTracking()
  useActiveSection()

  const navHidden = useNavigationStore((s) => s.navHidden)
  const activeSection = useNavigationStore((s) => s.activeSection)
  const mobileMenuOpen = useNavigationStore((s) => s.mobileMenuOpen)
  const toggleMobileMenu = useNavigationStore((s) => s.toggleMobileMenu)
  const closeMobileMenu = useNavigationStore((s) => s.closeMobileMenu)
  const scrollToSection = useScrollToSection()

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    closeMobileMenu()
  }

  return (
    <motion.header
      animate={{ y: navHidden ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        aria-label="Primary"
        className="glass mx-3 mt-3 flex items-center justify-between rounded-2xl px-4 py-3 shadow-[var(--shadow-soft)] sm:mx-6 sm:mt-4 lg:mx-auto lg:max-w-6xl"
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('hero')
          }}
          className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--text-primary)]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-purple-500 text-sm text-white">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name.split(' ')[0]}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_SECTIONS.map((section) => {
            const isActive = activeSection === section.id
            return (
              <li key={section.id} className="relative">
                <a
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(section.id)
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                  )}
                >
                  {section.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-primary-400 to-accent-purple-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="#contact" variant="primary" className="!px-5 !py-2.5 text-xs">
              Contact
            </Button>
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-primary)] lg:hidden"
          >
            {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass mx-3 mt-2 rounded-2xl p-4 shadow-[var(--shadow-soft)] lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(section.id)
                    }}
                    className={cn(
                      'block rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                      activeSection === section.id
                        ? 'bg-primary-500/10 text-primary-500'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-glass)] hover:text-[var(--text-primary)]',
                    )}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
