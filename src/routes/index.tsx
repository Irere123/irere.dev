import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { format } from 'date-fns'
import { motion, useReducedMotion } from 'motion/react'
import { createStandardSchemaV1, parseAsString, useQueryStates } from 'nuqs'

const searchParams = {
  work: parseAsString.withDefault('articles'),
}

import { CollectionPreview } from '@/components/collection-preview'
import { Work } from '@/components/work'
import { env } from 'cloudflare:workers'

export const Route = createFileRoute('/')({
  component: App,
  loader: () => getDeploymentDate(),
  validateSearch: createStandardSchemaV1(searchParams, {
    partialOutput: true,
  }),
})

const getDeploymentDate = createServerFn().handler(() => {
  return new Date(env.CF_VERSION_METADATA.timestamp)
})

function App() {
  const deploymentDate = Route.useLoaderData()
  const [{ work }] = useQueryStates(searchParams)
  const shouldReduceMotion = useReducedMotion()

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
      className='mx-auto flex w-full max-w-2xl flex-1 flex-col py-12'
      initial='hidden'
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
          <h1 className='font-bold'>Irere Emmanuel</h1>
          <p className='text-sm text-gray-500'>
            Last deployed on {format(deploymentDate, 'MMM d, yyyy')}
          </p>
        </div>
      </motion.div>
      <motion.article
        className='prose py-8'
        variants={sectionVariants}
        initial='hidden'
        animate='show'
        transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.06 }}
      >
        <motion.p variants={copyVariants}>
          I'm a software engineer with a design centric approach. I love to build products.
          Currently working with blockchain technologies (aka. web3).
        </motion.p>
        <motion.p variants={copyVariants}>
          I’m also a co-founder at{' '}
          <a href='https://revoks.dev' className='underline underline-offset-4'>
            Revoks
          </a>
          , which creates and publishes tools for achieving interface excellence, such as cmdk.
        </motion.p>
        <motion.p variants={copyVariants}>
          You can reach me at{' '}
          <a
            href='https://x.com/codesdoes'
            target='_blank'
            className='underline underline-offset-4'
            rel='noopener'
          >
            @codesdoes
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
        <Work work={work} />
      </motion.div>
    </motion.main>
  )
}
