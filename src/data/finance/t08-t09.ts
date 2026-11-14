import type { Topic } from '../../types'
import { mk } from '../helpers'

const noKey = 'The lesson deck gives no answer key for this question; the answer shown was worked out from the lesson content.'

// ───────────────────────── 8. BREAK-EVEN CHART ─────────────────────────
const q8 = mk('break-even-chart')
export const breakEvenChart: Topic = {
  id: 'break-even-chart',
  number: 8,
  title: 'Break-Even: The Chart',
  summary: 'Labelling the break-even chart, what break-even means, and its benefits and limitations.',
  icon: 'bar-chart',
  source: 'Lesson 08 – Break-Even (Part 1); Revision.pptx (Break-Even Chart)',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Label the break-even analysis planning tool.',
      'Understand what is meant by break-even.',
      'Explain benefits and limitations of break-even analysis in exam-style questions.',
    ] }, { t: 'callout', tone: 'tip', title: 'Starter idea from the lesson', text: 'Like a recipe, a break-even chart works only if the steps are done in order. Following a plan matters in business too.' }] },
    { title: 'Labelling the break-even chart', blocks: [
      { t: 'chart', id: 'breakeven', caption: 'Costs and sales (£) against output / quantity' },
      { t: 'table', head: ['Letter', 'Area'], rows: [['A', 'Fixed cost'], ['B', 'Total revenue'], ['C', 'Total cost'], ['D', 'Break-even point'], ['E', 'Profit'], ['F', 'Loss'], ['G', 'Margin of safety']] },
    ] },
    { title: 'Understanding the lines', blocks: [
      { t: 'terms', items: [
        ['Why is the fixed-cost line horizontal?', 'Fixed costs do not change, compared with variable costs, which can change.'],
        ['Revenue formula', 'Number of sales × price per unit.'],
        ['Total cost formula', 'Fixed costs + variable costs.'],
        ['Profit or loss formula', 'Revenue − expenditure.'],
      ] },
    ] },
    { title: 'What is break-even?', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: 'Break-even occurs when the business has made **enough money through sales to cover the cost of making the product**.' },
      { t: 'list', items: ['The business has **not** made a profit.', 'The business has **not** made a loss.'] },
      { t: 'callout', tone: 'tip', title: 'On the chart', text: 'It is the point where the **total revenue** line crosses the **total cost** line.' },
    ] },
    { title: 'Benefits of the break-even chart', blocks: [
      { t: 'list', items: ['Both the fixed and variable costs are known.', 'Revenue can be calculated.', 'The business can work out how many products it needs to sell before making a profit.', 'The margin of safety is known.'] },
      { t: 'callout', tone: 'exam', title: 'Revision exam answer (3 benefits)', text: 'Work out how many products need to be sold to make a profit · the margin of safety is known · revenue can be calculated.' },
    ] },
    { title: 'Limitations of the break-even chart', blocks: [
      { t: 'list', items: ['It only applies to **one product**.', 'It assumes **all products are sold**.', '**Start-up costs** are not included.', 'It is based on **forecast** data, not actual data.'] },
    ] },
    { title: 'Risk of not completing one', blocks: [
      { t: 'list', items: ['The selling price might be too low or too high.', 'The business will not know how many products to sell to make a profit.', 'The margin of safety is unknown.'] },
    ] },
    { title: 'Reading a chart: the candle business', blocks: [
      { t: 'chart', id: 'candles', caption: 'Revision exam chart: candles' },
      { t: 'example', title: 'From the Revision deck', steps: ['How many candles must be sold to break even? Read where revenue meets total costs → 500.', 'Total costs when 1,000 candles are sold? Read the total-cost line at 1,000 → £6,000.'], result: '500 candles; £6,000' },
    ] },
  ],
  questions: [
    q8.mcq(5, 'O', 'Identify 1 limitation of break-even analysis.', ['Applies to 1 product', 'Applies to multiple products', 'Applies to 2 products', 'Applies to no products'], 0, 'Break-even only applies to one product.', { source: 'Lesson 08 Q1', note: noKey }),
    q8.tf(5, 'O', 'You can only do a break-even analysis per product.', true, 'It only applies to one product.', { source: 'Lesson 08 Q2', note: noKey }),
    q8.mcq(5, 'O', 'Identify 1 limitation of break-even analysis.', ['Only the first month', 'Only considers sold products', 'Does not take into account start-up costs', 'Does take into account start-up costs'], 2, 'Start-up costs are not included.', { source: 'Lesson 08 Q3', note: 'No answer key in the deck. “Only considers sold products” is closely related to “assumes all products are sold”, but “does not take into account start-up costs” matches the lesson’s wording exactly.' }),
    q8.mcq(1, 'O', 'Label the graph: what is shown at the point marked A?', ['Total revenue', 'Loss', 'Profit', 'Break-even'], 3, 'A is where the revenue line crosses the total-cost line: the break-even point.', { source: 'Lesson 08 Q4', chart: 'mark-be', note: noKey }),
    q8.mcq(1, 'O', 'Label the graph: what is the line marked A?', ['Total revenue', 'Loss', 'Profit', 'Total cost'], 3, 'The line that starts at the fixed-cost level and rises more gently is the total-cost line.', { source: 'Lesson 08 Q5', chart: 'mark-tc', note: noKey }),
    q8.mcq(1, 'O', 'Label the graph: what is the area marked A?', ['Loss', 'Profit', 'Break-even', 'Total cost'], 0, 'To the left of break-even, total cost is above total revenue, which is a loss.', { source: 'Lesson 08 Q6', chart: 'mark-loss', note: noKey }),
    q8.multi(4, 'O', 'Give TWO benefits of carrying out a break-even analysis.', ['Shows how much credit the business has', 'Shows how much needs to be sold before a profit can be made', 'Revenue can be calculated', 'Only applies to 1 product'], [1, 2], '“Only applies to 1 product” is a limitation.', { source: 'Lesson 08 Q7', note: noKey }),
    q8.mcq(3, 'O', 'Identify what a business will do when costs are higher than revenue.', ['Make a profit', 'Make a loss', 'Break-even', 'Become bankrupt'], 1, 'Costs above revenue means a loss.', { source: 'Lesson 08 Q8', note: noKey }),
    q8.mcq(6, 'O', 'Liam did not complete a break-even analysis. Outline 1 risk he could face.', ['Product price is too low', 'Prediction', 'Not needed', 'Become bankrupt'], 0, 'Without the analysis the selling price could be too low (or too high).', { source: 'Lesson 08 Q9', note: noKey }),
    q8.mcq(1, 'O', 'Label the graph: what is the line marked A?', ['Fixed costs', 'Total costs', 'Total revenue', 'Break-even'], 0, 'The horizontal line is the fixed-cost line.', { source: 'Lesson 08 Q10', chart: 'mark-fixed', note: noKey }),
    q8.short(1, 'O', 'Name all the areas of the break-even chart. Write: fixed cost, total revenue, total cost, break-even, profit, loss, margin of safety.', [['fixed cost'], ['total revenue', 'revenue'], ['total cost'], ['break-even', 'break even'], ['profit'], ['loss'], ['margin of safety']], 7, 'A fixed cost · B total revenue · C total cost · D break-even · E profit · F loss · G margin of safety', 'Remember: A fixed, B revenue, C cost, D break-even, E profit, F loss, G margin of safety.', { source: 'Revision slide 11', marks: 7 }),
    q8.short(4, 'O', 'Give THREE benefits of the break-even chart.', [['how many products', 'how many', 'needs to be sold', 'number of products', 'before making a profit', 'before a profit'], ['margin of safety', 'margin safety'], ['revenue can be calculated', 'calculate revenue', 'revenue calculated', 'work out revenue']], 3, 'The business can work out how many products it needs to sell before making a profit; the margin of safety is known; revenue can be calculated.', 'The three benefits are: break-even quantity, margin of safety, revenue.', { source: 'Revision slide 12', marks: 3 }),
    q8.short(5, 'O', 'Give THREE limitations of the break-even chart.', [['one product', '1 product', 'single product', 'only applies to'], ['all products', 'all sold', 'assumes'], ['start-up', 'startup', 'start up']], 3, 'It only applies to one product; it assumes all products have been sold; start-up costs are not included.', 'The three limitations: one product only, assumes all sold, no start-up costs.', { source: 'Revision slide 12', marks: 3 }),
    q8.calc(7, 'O', 'How many candles need to be sold to break even? (Read the chart.)', 500, '', 'The revenue and total-cost lines cross at 500 candles.', { source: 'Revision slide 13', chart: 'candles', decimals: 0 }),
    q8.calc(7, 'O', 'Identify from the break-even chart the value of total costs if they sell 1,000 candles.', 6000, '£', 'At 1,000 candles the total-cost line is at £6,000.', { source: 'Revision slide 13', chart: 'candles' }),
    q8.fill(3, 'G', 'When a business sells at break-even it makes neither a profit nor a ___.', ['loss'], 'At break-even revenue equals total cost.'),
    q8.mcq(1, 'G', 'On the break-even chart, the margin of safety is…', ['The area where total cost is higher than revenue', 'The gap between actual output and the break-even output', 'The fixed-cost line', 'The price per unit'], 1, 'The margin of safety is how far output can fall before reaching break-even.'),
    q8.calc(7, 'G', 'On the candle chart, what are the fixed costs?', 2000, '£', 'The horizontal fixed-cost line sits at £2,000.', { chart: 'candles' }),
  ],
}

