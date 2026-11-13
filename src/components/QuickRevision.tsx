import { useState } from 'react'
import type { Subject } from '../types'
import { go, paths } from '../lib/router'

type Tab = 'definitions' | 'formulas' | 'tips'

export function QuickRevision({ subject, find }: { subject: Subject; find?: string }) {
  const quick = subject.quick
  const [tab, setTab] = useState<Tab>('formulas')
  const [q, setQ] = useState(find ?? '')
  if (!quick) return <p className="empty">No quick revision available yet.</p>
  const match = (...s: string[]) => !q.trim() || q.toLowerCase().split(/\s+/).every(w => s.join(' ').toLowerCase().includes(w))
  const topicName = (id?: string) => subject.topics.find(t => t.id === id)
  const link = (id?: string) => {
    const t = topicName(id)
    return t ? <button className="link" onClick={() => go(paths.learn(subject.id, t.id, 0))}>Topic {t.number}: {t.title} →</button> : null
  }
  const defs = quick.definitions.filter(d => match(d.term, d.definition))
  const forms = quick.formulas.filter(f => match(f.name, f.formula, ...f.vars.flat(), ...f.worked))
  const tips = quick.tips.filter(t => match(t.text))
  const mist = quick.mistakes.filter(t => match(t.text))
  const tabs: [Tab, string, number][] = [['formulas', forms.length === 1 ? 'Formula' : 'Formulas', forms.length], ['definitions', 'Definitions', defs.length], ['tips', 'Tips & common mistakes', tips.length + mist.length]]

  return (
    <div className="revise">
      <nav className="crumbs" aria-label="Breadcrumb"><a href={`#/${subject.id}`}>← All topics</a><span aria-hidden="true">/</span><span>Quick revision</span></nav>
      <h1 className="page-title">⚡ Quick revision</h1>
      <p className="muted">Definitions, formulas with worked examples, exam tips and common mistakes from your course materials.</p>
      {subject.topics.some(t => t.customTest) && <div className="qr-banner"><span>🧮 Know your 11 must-know formulas?</span><button className="btn btn-gold" onClick={() => go(paths.formulas(subject.id))}>Take the Formula Test</button></div>}
      <div className="filter">
        <label htmlFor="qr-filter" className="sr-only">Filter quick revision</label>
        <input id="qr-filter" type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Filter by word, e.g. ‘margin’, ‘ratio’, ‘fixed’…" />
      </div>
      <div className="tabs" role="tablist">
        {tabs.map(([id, label, n]) => (
          <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>{label} <span className="count">{n}</span></button>
        ))}
      </div>

      {tab === 'formulas' && (
        <div className="cards">
          {forms.map(f => (
            <article key={f.name} className="qcard">
              <h3>{f.name}</h3>
              <div className="b-formula-eq">{f.formula}</div>
              <dl className="b-vars">{f.vars.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              <div className="b-example"><div className="b-label">Worked example</div><ol className="b-steps">{f.worked.map((w, i) => <li key={i}>{w}</li>)}</ol></div>
              {link(f.topicId)}
            </article>
          ))}
          {!forms.length && <p className="empty">No formulas match “{q}”.</p>}
        </div>
      )}
      {tab === 'definitions' && (
        <dl className="defs">
          {defs.map(d => (
            <div key={d.term} className="def">
              <dt>{d.term}</dt><dd>{d.definition}</dd>
              {link(d.topicId)}
            </div>
          ))}
          {!defs.length && <p className="empty">No definitions match “{q}”.</p>}
        </dl>
      )}
      {tab === 'tips' && (
        <div className="two-col">
          <section>
            <h2 className="section-title">Exam tips</h2>
            <ul className="tip-list tips">{tips.map((t, i) => <li key={i}>{t.text}{link(t.topicId)}</li>)}</ul>
          </section>
          <section>
            <h2 className="section-title">Common mistakes</h2>
            <ul className="tip-list mistakes">{mist.map((t, i) => <li key={i}>{t.text}{link(t.topicId)}</li>)}</ul>
          </section>
        </div>
      )}
    </div>
  )
}
