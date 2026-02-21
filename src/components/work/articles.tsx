import { Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'motion/react'

import { formatDayMonth, getAllArticles, getRecentArticles, getYear } from '@/lib/work'
import { RoughUnderline } from '@/svg/rough-underline'

interface ArticlesProps {
  mode?: 'recent' | 'all'
  showArchiveLink?: boolean
}

export function Articles({ mode = 'recent', showArchiveLink = true }: ArticlesProps) {
  const articles = mode === 'all' ? getAllArticles() : getRecentArticles()
  const shouldReduceMotion = useReducedMotion()
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
        className='border-b border-gray-200'
        variants={listVariants}
        initial='hidden'
        animate='show'
      >
        {articles.map((article, i) => {
          const year = getYear(article.publishedAt)
          const showYear = year !== lastSeenYear
          lastSeenYear = year
          const nextArticle = articles[i + 1]
          const nextYear = nextArticle ? getYear(nextArticle.publishedAt) : null
          const isLastInYear = !nextArticle || nextYear !== year
          const rowBorderClass =
            isLastInYear ? 'border-b border-gray-200' : 'border-b border-gray-100'

          return (
            <motion.li
              key={article.slug}
              className={`grid grid-cols-[64px_1fr_auto] items-center gap-3 pt-3 text-sm last:border-b-0 sm:grid-cols-[72px_1fr_auto] ${rowBorderClass}`}
              variants={rowVariants}
            >
              <span className='text-gray-400'>{showYear ? year : ''}</span>
              <div className='flex items-center gap-3 pb-1'>
                <Link
                  to='/articles/$slug'
                  params={{ slug: article.slug }}
                  className='text-gray-900 transition-colors hover:text-gray-600'
                >
                  {article.title}
                </Link>
                {article.isNew ? (
                  <span
                    className='rough-annotation relative ml-1 inline-flex min-w-11 shrink-0 items-center justify-center px-2.5 py-1.5 text-xs font-medium'
                    style={{ color: 'rgb(34, 197, 94)' }}
                  >
                    <span className='relative z-1'>New</span>
                    <RoughUnderline
                      className='absolute inset-0 min-w-11'
                      stroke='rgb(34, 197, 94)'
                    />
                  </span>
                ) : null}
              </div>
              <span className='text-gray-400'>{formatDayMonth(article.publishedAt)}</span>
            </motion.li>
          )
        })}
      </motion.ul>
      {showArchiveLink ? (
        <motion.div
          className='text-right'
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.12, ease: 'easeOut' as const }
              : { type: 'spring' as const, stiffness: 290, damping: 28, mass: 0.6, delay: 0.08 }
          }
        >
          <Link
            to='/articles'
            className='text-sm text-gray-500 transition-colors hover:text-gray-900'
          >
            View all articles
          </Link>
        </motion.div>
      ) : null}
    </div>
  )
}
