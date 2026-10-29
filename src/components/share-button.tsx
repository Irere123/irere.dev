import { Check, Link } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

interface ShareButtonProps {
  title: string
}

export function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  const handleShare = async () => {
    const url = window.location.href
    const prefersNativeShare =
      typeof navigator.share === 'function' && window.matchMedia('(pointer: coarse)').matches

    if (prefersNativeShare) {
      // The share sheet rejects when dismissed — nothing else to do either way.
      await navigator.share({ title, url }).catch(() => {})
      return
    }

    try {
      await navigator.clipboard.writeText(url)
    } catch {
      return
    }

    setCopied(true)
    window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <motion.button
      type='button'
      onClick={handleShare}
      aria-label={copied ? 'Link copied' : 'Share article'}
      whileTap={{ scale: 0.92 }}
      className='relative flex size-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-white hover:text-gray-900'
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={copied ? 'copied' : 'share'}
          className='absolute inset-0 flex items-center justify-center'
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
        >
          {copied ? (
            <Check aria-hidden className='size-4' strokeWidth={2.5} />
          ) : (
            <Link aria-hidden className='size-4' strokeWidth={2} />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
