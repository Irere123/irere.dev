import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const articles = defineCollection({
  name: 'articles',
  directory: 'content/articles',
  include: '**/*.md',
  parser: 'frontmatter',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.string(),
    isNew: z.boolean().optional(),
    content: z.string(),
  }),
  transform: (document) => ({
    ...document,
    slug: document._meta.path,
  }),
})

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '**/*.md',
  parser: 'frontmatter',
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    startedAt: z.string(),
    status: z.enum(['active', 'failed']),
    href: z.string().url().optional(),
    content: z.string(),
  }),
  transform: (document) => ({
    ...document,
    slug: document._meta.path,
  }),
})

export default defineConfig({
  content: [articles, projects],
})