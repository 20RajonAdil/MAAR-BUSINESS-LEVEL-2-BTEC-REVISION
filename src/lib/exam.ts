import type { Question, Subject } from '../types'

export const MIXED = 'mixed'

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Mixed-topic practice exam: ~2 questions from every topic (short evaluation questions limited to 2), shuffled. */
export function buildMixed(subject: Subject, size = 28): Question[] {
  const picked: Question[] = []
  let shorts = 0
  const pools = subject.topics.map(t => shuffle(t.questions))
  for (let round = 0; picked.length < size && round < 6; round++) {
    for (const pool of pools) {
      const q = pool[round]
      if (!q || picked.length >= size) continue
      if (q.type === 'short') { if (shorts >= 2) continue; shorts++ }
      picked.push(q)
    }
  }
  return shuffle(picked)
}

export function allQuestions(subject: Subject): Record<string, Question> {
  const m: Record<string, Question> = {}
  for (const t of subject.topics) for (const q of t.questions) m[q.id] = q
  return m
}
