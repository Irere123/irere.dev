import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'

import { getArticleBySlug, isoDateToDate } from '@/lib/work'

export const Route = createFileRoute('/articles/$slug')({
  component: ArticleDetailPage,
})

function ArticleDetailPage() {
  const { slug } = Route.useParams()
  const article = getArticleBySlug(slug)

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
      <Link to='/articles' className='text-sm text-gray-500 hover:text-gray-900'>
        All articles
      </Link>
      <header className='flex flex-col gap-2'>
        <h1 className='text-3xl font-semibold text-gray-900'>{article.title}</h1>
        <p className='text-sm text-gray-500'>{format(isoDateToDate(article.publishedAt), 'MMMM d, yyyy')}</p>
      </header>
      <div className='prose max-w-none'>
        {article.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}
