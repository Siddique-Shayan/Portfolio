import { create } from 'zustand'

interface UIState {
  reducedMotion: boolean
  cursorEnabled: boolean
  setReducedMotion: (value: boolean) => void
}

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isCoarsePointer =
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

/** Central switch for animation-heavy extras (cursor glow, parallax, tilt) so every
 *  component respects the same reduced-motion / touch-device decision. */
export const useUIStore = create<UIState>((set) => ({
  reducedMotion: prefersReducedMotion,
  cursorEnabled: !prefersReducedMotion && !isCoarsePointer,
  setReducedMotion: (value) => set({ reducedMotion: value, cursorEnabled: !value && !isCoarsePointer }),
}))
