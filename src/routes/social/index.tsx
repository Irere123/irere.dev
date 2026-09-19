import { createFileRoute, Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'motion/react'

import { MailLink } from '@/components/social/legal-shell'
import { socialLegalConfig } from '@/lib/social-legal'
import { usePageAnimationReady } from '@/lib/use-page-animation-ready'

const { productName, operatorLegalName, operatorShortName, legalContactEmail, lastUpdated } =
  socialLegalConfig

export const Route = createFileRoute('/social/')({
  head: () => ({
    meta: [
      { title: `${productName} — legal` },
      {
        name: 'description',
        content: `${operatorLegalName} operates ${productName}, a social media scheduling and publishing service. Read its Terms of Service and Privacy Policy.`,
      },
    ],
  }),
  component: SocialLegalIndexPage,
})

const documents = [
  {
    to: '/social/terms',
    title: 'Terms of Service',
    description: 'Accounts, your content, connected platforms, fees and liability.',
  },
  {
    to: '/social/privacy',
    title: 'Privacy Policy',
    description: 'What data the Service collects, why, who it reaches, and your rights over it.',
  },
] as const

function SocialLegalIndexPage() {
  const shouldReduceMotion = useReducedMotion()
  const isPageAnimationReady = usePageAnimationReady()
  const entranceTransition = shouldReduceMotion
    ? { duration: 0.14, ease: 'easeOut' as const }
    : { type: 'spring' as const, stiffness: 280, damping: 30, mass: 0.65 }
  const reveal = (delay: number) => ({
    initial: isPageAnimationReady
      ? { opacity: 0, y: shouldReduceMotion ? 0 : 8 }
      : (false as const),
    animate: { opacity: 1, y: 0 },
    transition: { ...entranceTransition, delay: shouldReduceMotion ? 0 : delay },
  })

  return (
    <motion.main
      className='mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12'
      initial={isPageAnimationReady ? { opacity: 0, y: shouldReduceMotion ? 0 : 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={entranceTransition}
    >
      <motion.header className='flex flex-col gap-1' {...reveal(0.03)}>
        <h1 className='text-xl font-bold text-gray-900 sm:text-2xl'>{productName}</h1>
        <p className='text-sm text-gray-500'>Legal · updated {lastUpdated}</p>
      </motion.header>

      <motion.div
        className='flex flex-col gap-4 pt-6 text-[15px] leading-relaxed text-gray-700'
        {...reveal(0.06)}
      >
        <p>
          {operatorLegalName} operates {productName}, a social media scheduling, publishing,
          analytics and team-collaboration service. It lets you draft content once and publish it to
          the networks you have connected — including TikTok, X, Instagram, LinkedIn and YouTube —
          on a schedule you control.
        </p>
        <p>The two documents below govern your use of it.</p>
      </motion.div>

      <motion.ul
        className='mt-8 flex flex-col divide-y divide-gray-200 border-t border-b border-gray-200'
        {...reveal(0.09)}
      >
        {documents.map((document) => (
          <li key={document.to}>
            <Link
              to={document.to}
              className='group flex flex-col gap-0.5 py-4 transition-opacity hover:opacity-70'
            >
              <span className='text-[15px] font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 group-hover:decoration-gray-900'>
                {document.title}
              </span>
              <span className='text-sm leading-relaxed text-gray-500'>{document.description}</span>
            </Link>
          </li>
        ))}
      </motion.ul>

      <motion.p className='pt-8 text-sm leading-relaxed text-gray-500' {...reveal(0.12)}>
        Questions about either document, or about how {operatorShortName} handles your data? Write
        to <MailLink address={legalContactEmail} />.
      </motion.p>
    </motion.main>
  )
}
