'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

import type { CollectionProject } from '@/lib/constants'
import { CollectionImage } from './collection-image'

interface StackedImagesProps {
  projects: CollectionProject[]
  profileImageSrc: string
  isHoverLocked: boolean
  setIsExpanded: (isExpanded: boolean) => void
}

const imageVariants = [
  {
    // image 0
    hover: { rotate: -24, x: -32, y: -20, zIndex: 3 },
    rest: { rotate: -12, zIndex: 3 },
  },
  {
    // image 1
    hover: { rotate: 24, x: 28, y: -16, zIndex: 4 },
    rest: { rotate: 12, zIndex: 4 },
  },
  {
    // image 2
    hover: { rotate: 24, x: 24, y: -38, zIndex: 1 },
    rest: { rotate: 24, zIndex: 1 },
  },
  {
    // image 3
    hover: { y: -44, rotate: -16, x: -24, zIndex: 2 },
    rest: { y: 0, rotate: -24, x: 0, zIndex: 2 },
  },
]

export const CollapsedState = ({
  projects,
  profileImageSrc,
  isHoverLocked,
  setIsExpanded,
}: StackedImagesProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const isHoverActive = isHovered && !isHoverLocked

  useEffect(() => {
    if (isHoverLocked) {
      setIsHovered(false)
    }
  }, [isHoverLocked])

  return (
    <div className='flex w-full items-start justify-start'>
      <button
        type='button'
        className='relative flex size-[72px] cursor-pointer items-center justify-center'
        onPointerEnter={() => {
          if (!isHoverLocked) {
            setIsHovered(true)
          }
        }}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(true)}
        aria-label='Expand Preview'
      >
        <motion.div
          initial={false}
          animate={isHoverActive ? { y: -4 } : { y: 0 }}
          layoutId='collection-avatar'
          className='relative z-10 size-16 shrink-0 cursor-pointer overflow-hidden rounded-xl'
        >
          <img
            src={profileImageSrc}
            alt='Irere Emmanuel profile picture'
            width={200}
            height={200}
            className='size-full object-cover object-center'
          />
          <div className='absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-xl border border-black/5 dark:border-white/5' />
        </motion.div>
        {projects.map((project, index) => (
          <motion.div
            key={project.src}
            layoutId={`image-${project.src}`}
            className='absolute'
            variants={imageVariants[index % imageVariants.length]}
            animate={isHoverActive ? 'hover' : 'rest'}
          >
            <CollectionImage
              src={project.src}
              alt={project.alt}
              width={64}
              height={64}
              isExpanded={false}
            />
          </motion.div>
        ))}
      </button>
    </div>
  )
}
