import { describe, it, expect } from 'vitest'
import { buildAttempt, buildReport, makeQuestion, type Attempt, type Kind } from './formulaTest'
import { formulaBank } from '../data/finance/formulaBank'
import { checkAnswer, parseNumber } from './check'

const kinds: Kind[] = ['recall', 'identify', 'fill', 'tf', 'calc']

describe('formula question generation', () => {
  it('every generated question is answerable with its own correct answer (2,000 random samples)', () => {
    for (let n = 0; n < 2000; n++) {
      const def = formulaBank[n % formulaBank.length]
      const kind = kinds[n % kinds.length]
      const q = makeQuestion(def, kind, 'x')
      if (q.type === 'mcq') {
        expect(q.answer).toBeGreaterThanOrEqual(0)
        expect(new Set(q.options).size).toBe(q.options.length)
        expect(checkAnswer(q, q.answer).correct).toBe(true)
        expect(checkAnswer(q, (q.answer + 1) % q.options.length).correct).toBe(false)
      } else if (q.type === 'tf') {
        expect(checkAnswer(q, q.answer).correct).toBe(true)
        expect(checkAnswer(q, !q.answer).correct).toBe(false)
      } else if (q.type === 'fill') {
        expect(q.accepted.every(a => checkAnswer(q, a).correct)).toBe(true)
        expect(checkAnswer(q, 'banana').correct).toBe(false)
      } else if (q.type === 'calc') {
        expect(Number.isFinite(q.answer)).toBe(true)
        expect(checkAnswer(q, String(q.answer)).correct).toBe(true)
        expect(parseNumber(String(q.answer))).toBe(q.answer)
      }
    }
  })
  it('wrong look-alikes are never identical to the right formula', () => {
    for (const f of formulaBank) expect(f.wrong).not.toContain(f.rhs)
  })
  it('an attempt covers all 11 formulas in a shuffled order', () => {
    const a = buildAttempt([]), b = buildAttempt([])
    expect(new Set(a.map(q => q.fid)).size).toBe(11)
    expect(a.length).toBe(11)
    expect(a.map(q => q.fid).join()).not.toBe(b.map(q => q.fid).join())
  })
  it('adds extra questions on weak formulas after a poor attempt', () => {
    const bad: Attempt = { at: 1, items: formulaBank.map(f => ({ fid: f.id, kind: 'recall', skill: 'recall', correct: false })) }
    const next = buildAttempt([bad])
    expect(next.length).toBe(16)
  })
})

describe('improvement report', () => {
  const mk = (correctIds: string[]): Attempt => ({ at: 0, items: formulaBank.map(f => ({ fid: f.id, kind: 'calc', skill: 'apply', correct: correctIds.includes(f.id) })) })
  it('is locked until 3 attempts', () => {
    expect(buildReport([mk([]), mk([])])).toBeNull()
  })
  it('flags weak formulas, shows trend and advice', () => {
    const all = formulaBank.map(f => f.id)
    const r = buildReport([mk(all.slice(0, 4)), mk(all.slice(0, 6)), mk(all.slice(0, 8))])!
    expect(r.change).toBeGreaterThan(0)
    expect(r.rows.find(x => x.def.id === all[10])!.status).toBe('weak')
    expect(r.rows.find(x => x.def.id === all[0])!.status).toBe('secure')
    expect(r.weakest.length).toBeGreaterThan(0)
    expect(r.weakest[0].advice.length).toBeGreaterThan(0)
  })
})
