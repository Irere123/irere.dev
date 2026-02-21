import { createServerFn } from '@tanstack/react-start'

import { LEMMA_API_URL } from '@/lib/constants'
import { RECENT_WORK_LIMIT, type Article } from '@/lib/work'

export interface LemmaPost {
  id: string
  slug: string | null
  title?: string
  subtitle?: string | null
  status?: 'DRAFT' | 'PUBLISHED'
  markdown?: string | null
  bannerImage?: string | null
  scheduledDate?: string | null
  publishedDate?: string | null
  createdAt: string
  updatedAt: string
}

export interface ListDocumentsParams {
  status?: 'DRAFT' | 'PUBLISHED'
  cursor?: string
}

export interface ListDocumentsResponse {
  nextCursor: string | null
  data: LemmaPost[]
}

const DOCUMENT_STATUSES = ['DRAFT', 'PUBLISHED'] as const

function getLemmaApiKey() {
  const apiKey = process.env.LEMMA_API_KEY
  if (!apiKey) {
    throw new Error('LEMMA_API_KEY is not set')
  }
  return apiKey
}

async function lemmaFetch(path: string, init?: RequestInit): Promise<Response> {
  const url = `${LEMMA_API_URL}${path.startsWith('/') ? path : `/${path}`}`
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${getLemmaApiKey()}`,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText)
    throw new Error(`Lemma API error ${response.status} for ${path}: ${message}`)
  }

  return response
}

function toIsoDate(dateValue?: string) {
  if (!dateValue) {
    return '1970-01-01'
  }

  const parsed = new Date(dateValue)
  if (Number.isNaN(parsed.getTime())) {
    return '1970-01-01'
  }

  return parsed.toISOString().slice(0, 10)
}

function sanitizeMarkdown(text?: string | null) {
  return (text ?? '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[`*_>#~]/g, '')
    .replace(/^\s*[-+]\s+/gm, '')
    .trim()
}

function markdownToSummary(markdown?: string | null) {
  const cleaned = sanitizeMarkdown(markdown)
  const paragraphs = cleaned
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)

  return paragraphs[0] ?? ''
}

function normalizeStatus(status?: ListDocumentsParams['status']) {
  if (status == null) {
    return undefined
  }

  const normalized = String(status).trim().toUpperCase()
  if (!normalized) {
    return undefined
  }

  if (!DOCUMENT_STATUSES.includes(normalized as (typeof DOCUMENT_STATUSES)[number])) {
    throw new Error(`Invalid status "${status}". Expected one of: ${DOCUMENT_STATUSES.join(', ')}`)
  }

  return normalized as ListDocumentsParams['status']
}

function normalizeCursor(cursor?: string) {
  if (cursor == null) {
    return undefined
  }

  const normalized = cursor.trim()
  return normalized.length > 0 ? normalized : undefined
}

function toArticle(post: LemmaPost): Article | null {
  if (!post.slug || !post.title) {
    return null
  }

  const content = (post.markdown ?? '').trim()
  const summary = post.subtitle || markdownToSummary(post.markdown)

  return {
    slug: post.slug,
    title: post.title,
    summary,
    content,
    publishedAt: toIsoDate(post.publishedDate || post.scheduledDate || post.createdAt),
    isNew: false,
  }
}

function toArticles(posts: LemmaPost[]) {
  return posts.map(toArticle).filter((article): article is Article => article != null)
}

export async function listDocuments(params?: ListDocumentsParams): Promise<ListDocumentsResponse> {
  const searchParams = new URLSearchParams()
  const status = normalizeStatus(params?.status)
  const cursor = normalizeCursor(params?.cursor)

  if (status) {
    searchParams.set('status', status)
  }
  if (cursor) {
    searchParams.set('cursor', cursor)
  }

  const query = searchParams.toString()
  const path = query ? `/v1/documents?${query}` : '/v1/documents'
  try {
    const response = await lemmaFetch(path)
    const json = (await response.json()) as Partial<ListDocumentsResponse>

    return {
      nextCursor: typeof json.nextCursor === 'string' ? json.nextCursor : null,
      data: Array.isArray(json.data) ? (json.data as LemmaPost[]) : [],
    }
  } catch (error) {
    console.error('Failed to list Lemma documents', {
      status,
      hasCursor: Boolean(cursor),
      error,
    })
    throw error
  }
}

export async function getPostBySlug(slug: string): Promise<LemmaPost> {
  const path = `/v1/posts/slug/${encodeURIComponent(slug)}`
  try {
    const response = await lemmaFetch(path)
    return response.json() as Promise<LemmaPost>
  } catch (error) {
    console.error('Failed to fetch Lemma post by slug', { slug, error })
    throw error
  }
}

async function listPublishedDocuments(limit: number) {
  const documents: LemmaPost[] = []
  let cursor: string | undefined

  while (documents.length < limit) {
    const response = await listDocuments({
      status: 'PUBLISHED',
      cursor,
    })

    documents.push(...response.data)

    if (!response.nextCursor || response.data.length === 0) {
      break
    }

    cursor = response.nextCursor
  }

  return documents
}

export const getPublishedArticles = createServerFn({ method: 'GET' })
  .inputValidator((input: { limit?: number } | undefined) => {
    return input
  })
  .handler(async ({ data }) => {
    const response = await listPublishedDocuments(data?.limit ?? 300)
    return toArticles(response)
  })

export const getPublishedArticlesPage = createServerFn({ method: 'GET' })
  .inputValidator((input: { cursor?: string } | undefined) => {
    return input
  })
  .handler(async ({ data }) => {
    const response = await listDocuments({
      status: 'PUBLISHED',
      cursor: data?.cursor,
    })

    return {
      nextCursor: response.nextCursor,
      data: toArticles(response.data),
    }
  })

export const getRecentPublishedArticles = createServerFn({ method: 'GET' })
  .handler(async () => {
    const response = await listPublishedDocuments(RECENT_WORK_LIMIT)
    return toArticles(response).slice(0, RECENT_WORK_LIMIT)
  })

export const getPublishedArticleBySlug = createServerFn({ method: 'GET' })
  .inputValidator((input: { slug: string }) => {
    return input
  })
  .handler(async ({ data }) => {
    const post = await getPostBySlug(data.slug)
    const article = toArticle(post)
    if (!article) {
      throw new Error(`Post ${data.slug} is missing required fields`)
    }
    return article
  })
