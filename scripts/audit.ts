// Data audit: structural checks + independent re-calculation of every numeric answer.
import { subjects } from '../src/data/subjects'
import type { Question } from '../src/types'

let problems = 0
const fail = (m: string) => { problems++; console.log('✗', m) }
const all: Question[] = []
const ids = new Set<string>()

for (const s of subjects) for (const t of s.topics) {
  if (!t.slides.length) fail(`${t.id}: no slides`)
  if (!t.customTest && t.questions.length < 8) fail(`${t.id}: fewer than 8 questions`)
  for (const q of t.questions) {
    all.push(q)
    if (ids.has(q.id)) fail(`duplicate id ${q.id}`)
    ids.add(q.id)
    if (q.slide < 0 || q.slide >= t.slides.length) fail(`${q.id}: slide ${q.slide} out of range (topic has ${t.slides.length})`)
    if (q.type === 'mcq' && (q.answer < 0 || q.answer >= q.options.length)) fail(`${q.id}: mcq answer out of range`)
    if (q.type === 'multi' && q.answers.some(a => a < 0 || a >= q.options.length)) fail(`${q.id}: multi answer out of range`)
    if (q.type === 'mcq' && new Set(q.options).size !== q.options.length) fail(`${q.id}: duplicate options`)
    if (q.type === 'calc' && !Number.isFinite(q.answer)) fail(`${q.id}: bad calc`)
  }
}

// Independent maths: [question id, expression evaluated by JS, rounding decimals]
const checks: [string, number, number?][] = []
const byPrefix = (p: string) => all.filter(q => q.id.startsWith(p))
const exp: Record<string, number> = {
  'total-costs-q1': 5621 + 231.21, 'total-costs-q2': 1021 + 341.89, 'total-costs-q3': 5621.23 + 939.71, 'total-costs-q4': 1245 + 460 + 3200,
  'total-costs-q6': 2548 + 1795, 'total-costs-q7': 34788.12 + 17959.34, 'total-costs-q8': 2245 + 560 + 5000, 'total-costs-q9': 3456 + 780 + 1430, 'total-costs-q10': 13456 + 1780 + 4430,
  'total-costs-q12': 4200 + 1875,
  'revenue-q1': 5621 * 3.21, 'revenue-q2': 1400 * 4.5, 'revenue-q3': 43 * 125, 'revenue-q7': 1748 * 3.75, 'revenue-q9': 621 * 9.71, 'revenue-q10': 12042 * 6.8, 'revenue-q11': 8.25 * 476, 'revenue-q13': 5600 * 3.75,
  'profit-loss-q11': 800 - 1500, 'profit-loss-q13': 48300 - 39950,
  'break-even-chart-q14': 2000 / (8 - 4), 'break-even-chart-q15': 2000 + 1000 * 4,
  'break-even-calc-q3': Math.ceil(2000 / 15), 'break-even-calc-q4': 3500 / (39.99 - 19.99), 'break-even-calc-q5': 1650 / (9.99 - 7.99), 'break-even-calc-q6': 100 / (1.3 - 0.8),
  'break-even-calc-q11': 50 - 30, 'break-even-calc-q12': 300 / (5 - 2), 'break-even-calc-q13': 2000 / (8 - 4),
  'gross-net-profit-q1': 40000 - 10000, 'gross-net-profit-q2': 40000 - 10000 - 20000 - 2000, 'gross-net-profit-q4': 25000 - 16000, 'gross-net-profit-q5': 25000 - 16000 - 4000 - 3000,
  'gross-net-profit-q6': 26000 - 14500, 'gross-net-profit-q7': 46254 - 25420, 'gross-net-profit-q8': 46254 - 25420 - 5000 - 19878, 'gross-net-profit-q9': 35000 - 13000, 'gross-net-profit-q10': 13000 - 2000 - 5000,
  'gross-net-profit-q11': 33875 - 19320, 'gross-net-profit-q12': 27800 - (18400 - 0.2 * 18400),
  'income-statement-q2': 27500 - 22500, 'income-statement-q3': 1860 - 2940, 'income-statement-q4': 3100 - 4000,
  'financial-position-q2': (24740 + 8630 + 6250) - (31370 + 4200), 'financial-position-q3': (18270 + 6450 + 3760) - (21640 + 9650),
  'financial-position-q4': 28250 - 22600, 'financial-position-q5': 9650 - 4200, 'financial-position-q6': 32300 - 19790,
  'cash-flow-q2': 300 - 100, 'cash-flow-q3': 1500 - 1100, 'cash-flow-q5': 6000 - 9550, 'cash-flow-q6': -2400 + 2750, 'cash-flow-q7': 8000 - 6400,
  'interpreting-research-q1': (3 / 25) * 100, 'interpreting-research-q2': (2 / 20) * 100, 'interpreting-research-q3': (1.2 / 10) * 100, 'interpreting-research-q4': (1.5 / 15) * 100, 'interpreting-research-q9': (450000 / 3000000) * 100, 'interpreting-research-q10': (50000 / 1000000) * 100,
  'ratios-comparing-q6': (12300 / 150000) * 100, 'ratios-comparing-q7': 3514 / 2510, 'ratios-comparing-q8': (14555 / 33875) * 100, 'ratios-comparing-q9': (60000 / 240000) * 100,
  'ratios-comparing-q10': (39620 - 6250) / 35570, 'ratios-comparing-q11': 28480 / 31290, 'ratios-comparing-q12': 480000 - 255000, 'ratios-comparing-q13': 65000 - 52000,
}
for (const [id, v] of Object.entries(exp)) checks.push([id, v])
void byPrefix
let verified = 0
for (const [id, v] of checks) {
  const q = all.find(x => x.id === id)
  if (!q) { fail(`audit refers to missing ${id}`); continue }
  if (q.type !== 'calc') { fail(`${id} is not calc`); continue }
  const tol = Math.max(Math.abs(v) * 0.001, 0.05)
  if (Math.abs(q.answer - v) > tol && !(q.alsoAccept ?? []).some(a => Math.abs(a - v) <= tol)) fail(`${id}: stored ${q.answer} but recalculated ${v}`)
  else verified++
}

// Multiple-choice calculation answers (checked by recomputing the option text)
const num = (s: string) => parseFloat(s.replace(/[£,]/g, ''))
const mcqExp: Record<string, number> = {
  'break-even-calc-q1': 120 / (1.25 - 0.75), 'break-even-calc-q2': 140 / (0.95 - 0.67),
  'total-costs-q13': 900 + 350,
}
for (const [id, v] of Object.entries(mcqExp)) {
  const q = all.find(x => x.id === id)
  if (!q || q.type !== 'mcq') { fail(`mcq check missing ${id}`); continue }
  const got = num(q.options[q.answer])
  if (Math.abs(got - v) > 0.01) fail(`${id}: option says ${got}, recomputed ${v}`); else verified++
}

const by = (o: string) => all.filter(q => q.origin === o).length
console.log(`Topics: ${subjects.flatMap(s => s.topics).length} | Questions: ${all.length} (original ${by('original')}, generated ${by('generated')}) | numeric answers re-verified: ${verified}`)
console.log(problems ? `\n${problems} problem(s) found` : '\n✓ audit passed')
process.exit(problems ? 1 : 0)
