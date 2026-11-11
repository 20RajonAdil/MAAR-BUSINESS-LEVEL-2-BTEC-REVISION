import { useRef, useState } from 'react'
import type { Question, Subject, UserAnswer, Verdict } from '../types'
import { checkAnswer, correctAnswerText } from '../lib/check'
import { go, paths } from '../lib/router'
import { inline } from '../lib/text'
import { MUST_KNOW_ID, fullFormula } from '../data/finance/formulaBank'
import { REQUIRED_ATTEMPTS, buildAttempt, buildReport, useFormulaHistory, type Attempt, type Report, type Row } from '../lib/formulaTest'
import { AnswerInput, QuestionBody, hasAnswer } from './Quiz'

const pct = (x: number) => `${Math.round(x * 100)}%`
const mark = (v: number | null) => (v === null ? '–' : v === 1 ? '✓' : v === 0 ? '✗' : '½')
const markCls = (v: number | null) => (v === null ? '' : v === 1 ? 'ok' : v === 0 ? 'no' : 'half')
const STATUS = { secure: 'Secure', developing: 'Developing', weak: 'Needs work' } as const

function Meter({ done }: { done: number }) {
  return (
    <div className="meter" aria-label={`${Math.min(done, REQUIRED_ATTEMPTS)} of ${REQUIRED_ATTEMPTS} attempts completed`}>
      {Array.from({ length: REQUIRED_ATTEMPTS }, (_, i) => (
        <div key={i} className={`meter-step${i < done ? ' on' : ''}`}><span>{i < done ? '✓' : i + 1}</span><small>Attempt {i + 1}</small></div>
      ))}
    </div>
  )
}

