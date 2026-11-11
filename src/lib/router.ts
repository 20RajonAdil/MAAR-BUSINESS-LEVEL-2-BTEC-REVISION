import { useEffect, useState } from 'react'

export interface Route {
  subject: string
  page: 'home' | 'learn' | 'quiz' | 'results' | 'revise' | 'exam' | 'formulas'
  topic?: string
  slide?: number
  find?: string
}

export function parseHash(hash: string): Route {
  const [path, query = ''] = hash.replace(/^#\/?/, '').split('?')
  const parts = path.split('/').filter(Boolean)
  const params = new URLSearchParams(query)
  const subject = parts[0] || 'finance'
  const page = parts[1]
  if (page === 'learn' && parts[2]) return { subject, page: 'learn', topic: parts[2], slide: Number(parts[3] ?? 0) || 0 }
  if (page === 'quiz' && parts[2]) return { subject, page: 'quiz', topic: parts[2] }
  if (page === 'results' && parts[2]) return { subject, page: 'results', topic: parts[2] }
  if (page === 'revise') return { subject, page: 'revise', find: params.get('find') ?? undefined }
  if (page === 'exam') return { subject, page: 'exam' }
  if (page === 'formulas') return { subject, page: 'formulas' }
  return { subject, page: 'home' }
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
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  useEffect(() => {
    const on = () => { setRoute(parseHash(window.location.hash)); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}
