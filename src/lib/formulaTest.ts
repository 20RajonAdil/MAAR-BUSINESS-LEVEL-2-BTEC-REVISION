import { useCallback, useEffect, useState } from 'react'
import type { Question } from '../types'
import { MUST_KNOW_ID, formulaBank, fullFormula, pick, type FormulaDef, type Rng } from '../data/finance/formulaBank'
import { shuffle } from './exam'

export type Kind = 'recall' | 'identify' | 'fill' | 'tf' | 'calc'
const KINDS: Kind[] = ['recall', 'identify', 'fill', 'tf', 'calc']
export const REQUIRED_ATTEMPTS = 3

export interface AttemptItem { fid: string; kind: Kind; skill: 'recall' | 'apply'; correct: boolean }
export interface Attempt { at: number; items: AttemptItem[] }

// ───────────── question generation ─────────────
const rank = (kind: Kind): 'recall' | 'apply' => (kind === 'calc' ? 'apply' : 'recall')

export function makeQuestion(def: FormulaDef, kind: Kind, id: string, rnd: Rng = Math.random): Question {
  const base = { id, topicId: MUST_KNOW_ID, slide: def.mustKnowSlide, origin: 'generated' as const, fid: def.id, skill: rank(kind) }
  const where = `Revise this formula on the “Formulas you MUST know” slides.`
  const right = fullFormula(def)
  switch (kind) {
    case 'recall': {
      const opts = shuffle([def.rhs, ...shuffle(def.wrong).slice(0, 3)], rnd)
      return { ...base, type: 'mcq', prompt: `Which is the correct formula for **${def.name}**?`, options: opts.map(o => `${def.name} = ${o}`), answer: opts.indexOf(def.rhs), explanation: `${right}. ${where}` }
    }
    case 'identify': {
      const others = shuffle(formulaBank.filter(f => f.id !== def.id && f.rhs !== def.rhs), rnd).slice(0, 3)
      const opts = shuffle([def, ...others], rnd)
      return { ...base, type: 'mcq', prompt: `Which measure is calculated using this formula?  **? = ${def.rhs}**`, options: opts.map(f => f.name), answer: opts.indexOf(def), explanation: `${right}. ${where}` }
    }
    case 'fill': {
      const f = pick(rnd, def.fills)
      return { ...base, type: 'fill', prompt: `Complete the formula:  **${f.prompt}**`, accepted: f.accepted, explanation: `${right}. ${where}` }
    }
    case 'tf': {
      const isTrue = rnd() < 0.5
      const shown = isTrue ? def.rhs : pick(rnd, def.wrong)
      return { ...base, type: 'tf', prompt: `True or false?  **${def.name} = ${shown}**`, answer: isTrue, explanation: `${isTrue ? 'Correct as written' : 'That is not right'}. The formula is ${right}. ${where}` }
    }
    case 'calc': {
      const g = def.calc(rnd)
      return { ...base, type: 'calc', prompt: g.prompt, answer: g.answer, unit: g.unit, decimals: g.decimals, explanation: `${g.explanation} (${right})` }
    }
  }
}

function weightedKind(rnd: Rng, avoid: Kind[], recent?: Kind): Kind {
  const w = KINDS.filter(k => !avoid.includes(k)).map(k => ({ k, w: (k === 'calc' ? 1.3 : 1) * (k === recent ? 0.2 : 1) }))
  let t = rnd() * w.reduce((s, x) => s + x.w, 0)
  for (const x of w) { t -= x.w; if (t <= 0) return x.k }
  return w[0].k
}

export function formulaStats(history: Attempt[]) {
  const m: Record<string, { total: number; correct: number }> = {}
  for (const a of history) for (const i of a.items) {
    const s = (m[i.fid] ??= { total: 0, correct: 0 })
    s.total++; if (i.correct) s.correct++
  }
  return m
}

/** One question for each of the 11 formulas, in random order and with a different format each time.
 *  From the second attempt on, up to 5 extra questions are added on the formulas the student keeps missing. */
export function buildAttempt(history: Attempt[], rnd: Rng = Math.random): Question[] {
  const last = history[history.length - 1]
  const qs: Question[] = []
  const used: Record<string, Kind> = {}
  let n = 0
  for (const def of formulaBank) {
    const recent = last?.items.find(i => i.fid === def.id)?.kind
    const kind = weightedKind(rnd, [], recent)
    used[def.id] = kind
    qs.push(makeQuestion(def, kind, `ft-${history.length + 1}-${++n}`, rnd))
  }
  const stats = formulaStats(history)
  const weak = formulaBank
    .map(f => ({ f, acc: stats[f.id] ? stats[f.id].correct / stats[f.id].total : 1 }))
    .filter(x => x.acc < 0.8)
    .sort((a, b) => a.acc - b.acc)
    .slice(0, 5)
  for (const { f } of weak) qs.push(makeQuestion(f, weightedKind(rnd, [used[f.id]]), `ft-${history.length + 1}-${++n}`, rnd))
  return shuffle(qs, rnd)
}

