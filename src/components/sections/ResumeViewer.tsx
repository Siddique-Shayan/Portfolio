import { useCallback, useEffect, useRef, useState, type PointerEvent, type WheelEvent, type TouchEvent } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import type { PageCallback } from 'react-pdf/dist/shared/types.js'
import { useInView } from 'react-intersection-observer'
import { FiChevronDown, FiChevronUp, FiFileText } from 'react-icons/fi'
import { resume } from '@/data/portfolio.js'
import { Button } from '@/components/ui/Button'
import { useHoldScroll, type ScrollDirection } from '@/hooks/useHoldScroll'
import { cn } from '@/utils/cn'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// react-pdf needs an explicit worker URL under Vite — this resolves to a hashed,
// same-origin asset at build time rather than hitting a CDN.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

/**
 * Fixed, non-interactive baseline zoom. Visitors never get zoom controls — the only
 * adjustment is an automatic shrink-to-fit on narrow viewports (see `fitScale`) so the
 * page never causes horizontal overflow.
 */
const BASE_SCALE = 0.75
const PAGE_GAP = 20
const VIEWER_HORIZONTAL_PADDING = 32 // keeps "proper margins around the document"

interface PageBox {
  width: number
  height: number
}

function PageSkeleton({ width, height }: PageBox) {
  return (
    <div
      style={{ width, height }}
      className="animate-pulse rounded-lg bg-[linear-gradient(110deg,var(--bg-elevated)_8%,var(--border-subtle)_18%,var(--bg-elevated)_33%)] bg-[length:200%_100%]"
      aria-hidden="true"
    />
  )
}

function LazyPage({ pageNumber, scale, box }: { pageNumber: number; scale: number; box: PageBox }) {
  const { ref, inView } = useInView({ rootMargin: '600px 0px 600px 0px', triggerOnce: true })

  return (
    <div ref={ref} data-resume-page={pageNumber} className="flex justify-center" style={{ marginBottom: PAGE_GAP }}>
      {inView ? (
        <Page
          pageNumber={pageNumber}
          scale={scale}
          renderTextLayer
          renderAnnotationLayer
          loading={<PageSkeleton {...box} />}
          className="overflow-hidden rounded-lg [&_canvas]:rounded-lg [&_canvas]:shadow-[var(--shadow-soft)]"
        />
      ) : (
        <PageSkeleton {...box} />
      )}
    </div>
  )
}

interface ArrowButtonProps {
  direction: ScrollDirection
  disabled: boolean
  label: string
  onStart: (direction: ScrollDirection) => void
  onStop: () => void
  onTap: (direction: ScrollDirection) => void
}

/** Circular glass button — tap for a small nudge, hold for continuous movement (see useHoldScroll). */
function ArrowButton({ direction, disabled, label, onStart, onStop, onTap }: ArrowButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
        if (event.button !== undefined && event.button !== 0) return
        onStart(direction)
      }}
      onPointerUp={onStop}
      onPointerLeave={onStop}
      onPointerCancel={onStop}
      onClick={() => onTap(direction)}
      onContextMenu={(event) => event.preventDefault()}
      className={cn(
        'glass flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-secondary)] shadow-[var(--shadow-soft)]',
        'transition-all duration-200 will-change-transform hover:scale-110 hover:text-primary-500 hover:shadow-[var(--shadow-glow)]',
        'active:scale-95 disabled:pointer-events-none disabled:opacity-30',
        'touch-none select-none',
      )}
    >
      {direction === -1 ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
    </button>
  )
}

