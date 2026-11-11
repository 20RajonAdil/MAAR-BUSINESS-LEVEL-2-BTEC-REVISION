import { describe, it, expect } from 'vitest'
import { checkAnswer, parseNumber, containsPhrase, normaliseText } from './check'
import type { Question } from '../types'

const base = { id: 'x', topicId: 't', slide: 0, origin: 'generated' as const, prompt: '', explanation: '' }

describe('parseNumber', () => {
  it('handles currency, commas, percentages, negatives, spaces', () => {
    expect(parseNumber('£81,655')).toBe(81655)
    expect(parseNumber('8.2%')).toBe(8.2)
    expect(parseNumber('-£700')).toBe(-700)
    expect(parseNumber('£-700')).toBe(-700)
    expect(parseNumber('(700)')).toBe(-700)
    expect(parseNumber('1 234')).toBe(1234)
    expect(parseNumber('200 hot dogs')).toBe(200)
    expect(parseNumber('abc')).toBeNull()
    expect(parseNumber('')).toBeNull()
  })
})

describe('calc questions', () => {
  const q: Question = { ...base, type: 'calc', answer: 8.2, unit: '%', decimals: 1 }
  it('accepts equivalent numerical answers and sensible rounding', () => {
    expect(checkAnswer(q, '8.2%').correct).toBe(true)
    expect(checkAnswer(q, '8.2').correct).toBe(true)
    expect(checkAnswer(q, '8.20 %').correct).toBe(true)
    expect(checkAnswer(q, '8.5').correct).toBe(false)
    expect(checkAnswer(q, '').correct).toBe(false)
  })
  it('accepts either rounding where alsoAccept is set', () => {
    const be: Question = { ...base, type: 'calc', answer: 134, alsoAccept: [133.33], decimals: 2 }
    expect(checkAnswer(be, '134').correct).toBe(true)
    expect(checkAnswer(be, '133.33').correct).toBe(true)
    expect(checkAnswer(be, '133').correct).toBe(false)
  })
  it('handles negative money values', () => {
    const l: Question = { ...base, type: 'calc', answer: -700, unit: '£' }
    expect(checkAnswer(l, '-£700').correct).toBe(true)
    expect(checkAnswer(l, '£700').correct).toBe(false)
  })
})

describe('fill questions', () => {
  const q: Question = { ...base, type: 'fill', accepted: ['revenue', 'sales revenue'] }
  it('ignores case, spacing and harmless spelling slips', () => {
    expect(checkAnswer(q, 'Revenue').correct).toBe(true)
    expect(checkAnswer(q, '  REVENUE ').correct).toBe(true)
    expect(checkAnswer(q, 'revenu').correct).toBe(true)
    expect(checkAnswer(q, 'profit').correct).toBe(false)
  })
})

describe('short answers', () => {
  const q: Question = {
    ...base, type: 'short', need: 2, modelAnswer: 'x',
    groups: [['break-even', 'break even'], ['margin of safety'], ['profit']],
  }
  it('accepts equivalent wording', () => {
    expect(checkAnswer(q, 'It shows the Break Even point and the margin of safety').correct).toBe(true)
    expect(checkAnswer(q, 'it shows the margin of safty and profit').correct).toBe(true)
    expect(checkAnswer(q, 'it shows profit').correct).toBe(false)
    expect(checkAnswer(q, 'it shows profit').score).toBeGreaterThan(0)
  })
  it('phrase helper', () => {
    expect(containsPhrase("The business's Fixed costs", 'fixed cost')).toBe(true)
    expect(normaliseText('£1,000!')).toBe('1 000')
  })
})

describe('multi, mcq, tf', () => {
  it('multi needs the exact set', () => {
    const q: Question = { ...base, type: 'multi', options: ['a', 'b', 'c'], answers: [0, 2] }
    expect(checkAnswer(q, [2, 0]).correct).toBe(true)
    expect(checkAnswer(q, [0]).correct).toBe(false)
    expect(checkAnswer(q, [0, 1, 2]).correct).toBe(false)
  })
  it('mcq / tf', () => {
    expect(checkAnswer({ ...base, type: 'mcq', options: ['a', 'b'], answer: 1 }, 1).correct).toBe(true)
    expect(checkAnswer({ ...base, type: 'tf', answer: true }, false).correct).toBe(false)
  })
})
