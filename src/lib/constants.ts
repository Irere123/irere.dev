export interface CollectionProject {
  src: string
  alt: string
  href: string
}

export const PROFILE_PREVIEW_IMAGE = '/collection-preview/irere.png'

export const COLLECTION_PROJECTS: CollectionProject[] = [
  {
    src: '/collection-preview/irere.png',
    alt: 'Revoks',
    href: 'https://revoks.dev',
  },
  {
    src: '/collection-preview/irere2.png',
    alt: 'cmdk',
    href: 'https://cmdk.paco.me',
  },
  {
    src: '/collection-preview/irere3.png',
    alt: 'GitHub profile',
    href: 'https://github.com/codesdoes',
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
