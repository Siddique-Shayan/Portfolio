import { useCallback } from 'react'
import { useLenis } from 'lenis/react'

/** Smoothly scrolls to a section id via Lenis, falling back to native scroll if Lenis isn't ready. */
export function useScrollToSection() {
  const lenis = useLenis()

  return useCallback(
    (id: string) => {
      const target = document.getElementById(id)
      if (!target) return
      if (lenis) {
        lenis.scrollTo(target, { offset: -84, duration: 1.1 })
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    [lenis],
  )
}
