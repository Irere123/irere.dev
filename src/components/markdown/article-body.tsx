import type { Nodes, Root } from 'hast'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { sanitize } from 'hast-util-sanitize'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { useMemo } from 'react'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'

import type { Article } from '@/lib/work'
import { ArticleMarkdown, sanitizeSchema } from './article-markdown'
import { createArticleMarkdownComponents } from './markdown-components'
import { createHeadingIdFactory, extractTableOfContents, type TocItem } from './toc-utils'

function getText(node: Nodes): string {
  if (node.type === 'text') {
    return node.value
  }
  return 'children' in node ? node.children.map(getText).join('') : ''
}

// The API serves article bodies as HTML. Sanitize it with the same schema as markdown, then
// give h2/h3 the ids the table of contents links to — on the tree, so ids never depend on
// how many times React renders the headings.
function parseArticleHtml(html: string) {
  const tree = sanitize(fromHtmlIsomorphic(html, { fragment: true }), sanitizeSchema) as Root
  const getHeadingId = createHeadingIdFactory()
  const headings: TocItem[] = []

  const visit = (node: Nodes) => {
    if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
      const title = getText(node).trim()
      if (title) {
        const id = getHeadingId(title)
        node.properties.id = id
        headings.push({ id, title, level: node.tagName === 'h2' ? 2 : 3 })
      }
      return
    }
    if ('children' in node) {
      node.children.forEach(visit)
    }
  }

  visit(tree)
  return { tree, headings }
}

export function getArticleTableOfContents(article: Article): TocItem[] {
  return article.contentFormat === 'html'
    ? parseArticleHtml(article.content).headings
    : extractTableOfContents(article.content)
}

function ArticleHtml({ html }: { html: string }) {
  return useMemo(() => {
    const { tree } = parseArticleHtml(html)
    const components = createArticleMarkdownComponents({ getHeadingId: createHeadingIdFactory() })
    return toJsxRuntime(tree, { Fragment, jsx, jsxs, components })
  }, [html])
}

export function ArticleBody({ article }: { article: Article }) {
  return article.contentFormat === 'html' ? (
    <ArticleHtml html={article.content} />
  ) : (
    <ArticleMarkdown markdown={article.content} />
  )
}
