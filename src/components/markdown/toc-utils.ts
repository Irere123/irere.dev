export type TocHeadingLevel = 2 | 3

export interface TocItem {
  id: string
  title: string
  level: TocHeadingLevel
}

function stripInlineMarkdown(value: string) {
  return value
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/!\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function createHeadingIdFactory() {
  const seen = new Map<string, number>()

  return (rawTitle: string) => {
    const cleaned = stripInlineMarkdown(rawTitle)
    const base = slugify(cleaned) || 'section'
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)

    return count === 0 ? base : `${base}-${count}`
  }
}

export function extractTableOfContents(markdown: string) {
  const nextHeadingId = createHeadingIdFactory()
  const items: TocItem[] = []
  const headingRegex = /^\s{0,3}(#{2,3})\s+(.+?)\s*#*\s*$/gm

  for (const match of markdown.matchAll(headingRegex)) {
    const hashes = match[1]
    const rawTitle = match[2]
    const level = hashes.length as TocHeadingLevel
    const title = stripInlineMarkdown(rawTitle)

    if (!title) {
      continue
    }

    items.push({
      id: nextHeadingId(title),
      title,
      level,
    })
  }

  return items
}
