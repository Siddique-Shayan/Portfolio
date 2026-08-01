import { useEffect, useState } from 'react'
import { useUIStore } from '@/store/uiStore'

interface TypewriterOptions {
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

/** Cycles through a list of words with a typing/pausing/deleting animation. */
export function useTypewriter(words: string[], options: TypewriterOptions = {}) {
  const { typingSpeed = 70, deletingSpeed = 40, pauseDuration = 1800 } = options
  const reducedMotion = useUIStore((s) => s.reducedMotion)
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState(reducedMotion ? words[0] ?? '' : '')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    if (reducedMotion || words.length === 0) return

    const currentWord = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typingSpeed)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseDuration)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 200)
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length - 1)), deletingSpeed)
      } else {
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length)
          setPhase('typing')
        }, 0)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, reducedMotion])

  return { text: reducedMotion ? words[0] ?? '' : text, isTyping: phase !== 'pausing' }
}
