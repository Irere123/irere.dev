import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import type { Article } from '@/lib/work'
import { env } from 'cloudflare:workers'

// These functions are the ONLY place that talks to api.irere.dev. They are wrapped in
// `createServerFn`, so their bodies (and the Bearer token they read from `env`) only ever
// run on the server — the token is never bundled into the client. They execute directly
// during SSR loaders and proxy through a server endpoint on client navigations.

const API_BASE_URL = 'https://api.irere.dev/v1'
const RECENT_LIMIT = 5

// The API's `limit` query validator is `z.number()` (no coercion), but query params arrive
// as strings — so any `?limit=…` 400s with "expected number, received string". Until the
// API switches to `z.coerce.number()`, we omit `limit` and trim results ourselves.

// Permissive on purpose: only `id`/`createdAt`/`updatedAt` are guaranteed by the API, and
// extra/unknown fields are silently dropped rather than rejected so the API can evolve.
const apiPostSchema = z.object({
  id: z.string(),
  slug: z.string().nullish(),
  title: z.string().nullish(),
  subtitle: z.string().nullish(),
  status: z.enum(['DRAFT', 'PUBLISHED']).nullish(),
  markdown: z.string().nullish(),
  html: z.string().nullish(),
  excerpt: z.string().nullish(),
  bannerImage: z.string().nullish(),
  scheduledDate: z.string().nullish(),
  publishedDate: z.string().nullish(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

type ApiPost = z.infer<typeof apiPostSchema>

const documentsResponseSchema = z.object({
  nextCursor: z.string().nullish(),
  data: z.array(apiPostSchema).default([]),
})

class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiFetch(path: string): Promise<unknown> {
  const token = env.LEMMA_API_KEY

  if (!token) {
    throw new Error('Missing LEMMA_API_KEY — set it in .dev.vars and as a Cloudflare secret.')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new ApiError(
      response.status,
      `Request to ${path} failed with ${response.status}${detail ? `: ${detail}` : ''}`
    )
  }

  return response.json()
}

// The API exposes dates as ISO-ish strings; the UI groups/formats on a plain `YYYY-MM-DD`.
function toIsoDate(value: string): string {
  const date = new Date(value)
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString().slice(0, 10)
  }
  return value.slice(0, 10)
}

// List responses carry no body; only `/posts/slug/:slug` returns one. Prefer markdown, and
// fall back to the HTML the API currently serves in its place.
function toArticle(post: ApiPost): Article {
  return {
    slug: post.slug ?? post.id,
    title: post.title ?? 'Untitled',
    summary: post.subtitle ?? '',
    excerpt: post.excerpt ?? '',
    content: post.markdown || post.html || '',
    contentFormat: post.markdown ? 'markdown' : 'html',
    bannerImage: post.bannerImage ?? undefined,
    publishedAt: toIsoDate(post.publishedDate ?? post.createdAt),
  }
}

function sortByPublishedDesc(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

/** Newest published articles for the homepage list. */
export const fetchRecentArticles = createServerFn({ method: 'GET' }).handler(async () => {
  // Pages aren't ordered by publish date, so collect every page before picking the newest.
  const posts: ApiPost[] = []
  let cursor: string | null | undefined

  do {
    const params = new URLSearchParams({ status: 'PUBLISHED' })
    if (cursor) {
      params.set('cursor', cursor)
    }
    const json = await apiFetch(`/documents?${params.toString()}`)
    const { data, nextCursor } = documentsResponseSchema.parse(json)
    posts.push(...data)
    cursor = nextCursor
  } while (cursor)

  return sortByPublishedDesc(posts.map(toArticle)).slice(0, RECENT_LIMIT)
})

/** One cursor-paginated page of published articles for the archive. */
export const fetchArticlesPage = createServerFn({ method: 'GET' })
  .inputValidator((cursor: string | null | undefined) => cursor ?? null)
  .handler(async ({ data: cursor }) => {
    const params = new URLSearchParams({ status: 'PUBLISHED' })
    if (cursor) {
      params.set('cursor', cursor)
    }
    const json = await apiFetch(`/documents?${params.toString()}`)
    const { data, nextCursor } = documentsResponseSchema.parse(json)
    return {
      data: sortByPublishedDesc(data.map(toArticle)),
      nextCursor: nextCursor ?? null,
    }
  })

/** A single published article by slug. Returns null for drafts or unknown slugs. */
export const fetchArticleBySlug = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<Article | null> => {
    try {
      const json = await apiFetch(`/posts/slug/${encodeURIComponent(slug)}`)
      const post = apiPostSchema.parse(json)
      if (post.status === 'DRAFT') {
        return null
      }
      return toArticle(post)
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null
      }
      throw error
    }
  })
