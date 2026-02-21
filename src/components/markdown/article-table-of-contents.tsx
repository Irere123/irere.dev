import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'

import type { TocItem } from './toc-utils'

interface ArticleTableOfContentsProps {
  items: TocItem[]
}

function getLineWidth(level: TocItem['level']) {
  return level === 2 ? 16 : 11
}

export function ArticleTableOfContents({ items }: ArticleTableOfContentsProps) {
  const shouldReduceMotion = useReducedMotion()
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  const scrollToHeading = useCallback(
    (id: string) => {
      const heading = document.getElementById(id)
      if (!heading) {
        return
      }

      heading.scrollIntoView({
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
      window.history.replaceState(null, '', `#${id}`)
    },
    [shouldReduceMotion]
  )

  useEffect(() => {
    if (items.length === 0) {
      return
    }

    const firstHeadingId = items[0]?.id
    if (firstHeadingId) {
      setActiveId(firstHeadingId)
    }

    let raf = 0
    const headingOffset = () => window.innerHeight * 0.33

    const updateActiveHeading = () => {
      let nextActive = items[0]?.id ?? ''
      const reachedPageEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4

      for (const item of items) {
        const heading = document.getElementById(item.id)
        if (!heading) {
          continue
        }

        if (heading.getBoundingClientRect().top <= headingOffset()) {
          nextActive = item.id
        } else {
          break
        }
      }

      if (reachedPageEnd) {
        nextActive = items[items.length - 1]?.id ?? nextActive
      }

      setActiveId(nextActive)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = window.requestAnimationFrame(updateActiveHeading)
    }

    updateActiveHeading()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items])

  if (items.length === 0) {
    return null
  }

  return (
    <aside className='fixed left-8 top-1/2 z-20 hidden -translate-y-1/2 xl:flex'>
      <motion.nav
        aria-label='Table of contents'
        className='px-1 py-1'
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0.15, ease: 'easeOut' as const }
            : { type: 'spring' as const, stiffness: 290, damping: 30, mass: 0.65 }
        }
      >
        <ul className='flex flex-col gap-4'>
          {items.map((item, index) => {
            const isActive = item.id === activeId
            const lineWidth = getLineWidth(item.level)
            const sectionNumber = String(index + 1).padStart(2, '0')

            return (
              <li key={item.id} className='relative'>
                <button
                  type='button'
                  aria-label={`Go to ${item.title}`}
                  onClick={() => scrollToHeading(item.id)}
                  className='group flex h-4 items-center'
                >
                  <motion.span
                    className={`block h-0.5 rounded-full transition-colors ${
                      isActive ? 'bg-gray-900' : 'bg-gray-500 group-hover:bg-gray-700'
                    }`}
                    initial={false}
                    animate={
                      isActive
                        ? { width: lineWidth + 34, opacity: 1 }
                        : { width: lineWidth, opacity: 0.72 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.12, ease: 'easeOut' as const }
                        : { type: 'spring' as const, stiffness: 340, damping: 28, mass: 0.45 }
                    }
                  />
                  <span className='pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-gray-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100'>
                    {sectionNumber}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </motion.nav>
    </aside>
  )
}
