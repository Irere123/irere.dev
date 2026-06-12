import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ArrowLeft, Search, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { parseAsString, useQueryState } from 'nuqs'
import { Fragment, useEffect, useMemo, useRef } from 'react'

import { archiveArticlesInfiniteQueryOptions } from '@/lib/article-queries'
import { usePageAnimationReady } from '@/lib/use-page-animation-ready'
import { type Article, getReadingTimeMinutes, getYear, isoDateToDate } from '@/lib/work'
import { RoughUnderline } from '@/svg/rough-underline'

export const Route = createFileRoute('/articles/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureInfiniteQueryData(archiveArticlesInfiniteQueryOptions())
  },
  component: ArticlesArchivePage,
})

function matchesQuery(article: Article, query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) {
    return true
  }
  return [article.title, article.summary, article.content].some((field) =>
    field.toLowerCase().includes(needle)
  )
}

function ArticlesArchivePage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useInfiniteQuery(
    archiveArticlesInfiniteQueryOptions()
  )
  const articles = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data])
  const shouldReduceMotion = useReducedMotion()
  const isPageAnimationReady = usePageAnimationReady()

  const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))
  const [year, setYear] = useQueryState('year', parseAsString.withDefault(''))
  const isFiltering = query.trim() !== '' || year !== ''

  const years = useMemo(
    () => [...new Set(articles.map((article) => getYear(article.publishedAt)))],
    [articles]
  )

  const filteredArticles = useMemo(
    () =>
      articles.filter(
        (article) =>
          (year === '' || getYear(article.publishedAt) === year) && matchesQuery(article, query)
      ),
    [articles, query, year]
  )

  // Filters apply client-side, so results are only complete once every page is loaded.
  // Pull the remaining pages in as soon as a filter becomes active.
  useEffect(() => {
    if (isFiltering && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [isFiltering, hasNextPage, isFetchingNextPage, fetchNextPage])

  // Infinite scroll: load the next page well before the sentinel enters the viewport.
  // Re-creating the observer after each fetch re-checks the sentinel, so short first
  // pages keep loading until the viewport is filled or the pages run out.
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasNextPage || isFetchingNextPage) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          fetchNextPage()
        }
      },
      { rootMargin: '600px 0px' }
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const clearFilters = () => {
    setQuery(null)
    setYear(null)
  }

  const entranceTransition = shouldReduceMotion
    ? { duration: 0.14, ease: 'easeOut' as const }
    : { type: 'spring' as const, stiffness: 280, damping: 30, mass: 0.65 }

  const listVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: shouldReduceMotion ? 0 : 0.06,
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

  let lastSeenYear = ''

  return (
    <motion.main
      className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12'
      initial={isPageAnimationReady ? { opacity: 0, y: shouldReduceMotion ? 0 : 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={entranceTransition}
    >
      <motion.div
        className='flex flex-col gap-3'
        initial={isPageAnimationReady ? { opacity: 0, y: shouldReduceMotion ? 0 : 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...entranceTransition, delay: shouldReduceMotion ? 0 : 0.03 }}
      >
        <Link
          to='/'
          search={{ work: 'articles' }}
          className='group inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900'
        >
          <ArrowLeft
            aria-hidden
            className='size-4 transition-transform duration-200 group-hover:-translate-x-0.5'
          />
          Back
        </Link>
        <h1 className='text-2xl font-semibold text-gray-900 sm:text-3xl'>Articles</h1>
      </motion.div>
      <motion.div
        className='flex flex-col gap-3'
        initial={isPageAnimationReady ? { opacity: 0, y: shouldReduceMotion ? 0 : 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...entranceTransition, delay: shouldReduceMotion ? 0 : 0.05 }}
      >
        <div className='relative'>
          <Search
            aria-hidden
            className='pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400'
          />
          <input
            type='search'
            value={query}
            onChange={(event) => setQuery(event.target.value || null)}
            placeholder='Search articles…'
            aria-label='Search articles'
            className='w-full appearance-none rounded-full border border-gray-200/80 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:ring-4 focus:ring-gray-900/[0.03] [&::-webkit-search-cancel-button]:hidden'
          />
          <AnimatePresence>
            {query !== '' ? (
              <motion.button
                type='button'
                onClick={() => setQuery(null)}
                aria-label='Clear search'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                className='absolute right-2.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700'
              >
                <X aria-hidden className='size-3.5' />
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
        {years.length > 0 ? (
          <div className='flex flex-wrap items-center gap-1.5'>
            {['', ...years].map((value) => {
              const isActive = year === value

              return (
                <button
                  key={value || 'all'}
                  type='button'
                  onClick={() => setYear(value || null)}
                  className={`relative rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'border-transparent text-white'
                      : 'border-gray-200/80 bg-white text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId='year-chip'
                      className='absolute inset-0 rounded-full bg-gray-900'
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: 'spring' as const, stiffness: 380, damping: 32, mass: 0.6 }
                      }
                    />
                  ) : null}
                  <span className='relative z-1'>{value || 'All'}</span>
                </button>
              )
            })}
          </div>
        ) : null}
      </motion.div>
      <motion.div
        className='flex flex-col'
        variants={listVariants}
        initial={isPageAnimationReady ? 'hidden' : false}
        animate='show'
      >
        {filteredArticles.map((article, index) => {
          const articleYear = getYear(article.publishedAt)
          const showYear = articleYear !== lastSeenYear
          lastSeenYear = articleYear

          return (
            <Fragment key={article.slug}>
              {showYear ? (
                <motion.div
                  variants={rowVariants}
                  className={`mb-2 flex items-center gap-3 text-sm text-gray-400 ${
                    index > 0 ? 'mt-8' : ''
                  }`}
                >
                  {articleYear}
                  <span aria-hidden className='h-px flex-1 bg-gray-200' />
                </motion.div>
              ) : null}
              <motion.div variants={rowVariants}>
                <Link
                  to='/articles/$slug'
                  params={{ slug: article.slug }}
                  preload='intent'
                  className='group -mx-3 flex flex-col gap-1 rounded-xl px-3 py-3 transition hover:bg-white hover:shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
                >
                  <div className='flex items-center gap-2'>
                    <span className='font-medium break-words text-gray-900'>{article.title}</span>
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
                  {article.summary ? (
                    <p className='line-clamp-2 text-sm leading-relaxed text-gray-500'>
                      {article.summary}
                    </p>
                  ) : null}
                  <p className='text-xs text-gray-400'>
                    {format(isoDateToDate(article.publishedAt), 'MMM d')} ·{' '}
                    {getReadingTimeMinutes(article.content)} min read
                  </p>
                </Link>
              </motion.div>
            </Fragment>
          )
        })}
      </motion.div>
      {filteredArticles.length === 0 && isFiltering && !isFetchingNextPage ? (
        <div className='flex flex-col items-start gap-2'>
          <p className='text-sm text-gray-500'>
            No articles match {query.trim() ? `“${query.trim()}”` : 'these filters'}.
          </p>
          <button
            type='button'
            onClick={clearFilters}
            className='text-sm text-gray-900 underline underline-offset-4 transition-colors hover:text-gray-600'
          >
            Clear filters
          </button>
        </div>
      ) : null}
      {articles.length === 0 && !isFiltering ? (
        <p className='text-sm text-gray-500'>No published articles yet.</p>
      ) : null}
      {isError ? (
        <p className='text-sm text-red-600'>Could not load more articles right now.</p>
      ) : null}
      <div className='flex flex-col items-center'>
        <div ref={sentinelRef} aria-hidden className='h-px w-full' />
        <AnimatePresence>
          {isFetchingNextPage ? (
            <motion.div
              role='status'
              aria-label='Loading more articles'
              className='py-2'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <div className='size-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900' />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.main>
  )
}
