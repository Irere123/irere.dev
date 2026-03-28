import { allArticles, allProjects } from 'content-collections'

export type ProjectStatus = 'active' | 'failed'

export interface Article {
  slug: string
  title: string
  publishedAt: string
  summary: string
  content: string
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

function toArticle(article: (typeof allArticles)[number]): Article {
  return {
    slug: article.slug,
    title: article.title,
    publishedAt: article.publishedAt,
    summary: article.summary,
    content: article.content,
    isNew: article.isNew,
  }
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

export function getAllArticles() {
  return sortByIsoDateDesc(allArticles.map(toArticle), 'publishedAt')
}

export function getRecentArticles(limit = RECENT_WORK_LIMIT) {
  return getAllArticles().slice(0, limit)
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug) ?? null
}

export function getArticlesPage(cursor?: string | null, pageSize = 12) {
  const articles = getAllArticles()
  const startIndex = cursor ? articles.findIndex((article) => article.slug === cursor) + 1 : 0
  const safeStartIndex = startIndex > 0 ? startIndex : 0
  const data = articles.slice(safeStartIndex, safeStartIndex + pageSize)
  const lastItem = data[data.length - 1]
  const hasMore = safeStartIndex + data.length < articles.length

  return {
    data,
    nextCursor: hasMore && lastItem ? lastItem.slug : null,
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
