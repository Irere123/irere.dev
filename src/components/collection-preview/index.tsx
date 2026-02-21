import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { COLLECTION_PROJECTS, PROFILE_PREVIEW_IMAGE } from '@/lib/constants'
import { CollectionThumbnail } from './collection-thumbnail'
import { ExpandedState } from './expanded-state'

export const CollectionPreview = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const expandPreview = useCallback(() => {
    setIsExpanded(true)
  }, [])

  const collapsePreview = useCallback(() => {
    setIsExpanded(false)
  }, [])

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
              <CollectionThumbnail
                projects={COLLECTION_PROJECTS}
                profileImageSrc={PROFILE_PREVIEW_IMAGE}
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
