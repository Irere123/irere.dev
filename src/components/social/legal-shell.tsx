import { Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

import { socialLegalConfig } from '@/lib/social-legal'
import { usePageAnimationReady } from '@/lib/use-page-animation-ready'

const { productName, lastUpdated } = socialLegalConfig

// Links sit inside dense legal copy, so they stay the weight of the surrounding text and
// lean on a faint underline instead of bold + full-contrast colour, which speckled the page.
const linkClassName =
  'text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-gray-900'

type LegalShellProps = {
  children: ReactNode
  title: string
  /** The sibling document, linked once at the foot of the page. */
  sibling: { to: '/social/privacy' | '/social/terms'; label: string }
}

export function LegalShell({ children, title, sibling }: LegalShellProps) {
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
      <motion.header
        className='flex flex-col gap-1 border-b border-gray-200 pb-8'
        {...reveal(0.03)}
      >
        <p className='text-sm text-gray-500'>{productName}</p>
        <h1 className='text-xl font-bold text-gray-900 sm:text-2xl'>{title}</h1>
        <p className='text-sm text-gray-500'>Last updated {lastUpdated}</p>
      </motion.header>

      <motion.div
        className='flex flex-col gap-10 pt-8 text-[15px] leading-relaxed text-gray-700'
        {...reveal(0.06)}
      >
        {children}
      </motion.div>

      <motion.footer className='mt-12 border-t border-gray-200 pt-6' {...reveal(0.09)}>
        <Link to={sibling.to} className={`text-sm ${linkClassName}`}>
          {sibling.label}
        </Link>
      </motion.footer>
    </motion.main>
  )
}

type LegalSectionProps = {
  /** Section number — the copy cross-references these, so they stay visible but muted. */
  n: number
  title: string
  children: ReactNode
}

export function LegalSection({ n, title, children }: LegalSectionProps) {
  return (
    <section id={`section-${n}`} className='flex scroll-mt-8 flex-col gap-3'>
      <h2 className='text-[15px] font-semibold text-gray-900'>
        <span className='pr-2 font-normal text-gray-400 tabular-nums'>{n}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className='flex list-disc flex-col gap-2 pl-5 marker:text-gray-300'>{children}</ul>
}

/** Emphasised label opening a list item — the only bold allowed in body copy. */
export function Term({ children }: { children: ReactNode }) {
  return <span className='font-medium text-gray-900'>{children}</span>
}

export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer' className={linkClassName}>
      {children}
    </a>
  )
}

export function InternalLink({
  to,
  children,
}: {
  to: '/social/privacy' | '/social/terms'
  children: ReactNode
}) {
  return (
    <Link to={to} className={linkClassName}>
      {children}
    </Link>
  )
}

export function MailLink({ address }: { address: string }) {
  return (
    <a href={`mailto:${address}`} className={linkClassName}>
      {address}
    </a>
  )
}
