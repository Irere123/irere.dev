import { Link } from '@tanstack/react-router'

import { Geometry, Notebook } from '@/svg'
import { Articles } from './articles'
import { Projects } from './projects'

export function Work({ work }: { work: string }) {
  const activeWork = work === 'projects' ? 'projects' : 'articles'

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-2'>
        <WorkLink work='articles' label='Articles' icon={<Notebook className='w-5 h-5' />} />
        <WorkLink work='projects' label='Projects' icon={<Geometry className='w-5 h-5' />} />
      </div>
      {activeWork === 'articles' && <Articles />}
      {activeWork === 'projects' && <Projects />}
    </div>
  )
}

function WorkLink({ work, label, icon }: { work: string; label: string; icon: React.ReactNode }) {
  const baseClasses = 'flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors'

  return (
    <Link
      to='/'
      search={{ work }}
      className={`${baseClasses}`}
      activeProps={{
        className: 'bg-gray-900 text-white',
      }}
      inactiveProps={{
        className: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      }}
    >
      {icon}
      {label}
    </Link>
  )
}
