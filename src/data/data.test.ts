import { describe, it, expect } from 'vitest'
import { subjects } from './subjects'
import { checkAnswer } from '../lib/check'

const all = subjects.flatMap(s => s.topics.flatMap(t => t.questions))

describe('written-answer questions', () => {
  const shorts = all.filter(q => q.type === 'short')
  it('has written questions to check', () => expect(shorts.length).toBeGreaterThan(30))
  it('every model answer passes its own marking rules', () => {
    const bad = shorts.filter(q => q.type === 'short' && !checkAnswer(q, q.modelAnswer).correct).map(q => q.id)
    expect(bad).toEqual([])
  })
  it('a non-answer never passes', () => {
    const bad = shorts.filter(q => checkAnswer(q, 'I do not know about this').correct).map(q => q.id)
    expect(bad).toEqual([])
  })
  it('need never exceeds the number of key-idea groups', () => {
    const bad = shorts.filter(q => q.type === 'short' && q.need > q.groups.length).map(q => q.id)
    expect(bad).toEqual([])
  })
})

describe('fill questions', () => {
  it('every accepted answer is accepted', () => {
    for (const q of all) if (q.type === 'fill') for (const a of q.accepted) expect(checkAnswer(q, a).correct, q.id + ' ' + a).toBe(true)
  })
})

describe('question ids', () => {
  it('are unique across all subjects', () => expect(new Set(all.map(q => q.id)).size).toBe(all.length))
})
