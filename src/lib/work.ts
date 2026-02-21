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

export const ARTICLES: Article[] = [
  {
    slug: 'lifeline',
    title: 'Lifeline',
    publishedAt: '2026-02-16',
    summary: 'How I reduced complexity by drawing decision trees before writing code.',
    isNew: true,
    content: [
      'Lifeline is a note about reducing complexity in product decisions. I now sketch the decision tree before touching code so edge cases are visible early.',
      'Once the branches are clear, implementation gets simpler and review becomes about tradeoffs rather than surprises.',
      'The practical win is shorter feedback loops: fewer rewrites and a tighter path from idea to working behavior.',
    ],
  },
  {
    slug: 'agentation',
    title: 'Agentation',
    publishedAt: '2026-01-21',
    summary: 'A playbook for shipping reliable agent workflows with explicit guardrails.',
    content: [
      'Agentation captures the patterns that made my automation workflows reliable in production.',
      'The key is explicit boundaries: define what the agent can do, what must be confirmed, and how failures are surfaced.',
      'I prefer small, composable tools over one giant prompt because it improves observability and recovery.',
    ],
  },
  {
    slug: 'annotating-for-agents',
    title: 'Annotating for agents',
    publishedAt: '2026-01-16',
    summary: 'Writing comments and labels that help both humans and LLM tools navigate a codebase.',
    content: [
      'Code annotations can do more than explain intent to humans. They can also help tooling reason about boundaries and invariants.',
      'I focus on short annotations around domain rules, side effects, and risky assumptions.',
      'When annotations stay concrete, they remain useful during refactors instead of becoming stale prose.',
    ],
  },
  {
    slug: 'morphing-icons-with-claude',
    title: 'Morphing icons with Claude',
    publishedAt: '2026-01-13',
    summary: 'A tiny workflow for generating icon transitions that feel intentional instead of gimmicky.',
    content: [
      'This article documents my workflow for icon morphs that preserve visual weight during transitions.',
      'The process is simple: normalize path order, align anchors, and animate only the deltas users can perceive.',
      'The result is calmer motion that supports state changes without drawing too much attention.',
    ],
  },
  {
    slug: 'honkish',
    title: 'Honkish',
    publishedAt: '2025-05-23',
    summary: 'Lessons from building an intentionally playful product and where it failed.',
    content: [
      'Honkish started as an experiment in expressive interfaces and rapid iteration.',
      'What worked was the energy and personality. What failed was narrowing scope fast enough.',
      'I now treat this project as a reminder that clarity beats ambition when resources are tight.',
    ],
  },
  {
    slug: 'family-values',
    title: 'Family Values',
    publishedAt: '2024-07-08',
    summary: 'The product principles I keep coming back to when priorities get noisy.',
    content: [
      'Family Values is a short set of principles I use to evaluate product choices.',
      'Every feature has to answer three questions: who is it for, what pain does it remove, and how do we verify it worked.',
      'These constraints keep me honest when deadlines or hype try to pull attention away from fundamentals.',
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    slug: 'revoks',
    title: 'Revoks',
    startedAt: '2026-02-02',
    status: 'active',
    href: 'https://revoks.dev',
  },
  {
    slug: 'cmdk',
    title: 'cmdk',
    startedAt: '2025-11-10',
    status: 'active',
    href: 'https://cmdk.paco.me',
  },
  {
    slug: 'agentation-cli',
    title: 'Agentation CLI',
    startedAt: '2025-08-14',
    status: 'failed',
  },
  {
    slug: 'honkish-labs',
    title: 'Honkish Labs',
    startedAt: '2025-05-23',
    status: 'failed',
  },
  {
    slug: 'family-values-lab',
    title: 'Family Values Lab',
    startedAt: '2024-07-08',
    status: 'failed',
  },
  {
    slug: 'prototype-kit',
    title: 'Prototype Kit',
    startedAt: '2024-02-20',
    status: 'active',
  },
]

function sortByIsoDateDesc<T extends { [K in D]: string }, D extends string>(
  entries: T[],
  dateKey: D,
) {
  return [...entries].sort((a, b) => b[dateKey].localeCompare(a[dateKey]))
}

export function getAllArticles() {
  return sortByIsoDateDesc(ARTICLES, 'publishedAt')
}

export function getRecentArticles(limit = RECENT_WORK_LIMIT) {
  return getAllArticles().slice(0, limit)
}

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((article) => article.slug === slug)
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
