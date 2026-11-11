import { useMemo, useRef, useState } from 'react'
import type { Question, Subject, UserAnswer, Verdict } from '../types'
import { checkAnswer, correctAnswerText } from '../lib/check'
import { go, paths } from '../lib/router'
import { saveResult } from '../lib/store'
import { MIXED, buildMixed } from '../lib/exam'
import { inline } from '../lib/text'
import { BlockView } from './Blocks'
import { Chart } from './Charts'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export function QuestionBody({ q, subject }: { q: Question; subject: Subject }) {
  const topic = subject.topics.find(t => t.id === q.topicId)
  return (
    <>
      <div className="q-meta">
        <span className={`chip ${q.origin === 'original' ? 'chip-orig' : 'chip-gen'}`}>{q.origin === 'original' ? 'Original course question' : 'Practice question'}</span>
        {q.source && <span className="chip chip-src">{q.source}</span>}
        {q.marks ? <span className="chip chip-src">{q.marks} mark{q.marks > 1 ? 's' : ''}</span> : null}
        {topic && <span className="chip chip-src">{topic.title}</span>}
      </div>
      <h2 className="q-prompt">{inline(q.prompt)}</h2>
      {q.table && <BlockView b={{ t: 'table', head: q.table.head, rows: q.table.rows, boldRows: q.table.boldRows }} />}
      {q.chart && <div className="b-chart"><Chart id={q.chart} /></div>}
    </>
  )
}

interface InputProps { q: Question; value: UserAnswer; onChange: (v: UserAnswer) => void; locked: boolean; verdict?: Verdict; onSubmit: () => void }

function AnswerInput({ q, value, onChange, locked, verdict, onSubmit }: InputProps) {
  if (q.type === 'mcq' || q.type === 'multi') {
    const multi = q.type === 'multi'
    const chosen = multi ? ((value as number[] | null) ?? []) : value === null ? [] : [value as number]
    const correctSet = new Set(multi ? q.answers : [q.answer])
    return (
      <fieldset className="options" disabled={locked}>
        <legend className="sr-only">{multi ? 'Select all that apply' : 'Choose one answer'}</legend>
        {multi && <p className="hint">Select all that apply.</p>}
        {q.options.map((opt, i) => {
          const on = chosen.includes(i)
          let cls = 'option'
          if (on) cls += ' on'
          if (locked) { if (correctSet.has(i)) cls += ' right'; else if (on) cls += ' wrong' }
          return (
            <label key={i} className={cls}>
              <input type={multi ? 'checkbox' : 'radio'} name={q.id} checked={on}
                onChange={() => multi ? onChange(on ? chosen.filter(c => c !== i) : [...chosen, i]) : onChange(i)} />
              <span className="letter" aria-hidden="true">{LETTERS[i]}</span>
              <span className="opt-text">{opt}</span>
              {locked && correctSet.has(i) && <span className="mark ok" aria-label="correct">✓</span>}
              {locked && on && !correctSet.has(i) && <span className="mark no" aria-label="incorrect">✗</span>}
            </label>
          )
        })}
      </fieldset>
    )
  }
  if (q.type === 'tf') {
    return (
      <div className="tf" role="radiogroup" aria-label="True or false">
        {[true, false].map(v => {
          const on = value === v
          let cls = 'tf-btn'
          if (on) cls += ' on'
          if (locked) { if (q.answer === v) cls += ' right'; else if (on) cls += ' wrong' }
          return <button key={String(v)} type="button" role="radio" aria-checked={on} disabled={locked} className={cls} onClick={() => onChange(v)}>{v ? 'True' : 'False'}{locked && q.answer === v ? ' ✓' : ''}{locked && on && q.answer !== v ? ' ✗' : ''}</button>
        })}
      </div>
    )
  }
  const cls = `text-in${locked ? (verdict?.correct ? ' right' : ' wrong') : ''}`
  if (q.type === 'short') {
    return <textarea className={cls} rows={6} disabled={locked} value={(value as string) ?? ''} onChange={e => onChange(e.target.value)} placeholder="Write your answer here…" aria-label="Your written answer" />
  }
  return (
    <div className="calc-wrap">
      {q.type === 'calc' && q.unit === '£' && <span className="unit">£</span>}
      <input className={cls} type="text" inputMode={q.type === 'calc' ? 'decimal' : 'text'} autoComplete="off" autoCapitalize="off" spellCheck={false}
        disabled={locked} value={(value as string) ?? ''} onChange={e => onChange(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onSubmit() }}
        placeholder={q.type === 'calc' ? (q.unit === '%' ? 'e.g. 12.5' : 'Type your answer') : 'Type your answer'} aria-label="Your answer" />
      {q.type === 'calc' && q.unit === '%' && <span className="unit">%</span>}
    </div>
  )
}

