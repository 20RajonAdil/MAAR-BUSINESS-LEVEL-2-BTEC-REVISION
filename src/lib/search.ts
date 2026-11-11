import type { Block, Subject } from '../types'
import { plain } from './text'

export interface Hit {
  kind: 'topic' | 'slide' | 'definition' | 'formula'
  title: string
  snippet: string
  topicId: string
  topicTitle: string
  slide?: number
  score: number
}

function blockText(b: Block): string {
  switch (b.t) {
    case 'p': return b.text
    case 'list': return b.items.join(' ')
    case 'formula': return `${b.name} ${b.formula} ${(b.vars ?? []).map(v => v.join(' ')).join(' ')}`
    case 'example': return `${b.title ?? ''} ${b.steps.join(' ')} ${b.result ?? ''}`
    case 'table': return `${b.head.join(' ')} ${b.rows.map(r => r.join(' ')).join(' ')} ${b.caption ?? ''}`
    case 'callout': return `${b.title ?? ''} ${b.text}`
    case 'terms': return b.items.map(i => i.join(' ')).join(' ')
    case 'compare': return `${b.left.title} ${b.left.items.join(' ')} ${b.right.title} ${b.right.items.join(' ')}`
    case 'chart': return b.caption ?? ''
  }
}

const norm = (s: string) => plain(s).toLowerCase().replace(/[^a-z0-9£%.\s-]/g, ' ').replace(/\s+/g, ' ').trim()

function snippet(text: string, terms: string[]): string {
  const t = plain(text).replace(/\s+/g, ' ')
  const low = t.toLowerCase()
  const at = Math.max(0, Math.min(...terms.map(x => low.indexOf(x)).filter(i => i >= 0)))
  const start = Math.max(0, at - 30)
  return (start > 0 ? '…' : '') + t.slice(start, start + 120) + (t.length > start + 120 ? '…' : '')
}

export function searchSubject(subject: Subject, query: string): Hit[] {
  const terms = norm(query).split(' ').filter(Boolean)
  if (!terms.length) return []
  const hits: Hit[] = []
  const score = (title: string, body: string): number => {
    const t = norm(title), b = norm(body)
    let s = 0
    for (const w of terms) {
      if (t.includes(w)) s += 5
      if (b.includes(w)) s += 1
      else if (!t.includes(w)) return 0 // every term must appear somewhere
    }
    return s
  }
  for (const topic of subject.topics) {
    const ts = score(topic.title, topic.summary)
    if (ts) hits.push({ kind: 'topic', title: topic.title, snippet: topic.summary, topicId: topic.id, topicTitle: topic.title, score: ts + 3 })
    topic.slides.forEach((s, i) => {
      const body = s.blocks.map(blockText).join(' ')
      const sc = score(s.title, body)
      if (sc) hits.push({ kind: 'slide', title: s.title, snippet: snippet(body, terms), topicId: topic.id, topicTitle: topic.title, slide: i, score: sc })
    })
  }
  for (const d of subject.quick?.definitions ?? []) {
    const sc = score(d.term, d.definition)
    if (sc) hits.push({ kind: 'definition', title: d.term, snippet: d.definition, topicId: d.topicId, topicTitle: subject.topics.find(t => t.id === d.topicId)?.title ?? '', score: sc + 2 })
  }
  for (const f of subject.quick?.formulas ?? []) {
    const sc = score(f.name, `${f.formula} ${f.vars.map(v => v.join(' ')).join(' ')}`)
    if (sc) hits.push({ kind: 'formula', title: f.name, snippet: f.formula, topicId: f.topicId, topicTitle: subject.topics.find(t => t.id === f.topicId)?.title ?? '', score: sc + 2 })
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 30)
}
