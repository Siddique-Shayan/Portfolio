import { useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useUIStore } from '@/store/uiStore'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

/** Wraps interactive elements (social icons, CTA buttons) with a subtle pointer-attraction effect. */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const cursorEnabled = useUIStore((s) => s.cursorEnabled)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 })

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!cursorEnabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * strength)
    y.set((event.clientY - rect.top - rect.height / 2) * strength)
  }

  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
