import { useEffect, useState } from 'react'
import type { Question, Subject, Topic, Verdict } from '../types'
import { shuffle } from './exam'

type Rng = () => number

// ───────────── 1. Shuffling: no fixed order, no fixed answer position ─────────────

/** Options that only make sense in their original position ("all of the above", "both A and B"). Those are left alone. */
const POSITIONAL = /\b(all|none|both|neither)\b.{0,14}\b(above|these)\b|\b(options?|answers?)\s+[A-F]\b/i

/** Returns a copy with the options in a random order and the correct answer(s) re-pointed, so the right answer is never in a predictable place. */
export function shuffleOptions(q: Question, rnd: Rng = Math.random): Question {
  if (q.type !== 'mcq' && q.type !== 'multi') return q
  if (q.options.some(o => POSITIONAL.test(o))) return q
  const order = shuffle(q.options.map((_, i) => i), rnd) // order[newIndex] = oldIndex
  const options = order.map(i => q.options[i])
  if (q.type === 'mcq') return { ...q, options, answer: order.indexOf(q.answer) }
  return { ...q, options, answers: q.answers.map(a => order.indexOf(a)).sort((a, b) => a - b) }
}

// ───────────── 2. Memory of how each question has gone ─────────────

export interface QStat {
  seen: number
  /** recent-weighted score, 0..1 (1 = always right lately) */
  ema: number
  /** current run of correct answers */
  streak: number
  lastWrong: boolean
  at: number
}
export type Mastery = Record<string, QStat>
export interface Session { at: number; subject: string; scope: string; pct: number; n: number }

const MKEY = 'maar-btec-mastery-v1'
const SKEY = 'maar-btec-sessions-v1'
const EVT = 'maar-mastery'
const MAX_SESSIONS = 80

function readJson<T>(key: string, fallback: T): T {
  try { const s = localStorage.getItem(key); return s ? (JSON.parse(s) as T) : fallback } catch { return fallback }
}
function writeJson(key: string, v: unknown) {
  try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* storage unavailable: the app still works, it just cannot adapt */ }
  window.dispatchEvent(new Event(EVT))
}

export const loadMastery = (): Mastery => readJson<Mastery>(MKEY, {})
export const loadSessions = (): Session[] => readJson<Session[]>(SKEY, [])

/** Call every time an answer is checked. */
export function recordAnswer(qid: string, v: Verdict, now = Date.now()) {
  const m = loadMastery()
  const prev = m[qid]
  m[qid] = {
    seen: (prev?.seen ?? 0) + 1,
    ema: prev ? 0.5 * v.score + 0.5 * prev.ema : v.score,
    streak: v.correct ? (prev?.streak ?? 0) + 1 : 0,
    lastWrong: !v.correct,
    at: now,
  }
  writeJson(MKEY, m)
}

/** Call when a test is finished: feeds the progress graph. */
export function logSession(s: Session) {
  writeJson(SKEY, [...loadSessions(), s].slice(-MAX_SESSIONS))
}

export function resetAdaptive() {
  try { localStorage.removeItem(MKEY); localStorage.removeItem(SKEY) } catch { /* ignore */ }
  window.dispatchEvent(new Event(EVT))
}

export function useMastery() {
  const [state, setState] = useState(() => ({ mastery: loadMastery(), sessions: loadSessions() }))
  useEffect(() => {
    const on = () => setState({ mastery: loadMastery(), sessions: loadSessions() })
    window.addEventListener(EVT, on); window.addEventListener('storage', on)
    return () => { window.removeEventListener(EVT, on); window.removeEventListener('storage', on) }
  }, [])
  return state
}

// ───────────── 3. The algorithm: how likely is each question to come up? ─────────────

const DAY = 86_400_000

/** Higher weight = more likely to be picked.
 *  - never seen: medium-high (introduce new material)
 *  - recently wrong / low recent score: high
 *  - answered correctly several times in a row: low
 *  - not seen for days: creeps back up (spaced repetition: you forget things) */
export function questionWeight(s: QStat | undefined, now = Date.now()): number {
  if (!s || s.seen === 0) return 2.2
  let w = 0.35 + 3.5 * (1 - s.ema)
  if (s.lastWrong) w *= 1.6
  w *= Math.pow(0.75, Math.min(s.streak, 4))
  w *= 1 + Math.min((now - s.at) / DAY, 14) * 0.08
  return Math.max(0.15, w)
}

