import type { Subject } from '../types'
import { go, paths } from '../lib/router'
import { useProgress } from '../lib/store'
import { useFormulaHistory, REQUIRED_ATTEMPTS } from '../lib/formulaTest'
import { Hero } from './Hero'
import { Icon } from './Icon'

export function TopicMenu({ subject, openSearch }: { subject: Subject; openSearch: () => void }) {
  const { progress } = useProgress()
  const { history } = useFormulaHistory()
  const featured = subject.topics.find(t => t.featured)
  const regular = subject.topics.filter(t => !t.featured)
  return (
    <div className="home">
      {subject.hero && <Hero subject={subject} openSearch={openSearch} />}
      <div className="home-body">
        {featured && (
          <section className="featured" aria-labelledby="feat-h">
            <div className="featured-main">
              <p className="eyebrow">Exam essentials</p>
              <h2 id="feat-h" className="with-ic"><Icon name={featured.icon} size={26} /> {featured.title}</h2>
              <p>{featured.summary}</p>
              <div className="topic-actions">
                <button className="btn btn-gold" onClick={() => go(paths.learn(subject.id, featured.id, 0))}><Icon name="book" size={18} /> Learn the formulas</button>
                <button className="btn btn-light" onClick={() => go(paths.formulas(subject.id))}><Icon name="sigma" size={18} /> Formula test</button>
              </div>
            </div>
            <div className="featured-side" aria-label="Formula test progress">
              <strong>{Math.min(history.length, REQUIRED_ATTEMPTS)}/{REQUIRED_ATTEMPTS}</strong>
              <span>attempts toward your improvement report</span>
            </div>
          </section>
        )}

        <h2 className="section-title" id="topics">Topics</h2>
        <ul className="topic-grid">
          {regular.map(t => {
            const p = progress[t.id]
            const viewed = Math.min(p?.viewed?.length ?? 0, t.slides.length)
            return (
              <li key={t.id} className="topic-card">
                <div className="topic-top">
                  <span className="topic-icon" aria-hidden="true"><Icon name={t.icon} size={26} strokeWidth={1.8} /></span>
                  <span className="topic-num">Topic {t.number}</span>
                </div>
                <h3>{t.title}</h3>
                <p>{t.summary}</p>
                <div className="topic-meta">
                  <span>{t.slides.length} slides</span><span>{t.questions.length} questions</span>
                  {p?.attempts ? <span className="badge-best">Best {p.best}%</span> : null}
                </div>
                <div className="topic-progress" role="img" aria-label={`${viewed} of ${t.slides.length} slides viewed`}><div style={{ width: `${(viewed / t.slides.length) * 100}%` }} /></div>
                <div className="topic-actions">
                  <button className="btn btn-primary" onClick={() => go(paths.learn(subject.id, t.id, 0))}><Icon name="book" size={17} /> Learn</button>
                  <button className="btn btn-outline" onClick={() => go(paths.quiz(subject.id, t.id))}><Icon name="exam" size={17} /> Test</button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
