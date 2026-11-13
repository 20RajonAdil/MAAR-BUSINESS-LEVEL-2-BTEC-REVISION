import type { Topic } from '../../types'
import { mk } from '../helpers'

const inferred = 'The lesson deck gives no answer key for this activity; the answer shown was worked out from the lesson content.'
const modelNote = 'The model answer was written from the lesson’s marking guidance. Compare it with your own answer for the key points.'

// ───────────────────────── Lesson 05 · SWOT, PESTLE & MARKETING DECISIONS ─────────────────────────
const q4 = mk('swot-pestle')
export const swotPestle: Topic = {
  id: 'swot-pestle',
  number: 5,
  title: 'SWOT, PESTLE and Marketing Decisions',
  summary: 'Situational analysis, SWOT, PESTLE, competitor analysis, benchmarking, consumer behaviour and market trends.',
  icon: '🧭',
  source: 'Lesson 05 – SWOT, PESTLE and Marketing Decisions (Learning Aim B, Topics B.1–B.2); Revision slides 8–10, 18, 19',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: ['Use SWOT and PESTLE correctly.', 'Identify external opportunities and threats.', 'Explain the purpose of situational analysis.', 'Apply findings to a marketing decision.'] }] },
    { title: 'Situational analysis shows where a business stands', blocks: [
      { t: 'list', items: ['It combines evidence about the **business and its environment**.', 'The aim is to make marketing decisions that **fit current conditions**.'] },
      { t: 'callout', tone: 'exam', title: 'Revision deck: name 2 situational analyses', text: '**SWOT** and **PESTLE**.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Why is yesterday’s successful campaign not automatically right for tomorrow?' },
    ] },
    { title: 'SWOT separates internal and external factors', blocks: [
      { t: 'table', head: ['', 'Factor', 'Internal or external?'], left: true, rows: [['S', 'Strengths', 'Internal'], ['W', 'Weaknesses', 'Internal'], ['O', 'Opportunities', 'External'], ['T', 'Threats', 'External']] },
      { t: 'p', text: 'The value comes from **using evidence and linking findings to action**.' },
      { t: 'callout', tone: 'exam', title: 'Revision deck: SWOT stands for', text: 'Strength · Weakness · Opportunity · Threat.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Classify: skilled staff, new competitor, strong cash flow, changing tastes.' },
    ] },
    { title: 'PESTLE scans the external environment', blocks: [
      { t: 'terms', items: [
        ['Political', 'Government priorities and policy.'],
        ['Economic', 'Income, inflation and interest rates.'],
        ['Social', 'Lifestyles and demographics.'],
        ['Technological', 'Changes in technology.'],
        ['Legal', 'Changes in law.'],
        ['Environmental', 'Environmental changes.'],
      ] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Choose one PESTLE factor affecting an online fashion retailer.' },
    ] },
    { title: 'Research helps identify target markets', blocks: [
      { t: 'list', items: ['Look for **unmet needs or gaps**.', 'Compare current offerings and customer dissatisfaction.', 'Match the business’s strengths to a suitable segment.'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Suggest one possible gap in the local food market.' },
    ] },
    { title: 'Competitor analysis and benchmarking', blocks: [
      { t: 'list', items: ['Compare products, prices, channels and promotion.', 'Benchmark performance and customer reviews.', 'Avoid copying: look for **meaningful differentiation**.'] },
      { t: 'callout', tone: 'key', title: 'Revision deck: benchmarking means', text: 'Comparing your business to your competitor(s); reviewing products and services offered; innovating products to attract and keep consumers interested; assessing the performance of the business; planning strategies to be better; making the business more efficient.' },
      { t: 'callout', tone: 'exam', title: 'Why is benchmarking important?', text: 'It lets a business **measure performance** against competitors (better planning and decisions), **compare products** (what to change or keep doing) and **compare processes** with competitors/industry best practice (so it can improve them).' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Build a four-point competitor comparison for two cafés.' },
    ] },
    { title: 'Consumer behaviour explains the response', blocks: [
      { t: 'list', items: ['**Needs and wants** influence choice.', 'Motivations may include **price, quality, convenience, identity or ethics**.', 'Research tests how customers may react to an offering.'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'What could motivate a student to switch phone networks?' },
    ] },
    { title: 'Market trends reveal direction and pace', blocks: [
      { t: 'terms', items: [['Market value', 'Measures sales revenue.'], ['Growth rate', 'Shows how quickly a market is changing.'], ['Competition and product numbers', 'Affect opportunity and risk.']] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Does a fast-growing market always guarantee success? Explain.' },
    ] },
    { title: 'Apply evidence before choosing an action', blocks: [
      { t: 'list', ordered: true, items: ['Select one SWOT finding and one PESTLE finding.', 'Explain the marketing implication.', 'Recommend a product, price, place or promotion response.'] },
      { t: 'callout', tone: 'tip', title: 'Reasoning chain', text: 'Use “because” and “therefore” to build a full reasoning chain.' },
    ] },
    { title: 'Exam practice and marking guidance', blocks: [
      { t: 'terms', items: [
        ['“Identify two external elements of a SWOT analysis.” (2 marks)', 'Opportunity and threat: 1 mark each.'],
        ['“Explain one way PESTLE analysis could support a marketing decision.” (4 marks)', 'Reward factor → impact → adapted decision, supported with a relevant example.'],
        ['“A small restaurant faces rising costs and changing dietary preferences. Analyse two suitable marketing responses.” (8 marks)', 'Reward contextual chains using economic and social evidence, suitable mix decisions, likely benefits/limits and a supported judgement.'],
      ] },
    ] },
  ],
  questions: [
    q4.multi(1, 'O', 'Name TWO situational analyses a business can use.', ['SWOT', 'PESTLE', 'SMART', 'B2B'], [0, 1], 'The Revision deck names SWOT and PESTLE.', { source: 'Revision slide 8', marks: 2 }),
    q4.multi(2, 'O', 'What does SWOT stand for? Select the four words.', ['Strength', 'Weakness', 'Opportunity', 'Threat', 'Targeting'], [0, 1, 2, 3], 'SWOT = Strength, Weakness, Opportunity, Threat.', { source: 'Revision slide 9' }),
    q4.multi(3, 'O', 'What does PESTLE stand for? Select the words that are part of PESTLE.', ['Political', 'Economic', 'Social', 'Technological', 'Legal', 'Environmental', 'Product'], [0, 1, 2, 3, 4, 5], 'PESTLE = Political, Economic, Social, Technological, Legal, Environmental.', { source: 'Revision slide 10' }),
    q4.short(5, 'O', 'What does the term benchmarking mean?', [['compare', 'comparing', 'comparison'], ['competitor', 'competitors', 'rivals'], ['performance', 'assess', 'efficient', 'strateg', 'plan', 'improve', 'products and services', 'review']], 2, 'Benchmarking means comparing your business to your competitor(s): reviewing products and services, assessing performance, planning strategies to be better and making the business more efficient.', 'Compare with competitors to assess performance and improve.', { source: 'Revision slide 18' }),
    q4.short(5, 'O', 'Why is benchmarking important?', [['measure', 'compare performance', 'performance against competitors'], ['products', 'processes', 'best practice'], ['improve', 'planning', 'decision', 'change', 'effective']], 2, 'It allows a business to measure its performance against competitors so it can improve planning and decision making; compare products and processes against competitors/best practice so it knows what to change or continue doing and can become more effective.', 'Measure performance, compare products and processes, then improve.', { source: 'Revision slide 19' }),
    q4.multi(2, 'O', 'Identify TWO external elements of a SWOT analysis. (2 marks)', ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'], [2, 3], 'Opportunities and threats are external; strengths and weaknesses are internal.', { source: 'Lesson 05 exam practice', marks: 2 }),
    q4.short(3, 'O', 'Explain one way PESTLE analysis could support a marketing decision. (4 marks)', [['political', 'economic', 'social', 'technological', 'technology', 'legal', 'environmental', 'inflation', 'interest rates', 'law'], ['impact', 'affect', 'effect', 'change', 'result'], ['decision', 'adapt', 'price', 'product', 'promotion', 'place', 'respond', 'therefore']], 2, 'E.g. an economic factor such as rising interest rates reduces customers’ spending (impact), so a business could adapt its marketing decision by offering a lower-priced range or value promotions.', 'Factor → impact → adapted decision, with an example.', { source: 'Lesson 05 exam practice', marks: 4, note: modelNote }),
    q4.short(8, 'O', 'A small restaurant faces rising costs and changing dietary preferences. Analyse two suitable marketing responses. (8 marks)', [['economic', 'rising costs', 'costs'], ['social', 'dietary', 'vegan', 'vegetarian', 'healthy', 'preferences'], ['price', 'pricing', 'menu', 'product', 'promotion', 'ingredients'], ['benefit', 'attract', 'customers', 'sales', 'profit'], ['limit', 'risk', 'however', 'cost'], ['recommend', 'overall', 'judgement', 'best', 'conclusion', 'therefore']], 4, 'E.g. add a vegan/vegetarian menu range (product response to social change) to attract a wider group; adjust prices carefully or use cost-plus pricing and set meals (price response to rising costs). Benefits: new customers and protected margins. Limits: new ingredients cost money and higher prices may lose price-sensitive customers. Judgement: the menu change is likely best because it grows demand while prices remain competitive.', 'Reward contextual chains, mix decisions, benefits/limits and a supported judgement.', { source: 'Lesson 05 extended response', marks: 8, note: modelNote }),
    q4.mcq(2, 'O', 'Which of these is an EXTERNAL factor in a SWOT? (skilled staff, new competitor, strong cash flow, changing tastes)', ['Skilled staff', 'New competitor', 'Strong cash flow', 'Own brand reputation'], 1, 'A new competitor is external (a threat); skilled staff and strong cash flow are internal strengths. Changing tastes are also external.', { source: 'Lesson 05 slide 5 activity', note: inferred }),
    q4.multi(2, 'G', 'Which are INTERNAL SWOT factors? (Select all that apply)', ['Skilled staff', 'New competitor', 'Strong cash flow', 'Changing tastes'], [0, 2], 'Strengths and weaknesses are internal; opportunities and threats are external.'),
    q4.mcq(3, 'G', 'Rising interest rates and inflation fall under which PESTLE factor?', ['Political', 'Economic', 'Social', 'Legal'], 1, 'Economic covers income, inflation and interest rates.'),
    q4.mcq(3, 'G', 'Changing lifestyles and demographics fall under which PESTLE factor?', ['Social', 'Technological', 'Environmental', 'Political'], 0, 'Social covers lifestyles and demographics.'),
    q4.mcq(3, 'G', 'A new law on food labelling is which PESTLE factor?', ['Economic', 'Legal', 'Social', 'Technological'], 1, 'Changes in law are legal factors.'),
    q4.fill(1, 'G', 'SWOT and PESTLE are both types of ___ analysis.', ['situational'], 'Situational analysis shows where a business stands.'),
    q4.tf(5, 'G', 'Competitor analysis should aim to copy competitors exactly.', false, 'Avoid copying: look for meaningful differentiation.'),
    q4.tf(7, 'G', 'A fast-growing market always guarantees success.', false, 'Fast growth can attract competitors; opportunity and risk both depend on competition.'),
    q4.multi(6, 'G', 'Which motivations may influence consumer choice? (Select all that apply)', ['Price', 'Quality', 'Convenience', 'Identity', 'Ethics'], [0, 1, 2, 3, 4], 'The lesson lists price, quality, convenience, identity and ethics.'),
  ],
}

// ───────────────────────── Lesson 06 · INTERPRETING MARKET RESEARCH ─────────────────────────
const q5 = mk('interpreting-research')
export const interpreting: Topic = {
  id: 'interpreting-research',
  number: 6,
  title: 'Interpreting Market Research',
  summary: 'Market size, growth and share: calculating market share and using findings to recommend a decision.',
  icon: '📈',
  source: 'Lesson 06 – Interpreting Market Research Findings',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: ['Interpret market size, growth and share.', 'Calculate simple market-share figures.', 'Explain fast- and slow-growth implications.', 'Use findings to recommend a decision.'] }] },
    { title: 'Research only creates value when it changes a decision', blocks: [
      { t: 'list', items: ['Findings must be **interpreted in context**.', 'A useful conclusion explains what the evidence means for **product, price, place or promotion**.'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'What is the difference between describing a number and interpreting it?' },
    ] },
    { title: 'Market size can be measured in different ways', blocks: [
      { t: 'terms', items: [['By value', 'Total sales revenue.'], ['By product or brand', 'Sales within a category.'], ['By customer', 'Number or type of buyers.']] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Which measure would matter most to a premium brand? Explain.' },
    ] },
    { title: 'Market growth measures change over time', blocks: [
      { t: 'compare', left: { title: 'Fast growth', items: ['Can attract competitors and investment.'] }, right: { title: 'Slow growth', items: ['Can make winning share more important.'] } },
      { t: 'p', text: 'Growth may **vary by segment** even within one market.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Suggest one risk in a fast-growing market and one in a slow-growing market.' },
    ] },
    { title: 'Market share', blocks: [
      { t: 'formula', name: 'Market share', formula: 'Market Share = Business Sales ÷ Total Market Sales × 100', vars: [['Business sales', 'the business’s sales (value or volume)'], ['Total market sales', 'sales of the whole market, in the same units']] },
      { t: 'example', title: 'Apply it: business sales £2m; total market sales £20m', steps: ['£2m ÷ £20m × 100'], result: '10%' },
      { t: 'example', title: 'Exam practice: sales £3m in a £25m market', steps: ['£3m ÷ £25m × 100'], result: '12%' },
      { t: 'p', text: 'It may be calculated by sales **value or volume**. A **rising share** suggests the business is growing faster than the market.' },
    ] },
    { title: 'High market share can bring advantages', blocks: [
      { t: 'list', items: ['Greater brand recognition', 'Possible economies of scale and bargaining power', 'More customer and sales data'] },
      { t: 'callout', tone: 'warn', title: 'But…', text: 'High share does **not** automatically mean high profit.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Why could a market leader still make a loss?' },
    ] },
    { title: 'Mass and niche strategies shape the desired share', blocks: [
      { t: 'list', items: ['**Mass marketing** seeks high volume across a broad market.', '**Niche marketing** focuses on a narrow segment.', 'A niche leader may have low total-market share but **strong segment share**.'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Explain why 5% share could be impressive for a niche business.' },
    ] },
    { title: 'Apply it: turn findings into a recommendation', blocks: [
      { t: 'table', left: true, head: ['Measure', 'Before', 'After'], rows: [['Sales', '£1.2m', '£1.5m'], ['Market', '£10m', '£15m'], ['Customer satisfaction', '', '82%']] },
      { t: 'example', title: 'Working (added to illustrate the lesson’s method)', steps: ['Share before = £1.2m ÷ £10m × 100 = 12%', 'Share after = £1.5m ÷ £15m × 100 = 10%', 'Sales grew 25%, but the market grew 50%'], result: 'Market share fell from 12% to 10%' },
      { t: 'p', text: 'Sales rose, but the business grew **more slowly than the market**, so its share fell. A recommendation could build on the 82% satisfaction, for example loyalty or promotion to win back share. Show calculations and explain the implication.' },
    ] },
    { title: 'Exam practice and marking guidance', blocks: [
      { t: 'terms', items: [
        ['“Calculate market share if sales are £3m in a £25m market.” (2 marks)', '£3m ÷ £25m × 100 = 12%: method and correct answer.'],
        ['“Explain one implication of operating in a slow-growing market.” (4 marks)', 'Reward linked explanation such as limited new demand → stronger competition for existing customers → need for differentiation/loyalty.'],
        ['“A brand’s sales grew by 10% while its market grew by 25%. Evaluate whether its marketing has been successful.” (8 marks)', 'Reward comparison, likely falling share, other success measures such as profit or objectives, limits of evidence and a justified conclusion.'],
      ] },
    ] },
  ],
  questions: [
    q5.calc(4, 'O', 'Calculate market share if sales are £3m in a £25m market. (2 marks)', 12, '%', '£3m ÷ £25m × 100 = 12%.', { source: 'Lesson 06 exam practice', marks: 2, decimals: 1 }),
    q5.calc(4, 'O', 'Business sales are £2m and total market sales are £20m. Calculate the market share.', 10, '%', '£2m ÷ £20m × 100 = 10%.', { source: 'Lesson 06 slide 7 activity', decimals: 1 }),
    q5.calc(7, 'O', 'Before: sales £1.2m in a £10m market. Calculate the market share.', 12, '%', '£1.2m ÷ £10m × 100 = 12%.', { source: 'Lesson 06 slide 10 activity', decimals: 1 }),
    q5.calc(7, 'O', 'After: sales £1.5m in a £15m market. Calculate the market share.', 10, '%', '£1.5m ÷ £15m × 100 = 10%.', { source: 'Lesson 06 slide 10 activity', decimals: 1 }),
    q5.mcq(7, 'O', 'The business’s sales rose from £1.2m to £1.5m, but the market rose from £10m to £15m. What has happened to its market share?', ['It has risen', 'It has stayed the same', 'It has fallen', 'It cannot be calculated'], 2, 'Share fell from 12% to 10% because the market grew faster than the business.', { source: 'Lesson 06 slide 10 activity', note: inferred }),
    q5.short(3, 'O', 'Explain one implication of operating in a slow-growing market. (4 marks)', [['slow', 'limited growth', 'little growth', 'limited new demand', 'new demand'], ['competition', 'competitors', 'compete', 'existing customers', 'win share'], ['differentiat', 'loyalty', 'loyal', 'unique', 'stand out', 'retain']], 2, 'In a slow-growing market there is limited new demand, so competitors fight harder for the existing customers, so the business needs to differentiate itself or build customer loyalty.', 'Limited new demand → stronger competition → need for differentiation/loyalty.', { source: 'Lesson 06 exam practice', marks: 4, note: modelNote }),
    q5.short(7, 'O', 'A brand’s sales grew by 10% while its market grew by 25%. Evaluate whether its marketing has been successful. (8 marks)', [['10%', 'sales grew', 'grew'], ['25%', 'market grew', 'market'], ['share', 'market share', 'falling'], ['profit', 'objective', 'objectives', 'other measures', 'brand awareness', 'loyalty'], ['limit', 'evidence', 'only', 'cannot', 'depends'], ['overall', 'conclusion', 'therefore', 'judgement', 'not successful', 'partly']], 4, 'Sales grew, but more slowly than the market (10% v 25%), so its market share is likely to be falling, which suggests the marketing is not fully successful compared with competitors. However, success should also be judged using profit, objectives and customer measures, and the evidence is limited. Overall it is only partly successful.', 'Comparison of growth, falling share, other success measures, limits and a justified conclusion.', { source: 'Lesson 06 extended response', marks: 8, note: modelNote }),
    q5.mcq(2, 'G', 'Market size “by value” means…', ['The number of buyers', 'Total sales revenue', 'The number of brands', 'The age of customers'], 1, 'By value = total sales revenue.'),
    q5.calc(4, 'G', 'A business has sales of £450,000 in a market worth £3m. Calculate its market share.', 15, '%', '£450,000 ÷ £3,000,000 × 100 = 15%.', { decimals: 1 }),
    q5.calc(4, 'G', 'A niche business sells £50,000 in a total market of £1m. Calculate its market share.', 5, '%', '£50,000 ÷ £1,000,000 × 100 = 5%.', { decimals: 1 }),
    q5.fill(4, 'G', 'Market share = business sales ÷ total market ___ × 100.', ['sales', 'market sales', 'sales'], 'Market share = business sales ÷ total market sales × 100.'),
    q5.tf(5, 'G', 'A high market share automatically means a business makes a high profit.', false, 'High share does not automatically mean high profit; a market leader can still make a loss.'),
    q5.multi(5, 'G', 'Which are advantages of a high market share? (Select all that apply)', ['Greater brand recognition', 'Possible economies of scale', 'More customer and sales data', 'Guaranteed profit'], [0, 1, 2], 'The lesson warns that high share does not guarantee profit.'),
    q5.mcq(3, 'G', 'In a slow-growing market, winning share from competitors becomes…', ['Less important', 'More important', 'Impossible', 'Irrelevant'], 1, 'Slow growth can make winning share more important.'),
    q5.mcq(6, 'G', 'Why could 5% market share be impressive for a niche business?', ['Because niche businesses never have competitors', 'Because it may represent strong share in a narrow segment', 'Because 5% always means high profit', 'Because niche markets are huge'], 1, 'A niche leader may have low total-market share but strong segment share.'),
    q5.tf(4, 'G', 'A rising market share suggests the business is growing faster than the market.', true, 'That is the lesson’s interpretation.'),
  ],
}
