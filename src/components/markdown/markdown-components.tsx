import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { Components } from 'react-markdown'

type AnchorProps = ComponentPropsWithoutRef<'a'>

interface ArticleMarkdownComponentOptions {
  getHeadingId: (title: string) => string
}

function getTextFromReactNode(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(getTextFromReactNode).join('')
  }

  if (node && typeof node === 'object' && 'props' in node) {
    return getTextFromReactNode((node as { props?: { children?: ReactNode } }).props?.children)
  }

  return ''
}

function MarkdownLink({ href, children, ...props }: AnchorProps) {
  const isExternal = Boolean(href?.startsWith('http'))

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className='font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600'
      {...props}
    >
      {children}
    </a>
  )
}

export function createArticleMarkdownComponents({
  getHeadingId,
}: ArticleMarkdownComponentOptions): Components {
  return {
    h1: ({ children, ...props }) => (
      <h1 className='mt-8 text-3xl font-semibold text-gray-900' {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => {
      const id = getHeadingId(getTextFromReactNode(children))
      return (
        <h2 id={id} className='mt-8 scroll-mt-28 text-2xl font-semibold text-gray-900' {...props}>
          {children}
        </h2>
      )
    },
    h3: ({ children, ...props }) => {
      const id = getHeadingId(getTextFromReactNode(children))
      return (
        <h3 id={id} className='mt-6 scroll-mt-28 text-xl font-semibold text-gray-900' {...props}>
          {children}
        </h3>
      )
    },
    p: (props) => <p className='leading-7 text-gray-800' {...props} />,
    ul: (props) => <ul className='my-5 list-disc pl-6 text-gray-800' {...props} />,
    ol: (props) => <ol className='my-5 list-decimal pl-6 text-gray-800' {...props} />,
    li: (props) => <li className='my-1.5' {...props} />,
    blockquote: (props) => (
      <blockquote
        className='my-6 border-l-4 border-gray-300 pl-4 text-base text-gray-700 italic'
        {...props}
      />
    ),
    hr: (props) => <hr className='my-8 border-gray-200' {...props} />,
    a: MarkdownLink,
    pre: (props) => (
      <pre
        className='my-6 overflow-x-auto rounded-lg border border-gray-200 bg-gray-900 p-4 text-sm text-gray-100'
        {...props}
      />
    ),
    code: ({ className, ...props }) => {
      const isCodeBlock = Boolean(className)
      const codeClassName = isCodeBlock
        ? `font-mono text-sm ${className}`
        : 'rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-900'

      return <code className={codeClassName} {...props} />
    },
    table: (props) => (
      <div className='my-6 overflow-x-auto'>
        <table className='min-w-full border-collapse border border-gray-200 text-sm' {...props} />
      </div>
    ),
    thead: (props) => <thead className='bg-gray-100' {...props} />,
    tbody: (props) => <tbody className='bg-white' {...props} />,
    tr: (props) => <tr className='border-b border-gray-200' {...props} />,
    th: (props) => (
      <th
        className='border border-gray-200 px-3 py-2 text-left font-semibold text-gray-900'
        {...props}
      />
    ),
    td: (props) => <td className='border border-gray-200 px-3 py-2 text-gray-800' {...props} />,
  }
}
