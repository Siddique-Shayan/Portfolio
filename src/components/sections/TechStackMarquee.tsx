import { techMarquee } from '@/data/portfolio.js'
import { getIcon } from '@/utils/iconMap'
import { Marquee } from '@/components/ui/Marquee'

export function TechStackMarquee() {
  return (
    <section id="tech-stack" aria-label="Technology stack" className="border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 py-10">
      <Marquee>
        {techMarquee.map((key, i) => {
          const Icon = getIcon(key)
          if (!Icon) return null
          return (
            <span
              key={`${key}-${i}`}
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl text-[var(--text-secondary)] transition-all duration-300 hover:scale-125 hover:text-primary-500"
              title={key.replace(/^Si|^Fa|^Bs|^Vsc/, '')}
            >
              <Icon />
            </span>
          )
        })}
      </Marquee>
    </section>
  )
}
