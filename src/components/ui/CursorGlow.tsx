import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useUIStore } from '@/store/uiStore'

/** Soft radial glow that follows the pointer — desktop only, off for touch devices / reduced motion. */
export function CursorGlow() {
  const cursorEnabled = useUIStore((s) => s.cursorEnabled)
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.5 })

  useEffect(() => {
    if (!cursorEnabled) return
    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [cursorEnabled, x, y])

  if (!cursorEnabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[420px] w-[420px] rounded-full mix-blend-plus-lighter"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background:
          'radial-gradient(circle, rgba(93,127,255,0.16), rgba(145,97,255,0.08) 45%, transparent 70%)',
      }}
    />
  )
}
