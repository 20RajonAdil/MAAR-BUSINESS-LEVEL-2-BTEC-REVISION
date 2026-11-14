import type { Topic } from '../../types'
import { mk } from '../helpers'

// ───────────────────────── 1. START-UP COSTS ─────────────────────────
const q1 = mk('start-up-costs')
export const startUpCosts: Topic = {
  id: 'start-up-costs',
  number: 1,
  title: 'Start-Up Costs',
  summary: 'What a business must pay for before it can launch, and where the money comes from.',
  icon: 'rocket',
  source: 'Lesson 01 – Start-Up Costs; Revision.pptx (Expenditure, Start-up cost, Internal source of capital)',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Understand what a start-up cost is and its key components.',
      'Identify start-up cost terms from a given list.',
      'Show understanding of start-up costs by answering exam-style questions.',
    ] }, { t: 'callout', tone: 'key', title: 'Part of the Unit 2 criteria', text: 'Start-Up Costs → Running Costs → Fixed Costs → Variable Costs → Total Costs → Revenue → Profit or Loss → Break-Even → Income Statement → Financial Position.' }] },
    { title: 'What is a start-up cost?', blocks: [
      { t: 'p', text: 'When a new start-up business enters the market, before it can officially launch there are certain things it **must have in place**.' },
      { t: 'p', text: 'Without these components it cannot make the business successful and profitable.' },
      { t: 'callout', tone: 'key', title: 'Key point', text: 'The business has **not made a profit yet**. It uses **personal savings and/or bank loans** to fund the start-up.' },
    ] },
    { title: 'Key components of start-up costs', blocks: [
      { t: 'terms', items: [
        ['Premises', 'The building or space the business operates from.'],
        ['Utilities', 'Services such as electricity, gas and water.'],
        ['Staffing', 'Employees needed to run the business.'],
        ['Resources', 'Materials and supplies the business needs.'],
        ['Equipment', 'Items needed to trade, e.g. shop counters.'],
        ['Marketing', 'Promotion to tell customers the business exists.'],
      ] },
      { t: 'callout', tone: 'exam', title: 'Exam example', text: 'Eduardo is opening a gift shop. Two possible start-up costs: **paying the initial rent** and **purchasing shop counters**.' },
    ] },
    { title: 'Expenditure', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: '**Expenditure** is any money that a business **pays out**.' },
      { t: 'compare', left: { title: 'Money out (expenditure)', items: ['Start-up costs', 'Running costs', 'Fixed and variable costs'] }, right: { title: 'Money in (income)', items: ['Sales / revenue', 'Customer payments'] } },
      { t: 'callout', tone: 'warn', title: 'Do not confuse', text: 'Expenditure is **not** where costs equal revenue, and it is **not** money the business earns.' },
    ] },
    { title: 'Where does start-up money come from?', blocks: [
      { t: 'p', text: 'The lesson says start-ups are funded from **personal savings** and **bank loans**. The Revision deck also tests **internal sources of capital**.' },
      { t: 'table', head: ['Internal source', 'External source'], rows: [
        ['Retained profit (the answer in the exam question)', 'Bank loan'],
        ['Personal savings (owner’s money)', 'Government grant'],
        ['', 'Bank overdraft'],
      ], caption: 'Internal = comes from within the business/owner. External = comes from outside lenders or organisations.' },
      { t: 'callout', tone: 'tip', title: 'Exam tip', text: 'In the Revision exam question “Identify one example of an internal source of capital”, the correct choice is **retained profit** (not a grant, loan or overdraft).' },
    ] },
  ],
  questions: [
    q1.mcq(3, 'O', 'Identify what is meant by the term ‘expenditure’. (1 mark)', ['Where costs equal revenues', 'Any money that a business pays out', 'Any money that a business earns', 'Where revenues are higher than costs'], 1, 'Expenditure is any money a business pays out.', { source: 'Revision slide 3', marks: 1 }),
    q1.multi(2, 'O', 'Eduardo has to pay a number of start-up costs for his new gift shop business. Identify TWO possible start-up costs. (2 marks)', ['Purchasing replacement stock', 'Paying initial rent', 'Paying Eduardo’s salary', 'Purchasing shop counters', 'Paying delivery costs'], [1, 3], 'Initial rent and shop counters must be in place before the shop opens, so they are start-up costs.', { source: 'Revision slide 5', marks: 2 }),
    q1.mcq(4, 'O', 'Identify ONE example of an internal source of capital. (1 mark)', ['Government grant', 'Bank loan', 'Retained profit', 'Bank overdraft'], 2, 'Retained profit is profit kept inside the business, so it is an internal source.', { source: 'Revision slide 10', marks: 1 }),
    q1.multi(2, 'G', 'Select the key components of start-up costs listed in the lesson.', ['Premises', 'Utilities', 'Staffing', 'Customer refunds', 'Equipment', 'Marketing'], [0, 1, 2, 4, 5], 'Premises, utilities, staffing, resources, equipment and marketing are the six key components.'),
    q1.tf(1, 'G', 'A start-up business has already made a profit before it launches.', false, 'Start-up costs are paid BEFORE launch, so the business has not made a profit yet.'),
    q1.fill(1, 'G', 'A start-up is usually funded from personal savings and/or a bank ___.', ['loan', 'loans', 'bank loan'], 'Personal savings and bank loans fund the start-up.'),
    q1.mcq(1, 'G', 'Why do start-up costs matter?', ['They are paid after the business makes a profit', 'The business cannot become successful and profitable without these components in place', 'They only apply to large companies', 'They are the same as revenue'], 1, 'Without these components the business cannot become successful and profitable.'),
    q1.short(2, 'G', 'Name THREE key components of start-up costs.', [['premises'], ['utilities', 'utility'], ['staffing', 'staff'], ['resources', 'resource'], ['equipment'], ['marketing']], 3, 'Premises, utilities, staffing, resources, equipment, marketing (any three).', 'The six key components are premises, utilities, staffing, resources, equipment and marketing.'),
    q1.tf(4, 'G', 'Retained profit is an example of an internal source of capital.', true, 'It is profit reinvested in the business, so it comes from inside.'),
  ],
}

