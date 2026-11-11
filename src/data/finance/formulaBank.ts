// The 11 "Formulas You MUST Know Off-By-Heart" from the course formula sheet.
// Every formula carries: wrong look-alikes (for multiple choice / true-false), fill-in blanks,
// and a generator of calculation questions with fresh random numbers.

export type Rng = () => number
export const ri = (r: Rng, a: number, b: number) => a + Math.floor(r() * (b - a + 1))
export const pick = <T,>(r: Rng, xs: T[]): T => xs[Math.floor(r() * xs.length)]
const gbp = (n: number) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })

export interface Gen { prompt: string; answer: number; unit: '£' | '%' | ''; decimals?: number; explanation: string }
export interface FormulaDef {
  id: string
  n: number
  name: string
  rhs: string
  wrong: string[]
  fills: { prompt: string; accepted: string[] }[]
  calc: (r: Rng) => Gen
  /** slide in the "Formulas you MUST know" topic */
  mustKnowSlide: number
  /** where the formula was first taught */
  topicId: string
  topicSlide: number
}

export const MUST_KNOW_ID = 'must-know-formulas'

export const formulaBank: FormulaDef[] = [
  {
    id: 'total-cost', n: 1, name: 'Total Cost', rhs: 'Fixed Cost + Variable Cost',
    wrong: ['Fixed Cost − Variable Cost', 'Fixed Cost × Variable Cost', 'Variable Cost ÷ Fixed Cost', 'Revenue − Variable Cost'],
    fills: [
      { prompt: 'Total Cost = Fixed Cost + ___', accepted: ['variable cost', 'variable costs', 'variable', 'vc'] },
      { prompt: 'Total Cost = ___ + Variable Cost', accepted: ['fixed cost', 'fixed costs', 'fixed', 'fc'] },
    ],
    calc: r => { const fc = ri(r, 12, 95) * 100, vc = ri(r, 3, 70) * 50
      return { prompt: `A business has fixed costs of ${gbp(fc)} and variable costs of ${gbp(vc)}. Calculate its total cost.`, answer: fc + vc, unit: '£', explanation: `Total Cost = Fixed Cost + Variable Cost = ${gbp(fc)} + ${gbp(vc)} = ${gbp(fc + vc)}.` } },
    mustKnowSlide: 2, topicId: 'total-costs', topicSlide: 1,
  },
  {
    id: 'revenue', n: 2, name: 'Revenue', rhs: 'Number of Sales × Price Per Unit',
    wrong: ['Number of Sales + Price Per Unit', 'Number of Sales ÷ Price Per Unit', 'Price Per Unit − Number of Sales', 'Number of Sales × Variable Cost Per Unit'],
    fills: [
      { prompt: 'Revenue = Number of Sales × ___', accepted: ['price per unit', 'price', 'selling price', 'selling price per unit', 'ppu'] },
      { prompt: 'Revenue = ___ × Price Per Unit', accepted: ['number of sales', 'sales', 'number sold', 'units sold', 'quantity', 'nos'] },
    ],
    calc: r => { const n = ri(r, 120, 950), p = ri(r, 200, 4000) / 100, a = Math.round(n * p * 100) / 100
      return { prompt: `A shop sells ${n.toLocaleString('en-GB')} items at ${gbp(p)} each. Calculate its revenue.`, answer: a, unit: '£', decimals: 2, explanation: `Revenue = Number of Sales × Price Per Unit = ${n} × ${gbp(p)} = ${gbp(a)}.` } },
    mustKnowSlide: 2, topicId: 'revenue', topicSlide: 2,
  },
  {
    id: 'profit', n: 3, name: 'Profit', rhs: 'Revenue − Expenditure',
    wrong: ['Revenue + Expenditure', 'Expenditure − Revenue', 'Revenue × Expenditure', 'Revenue − Cost of Sales'],
    fills: [
      { prompt: 'Profit = Revenue − ___', accepted: ['expenditure', 'expenses', 'expense', 'costs', 'cost'] },
      { prompt: 'Profit = ___ − Expenditure', accepted: ['revenue', 'sales', 'income', 'sales revenue'] },
    ],
    calc: r => { const rev = ri(r, 300, 900) * 100, ex = ri(r, 200, 950) * 100, a = rev - ex
      return { prompt: `A business has revenue of ${gbp(rev)} and expenditure of ${gbp(ex)}. Calculate the profit (use a minus sign for a loss).`, answer: a, unit: '£', explanation: `Profit = Revenue − Expenditure = ${gbp(rev)} − ${gbp(ex)} = ${a < 0 ? '-' : ''}${gbp(Math.abs(a))}${a < 0 ? ', a loss' : ''}.` } },
    mustKnowSlide: 3, topicId: 'profit-loss', topicSlide: 2,
  },
  {
    id: 'breakeven', n: 4, name: 'Break-even', rhs: 'Fixed Costs ÷ (Selling Price Per Unit − Variable Cost Per Unit)',
    wrong: ['Fixed Costs ÷ (Selling Price Per Unit + Variable Cost Per Unit)', '(Selling Price Per Unit − Variable Cost Per Unit) ÷ Fixed Costs', 'Fixed Costs ÷ Selling Price Per Unit', 'Fixed Costs × (Selling Price Per Unit − Variable Cost Per Unit)'],
    fills: [
      { prompt: 'Break-even = Fixed Costs ÷ (Selling Price Per Unit − ___)', accepted: ['variable cost per unit', 'variable cost', 'variable costs per unit', 'vc per unit'] },
      { prompt: 'Break-even = Fixed Costs ÷ (___ − Variable Cost Per Unit)', accepted: ['selling price per unit', 'selling price', 'price per unit', 'price'] },
      { prompt: 'Break-even = ___ ÷ (Selling Price Per Unit − Variable Cost Per Unit)', accepted: ['fixed costs', 'fixed cost', 'fixed', 'fc'] },
    ],
    calc: r => { const p = ri(r, 6, 40), vc = ri(r, 1, p - 2), n = ri(r, 40, 400), fc = n * (p - vc)
      return { prompt: `Fixed costs are ${gbp(fc)}. The selling price is ${gbp(p)} per unit and the variable cost is ${gbp(vc)} per unit. How many units must be sold to break even?`, answer: n, unit: '', decimals: 0, explanation: `Break-even = Fixed Costs ÷ (Selling Price − Variable Cost) = ${gbp(fc)} ÷ (${gbp(p)} − ${gbp(vc)}) = ${gbp(fc)} ÷ ${gbp(p - vc)} = ${n} units.` } },
    mustKnowSlide: 3, topicId: 'break-even-calc', topicSlide: 4,
  },
  {
    id: 'gross-profit', n: 5, name: 'Gross Profit', rhs: 'Revenue − Cost of Sales',
    wrong: ['Revenue − Expenditure', 'Revenue + Cost of Sales', 'Cost of Sales − Revenue', 'Net Profit − Cost of Sales'],
    fills: [
      { prompt: 'Gross Profit = Revenue − ___', accepted: ['cost of sales', 'cos'] },
      { prompt: 'Gross Profit = ___ − Cost of Sales', accepted: ['revenue', 'sales', 'sales revenue'] },
    ],
    calc: r => { const rev = ri(r, 200, 900) * 100, cos = ri(r, 80, rev / 100 - 40) * 100, a = rev - cos
      return { prompt: `A business has revenue of ${gbp(rev)} and a cost of sales of ${gbp(cos)}. Calculate the gross profit.`, answer: a, unit: '£', explanation: `Gross Profit = Revenue − Cost of Sales = ${gbp(rev)} − ${gbp(cos)} = ${gbp(a)}.` } },
    mustKnowSlide: 4, topicId: 'gross-net-profit', topicSlide: 1,
  },
  {
    id: 'net-profit', n: 6, name: 'Net Profit', rhs: 'Gross Profit − Expenditure',
    wrong: ['Revenue − Cost of Sales', 'Gross Profit + Expenditure', 'Expenditure − Gross Profit', 'Revenue − Gross Profit'],
    fills: [
      { prompt: 'Net Profit = Gross Profit − ___', accepted: ['expenditure', 'expenses', 'expense', 'overheads'] },
      { prompt: 'Net Profit = ___ − Expenditure', accepted: ['gross profit', 'gp'] },
    ],
    calc: r => { const gp = ri(r, 60, 300) * 100, ex = ri(r, 20, gp / 100 - 10) * 100, a = gp - ex
      return { prompt: `A business has a gross profit of ${gbp(gp)} and expenditure (wages and other expenses) of ${gbp(ex)}. Calculate the net profit.`, answer: a, unit: '£', explanation: `Net Profit = Gross Profit − Expenditure = ${gbp(gp)} − ${gbp(ex)} = ${gbp(a)}.` } },
    mustKnowSlide: 4, topicId: 'gross-net-profit', topicSlide: 2,
  },
  {
    id: 'gross-margin', n: 7, name: 'Gross Profit Margin', rhs: '(Gross Profit ÷ Sales) × 100',
    wrong: ['(Net Profit ÷ Sales) × 100', '(Sales ÷ Gross Profit) × 100', 'Gross Profit ÷ Sales', '(Gross Profit × Sales) ÷ 100'],
    fills: [
      { prompt: 'Gross Profit Margin = (Gross Profit ÷ ___) × 100', accepted: ['sales', 'revenue', 'sales revenue'] },
      { prompt: 'Gross Profit Margin = (___ ÷ Sales) × 100', accepted: ['gross profit', 'gp'] },
      { prompt: 'Gross Profit Margin = (Gross Profit ÷ Sales) × ___', accepted: ['100'] },
    ],
    calc: r => { const s = ri(r, 20, 90) * 1000, pct = pick(r, [20, 25, 30, 35, 40, 45, 50, 60]), gp = s * pct / 100
      return { prompt: `A business has sales of ${gbp(s)} and a gross profit of ${gbp(gp)}. Calculate the gross profit margin (as a percentage).`, answer: pct, unit: '%', decimals: 1, explanation: `Gross Profit Margin = (${gbp(gp)} ÷ ${gbp(s)}) × 100 = ${pct}%.` } },
    mustKnowSlide: 5, topicId: 'ratios-comparing', topicSlide: 1,
  },
  {
    id: 'net-margin', n: 8, name: 'Net Profit Margin', rhs: '(Net Profit ÷ Sales) × 100',
    wrong: ['(Gross Profit ÷ Sales) × 100', '(Sales ÷ Net Profit) × 100', '(Net Profit ÷ Gross Profit) × 100', 'Net Profit ÷ Sales'],
    fills: [
      { prompt: 'Net Profit Margin = (Net Profit ÷ ___) × 100', accepted: ['sales', 'revenue', 'sales revenue'] },
      { prompt: 'Net Profit Margin = (___ ÷ Sales) × 100', accepted: ['net profit', 'np'] },
      { prompt: 'Net Profit Margin = (Net Profit ÷ Sales) × ___', accepted: ['100'] },
    ],
    calc: r => { const s = ri(r, 20, 90) * 1000, pct = pick(r, [4, 5, 8, 10, 12, 15, 20, 25]), np = s * pct / 100
      return { prompt: `A business has sales of ${gbp(s)} and a net profit of ${gbp(np)}. Calculate the net profit margin (as a percentage).`, answer: pct, unit: '%', decimals: 1, explanation: `Net Profit Margin = (${gbp(np)} ÷ ${gbp(s)}) × 100 = ${pct}%.` } },
    mustKnowSlide: 5, topicId: 'ratios-comparing', topicSlide: 1,
  },
  {
    id: 'working-capital', n: 9, name: 'Working Capital', rhs: 'Current Assets − Current Liabilities',
    wrong: ['Current Assets + Current Liabilities', 'Current Liabilities − Current Assets', 'Current Assets ÷ Current Liabilities', 'Fixed Assets − Current Liabilities'],
    fills: [
      { prompt: 'Working Capital = Current Assets − ___', accepted: ['current liabilities', 'liabilities', 'cl'] },
      { prompt: 'Working Capital = ___ − Current Liabilities', accepted: ['current assets', 'assets', 'ca'] },
    ],
    calc: r => { const ca = ri(r, 200, 900) * 100, cl = ri(r, 150, 950) * 100, a = ca - cl
      return { prompt: `A business has current assets of ${gbp(ca)} and current liabilities of ${gbp(cl)}. Calculate its working capital (use a minus sign if negative).`, answer: a, unit: '£', explanation: `Working Capital = Current Assets − Current Liabilities = ${gbp(ca)} − ${gbp(cl)} = ${a < 0 ? '-' : ''}${gbp(Math.abs(a))}.` } },
    mustKnowSlide: 6, topicId: 'financial-position', topicSlide: 3,
  },
  {
    id: 'current-ratio', n: 10, name: 'Current Ratio', rhs: 'Current Assets ÷ Current Liabilities',
    wrong: ['Current Liabilities ÷ Current Assets', 'Current Assets − Current Liabilities', '(Current Assets − Inventory) ÷ Current Liabilities', 'Current Assets × Current Liabilities'],
    fills: [
      { prompt: 'Current Ratio = Current Assets ÷ ___', accepted: ['current liabilities', 'liabilities', 'cl'] },
      { prompt: 'Current Ratio = ___ ÷ Current Liabilities', accepted: ['current assets', 'assets', 'ca'] },
    ],
    calc: r => { const cl = ri(r, 10, 60) * 1000, ratio = pick(r, [0.5, 0.8, 1.2, 1.5, 1.8, 2, 2.5]), ca = Math.round(cl * ratio)
      return { prompt: `A business has current assets of ${gbp(ca)} and current liabilities of ${gbp(cl)}. Calculate the current ratio (2 decimal places).`, answer: ratio, unit: '', decimals: 2, explanation: `Current Ratio = Current Assets ÷ Current Liabilities = ${gbp(ca)} ÷ ${gbp(cl)} = ${ratio.toFixed(2)}.` } },
    mustKnowSlide: 6, topicId: 'ratios-comparing', topicSlide: 2,
  },
  {
    id: 'liquid-ratio', n: 11, name: 'Liquid Capital Ratio', rhs: '(Current Assets − Inventory) ÷ Current Liabilities',
    wrong: ['Current Assets ÷ Current Liabilities', '(Current Assets + Inventory) ÷ Current Liabilities', '(Current Assets − Inventory) − Current Liabilities', 'Current Assets − Inventory'],
    fills: [
      { prompt: 'Liquid Capital Ratio = (Current Assets − ___) ÷ Current Liabilities', accepted: ['inventory', 'stock'] },
      { prompt: 'Liquid Capital Ratio = (Current Assets − Inventory) ÷ ___', accepted: ['current liabilities', 'liabilities', 'cl'] },
      { prompt: 'Liquid Capital Ratio = (___ − Inventory) ÷ Current Liabilities', accepted: ['current assets', 'assets', 'ca'] },
    ],
    calc: r => { const cl = ri(r, 10, 60) * 1000, inv = ri(r, 2, 10) * 1000, ratio = pick(r, [0.6, 0.8, 1, 1.2, 1.5, 2]), ca = Math.round(cl * ratio + inv)
      return { prompt: `A business has current assets of ${gbp(ca)}, inventory of ${gbp(inv)} and current liabilities of ${gbp(cl)}. Calculate the liquid capital ratio (2 decimal places).`, answer: ratio, unit: '', decimals: 2, explanation: `Liquid Capital Ratio = (Current Assets − Inventory) ÷ Current Liabilities = (${gbp(ca)} − ${gbp(inv)}) ÷ ${gbp(cl)} = ${ratio.toFixed(2)}.` } },
    mustKnowSlide: 6, topicId: 'ratios-comparing', topicSlide: 2,
  },
]

export const fullFormula = (f: FormulaDef) => `${f.name} = ${f.rhs}`
