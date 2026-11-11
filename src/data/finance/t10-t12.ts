import type { Topic } from '../../types'
import { mk } from '../helpers'

const noKey = 'The lesson deck gives no answer key for this question; the answer shown was calculated and checked.'
const H = ['', 'Year 1']
const stmt = (rev: string, cos: string, wages: string, other: string, gp = '£', np = '£', rows?: string[][]) => ({
  head: H,
  rows: rows ?? [['Revenue', rev], ['Cost of Sales', cos], ['GROSS PROFIT', gp], ['Expense', ''], ['Wages', wages], ['Other Expenses', other], ['NET PROFIT', np]],
  boldRows: [2, 6],
})

// ───────────────────────── 10. GROSS & NET PROFIT ─────────────────────────
const q10 = mk('gross-net-profit')
export const grossNetProfit: Topic = {
  id: 'gross-net-profit',
  number: 10,
  title: 'Gross Profit & Net Profit',
  summary: 'The income statement: calculating gross profit and net profit and why net profit matters more.',
  icon: '🧾',
  source: 'Lesson 10 – Income Statement (Part 1); Revision.pptx (Gross Profit, Gross Profit after the discount)',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Understand gross profit and net profit.',
      'Apply the gross profit and net profit formulas to a single business.',
      'Answer exam-style questions on gross profit and net profit.',
    ] }] },
    { title: 'Gross profit', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: 'Gross profit is the difference between **sales revenue** and the **cost of sales**.' },
      { t: 'formula', name: 'Gross profit', formula: 'Gross Profit = Revenue (Sales) − Cost of Sales' },
      { t: 'compare',
        left: { title: 'If gross profit is positive', items: ['Revenue is greater than cost of sales.'] },
        right: { title: 'If gross profit is negative, act:', items: ['Increase sales revenue', 'Increase sales volume', 'Increase sales prices', 'Reduce cost of sales by sourcing a cheaper supplier'] } },
    ] },
    { title: 'Net profit', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: 'Net profit is the money left when **all expenses, apart from cost of sales, are deducted from the gross profit**.' },
      { t: 'formula', name: 'Net profit', formula: 'Net Profit = Gross Profit − Expenditure (expenses)' },
      { t: 'callout', tone: 'exam', title: 'Why net profit matters more', text: 'Gross profit is **not available for reinvestment** and does **not consider all costings**. Net profit takes all costs into account.' },
      { t: 'compare',
        left: { title: 'If net profit is positive', items: ['Gross profit is also positive and expenditure is within budget.'] },
        right: { title: 'If net profit is negative, act:', items: ['Increase gross profit', 'Reduce expenses', 'Make savings where possible'] } },
    ] },
    { title: 'Worked example', blocks: [
      { t: 'table', head: ['', 'Year 1'], rows: [['Revenue', '£1,500'], ['Cost of Sales', '£500'], ['GROSS PROFIT', '£1,000'], ['Expense', ''], ['Wages', '£380'], ['Other Expenses', '£120'], ['NET PROFIT', '£500']], boldRows: [2, 6] },
      { t: 'example', steps: ['Gross profit = £1,500 − £500 = **£1,000**', 'Net profit = £1,000 − £380 − £120 = **£500**'] },
    ] },
    { title: 'Gross profit after a discount', blocks: [
      { t: 'p', text: 'Dmitri’s sales for the year are £27,800 and his cost of sales is £18,400. He negotiates a **20% discount on his cost of sales**.' },
      { t: 'example', title: 'Revision deck method', steps: ['20/100 × £18,400 = £3,680 (the discount taken away)', '£18,400 − £3,680 = £14,720 (the new cost of sales)', 'GP = Revenue − cost of sales', 'GP = £27,800 − £14,720'], result: '£13,080' },
    ] },
  ],
  questions: [
    q10.calc(3, 'O', 'Work out the gross profit.', 30000, '£', 'Gross profit = £40,000 − £10,000 = £30,000.', { source: 'Lesson 10 Q1', table: stmt('£40,000', '£10,000', '£20,000', '£2,000') }),
    q10.calc(3, 'O', 'Work out the net profit.', 8000, '£', 'Gross profit £30,000 − £20,000 wages − £2,000 other expenses = £8,000.', { source: 'Lesson 10 Q2', table: stmt('£40,000', '£10,000', '£20,000', '£2,000'), note: 'Correction: the deck’s options (£50,000, £72,000, £18,000, £22,000) do not include the correct answer of £8,000, so this is now a type-in question.' }),
    q10.mcq(2, 'O', 'Why is net profit more important than gross profit?', ['Because it is a lot of money', 'Gross profit can be reinvested', 'Net profit can be reinvested', 'Takes all costs into account'], 3, 'Net profit takes all costs into account. (The lesson also says gross profit is not available for reinvestment.)', { source: 'Lesson 10 Q3', note: 'Both “Net profit can be reinvested” and “Takes all costs into account” reflect the lesson; the second is the fuller reason. ' + noKey }),
    q10.calc(3, 'O', 'Work out the gross profit.', 9000, '£', '£25,000 − £16,000 = £9,000.', { source: 'Lesson 10 Q4', table: stmt('£25,000', '£16,000', '£20,000', '£2,000') }),
    q10.calc(3, 'O', 'Work out the net profit.', 2000, '£', 'Gross profit £9,000 − £4,000 − £3,000 = £2,000.', { source: 'Lesson 10 Q5', table: stmt('£25,000', '£16,000', '£4,000', '£3,000') }),
    q10.calc(3, 'O', 'Work out the gross profit.', 11500, '£', '£26,000 − £14,500 = £11,500.', { source: 'Lesson 10 Q6', table: stmt('£26,000', '£14,500', '£2,750', '£1,025') }),
    q10.calc(3, 'O', 'Work out the gross profit.', 20834, '£', '£46,254 − £25,420 = £20,834.', { source: 'Lesson 10 Q7', table: stmt('£46,254', '£25,420', '£5,000', '£19,878', '£', '-£4,044') }),
    q10.calc(3, 'O', 'Work out the net profit (use a minus sign for a loss).', -4044, '£', 'Gross profit £20,834 − £5,000 − £19,878 = -£4,044, a net loss.', { source: 'Lesson 10 Q8', table: stmt('£46,254', '£25,420', '£5,000', '£19,878') }),
    q10.calc(3, 'O', 'Work out the cost of sales.', 22000, '£', 'Cost of sales = revenue − gross profit = £35,000 − £13,000 = £22,000.', { source: 'Lesson 10 Q9', table: stmt('£35,000', '', '£6,000', '£2,000', '£13,000', '£5,000') }),
    q10.calc(3, 'O', 'Work out the wages.', 6000, '£', 'Gross profit £13,000 − wages − £2,000 = £5,000, so wages = £13,000 − £2,000 − £5,000 = £6,000.', { source: 'Lesson 10 Q10', table: stmt('£35,000', '£22,000', '', '£2,000', '£13,000', '£5,000') }),
    q10.calc(1, 'O', 'Sales for the year £33,875. Cost of sales £19,320. Calculate the gross profit.', 14555, '£', 'GP = £33,875 − £19,320 = £14,555.', { source: 'Revision slide 14' }),
    q10.calc(4, 'O', 'Dmitri’s sales are £27,800 and his cost of sales is £18,400. He negotiates a 20% discount on his cost of sales. Calculate his new gross profit.', 13080, '£', '20% of £18,400 = £3,680. New cost of sales = £14,720. GP = £27,800 − £14,720 = £13,080.', { source: 'Revision slide 15' }),
    q10.fill(1, 'G', 'Gross profit = revenue − cost of ___.', ['sales'], 'Gross profit = revenue (sales) − cost of sales.'),
    q10.tf(2, 'G', 'Net profit is what is left after ALL expenses are deducted from gross profit.', true, 'Net profit = gross profit − expenses.'),
    q10.multi(1, 'G', 'If gross profit is negative, which actions could the business take?', ['Increase sales prices', 'Source a cheaper supplier', 'Increase sales volume', 'Reduce the number of customers'], [0, 1, 2], 'The lesson lists increasing revenue, volume and prices, and reducing cost of sales by using a cheaper supplier.'),
  ],
}

