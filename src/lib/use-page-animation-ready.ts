import { useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

// Module-scoped: survives route unmount/remount within a session, resets on full reload.
let hasHydratedOnce = false
const animatedPaths = new Set<string>()

/**
 * Gates page entrance animations so each route animates at most once per session:
 *   - never during the initial SSR/hydration paint (avoids a flash of hidden content),
 *   - on the first client-side visit to a route,
 *   - but NOT when navigating back to an already-seen route — returning to a page renders
 *     in its final position instead of re-running the staggered slide-in (which read as
 *     the layout "shaking").
 *
 * The decision is locked in at mount via the useState initializer (read before the effect
 * marks the path as seen), which keeps it correct under React StrictMode's double-invoke.
 */
export function usePageAnimationReady() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  const [shouldAnimate] = useState(() => {
    if (!hasHydratedOnce) {
      return false
    }
    return !animatedPaths.has(pathname)
  })

  useEffect(() => {
    hasHydratedOnce = true
    animatedPaths.add(pathname)
  }, [pathname])

  return shouldAnimate
}
