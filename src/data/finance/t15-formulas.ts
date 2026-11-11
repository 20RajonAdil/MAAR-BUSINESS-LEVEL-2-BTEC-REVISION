import type { Topic } from '../../types'
import { MUST_KNOW_ID, formulaBank, fullFormula } from './formulaBank'

const where: Record<string, string> = {
  'total-costs': 'Total Costs', revenue: 'Revenue', 'profit-loss': 'Profit or Loss', 'break-even-calc': 'Break-Even', 'gross-net-profit': 'Gross & Net Profit',
  'ratios-comparing': 'Ratios', 'financial-position': 'Financial Position',
}

export const mustKnowFormulas: Topic = {
  id: MUST_KNOW_ID,
  number: 15,
  title: 'Formulas You MUST Know Before the Exam',
  summary: 'All 11 off-by-heart formulas on one slide, then a randomised Formula Test with a personal improvement report.',
  icon: '🧮',
  source: 'Course formula sheet “Formulas You MUST Know Off-By-Heart”; worked examples from Lessons 05, 06, 07, 09, 10 and the Revision deck',
  featured: true,
  customTest: 'formula',
  questions: [],
  slides: [
    { title: 'How to use this section', blocks: [
      { t: 'callout', tone: 'exam', title: 'Why it matters', text: 'These 11 formulas appear again and again in the exam. Your course sheet calls them **“Formulas You MUST Know Off-By-Heart”**.' },
      { t: 'list', ordered: true, items: [
        '**Learn:** read the slide with all 11 formulas, then the short slides that explain each one with a worked example.',
        '**Test:** take the Formula Test. It asks the formulas in a different order and a different format every time (and uses new numbers in the calculations).',
        '**Repeat 3 times:** after your third attempt you get a personal improvement report showing which formulas to work on and exactly which slide to revisit.',
      ] },
    ] },
    { title: 'All 11 formulas on one slide', blocks: [
      { t: 'table', left: true, head: ['#', 'Formula', 'First taught in'], rows: formulaBank.map(f => [String(f.n), fullFormula(f), where[f.topicId] ?? '']) },
      { t: 'callout', tone: 'tip', title: 'Test yourself', text: 'Cover the right-hand side of each line with your hand and say it out loud. Then check.' },
    ] },
    { title: 'Costs and revenue (formulas 1–2)', blocks: [
      { t: 'formula', name: '1. Total cost', formula: 'Total Cost = Fixed Cost + Variable Cost', vars: [['Fixed cost', 'does not change with output (e.g. rent)'], ['Variable cost', 'changes with output (e.g. materials)']] },
      { t: 'example', title: 'Jeremy’s car repairs', steps: ['£3,200 rent + £460 wages + £1,245 parts'], result: '£4,905' },
      { t: 'formula', name: '2. Revenue', formula: 'Revenue = Number of Sales × Price Per Unit', vars: [['Number of sales', 'units sold'], ['Price per unit', 'the selling price of one unit']] },
      { t: 'example', title: 'Revision deck', steps: ['476 × £8.25'], result: '£3,927' },
    ] },
    { title: 'Profit and break-even (formulas 3–4)', blocks: [
      { t: 'formula', name: '3. Profit', formula: 'Profit = Revenue − Expenditure', vars: [['Revenue', 'money in from sales'], ['Expenditure', 'money paid out']] },
      { t: 'example', title: 'Cara’s business', steps: ['£175,423 − £93,768'], result: '£81,655 profit' },
      { t: 'formula', name: '4. Break-even', formula: 'Break-even = Fixed Costs ÷ (Selling Price Per Unit − Variable Cost Per Unit)', vars: [['Selling price − variable cost', 'the amount each unit contributes towards fixed costs'], ['Answer', 'number of units to sell to break even (round up)']] },
      { t: 'example', title: 'Hot Dog Grizzle', steps: ['£100 ÷ (£1.30 − £0.80) = £100 ÷ £0.50'], result: '200 hot dogs' },
    ] },
    { title: 'Gross profit and net profit (formulas 5–6)', blocks: [
      { t: 'formula', name: '5. Gross profit', formula: 'Gross Profit = Revenue − Cost of Sales' },
      { t: 'example', steps: ['£33,875 − £19,320'], result: '£14,555' },
      { t: 'formula', name: '6. Net profit', formula: 'Net Profit = Gross Profit − Expenditure', vars: [['Expenditure', 'wages and other expenses (everything except cost of sales)']] },
      { t: 'example', steps: ['£1,000 − £380 − £120'], result: '£500' },
    ] },
    { title: 'Profit margins (formulas 7–8)', blocks: [
      { t: 'formula', name: '7. Gross profit margin', formula: 'Gross Profit Margin = (Gross Profit ÷ Sales) × 100' },
      { t: 'example', steps: ['(£14,555 ÷ £33,875) × 100'], result: '43.0% (1 d.p.)' },
      { t: 'formula', name: '8. Net profit margin', formula: 'Net Profit Margin = (Net Profit ÷ Sales) × 100' },
      { t: 'example', title: 'Revision deck', steps: ['(£12,300 ÷ £150,000) × 100'], result: '8.2%' },
      { t: 'callout', tone: 'tip', title: 'Pattern', text: 'Both margins have **Sales on the bottom** and end with **× 100**. Only the top line changes: gross profit or net profit.' },
    ] },
    { title: 'Liquidity (formulas 9–11)', blocks: [
      { t: 'formula', name: '9. Working capital', formula: 'Working Capital = Current Assets − Current Liabilities' },
      { t: 'formula', name: '10. Current ratio', formula: 'Current Ratio = Current Assets ÷ Current Liabilities' },
      { t: 'formula', name: '11. Liquid capital ratio', formula: 'Liquid Capital Ratio = (Current Assets − Inventory) ÷ Current Liabilities', vars: [['Inventory', 'stock, which is harder to turn into cash quickly']] },
      { t: 'example', title: 'Revision deck current ratio', steps: ['3,514 ÷ 2,510'], result: '1.4' },
    ] },
    { title: 'Remembering them and avoiding mix-ups', blocks: [
      { t: 'table', left: true, head: ['Often confused', 'The difference'], rows: [
        ['Gross profit vs net profit', 'Gross uses **cost of sales** only; net also takes off wages and other expenses.'],
        ['Gross margin vs net margin', 'Same layout; gross margin uses gross profit, net margin uses net profit.'],
        ['Current ratio vs liquid capital ratio', 'The liquid ratio takes **inventory** off the current assets first.'],
        ['Working capital vs current ratio', 'Working capital **subtracts** (an amount in £); the ratio **divides** (a number such as 1.4).'],
        ['Profit vs break-even', 'Profit uses **revenue − expenditure** (£). Break-even divides **fixed costs** by the unit contribution (units).'],
      ] },
      { t: 'callout', tone: 'exam', title: 'Exam routine', text: 'Write the formula first, substitute the numbers, then give the answer with its unit (£, % or units).' },
    ] },
  ],
}
