import { useEffect, useMemo, useRef, useState } from 'react'
import type { Subject } from '../types'
import { searchSubject, type Hit } from '../lib/search'
import { go, paths } from '../lib/router'

const KIND: Record<Hit['kind'], string> = { topic: 'Topic', slide: 'Slide', definition: 'Definition', formula: 'Formula' }

export function SearchModal({ subject, onClose }: { subject: Subject; onClose: () => void }) {
  const [q, setQ] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const hits = useMemo(() => searchSubject(subject, q), [subject, q])
  useEffect(() => {
    input.current?.focus()
    const on = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [onClose])

  const open = (h: Hit) => {
    onClose()
    if (h.kind === 'slide') go(paths.learn(subject.id, h.topicId, h.slide ?? 0))
    else if (h.kind === 'topic') go(paths.learn(subject.id, h.topicId, 0))
    else go(paths.revise(subject.id, h.title))
  }

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={`Search ${subject.name}`} onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="search-box">
        <div className="search-top">
          <input ref={input} type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={`Search ${subject.name}: definitions, formulas, topics…`} aria-label="Search" />
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
        <div className="search-results" aria-live="polite">
          {!q.trim() && <p className="muted pad">Try “break-even”, “gross profit”, “working capital”, “margin of safety”…</p>}
          {q.trim() && !hits.length && <p className="muted pad">No results for “{q}”.</p>}
          <ul>
            {hits.map((h, i) => (
              <li key={i}>
                <button className="hit" onClick={() => open(h)}>
                  <span className={`kind kind-${h.kind}`}>{KIND[h.kind]}</span>
                  <span className="hit-main"><strong>{h.title}</strong><span className="hit-snip">{h.snippet}</span>
                    <span className="hit-topic">{h.topicTitle}{h.kind === 'slide' && h.slide !== undefined ? ` · slide ${h.slide + 1}` : ''}</span></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