// ───────────────────────── 2. RUNNING COSTS ─────────────────────────
const q2 = mk('running-costs')
export const runningCosts: Topic = {
  id: 'running-costs',
  number: 2,
  title: 'Running Costs',
  summary: 'The day-to-day costs of keeping a business operating, with real-business examples.',
  icon: 'cog',
  source: 'Lesson 02 – Running Costs; Revision.pptx (Running cost)',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Understand what a running cost is and its key components.',
      'Identify running costs from real businesses in the current market.',
      'Show understanding of running costs by answering exam-style questions.',
    ] }] },
    { title: 'What are running costs?', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: 'Running costs are the **day-to-day costs** that occur to **keep the business operating**.' },
      { t: 'p', text: 'Without running costs, the business **cannot operate efficiently**. This means the business can end up operating at a **loss**, rather than a profit.' },
    ] },
    { title: 'Common running costs', blocks: [
      { t: 'list', items: ['Wages', 'Rent', 'Stock', 'Raw materials', 'Advertising / marketing', 'Utilities'] },
      { t: 'callout', tone: 'exam', title: 'From the Revision deck', text: 'The Revision deck lists these six as examples of running costs.' },
    ] },
    { title: 'Real businesses: running costs', blocks: [
      { t: 'table', head: ['Business', 'Running costs from the lesson'], rows: [
        ['Business 1 – a taxi', 'Fuel, tax, MOT, insurance'],
        ['Business 2 – a burger restaurant', 'Meat products, burger buns, wraps, salad, sauces, fries, vegan products, employees’ wages, suppliers'],
        ['Business 3 – a college', 'Employees’ salaries, employees’ wages, suppliers, equipment, resources'],
      ] },
      { t: 'callout', tone: 'tip', title: 'Pattern', text: 'Whatever the business, running costs are the things it pays for **regularly to carry on trading**.' },
    ] },
  ],
  questions: [
    q2.multi(3, 'G', 'Which of these are running costs for a taxi business? (Select all that apply)', ['Fuel', 'Tax', 'MOT', 'Insurance', 'Customer reviews'], [0, 1, 2, 3], 'The lesson lists fuel, tax, MOT and insurance for the taxi business.'),
    q2.mcq(1, 'G', 'Running costs are best described as…', ['One-off payments made before opening', 'Day-to-day costs that keep the business operating', 'Money received from customers', 'Profit left after tax'], 1, 'Running costs keep the business operating day to day.'),
    q2.tf(1, 'G', 'Without running costs a business can operate efficiently.', false, 'Without running costs the business cannot operate efficiently.'),
    q2.fill(1, 'G', 'If running costs cannot be covered, the business may operate at a ___ rather than a profit.', ['loss'], 'The business can operate at a loss.'),
    q2.multi(2, 'G', 'Select the six examples of running costs from the Revision deck.', ['Wages', 'Rent', 'Stock', 'Raw materials', 'Advertising / marketing', 'Utilities', 'Sales revenue'], [0, 1, 2, 3, 4, 5], 'Wages, rent, stock, raw materials, advertising/marketing and utilities are running costs. Sales revenue is income, not a cost.'),
    q2.multi(3, 'G', 'Which are running costs for a burger restaurant? (Select all that apply)', ['Burger buns', 'Fries', 'Employees’ wages', 'Customers’ opinions'], [0, 1, 2], 'Ingredients and wages are paid regularly to keep trading.'),
    q2.mcq(3, 'G', 'Which of these is a running cost for a college?', ['Employees’ salaries', 'Customers’ opinions', 'Competitors’ prices', 'Friends’ advice'], 0, 'The lesson lists employees’ salaries, wages, suppliers, equipment and resources.'),
    q2.short(1, 'G', 'In your own words, what is a running cost?', [['day-to-day', 'day to day', 'daily', 'regular', 'ongoing'], ['keep the business operating', 'keep the business running', 'operate', 'operating', 'running the business']], 2, 'A running cost is a day-to-day cost needed to keep the business operating.', 'Running costs = day-to-day costs that keep the business operating.'),
  ],
}

