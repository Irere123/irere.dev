import { allProjects } from 'content-collections'

export type ProjectStatus = 'active' | 'failed'

// Articles are served from the api.irere.dev content API (see lib/articles-api.ts).
// This type is the shape the UI consumes, after mapping the API response.
export interface Article {
  slug: string
  title: string
  publishedAt: string
  summary: string
  content: string
  bannerImage?: string
  isNew?: boolean
}

export interface Project {
  slug: string
  title: string
  startedAt: string
  status: ProjectStatus
  href?: string
  summary?: string
  content: string
}

export const RECENT_WORK_LIMIT = 5

function sortByIsoDateDesc<T extends { [K in D]: string }, D extends string>(
  entries: T[],
  dateKey: D
) {
  return [...entries].sort((a, b) => b[dateKey].localeCompare(a[dateKey]))
}

function toProject(project: (typeof allProjects)[number]): Project {
  return {
    slug: project.slug,
    title: project.title,
    startedAt: project.startedAt,
    status: project.status,
    href: project.href,
    summary: project.summary,
    content: project.content,
  }
}

export function getAllProjects() {
  return sortByIsoDateDesc(allProjects.map(toProject), 'startedAt')
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
