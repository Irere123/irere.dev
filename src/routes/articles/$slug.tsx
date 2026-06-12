import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useMemo } from 'react'

import { ArticleMarkdown } from '@/components/markdown/article-markdown'
import { ArticleTableOfContents } from '@/components/markdown/article-table-of-contents'
import { extractTableOfContents } from '@/components/markdown/toc-utils'
import { ShareButton } from '@/components/share-button'
import { articleBySlugQueryOptions } from '@/lib/article-queries'
import { usePageAnimationReady } from '@/lib/use-page-animation-ready'

export const Route = createFileRoute('/articles/$slug')({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(articleBySlugQueryOptions(params.slug))
  },
  component: ArticleDetailPage,
})

function ArticleDetailPage() {
  const { slug } = Route.useParams()
  const { data: article } = useSuspenseQuery(articleBySlugQueryOptions(slug))
  const tableOfContents = useMemo(
    () => (article ? extractTableOfContents(article.content) : []),
    [article]
  )
  const shouldReduceMotion = useReducedMotion()
  const isPageAnimationReady = usePageAnimationReady()

  if (!article) {
    return (
      <div className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-4 py-10 sm:px-6 sm:py-12'>
        <h1 className='text-2xl font-semibold text-gray-900'>Article not found</h1>
        <Link to='/articles' className='text-sm text-gray-500 hover:text-gray-900'>
          Back to article archive
        </Link>
      </div>
    )
  }

  const entranceTransition = shouldReduceMotion
    ? { duration: 0.14, ease: 'easeOut' as const }
    : { type: 'spring' as const, stiffness: 280, damping: 30, mass: 0.65 }
  const reveal = (delay: number) => ({
    initial: isPageAnimationReady
      ? { opacity: 0, y: shouldReduceMotion ? 0 : 8 }
      : (false as const),
    animate: { opacity: 1, y: 0 },
    transition: { ...entranceTransition, delay: shouldReduceMotion ? 0 : delay },
  })

  return (
    <>
      <ArticleTableOfContents items={tableOfContents} />
      <motion.article
        className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6 sm:py-12'
        initial={isPageAnimationReady ? { opacity: 0, y: shouldReduceMotion ? 0 : 14 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={entranceTransition}
      >
        <motion.div {...reveal(0.03)} className='xl:hidden'>
          <Link
            to='/articles'
            className='group inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900'
          >
            <ArrowLeft
              aria-hidden
              className='size-4 transition-transform duration-200 group-hover:-translate-x-0.5'
            />
            Back
          </Link>
        </motion.div>
        <motion.header {...reveal(0.05)} className='flex flex-col gap-2'>
          <div className='flex items-start justify-between gap-4'>
            <h1 className='text-2xl font-semibold text-gray-900 sm:text-3xl'>{article.title}</h1>
            <ShareButton title={article.title} />
          </div>
          <p className='text-sm text-gray-500'>
            {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
          </p>
        </motion.header>
        {article.bannerImage ? (
          <motion.img
            {...reveal(0.07)}
            src={article.bannerImage}
            alt=''
            className='w-full rounded-lg border border-gray-200 object-cover'
            loading='eager'
          />
        ) : null}
        <motion.div {...reveal(0.09)} className='prose max-w-none'>
          <ArticleMarkdown markdown={article.content} />
        </motion.div>
      </motion.article>
    </>
  )
}
