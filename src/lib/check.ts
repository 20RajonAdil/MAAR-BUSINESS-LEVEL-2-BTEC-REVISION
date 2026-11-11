import type { Question, UserAnswer, Verdict } from '../types'

/** lower-case, strip punctuation/currency/extra spaces, so harmless formatting differences are ignored */
export function normaliseText(s: string): string {
  return s
    .toLowerCase()
    .replace(/[£$€]/g, '')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9.%\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) => {
    const row = new Array<number>(b.length + 1).fill(0)
    row[0] = i
    return row
  })
  for (let j = 1; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return dp[a.length][b.length]
}

/** allows a spelling slip: 1 edit for words of 5+ letters, 2 edits for 9+ */
function fuzzyWordMatch(a: string, b: string): boolean {
  if (a === b) return true
  const len = Math.max(a.length, b.length)
  if (len < 5) return false
  return levenshtein(a, b) <= (len >= 9 ? 2 : 1)
}

function stem(w: string): string {
  return w.length > 4 ? w.replace(/(ies|es|s|ed|ing)$/, '') : w
}

/** does the answer contain the phrase, allowing small spelling differences? */
export function containsPhrase(answer: string, phrase: string): boolean {
  const a = normaliseText(answer)
  const p = normaliseText(phrase)
  if (!p) return false
  if (a.includes(p)) return true
  const aw = a.split(' ').map(stem)
  const pw = p.split(' ').map(stem)
  return pw.every(w => aw.some(x => fuzzyWordMatch(x, w)))
}

/** Parse "£1,234.50", "8.2%", "1 234", "-£700", "(700)" into a number. Null if not numeric. */
export function parseNumber(raw: string): number | null {
  let s = raw.trim().toLowerCase()
  if (!s) return null
  let neg = false
  if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1) }
  s = s.replace(/[£$€\s]/g, '').replace(/,/g, '').replace(/%$/, '')
  s = s.replace(/[a-z]+$/, '')
  if (s.startsWith('-') || s.startsWith('−') || s.startsWith('–')) { neg = !neg; s = s.slice(1) }
  s = s.replace(/^[£$€]/, '')
  if (!/^(\d+\.?\d*|\.\d+)$/.test(s)) return null
  const n = parseFloat(s)
  return neg ? -n : n
}

export function numbersMatch(user: number, target: number, decimals?: number): boolean {
  if (target === 0) return Math.abs(user) < 0.005
  const tol = Math.max(Math.abs(target) * 0.001, decimals === undefined ? 0.01 : 0.5 * Math.pow(10, -decimals))
  return Math.abs(user - target) <= tol
}

export function checkAnswer(q: Question, a: UserAnswer): Verdict {
  switch (q.type) {
    case 'mcq':
      return a === q.answer ? { correct: true, score: 1 } : { correct: false, score: 0 }
    case 'tf':
      return a === q.answer ? { correct: true, score: 1 } : { correct: false, score: 0 }
    case 'multi': {
      const chosen = new Set(Array.isArray(a) ? a : [])
      const want = new Set(q.answers)
      const right = [...chosen].filter(x => want.has(x)).length
      const wrong = chosen.size - right
      const correct = wrong === 0 && right === want.size
      const score = correct ? 1 : Math.max(0, (right - wrong) / want.size)
      return { correct, score, detail: correct ? undefined : `You picked ${right} of ${want.size} correct answers${wrong ? ` and ${wrong} incorrect` : ''}.` }
    }
    case 'fill': {
      const text = typeof a === 'string' ? a : ''
      if (!text.trim()) return { correct: false, score: 0 }
      const ok = q.accepted.some(acc => {
        const n = normaliseText(acc), t = normaliseText(text)
        const pn = parseNumber(acc), pt = parseNumber(text)
        return n === t || (n.length >= 5 && fuzzyWordMatch(n, t)) || (pn !== null && pt !== null && numbersMatch(pt, pn))
      })
      return { correct: ok, score: ok ? 1 : 0 }
    }
    case 'calc': {
      const text = typeof a === 'string' ? a : ''
      const n = parseNumber(text)
      if (n === null) return { correct: false, score: 0, detail: text.trim() ? 'That does not look like a number.' : undefined }
      const targets = [q.answer, ...(q.alsoAccept ?? [])]
      const ok = targets.some(t => numbersMatch(n, t, q.decimals))
      return { correct: ok, score: ok ? 1 : 0 }
    }
    case 'short': {
      const text = typeof a === 'string' ? a : ''
      if (!text.trim()) return { correct: false, score: 0 }
      const hit = q.groups.filter(g => g.some(p => containsPhrase(text, p))).length
      const score = Math.min(1, hit / q.need)
      return { correct: hit >= q.need, score, detail: `You covered ${Math.min(hit, q.need)} of the ${q.need} key ideas needed.` }
    }
  }
}

export function fmtNum(n: number, unit: '£' | '%' | '' | undefined, decimals?: number): string {
  const d = decimals ?? (Number.isInteger(n) ? 0 : 2)
  const body = Math.abs(n).toLocaleString('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d })
  const sign = n < 0 ? '-' : ''
  if (unit === '£') return `${sign}£${body}`
  if (unit === '%') return `${sign}${body}%`
  return `${sign}${body}`
}

export function correctAnswerText(q: Question): string {
  switch (q.type) {
    case 'mcq': return q.options[q.answer]
    case 'multi': return q.answers.map(i => q.options[i]).join('  •  ')
    case 'tf': return q.answer ? 'True' : 'False'
    case 'fill': return q.accepted[0]
    case 'calc': return fmtNum(q.answer, q.unit, q.decimals)
    case 'short': return q.modelAnswer
  }
}
