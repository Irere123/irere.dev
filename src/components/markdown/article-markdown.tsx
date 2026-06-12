import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import { createArticleMarkdownComponents } from './markdown-components'
import { createHeadingIdFactory } from './toc-utils'

// The CMS embeds inline HTML in its markdown (styled spans, <u>, <br>, …). rehype-raw
// parses that into real elements instead of literal text, and rehype-sanitize then strips
// anything unsafe or presentational (scripts, event handlers, inline styles) so arbitrary
// CMS output can never break the page or its typography.
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...new Set([...(defaultSchema.tagNames ?? []), 'u', 'mark', 'kbd'])],
  attributes: {
    ...defaultSchema.attributes,
    // Keep language hints on fenced code blocks so block vs inline rendering still works.
    code: [['className', /^language-./]],
  },
}

interface ArticleMarkdownProps {
  markdown: string
}

export function ArticleMarkdown({ markdown }: ArticleMarkdownProps) {
  const components = useMemo(() => {
    const getHeadingId = createHeadingIdFactory()
    return createArticleMarkdownComponents({ getHeadingId })
  }, [markdown])

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
    >
      {markdown}
    </ReactMarkdown>
  )
}
