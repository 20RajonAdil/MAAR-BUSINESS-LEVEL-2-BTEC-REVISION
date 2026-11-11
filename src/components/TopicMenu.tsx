import type { Subject } from '../types'
import { go, paths } from '../lib/router'
import { useProgress } from '../lib/store'

export function TopicMenu({ subject, openSearch }: { subject: Subject; openSearch: () => void }) {
  const { progress } = useProgress()
  const nq = subject.topics.reduce((n, t) => n + t.questions.length, 0)
  const ns = subject.topics.reduce((n, t) => n + t.slides.length, 0)
  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">{subject.tagline}</p>
        <h1>{subject.name} <span>revision classroom</span></h1>
        <p className="hero-sub">Learn each topic with presentation-style slides, then test yourself and see exactly what to revise. {subject.topics.length} topics · {ns} slides · {nq} questions.</p>
        <div className="hero-actions">
          <button className="btn btn-gold" onClick={() => go(paths.learn(subject.id, subject.topics[0].id, 0))}>Start with Topic 1</button>
          <button className="btn btn-light" onClick={() => go(paths.revise(subject.id))}>⚡ Quick revision</button>
          <button className="btn btn-light" onClick={() => go(paths.exam(subject.id))}>📝 Mixed practice exam</button>
          <button className="btn btn-light" onClick={openSearch}>🔍 Search</button>
        </div>
        <ol className="journey" aria-label="Learning journey">
          {['Learn', 'Understand', 'Test my knowledge', 'Check results', 'Revise', 'Try again'].map(s => <li key={s}>{s}</li>)}
        </ol>
      </section>

      <h2 className="section-title">Topics</h2>
      <ul className="topic-grid">
        {subject.topics.map(t => {
          const p = progress[t.id]
          const viewed = p?.viewed?.length ?? 0
          return (
            <li key={t.id} className="topic-card">
              <div className="topic-top">
                <span className="topic-icon" aria-hidden="true">{t.icon}</span>
                <span className="topic-num">Topic {t.number}</span>
              </div>
              <h3>{t.title}</h3>
              <p>{t.summary}</p>
              <div className="topic-meta">
                <span>{t.slides.length} slides</span><span>{t.questions.length} questions</span>
                {p?.attempts ? <span className="badge-best">Best {p.best}%</span> : viewed > 0 ? <span>{Math.min(viewed, t.slides.length)}/{t.slides.length} viewed</span> : null}
              </div>
              <div className="topic-actions">
                <button className="btn btn-primary" onClick={() => go(paths.learn(subject.id, t.id, 0))}>Learn</button>
                <button className="btn btn-outline" onClick={() => go(paths.quiz(subject.id, t.id))}>Test</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
