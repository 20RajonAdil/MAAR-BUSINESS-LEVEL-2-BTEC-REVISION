import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Subject } from '../types'
import { searchSubject, type Hit } from '../lib/search'
import { go, paths } from '../lib/router'
import { Icon } from './Icon'

type Filter = 'all' | Hit['kind']
const KIND: Record<Hit['kind'], { label: string; icon: string }> = {
  topic: { label: 'Topic', icon: 'grid' }, slide: { label: 'Slide', icon: 'book' }, definition: { label: 'Definition', icon: 'bulb' }, formula: { label: 'Formula', icon: 'sigma' },
}
const FILTERS: [Filter, string][] = [['all', 'All'], ['slide', 'Slides'], ['definition', 'Definitions'], ['formula', 'Formulas'], ['topic', 'Topics']]
const RECENT_KEY = (s: string) => `maar-btec-recent:${s}`

function loadRecent(s: string): string[] { try { return JSON.parse(localStorage.getItem(RECENT_KEY(s)) || '[]') } catch { return [] } }
function saveRecent(s: string, list: string[]) { try { localStorage.setItem(RECENT_KEY(s), JSON.stringify(list.slice(0, 6))) } catch { /* storage unavailable */ } }

function highlight(text: string, terms: string[]): ReactNode {
  if (!terms.length) return text
  const rx = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'ig')
  return text.split(rx).map((p, i) => (i % 2 === 1 ? <mark key={i}>{p}</mark> : <Fragment key={i}>{p}</Fragment>))
}

export function SearchModal({ subject, onClose }: { subject: Subject; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [active, setActive] = useState(0)
  const [recent, setRecent] = useState<string[]>(() => loadRecent(subject.id))
  const input = useRef<HTMLInputElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)

  const all = useMemo(() => searchSubject(subject, q), [subject, q])
  const hits = useMemo(() => (filter === 'all' ? all : all.filter(h => h.kind === filter)), [all, filter])
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: all.length }
    for (const h of all) c[h.kind] = (c[h.kind] ?? 0) + 1
    return c
  }, [all])
  const terms = useMemo(() => q.toLowerCase().split(/\s+/).filter(Boolean), [q])

  // lock page scroll behind the sheet, keep the sheet above the on-screen keyboard
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    input.current?.focus()
    const vv = window.visualViewport
    const fit = () => overlay.current?.style.setProperty('--vvh', `${vv?.height ?? window.innerHeight}px`)
    fit()
    vv?.addEventListener('resize', fit)
    return () => { document.body.style.overflow = prev; vv?.removeEventListener('resize', fit) }
  }, [])
  useEffect(() => { setActive(0) }, [q, filter])
  useEffect(() => { list.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' }) }, [active])

  const remember = (term: string) => {
    const t = term.trim()
    if (t.length < 2) return
    const next = [t, ...recent.filter(r => r.toLowerCase() !== t.toLowerCase())].slice(0, 6)
    setRecent(next); saveRecent(subject.id, next)
  }
  const open = (h: Hit) => {
    remember(q)
    onClose()
    if (h.kind === 'slide') go(paths.learn(subject.id, h.topicId, h.slide ?? 0))
    else if (h.kind === 'topic') go(paths.learn(subject.id, h.topicId, 0))
    else go(paths.revise(subject.id, h.title))
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(hits.length - 1, a + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(0, a - 1)) }
    else if (e.key === 'Enter' && hits[active]) { e.preventDefault(); open(hits[active]) }
  }

  const empty = !q.trim()
  return (
    <div className="overlay" ref={overlay} role="dialog" aria-modal="true" aria-label={`Search ${subject.name}`} onKeyDown={onKey} onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="search-box">
        <div className="search-top">
          <button className="icon-btn-light" onClick={onClose} aria-label="Close search"><Icon name="arrow-left" size={22} /></button>
          <div className="search-field">
            <Icon name="search" size={19} className="sf-ic" />
            <input ref={input} type="search" inputMode="search" enterKeyHint="search" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
              value={q} onChange={e => setQ(e.target.value)} placeholder={`Search ${subject.name}…`} aria-label={`Search ${subject.name}`} />
            {q && <button className="sf-clear" onClick={() => { setQ(''); input.current?.focus() }} aria-label="Clear search"><Icon name="x" size={16} strokeWidth={2.6} /></button>}
          </div>
          <button className="search-cancel" onClick={onClose}>Cancel</button>
        </div>

        {!empty && (
          <div className="chips" role="tablist" aria-label="Filter results">
            {FILTERS.map(([id, label]) => (
              <button key={id} role="tab" aria-selected={filter === id} className={`chip-f${filter === id ? ' on' : ''}`} onClick={() => setFilter(id)} disabled={id !== 'all' && !counts[id]}>
                {label}<span>{counts[id] ?? 0}</span>
              </button>
            ))}
          </div>
        )}

        <div className="search-results">
          {empty ? (
            <div className="search-home">
              {recent.length > 0 && (
                <section>
                  <div className="sh-head"><h3>Recent</h3><button className="link" onClick={() => { setRecent([]); saveRecent(subject.id, []) }}>Clear</button></div>
                  <ul className="recent">
                    {recent.map(r => (
                      <li key={r}><button className="recent-row" onClick={() => setQ(r)}><Icon name="history" size={18} /><span>{r}</span><Icon name="arrow-right" size={16} className="rr-go" /></button></li>
                    ))}
                  </ul>
                </section>
              )}
              <section>
                <div className="sh-head"><h3>Try searching for</h3></div>
                <div className="suggest">{(subject.suggestions ?? []).map(s => <button key={s} className="sugg" onClick={() => setQ(s)}><Icon name="search" size={14} />{s}</button>)}</div>
              </section>
              <p className="muted small sh-note">Searches slides, definitions, formulas and topics. Works offline.</p>
            </div>
          ) : hits.length === 0 ? (
            <div className="search-none"><Icon name="search" size={34} strokeWidth={1.5} /><strong>No results for “{q}”</strong><span className="muted">Try a shorter word, e.g. “profit” or “market”.</span></div>
          ) : (
            <>
              <p className="sr-only" aria-live="polite">{hits.length} results</p>
              <ul ref={list} className="hits">
                {hits.map((h, i) => (
                  <li key={`${h.kind}-${h.topicId}-${h.slide ?? ''}-${h.title}-${i}`}>
                    <button data-i={i} className={`hit${i === active ? ' active' : ''}`} onClick={() => open(h)} onMouseMove={() => setActive(i)}>
                      <span className={`kind kind-${h.kind}`}><Icon name={KIND[h.kind].icon} size={18} /></span>
                      <span className="hit-main">
                        <span className="hit-title"><span className="ht">{highlight(h.title, terms)}</span><em>{KIND[h.kind].label}</em></span>
                        <span className="hit-snip">{highlight(h.snippet, terms)}</span>
                        <span className="hit-topic">{h.topicTitle}{h.kind === 'slide' && h.slide !== undefined ? ` · slide ${h.slide + 1}` : ''}</span>
                      </span>
                      <Icon name="chevron" size={18} className="hit-go" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="search-foot" aria-hidden="true"><kbd>↑</kbd><kbd>↓</kbd> to move <kbd>Enter</kbd> to open <kbd>Esc</kbd> to close</div>
      </div>
    </div>
  )
}
