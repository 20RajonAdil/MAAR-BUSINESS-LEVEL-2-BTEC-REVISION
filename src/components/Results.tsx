import type { Subject } from '../types'
import { go, paths } from '../lib/router'
import { loadResult } from '../lib/store'
import { MIXED, allQuestions } from '../lib/exam'
import { correctAnswerText } from '../lib/check'
import { QuestionBody } from './Quiz'
import { inline } from '../lib/text'
import { useState } from 'react'
import { Icon } from './Icon'

export function Results({ subject, topicId }: { subject: Subject; topicId: string }) {
  const res = loadResult(topicId === MIXED ? `${MIXED}:${subject.id}` : topicId)
  const [open, setOpen] = useState<string | null>(null)
  const isMixed = topicId === MIXED
  const topic = subject.topics.find(t => t.id === topicId)
  if (!res) return <div className="empty"><p>No results yet for this test.</p><a className="btn btn-primary" href={`#/${subject.id}`}>Back to topics</a></div>

  const byId = allQuestions(subject)
  const items = res.items.filter(i => byId[i.qid])
  const total = items.length
  const correct = items.filter(i => i.correct).length
  const wrong = total - correct
  const pct = total ? Math.round((correct / total) * 100) : 0
  const grade = pct >= 85 ? 'Excellent' : pct >= 70 ? 'Pass level' : pct >= 50 ? 'Getting there' : 'Needs more revision'

  const missedByTopic = new Map<string, { slides: Set<number>; count: number }>()
  for (const i of items) if (!i.correct) {
    const q = byId[i.qid]
    const e = missedByTopic.get(q.topicId) ?? { slides: new Set<number>(), count: 0 }
    e.slides.add(q.slide); e.count++
    missedByTopic.set(q.topicId, e)
  }

  return (
    <div className="results">
      <nav className="crumbs" aria-label="Breadcrumb"><a href={`#/${subject.id}`}><Icon name="arrow-left" size={15} /> All topics</a><span aria-hidden="true">/</span><span>Results</span></nav>
      <section className="score-card">
        <p className="eyebrow">{isMixed ? 'Mixed practice exam' : topic?.title}</p>
        <div className="score-ring" style={{ ['--pct' as string]: `${pct}%` }}><span>{pct}%</span></div>
        <h1>{correct} / {total} correct</h1>
        <p className="grade">{grade}</p>
        <div className="score-stats">
          <div className="stat ok"><strong>{correct}</strong><span>Correct</span></div>
          <div className="stat no"><strong>{wrong}</strong><span>Incorrect</span></div>
          <div className="stat"><strong>{missedByTopic.size}</strong><span>Topics to revise</span></div>
        </div>
        <div className="score-actions">
          <button className="btn btn-gold" onClick={() => go(isMixed ? paths.exam(subject.id) : paths.quiz(subject.id, topicId))}><Icon name="refresh" size={18} /> Try again</button>
          {!isMixed && <button className="btn btn-primary" onClick={() => go(paths.learn(subject.id, topicId, 0))}>Revisit the presentation</button>}
          <button className="btn btn-outline" onClick={() => go(paths.progress(subject.id))}>Progress check</button>
          <button className="btn btn-outline" onClick={() => go(paths.home(subject.id))}>Topic menu</button>
        </div>
      </section>

      {missedByTopic.size > 0 ? (
        <section>
          <h2 className="section-title">Topics requiring further revision</h2>
          <ul className="revise-list">
            {[...missedByTopic.entries()].map(([tid, e]) => {
              const t = subject.topics.find(x => x.id === tid)!
              const first = Math.min(...e.slides)
              return (
                <li key={tid} className="revise-item">
                  <div><strong className="with-ic"><Icon name={t.icon} size={18} /> {t.title}</strong><div className="muted small">{e.count} question{e.count > 1 ? 's' : ''} missed · start with “{t.slides[first]?.title}”</div></div>
                  <button className="btn btn-gold" onClick={() => go(paths.learn(subject.id, tid, first))}>REVISE THIS TOPIC</button>
                </li>
              )
            })}
          </ul>
        </section>
      ) : <div className="callout-win"><Icon name="trophy" size={22} /> Perfect score: no topics need extra revision.</div>}

      <section>
        <h2 className="section-title">Your answers</h2>
        <ul className="review">
          {items.map((it, n) => {
            const q = byId[it.qid]
            const isOpen = open === it.qid
            return (
              <li key={it.qid} className={`review-item ${it.correct ? 'ok' : 'no'}`}>
                <button className="review-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : it.qid)}>
                  <span className="fb-icon" aria-hidden="true"><Icon name={it.correct ? 'check' : 'x'} size={16} strokeWidth={3.2} /></span>
                  <span className="review-q">{n + 1}. {q.prompt.replace(/\*\*/g, '')}</span>
                  <span className="muted small">{it.correct ? 'Correct' : 'Incorrect'}</span>
                </button>
                {isOpen && (
                  <div className="review-body">
                    <QuestionBody q={q} subject={subject} />
                    <p><strong>{q.type === 'short' ? 'Model answer:' : 'Correct answer:'}</strong> {correctAnswerText(q)}</p>
                    <p>{inline(q.explanation)}</p>
                    {q.note && <p className="src-note"><strong>Note on the source:</strong> {q.note}</p>}
                    {!it.correct && <button className="btn btn-gold" onClick={() => go(paths.learn(subject.id, q.topicId, q.slide))}>REVISE THIS TOPIC</button>}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
