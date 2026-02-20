import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { COLLECTION_PROJECTS, PROFILE_PREVIEW_IMAGE } from '@/lib/constants'
import { CollapsedState } from './collapsed-state'
import { ExpandedState } from './expanded-state'

export const CollectionPreview = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHoverLocked, setIsHoverLocked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverLockTimeoutRef = useRef<number | null>(null)

  const clearHoverLockTimeout = useCallback(() => {
    if (hoverLockTimeoutRef.current !== null) {
      window.clearTimeout(hoverLockTimeoutRef.current)
      hoverLockTimeoutRef.current = null
    }
  }, [])

  const releaseHoverLockSoon = useCallback(() => {
    clearHoverLockTimeout()
    hoverLockTimeoutRef.current = window.setTimeout(() => {
      setIsHoverLocked(false)
      hoverLockTimeoutRef.current = null
    }, 180)
  }, [clearHoverLockTimeout])

  const expandPreview = useCallback(() => {
    clearHoverLockTimeout()
    setIsHoverLocked(false)
    setIsExpanded(true)
  }, [clearHoverLockTimeout])

  const collapsePreview = useCallback(() => {
    setIsExpanded(false)
    setIsHoverLocked(true)
    releaseHoverLockSoon()
  }, [releaseHoverLockSoon])

  useEffect(() => {
    if (!isExpanded) {
      return
    }

    const handleOutsideInteraction = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) {
        return
      }

      if (containerRef.current?.contains(event.target)) {
        return
      }

      collapsePreview()
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        collapsePreview()
      }
    }

    document.addEventListener('pointerdown', handleOutsideInteraction)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handleOutsideInteraction)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [collapsePreview, isExpanded])

  useEffect(() => {
    return () => {
      clearHoverLockTimeout()
    }
  }, [clearHoverLockTimeout])

  return (
    <div ref={containerRef} className='relative h-[72px] w-full'>
      <MotionConfig transition={{ type: 'spring', stiffness: 340, damping: 30, mass: 0.8 }}>
        <AnimatePresence mode='wait' initial={false}>
          {!isExpanded ? (
            <motion.div
              key='collapsed'
              className='absolute top-0 left-0'
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
            >
              <CollapsedState
                projects={COLLECTION_PROJECTS}
                profileImageSrc={PROFILE_PREVIEW_IMAGE}
                isHoverLocked={isHoverLocked}
                setIsExpanded={expandPreview}
              />
            </motion.div>
          ) : (
            <motion.div
              key='expanded'
              className='absolute top-0 left-0 z-20 origin-top-left'
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
            >
              <ExpandedState
                projects={COLLECTION_PROJECTS}
                profileImageSrc={PROFILE_PREVIEW_IMAGE}
                setIsExpanded={collapsePreview}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  )
}
