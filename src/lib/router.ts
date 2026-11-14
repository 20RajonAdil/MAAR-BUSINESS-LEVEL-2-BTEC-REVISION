import { useEffect, useState } from 'react'
import { getSubject } from '../data/subjects'
import { MIXED } from './exam'

export interface Route {
  subject: string
  page: 'home' | 'learn' | 'quiz' | 'results' | 'revise' | 'exam' | 'formulas' | 'progress' | 'notfound'
  topic?: string
  slide?: number
  find?: string
}

const NOT_FOUND: Route = { subject: 'finance', page: 'notfound' }

/** Strict: anything that is not exactly one of the site's addresses is a 404 (extra segments, unknown pages, a non-numeric slide). */
export function parseHash(hash: string): Route {
  const [path, query = ''] = hash.replace(/^#\/?/, '').split('?')
  const parts = path.split('/').filter(Boolean)
  const params = new URLSearchParams(query)
  if (!parts.length) return { subject: 'finance', page: 'home' }
  const subject = parts[0]
  const page = parts[1]
  if (parts.length === 1) return { subject, page: 'home' }
  if (page === 'learn' && parts.length >= 3 && parts.length <= 4) {
    if (parts[3] !== undefined && !/^\d+$/.test(parts[3])) return NOT_FOUND
    return { subject, page: 'learn', topic: parts[2], slide: Number(parts[3] ?? 0) }
  }
  if ((page === 'quiz' || page === 'results') && parts.length === 3) return { subject, page, topic: parts[2] }
  if (parts.length === 2) {
    if (page === 'revise') return { subject, page: 'revise', find: params.get('find') ?? undefined }
    if (page === 'exam' || page === 'formulas' || page === 'progress') return { subject, page }
  }
  return NOT_FOUND
}

/** Checks a parsed route against the real content: unknown subject, topic, or slide number is a 404. */
export function resolveRoute(r: Route): Route {
  if (r.page === 'notfound') return r
  const s = getSubject(r.subject)
  if (!s) return NOT_FOUND
  const topic = s.topics.find(t => t.id === r.topic)
  switch (r.page) {
    case 'learn': return topic && (r.slide ?? 0) < topic.slides.length ? r : NOT_FOUND
    case 'quiz': return topic || r.topic === MIXED ? r : NOT_FOUND
    case 'results': return topic || r.topic === MIXED ? r : NOT_FOUND
    case 'formulas': return s.topics.some(t => t.customTest) ? r : NOT_FOUND
    default: return r
  }
}

export function go(path: string) {
  window.location.hash = path.startsWith('#') ? path : '#/' + path.replace(/^\//, '')
}

export const paths = {
  home: (s: string) => `${s}`,
  learn: (s: string, topic: string, slide = 0) => `${s}/learn/${topic}/${slide}`,
  quiz: (s: string, topic: string) => `${s}/quiz/${topic}`,
  results: (s: string, topic: string) => `${s}/results/${topic}`,
  revise: (s: string, find?: string) => `${s}/revise${find ? `?find=${encodeURIComponent(find)}` : ''}`,
  exam: (s: string) => `${s}/exam`,
  formulas: (s: string) => `${s}/formulas`,
  progress: (s: string) => `${s}/progress`,
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => resolveRoute(parseHash(window.location.hash)))
  useEffect(() => {
    const on = () => { setRoute(resolveRoute(parseHash(window.location.hash))); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}
