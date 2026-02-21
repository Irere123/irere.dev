import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { createArticleMarkdownComponents } from './markdown-components'
import { createHeadingIdFactory } from './toc-utils'

interface ArticleMarkdownProps {
  markdown: string
}

export function ArticleMarkdown({ markdown }: ArticleMarkdownProps) {
  const components = useMemo(() => {
    const getHeadingId = createHeadingIdFactory()
    return createArticleMarkdownComponents({ getHeadingId })
  }, [markdown])

  return (
    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
      {markdown}
    </ReactMarkdown>
  )
}