// ───────────────────────── 3. FIXED COSTS ─────────────────────────
const q3 = mk('fixed-costs')
const inferred = 'The lesson deck gives no answer key for this question; the answer shown was worked out from the lesson content.'
export const fixedCosts: Topic = {
  id: 'fixed-costs',
  number: 3,
  title: 'Fixed Costs',
  summary: 'Costs that stay the same however much is made or sold (indirect costs).',
  icon: 'pin',
  source: 'Lesson 03 – Fixed Costs; Revision.pptx (Fixed Cost)',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Understand what a fixed cost is and its key components.',
      'Identify fixed costs from real businesses in the current market.',
      'Show understanding of fixed costs by answering exam-style questions.',
    ] }] },
    { title: 'What are fixed costs?', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: 'Fixed costs **have to be paid no matter how many products the business makes or sells**.' },
      { t: 'p', text: 'They are often called **indirect costs** because there is **no direct link** between these costs and the amount sold.' },
      { t: 'callout', tone: 'tip', title: 'Memory trick', text: 'On a break-even chart the fixed-cost line is **horizontal** because fixed costs do not change as output changes.' },
    ] },
    { title: 'Real businesses: fixed costs', blocks: [
      { t: 'table', head: ['Business', 'Fixed costs from the lesson'], rows: [
        ['Business 1 – a restaurant', 'Rent, management salaries, marketing, licensing, insurance, utilities'],
        ['Business 2 – a taxi', 'Tax, MOT, insurance'],
        ['Business 3 – a college', 'Rent, utilities, management salaries, insurance, marketing'],
      ] },
      { t: 'callout', tone: 'exam', title: 'Revision exam question', text: 'Martin owns a cafe. “Identify **one** example of a fixed cost”: the correct answer is **rent paid for the building**.' },
    ] },
    { title: 'Fixed vs variable at a glance', blocks: [
      { t: 'compare',
        left: { title: 'Fixed (indirect)', items: ['Same amount whatever is sold', 'Rent, insurance, management salaries', 'Horizontal line on a break-even chart'] },
        right: { title: 'Variable (direct)', items: ['Rises and falls with output/sales', 'Flour, yeast, stock, materials', 'Slopes upward with total cost'] } },
    ] },
  ],
  questions: [
    q3.mcq(2, 'O', 'Martin owns a cafe that has fixed costs and variable costs. Identify ONE example of a fixed cost for the cafe. (1 mark)', ['Wages paid to staff', 'Rent paid for the building', 'Boxes bought for takeaway food', 'Ingredients bought to make the food'], 1, 'Rent stays the same however many meals are sold.', { source: 'Revision slide 4', marks: 1 }),
    q3.mcq(1, 'O', 'A running cost is…', ['Pay when you want', 'Something you must pay', 'Depends on profits', 'Depends on products sold'], 1, 'Running costs are something you must pay to keep operating.', { source: 'Lesson 03 Q2', note: inferred }),
    q3.mcq(1, 'O', 'Indirect costs are…', ['There is a direct link between cost and amount sold', 'Sometimes there is a direct link between cost and amount sold', 'There is no direct link between these costs and the amount sold', 'Only if the business has made a profit that year'], 2, 'Indirect (fixed) costs have no direct link to the amount sold.', { source: 'Lesson 03 Q3 and Q9', note: inferred }),
    q3.mcq(1, 'O', 'Identify 1 running cost from the list below.', ['Fuel', 'Customers', 'Competitors', 'Friends'], 0, 'Fuel is a cost the business pays to keep operating. The others are not costs.', { source: 'Lesson 03 Q1', note: inferred }),
    q3.multi(1, 'O', 'Identify the running costs for a restaurant. (Select all that apply)', ['Rent', 'Cleaning supplies', 'Hourly paid employees', 'Food costs'], [0, 1, 2, 3], 'Rent, cleaning supplies, wages and food are all paid regularly to keep the restaurant trading.', { source: 'Lesson 03 Q4 (original asked for “1”)', note: 'The original asks you to identify one and all four options are valid running costs, so this version lets you select all that apply. ' + inferred }),
    q3.multi(1, 'O', 'Identify running costs for a taxi service. (Select all that apply)', ['Fuel', 'Insurance', 'Getting car cleaned', 'Profits'], [0, 1, 2], 'Profits are money left over, not a cost.', { source: 'Lesson 03 Q5 (original asked for “1”)', note: 'Changed to select-all because several options are valid. ' + inferred }),
    q3.multi(1, 'O', 'Identify running costs for a printing shop. (Select all that apply)', ['Paper', 'Rent'], [0, 1], 'Paper (stock/materials) and rent are both on the list of running costs.', { source: 'Lesson 03 Q6 (original asked for “1”)', note: 'Changed to select-all because both options are valid. ' + inferred }),
    q3.multi(2, 'O', 'Identify TWO fixed costs for a beauty salon.', ['Salaries for employees', 'Rent paid for the shop', 'Laundry services', 'Purchase of make-up for resale'], [0, 1], 'Salaries and rent do not change with the number of treatments; laundry and make-up for resale rise with sales.', { source: 'Lesson 03 Q7', note: inferred }),
    q3.mcq(3, 'O', 'William is a self-employed cleaner. Cleaning materials are which type of cost?', ['Fixed cost', 'Direct cost', 'Indirect cost', 'Start-up cost'], 1, 'Cleaning materials are used up as work is done, so they are a variable (direct) cost.', { source: 'Lesson 03 Q8', note: inferred }),
    q3.mcq(1, 'O', 'Identify 1 running cost from the list below.', ['Paper', 'Customers', 'Competitors', 'Friends'], 0, 'Paper is a cost; customers, competitors and friends are not costs.', { source: 'Lesson 03 Q10', note: inferred }),
    q3.tf(1, 'G', 'Fixed costs change every time the business sells one more product.', false, 'Fixed costs are paid no matter how many products are made or sold.'),
    q3.fill(1, 'G', 'Fixed costs are also called ___ costs because there is no direct link to the amount sold.', ['indirect'], 'Fixed costs are indirect costs.'),
    q3.multi(2, 'G', 'Which are fixed costs for a restaurant? (Select all that apply)', ['Rent', 'Insurance', 'Management salaries', 'Food cost'], [0, 1, 2], 'Food cost rises with the number of meals, so it is variable.'),
    q3.tf(1, 'G', 'On a break-even chart the fixed-cost line is horizontal.', true, 'Fixed costs do not change as output changes.'),
  ],
}