/** Weighted random sample without replacement (Efraimidis-Spirakis): heavier items usually win, but nothing is guaranteed. */
export function weightedSample<T>(items: T[], weight: (t: T) => number, n: number, rnd: Rng = Math.random): T[] {
  return items
    .map(t => ({ t, k: Math.pow(Math.max(rnd(), 1e-12), 1 / Math.max(weight(t), 1e-6)) }))
    .sort((a, b) => b.k - a.k)
    .slice(0, n)
    .map(x => x.t)
}

/** A topic test: a fresh random selection each time, leaning towards questions this person finds hard, in shuffled order with shuffled options. */
export function buildTopicQuiz(topic: Topic, mastery: Mastery = loadMastery(), size = 10, rnd: Rng = Math.random, now = Date.now()): Question[] {
  const picked = weightedSample(topic.questions, q => questionWeight(mastery[q.id], now), Math.min(size, topic.questions.length), rnd)
  return shuffle(picked, rnd).map(q => shuffleOptions(q, rnd))
}

/** Mixed exam: at least one question from every topic, then the rest chosen by weight so weak topics get more. */
export function buildMixedAdaptive(subject: Subject, mastery: Mastery = loadMastery(), size = 28, rnd: Rng = Math.random, now = Date.now()): Question[] {
  const topics = subject.topics.filter(t => t.questions.length)
  const cap = Math.max(2, Math.ceil((size / Math.max(topics.length, 1)) * 2))
  const picked: Question[] = []
  const used = new Set<string>()
  const perTopic: Record<string, number> = {}
  let shorts = 0
  const take = (q: Question) => {
    picked.push(q); used.add(q.id)
    perTopic[q.topicId] = (perTopic[q.topicId] ?? 0) + 1
    if (q.type === 'short') shorts++
  }
  const ok = (q: Question) => !used.has(q.id) && !(q.type === 'short' && shorts >= 2)
  const w = (q: Question) => questionWeight(mastery[q.id], now)

  // one from each topic first, so every topic is touched
  for (const t of shuffle(topics, rnd)) {
    if (picked.length >= size) break
    const q = weightedSample(t.questions.filter(ok), w, 1, rnd)[0]
    if (q) take(q)
  }
  // the rest by weight, capped per topic
  const rest = weightedSample(topics.flatMap(t => t.questions).filter(ok), w, Infinity, rnd)
  for (const q of rest) {
    if (picked.length >= size) break
    if (ok(q) && (perTopic[q.topicId] ?? 0) < cap) take(q)
  }
  for (const q of rest) { // fallback if caps left gaps
    if (picked.length >= size) break
    if (ok(q)) take(q)
  }
  return shuffle(picked, rnd).map(q => shuffleOptions(q, rnd))
}

// ───────────── 4. Reading the data back: strengths and weaknesses ─────────────

export type Status = 'strong' | 'developing' | 'weak' | 'new'
export const statusOf = (score: number | null): Status => (score === null ? 'new' : score >= 0.8 ? 'strong' : score >= 0.55 ? 'developing' : 'weak')

export interface TopicRow {
  topic: Topic
  total: number
  tried: number
  /** 0..1, or null if nothing attempted */
  score: number | null
  status: Status
}

/** `external` lets a topic with its own test (the formula test) report its own numbers. */
export function topicRows(subject: Subject, mastery: Mastery, external: Record<string, { score: number | null; tried: number; total: number }> = {}): TopicRow[] {
  return subject.topics.map(topic => {
    const ext = external[topic.id]
    if (ext) return { topic, total: ext.total, tried: ext.tried, score: ext.score, status: statusOf(ext.score) }
    const seen = topic.questions.map(q => mastery[q.id]).filter((s): s is QStat => !!s && s.seen > 0)
    const score = seen.length ? seen.reduce((a, s) => a + s.ema, 0) / seen.length : null
    return { topic, total: topic.questions.length, tried: seen.length, score, status: statusOf(score) }
  })
}

/** The questions this person most needs to see again. */
export function weakestQuestions(subject: Subject, mastery: Mastery, n = 5): { q: Question; stat: QStat }[] {
  const out: { q: Question; stat: QStat }[] = []
  for (const t of subject.topics) for (const q of t.questions) {
    const stat = mastery[q.id]
    if (stat && stat.seen > 0 && stat.ema < 0.6) out.push({ q, stat })
  }
  return out.sort((a, b) => a.stat.ema - b.stat.ema || b.stat.seen - a.stat.seen).slice(0, n)
}

/** Overall score across everything attempted in this subject (each attempted topic counts by how many questions were tried). */
export function overallScore(rows: TopicRow[]): number | null {
  const tried = rows.filter(r => r.score !== null && r.tried > 0)
  const n = tried.reduce((a, r) => a + r.tried, 0)
  return n ? tried.reduce((a, r) => a + (r.score as number) * r.tried, 0) / n : null
}
