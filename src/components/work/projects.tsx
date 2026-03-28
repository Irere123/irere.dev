import { Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'motion/react'

import { usePageAnimationReady } from '@/lib/use-page-animation-ready'
import { getAllProjects, getRecentProjects, getYear } from '@/lib/work'

interface ProjectsProps {
  mode?: 'recent' | 'all'
  showArchiveLink?: boolean
}

export function Projects({ mode = 'recent', showArchiveLink = true }: ProjectsProps) {
  const projects = mode === 'all' ? getAllProjects() : getRecentProjects()
  const shouldReduceMotion = useReducedMotion()
  const isPageAnimationReady = usePageAnimationReady()
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
        initial={isPageAnimationReady ? 'hidden' : false}
        animate='show'
      >
        {projects.map((project, i) => {
          const year = getYear(project.startedAt)
          const showYear = year !== lastSeenYear
          lastSeenYear = year
          const nextProject = projects[i + 1]
          const nextYear = nextProject ? getYear(nextProject.startedAt) : null
          const isSameYearAsNext = nextYear === year
          const isFirstInYear = showYear && i > 0
          const rowBorderClass = isFirstInYear ? 'border-t border-gray-200' : ''
          const contentBorderClass = isSameYearAsNext ? 'border-b border-gray-100' : ''

          const dotColor = project.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'

          return (
            <motion.li
              key={project.slug}
              className={`grid grid-cols-[56px_1fr] items-start gap-2.5 pt-3 text-sm sm:grid-cols-[72px_1fr] sm:items-center sm:gap-3 ${rowBorderClass}`}
              variants={rowVariants}
            >
              <span className='text-gray-400'>{showYear ? year : ''}</span>
              <div
                className={`grid min-w-0 grid-cols-1 gap-1 pb-1 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-3 ${contentBorderClass}`}
              >
                <div className='flex min-w-0 items-center gap-3'>
                  {project.href ? (
                    <a
                      href={project.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='wrap-break-word text-gray-900 transition-colors hover:text-gray-600'
                    >
                      {project.title}
                    </a>
                  ) : (
                    <span className='wrap-break-word text-gray-900'>{project.title}</span>
                  )}
                </div>
                <span className='flex items-center gap-1.5 font-medium capitalize text-gray-400 sm:justify-self-end'>
                  <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor}`} aria-hidden />
                  {project.status}
                </span>
              </div>
            </motion.li>
          )
        })}
      </motion.ul>
      {showArchiveLink ? (
        <motion.div
          className='text-right'
          initial={isPageAnimationReady ? { opacity: 0, y: shouldReduceMotion ? 0 : 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.12, ease: 'easeOut' as const }
              : { type: 'spring' as const, stiffness: 290, damping: 28, mass: 0.6, delay: 0.08 }
          }
        >
          <Link
            to='/projects'
            className='text-sm text-gray-500 transition-colors hover:text-gray-900'
          >
            View all projects
          </Link>
        </motion.div>
      ) : null}
    </div>
  )
}
