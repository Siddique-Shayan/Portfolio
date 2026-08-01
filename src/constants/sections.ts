export interface NavSection {
  id: string
  label: string
}

/** Canonical section order — drives the navbar, active-section tracking, and scroll targets. */
export const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export const SECTION_IDS = NAV_SECTIONS.map((section) => section.id)
