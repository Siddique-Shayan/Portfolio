import { useEffect, useRef } from 'react'
import { useUIStore } from '@/store/uiStore'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

const LINK_DISTANCE = 130

/** Lightweight canvas particle network for the hero backdrop. Skips entirely under reduced motion. */
export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useUIStore((s) => s.reducedMotion)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reducedMotion) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let rafId = 0
    let visible = true

    const isDark = () => document.documentElement.classList.contains('dark')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      const count = Math.min(70, Math.round((width * height) / 18000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
    }

    const step = () => {
      if (!visible) {
        rafId = requestAnimationFrame(step)
        return
      }
      ctx.clearRect(0, 0, width, height)
      const dotColor = isDark() ? 'rgba(180,196,255,0.55)' : 'rgba(60,80,180,0.4)'
      const lineColor = isDark() ? 'rgba(140,160,255,0.12)' : 'rgba(70,90,200,0.1)'

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.fillStyle = dotColor
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      })

      rafId = requestAnimationFrame(step)
    }

    const handleVisibility = () => {
      visible = document.visibilityState === 'visible'
    }

    resize()
    rafId = requestAnimationFrame(step)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  )
}
