import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { Link, createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { MotionConfig } from 'motion/react'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'

import { Footer } from '@/components/footer'
import appCss from '../styles.css?url'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Irere Emmanuel',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  notFoundComponent: RootNotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='w-full h-full'>
      <head>
        <HeadContent />
      </head>
      <body className='flex flex-col w-full h-full'>
        <NuqsAdapter>
          <MotionConfig reducedMotion='user'>
            {children}
            <Footer />
          </MotionConfig>
        </NuqsAdapter>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function RootNotFound() {
  return (
    <main className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 py-12'>
      <h1 className='text-2xl font-semibold text-gray-900'>Page not found</h1>
      <p className='text-sm text-gray-500'>The page you requested does not exist.</p>
      <div>
        <Link to='/' className='text-sm text-gray-700 underline underline-offset-4 hover:text-gray-900'>
          Back home
        </Link>
      </div>
    </main>
  )
}
