import { projects } from '@/data/portfolio.js'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  return (
    <SectionWrapper id="projects" ariaLabel="Featured projects">
      <SectionHeading
        eyebrow="Featured Projects"
        title="What I've been building"
        description="Personal projects and production work — from an AI FinTech assistant to a cloud-deployed booking platform."
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  )
}
