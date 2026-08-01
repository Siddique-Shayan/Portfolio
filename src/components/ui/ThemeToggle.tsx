import { motion } from 'framer-motion'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useThemeStore } from '@/store/themeStore'

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="glass relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--text-primary)] transition-colors hover:border-primary-400/50"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center"
      >
        {isDark ? <FiMoon size={18} /> : <FiSun size={18} />}
      </motion.span>
    </button>
  )
}
