import { createFileRoute, Link } from '@tanstack/react-router'

import { Articles } from '@/components/work/articles'

export const Route = createFileRoute('/articles/')({
  component: ArticlesArchivePage,
})

function ArticlesArchivePage() {
  return (
    <div className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 py-12'>
      <div className='flex flex-col gap-2'>
        <Link
          to='/'
          search={{ work: 'articles' }}
          className='text-sm text-gray-500 hover:text-gray-900'
        >
          Back home
        </Link>
        <h1 className='text-2xl font-semibold text-gray-900'>Article archive</h1>
      </div>
      <Articles mode='all' showArchiveLink={false} />
    </div>
  )
}
