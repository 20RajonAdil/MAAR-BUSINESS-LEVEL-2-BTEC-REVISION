import { useMemo } from 'react'
import type { Subject } from '../types'
import { go, paths } from '../lib/router'
import { inline } from '../lib/text'
import { formulaStats, useFormulaHistory } from '../lib/formulaTest'
import { formulaBank } from '../data/finance/formulaBank'
import { overallScore, resetAdaptive, topicRows, useMastery, weakestQuestions, type Session, type Status } from '../lib/adaptive'
import { Icon } from './Icon'

const LABEL: Record<Status, string> = { strong: 'Strong', developing: 'Developing', weak: 'Weak', new: 'Not started' }
const pct = (n: number) => Math.round(n * 100)

function TrendChart({ sessions }: { sessions: Session[] }) {
  const W = 640, H = 230, L = 40, R = 16, T = 14, B = 28
  const pts = sessions.map((s, i) => ({
    x: sessions.length === 1 ? (L + W - R) / 2 : L + (i / (sessions.length - 1)) * (W - L - R),
    y: T + (1 - s.pct / 100) * (H - T - B),
    s,
  }))
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const passY = T + (1 - 0.7) * (H - T - B)
  return (
    <svg className="pg-trend" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Your last ${sessions.length} test scores, from ${sessions[0].pct}% to ${sessions[sessions.length - 1].pct}%`}>
      {[0, 25, 50, 75, 100].map(v => {
        const y = T + (1 - v / 100) * (H - T - B)
        return <g key={v}><line x1={L} x2={W - R} y1={y} y2={y} className="pg-grid" /><text x={L - 8} y={y + 4} textAnchor="end" className="pg-axis">{v}%</text></g>
      })}
      <line x1={L} x2={W - R} y1={passY} y2={passY} className="pg-pass" />
      <text x={W - R} y={passY - 5} textAnchor="end" className="pg-pass-t">Pass level 70%</text>
      {pts.length > 1 && <path d={line} className="pg-line" />}
      {pts.map((p, i) => (
        <g key={p.s.at + '-' + i}>
          <circle cx={p.x} cy={p.y} r="5" className={`pg-dot ${p.s.pct >= 70 ? 'ok' : p.s.pct >= 50 ? 'mid' : 'low'}`}><title>{`${p.s.pct}% (${p.s.n} questions)`}</title></circle>
          <text x={p.x} y={H - 8} textAnchor="middle" className="pg-axis">{i + 1}</text>
        </g>
      ))}
    </svg>
  )
}

export function Progress({ subject }: { subject: Subject }) {
  const { mastery, sessions } = useMastery()
  const { history } = useFormulaHistory()

  const external = useMemo(() => {
    const ext: Record<string, { score: number | null; tried: number; total: number }> = {}
    for (const t of subject.topics) if (t.customTest === 'formula') {
      const stats = formulaStats(history)
      const ids = Object.keys(stats).filter(id => stats[id].total > 0)
      const total = ids.reduce((a, id) => a + stats[id].total, 0)
      const right = ids.reduce((a, id) => a + stats[id].correct, 0)
      ext[t.id] = { score: total ? right / total : null, tried: ids.length, total: formulaBank.length }
    }
    return ext
  }, [subject, history])

  const rows = useMemo(() => topicRows(subject, mastery, external), [subject, mastery, external])
  const overall = overallScore(rows)
  const weakQs = useMemo(() => weakestQuestions(subject, mastery, 5), [subject, mastery])
  const mine = sessions.filter(s => s.subject === subject.id).slice(-12)
  const totalQs = subject.topics.reduce((n, t) => n + t.questions.length, 0)
  const triedQs = rows.reduce((n, r) => (r.topic.customTest ? n : n + r.tried), 0)
  const hasData = overall !== null || mine.length > 0

  const focus = rows.filter(r => r.status === 'weak' || r.status === 'developing').sort((a, b) => (a.score ?? 1) - (b.score ?? 1)).slice(0, 4)
  const notStarted = rows.filter(r => r.status === 'new')
  const strong = rows.filter(r => r.status === 'strong')
  const weakCount = rows.filter(r => r.status === 'weak').length
  const open = (r: typeof rows[number]) => r.topic.customTest ? go(paths.formulas(subject.id)) : go(paths.quiz(subject.id, r.topic.id))

  return (
    <div className="progress-page">
      <nav className="crumbs" aria-label="Breadcrumb"><a href={`#/${subject.id}`}><Icon name="arrow-left" size={15} /> All topics</a><span aria-hidden="true">/</span><span>Progress check</span></nav>

      <section className="score-card pg-head">
        <p className="eyebrow">{subject.name} · Progress check</p>
        {overall !== null
          ? <>
              <div className="score-ring" style={{ ['--pct' as string]: `${pct(overall)}%` }}><span>{pct(overall)}%</span></div>
              <h1>{pct(overall) >= 80 ? 'You are in great shape' : pct(overall) >= 55 ? 'Getting stronger' : 'Keep going: practice will lift this'}</h1>
              <p className="grade">Average across the questions you have tried</p>
            </>
          : <>
              <h1>No results yet</h1>
              <p className="grade">Take a test and this page will show where you are strong and where you are weak.</p>
            </>}
        <div className="score-stats">
          <div className="stat"><strong>{triedQs}/{totalQs}</strong><span>Questions tried</span></div>
          <div className="stat"><strong>{mine.length}</strong><span>Recent tests</span></div>
          <div className="stat no"><strong>{weakCount}</strong><span>Weak topics</span></div>
        </div>
        <div className="score-actions">
          <button className="btn btn-gold" onClick={() => go(paths.exam(subject.id))}><Icon name="exam" size={18} /> {hasData ? 'Practise my weak spots' : 'Take a practice exam'}</button>
          <button className="btn btn-outline" onClick={() => go(paths.home(subject.id))}>Topic menu</button>
        </div>
      </section>

      <section aria-labelledby="pg-topics">
        <h2 className="section-title" id="pg-topics">Strength by topic</h2>
        <ul className="pg-bars">
          {rows.map(r => (
            <li key={r.topic.id} className="pg-row">
              <div className="pg-name"><Icon name={r.topic.icon} size={16} /> <span>{r.topic.title}</span></div>
              <div className="pg-track" role="img" aria-label={`${r.topic.title}: ${r.score === null ? 'not started' : pct(r.score) + ' percent'}`}>
                <div className={`pg-fill ${r.status}`} style={{ width: `${r.score === null ? 0 : Math.max(pct(r.score), 3)}%` }} />
              </div>
              <div className="pg-val"><strong>{r.score === null ? '–' : `${pct(r.score)}%`}</strong><small>{r.tried}/{r.total} tried</small></div>
              <span className={`pg-tag ${r.status}`}>{LABEL[r.status]}</span>
            </li>
          ))}
        </ul>
        <p className="muted small pg-note">Each bar shows how well you have been answering that topic recently. Newer answers count more than old ones.</p>
      </section>

      <section aria-labelledby="pg-trend">
        <h2 className="section-title" id="pg-trend">Your scores over time</h2>
        {mine.length ? <div className="pg-card"><TrendChart sessions={mine} /><p className="muted small">Each dot is one finished test (oldest on the left). Aim to stay above the dashed pass line.</p></div>
          : <p className="muted">Finish a test and your score will appear here.</p>}
      </section>

      {focus.length > 0 && (
        <section aria-labelledby="pg-focus">
          <h2 className="section-title" id="pg-focus">Focus on these first</h2>
          <ul className="revise-list">
            {focus.map(r => (
              <li key={r.topic.id} className="revise-item">
                <div>
                  <strong className="with-ic"><Icon name={r.topic.icon} size={18} /> {r.topic.title}</strong>
                  <div className="muted small">{r.score !== null ? pct(r.score) : 0}% · {LABEL[r.status].toLowerCase()}</div>
                </div>
                <div className="pg-btns">
                  <button className="btn btn-gold" onClick={() => go(paths.learn(subject.id, r.topic.id, 0))}>REVISE THIS TOPIC</button>
                  <button className="btn btn-outline" onClick={() => open(r)}>Test again</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {weakQs.length > 0 && (
        <section aria-labelledby="pg-qs">
          <h2 className="section-title" id="pg-qs">Questions you keep missing</h2>
          <ul className="revise-list">
            {weakQs.map(({ q, stat }) => {
              const t = subject.topics.find(x => x.id === q.topicId)
              return (
                <li key={q.id} className="revise-item">
                  <div>
                    <div>{inline(q.prompt)}</div>
                    <div className="muted small">{t?.title} · answered {stat.seen} time{stat.seen > 1 ? 's' : ''}</div>
                  </div>
                  <button className="btn btn-gold" onClick={() => go(paths.learn(subject.id, q.topicId, q.slide))}>REVISE THIS TOPIC</button>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {hasData && (notStarted.length > 0 || strong.length > 0) && (
        <section className="pg-summary">
          {strong.length > 0 && <p><strong>Strong:</strong> {strong.map(r => r.topic.title).join(', ')}.</p>}
          {notStarted.length > 0 && <p><strong>Not started yet:</strong> {notStarted.map(r => r.topic.title).join(', ')}.</p>}
        </section>
      )}

      {hasData && (
        <p className="pg-reset">
          <button className="link" onClick={() => { if (window.confirm('Clear your question history and test scores on this device? Your slide progress is kept.')) resetAdaptive() }}>Reset my progress data</button>
        </p>
      )}
    </div>
  )
}
