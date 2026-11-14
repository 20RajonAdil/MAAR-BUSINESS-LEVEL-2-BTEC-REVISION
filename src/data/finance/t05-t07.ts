import type { Topic } from '../../types'
import { mk } from '../helpers'

const noKey = 'The lesson deck gives no answer key for this question; the answer shown was calculated and checked.'

// ───────────────────────── 5. TOTAL COSTS ─────────────────────────
const q5 = mk('total-costs')
export const totalCosts: Topic = {
  id: 'total-costs',
  number: 5,
  title: 'Total Costs',
  summary: 'Adding fixed and variable costs together to find the total cost of a business.',
  icon: 'calculator',
  source: 'Lesson 05 – Total Costs; Revision.pptx (Total Cost)',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Understand the total cost formula.',
      'Apply the total costs formula to a single business.',
      'Show understanding of total costs by answering exam-style questions.',
    ] }] },
    { title: 'The total cost formula', blocks: [
      { t: 'formula', name: 'Total cost', formula: 'Total Cost = Fixed Costs + Variable Costs', vars: [['Fixed costs', 'costs that stay the same whatever is sold (e.g. rent)'], ['Variable costs', 'costs that change with output (e.g. materials)']] },
      { t: 'callout', tone: 'exam', title: 'Often written as', text: '**TC = FC + VC**' },
    ] },
    { title: 'Worked example: Grizzle Chocolate', blocks: [
      { t: 'p', text: 'Grizzle Chocolate sells chocolate to shops, hotels and airports across the UK. Fixed cost £2,575. Variable cost £1,321.' },
      { t: 'example', title: 'What is the total cost?', steps: ['Total cost = fixed costs + variable costs', '= £2,575 + £1,321'], result: '£3,896' },
    ] },
    { title: 'Exam example: Jeremy’s car repair business', blocks: [
      { t: 'p', text: 'Jeremy paid £1,245 for car parts, £460 in wages and £3,200 rent this month. Calculate his total cost.' },
      { t: 'example', title: 'From the Revision deck', steps: ['TC = FC + VC', 'TC = £3,200 + £460 + £1,245'], result: '£4,905' },
      { t: 'callout', tone: 'tip', title: 'Method', text: 'Add **all** costs: rent (fixed) with wages and parts. Underline every money figure in the question before adding.' },
    ] },
    { title: 'Direct and indirect costs', blocks: [
      { t: 'p', text: 'Some questions say **direct costs** and **indirect costs** instead of variable and fixed. The formula still works.' },
      { t: 'table', head: ['Question wording', 'Same as'], rows: [['Direct costs', 'Variable costs'], ['Indirect costs', 'Fixed costs']] },
      { t: 'example', title: 'Rowan’s souvenir toys', steps: ['Direct costs £2,548 + indirect costs £1,795'], result: '£4,343' },
    ] },
  ],
  questions: [
    q5.calc(2, 'O', 'Fixed costs are £5,621 and variable costs are £231.21. What are the total costs?', 5852.21, '£', '£5,621 + £231.21 = £5,852.21', { source: 'Lesson 05 Q1', decimals: 2 }),
    q5.calc(2, 'O', 'Fixed costs £1,021 and variable costs £341.89. What are the total costs?', 1362.89, '£', '£1,021 + £341.89 = £1,362.89', { source: 'Lesson 05 Q2', decimals: 2 }),
    q5.calc(2, 'O', 'Fixed costs £5,621.23 and variable costs £939.71. What are the total costs?', 6560.94, '£', '£5,621.23 + £939.71 = £6,560.94', { source: 'Lesson 05 Q3', decimals: 2, note: 'Correction: the deck’s option A shows £6,560.71, which is a small error. The correct total is £6,560.94, so this is now a type-in question.' }),
    q5.calc(3, 'O', 'Jeremy owns a small car repair business. In the last month he paid £1,245 for car parts, £460 in wages to an assistant mechanic, and £3,200 rent. Calculate the monthly total cost.', 4905, '£', 'TC = £3,200 + £460 + £1,245 = £4,905', { source: 'Lesson 05 Q4 / Revision slide 7', note: 'The deck writes the wages as “$460”; this is treated as a typo for £460.' }),
    q5.mcq(1, 'O', 'Select the formula for calculating total cost.', ['Fixed Cost - Variable Cost', 'Fixed Cost + Variable Cost', 'Fixed Cost + Start-Up Cost', 'Variable Cost + Start-Up Cost'], 1, 'Total cost = fixed cost + variable cost.', { source: 'Lesson 05 Q5 / Revision slide 7' }),
    q5.calc(4, 'O', 'Rowan produces souvenir toys. His direct costs are £2,548. The indirect costs are £1,795. Calculate Rowan’s total cost.', 4343, '£', '£2,548 + £1,795 = £4,343', { source: 'Lesson 05 Q6' }),
    q5.calc(4, 'O', 'Varsha produces jumpers. Her direct costs are £34,788.12. The indirect costs are £17,959.34. Calculate Varsha’s total cost.', 52747.46, '£', '£34,788.12 + £17,959.34 = £52,747.46', { source: 'Lesson 05 Q7', decimals: 2 }),
    q5.calc(3, 'O', 'Jerome owns a small car repair business. He paid £2,245 for car parts, £560 in wages and £5,000 rent. Calculate the monthly total cost.', 7805, '£', '£2,245 + £560 + £5,000 = £7,805', { source: 'Lesson 05 Q8', note: 'The deck writes “$560”, treated as £560. ' + noKey }),
    q5.calc(3, 'O', 'Sally owns a small business. She paid £3,456 for parts, £780 in wages and £1,430 rent. Calculate the monthly total cost.', 5666, '£', '£3,456 + £780 + £1,430 = £5,666', { source: 'Lesson 05 Q9', note: 'The deck writes “$780”, treated as £780. ' + noKey }),
    q5.calc(3, 'O', 'Betty owns a small business. She paid £13,456 for parts, £1,780 in wages and £4,430 rent. Calculate the monthly total cost.', 19666, '£', '£13,456 + £1,780 + £4,430 = £19,666', { source: 'Lesson 05 Q10', note: 'The deck writes “$1780”, treated as £1,780. ' + noKey }),
    q5.fill(1, 'G', 'Total cost = fixed cost + ___ cost.', ['variable', 'variable cost'], 'TC = FC + VC.'),
    q5.calc(2, 'G', 'A business has fixed costs of £4,200 and variable costs of £1,875. Calculate the total cost.', 6075, '£', '£4,200 + £1,875 = £6,075'),
    q5.mcq(2, 'G', 'A shop pays £900 rent (fixed) and £350 for stock (variable). What is its total cost?', ['£550', '£1,250', '£315,000', '£2.57'], 1, '£900 + £350 = £1,250. Never subtract or multiply.'),
    q5.tf(4, 'G', 'Direct costs are the same as variable costs.', true, 'Direct = variable; indirect = fixed.'),
  ],
}

