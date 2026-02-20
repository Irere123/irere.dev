import { motion, useMotionValue } from 'motion/react'
import { useRef } from 'react'

import type { CollectionProject } from '@/lib/constants'
import { CollectionImage } from './collection-image'

interface ExpandedStateProps {
  projects: CollectionProject[]
  profileImageSrc: string
  setIsExpanded: (isExpanded: boolean) => void
}

export const ExpandedState = ({ projects, profileImageSrc, setIsExpanded }: ExpandedStateProps) => {
  const mouseLeft = useMotionValue(Number.NEGATIVE_INFINITY)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouseLeft.set(e.clientX - rect.left)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const touch = e.touches[0]
      mouseLeft.set(touch.clientX - rect.left)
    }
  }

  const handleMouseLeave = () => {
    mouseLeft.set(Number.NEGATIVE_INFINITY)
  }

  return (
    <motion.div className='flex items-center gap-2 p-2'>
      <button
        type='button'
        onClick={() => setIsExpanded(false)}
        className='cursor-pointer select-none'
        aria-label='Collapse Preview'
      >
        <motion.div
          layoutId='collection-avatar'
          className='relative size-[52px] shrink-0 overflow-hidden rounded-xl'
        >
          <img
            src={profileImageSrc}
            alt='Irere Emmanuel profile picture'
            width={200}
            height={200}
            className='size-full object-cover object-center'
          />
          <div className='absolute top-0 left-0 size-full rounded-xl border border-black/5 dark:border-white/5' />
        </motion.div>
      </button>
      <motion.div
        ref={containerRef}
        className='flex items-center justify-start gap-2'
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleMouseLeave}
        style={{ willChange: 'transform' }}
      >
        {projects.map((project) => (
          <motion.a
            key={project.src}
            layoutId={`image-${project.src}`}
            href={project.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Open ${project.alt}`}
          >
            <CollectionImage
              src={project.src}
              alt={project.alt}
              mouseLeft={mouseLeft}
              width={52}
              height={52}
              isExpanded={true}
            />
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  )
}