export function ReportView({ subject, report }: { subject: Subject; report: Report }) {
  const topicName = (id: string) => subject.topics.find(t => t.id === id)?.title ?? ''
  const trend = report.change > 0.005 ? `up ${Math.round(report.change * 100)} points since your first of these 3 attempts` : report.change < -0.005 ? `down ${Math.round(-report.change * 100)} points since your first of these 3 attempts` : 'level with your first of these 3 attempts'
  return (
    <section className="report" aria-labelledby="rep-h">
      <p className="eyebrow">Your personal improvement report</p>
      <h2 id="rep-h">{report.headline}</h2>
      <div className="rep-top">
        <div className="rep-big"><strong>{pct(report.overall)}</strong><span>average over your last {REQUIRED_ATTEMPTS} attempts</span></div>
        <div className="rep-attempts">
          {report.attemptPct.map((p, i) => <div key={i} className="rep-att"><span>Attempt {i + 1}</span><strong>{pct(p)}</strong></div>)}
          <p className={`rep-trend ${report.change > 0.005 ? 'up' : report.change < -0.005 ? 'down' : ''}`}>{report.change > 0.005 ? '▲' : report.change < -0.005 ? '▼' : '■'} Score {trend}.</p>
        </div>
      </div>

      {report.weakest.length > 0 ? (
        <>
          <h3>What to improve, and where</h3>
          <ol className="improve">
            {report.weakest.map((r: Row) => (
              <li key={r.def.id} className={`improve-item st-${r.status}`}>
                <div className="improve-head"><strong>{r.def.n}. {r.def.name}</strong><span className={`pill st-pill-${r.status}`}>{STATUS[r.status]} · {r.correct}/{r.total} right</span></div>
                <div className="b-formula-eq small-eq">{fullFormula(r.def)}</div>
                <ul>{r.advice.map((a, i) => <li key={i}>{a}</li>)}</ul>
                <div className="improve-actions">
                  <button className="btn btn-gold" onClick={() => go(paths.learn(subject.id, MUST_KNOW_ID, r.def.mustKnowSlide))}>Revise on the formula slide</button>
                  <button className="btn btn-outline" onClick={() => go(paths.learn(subject.id, r.def.topicId, r.def.topicSlide))}>Revisit in “{topicName(r.def.topicId)}”</button>
                </div>
              </li>
            ))}
          </ol>
        </>
      ) : <div className="callout-win">🎉 All 11 formulas are secure. Brilliant work.</div>}

      <h3>Formula by formula</h3>
      <div className="b-table-wrap">
        <table className="b-table left rep-table">
          <thead><tr><th>Formula</th>{report.window.map((_, i) => <th key={i} className="c">A{i + 1}</th>)}<th className="c">Overall</th><th>Status</th></tr></thead>
          <tbody>
            {report.rows.map(r => (
              <tr key={r.def.id}>
                <th scope="row">{r.def.n}. {r.def.name}</th>
                {r.perAttempt.map((v, i) => <td key={i} className={`c m ${markCls(v)}`} aria-label={v === 1 ? 'correct' : v === 0 ? 'incorrect' : 'partly correct'}>{mark(v)}</td>)}
                <td className="c">{pct(r.pct)}</td>
                <td><span className={`pill st-pill-${r.status}`}>{STATUS[r.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted small">✓ all right in that attempt · ½ some right · ✗ all wrong. Extra questions on weak formulas count towards “Overall”.</p>
      {report.strongest.length > 0 && <p><strong>Your strongest formulas:</strong> {report.strongest.map(r => r.def.name).join(', ')}.</p>}
    </section>
  )
}

function FormulaQuiz({ questions, subject, number, onFinish }: { questions: Question[]; subject: Subject; number: number; onFinish: (qs: Question[], answers: Record<string, UserAnswer>, v: Record<string, Verdict>) => void }) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({})
  const [verdicts, setVerdicts] = useState<Record<string, Verdict>>({})
  const fb = useRef<HTMLDivElement>(null)
  const q = questions[idx]
  const checked = verdicts[q.id]
  const value = answers[q.id] ?? null
  const done = Object.keys(verdicts).length
  const submit = () => {
    if (checked || !hasAnswer(q, value)) return
    setVerdicts(p => ({ ...p, [q.id]: checkAnswer(q, value) }))
    setTimeout(() => fb.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
  }
  const next = () => {
    if (idx < questions.length - 1) { setIdx(idx + 1); window.scrollTo({ top: 0 }) } else onFinish(questions, answers, verdicts)
  }
  return (
    <section className="quiz">
      <header className="quiz-head">
        <div className="quiz-title">🧮 Formula Test · Attempt {number}</div>
        <div className="deck-count" aria-live="polite">Question {idx + 1} of {questions.length}</div>
      </header>
      <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={done} aria-label="Questions answered"><div style={{ width: `${(done / questions.length) * 100}%` }} /></div>
      <div className="quiz-body">
        <QuestionBody q={q} subject={subject} />
        <AnswerInput q={q} value={value} onChange={v => setAnswers(a => ({ ...a, [q.id]: v }))} locked={!!checked} verdict={checked} onSubmit={submit} />
        <div ref={fb} aria-live="polite">
          {checked && (
            <div className={`feedback ${checked.correct ? 'ok' : 'no'}`}>
              <div className="fb-head"><span className="fb-icon" aria-hidden="true">{checked.correct ? '✓' : '✗'}</span>{checked.correct ? 'Correct! Well done.' : 'Not quite.'}</div>
              {!checked.correct && <p><strong>Correct answer:</strong> {correctAnswerText(q)}</p>}
              <p>{inline(q.explanation)}</p>
              {!checked.correct && <button className="btn btn-gold" onClick={() => go(paths.learn(subject.id, MUST_KNOW_ID, q.slide))}>REVISE THIS FORMULA</button>}
            </div>
          )}
        </div>
      </div>
      <footer className="deck-foot">
        <button className="btn btn-ghost" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}>← Previous</button>
        {!checked
          ? <button className="btn btn-primary" onClick={submit} disabled={!hasAnswer(q, value)}>Check answer</button>
          : <button className="btn btn-gold" onClick={next}>{idx === questions.length - 1 ? 'See my results' : 'Next question →'}</button>}
      </footer>
    </section>
  )
}

interface Last { questions: Question[]; verdicts: Record<string, Verdict>; number: number }

export function FormulaTest({ subject }: { subject: Subject }) {
  const { history, add, reset } = useFormulaHistory()
  const [phase, setPhase] = useState<'hub' | 'quiz' | 'result'>('hub')
  const [qs, setQs] = useState<Question[]>([])
  const [last, setLast] = useState<Last | null>(null)
  const report = buildReport(history)

  const start = () => { setQs(buildAttempt(history)); setPhase('quiz'); window.scrollTo({ top: 0 }) }
  const finish = (questions: Question[], _a: Record<string, UserAnswer>, verdicts: Record<string, Verdict>) => {
    const attempt: Attempt = { at: Date.now(), items: questions.map(q => ({ fid: q.fid!, kind: kindOf(q), skill: q.skill ?? 'recall', correct: !!verdicts[q.id]?.correct })) }
    add(attempt)
    setLast({ questions, verdicts, number: history.length + 1 })
    setPhase('result')
    window.scrollTo({ top: 0 })
  }

  const crumbs = (
    <nav className="crumbs" aria-label="Breadcrumb"><a href={`#/${subject.id}`}>← All topics</a><span aria-hidden="true">/</span><span>Formula Test</span></nav>
  )

  if (phase === 'quiz') return <div className="quiz-page">{crumbs}<FormulaQuiz questions={qs} subject={subject} number={history.length + 1} onFinish={finish} /></div>

  if (phase === 'result' && last) {
    const right = last.questions.filter(q => last.verdicts[q.id]?.correct).length
    const p = right / last.questions.length
    const missed = last.questions.filter(q => !last.verdicts[q.id]?.correct)
    const left = Math.max(0, REQUIRED_ATTEMPTS - history.length)
    return (
      <div className="results">
        {crumbs}
        <section className="score-card">
          <p className="eyebrow">Formula Test · Attempt {last.number}</p>
          <div className="score-ring" style={{ ['--pct' as string]: pct(p) }}><span>{pct(p)}</span></div>
          <h1>{right} / {last.questions.length} correct</h1>
          <div className="meter on-dark"><Meter done={history.length} /></div>
          <p className="grade">{left > 0 ? `Complete ${left} more attempt${left > 1 ? 's' : ''} to unlock your personal improvement report.` : 'Your improvement report is ready below.'}</p>
          <div className="score-actions">
            <button className="btn btn-gold" onClick={start}>↻ Try another attempt</button>
            <button className="btn btn-primary" onClick={() => go(paths.learn(subject.id, MUST_KNOW_ID, 1))}>Study the formula slide</button>
            <button className="btn btn-outline" onClick={() => setPhase('hub')}>Formula Test home</button>
          </div>
        </section>
        {report && <ReportView subject={subject} report={report} />}
        {missed.length > 0 ? (
          <section>
            <h2 className="section-title">Formulas to look at from this attempt</h2>
            <ul className="revise-list">
              {missed.map(q => (
                <li key={q.id} className="revise-item">
                  <div><strong>{q.prompt.replace(/\*\*/g, '')}</strong><div className="muted small">Correct answer: {correctAnswerText(q)}</div></div>
                  <button className="btn btn-gold" onClick={() => go(paths.learn(subject.id, MUST_KNOW_ID, q.slide))}>REVISE THIS FORMULA</button>
                </li>
              ))}
            </ul>
          </section>
        ) : <div className="callout-win">🎉 Perfect attempt!</div>}
      </div>
    )
  }

  const n = history.length
  return (
    <div className="results">
      {crumbs}
      <section className="ft-hero">
        <p className="eyebrow">Exam essentials</p>
        <h1>🧮 Formula Test</h1>
        <p>Every attempt asks all <strong>11 must-know formulas</strong> in a new order and a different format: pick the right formula, complete it, true or false, name the measure, or calculate with fresh numbers. Formulas you keep missing come back as extra questions.</p>
        <Meter done={n} />
        <p className="ft-note">{n < REQUIRED_ATTEMPTS ? `Take it ${REQUIRED_ATTEMPTS} times to unlock your personal improvement report (${n} of ${REQUIRED_ATTEMPTS} done).` : `Report unlocked. It uses your latest ${REQUIRED_ATTEMPTS} attempts, and updates every time you test again.`}</p>
        <div className="hero-actions">
          <button className="btn btn-gold" onClick={start}>{n === 0 ? 'Start attempt 1' : `Start attempt ${n + 1}`}</button>
          <button className="btn btn-light" onClick={() => go(paths.learn(subject.id, MUST_KNOW_ID, 1))}>📖 Study the 11 formulas first</button>
        </div>
      </section>
      {report ? <ReportView subject={subject} report={report} /> : (
        <section className="locked">
          <div className="locked-ico" aria-hidden="true">🔒</div>
          <div><strong>Improvement report locked</strong><p className="muted">After {REQUIRED_ATTEMPTS} attempts you will see: your score trend, a formula-by-formula table, which formulas to improve, whether your problem is remembering the formula or using it in calculations, and exactly which slide to revise.</p></div>
        </section>
      )}
      {n > 0 && <p className="reset"><button className="link" onClick={() => { if (window.confirm('Clear all your Formula Test attempts on this device?')) reset() }}>Reset my formula progress</button></p>}
    </div>
  )
}

function kindOf(q: Question) {
  if (q.type === 'calc') return 'calc' as const
  if (q.type === 'fill') return 'fill' as const
  if (q.type === 'tf') return 'tf' as const
  return q.prompt.startsWith('Which measure') ? ('identify' as const) : ('recall' as const)
}
