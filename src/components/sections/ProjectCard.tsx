import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiExternalLink, FiGithub } from 'react-icons/fi'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { useTilt } from '@/hooks/useTilt'
import { cn } from '@/utils/cn'

interface Project {
  slug: string
  name: string
  category: string
  description: string
  features: string[]
  tech: string[]
  github: string | null
  demo: string | null
  image: string
  status: string
  type: string
  badges?: string[]
}

const statusTone: Record<string, 'primary' | 'success' | 'warning' | 'neutral'> = {
  Live: 'success',
  Completed: 'primary',
  'In Progress': 'warning',
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, style, onPointerMove, onPointerLeave } = useTilt(6)
  const [imageFailed, setImageFailed] = useState(false)
  const isCompany = project.type === 'company'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard
        as="article"
        className={cn(
          'flex h-full flex-col overflow-hidden',
          isCompany && 'ring-1 ring-accent-emerald-400/40',
        )}
      >
        <motion.div
          ref={ref}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          style={style}
          className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border-subtle)]"
        >
          {!imageFailed ? (
            <img
              src={project.image}
              alt={`${project.name} preview`}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-500/25 via-accent-purple-500/20 to-accent-cyan-400/15">
              <span className="font-display text-3xl font-semibold text-[var(--text-primary)]/70">
                {project.name}
              </span>
            </div>
          )}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <Badge tone={statusTone[project.status] ?? 'neutral'}>{project.status}</Badge>
            {project.badges?.map((badge) => (
              <Badge key={badge} tone="success" icon={<FiCheckCircle />}>
                {badge}
              </Badge>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary-500">{project.category}</p>
            <h3 className="mt-1 font-display text-xl font-semibold text-[var(--text-primary)]">{project.name}</h3>
          </div>

          <p className="text-sm text-[var(--text-secondary)]">{project.description}</p>

          <ul className="flex flex-col gap-1.5">
            {project.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <FiCheckCircle className="mt-0.5 shrink-0 text-accent-emerald-400" size={14} />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-4 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-primary-500"
              >
                <FiGithub /> Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-primary-500"
              >
                <FiExternalLink /> {isCompany ? 'Visit Live Platform' : 'Live Demo'}
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