function hasAnswer(q: Question, v: UserAnswer): boolean {
  if (v === null || v === undefined) return false
  if (typeof v === 'string') return v.trim().length > 0
  if (Array.isArray(v)) return v.length > 0
  return true
}

export function Quiz({ subject, topicId }: { subject: Subject; topicId: string }) {
  const isMixed = topicId === MIXED
  const topic = subject.topics.find(t => t.id === topicId)
  const questions = useMemo<Question[]>(() => (isMixed ? buildMixed(subject) : topic?.questions ?? []), [isMixed, subject, topic])
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({})
  const [verdicts, setVerdicts] = useState<Record<string, Verdict>>({})
  const feedback = useRef<HTMLDivElement>(null)

  if (!isMixed && !topic) return <p className="empty">Topic not found. <a href={`#/${subject.id}`}>Back to topics</a></p>
  const q = questions[idx]
  const checked = verdicts[q.id]
  const value = answers[q.id] ?? null
  const qTopic = subject.topics.find(t => t.id === q.topicId)!
  const done = Object.keys(verdicts).length

  const submit = () => {
    if (checked || !hasAnswer(q, value)) return
    const v = checkAnswer(q, value)
    setVerdicts(prev => ({ ...prev, [q.id]: v }))
    setTimeout(() => feedback.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
  }

  const next = () => {
    if (idx < questions.length - 1) { setIdx(idx + 1); window.scrollTo({ top: 0 }); return }
    const items = questions.map(qq => ({ qid: qq.id, answer: answers[qq.id] ?? null, correct: !!verdicts[qq.id]?.correct, score: verdicts[qq.id]?.score ?? 0 }))
    saveResult({ topicId, at: Date.now(), items, questionIds: questions.map(qq => qq.id) })
    go(paths.results(subject.id, topicId))
  }

  return (
    <div className="quiz-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <a href={`#/${subject.id}`}>← All topics</a><span aria-hidden="true">/</span>
        <span>{isMixed ? 'Mixed practice exam' : `${topic!.number}. ${topic!.title}: Test my knowledge`}</span>
      </nav>
      <section className="quiz">
        <header className="quiz-head">
          <div className="quiz-title">{isMixed ? '📝 Mixed practice exam' : `${topic!.icon} ${topic!.title}`}</div>
          <div className="deck-count" aria-live="polite">Question {idx + 1} of {questions.length}</div>
        </header>
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={done} aria-label="Questions answered"><div style={{ width: `${(done / questions.length) * 100}%` }} /></div>

        <div className="quiz-body">
          <QuestionBody q={q} subject={subject} />
          <AnswerInput q={q} value={value} onChange={v => setAnswers(a => ({ ...a, [q.id]: v }))} locked={!!checked} verdict={checked} onSubmit={submit} />

          <div ref={feedback} aria-live="polite">
            {checked && (
              <div className={`feedback ${checked.correct ? 'ok' : 'no'}`}>
                <div className="fb-head"><span className="fb-icon" aria-hidden="true">{checked.correct ? '✓' : '✗'}</span>
                  {checked.correct ? 'Correct! Well done.' : q.type === 'short' && checked.score > 0 ? 'Partly there.' : 'Not quite.'}</div>
                {checked.detail && <p>{checked.detail}</p>}
                {!checked.correct || q.type === 'short' ? <p><strong>{q.type === 'short' ? 'Model answer:' : 'Correct answer:'}</strong> {correctAnswerText(q)}</p> : null}
                <p>{inline(q.explanation)}</p>
                {q.note && <p className="src-note"><strong>Note on the source:</strong> {q.note}</p>}
                {!checked.correct && (
                  <button className="btn btn-gold" onClick={() => go(paths.learn(subject.id, q.topicId, q.slide))}>REVISE THIS TOPIC</button>
                )}
                {!checked.correct && <p className="muted small">Opens “{qTopic.slides[q.slide]?.title}” in {qTopic.title}.</p>}
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
    </div>
  )
}
