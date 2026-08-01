import { motion, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigationStore } from '@/store/navigationStore'

export function ScrollProgressBar() {
  const progress = useNavigationStore((s) => s.scrollProgress)
  const spring = useSpring(0, { stiffness: 200, damping: 30, mass: 0.2 })

  useEffect(() => {
    spring.set(progress)
  }, [progress, spring])

  return (
    <motion.div
      style={{ scaleX: spring }}
      className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-primary-400 via-accent-purple-500 to-accent-cyan-400"
      aria-hidden="true"
    />
  )
}
