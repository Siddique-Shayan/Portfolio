import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
  as?: 'p' | 'span' | 'h3'
}

/** Splits text into words and reveals them with a staggered upward fade as the element enters view. */
export function RevealText({ text, className, delay = 0, as = 'p' }: RevealTextProps) {
  const words = text.split(' ')
  const Tag = motion[as]

  return (
    <Tag
      className={cn('flex flex-wrap', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ visible: { transition: { staggerChildren: 0.035, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.3em] inline-block"
          variants={{
            hidden: { opacity: 0, y: '0.6em' },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
