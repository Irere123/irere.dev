import { Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'motion/react'

import { usePageAnimationReady } from '@/lib/use-page-animation-ready'
import { type Article, formatDayMonth, getYear } from '@/lib/work'

interface ArticlesProps {
  showArchiveLink?: boolean
  articles: Article[]
  // 'viewport' prefetches each article as its row scrolls into view (instant on tap, no
  // hover needed — used on the short homepage list). 'intent' prefetches on hover.
  linkPreload?: 'intent' | 'viewport'
}

export function Articles({
  showArchiveLink = true,
  articles,
  linkPreload = 'intent',
}: ArticlesProps) {
  const shouldReduceMotion = useReducedMotion()
  const isPageAnimationReady = usePageAnimationReady()
  let lastSeenYear = ''

  const listVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.045,
        delayChildren: 0.02,
      },
    },
  }

  const rowVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0.12, ease: 'easeOut' as const }
        : { type: 'spring' as const, stiffness: 300, damping: 28, mass: 0.55 },
    },
  }

  return (
    <div className='flex flex-col gap-3'>
      <motion.ul
        variants={listVariants}
        initial={isPageAnimationReady ? 'hidden' : false}
        animate='show'
      >
        {articles.map((article, i) => {
          const year = getYear(article.publishedAt)
          const showYear = year !== lastSeenYear
          lastSeenYear = year

          return (
            <motion.li
              key={article.slug}
              className={`grid grid-cols-[56px_1fr] items-start gap-2.5 py-2 text-sm sm:grid-cols-[72px_1fr] sm:items-center sm:gap-3 ${
                showYear && i > 0 ? 'mt-4' : ''
              }`}
              variants={rowVariants}
            >
              <span className='text-gray-500'>{showYear ? year : ''}</span>
              <div className='grid min-w-0 grid-cols-[1fr_auto] items-center gap-3'>
                <Link
                  to='/articles/$slug'
                  params={{ slug: article.slug }}
                  preload={linkPreload}
                  className='wrap-break-word text-gray-900 transition-colors hover:text-gray-500'
                >
                  {article.title}
                </Link>
                <span className='hidden text-gray-500 sm:block'>
                  {formatDayMonth(article.publishedAt)}
                </span>
              </div>
            </motion.li>
          )
        })}
      </motion.ul>
      {articles.length === 0 ? (
        <p className='text-sm text-gray-500'>No published articles yet.</p>
      ) : null}
      {showArchiveLink ? (
        <motion.div
          className='text-right'
          initial={isPageAnimationReady ? { opacity: 0, y: shouldReduceMotion ? 0 : 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.12, ease: 'easeOut' as const }
              : { type: 'spring' as const, stiffness: 290, damping: 28, mass: 0.6, delay: 0.08 }
          }
        >
          <Link
            to='/articles'
            preload='intent'
            className='text-sm text-gray-500 transition-colors hover:text-gray-900'
          >
            View all articles
          </Link>
        </motion.div>
      ) : null}
    </div>
  )
}
