import { Link } from '@tanstack/react-router'

import { getAllProjects, getRecentProjects, getYear } from '@/lib/work'

interface ProjectsProps {
  mode?: 'recent' | 'all'
  showArchiveLink?: boolean
}

export function Projects({ mode = 'recent', showArchiveLink = true }: ProjectsProps) {
  const projects = mode === 'all' ? getAllProjects() : getRecentProjects()
  let lastSeenYear = ''

  return (
    <div className='flex flex-col gap-3'>
      <ul className='border-b border-gray-200'>
        {projects.map((project, i) => {
          const year = getYear(project.startedAt)
          const showYear = year !== lastSeenYear
          lastSeenYear = year
          const nextProject = projects[i + 1]
          const nextYear = nextProject ? getYear(nextProject.startedAt) : null
          const isLastInYear = !nextProject || nextYear !== year
          const rowBorderClass = isLastInYear
            ? 'border-b border-gray-200'
            : 'border-b border-gray-100'

          const dotColor = project.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'

          return (
            <li
              key={project.slug}
              className={`grid grid-cols-[64px_1fr_auto] items-center gap-3 pt-3 text-sm last:border-b-0 sm:grid-cols-[72px_1fr_auto] ${rowBorderClass}`}
            >
              <span className='text-gray-400'>{showYear ? year : ''}</span>
              <div className='flex items-center gap-3 pb-1'>
                {project.href ? (
                  <a
                    href={project.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-900 transition-colors hover:text-gray-600'
                  >
                    {project.title}
                  </a>
                ) : (
                  <span className='text-gray-900'>{project.title}</span>
                )}
              </div>
              <span className='flex items-center gap-1.5 font-medium capitalize text-gray-400'>
                <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor}`} aria-hidden />
                {project.status}
              </span>
            </li>
          )
        })}
      </ul>
      {showArchiveLink ? (
        <div className='text-right'>
          <Link
            to='/projects'
            className='text-sm text-gray-500 transition-colors hover:text-gray-900'
          >
            View all projects
          </Link>
        </div>
      ) : null}
    </div>
  )
}
