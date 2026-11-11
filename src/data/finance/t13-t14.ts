import type { Topic } from '../../types'
import { mk } from '../helpers'

// ───────────────────────── 13. CASH FLOW ─────────────────────────
const q13 = mk('cash-flow')
const ryanT = { head: ['£', 'Month 1', 'Month 2', 'Month 3', 'Month 4'], rows: [
  ['Inflows', '', '', '', ''], ['Flower sales', '6,000', '6,500', '8,000', '9,750'], ['Total inflows', '6,000', '6,500', '8,000', '9,750'],
  ['Outflows', '', '', '', ''], ['Ryan’s wages', '800', '800', '800', '800'], ['Delivery van', '2,000', '', '', ''], ['Fixtures and fittings', '2,400', '1,000', '', ''],
  ['Flower costs', '3,150', '3,550', '4,000', '4,500'], ['Other costs', '1,200', '1,600', '1,600', '1,700'], ['Total outflows', '9,550', '6,950', '6,400', '7,000'],
  ['Net cash flow', '-3,550', '-450', '1,600', '2,750'], ['Opening balance', '0', '-3,550', '-4,000', '-2,400'], ['Closing balance', '-3,550', '-4,000', '-2,400', '350'],
], boldRows: [2, 9, 10, 12] }
export const cashFlow: Topic = {
  id: 'cash-flow',
  number: 13,
  title: 'Cash Flow & Forecasts',
  summary: 'Cash inflows and outflows, net cash flow, opening and closing balances, and analysing a forecast.',
  icon: '💧',
  source: 'Revision.pptx (Cashflow, Cash Flow Forecast – slides 18 to 23)',
  slides: [
    { title: 'Cash inflows and outflows', blocks: [
      { t: 'compare', left: { title: 'Cash inflow (money in)', items: ['Selling goods', 'Payments from customers'] }, right: { title: 'Cash outflow (money out)', items: ['Repaying loans', 'Paying wages', 'Buying stock'] } },
      { t: 'callout', tone: 'exam', title: 'Revision exam question', text: '“Identify one example of a cash inflow”: the correct answer is **selling goods**.' },
    ] },
    { title: 'Net cash flow and balances', blocks: [
      { t: 'formula', name: 'Net cash flow', formula: 'Net Cash Flow = Inflows − Outflows', vars: [['Inflows', 'cash coming in during the month'], ['Outflows', 'cash going out during the month']] },
      { t: 'formula', name: 'Opening balance (from the Revision deck)', formula: 'Opening Balance = Closing Balance − Net Cash Flow' },
      { t: 'callout', tone: 'tip', title: 'Also remember', text: 'This month’s **closing balance** = opening balance + net cash flow, and it becomes next month’s **opening balance**.' },
    ] },
    { title: 'Worked examples', blocks: [
      { t: 'example', title: 'Opening balance for Month 2', steps: ['Closing balance − net cash flow', '£300 − £100'], result: '£200' },
      { t: 'example', title: 'Net cash flow for Month 3', steps: ['Inflows − outflows', '£1,500 − £1,100'], result: '£400' },
    ] },
    { title: 'Ryan’s flower shop: cash-flow forecast', blocks: [
      { t: 'p', text: 'Ryan is planning to open a flower shop. In his first two months he needs to buy a delivery van and fixtures and fittings. **Use the cash-flow forecast to analyse the finances of Ryan’s business. (9 marks)**' },
      { t: 'table', ...ryanT, caption: 'Extract from cash-flow forecast' },
    ] },
    { title: 'Forecast: positives', blocks: [
      { t: 'list', items: [
        'Flower sales are increasing each month.',
        'Positive net cash flow after two months (month 4 increases even further).',
        'Closing balance is positive in month 4 after paying for fixtures and fittings and the delivery van.',
        'Total outflows are lower in total between months 1 and 4.',
        'Wages have remained stable over the four months.',
      ] },
    ] },
    { title: 'Forecast: negatives', blocks: [
      { t: 'list', items: [
        'The van and fixtures and fittings are required but there is no start-up capital (zero opening balance).',
        'Additional capital would need to be raised, impacting future cash flows.',
        'Flower costs are increasing, though at a lower rate than sales.',
        'Negative net cash flow in months 1 and 2.',
        'Negative closing balance in months 1, 2 and 3.',
        'Positive cash flow is not achieved until month 4.',
        'Business survival is at risk due to the negative closing balance until month 4.',
        'Other costs are increasing, and more sales may increase other costs further (e.g. advertising).',
      ] },
    ] },
    { title: 'Forecast: analysis', blocks: [
      { t: 'list', items: [
        'Increased sales have led to an increase in costs.',
        'The investment in the delivery van and fixtures and fittings has led to increased inflows in months 3 and 4.',
        'Consequently, an improvement in net cash flow has followed.',
        'The increase in flower costs is clearly offset by a larger percentage increase in total inflows.',
      ] },
    ] },
  ],
  questions: [
    q13.mcq(0, 'O', 'Identify ONE example of a cash inflow for a business. (1 mark)', ['Repaying loans', 'Paying wages', 'Buying stock', 'Selling goods'], 3, 'Selling goods brings cash in.', { source: 'Revision slide 18', marks: 1 }),
    q13.calc(2, 'O', 'Opening balance for Month 2: closing balance £300, net cash flow £100. Calculate the opening balance.', 200, '£', 'Opening balance = closing balance − net cash flow = £300 − £100 = £200.', { source: 'Revision slide 19' }),
    q13.calc(2, 'O', 'Net cash flow for Month 3: inflows £1,500, outflows £1,100. Calculate the net cash flow.', 400, '£', 'Net cash flow = inflows − outflows = £1,500 − £1,100 = £400.', { source: 'Revision slide 19' }),
    q13.short(3, 'O', 'Use the cash-flow forecast to analyse the finances of Ryan’s business. (9 marks)', [['sales increasing', 'sales increase', 'sales are increasing', 'flower sales'], ['positive net cash flow', 'net cash flow positive', 'month 4'], ['negative closing balance', 'closing balance negative', 'negative balance'], ['no start-up', 'zero opening balance', 'opening balance zero', 'capital'], ['van', 'fixtures'], ['costs increas', 'costs rising', 'costs are increasing'], ['survival', 'survive']], 4, 'Flower sales rise each month and net cash flow turns positive in months 3 and 4, with a closing balance of £350 in month 4. However, with no start-up capital the business has negative net cash flow in months 1–2 and a negative closing balance in months 1–3 after buying the van and fixtures; costs are also rising, so survival depends on raising extra capital.', 'Give positives, negatives and an analysis, each backed with figures.', { source: 'Revision slides 20–23', table: ryanT, marks: 9, note: 'Marked on the key ideas covered; compare with the model answer.' }),
    q13.calc(3, 'G', 'Using Ryan’s forecast, calculate Month 1 net cash flow (inflows £6,000 − outflows £9,550). Use a minus sign for a negative.', -3550, '£', '£6,000 − £9,550 = -£3,550.', { table: ryanT }),
    q13.calc(3, 'G', 'Using Ryan’s forecast, what is the closing balance in Month 4?', 350, '£', 'Opening -£2,400 + net cash flow £2,750 = £350.', { table: ryanT }),
    q13.calc(3, 'G', 'Using Ryan’s forecast, what is the net cash flow in Month 3?', 1600, '£', '£8,000 − £6,400 = £1,600.', { table: ryanT }),
    q13.tf(5, 'G', 'In Ryan’s forecast, the closing balance is negative in months 1, 2 and 3.', true, 'Closing balances are -£3,550, -£4,000 and -£2,400.', { table: ryanT }),
    q13.fill(1, 'G', 'Net cash flow = inflows − ___.', ['outflows', 'outflow'], 'Net cash flow = inflows − outflows.'),
    q13.mcq(1, 'G', 'This month’s closing balance becomes next month’s…', ['Net cash flow', 'Opening balance', 'Total outflows', 'Revenue'], 1, 'Closing balance of one month = opening balance of the next.'),
  ],
}

