import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useScrollToSection } from '@/hooks/useScrollToSection'

type Variant = 'primary' | 'secondary' | 'ghost'

interface CommonProps {
  variant?: Variant
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  children: ReactNode
}

interface ButtonAsButton extends CommonProps {
  href?: undefined
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  'aria-label'?: string
}

interface ButtonAsLink extends CommonProps {
  href: string
  external?: boolean
  download?: boolean | string
  onClick?: never
  'aria-label'?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary-500 text-white shadow-[var(--shadow-glow)] hover:bg-primary-600 focus-visible:outline-white',
  secondary:
    'glass text-[var(--text-primary)] hover:border-primary-400/60 hover:shadow-[var(--shadow-glow)]',
  ghost: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
}

/** Shared CTA button — renders an <a> for hash/external links (with smooth in-page scroll) or a <button>. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', icon, iconPosition = 'right', className, children } = props
  const scrollToSection = useScrollToSection()

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold',
    'transition-all duration-300 will-change-transform hover:-translate-y-0.5 active:translate-y-0',
    variantClasses[variant],
    className,
  )

  const content = (
    <>
      {icon && iconPosition === 'left' && <span aria-hidden="true">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span aria-hidden="true">{icon}</span>}
    </>
  )

  if ('href' in props && props.href) {
    const { href, external, download } = props
    const isHash = href.startsWith('#')

    if (isHash) {
      return (
        <motion.a
          href={href}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection(href.slice(1))
          }}
          whileTap={{ scale: 0.97 }}
          className={classes}
        >
          {content}
        </motion.a>
      )
    }

    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        download={download}
        whileTap={{ scale: 0.97 }}
        className={classes}
      >
        {content}
      </motion.a>
    )
  }

  const { type = 'button', disabled, onClick } = props as ButtonAsButton
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={props['aria-label']}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {content}
    </motion.button>
  )
}
