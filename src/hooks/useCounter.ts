import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useUIStore } from '@/store/uiStore'

/** Animates a number from 0 to `target` once the element scrolls into view. */
export function useCounter(target: number, duration = 1.6) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  const [value, setValue] = useState(0)
  const reducedMotion = useUIStore((s) => s.reducedMotion)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current || reducedMotion) return
    started.current = true

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, target, duration, reducedMotion])

  return { ref, value: reducedMotion ? target : value }
}
