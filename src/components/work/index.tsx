import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { Geometry, Notebook } from '@/svg'
import { Articles } from './articles'
import { Projects } from './projects'

export function Work({ work }: { work: string }) {
  const activeWork = work === 'projects' ? 'projects' : 'articles'
  const shouldReduceMotion = useReducedMotion()

  const contentOffset = shouldReduceMotion ? 0 : 12
  const contentTransition = shouldReduceMotion
    ? { duration: 0.16, ease: 'easeOut' as const }
    : { type: 'spring' as const, stiffness: 290, damping: 28, mass: 0.6 }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-2'>
        <WorkLink
          work='articles'
          label='Articles'
          icon={<Notebook className='h-5 w-5' />}
          isActive={activeWork === 'articles'}
        />
        <WorkLink
          work='projects'
          label='Projects'
          icon={<Geometry className='h-5 w-5' />}
          isActive={activeWork === 'projects'}
        />
      </div>
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={activeWork}
          initial={{ opacity: 0, y: contentOffset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: contentOffset * -0.5 }}
          transition={contentTransition}
        >
          {activeWork === 'articles' ? <Articles /> : <Projects />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function WorkLink({
  work,
  label,
  icon,
  isActive,
}: {
  work: string
  label: string
  icon: React.ReactNode
  isActive: boolean
}) {
  const baseClasses =
    'relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm transition-colors'

  return (
    <Link
      to='/'
      search={{ work }}
      className={`${baseClasses} ${
        isActive ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
      }`}
    >
      {isActive ? (
        <motion.span
          layoutId='work-active-pill'
          className='absolute inset-0 rounded-full bg-gray-900'
          transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.6 }}
        />
      ) : null}
      <span className='relative z-10 flex items-center gap-2'>
        {icon}
        {label}
      </span>
    </Link>
  )
}
