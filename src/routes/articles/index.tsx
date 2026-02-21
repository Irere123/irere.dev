import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'motion/react'

import { Articles } from '@/components/work/articles'
import { archiveArticlesInfiniteQueryOptions } from '@/lib/article-queries'

export const Route = createFileRoute('/articles/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureInfiniteQueryData(archiveArticlesInfiniteQueryOptions())
  },
  component: ArticlesArchivePage,
})

function ArticlesArchivePage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useInfiniteQuery(
    archiveArticlesInfiniteQueryOptions()
  )
  const articles = data?.pages.flatMap((page) => page.data) ?? []
  const shouldReduceMotion = useReducedMotion()
  const offset = shouldReduceMotion ? 0 : 14
  const entranceTransition = shouldReduceMotion
    ? { duration: 0.14, ease: 'easeOut' as const }
    : { type: 'spring' as const, stiffness: 280, damping: 30, mass: 0.65 }

  return (
    <motion.main
      className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 py-12'
      initial={{ opacity: 0, y: offset }}
      animate={{ opacity: 1, y: 0 }}
      transition={entranceTransition}
    >
      <motion.div
        className='flex flex-col gap-2'
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...entranceTransition, delay: shouldReduceMotion ? 0 : 0.03 }}
      >
        <Link
          to='/'
          search={{ work: 'articles' }}
          className='text-sm text-gray-500 hover:text-gray-900'
        >
          Back home
        </Link>
        <h1 className='text-2xl font-semibold text-gray-900'>Article archive</h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...entranceTransition, delay: shouldReduceMotion ? 0 : 0.06 }}
      >
        <Articles showArchiveLink={false} articles={articles} />
      </motion.div>
      {isError ? (
        <p className='text-sm text-red-600'>Could not load more articles right now.</p>
      ) : null}
      {hasNextPage ? (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entranceTransition, delay: shouldReduceMotion ? 0 : 0.08 }}
        >
          <button
            type='button'
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className='rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </button>
        </motion.div>
      ) : null}
    </motion.main>
  )
}
