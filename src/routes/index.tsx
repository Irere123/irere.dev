import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { format } from 'date-fns'

import { CollectionPreview } from '@/components/collection-preview'
import { env } from 'cloudflare:workers'

export const Route = createFileRoute('/')({ component: App, loader: () => getDeploymentDate() })

const getDeploymentDate = createServerFn().handler(() => {
  return new Date(env.CF_VERSION_METADATA.timestamp)
})

function App() {
  const deploymentDate = Route.useLoaderData()
  return (
    <div className='min-h-screen max-w-2xl mx-auto w-full py-12'>
      <div className='flex flex-col gap-3'>
        <CollectionPreview />
        <div>
          <h1 className='font-bold'>Irere Emmanuel</h1>
          <p className='text-sm text-gray-500'>
            Last deployed on {format(deploymentDate, 'MMM d, yyyy')}
          </p>
        </div>
      </div>
      <article className='prose py-8'>
        <p>
          I'm a software engineer with a design centric approach. I love to build products.
          Currently working with blockchain technologies (aka. web3).
        </p>
        <p>
          I’m also a co-founder at{' '}
          <a href='https://revoks.dev' className='underline underline-offset-4'>
            Revoks
          </a>
          , which creates and publishes tools for achieving interface excellence, such as cmdk.
        </p>
        <p>I consider myself a designer at heart and enjoy building highly polished products.</p>
        <span>
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
        </span>
      </article>
    </div>
  )
}
