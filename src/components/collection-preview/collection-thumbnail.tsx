'use client'

import { motion } from 'motion/react'

import type { CollectionProject } from '@/lib/constants'
import { CollectionImage } from './collection-image'

interface CollectionThumbnailProps {
  projects: CollectionProject[]
  profileImageSrc: string
  setIsExpanded: (isExpanded: boolean) => void
}

const fanLayouts = [
  { rotate: -24, x: -32, y: -20, zIndex: 3 },
  { rotate: 24, x: 28, y: -16, zIndex: 4 },
  { rotate: 24, x: 24, y: -38, zIndex: 1 },
  { y: -44, rotate: -16, x: -24, zIndex: 2 },
]

export const CollectionThumbnail = ({
  projects,
  profileImageSrc,
  setIsExpanded,
}: CollectionThumbnailProps) => {
  return (
    <div className='flex w-full items-start justify-start'>
      <button
        type='button'
        className='relative flex size-[72px] cursor-pointer items-center justify-center'
        onClick={() => setIsExpanded(true)}
        aria-label='Expand Preview'
      >
        <motion.div
          initial={false}
          animate={{ y: -4 }}
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
            animate={fanLayouts[index % fanLayouts.length]}
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
