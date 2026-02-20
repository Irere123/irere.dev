import { type MotionValue, motion, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

import { DISTANCE, NUDGE, SCALE, SPRING_CONFIG } from '@/lib/constants'

interface CollectionImageProps {
  src: string
  alt: string
  mouseLeft?: MotionValue<number>
  width: number
  height: number
  isExpanded?: boolean
}

export const CollectionImage = ({
  src,
  alt,
  mouseLeft,
  width,
  height,
  isExpanded = false,
}: CollectionImageProps) => {
  const ref = useRef<HTMLDivElement>(null)

  // Calculate distance from mouse to the center of this image
  const distance = useTransform(() => {
    const bounds = ref.current
      ? { x: ref.current.offsetLeft, width: ref.current.offsetWidth }
      : { x: 0, width: 0 }
    return (mouseLeft?.get() ?? 0) - bounds.x - bounds.width / 2
  })

  // Scale up image when mouse is close (distance 0), normal size when far away
  const scale = useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, SCALE, 1])
  const calculateOffset = (currentDistance: number, currentScale: number) => {
    if (currentDistance === Number.NEGATIVE_INFINITY) {
      return 0
    }

    // Push away items that are far from the mouse
    if (currentDistance < -DISTANCE || currentDistance > DISTANCE) {
      return Math.sign(currentDistance) * -1 * NUDGE
    }

    // Smoothly offset items based on distance and scale
    return (-currentDistance / DISTANCE) * NUDGE * currentScale
  }

  const x = useTransform(() => {
    return calculateOffset(distance.get(), scale.get())
  })

  const springConfig = SPRING_CONFIG()
  const scaleSpring = useSpring(scale, springConfig)
  const xSpring = useSpring(x, springConfig)

  return (
    <motion.div
      ref={ref}
      className='relative flex cursor-pointer items-center justify-center select-none'
      style={{
        width,
        height,
        ...(isExpanded && { x: xSpring, scale: scaleSpring }),
      }}
    >
      <img
        src={src}
        alt={alt}
        width={200}
        height={200}
        className='h-full w-full shrink-0 cursor-pointer rounded-xl object-cover object-center'
      />
      <div className='absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-xl border border-black/5 dark:border-white/5' />
    </motion.div>
  )
}