// ───────────────────────── 6. REVENUE ─────────────────────────
const q6 = mk('revenue')
export const revenue: Topic = {
  id: 'revenue',
  number: 6,
  title: 'Revenue',
  summary: 'The money a business receives from selling its products, and how to grow it.',
  icon: 'banknote',
  source: 'Lesson 06 – Revenue; Revision.pptx (Revenue)',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Understand the revenue formula.',
      'Apply the revenue formula to a single business.',
      'Show understanding of revenue by answering exam-style questions.',
    ] }] },
    { title: 'What is revenue?', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: 'Revenue is the money a business **receives from selling its products** (also called sales revenue or sales). It is a **source of income**, not a cost.' },
      { t: 'callout', tone: 'tip', title: 'Sources of revenue (exam questions)', text: 'Payments received from customers · Sales of products to customers.' },
      { t: 'callout', tone: 'warn', title: 'Not revenue', text: 'Electricity bills, wages, rent, money paid to suppliers and purchasing stock are **costs**, not revenue.' },
    ] },
    { title: 'The revenue formula', blocks: [
      { t: 'formula', name: 'Revenue', formula: 'Revenue = Number of Sales × Price Per Unit', vars: [['Number of sales', 'how many units were sold'], ['Price per unit', 'what each unit sells for']] },
      { t: 'callout', tone: 'exam', title: 'Often written as', text: '**R = P.P.U × N.O.S**' },
    ] },
    { title: 'Worked examples', blocks: [
      { t: 'example', title: 'Grizzle Chocolate: 5,600 boxes at £3.75', steps: ['Revenue = number of sales × price per unit', '= 5,600 × £3.75'], result: '£21,000' },
      { t: 'callout', tone: 'warn', title: 'Correction to the source', text: 'The lesson slide shows the answer as “£2100.00”, but 5,600 × £3.75 = **£21,000**. The corrected figure is used here.' },
      { t: 'example', title: 'Revision deck example', steps: ['R = P.P.U × N.O.S', 'R = £8.25 × 476'], result: '£3,927' },
    ] },
    { title: 'Ways to increase revenue', blocks: [
      { t: 'p', text: 'The lesson questions ask how a business could spend money to increase revenue:' },
      { t: 'list', items: ['Special offers', 'Employ more people', 'Increase product range', 'Open more days / increase opening hours', 'Move to a busier location', 'Increase product prices'] },
    ] },
  ],
  questions: [
    q6.calc(3, 'O', 'No. of sales is 5,621 and the price per unit is £3.21. What is the revenue?', 18043.41, '£', '5,621 × £3.21 = £18,043.41', { source: 'Lesson 06 Q1', decimals: 2 }),
    q6.calc(3, 'O', 'Ed owns a small business selling plants. The price of a plant is £4.50. In the last month he sold 1,400 plants. What is Ed’s revenue?', 6300, '£', '1,400 × £4.50 = £6,300', { source: 'Lesson 06 Q2' }),
    q6.calc(3, 'O', 'Sally organises boat trips. She sells 43 trips each month at £125 each. Calculate Sally’s revenue.', 5375, '£', '43 × £125 = £5,375', { source: 'Lesson 06 Q3' }),
    q6.multi(4, 'O', 'Identify ways Sally could spend money to help increase revenue. (Select all that apply)', ['Special offer', 'Employ more people', 'Increase product range', 'Open more days'], [0, 1, 2, 3], 'All four could attract more customers or let her sell more.', { source: 'Lesson 06 Q4', note: 'No answer key in the deck; all four options are ways to increase sales, so all four are accepted.' }),
    q6.mcq(1, 'O', 'Identify 1 source of revenue.', ['Electricity bills paid for running the business', 'Wages received by staff for work they do', 'Payments received from customers', 'Purchase of inventory (stock)'], 2, 'Revenue is money received from customers.', { source: 'Lesson 06 Q5' }),
    q6.mcq(1, 'O', 'Identify 1 source of revenue.', ['Sales of products to customers', 'Rent paid for shop premises', 'Money paid to suppliers', 'Purchase of new stock'], 0, 'Sales to customers bring money in.', { source: 'Lesson 06 Q6' }),
    q6.calc(3, 'O', 'Darren owns a sandwich shop. On average he sells 1,748 sandwiches each month at £3.75 each. Calculate Darren’s revenue.', 6555, '£', '1,748 × £3.75 = £6,555', { source: 'Lesson 06 Q7' }),
    q6.multi(4, 'O', 'Rav owns a successful café. Identify the ways Rav could spend money to increase revenue. (Select all that apply)', ['Increase opening hours', 'Move to a busier location', 'Employ more staff', 'Increase product prices'], [0, 1, 2], 'Opening longer, a busier location and more staff all cost money and can raise sales. Raising prices does not involve spending money.', { source: 'Lesson 06 Q8', note: 'No answer key in the deck; the answer was inferred from the question’s wording (“spend money”).' }),
    q6.calc(3, 'O', 'No. of sales is 621 and the price per unit is £9.71. What is the revenue?', 6029.91, '£', '621 × £9.71 = £6,029.91', { source: 'Lesson 06 Q9', decimals: 2 }),
    q6.calc(3, 'O', 'No. of sales is 12,042 and the price per unit is £6.80. What is the revenue?', 81885.6, '£', '12,042 × £6.80 = £81,885.60', { source: 'Lesson 06 Q10', decimals: 2 }),
    q6.calc(3, 'O', 'What is the revenue if the price per unit is £8.25 and the number of sales is 476?', 3927, '£', 'R = £8.25 × 476 = £3,927', { source: 'Revision slide 8' }),
    q6.fill(2, 'G', 'Revenue = number of sales × price per ___.', ['unit'], 'Revenue = number of sales × price per unit.'),
    q6.calc(3, 'G', 'Grizzle Chocolate sells 5,600 boxes at £3.75 each. Calculate the revenue.', 21000, '£', '5,600 × £3.75 = £21,000'),
    q6.tf(1, 'G', 'Wages paid to staff are a source of revenue.', false, 'Wages are a cost. Revenue comes from customers.'),
  ],
}

