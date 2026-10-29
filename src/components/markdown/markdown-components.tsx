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
      className='text-gray-500 underline decoration-gray-300 underline-offset-[0.15em] transition-colors hover:text-gray-900 hover:decoration-gray-500'
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
      <h1
        className='mt-12 mb-5 text-2xl/[1.4] font-semibold text-balance text-gray-900 first:mt-0'
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => {
      const id = getHeadingId(getTextFromReactNode(children))
      return (
        <h2
          id={id}
          className='mt-12 mb-5 scroll-mt-28 text-2xl/[1.4] font-semibold text-balance text-gray-900 first:mt-0'
          {...props}
        >
          {children}
        </h2>
      )
    },
    h3: ({ children, ...props }) => {
      const id = getHeadingId(getTextFromReactNode(children))
      return (
        <h3
          id={id}
          className='mt-10 mb-4 scroll-mt-28 text-xl/[1.4] font-semibold text-balance text-gray-900 first:mt-0'
          {...props}
        >
          {children}
        </h3>
      )
    },
    h4: ({ children, ...props }) => (
      <h4 className='mt-8 mb-3 font-semibold text-gray-900 first:mt-0' {...props}>
        {children}
      </h4>
    ),
    p: (props) => <p className='mb-6 break-words text-pretty' {...props} />,
    ul: (props) => <ul className='mb-6 list-disc pl-8' {...props} />,
    ol: (props) => <ol className='mb-6 list-decimal pl-8' {...props} />,
    li: (props) => <li className='mb-1 break-words [&>p]:mb-0' {...props} />,
    img: ({ alt, ...props }) => (
      <img
        alt={alt ?? ''}
        loading='lazy'
        className='my-6 w-full rounded-lg object-cover'
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className='mb-6 border-l-2 border-gray-300 pl-5 text-gray-600 [&>:last-child]:mb-0'
        {...props}
      />
    ),
    hr: (props) => <hr className='my-10 border-gray-200' {...props} />,
    a: MarkdownLink,
    pre: (props) => (
      <pre
        className='mb-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100 [&_code]:text-inherit'
        {...props}
      />
    ),
    code: ({ className, ...props }) => {
      const isCodeBlock = Boolean(className)
      const codeClassName = isCodeBlock
        ? `font-mono text-sm ${className}`
        : 'font-mono text-[0.9em] text-gray-900'

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
