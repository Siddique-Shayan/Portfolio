declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

/**
 * Loads Google Analytics (gtag.js) at runtime. Skipped when VITE_GA_MEASUREMENT_ID
 * is unset, so local/dev builds never send data unless explicitly configured.
 */
export function initAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (!measurementId) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', measurementId)
}
