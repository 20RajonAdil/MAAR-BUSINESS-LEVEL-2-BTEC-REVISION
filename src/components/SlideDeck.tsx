import { useEffect, useRef } from 'react'
import type { Topic } from '../types'
import { BlockView } from './Blocks'
import { go, paths } from '../lib/router'
import { useProgress } from '../lib/store'

export function SlideDeck({ subjectId, topic, index }: { subjectId: string; topic: Topic; index: number }) {
  const total = topic.slides.length
  const finished = index >= total
  const i = Math.max(0, Math.min(index, total))
  const frame = useRef<HTMLElement>(null)
  const { markViewed } = useProgress()

  const testPath = topic.customTest ? paths.formulas(subjectId) : paths.quiz(subjectId, topic.id)
  const goTo = (n: number) => go(paths.learn(subjectId, topic.id, Math.max(0, Math.min(n, total))))

  useEffect(() => { if (i < total) markViewed(topic.id, i) }, [i, total, topic.id, markViewed])
  useEffect(() => { frame.current?.focus({ preventScroll: true }) }, [i, topic.id])
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t && /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return
      if (e.key === 'ArrowRight') goTo(i + 1)
      if (e.key === 'ArrowLeft') goTo(i - 1)
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  })

  // simple swipe support for phones/tablets
  const touch = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { touch.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touch.current === null) return
    const dx = e.changedTouches[0].clientX - touch.current
    touch.current = null
    if (Math.abs(dx) > 70) goTo(i + (dx < 0 ? 1 : -1))
  }

  const pct = Math.round(((finished ? total : i + 1) / total) * 100)
  const slide = finished ? null : topic.slides[i]

  return (
    <div className="deck-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <a href={`#/${subjectId}`}>← All topics</a>
        <span aria-hidden="true">/</span>
        <span>{topic.number}. {topic.title}</span>
      </nav>

      <section className="deck" ref={frame} tabIndex={-1} aria-label={`${topic.title} presentation`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <header className="deck-head">
          <div className="deck-topic"><span className="deck-icon" aria-hidden="true">{topic.icon}</span>{topic.title}</div>
          <div className="deck-count" aria-live="polite">{finished ? 'Finished' : `Slide ${i + 1} of ${total}`}</div>
        </header>
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Slide progress"><div style={{ width: `${pct}%` }} /></div>

        <div className="deck-body">
          {slide ? (
            <>
              <h2 className="slide-title">{slide.title}</h2>
              <div className="slide-content">{slide.blocks.map((b, k) => <BlockView key={k} b={b} />)}</div>
            </>
          ) : (
            <div className="finish">
              <div className="finish-emoji" aria-hidden="true">🎓</div>
              <h2 className="slide-title">You’ve finished “{topic.title}”</h2>
              <p>Learn → Understand → <strong>Test my knowledge</strong> → Check results → Revise → Try again.</p>
              <button className="btn btn-gold btn-xl" onClick={() => go(testPath)}>TEST MY KNOWLEDGE</button>
              <p className="muted">{topic.customTest ? 'A randomised test of all 11 formulas, repeated 3 times for your personal improvement report' : `${topic.questions.length} questions on this topic`}</p>
              <button className="btn btn-ghost" onClick={() => goTo(0)}>Review the slides again</button>
            </div>
          )}
        </div>

        <footer className="deck-foot">
          <button className="btn btn-ghost" onClick={() => goTo(i - 1)} disabled={i === 0}>← Previous</button>
          <div className="dots" aria-hidden="true">
            {topic.slides.map((_, k) => <button key={k} tabIndex={-1} className={k === i ? 'on' : k < i ? 'done' : ''} onClick={() => goTo(k)} />)}
          </div>
          {finished
            ? <button className="btn btn-gold" onClick={() => go(testPath)}>Test my knowledge →</button>
            : i === total - 1
              ? <button className="btn btn-gold" onClick={() => goTo(total)}>Finish →</button>
              : <button className="btn btn-primary" onClick={() => goTo(i + 1)}>Next →</button>}
        </footer>
      </section>
    </div>
  )
}
