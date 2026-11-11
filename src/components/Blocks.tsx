import type { Block } from '../types'
import { inline } from '../lib/text'
import { Chart } from './Charts'

const TONE_LABEL = { key: 'Key point', tip: 'Tip', warn: 'Watch out', exam: 'Exam' } as const

export function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case 'p':
      return <p className="b-p">{inline(b.text)}</p>
    case 'list': {
      const Tag = b.ordered ? 'ol' : 'ul'
      return <Tag className="b-list">{b.items.map((it, i) => <li key={i}>{inline(it)}</li>)}</Tag>
    }
    case 'formula':
      return (
        <div className="b-formula">
          <div className="b-label">Formula · {b.name}</div>
          <div className="b-formula-eq">{b.formula}</div>
          {b.vars && b.vars.length > 0 && (
            <dl className="b-vars">
              {b.vars.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          )}
        </div>
      )
    case 'example':
      return (
        <div className="b-example">
          <div className="b-label">Worked example{b.title ? ` · ${b.title}` : ''}</div>
          <ol className="b-steps">{b.steps.map((s, i) => <li key={i}>{inline(s)}</li>)}</ol>
          {b.result && <div className="b-result">Answer: <strong>{b.result}</strong></div>}
        </div>
      )
    case 'table':
      return (
        <div className="b-table-wrap">
          <table className="b-table">
            {b.caption && <caption>{b.caption}</caption>}
            <thead><tr>{b.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className={b.boldRows?.includes(i) ? 'strong' : ''}>
                  {r.map((c, j) => j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'callout':
      return (
        <div className={`b-callout tone-${b.tone}`}>
          <div className="b-callout-title">{b.title ?? TONE_LABEL[b.tone]}</div>
          <div>{inline(b.text)}</div>
        </div>
      )
    case 'terms':
      return (
        <dl className="b-terms">
          {b.items.map(([k, v]) => <div key={k} className="b-term"><dt>{k}</dt><dd>{inline(v)}</dd></div>)}
        </dl>
      )
    case 'compare':
      return (
        <div className="b-compare">
          {[b.left, b.right].map((side, i) => (
            <div key={i} className={`b-side side-${i}`}>
              <h4>{side.title}</h4>
              <ul>{side.items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ul>
            </div>
          ))}
        </div>
      )
    case 'chart':
      return (
        <div className="b-chart">
          <Chart id={b.id} />
          {b.caption && <div className="b-caption">{b.caption}</div>}
        </div>
      )
  }
}
