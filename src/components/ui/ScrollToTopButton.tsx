import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import { useLenis } from 'lenis/react'
import { useNavigationStore } from '@/store/navigationStore'

export function ScrollToTopButton() {
  const progress = useNavigationStore((s) => s.scrollProgress)
  const lenis = useLenis()
  const visible = progress > 0.12

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => lenis?.scrollTo(0, { duration: 1.1 })}
          aria-label="Scroll back to top"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25 }}
          className="glass fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-primary)] shadow-[var(--shadow-soft)] sm:bottom-8 sm:right-8"
        >
          <FiArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
