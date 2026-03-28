import { useEffect, useState } from 'react'

let hasHydratedOnce = false

export function usePageAnimationReady() {
  const [isReady, setIsReady] = useState(hasHydratedOnce)

  useEffect(() => {
    hasHydratedOnce = true
    setIsReady(true)
  }, [])

  return isReady
}