// ───────────────────────── 11. INCOME STATEMENT ANALYSIS ─────────────────────────
const q11 = mk('income-statement')
const davidT = { head: ['', 'Year 1', 'Year 2'], rows: [['Revenue', '£25,000', '£26,000'], ['Cost of Sales', '£16,000', '£17,000'], ['GROSS PROFIT', '£9,000', '£9,000'], ['Expense', '', ''], ['Wages', '£4,000', '£3,100'], ['Other Expenses', '£3,000', '£3,330'], ['NET PROFIT', '£2,000', '£2,600']], boldRows: [2, 6] }
const sarahT = { head: ['', 'Year 1', 'Year 2'], rows: [['Revenue', '£22,500', '£27,500'], ['Cost of Sales', '£15,500', '£19,350'], ['GROSS PROFIT', '£7,000', '£8,150'], ['Expense', '', ''], ['Wages', '£2,560', '£3,890'], ['Other Expenses', '£1,500', '£2,400'], ['NET PROFIT', '£2,940', '£1,860']], boldRows: [2, 6] }
export const incomeStatement: Topic = {
  id: 'income-statement',
  number: 11,
  title: 'Analysing an Income Statement',
  summary: 'Reading two years of figures, commenting on each row with a statistic, and reaching a conclusion.',
  icon: '🔍',
  source: 'Lesson 11 – Income Statement (Part 2)',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Understand an income statement.',
      'Apply the steps to evaluate an income statement for a single business.',
      'Answer exam-style questions on income statements.',
    ] }] },
    { title: 'What an income statement shows', blocks: [
      { t: 'table', ...davidT, caption: 'David’s toy shop (Birmingham), Years 1 and 2' },
      { t: 'list', items: ['It outlines how the business is performing.', 'It shows the total expenses paid over a year.', 'It highlights areas of high and low spending.', 'It highlights whether the business is operating at a profit or a loss.'] },
    ] },
    { title: 'The method: statement + statistic', blocks: [
      { t: 'callout', tone: 'key', title: 'How to analyse', text: 'Analyse **each row, one at a time**: make a **statement** and back it up with a **statistic** (the figures and the change between years).' },
      { t: 'callout', tone: 'tip', title: 'Sentence pattern', text: '“In Year 1 [row] was £__, whereas in Year 2 it [increased / decreased] by £__ to £__. This is a [positive / negative] because …”' },
    ] },
    { title: 'David: revenue, cost of sales, gross profit', blocks: [
      { t: 'terms', items: [
        ['Revenue', 'Year 1 £25,000; Year 2 £26,000, up £1,000. Positive: revenue is increasing.'],
        ['Cost of sales', 'Year 1 £16,000; Year 2 £17,000, up £1,000. David may want to source cheaper materials to reduce costings.'],
        ['Gross profit', 'Year 1 £9,000; Year 2 £9,000. Neither increased nor decreased; it stayed the same.'],
      ] },
    ] },
    { title: 'David: wages, other expenses, net profit', blocks: [
      { t: 'terms', items: [
        ['Wages', 'Year 1 £4,000; Year 2 £3,100, down £900. Positive: shows David has thought about his expenses.'],
        ['Other expenses', 'Year 1 £3,000; Year 2 £3,330, up £330. Negative: expenses should decrease, although David could have paid a one-off fixed cost.'],
        ['Net profit', 'Year 1 £2,000; Year 2 £2,600, up £600. More important than gross profit; can be used to expand and grow the business.'],
      ] },
      { t: 'callout', tone: 'warn', title: 'Correction to the source', text: 'The lesson text says other expenses increased “by £330 to £3,100”. The table shows **£3,330**, so the corrected figure is used.' },
    ] },
    { title: 'David: conclusion', blocks: [
      { t: 'callout', tone: 'key', title: 'Conclusion', text: 'The business has **increased its net profit**, which is more important than gross profit. The profits can be used to **expand and grow** the business. Overall, David’s business has **performed well and is profitable**.' },
    ] },
    { title: 'Exam practice: Sarah’s café', blocks: [
      { t: 'p', text: 'Sarah runs a small café. She bakes many of the pastries and cupcakes herself. **Discuss whether Sarah should be pleased with the changes in the performance of her business.**' },
      { t: 'table', ...sarahT },
    ] },
    { title: 'Sarah: row-by-row model answer', blocks: [
      { t: 'terms', items: [
        ['Revenue', 'Up £5,000 from £22,500 to £27,500. Positive.'],
        ['Cost of sales', 'Up £3,850 from £15,500 to £19,350. A big rise in one year; Sarah could investigate sourcing a cheaper supplier.'],
        ['Gross profit', 'Up £1,150 from £7,000 to £8,150. Positive.'],
        ['Wages', 'Up £1,330 from £2,560 to £3,890. Needs watching as it affects net profit.'],
        ['Other expenses', 'Up £900 from £1,500 to £2,400. Needs watching as it affects net profit.'],
        ['Net profit', 'Down £1,080 from £2,940 to £1,860. Concerning; Sarah would need to investigate.'],
      ] },
    ] },
    { title: 'Sarah: conclusion and recommendations', blocks: [
      { t: 'callout', tone: 'key', title: 'Conclusion', text: 'Net profit is more important than gross profit, so Sarah should **not** be fully pleased. She needs to review her outgoings and make changes.' },
      { t: 'list', items: ['Reduce wages.', 'Reduce other expenses.', 'Increase revenue.', 'Increase selling price.', 'Invest in a marketing strategy.'] },
    ] },
  ],
  questions: [
    q11.short(7, 'O', 'Sarah runs a small café. Discuss whether she should be pleased with the changes in the performance of her business. Refer to the figures.', [['revenue'], ['cost of sales'], ['gross profit'], ['wages'], ['other expenses', 'expenses'], ['net profit'], ['reduce wages', 'reduce other expenses', 'increase revenue', 'increase selling price', 'marketing', 'cheaper supplier', 'review']], 5, 'Revenue rose by £5,000 and gross profit by £1,150, which is positive, but cost of sales, wages and other expenses all rose, so net profit fell by £1,080 from £2,940 to £1,860. Net profit matters more than gross profit, so Sarah should not be fully pleased and should reduce wages and other expenses, source a cheaper supplier, increase revenue or prices, and invest in marketing.', 'Comment on each row with a statistic, then give a conclusion and recommendations.', { source: 'Lesson 11 Q1', table: sarahT, marks: 9, note: 'Marked for the key ideas covered; compare with the model answer to check your depth.' }),
    q11.calc(7, 'G', 'In Sarah’s income statement, by how much did revenue change from Year 1 to Year 2? (Increase = positive)', 5000, '£', '£27,500 − £22,500 = +£5,000.', { table: sarahT }),
    q11.calc(7, 'G', 'In Sarah’s income statement, by how much did net profit change from Year 1 to Year 2? (Decrease = negative)', -1080, '£', '£1,860 − £2,940 = -£1,080.', { table: sarahT }),
    q11.calc(4, 'G', 'In David’s income statement, by how much did wages change from Year 1 to Year 2? (Decrease = negative)', -900, '£', '£3,100 − £4,000 = -£900.', { table: davidT }),
    q11.mcq(3, 'G', 'David’s gross profit was £9,000 in both years. What is the correct statement?', ['It increased', 'It decreased', 'It stayed the same', 'It cannot be calculated'], 2, 'The figure is identical in Year 1 and Year 2.', { table: davidT }),
    q11.mcq(4, 'G', 'In David’s Year 2 statement, which row is a negative point (expenses rising)?', ['Wages', 'Other expenses', 'Revenue', 'Net profit'], 1, 'Other expenses rose by £330, but expenses should decrease.', { table: davidT }),
    q11.fill(2, 'G', 'To analyse an income statement, make a ___ and back it up with a statistic.', ['statement'], 'Statement + statistic, one row at a time.'),
    q11.tf(1, 'G', 'An income statement can highlight whether a business is operating at a profit or loss.', true, 'That is one of its main purposes.'),
    q11.mcq(8, 'G', 'Which is a sensible recommendation for Sarah?', ['Increase wages', 'Reduce other expenses', 'Stop marketing', 'Lower her prices only'], 1, 'Reducing expenses would help raise net profit.', { table: sarahT }),
  ],
}

