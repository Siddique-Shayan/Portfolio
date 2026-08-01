import { useCallback, useRef } from 'react'
import type { RefObject } from 'react'

export type ScrollDirection = 1 | -1

const NUDGE_DISTANCE = 140 // px moved by a single tap
const NUDGE_DURATION = 320 // ms for the tap's eased tween
const HOLD_THRESHOLD = 220 // ms of continued pressure before continuous mode kicks in
const CONTINUOUS_SPEED = 5 // px per animation frame (~300px/s at 60fps)

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function clampScrollTop(el: HTMLElement, value: number) {
  const max = Math.max(el.scrollHeight - el.clientHeight, 0)
  return Math.min(Math.max(value, 0), max)
}

/**
 * Press-and-hold scrolling for a container whose native scroll gestures are disabled.
 * A tap eases the container by a fixed distance; holding past HOLD_THRESHOLD switches
 * to continuous rAF-driven movement that stops the instant the pointer is released.
 */
export function useHoldScroll(scrollRef: RefObject<HTMLDivElement | null>) {
  const rafRef = useRef<number | null>(null)
  const holdTimerRef = useRef<number | null>(null)
  const modeRef = useRef<'idle' | 'nudge' | 'continuous'>('idle')

  const clearRaf = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  const runContinuous = useCallback((direction: ScrollDirection) => {
    const el = scrollRef.current
    if (!el) return

    const step = () => {
      el.scrollTop = clampScrollTop(el, el.scrollTop + direction * CONTINUOUS_SPEED)
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }, [scrollRef])

  const runNudge = useCallback((direction: ScrollDirection) => {
    const el = scrollRef.current
    if (!el) return

    const from = el.scrollTop
    const to = clampScrollTop(el, from + direction * NUDGE_DISTANCE)
    let start: number | null = null

    const step = (now: number) => {
      if (start === null) start = now
      const t = Math.min((now - start) / NUDGE_DURATION, 1)
      el.scrollTop = from + (to - from) * easeOutCubic(t)

      if (t < 1 && modeRef.current === 'nudge') {
        rafRef.current = requestAnimationFrame(step)
      } else {
        rafRef.current = null
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }, [scrollRef])

  const start = useCallback(
    (direction: ScrollDirection) => {
      clearRaf()
      modeRef.current = 'nudge'
      runNudge(direction)

      holdTimerRef.current = window.setTimeout(() => {
        clearRaf()
        modeRef.current = 'continuous'
        runContinuous(direction)
      }, HOLD_THRESHOLD)
    },
    [runNudge, runContinuous],
  )

  const stop = useCallback(() => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    // A tap's nudge is left to finish its own tween; only continuous movement needs
    // to halt the instant the pointer lifts.
    if (modeRef.current === 'continuous') {
      clearRaf()
    }
    modeRef.current = 'idle'
  }, [])

  /** Single fixed-distance step — used for the keyboard/click fallback. */
  const nudge = useCallback(
    (direction: ScrollDirection) => {
      clearRaf()
      modeRef.current = 'nudge'
      runNudge(direction)
    },
    [runNudge],
  )

  return { start, stop, nudge }
}
