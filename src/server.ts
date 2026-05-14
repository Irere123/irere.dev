import type { Register } from '@tanstack/react-router'
import type { RequestHandler } from '@tanstack/react-start/server'
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'

const handleRequest = createStartHandler(defaultStreamHandler)

const acceptsHtml = (request: Request) => {
  const accept = request.headers.get('accept') ?? ''
  return accept.includes('text/html') || accept.includes('*/*')
}

const isIncompleteRouterShell = (html: string) => {
  return !html.includes('<!DOCTYPE html') && html.includes('$_TSR.router')
}

const responseFromHtml = (html: string, response: Response) => {
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  })
}

const fetch: RequestHandler<Register> = async (request, opts) => {
  if (request.method !== 'GET' || !acceptsHtml(request)) {
    return handleRequest(request, opts)
  }

  const clonedRequest = request.clone() as Parameters<typeof handleRequest>[0]
  const response = await handleRequest(clonedRequest, opts)
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('text/html')) {
    return response
  }

  const html = await response.text()

  if (!isIncompleteRouterShell(html)) {
    return responseFromHtml(html, response)
  }

  return handleRequest(request, opts)
}

export default { fetch }