// ───────────────────────── 7. PROFIT OR LOSS ─────────────────────────
const q7 = mk('profit-loss')
export const profitLoss: Topic = {
  id: 'profit-loss',
  number: 7,
  title: 'Profit or Loss',
  summary: 'Comparing revenue with expenditure to find out whether a business made a profit or a loss.',
  icon: 'scale',
  source: 'Lesson 07 – Profit or Loss; Revision.pptx (Profit or Loss)',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Understand the profit or loss formula.',
      'Apply the profit or loss formula to a single business.',
      'Show understanding of profit or loss by answering exam-style questions.',
    ] }] },
    { title: 'Profit and loss', blocks: [
      { t: 'p', text: 'All business owners need to know how much **revenue** is coming in and how much **expenditure** is going out. This tells them if the business has made a **profit** or a **loss**.' },
      { t: 'compare', left: { title: 'Profit', items: ['Revenue is MORE than expenditure', 'Positive answer'] }, right: { title: 'Loss', items: ['Revenue is LESS than expenditure', 'Negative answer (e.g. -£700)'] } },
    ] },
    { title: 'The profit / loss formula', blocks: [
      { t: 'formula', name: 'Profit or loss', formula: 'Profit / Loss = Revenue − Expenditure', vars: [['Revenue', 'money received from sales'], ['Expenditure', 'all money the business pays out']] },
      { t: 'callout', tone: 'exam', title: 'Often written as', text: '**P = R − E**' },
    ] },
    { title: 'Worked examples', blocks: [
      { t: 'example', title: 'Grizzle Chocolate 2023: revenue £1,500, expenditure £1,000', steps: ['Revenue − expenditure', '= £1,500 − £1,000'], result: '£500 profit' },
      { t: 'example', title: 'Grizzle Chocolate 2024: revenue £800, expenditure £1,500', steps: ['Revenue − expenditure', '= £800 − £1,500'], result: '-£700 (a loss)' },
      { t: 'example', title: 'Revision deck', steps: ['P = R − E', 'P = £175,423 − £93,768'], result: '£81,655' },
    ] },
    { title: 'How to improve profit', blocks: [
      { t: 'list', items: ['Invest in marketing', 'Improve productivity', 'Move to a busier location', 'Review expenses and source cheaper materials', 'Reduce the selling price – selling more at a lower price can increase revenue'] },
      { t: 'callout', tone: 'warn', title: 'Not a way to boost profit', text: 'Sourcing a bank loan brings in money but it is not profit and must be repaid.' },
    ] },
  ],
  questions: [
    q7.mcq(3, 'O', 'Cara is self-employed. Her costs for the year are £93,768 and her sales are £175,423. Calculate Cara’s profit or loss.', ['£81,655 profit', '-£81,655 loss', 'Loss', 'Profit'], 0, '£175,423 − £93,768 = £81,655. Revenue is higher than costs, so it is a profit.', { source: 'Lesson 07 Q1 / Revision slide 9', note: 'The original has four separate options (£81,655, -81,655, Loss, Profit); here each option states the amount and whether it is a profit or loss.' }),
    q7.tf(4, 'O', 'Jamie runs a small workshop making wooden picture frames. One way he can improve profits is by reducing the selling price. Selling more products at a reduced price can increase revenue.', true, 'A lower price can attract more customers, so revenue can increase.', { source: 'Lesson 07 Q2', note: 'No answer key in the deck; True is inferred from the Lesson 7 starter on competitive pricing.' }),
    q7.mcq(3, 'O', 'Kiren is self-employed. Her costs for the year are £120 and sales £234. Calculate Kiren’s profit or loss.', ['£114 profit', '-£114 loss', 'Profit only (no amount)', 'Loss only (no amount)'], 0, '£234 − £120 = £114 profit.', { source: 'Lesson 07 Q3', note: 'Original options were separate amounts and words; combined here.' }),
    q7.mcq(3, 'O', 'Cathrine is self-employed. Her costs for the year are £1,312 and sales £1,205. Calculate Cathrine’s profit or loss.', ['£107 profit', '-£107 loss', '£107 loss', '-£107 profit'], 1, '£1,205 − £1,312 = -£107. Costs are higher than sales, so it is a loss.', { source: 'Lesson 07 Q4', note: 'Original options were separate amounts and words; combined here.' }),
    q7.mcq(3, 'O', 'Sophie is self-employed. Her costs for the year are £2,451 and sales £6,215. Calculate Sophie’s profit or loss.', ['£3,764 profit', '-£3,764 loss', '£3,764 loss', '-£3,764 profit'], 0, '£6,215 − £2,451 = £3,764 profit.', { source: 'Lesson 07 Q5', note: 'Original options were separate amounts and words; combined here.' }),
    q7.mcq(3, 'O', 'Glyn is self-employed. Her costs for the year are £43,789 and sales £65,423. Calculate Glyn’s profit or loss.', ['-£21,634 loss', '£21,634 profit', '£21,634 loss', '-£21,634 profit'], 1, '£65,423 − £43,789 = £21,634 profit.', { source: 'Lesson 07 Q6', note: 'Original options were separate amounts and words; combined here.' }),
    q7.mcq(3, 'O', 'Helen is self-employed. Her costs for the year are £3,768 and sales £5,423. Calculate Helen’s profit or loss.', ['-£1,655 loss', '£1,655 loss', '£1,655 profit', '-£1,655 profit'], 2, '£5,423 − £3,768 = £1,655 profit.', { source: 'Lesson 07 Q7', note: 'Original options were separate amounts and words; combined here.' }),
    q7.mcq(3, 'O', 'Jamie is self-employed. Her costs for the year are £9,768 and sales £15,423. Calculate Jamie’s profit or loss.', ['£5,655 profit', '-£5,655 loss', '£5,655 loss', '-£5,655 profit'], 0, '£15,423 − £9,768 = £5,655 profit.', { source: 'Lesson 07 Q8', note: 'Original options were separate amounts and words; combined here.' }),
    q7.tf(4, 'O', 'Reviewing expenses and sourcing cheaper materials could increase profits.', true, 'Lower costs with the same revenue means more profit.', { source: 'Lesson 07 Q9', note: 'No answer key in the deck; True is inferred.' }),
    q7.multi(4, 'O', 'Select ways to boost profits.', ['Invest in marketing', 'Improve productivity', 'Move to a busier location', 'Source a loan from the bank'], [0, 1, 2], 'A loan is borrowed money that must be repaid, so it does not boost profit.', { source: 'Lesson 07 Q10', note: 'No answer key in the deck; inferred.' }),
    q7.calc(3, 'G', 'Grizzle Chocolate’s 2024 revenue was £800 and expenditure £1,500. Calculate the profit or loss (use a minus sign for a loss).', -700, '£', '£800 − £1,500 = -£700, a loss.'),
    q7.fill(1, 'G', 'If revenue is less than expenditure, the business has made a ___.', ['loss'], 'Revenue less than expenditure means a loss.'),
    q7.calc(3, 'G', 'A business has revenue of £48,300 and expenditure of £39,950. Calculate the profit.', 8350, '£', '£48,300 − £39,950 = £8,350'),
    q7.tf(1, 'G', 'If revenue is more than expenditure the business has made a profit.', true, 'Revenue − expenditure is positive.'),
  ],
}
