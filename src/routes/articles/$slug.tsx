import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { useMemo } from 'react'

import { ArticleMarkdown } from '@/components/markdown/article-markdown'
import { ArticleTableOfContents } from '@/components/markdown/article-table-of-contents'
import { extractTableOfContents } from '@/components/markdown/toc-utils'
import { articleBySlugQueryOptions } from '@/lib/article-queries'

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

  if (!article) {
    return (
      <div className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 py-12'>
        <h1 className='text-2xl font-semibold text-gray-900'>Article not found</h1>
        <Link to='/articles' className='text-sm text-gray-500 hover:text-gray-900'>
          Back to article archive
        </Link>
      </div>
    )
  }

  return (
    <article className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 py-12'>
      <ArticleTableOfContents items={tableOfContents} />
      <Link to='/articles' className='text-sm text-gray-500 hover:text-gray-900'>
        All articles
      </Link>
      <header className='flex flex-col gap-2'>
        <h1 className='text-3xl font-semibold text-gray-900'>{article.title}</h1>
        <p className='text-sm text-gray-500'>
          {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
        </p>
      </header>
      <div className='prose max-w-none'>
        <ArticleMarkdown markdown={article.content} />
      </div>
    </article>
  )
}
