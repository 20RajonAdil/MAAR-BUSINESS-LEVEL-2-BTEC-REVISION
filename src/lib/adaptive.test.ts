import { describe, it, expect } from 'vitest'
import { subjects } from '../data/subjects'
import { checkAnswer } from './check'
import { buildMixedAdaptive, buildTopicQuiz, questionWeight, shuffleOptions, topicRows, weakestQuestions, weightedSample, type Mastery } from './adaptive'

function seeded(seed: number) { let s = seed; return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 } }
const all = subjects.flatMap(s => s.topics.flatMap(t => t.questions))
const NOW = 1_700_000_000_000

describe('option shuffling', () => {
  it('keeps the correct answer correct for every mcq and multi question', () => {
    for (const q of all) {
      const s = shuffleOptions(q, seeded(7))
      if (q.type === 'mcq' && s.type === 'mcq') expect(s.options[s.answer], q.id).toBe(q.options[q.answer])
      if (q.type === 'multi' && s.type === 'multi') expect(s.answers.map(i => s.options[i]).sort(), q.id).toEqual(q.answers.map(i => q.options[i]).sort())
      expect(new Set(s.type === 'mcq' || s.type === 'multi' ? s.options : []).size).toBe(q.type === 'mcq' || q.type === 'multi' ? q.options.length : 0)
    }
  })
  it('a shuffled question still marks the right answer correct', () => {
    for (const q of all) {
      const s = shuffleOptions(q, seeded(3))
      if (s.type === 'mcq') expect(checkAnswer(s, s.answer).correct, q.id).toBe(true)
      if (s.type === 'multi') expect(checkAnswer(s, s.answers).correct, q.id).toBe(true)
    }
  })
  it('does not leave the right answer in a fixed position', () => {
    const q = all.find(x => x.type === 'mcq')!
    const spots = new Set<number>()
    for (let i = 1; i < 40; i++) { const s = shuffleOptions(q, seeded(i)); if (s.type === 'mcq') spots.add(s.answer) }
    expect(spots.size).toBeGreaterThan(1)
  })
  it('leaves position-dependent options alone', () => {
    const q = { ...(all.find(x => x.type === 'mcq')!), options: ['A thing', 'Another', 'All of the above'], answer: 2 } as typeof all[number]
    expect(shuffleOptions(q, seeded(1))).toBe(q)
  })
})

describe('weights', () => {
  const base = { seen: 3, streak: 0, lastWrong: false, at: NOW }
  it('weak questions are heavier than mastered ones', () => {
    expect(questionWeight({ ...base, ema: 0.1, lastWrong: true }, NOW)).toBeGreaterThan(questionWeight({ ...base, ema: 0.95, streak: 4 }, NOW) * 5)
  })
  it('unseen questions are introduced, but a wrong one outranks them', () => {
    expect(questionWeight(undefined, NOW)).toBeGreaterThan(questionWeight({ ...base, ema: 0.95, streak: 3 }, NOW))
    expect(questionWeight({ ...base, ema: 0, lastWrong: true }, NOW)).toBeGreaterThan(questionWeight(undefined, NOW))
  })
  it('a mastered question creeps back over time', () => {
    const s = { ...base, ema: 0.95, streak: 4 }
    expect(questionWeight(s, NOW + 10 * 86_400_000)).toBeGreaterThan(questionWeight(s, NOW))
  })
  it('weighted sampling favours heavy items without being deterministic', () => {
    const items = ['heavy', 'light1', 'light2', 'light3']
    let heavy = 0
    for (let i = 1; i <= 400; i++) if (weightedSample(items, t => (t === 'heavy' ? 10 : 1), 1, seeded(i))[0] === 'heavy') heavy++
    expect(heavy).toBeGreaterThan(200); expect(heavy).toBeLessThan(400)
  })
})

describe('quiz building', () => {
  const finance = subjects[0]
  const topic = finance.topics.find(t => !t.customTest && t.questions.length >= 10)!
  it('topic quiz: unique questions from that topic, different each time', () => {
    const a = buildTopicQuiz(topic, {}, 10, seeded(1), NOW), b = buildTopicQuiz(topic, {}, 10, seeded(2), NOW)
    expect(new Set(a.map(q => q.id)).size).toBe(10)
    expect(a.every(q => q.topicId === topic.id)).toBe(true)
    expect(a.map(q => q.id)).not.toEqual(b.map(q => q.id))
  })
  it('topic quiz leans towards questions the student keeps missing', () => {
    const target = topic.questions[0]
    const m: Mastery = { [target.id]: { seen: 4, ema: 0, streak: 0, lastWrong: true, at: NOW } }
    for (const q of topic.questions.slice(1)) m[q.id] = { seen: 4, ema: 1, streak: 4, lastWrong: false, at: NOW }
    let hits = 0
    for (let i = 1; i <= 100; i++) if (buildTopicQuiz(topic, m, 3, seeded(i), NOW).some(q => q.id === target.id)) hits++
    expect(hits).toBeGreaterThan(85)
  })
  it('mixed exam: every topic appears, no duplicates, at most 2 written questions', () => {
    for (const s of subjects.filter(x => x.status === 'active')) {
      const qs = buildMixedAdaptive(s, {}, 28, seeded(5), NOW)
      expect(new Set(qs.map(q => q.id)).size).toBe(qs.length)
      expect(qs.length).toBe(28)
      expect(new Set(qs.map(q => q.topicId)).size).toBe(s.topics.filter(t => t.questions.length).length)
      expect(qs.filter(q => q.type === 'short').length).toBeLessThanOrEqual(2)
    }
  })
})

describe('progress reading', () => {
  const finance = subjects[0]
  const t = finance.topics.find(x => !x.customTest)!
  it('reports weak topics and the questions missed', () => {
    const m: Mastery = {}
    for (const q of t.questions) m[q.id] = { seen: 2, ema: 0.2, streak: 0, lastWrong: true, at: NOW }
    const row = topicRows(finance, m).find(r => r.topic.id === t.id)!
    expect(row.status).toBe('weak'); expect(row.tried).toBe(t.questions.length)
    expect(topicRows(finance, {}).every(r => r.status === 'new')).toBe(true)
    expect(weakestQuestions(finance, m, 3)).toHaveLength(3)
  })
})
