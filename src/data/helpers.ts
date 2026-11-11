import type { ChartId, Origin, Question } from '../types'

type Extra = { source?: string; note?: string; table?: Question['table']; chart?: ChartId; marks?: number }

/** Builds questions for one topic with auto ids. 'O' = original source question, 'G' = generated practice question. */
export function mk(topicId: string) {
  let n = 0
  const base = (slide: number, o: 'O' | 'G', prompt: string, explanation: string, x: Extra = {}) => ({
    id: `${topicId}-q${++n}`,
    topicId,
    slide,
    origin: (o === 'O' ? 'original' : 'generated') as Origin,
    prompt,
    explanation,
    ...x,
  })
  return {
    mcq: (slide: number, o: 'O' | 'G', prompt: string, options: string[], answer: number, explanation: string, x?: Extra): Question =>
      ({ ...base(slide, o, prompt, explanation, x), type: 'mcq', options, answer }),
    multi: (slide: number, o: 'O' | 'G', prompt: string, options: string[], answers: number[], explanation: string, x?: Extra): Question =>
      ({ ...base(slide, o, prompt, explanation, x), type: 'multi', options, answers }),
    tf: (slide: number, o: 'O' | 'G', prompt: string, answer: boolean, explanation: string, x?: Extra): Question =>
      ({ ...base(slide, o, prompt, explanation, x), type: 'tf', answer }),
    fill: (slide: number, o: 'O' | 'G', prompt: string, accepted: string[], explanation: string, x?: Extra): Question =>
      ({ ...base(slide, o, prompt, explanation, x), type: 'fill', accepted }),
    calc: (slide: number, o: 'O' | 'G', prompt: string, answer: number, unit: '£' | '%' | '', explanation: string, x?: Extra & { decimals?: number; alsoAccept?: number[] }): Question => {
      const { decimals, alsoAccept, ...rest } = x ?? {}
      return { ...base(slide, o, prompt, explanation, rest), type: 'calc', answer, unit, decimals, alsoAccept }
    },
    short: (slide: number, o: 'O' | 'G', prompt: string, groups: string[][], need: number, modelAnswer: string, explanation: string, x?: Extra): Question =>
      ({ ...base(slide, o, prompt, explanation, x), type: 'short', groups, need, modelAnswer }),
  }
}
