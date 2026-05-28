import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'

import { fetchArticleBySlug, fetchArticlesPage, fetchRecentArticles } from '@/lib/articles-api'

export function archiveArticlesInfiniteQueryOptions() {
  return infiniteQueryOptions({
    queryKey: ['articles', 'archive', 'infinite'],
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      try {
        return await fetchArticlesPage({ data: pageParam })
      } catch (error) {
        console.error('Failed to fetch archive articles page', {
          hasCursor: Boolean(pageParam),
          error,
        })
        throw error
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 90_000,
    gcTime: 30 * 60_000,
    retry: 2,
  })
}

export function recentArticlesQueryOptions() {
  return queryOptions({
    queryKey: ['articles', 'recent', 'five'],
    queryFn: async () => {
      try {
        return await fetchRecentArticles()
      } catch (error) {
        console.error('Failed to fetch recent published articles', { error })
        return []
      }
    },
    staleTime: 45_000,
    gcTime: 30 * 60_000,
    retry: 2,
  })
}

export function articleBySlugQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ['articles', 'detail', slug],
    queryFn: async () => {
      try {
        return await fetchArticleBySlug({ data: slug })
      } catch (error) {
        console.error('Failed to fetch article by slug', { slug, error })
        return null
      }
    },
    staleTime: 90_000,
    gcTime: 30 * 60_000,
    retry: 2,
  })
}
