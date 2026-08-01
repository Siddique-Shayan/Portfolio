import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { ReactLenis } from 'lenis/react'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
        <App />
      </ReactLenis>
    </HelmetProvider>
  </StrictMode>,
)
