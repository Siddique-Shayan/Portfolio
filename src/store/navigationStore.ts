import { create } from 'zustand'

interface NavigationState {
  activeSection: string
  mobileMenuOpen: boolean
  navHidden: boolean
  scrollProgress: number
  setActiveSection: (id: string) => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  setNavHidden: (hidden: boolean) => void
  setScrollProgress: (progress: number) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeSection: 'hero',
  mobileMenuOpen: false,
  navHidden: false,
  scrollProgress: 0,
  setActiveSection: (id) => set({ activeSection: id }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  setNavHidden: (navHidden) => set({ navHidden }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
}))