// ───────────────────────── 14. RATIOS & COMPARING BUSINESSES ─────────────────────────
const q14 = mk('ratios-comparing')
const compT = { head: ['£', 'Vectrum Carpets', 'Bella Carla'], rows: [['Sales revenue', '850,000', '955,000'], ['Gross profit', '255,000', '480,000'], ['Net profit', '65,000', '52,000'], ['Fixed assets', '260,000', '875,000'], ['Current assets', '312,000', '148,000'], ['Current liabilities', '298,000', '71,000'], ['Capital employed', '274,000', '952,000']] }
export const ratiosComparing: Topic = {
  id: 'ratios-comparing',
  number: 14,
  title: 'Ratios & Comparing Businesses',
  summary: 'The must-know formula sheet, profit margins, liquidity ratios and evaluating two businesses.',
  icon: '🧠',
  source: 'Formula sheet “Formulas You MUST Know Off-By-Heart” (photo); Revision.pptx (Current Ratio, Net profit, Financial Statement)',
  slides: [
    { title: 'Formulas you MUST know off-by-heart', blocks: [
      { t: 'table', head: ['#', 'Formula'], rows: [
        ['1', 'Total Cost = Fixed Cost + Variable Cost'],
        ['2', 'Revenue = Number of Sales × Price Per Unit'],
        ['3', 'Profit = Revenue − Expenditure'],
        ['4', 'Breakeven = Fixed Costs ÷ (Selling Price Per Unit − Variable Cost Per Unit)'],
        ['5', 'Gross Profit = Revenue − Cost of Sales'],
        ['6', 'Net Profit = Gross Profit − Expenditure'],
        ['7', 'Gross Profit Margin = (Gross Profit ÷ Sales) × 100'],
        ['8', 'Net Profit Margin = (Net Profit ÷ Sales) × 100'],
        ['9', 'Working Capital = Current Assets − Current Liabilities'],
        ['10', 'Current Ratio = Current Assets ÷ Current Liabilities'],
        ['11', 'Liquid Capital Ratio = (Current Assets − Inventory) ÷ Current Liabilities'],
      ] },
    ] },
    { title: 'Profit margins', blocks: [
      { t: 'formula', name: 'Net profit margin', formula: 'Net Profit Margin = (Net Profit ÷ Sales) × 100', vars: [['Net profit', 'profit after all expenses'], ['Sales', 'revenue for the same period']] },
      { t: 'example', title: 'Revision deck example', steps: ['NPM = £12,300 ÷ £150,000 × 100', 'NPM = 0.082 × 100'], result: '8.2%' },
      { t: 'formula', name: 'Gross profit margin', formula: 'Gross Profit Margin = (Gross Profit ÷ Sales) × 100' },
      { t: 'example', title: 'Using the gross profit example: GP £14,555, sales £33,875', steps: ['GPM = £14,555 ÷ £33,875 × 100'], result: '43.0% (to 1 decimal place)' },
    ] },
    { title: 'Current ratio and liquid capital ratio', blocks: [
      { t: 'formula', name: 'Current ratio', formula: 'Current Ratio = Current Assets ÷ Current Liabilities' },
      { t: 'example', title: 'Revision deck example', steps: ['CR = 3,514 ÷ 2,510'], result: '1.4' },
      { t: 'formula', name: 'Liquid capital ratio (acid test)', formula: 'Liquid Capital Ratio = (Current Assets − Inventory) ÷ Current Liabilities', vars: [['Inventory', 'stock, which is harder to turn into cash quickly']] },
      { t: 'callout', tone: 'tip', title: 'Reading the answer', text: 'A ratio above **1** means current assets cover current liabilities; below 1 the business may struggle to pay debts. (Liquid ratio uses a stricter test by leaving out stock.)' },
      { t: 'example', title: 'Generated practice example: Mohammed Year 1 (CA £39,620, inventory £6,250, CL £35,570)', steps: ['Current ratio = 39,620 ÷ 35,570 = 1.11', 'Liquid ratio = (39,620 − 6,250) ÷ 35,570 = 0.94'] },
    ] },
    { title: 'Comparing two businesses: the figures', blocks: [
      { t: 'p', text: 'Zumiera wants to purchase a small business and has two options: **Vectrum Carpets** (producer of rugs and carpets) or **Bella Carla** (a local restaurant). **Using the extracts, evaluate which business Zumiera should purchase. (9 marks)**' },
      { t: 'table', ...compT, caption: 'Extracts of financial statements for the last year' },
    ] },
    { title: 'Comparing: row-by-row points', blocks: [
      { t: 'table', head: ['Row', 'Vectrum Carpets', 'Bella Carla'], rows: [
        ['Sales revenue', '', '£105,000 more revenue'],
        ['Gross profit', 'Higher cost of sales (£595,000)', 'Lower cost of sales (£475,000), so a higher gross profit'],
        ['Net profit', 'Higher net profit; lower expenses (£190,000)', 'Higher expenses (£428,000)'],
        ['Fixed assets', '', 'Higher value of fixed assets'],
        ['Current assets', '', 'Higher current assets – more ability to pay bills'],
        ['Current liabilities', '', 'Lower current liabilities'],
        ['Net current assets', 'Positive figure (£14,000)', 'Large figure (£77,000) – possibly excess cash not being used'],
        ['Capital employed', 'Costs less to invest in the business', 'Business is worth almost 3.5 times more'],
      ] },
    ] },
    { title: 'Comparing: evaluation', blocks: [
      { t: 'list', items: [
        'The decision depends on the amount being asked for each business.',
        'Bella Carla has £225,000 more gross profit but £13,000 less net profit than Vectrum Carpets, and it is net profit that matters more.',
        'It may rely on Zumiera’s area of expertise / knowledge of the sectors involved.',
        'It depends on what Zumiera wants to achieve (capital growth, profitability, etc.).',
        'Non-financial factors may matter, e.g. whether the business needs direct management, or resistance to the purchase.',
        'It may depend on how much additional investment each business needs.',
        'The data is historic, so there is no guarantee of similar future performance.',
      ] },
    ] },
  ],
  questions: [
    q14.fill(0, 'G', 'Total cost = fixed cost + ___ cost.', ['variable'], 'Formula 1 on the sheet.'),
    q14.fill(0, 'G', 'Net profit = gross profit − ___.', ['expenditure', 'expenses', 'expense'], 'Formula 6 on the sheet.'),
    q14.mcq(2, 'G', 'Which is the correct formula for the current ratio?', ['Current liabilities ÷ current assets', 'Current assets ÷ current liabilities', 'Current assets − current liabilities', '(Current assets − inventory) ÷ current liabilities'], 1, 'Current ratio = current assets ÷ current liabilities.'),
    q14.mcq(2, 'G', 'Which formula gives the liquid capital ratio?', ['(Current assets − inventory) ÷ current liabilities', 'Current assets ÷ current liabilities', 'Current assets − current liabilities', '(Net profit ÷ sales) × 100'], 0, 'Liquid capital ratio leaves out inventory.'),
    q14.mcq(0, 'G', 'Which formula gives working capital?', ['Current assets − current liabilities', 'Current assets ÷ current liabilities', 'Fixed assets − current liabilities', 'Revenue − expenditure'], 0, 'Working capital = current assets − current liabilities.'),
    q14.calc(1, 'O', 'Net profit is £12,300 and sales are £150,000. Calculate the net profit margin (to 1 decimal place).', 8.2, '%', 'NPM = £12,300 ÷ £150,000 × 100 = 8.2%.', { source: 'Revision slide 27', decimals: 1 }),
    q14.calc(2, 'O', 'Current assets are £3,514 and current liabilities are £2,510. Calculate the current ratio (to 1 decimal place).', 1.4, '', 'CR = 3,514 ÷ 2,510 = 1.4.', { source: 'Revision slide 17', decimals: 1 }),
    q14.calc(1, 'G', 'Gross profit is £14,555 and sales are £33,875. Calculate the gross profit margin as a percentage (to 1 decimal place).', 43, '%', '£14,555 ÷ £33,875 × 100 = 42.97%, which is 43.0% to 1 d.p.', { decimals: 1 }),
    q14.calc(1, 'G', 'A business has gross profit £60,000 and sales £240,000. Calculate the gross profit margin.', 25, '%', '£60,000 ÷ £240,000 × 100 = 25%.', { decimals: 1 }),
    q14.calc(2, 'G', 'Current assets £39,620, inventory £6,250 and current liabilities £35,570. Calculate the liquid capital ratio (2 decimal places).', 0.94, '', '(39,620 − 6,250) ÷ 35,570 = 33,370 ÷ 35,570 = 0.94.', { decimals: 2 }),
    q14.calc(2, 'G', 'Current assets £28,480 and current liabilities £31,290. Calculate the current ratio (2 decimal places).', 0.91, '', '28,480 ÷ 31,290 = 0.91. Below 1, so liabilities are not fully covered.', { decimals: 2 }),
    q14.calc(3, 'G', 'Using the extracts: how much MORE gross profit does Bella Carla make than Vectrum Carpets?', 225000, '£', '£480,000 − £255,000 = £225,000.', { table: compT }),
    q14.calc(3, 'G', 'Using the extracts: how much LESS net profit does Bella Carla make than Vectrum Carpets?', 13000, '£', '£65,000 − £52,000 = £13,000.', { table: compT }),
    q14.short(5, 'O', 'Using these extracts of financial statements, evaluate which business Zumiera should purchase. (9 marks)', [['gross profit'], ['net profit'], ['fixed assets', 'current assets', 'current liabilities', 'capital employed', 'net current'], ['expertise', 'knowledge', 'sector'], ['non-financial', 'direct management', 'resistance'], ['historic', 'no guarantee', 'future performance'], ['investment', 'additional investment'], ['capital growth', 'profitability']], 4, 'Bella Carla has £225,000 more gross profit but £13,000 less net profit than Vectrum, and net profit matters more; Bella has higher fixed assets, lower liabilities and larger capital employed (worth almost 3.5 times more), but Vectrum is cheaper to invest in. The decision depends on the asking price, Zumiera’s expertise, her aims (growth or profitability), non-financial factors, extra investment needed, and the data being historic.', 'Compare each row, then give a justified recommendation.', { source: 'Revision slides 24–26', table: compT, marks: 9, note: 'Marked on the key ideas covered; compare with the model answer.' }),
  ],
}
