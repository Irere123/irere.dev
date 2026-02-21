import { createFileRoute, Link } from '@tanstack/react-router'

import { Projects } from '@/components/work/projects'

export const Route = createFileRoute('/projects/')({
  component: ProjectsArchivePage,
})

function ProjectsArchivePage() {
  return (
    <div className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 py-12'>
      <div className='flex flex-col gap-2'>
        <Link to='/' search={{ work: 'projects' }} className='text-sm text-gray-500 hover:text-gray-900'>
          Back home
        </Link>
        <h1 className='text-2xl font-semibold text-gray-900'>Project archive</h1>
      </div>
      <Projects mode='all' showArchiveLink={false} />
    </div>
  )
}
