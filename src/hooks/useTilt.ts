import { useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type PointerEvent } from 'react'
import { useUIStore } from '@/store/uiStore'

interface TiltResult {
  ref: React.RefObject<HTMLDivElement | null>
  style: { rotateX: MotionValue<number>; rotateY: MotionValue<number>; transformPerspective: number }
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void
  onPointerLeave: () => void
}

/** 3D pointer-tracking tilt for cards — disabled automatically on touch devices / reduced motion. */
export function useTilt(intensity = 10): TiltResult {
  const ref = useRef<HTMLDivElement>(null)
  const cursorEnabled = useUIStore((s) => s.cursorEnabled)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 220,
    damping: 22,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 220,
    damping: 22,
  })

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!cursorEnabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, style: { rotateX, rotateY, transformPerspective: 800 }, onPointerMove, onPointerLeave }
}