// ───────────────────────── 9. BREAK-EVEN CALCULATIONS ─────────────────────────
const q9 = mk('break-even-calc')
export const breakEvenCalc: Topic = {
  id: 'break-even-calc',
  number: 9,
  title: 'Break-Even: Margin of Safety & Formula',
  summary: 'Understanding margin of safety and calculating the break-even point.',
  icon: 'target',
  source: 'Lesson 09 – Break-Even (Part 2)',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Understand what is meant by margin of safety.',
      'Apply the break-even formula to a single business.',
      'Answer exam-style questions on margin of safety and the break-even formula.',
    ] }] },
    { title: 'Margin of safety', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: 'The margin of safety is **how much output/quantity could fall by until the business reaches the break-even level**.' },
      { t: 'list', items: ['If sales increase, the margin of safety **increases**.', 'If sales decrease, the margin of safety **decreases**.', 'If sales fall below break-even, the business could make a **loss**.'] },
    ] },
    { title: 'Margin of safety on a chart', blocks: [
      { t: 'chart', id: 'safety', caption: 'Break-even at 30 units; the margin of safety is the gap between 30 and 50.' },
      { t: 'callout', tone: 'tip', title: 'Reading it', text: 'Margin of safety = actual output − break-even output. In the lesson example the margin is between 30 and 50 → **20 units**.' },
    ] },
    { title: 'Selling 47 products vs 15 products', blocks: [
      { t: 'compare',
        left: { title: 'Sells 47 products (above break-even 30)', items: ['The business has made a profit.', 'It has not made a loss.', 'It has passed the break-even point.', 'The product is profitable.'] },
        right: { title: 'Sells 15 products (below break-even 30)', items: ['The business has made a loss.', 'It has not made a profit.', 'The product is not profitable.', 'The business must reassess: lower prices or withdraw the product.'] } },
    ] },
    { title: 'The break-even formula', blocks: [
      { t: 'formula', name: 'Break-even (units)', formula: 'Break-Even = Fixed Cost ÷ (Selling Price Per Unit − Variable Cost Per Unit)', vars: [['Fixed cost', 'total fixed costs of the business'], ['Selling price per unit', 'what one unit sells for'], ['Variable cost per unit', 'what one unit costs to make']] },
      { t: 'p', text: 'The answer tells the business **how many products it needs to sell before it can make a profit**. Every product sold after that becomes profit.' },
    ] },
    { title: 'Worked example: Hot Dog Grizzle', blocks: [
      { t: 'p', text: 'Hot Dog Grizzle is a hot dog stand in Birmingham. Fixed costs £100 on average. Variable cost 80p per hot dog. Selling price £1.30.' },
      { t: 'example', title: 'How many hot dogs to break even?', steps: ['= Fixed cost ÷ (selling price per unit − variable cost per unit)', '= £100 ÷ (£1.30 − £0.80)', '= £100 ÷ £0.50'], result: '200 hot dogs' },
      { t: 'callout', tone: 'warn', title: 'Rounding', text: 'You cannot sell part of a product. If the answer has a decimal (e.g. 133.33), round **up** to the next whole unit (134).' },
    ] },
  ],
  questions: [
    q9.mcq(5, 'O', 'How many packets of crisps would Walkers need to sell to break even? Fixed cost £120. Price per unit £1.25. Variable cost 75p.', ['120', '24', '240', '12'], 2, '£120 ÷ (£1.25 − £0.75) = £120 ÷ £0.50 = 240.', { source: 'Lesson 09 Q1' }),
    q9.mcq(5, 'O', 'How many Mars bars would Cadbury need to sell to break even? Fixed cost £140. Price per unit 95p. Variable cost 67p.', ['500', '5000', '50', '5'], 0, '£140 ÷ (£0.95 − £0.67) = £140 ÷ £0.28 = 500.', { source: 'Lesson 09 Q2' }),
    q9.calc(5, 'O', 'How many trainers would JD need to sell to break even? Fixed cost £2,000. Price per unit £20. Variable cost £5.', 134, '', '£2,000 ÷ (£20 − £5) = £2,000 ÷ £15 = 133.33, rounded up to 134 trainers.', { source: 'Lesson 09 Q3 (options 133–136 in the deck)', alsoAccept: [133.33], decimals: 2, note: 'Deck options were 136, 133, 135, 134. 134 is the whole number you must sell to cover costs.' }),
    q9.calc(5, 'O', 'How many shoes would Clarks need to sell to break even? Fixed cost £3,500. Price per unit £39.99. Variable cost £19.99.', 175, '', '£3,500 ÷ (£39.99 − £19.99) = £3,500 ÷ £20 = 175.', { source: 'Lesson 09 Q4', decimals: 0 }),
    q9.calc(5, 'O', 'How many hot dogs would Mr Dog need to sell to break even? Fixed cost £1,650. Price per unit £9.99. Variable cost £7.99.', 825, '', '£1,650 ÷ (£9.99 − £7.99) = £1,650 ÷ £2 = 825.', { source: 'Lesson 09 Q5', decimals: 0 }),
    q9.calc(5, 'O', 'Hot Dog Grizzle: fixed costs £100, variable cost 80p, selling price £1.30. How many hot dogs must be sold to break even?', 200, '', '£100 ÷ (£1.30 − £0.80) = £100 ÷ £0.50 = 200.', { source: 'Lesson 09 worked example', decimals: 0 }),
    q9.tf(3, 'O', 'If the business sells 47 products when break-even is 30, it has made a profit.', true, 'Above break-even means profit.', { source: 'Lesson 09 slide 7' }),
    q9.mcq(3, 'O', 'The business sells 15 products and break-even is 30. What has happened?', ['A profit', 'A loss', 'Break-even', 'Margin of safety has increased'], 1, 'Below break-even means a loss; the business should reassess its price or withdraw the product.', { source: 'Lesson 09 slide 8' }),
    q9.fill(1, 'G', 'If sales fall below the break-even level, the business could make a ___.', ['loss'], 'Below break-even = loss.'),
    q9.tf(1, 'G', 'If sales increase, the margin of safety increases.', true, 'More sales means a bigger gap above break-even.'),
    q9.calc(2, 'G', 'A business sells 50 units and its break-even is 30 units. Calculate the margin of safety in units.', 20, '', 'Margin of safety = actual output − break-even output = 50 − 30 = 20 units.', { decimals: 0 }),
    q9.calc(5, 'G', 'A stall has fixed costs of £300, sells for £5 per unit, and variable cost is £2 per unit. How many units to break even?', 100, '', '£300 ÷ (£5 − £2) = £300 ÷ £3 = 100.', { decimals: 0 }),
    q9.calc(5, 'G', 'A business has fixed costs of £2,000, selling price £8 and variable cost £4 (the candle business). How many units to break even?', 500, '', '£2,000 ÷ (£8 − £4) = 500.', { decimals: 0 }),
    q9.mcq(4, 'G', 'In the break-even formula, what do you divide the fixed costs by?', ['Selling price per unit + variable cost per unit', 'Selling price per unit − variable cost per unit', 'Number of sales', 'Total revenue'], 1, 'Fixed cost ÷ (selling price per unit − variable cost per unit).'),
  ],
}
