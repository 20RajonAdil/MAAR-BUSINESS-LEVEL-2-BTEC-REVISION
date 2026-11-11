import { Fragment, type ReactNode } from 'react'

/** Renders **bold** inline markup. */
export function inline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : <Fragment key={i}>{p}</Fragment>,
  )
}

export function plain(text: string): string {
  return text.replace(/\*\*/g, '')
}