// ───────────────────────── 12. FINANCIAL POSITION ─────────────────────────
const q12 = mk('financial-position')
const mohT = { head: ['£', 'Year 1', 'Year 2'], rows: [['Fixed assets', '28,250', '22,600'], ['Current assets', '', ''], ['Trade receivables (debtors)', '24,740', '18,270'], ['Cash', '8,630', '6,450'], ['Inventory (stock)', '6,250', '3,760'], ['Current liabilities', '', ''], ['Trade payables (creditors)', '31,370', '21,640'], ['Overdraft', '4,200', '9,650'], ['Net current assets / liabilities (working capital)', '4,050', '-2,810'], ['Total assets', '32,300', '19,790'], ['Financed by', '', ''], ['Owner’s capital', '15,000', '15,000'], ['Retained profit', '17,300', '4,790'], ['Total capital', '32,300', '19,790']], boldRows: [8, 9, 13] }
export const financialPosition: Topic = {
  id: 'financial-position',
  number: 12,
  title: 'Statement of Financial Position',
  summary: 'The balance sheet: assets, liabilities, working capital and how a business is financed.',
  icon: '🏦',
  source: 'Lesson 12 – Financial Position; Revision.pptx (Fixed asset)',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Understand a statement of financial position (balance sheet) and its key components.',
      'Apply steps to evaluate a statement of financial position for a single business.',
      'Answer exam-style questions on statements of financial position.',
    ] }] },
    { title: 'Purpose of a financial position', blocks: [
      { t: 'callout', tone: 'key', title: 'Purpose', text: 'It shows **how a business is funded at a point in time**.' },
      { t: 'list', items: ['To manage the business more effectively.', 'To show the ability to pay debts.', 'To make better business decisions using accurate data and statistics.'] },
    ] },
    { title: 'Fixed assets and current assets', blocks: [
      { t: 'terms', items: [
        ['Fixed assets', 'Items the business must keep to be able to trade; they are here to stay (e.g. fixtures and fittings, play equipment).'],
        ['Current assets', 'Items that change with every transaction; they can be turned into cash (e.g. cash, inventory/stock, trade receivables/debtors).'],
      ] },
      { t: 'callout', tone: 'exam', title: 'Revision exam question', text: 'Orsod runs a soft play business. Two fixed assets: **fixtures and fittings** and **play equipment** (not leaflets, cash in tills or food stock).' },
    ] },
    { title: 'Current liabilities and working capital', blocks: [
      { t: 'terms', items: [
        ['Current liabilities', 'Money that must be paid back within the year (e.g. trade payables/creditors, overdraft).'],
        ['Working capital / net current assets', 'The money available to run the business every day. If it is too low or negative, the business may not be able to pay its debts.'],
      ] },
      { t: 'formula', name: 'Working capital', formula: 'Working Capital = Current Assets − Current Liabilities' },
    ] },
    { title: 'Total assets and how the business is financed', blocks: [
      { t: 'terms', items: [
        ['Total assets', 'The worth of everything the business owns.'],
        ['Owner’s capital', 'Money the owner has invested in the business.'],
        ['Share capital', 'Money shareholders have invested in the business.'],
        ['Retained profit', 'Profit from the previous year reinvested in the business.'],
      ] },
    ] },
    { title: 'Mohammed’s clothing business', blocks: [
      { t: 'table', ...mohT, caption: 'Extract from statement of financial position' },
      { t: 'p', text: 'Mohammed’s balance sheet shows financial problems. **Discuss possible solutions.** Analyse each row, making a statement and backing it up with a statistic.' },
    ] },
    { title: 'Mohammed: the problems', blocks: [
      { t: 'list', items: [
        'Fixed assets reduced by £5,650 in Year 2.',
        'Cash reduced by £2,180 in Year 2.',
        'Inventory (stock) reduced by £2,490 in Year 2.',
        'Overdraft increased by £5,450, which will increase interest and charges.',
        'Net current assets fell from £4,050 to -£2,810 (a fall of £6,860), causing a shortfall in cash.',
        'Total assets decreased by £12,510, lowering the worth of the business.',
        'Retained profits were used in the business, so the value decreased.',
      ] },
      { t: 'callout', tone: 'warn', title: 'Corrections to the source', text: 'The lesson says inventory fell by £2,180 (the table gives £6,250 → £3,760 = **£2,490**) and that net current assets decreased by £2,810 (that is the Year 2 figure; the fall is **£6,860**). The corrected figures are shown here.' },
    ] },
    { title: 'Mohammed: the solutions', blocks: [
      { t: 'list', items: ['Increase revenue.', 'Increase retained profit.', 'Increase cash, which will increase net current assets.', 'Reduce the overdraft.', 'Invest in the business to increase fixed assets.', 'Invest in the business to increase total assets.'] },
    ] },
    { title: 'Darren’s fast-food business: assets', blocks: [
      { t: 'callout', tone: 'exam', title: 'Question', text: 'Darren is a partner in a fast-food business and is concerned by his balance sheet. **Evaluate the possible actions he could take.**' },
      { t: 'terms', items: [
        ['Fixed assets', 'Appear high; some could be sold to raise cash.'],
        ['Trade receivables (debtors)', 'Make sure these are paid and turned into cash.'],
        ['Cash', 'Maybe too much held in the business; it could pay off the overdraft and trade payables.'],
        ['Inventory (stock)', 'Appears high; sell stock and do not replace it until it is sold, bringing costs down and raising cash.'],
      ] },
    ] },
    { title: 'Darren: liabilities and other actions', blocks: [
      { t: 'terms', items: [
        ['Trade payables (creditors)', 'Appear high; suppliers may refuse orders until paid, though a smaller order may be allowed.'],
        ['Overdraft', 'Appears high; pay it off to avoid interest and extra charges.'],
        ['Net current liabilities', 'Negative; the business needs to raise cash.'],
        ['Revenue', 'Increase sales and customers.'],
        ['Area', 'Assess the area it attracts customers from.'],
        ['Marketing', 'Invest in a new marketing strategy.'],
        ['Productivity', 'Assess and make reasonable changes.'],
        ['Suppliers', 'Review suppliers to ensure they are cost effective.'],
      ] },
    ] },
  ],
  questions: [
    q12.multi(2, 'O', 'Orsod runs a soft play business for children. Identify TWO fixed assets used in Orsod’s soft play business. (2 marks)', ['Advertising leaflets', 'Fixtures and fittings', 'Cash in tills', 'Food stock', 'Play equipment'], [1, 4], 'Fixed assets are kept to trade and are here to stay. Cash and stock are current assets.', { source: 'Revision slide 16', marks: 2 }),
    q12.calc(3, 'G', 'Mohammed Year 1: working capital (net current assets) is current assets £39,620 minus current liabilities £35,570. Calculate it.', 4050, '£', '£39,620 − £35,570 = £4,050.', { table: mohT }),
    q12.calc(3, 'G', 'Mohammed Year 2: current assets are £28,480 and current liabilities are £31,290. Calculate working capital (use a minus sign if negative).', -2810, '£', '£28,480 − £31,290 = -£2,810. Negative working capital means the business may not be able to pay its debts.', { table: mohT }),
    q12.calc(6, 'G', 'By how much did Mohammed’s fixed assets fall from Year 1 to Year 2?', 5650, '£', '£28,250 − £22,600 = £5,650.', { table: mohT }),
    q12.calc(6, 'G', 'By how much did Mohammed’s overdraft increase from Year 1 to Year 2?', 5450, '£', '£9,650 − £4,200 = £5,450.', { table: mohT }),
    q12.calc(6, 'G', 'By how much did Mohammed’s total assets decrease from Year 1 to Year 2?', 12510, '£', '£32,300 − £19,790 = £12,510.', { table: mohT }),
    q12.fill(3, 'G', 'Current liabilities are money that must be paid back within the ___.', ['year', 'a year', 'one year', '1 year', '12 months'], 'Within the year.'),
    q12.mcq(1, 'G', 'What does a statement of financial position show?', ['Profit over a year', 'How a business is funded at a point in time', 'Cash in and out each month', 'Break-even point'], 1, 'It shows how the business is funded at a point in time.'),
    q12.mcq(2, 'G', 'Which is a current asset?', ['Fixtures and fittings', 'Play equipment', 'Inventory (stock)', 'Overdraft'], 2, 'Current assets change with every transaction and can be turned into cash.'),
    q12.multi(4, 'G', 'Which are sources of finance shown under “Financed by”?', ['Owner’s capital', 'Share capital', 'Retained profit', 'Trade payables'], [0, 1, 2], 'Trade payables are a current liability.'),
    q12.short(7, 'O', 'Mohammed’s statement of financial position shows financial problems. Discuss possible solutions.', [['increase revenue', 'increase sales'], ['retained profit'], ['reduce overdraft', 'reduce the overdraft', 'pay off overdraft'], ['increase cash', 'cash'], ['fixed assets', 'invest'], ['total assets']], 3, 'Increase revenue; increase retained profit; increase cash to raise net current assets; reduce the overdraft; invest in the business to increase fixed assets and total assets.', 'The lesson lists six solutions; at least three would earn good credit.', { source: 'Lesson 12 slide 10 and 12', table: mohT, marks: 6 }),
    q12.short(8, 'O', 'Darren is a partner in a fast-food business and is concerned about his balance sheet. Evaluate the possible actions he could take.', [['fixed assets', 'sell'], ['stock', 'inventory'], ['debtors', 'receivables'], ['creditors', 'payables'], ['overdraft'], ['revenue', 'sales', 'customers'], ['marketing'], ['suppliers', 'supplier']], 4, 'Sell some fixed assets and surplus stock to raise cash; collect money owed by debtors; use spare cash to repay the overdraft and creditors; increase revenue and invest in marketing; review suppliers to ensure they are cost effective.', 'Go through the balance sheet row by row and say what he should do about each.', { source: 'Lesson 12 slides 14–17', marks: 8 }),
  ],
}
