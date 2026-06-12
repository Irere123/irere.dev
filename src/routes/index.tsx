import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { format } from 'date-fns'
import { motion, useReducedMotion } from 'motion/react'
import { createStandardSchemaV1, parseAsString, useQueryStates } from 'nuqs'
import { useEffect, useState } from 'react'

const searchParams = {
  work: parseAsString.withDefault('articles'),
}

import { CollectionPreview } from '@/components/collection-preview'
import { Work } from '@/components/work'
import { recentArticlesQueryOptions } from '@/lib/article-queries'
import { usePageAnimationReady } from '@/lib/use-page-animation-ready'
import { env } from 'cloudflare:workers'

export const Route = createFileRoute('/')({
  component: App,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(recentArticlesQueryOptions())
  },
  pendingComponent: HomePending,
  errorComponent: HomeError,
  validateSearch: createStandardSchemaV1(searchParams, {
    partialOutput: true,
  }),
})

const getDeploymentDate = createServerFn().handler(() => {
  try {
    const timestamp = env.CF_VERSION_METADATA?.timestamp

    if (!timestamp) {
      return null
    }

    const deploymentDate = new Date(timestamp)

    if (Number.isNaN(deploymentDate.getTime())) {
      return null
    }

    return deploymentDate
  } catch (error) {
    console.error('Failed to read Cloudflare version metadata', { error })
    return null
  }
})

function App() {
  const { data: articles } = useSuspenseQuery(recentArticlesQueryOptions())
  const [{ work }] = useQueryStates(searchParams)
  const shouldReduceMotion = useReducedMotion()
  const isPageAnimationReady = usePageAnimationReady()

  const sectionVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0.14, ease: 'easeOut' as const }
        : { type: 'spring' as const, stiffness: 280, damping: 30, mass: 0.65 },
    },
  }

  const copyVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0.12, ease: 'easeOut' as const }
        : { type: 'spring' as const, stiffness: 320, damping: 30, mass: 0.5 },
    },
  }

  return (
    <motion.main
      className='mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12'
      initial={isPageAnimationReady ? 'hidden' : false}
      animate='show'
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: 0.03,
            staggerChildren: shouldReduceMotion ? 0 : 0.09,
          },
        },
      }}
    >
      <motion.div className='flex flex-col gap-3' variants={sectionVariants}>
        <CollectionPreview />
        <div>
          <h1 className='font-bold sm:text-base text-xl'>Irere Emmanuel</h1>
          <DeploymentDate />
        </div>
      </motion.div>
      <motion.article
        className='prose py-6 sm:py-8'
        variants={sectionVariants}
        initial={isPageAnimationReady ? 'hidden' : false}
        animate='show'
        transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.06 }}
      >
        <motion.p variants={copyVariants}>
          I'm a software engineer with a{' '}
          <span className='font-serif font-medium'>design centric approach</span>. I love to build
          products. Currently working on{' '}
          <a href='https://daisy.now' className='underline underline-offset-4'>
            Daisy
          </a>
          , an AI agent that can design mobile apps.
        </motion.p>
        <motion.p variants={copyVariants}>
          I’m also a co-founder at{' '}
          <a href='https://revoks.dev' className='underline underline-offset-4'>
            Revoks
          </a>
          , where we’re creating products that return time, focus, and clarity back to people.
        </motion.p>
        <motion.p variants={copyVariants}>
          You can reach me at{' '}
          <a
            href='https://x.com/ireredotdev'
            target='_blank'
            className='underline underline-offset-4'
            rel='noopener'
          >
            @ireredotdev
          </a>{' '}
          or{' '}
          <a
            href='mailto:hello@irere.dev'
            target='_blank'
            rel='noopener'
            className='underline underline-offset-4'
          >
            hello@irere.dev
          </a>
          .
        </motion.p>
      </motion.article>
      <motion.div variants={sectionVariants}>
        <Work work={work} articles={articles} />
      </motion.div>
    </motion.main>
  )
}

function DeploymentDate() {
  const [status, setStatus] = useState<'loading' | 'loaded'>('loading')
  const [deploymentDate, setDeploymentDate] = useState<Date | null>(null)

  useEffect(() => {
    let isMounted = true

    getDeploymentDate()
      .then((date) => {
        if (isMounted) {
          setDeploymentDate(date)
          setStatus('loaded')
        }
      })
      .catch((error) => {
        console.error('Failed to load deployment date', { error })
        if (isMounted) {
          setStatus('loaded')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Render a skeleton that occupies the exact line height of the resolved text (text-sm =>
  // 20px / h-5), so the date popping in never pushes the content below it down.
  if (status === 'loading') {
    return (
      <div className='flex h-5 items-center' aria-hidden='true'>
        <span className='block h-3.5 w-44 animate-pulse rounded bg-gray-200' />
      </div>
    )
  }

  if (!deploymentDate) {
    return null
  }

  return (
    <p className='text-sm text-gray-500' suppressHydrationWarning>
      Last deployed on {format(deploymentDate, 'MMM d, yyyy')}
    </p>
  )
}

function HomePending() {
  return (
    <main className='mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12'>
      <div className='flex flex-col gap-3'>
        <div className='hidden h-[72px] w-full sm:block' />
        <div className='flex flex-col gap-2'>
          <div className='h-5 w-36 rounded bg-gray-200' />
          <div className='h-4 w-44 rounded bg-gray-200' />
        </div>
      </div>
      <div className='flex flex-col gap-3 py-6 sm:py-8'>
        <div className='h-4 w-full rounded bg-gray-200' />
        <div className='h-4 w-5/6 rounded bg-gray-200' />
        <div className='h-4 w-2/3 rounded bg-gray-200' />
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex gap-2'>
          <div className='h-10 w-28 rounded-full bg-gray-200' />
          <div className='h-10 w-28 rounded-full bg-gray-200' />
        </div>
        <div className='h-16 rounded bg-gray-200' />
      </div>
    </main>
  )
}

function HomeError() {
  return (
    <main className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-4 py-10 sm:px-6 sm:py-12'>
      <h1 className='text-2xl font-semibold text-gray-900'>Could not load the homepage</h1>
      <p className='text-sm text-gray-500'>
        Something failed while loading this page. Please refresh and try again.
      </p>
      <button
        type='button'
        className='w-fit rounded-full bg-gray-900 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-700'
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
    </main>
  )
}
