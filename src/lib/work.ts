export type ProjectStatus = 'active' | 'failed'

export interface Article {
  slug: string
  title: string
  publishedAt: string
  summary: string
  content: string[]
  isNew?: boolean
}

export interface Project {
  slug: string
  title: string
  startedAt: string
  status: ProjectStatus
  href?: string
}

export const RECENT_WORK_LIMIT = 5

export const PROJECTS: Project[] = [
  {
    slug: 'autonomi',
    title: 'Autonomi',
    startedAt: '2026-01-02',
    status: 'active',
    href: 'https://autonomi.run',
  },
  {
    slug: 'lemma',
    title: 'Lemma',
    startedAt: '2025-11-10',
    status: 'active',
    href: 'https://lemma.irere.dev',
  },
  {
    slug: 'aithings',
    title: 'AI Things',
    startedAt: '2025-11-14',
    status: 'active',
    href: 'https://aithings.dev',
  },
  {
    slug: 'shipfree',
    title: 'ShipFree',
    startedAt: '2025-01-20',
    status: 'active',
    href: 'https://shipfre.revoks.dev',
  },
  {
    slug: 'waitly',
    title: 'Waitly',
    startedAt: '2025-03-08',
    status: 'active',
    href: 'https://waitly.revoks.dev',
  },
  {
    slug: 'clawnewz',
    title: 'ClawNewz',
    startedAt: '2026-02-15',
    status: 'active',
    href: 'https://clawnewz.com',
  },
  {
    slug: 'postalon',
    title: 'Postalon',
    startedAt: '2025-07-15',
    status: 'failed',
    href: 'https://github.com/Irere123/postalon',
  },
  {
    slug: 'codecrawl',
    title: 'Codecrawl',
    startedAt: '2025-07-15',
    status: 'failed',
    href: 'https://github.com/revokslab/codecrawl',
  },
  {
    slug: 'mentor',
    title: 'Mentor AI',
    startedAt: '2025-02-01',
    status: 'failed',
    href: 'https://github.com/revokslab/mentor.ai',
  },
  {
    slug: 'vsnip',
    title: 'VSnip',
    startedAt: '2024-03-20',
    status: 'failed',
    href: 'https://github.com/Irere123/vsnip',
  },
  {
    slug: 'relaunch',
    title: 'Relaunch',
    startedAt: '2025-04-07',
    status: 'failed',
    href: 'https://github.com/Irere123/relaunch',
  },
  {
    slug: 'reall',
    title: 'Reall',
    startedAt: '2023-11-1',
    status: 'failed',
    href: 'https://github.com/Irere123/reall',
  },
  {
    slug: 'neox',
    title: 'Neox',
    startedAt: '2021-09-1',
    status: 'failed',
    href: 'https://github.com/Irere123/Neox-UI',
  },
]

function sortByIsoDateDesc<T extends { [K in D]: string }, D extends string>(
  entries: T[],
  dateKey: D
) {
  return [...entries].sort((a, b) => b[dateKey].localeCompare(a[dateKey]))
}

export function getAllProjects() {
  return sortByIsoDateDesc(PROJECTS, 'startedAt')
}

export function getRecentProjects(limit = RECENT_WORK_LIMIT) {
  return getAllProjects().slice(0, limit)
}

export function formatDayMonth(isoDate: string) {
  const [, month, day] = isoDate.split('-')
  return `${day}/${month}`
}

export function getYear(isoDate: string) {
  return isoDate.slice(0, 4)
}

export function isoDateToDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`)
}
