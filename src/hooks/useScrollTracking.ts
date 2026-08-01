import { useRef } from 'react'
import { useLenis } from 'lenis/react'
import { useNavigationStore } from '@/store/navigationStore'

const HIDE_THRESHOLD = 96

/** Drives the scroll progress bar and the navbar's hide-on-scroll-down / show-on-scroll-up behavior. */
export function useScrollTracking() {
  const lastY = useRef(0)
  const setScrollProgress = useNavigationStore((s) => s.setScrollProgress)
  const setNavHidden = useNavigationStore((s) => s.setNavHidden)

  useLenis(
    (lenis) => {
      const { scroll, limit } = lenis
      setScrollProgress(limit > 0 ? scroll / limit : 0)

      const delta = scroll - lastY.current
      if (scroll < HIDE_THRESHOLD) {
        setNavHidden(false)
      } else if (delta > 4) {
        setNavHidden(true)
      } else if (delta < -4) {
        setNavHidden(false)
      }
      lastY.current = scroll
    },
    [setScrollProgress, setNavHidden],
  )
}