// ───────────── history storage ─────────────
const KEY = 'maar-btec-formula-v1'
function read(): Attempt[] { try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] } }
function write(a: Attempt[]) {
  try { localStorage.setItem(KEY, JSON.stringify(a)) } catch { /* storage unavailable */ }
  window.dispatchEvent(new Event('maar-formula'))
}
export function useFormulaHistory() {
  const [h, setH] = useState<Attempt[]>(read)
  useEffect(() => {
    const on = () => setH(read())
    window.addEventListener('maar-formula', on); window.addEventListener('storage', on)
    return () => { window.removeEventListener('maar-formula', on); window.removeEventListener('storage', on) }
  }, [])
  const add = useCallback((a: Attempt) => write([...read(), a]), [])
  const reset = useCallback(() => write([]), [])
  return { history: h, add, reset }
}

// ───────────── improvement report ─────────────
export type Status = 'secure' | 'developing' | 'weak'
export interface Row {
  def: FormulaDef
  total: number; correct: number; pct: number
  recallPct: number | null; applyPct: number | null
  perAttempt: (number | null)[]
  status: Status
  advice: string[]
}
export interface Report {
  window: Attempt[]
  attemptPct: number[]
  overall: number
  change: number
  rows: Row[]
  weakest: Row[]
  strongest: Row[]
  headline: string
}

const pctOf = (c: number, t: number) => (t ? c / t : null)

/** Uses the student's most recent 3 attempts. */
export function buildReport(history: Attempt[]): Report | null {
  if (history.length < REQUIRED_ATTEMPTS) return null
  const win = history.slice(-REQUIRED_ATTEMPTS)
  const attemptPct = win.map(a => a.items.filter(i => i.correct).length / a.items.length)
  const rows: Row[] = formulaBank.map(def => {
    const items = win.flatMap(a => a.items.filter(i => i.fid === def.id))
    const total = items.length, correct = items.filter(i => i.correct).length
    const rec = items.filter(i => i.skill === 'recall'), app = items.filter(i => i.skill === 'apply')
    const recallPct = pctOf(rec.filter(i => i.correct).length, rec.length)
    const applyPct = pctOf(app.filter(i => i.correct).length, app.length)
    const perAttempt = win.map(a => { const it = a.items.filter(i => i.fid === def.id); return it.length ? it.filter(i => i.correct).length / it.length : null })
    const pct = total ? correct / total : 0
    const status: Status = pct >= 0.8 ? 'secure' : pct >= 0.5 ? 'developing' : 'weak'
    const advice: string[] = []
    if (status !== 'secure') {
      if (recallPct !== null && recallPct < 0.7) advice.push(`Memorise the formula itself: re-read “${def.name}” on slide ${def.mustKnowSlide + 1} of the formula slides, then cover it and write it from memory.`)
      if (applyPct !== null && applyPct < 0.7) advice.push(`Practise using it: you can lose marks in calculations even when you know the formula. Work through the examples in the topic where it is taught.`)
      if (!advice.length) advice.push('You are close: one more careful read of the formula slide should make it secure.')
    }
    return { def, total, correct, pct, recallPct, applyPct, perAttempt, status, advice }
  })
  const overall = attemptPct.reduce((s, x) => s + x, 0) / attemptPct.length
  const change = attemptPct[attemptPct.length - 1] - attemptPct[0]
  const needs = rows.filter(r => r.status !== 'secure').sort((a, b) => a.pct - b.pct)
  const strongest = rows.filter(r => r.status === 'secure').sort((a, b) => b.pct - a.pct).slice(0, 4)
  const headline = needs.length === 0
    ? 'Excellent: you know all 11 formulas securely. Keep them fresh with a quick test before the exam.'
    : needs.length <= 3 ? `You are nearly there: ${needs.length} formula${needs.length > 1 ? 's need' : ' needs'} more work.`
      : `${needs.length} of the 11 formulas need more practice. Focus on the weakest first.`
  return { window: win, attemptPct, overall, change, rows, weakest: needs.slice(0, 5), strongest, headline }
}
