import { useCallback, useState } from 'react'

/** Copies text to the clipboard and reports a transient "copied" state for UI feedback. */
export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), resetDelay)
        return true
      } catch {
        return false
      }
    },
    [resetDelay],
  )

  return { copied, copy }
}
