import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '@/data/portfolio.js'
import { cn } from '@/utils/cn'

interface ProfileImageProps {
  className?: string
  size?: number
}

/** Loads the profile photo from /images/profile.jpg; falls back to an animated initials avatar if missing. */
export function ProfileImage({ className, size = 320 }: ProfileImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ width: size, height: size }}
        className={cn(
          'flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary-500 via-accent-purple-500 to-accent-cyan-400 font-display text-6xl font-semibold text-white shadow-[var(--shadow-glow)]',
          className,
        )}
        role="img"
        aria-label={profile.name}
      >
        {profile.initials}
      </motion.div>
    )
  }

  return (
    <motion.img
      src={profile.avatar}
      alt={profile.name}
      width={size}
      height={size}
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: size, height: size }}
      className={cn('rounded-[2rem] object-cover shadow-[var(--shadow-glow)]', className)}
    />
  )
}