// ───────────────────────── 4. VARIABLE COSTS ─────────────────────────
const q4 = mk('variable-costs')
export const variableCosts: Topic = {
  id: 'variable-costs',
  number: 4,
  title: 'Variable Costs',
  summary: 'Costs that rise and fall with the number of products made or sold (direct costs).',
  icon: 'trending-up',
  source: 'Lesson 04 – Variable Costs',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Understand what a variable cost is and its key components.',
      'Identify variable costs from real businesses in the current market.',
      'Show understanding of variable costs by answering exam-style questions.',
    ] }] },
    { title: 'What are variable costs?', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: 'Variable costs are **directly related to the number of products sold or produced**.' },
      { t: 'p', text: 'They are also called **direct costs** because they relate **directly** to the amount produced or sold.' },
      { t: 'callout', tone: 'warn', title: 'Source note', text: 'The Lesson 04 slide is titled “Fixed Costs” but its text defines **variable** costs. This platform uses the correct title.' },
    ] },
    { title: 'Real businesses: variable costs', blocks: [
      { t: 'table', head: ['Business', 'Variable costs from the lesson'], rows: [
        ['Business 1 – a restaurant', 'Hourly paid employees, cleaning supplies, food cost, liquor cost'],
        ['Business 2 – a taxi', 'Fuel'],
        ['Business 3 – a bakery', 'Yeast, sugar, salt, flour, oil, baking tray'],
      ] },
    ] },
    { title: 'Spot the difference', blocks: [
      { t: 'compare',
        left: { title: 'Variable (direct)', items: ['Flour for bread', 'Buying stock to resell', 'Materials for baby clothes', 'Sugar for sweets'] },
        right: { title: 'Fixed (indirect)', items: ['Renting the bakery', 'Manager’s salary', 'Insurance', 'Electricity for heating'] } },
      { t: 'callout', tone: 'tip', title: 'Ask yourself', text: '“If I sold twice as much, would this cost go up?” If yes → **variable**. If no → **fixed**.' },
    ] },
  ],
  questions: [
    q4.mcq(1, 'O', 'Identify 1 variable cost from the list below.', ['Fuel', 'Customers', 'Competitors', 'Flour'], 3, 'Flour is used up as more products are made, so it is variable. Customers and competitors are not costs.', { source: 'Lesson 04 Q1', note: 'Fuel is also listed as a variable cost for the taxi business, but flour is the clearest choice here. ' + inferred }),
    q4.mcq(1, 'O', 'Sophie is a self-employed baker. Flour, yeast and milk are which type of cost?', ['Fixed Cost', 'Direct Cost', 'Indirect Cost', 'Start-up Cost'], 1, 'Ingredients are direct (variable) costs.', { source: 'Lesson 04 Q2', note: inferred }),
    q4.mcq(1, 'O', 'Identify 1 example of a variable cost for a sandwich shop.', ['Paying rent', 'Till record sales', 'Heating and lighting', 'Purchase of inventory (stock)'], 3, 'Stock is bought in proportion to sandwiches sold.', { source: 'Lesson 04 Q3 (original wording: “carriable cost”)', note: 'The original says “carriable”, which is a typo for “variable”. ' + inferred }),
    q4.mcq(1, 'O', 'Which statement is an example of direct costs for a bakery?', ['The cost of renting the bakery', 'The cost of advertising the bread', 'The cost of flour for making the bread', 'The cost of electricity for heating the bakery'], 2, 'Flour relates directly to how much bread is made.', { source: 'Lesson 04 Q4', note: inferred }),
    q4.multi(2, 'O', 'Jean owns a business making baby clothes. Identify TWO variable costs for Jean’s business.', ['Wages for the staff', 'Insurance for the business', 'Salary for manager', 'Materials for the baby clothes'], [0, 3], 'Materials and (hourly) production wages rise with output; insurance and a manager’s salary stay the same.', { source: 'Lesson 04 Q5', note: 'The deck lists hourly paid employees as a variable cost. ' + inferred }),
    q4.mcq(1, 'O', 'Mohammed owns a business making sweets. Identify 1 variable cost.', ['Paying manager’s salary', 'Paying for the sugar', 'Paying rent for the premises', 'Paying for marketing'], 1, 'Sugar is used up in making the sweets.', { source: 'Lesson 04 Q6', note: inferred }),
    q4.mcq(1, 'O', 'Yin owns a business selling mobile phones. Identify 1 variable cost.', ['Buying phones from a wholesaler', 'Paying managers’ salaries', 'Paying utilities for the premises', 'Paying insurance'], 0, 'Phones are bought in proportion to those sold.', { source: 'Lesson 04 Q7 (original wrongly says “Jean’s business”)', note: inferred }),
    q4.mcq(1, 'O', 'Matt owns a butcher business. Identify 1 variable cost.', ['Buying stock', 'Paying insurance', 'Indirect Cost', 'Start-up Cost'], 0, 'Buying stock varies with sales.', { source: 'Lesson 04 Q8', note: inferred }),
    q4.multi(1, 'O', 'John owns a mobile shop. Identify TWO variable costs.', ['Buying stock', 'Paying insurance', 'Paper', 'Start-up Cost'], [0, 2], 'Stock and paper (materials) vary with sales; insurance is fixed.', { source: 'Lesson 04 Q9', note: inferred }),
    q4.mcq(1, 'O', 'Betty owns a coffee shop. Identify 1 variable cost.', ['Start-up Cost', 'Paying insurance', 'Customers Reviews', 'Coffee'], 3, 'Coffee is used up with every cup sold.', { source: 'Lesson 04 Q10 (original says “John’s business”)', note: inferred }),
    q4.fill(1, 'G', 'Variable costs are also called ___ costs because they relate directly to the amount produced or sold.', ['direct'], 'Variable costs are direct costs.'),
    q4.tf(1, 'G', 'Variable costs stay the same whether the business sells 10 or 1,000 products.', false, 'Variable costs change with the number of products made or sold.'),
    q4.multi(2, 'G', 'Which are variable costs for a bakery? (Select all that apply)', ['Flour', 'Yeast', 'Sugar', 'Renting the bakery'], [0, 1, 2], 'Ingredients vary with output; rent is fixed.'),
    q4.short(3, 'G', 'Explain the difference between a fixed cost and a variable cost.', [['fixed'], ['variable'], ['no matter', 'does not change', 'same', 'stays the same', 'not change', 'regardless'], ['number of products', 'amount sold', 'amount produced', 'output', 'sales', 'depends on']], 3, 'A fixed cost stays the same however many products are made or sold, whereas a variable cost changes with the number of products made or sold.', 'Fixed = same whatever is sold. Variable = rises and falls with output.'),
  ],
}
