import { useRouter } from '@tanstack/react-router'
import type { MouseEvent } from 'react'

/**
 * Click handler for "Back" links: goes back through history like the browser's back button,
 * so the previous page comes back as it was (scroll position, search). When there is nothing
 * to go back to on this site — the visitor landed here directly — the link's own destination
 * is used instead. Modified clicks (new tab, etc.) keep normal link behaviour.
 */
export function useBackNavigation() {
  const router = useRouter()

  return (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    // Checked on click, not during render: the history index only exists in the browser.
    if (router.history.canGoBack()) {
      event.preventDefault()
      router.history.back()
    }
  }
}
