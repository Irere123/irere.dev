import { createFileRoute, Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'motion/react'

import { Projects } from '@/components/work/projects'
import { usePageAnimationReady } from '@/lib/use-page-animation-ready'

export const Route = createFileRoute('/projects/')({
  component: ProjectsArchivePage,
})

function ProjectsArchivePage() {
  const shouldReduceMotion = useReducedMotion()
  const isPageAnimationReady = usePageAnimationReady()
  const offset = shouldReduceMotion ? 0 : 14
  const entranceTransition = shouldReduceMotion
    ? { duration: 0.14, ease: 'easeOut' as const }
    : { type: 'spring' as const, stiffness: 280, damping: 30, mass: 0.65 }

  return (
    <motion.main
      className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6 sm:py-12'
      initial={isPageAnimationReady ? { opacity: 0, y: offset } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={entranceTransition}
    >
      <motion.div
        className='flex flex-col gap-2'
        initial={isPageAnimationReady ? { opacity: 0, y: shouldReduceMotion ? 0 : 6 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...entranceTransition, delay: shouldReduceMotion ? 0 : 0.03 }}
      >
        <Link
          to='/'
          search={{ work: 'projects' }}
          className='text-sm text-gray-500 hover:text-gray-900'
        >
          Back home
        </Link>
        <h1 className='text-xl font-semibold text-gray-900 sm:text-2xl'>Project archive</h1>
      </motion.div>
      <motion.div
        initial={isPageAnimationReady ? { opacity: 0, y: shouldReduceMotion ? 0 : 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...entranceTransition, delay: shouldReduceMotion ? 0 : 0.06 }}
      >
        <Projects mode='all' showArchiveLink={false} />
      </motion.div>
    </motion.main>
  )
}
