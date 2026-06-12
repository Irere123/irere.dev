import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'

import { usePageAnimationReady } from '@/lib/use-page-animation-ready'
import type { TocItem } from './toc-utils'

interface ArticleTableOfContentsProps {
  items: TocItem[]
}

export function ArticleTableOfContents({ items }: ArticleTableOfContentsProps) {
  const shouldReduceMotion = useReducedMotion()
  const isPageAnimationReady = usePageAnimationReady()
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

  const entranceTransition = shouldReduceMotion
    ? { duration: 0.14, ease: 'easeOut' as const }
    : { type: 'spring' as const, stiffness: 280, damping: 30, mass: 0.65 }

  return (
    <aside className='fixed left-8 top-12 z-20 hidden w-56 xl:block'>
      <motion.div
        initial={isPageAnimationReady ? { opacity: 0, x: shouldReduceMotion ? 0 : -10 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={entranceTransition}
      >
        <Link
          to='/articles'
          className='group inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900'
        >
          <ArrowLeft
            aria-hidden
            className='size-4 transition-transform duration-200 group-hover:-translate-x-0.5'
          />
          Back
        </Link>
      </motion.div>
      {items.length > 0 ? (
        <nav
          aria-label='Table of contents'
          className='mt-12 max-h-[calc(100vh-14rem)] overflow-y-auto'
        >
          <ul className='flex flex-col gap-2.5'>
            {items.map((item, index) => {
              const isActive = item.id === activeId

              return (
                <motion.li
                  key={item.id}
                  initial={
                    isPageAnimationReady ? { opacity: 0, x: shouldReduceMotion ? 0 : -8 } : false
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    ...entranceTransition,
                    delay: shouldReduceMotion ? 0 : 0.05 + index * 0.035,
                  }}
                >
                  <button
                    type='button'
                    onClick={() => scrollToHeading(item.id)}
                    className={`relative flex w-full items-center text-left text-sm leading-6 transition-colors duration-200 ${
                      item.level === 3 ? 'pl-8' : 'pl-4'
                    } ${isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId='toc-active-dot'
                        className={`absolute top-1/2 -mt-[2.5px] size-[5px] rounded-full bg-emerald-500 ${
                          item.level === 3 ? 'left-4' : 'left-0'
                        }`}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: 'spring' as const, stiffness: 380, damping: 32, mass: 0.5 }
                        }
                      />
                    ) : null}
                    <span className='truncate'>{item.title}</span>
                  </button>
                </motion.li>
              )
            })}
          </ul>
        </nav>
      ) : null}
    </aside>
  )
}
