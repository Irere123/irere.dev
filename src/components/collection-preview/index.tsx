import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { COLLECTION_PROJECTS, PROFILE_PREVIEW_IMAGE } from '@/lib/constants'

const CARD_SIZE = 56
const ROW_GAP = 10

interface CardPose {
  x?: number
  y?: number
  rotate?: number
  scale?: number
}

// Independent transforms rather than one `transform` string: on the hardware-accelerated
// path, Motion (12.34) cancels the finished animation a frame before it writes the final
// value, so every card snapped back to its stale pose for a frame as it landed. These
// springs only run after a click, never while the page is loading.
function pose({ x = 0, y = 0, rotate = 0, scale = 1 }: CardPose) {
  return { x, y, rotate, scale }
}

const REST = pose({})

// Cards tucked behind the photo like a hand of cards.
const STACK_POSES: CardPose[] = [
  { x: -18, y: -6, rotate: -14 },
  { x: 2, y: -14, rotate: 4 },
  { x: 20, y: -4, rotate: 15 },
]

// Extra spread while the stack is hovered, layered on top of the stack pose.
const FAN_POSES: CardPose[] = [
  { x: -10, y: -6, rotate: -8 },
  { x: 0, y: -10, rotate: 3 },
  { x: 10, y: -6, rotate: 8 },
]

const PHOTO_FANNED = pose({ y: -2, rotate: -3, scale: 1.04 })

// Dealing the cards carries the spatial story, so it gets the softer spring; hover
// responses get a quicker one. Both retarget from wherever a card is mid-flight.
const DEAL_SPRING = { type: 'spring', duration: 0.5, bounce: 0.2 } as const
const HOVER_SPRING = { type: 'spring', duration: 0.3, bounce: 0.15 } as const
const INSTANT = { duration: 0 } as const
const DEAL_STAGGER = 0.04
const GATHER_STAGGER = 0.03

function getRowPose(index: number): CardPose {
  return { x: (CARD_SIZE + ROW_GAP) * (index + 1) }
}

function getLiftPose(index: number): CardPose {
  return { y: -4, rotate: index % 2 === 0 ? -3 : 3, scale: 1.06 }
}

export const CollectionPreview = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isStackHovered, setIsStackHovered] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const collapse = useCallback(() => {
    setIsExpanded(false)
    setHoveredCard(null)
  }, [])

  useEffect(() => {
    if (!isExpanded) {
      return
    }

    const handleOutsideInteraction = (event: PointerEvent) => {
      if (event.target instanceof Node && containerRef.current?.contains(event.target)) {
        return
      }
      collapse()
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }
      // The cards leave the tab order once collapsed, so don't strand focus on one.
      if (containerRef.current?.contains(document.activeElement)) {
        toggleRef.current?.focus()
      }
      collapse()
    }

    document.addEventListener('pointerdown', handleOutsideInteraction)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handleOutsideInteraction)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [collapse, isExpanded])

  const isFanned = isStackHovered && !isExpanded
  const lastIndex = COLLECTION_PROJECTS.length - 1

  return (
    <div ref={containerRef} className='relative hidden h-[72px] w-full sm:block'>
      <motion.div
        className='absolute bottom-0 left-0 size-14'
        onHoverStart={() => setIsStackHovered(true)}
        onHoverEnd={() => setIsStackHovered(false)}
      >
        {/* The photo comes first in the DOM so Tab moves from it into the dealt-out cards; z-10 keeps it on top. */}
        <motion.button
          ref={toggleRef}
          type='button'
          onClick={() => (isExpanded ? collapse() : setIsExpanded(true))}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Hide profile links' : 'Show profile links'}
          className='absolute inset-0 z-10 cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2'
          initial={false}
          animate={isFanned ? PHOTO_FANNED : REST}
          transition={shouldReduceMotion ? INSTANT : HOVER_SPRING}
        >
          <img
            src={PROFILE_PREVIEW_IMAGE}
            alt=''
            decoding='async'
            draggable={false}
            width={200}
            height={200}
            className='size-full select-none rounded-xl object-cover transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]'
          />
        </motion.button>
        {COLLECTION_PROJECTS.map((project, index) => {
          const stackPose = STACK_POSES[index % STACK_POSES.length]
          // Deal out left to right, gather back right to left.
          const delay = isExpanded ? index * DEAL_STAGGER : (lastIndex - index) * GATHER_STAGGER
          const handPose = isFanned
            ? pose(FAN_POSES[index % FAN_POSES.length])
            : isExpanded && hoveredCard === index
              ? pose(getLiftPose(index))
              : REST

          return (
            <motion.a
              key={project.src}
              href={project.href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Open ${project.alt}`}
              // Reachable by Tab once dealt out; screen readers can always follow the link.
              tabIndex={isExpanded ? 0 : -1}
              onClick={(event) => {
                // A pointer click on a peeking card opens the hand instead of following
                // the link. Keyboard and assistive-tech activation (detail 0) still follows it.
                if (!isExpanded && event.detail > 0) {
                  event.preventDefault()
                  setIsExpanded(true)
                }
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard((current) => (current === index ? null : current))}
              className='absolute inset-0 cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2'
              initial={false}
              animate={pose(isExpanded ? getRowPose(index) : stackPose)}
              transition={shouldReduceMotion ? INSTANT : { ...DEAL_SPRING, delay }}
            >
              <motion.span
                className='block size-full'
                initial={false}
                animate={handPose}
                transition={shouldReduceMotion ? INSTANT : HOVER_SPRING}
              >
                <img
                  src={project.src}
                  alt=''
                  decoding='async'
                  draggable={false}
                  width={200}
                  height={200}
                  className='size-full select-none rounded-xl object-cover'
                />
              </motion.span>
            </motion.a>
          )
        })}
      </motion.div>
    </div>
  )
}
