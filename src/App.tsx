import { lazy, Suspense } from 'react'
import { SEO } from '@/components/common/SEO'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { SectionSkeleton } from '@/components/ui/Skeleton'

const About = lazy(() => import('@/components/sections/About').then((m) => ({ default: m.About })))
const Skills = lazy(() => import('@/components/sections/Skills').then((m) => ({ default: m.Skills })))
const TechStackMarquee = lazy(() =>
  import('@/components/sections/TechStackMarquee').then((m) => ({ default: m.TechStackMarquee })),
)
const Projects = lazy(() => import('@/components/sections/Projects').then((m) => ({ default: m.Projects })))
const Experience = lazy(() => import('@/components/sections/Experience').then((m) => ({ default: m.Experience })))
const EducationCertifications = lazy(() =>
  import('@/components/sections/EducationCertifications').then((m) => ({ default: m.EducationCertifications })),
)
const Achievements = lazy(() =>
  import('@/components/sections/Achievements').then((m) => ({ default: m.Achievements })),
)
const Resume = lazy(() => import('@/components/sections/Resume').then((m) => ({ default: m.Resume })))
const Contact = lazy(() => import('@/components/sections/Contact').then((m) => ({ default: m.Contact })))
const Footer = lazy(() => import('@/components/layout/Footer').then((m) => ({ default: m.Footer })))

function App() {
  return (
    <>
      <SEO />
      <ScrollProgressBar />
      <CursorGlow />
      <Navbar />

      <main>
        <Hero />

        <Suspense fallback={<SectionSkeleton />}>
          <About />
          <Skills />
          <TechStackMarquee />
          <Projects />
          <Experience />
          <EducationCertifications />
          <Achievements />
          <Resume />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <ScrollToTopButton />
    </>
  )
}

export default App