export function ResumeViewer() {
  const frameRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [box, setBox] = useState<PageBox | null>(null)
  const [fitScale, setFitScale] = useState(1)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [atTop, setAtTop] = useState(true)
  const [atBottom, setAtBottom] = useState(false)

  const { start: startHold, stop: stopHold, nudge } = useHoldScroll(scrollRef)

  // Recompute the shrink-to-fit factor whenever the frame resizes — keeps the fixed
  // 0.75 baseline intact on desktop while preventing horizontal overflow on phones.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame || !box) return

    const recompute = () => {
      const available = frame.clientWidth - VIEWER_HORIZONTAL_PADDING
      const nextFit = Math.min(1, available / (box.width * BASE_SCALE))
      setFitScale(Number.isFinite(nextFit) && nextFit > 0 ? nextFit : 1)
    }

    recompute()
    const observer = new ResizeObserver(recompute)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [box])

  // Track which page is most visible inside the scroll container for the page counter.
  useEffect(() => {
    const container = scrollRef.current
    if (!container || numPages === 0) return

    const ratios = new Map<number, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const page = Number((entry.target as HTMLElement).dataset.resumePage)
          ratios.set(page, entry.intersectionRatio)
        })
        let best = currentPage
        let bestRatio = 0
        ratios.forEach((ratio, page) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = page
          }
        })
        if (bestRatio > 0) setCurrentPage(best)
      },
      { root: container, threshold: [0.25, 0.5, 0.75, 1] },
    )

    const pages = container.querySelectorAll('[data-resume-page]')
    pages.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // Re-run once all page placeholders exist in the DOM.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPages])

  // Arrow buttons disable at the ends of the document — driven by the native 'scroll'
  // event, which still fires for programmatic scrollTop writes even with wheel/touch
  // scrolling disabled on the container.
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const updateBounds = () => {
      const max = container.scrollHeight - container.clientHeight
      setAtTop(container.scrollTop <= 1)
      setAtBottom(container.scrollTop >= max - 1)
    }

    updateBounds()
    container.addEventListener('scroll', updateBounds, { passive: true })
    return () => container.removeEventListener('scroll', updateBounds)
  }, [numPages, box])

  const handleDocumentLoadSuccess = useCallback((pdf: { numPages: number }) => {
    setNumPages(pdf.numPages)
    setStatus('ready')
  }, [])

  const handleFirstPageLoadSuccess = useCallback((page: PageCallback) => {
    // originalWidth/Height are scale-independent — safe to reuse across re-renders
    // at different scales, unlike width/height which reflect the current render scale.
    setBox((prev) => {
      if (prev && prev.width === page.originalWidth && prev.height === page.originalHeight) return prev
      return { width: page.originalWidth, height: page.originalHeight }
    })
  }, [])

  // The viewer is navigated exclusively via the arrow buttons — wheel, trackpad, and
  // touch-drag scrolling are all suppressed on the container.
  const blockGesture = useCallback((event: WheelEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const finalScale = BASE_SCALE * fitScale

  if (status === 'error') {
    return (
      <div className="flex h-[460px] flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8 text-center text-[var(--text-secondary)] shadow-[var(--shadow-soft)] sm:h-[560px]">
        <FiFileText size={32} />
        <p>This resume couldn't be previewed inline.</p>
        <Button href={resume.path} external variant="secondary">
          Open Resume
        </Button>
      </div>
    )
  }

  return (
    <div
      ref={frameRef}
      className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-[var(--shadow-soft)]"
    >
      <div
        ref={scrollRef}
        onWheel={blockGesture}
        onTouchMove={blockGesture}
        className="h-[460px] overflow-y-hidden overflow-x-hidden px-4 py-6 sm:h-[560px] lg:h-[620px]"
        style={{ touchAction: 'none' }}
      >
        <Document
          file={resume.path}
          onLoadSuccess={handleDocumentLoadSuccess}
          onLoadError={() => setStatus('error')}
          loading={<PageSkeleton width={344} height={446} />}
          className="flex flex-col items-center"
        >
          <div data-resume-page={1} className="flex justify-center" style={{ marginBottom: PAGE_GAP }}>
            <Page
              pageNumber={1}
              scale={finalScale}
              onLoadSuccess={handleFirstPageLoadSuccess}
              renderTextLayer
              renderAnnotationLayer
              loading={<PageSkeleton width={344} height={446} />}
              className="overflow-hidden rounded-lg [&_canvas]:rounded-lg [&_canvas]:shadow-[var(--shadow-soft)]"
            />
          </div>
          {box &&
            Array.from({ length: Math.max(numPages - 1, 0) }, (_, i) => i + 2).map((pageNumber) => (
              <LazyPage
                key={pageNumber}
                pageNumber={pageNumber}
                scale={finalScale}
                box={{ width: box.width * finalScale, height: box.height * finalScale }}
              />
            ))}
        </Document>
      </div>

      {numPages > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
          <span className="glass pointer-events-auto rounded-full px-3 py-1 text-xs font-medium tabular-nums text-[var(--text-secondary)]">
            {currentPage} / {numPages}
          </span>
        </div>
      )}

      {numPages > 0 && (
        <div className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3">
          <ArrowButton direction={-1} disabled={atTop} label="Scroll up" onStart={startHold} onStop={stopHold} onTap={nudge} />
          <ArrowButton direction={1} disabled={atBottom} label="Scroll down" onStart={startHold} onStop={stopHold} onTap={nudge} />
        </div>
      )}
    </div>
  )
}
