import { describe, it, expect } from 'vitest'
import { parseHash, resolveRoute } from './router'
import { finance } from '../data/subjects'

const r = (h: string) => resolveRoute(parseHash(h))
const t = finance.topics.find(x => !x.customTest)!

describe('routing: valid addresses', () => {
  it('open the right page', () => {
    for (const h of ['', '#', '#/', '#/finance', '#/finance/', '#/marketing', '#/finance/exam', '#/finance/revise', '#/finance/revise?find=SWOT', '#/finance/formulas', '#/finance/progress', '#/marketing/progress',
      `#/finance/learn/${t.id}`, `#/finance/learn/${t.id}/0`, `#/finance/quiz/${t.id}`, `#/finance/results/${t.id}`, '#/finance/results/mixed']) {
      expect(r(h).page, h).not.toBe('notfound')
    }
  })
})

describe('routing: any mistake is a 404', () => {
  it('shows the 404 page', () => {
    for (const h of ['#/fiance', '#/main', '#/finance/exm', '#/finance/progres', '#/finance/exam/extra', '#/finance/learn', `#/finance/learn/${t.id}/abc`, `#/finance/learn/${t.id}/999`,
      `#/finance/learn/${t.id}/0/extra`, '#/finance/learn/not-a-topic', '#/finance/quiz/nope', '#/finance/quiz', '#/finance/results/nope', '#/marketing/formulas', '#/finance/quizz/x', '#/a/b/c/d/e']) {
      expect(r(h).page, h).toBe('notfound')
    }
  })
})
