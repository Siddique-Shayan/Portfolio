import { useEffect } from 'react'
import { SECTION_IDS } from '@/constants/sections'
import { useNavigationStore } from '@/store/navigationStore'

/** Tracks which section is currently in view and reflects it in the nav store for the active-link indicator. */
export function useActiveSection() {
  const setActiveSection = useNavigationStore((s) => s.setActiveSection)

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (elements.length === 0) return

    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio)
        })
        let bestId = ''
        let bestRatio = 0
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })
        if (bestId) setActiveSection(bestId)
      },
      { threshold: [0.15, 0.3, 0.5, 0.7, 0.9], rootMargin: '-15% 0px -35% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [setActiveSection])
}
