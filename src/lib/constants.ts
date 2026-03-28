export interface CollectionProject {
  src: string
  alt: string
  href: string
}

export const PROFILE_PREVIEW_IMAGE = '/collection-preview/irere.png'

export const COLLECTION_PROJECTS: CollectionProject[] = [
  {
    src: '/collection-preview/Doodle2.webp',
    alt: 'cmdk',
    href: 'https://cmdk.paco.me',
  },
  {
    src: '/collection-preview/Doodle3.webp',
    alt: 'GitHub profile',
    href: 'https://github.com/codesdoes',
  },
  {
    src: '/collection-preview/Doodle4.webp',
    alt: 'Twitter profile',
    href: 'https://x.com/codesdoes',
  },
]

export const SCALE = 1.22
export const DISTANCE = 90
export const NUDGE = 14
export const SPRING_CONFIG = () => ({
  mass: 0.14,
  stiffness: 240,
  damping: 24,
})
