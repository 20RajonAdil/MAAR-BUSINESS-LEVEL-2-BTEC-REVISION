import type { Topic } from '../../types'
import { mk } from '../helpers'

const inferred = 'The lesson deck gives no answer key for this activity; the answer shown was worked out from the lesson content.'
const modelNote = 'The model answer was written from the lesson’s marking guidance. Compare it with your own answer for the key points.'

// ───────────────────────── Lesson 01 · PRINCIPLES OF MARKETING ─────────────────────────
const q1 = mk('principles-of-marketing')
export const principles: Topic = {
  id: 'principles-of-marketing',
  number: 1,
  title: 'Principles of Marketing',
  summary: 'What marketing is, why it matters, how it supports corporate objectives, and how to write SMART objectives.',
  icon: 'megaphone',
  source: 'Lesson 01 – Principles of Marketing (Learning Aim A, Topic A.1); Revision slide 7 (SMART)',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: [
      'Define marketing in clear business language.',
      'Explain why marketing matters to businesses.',
      'Connect marketing activity to corporate objectives.',
      'Write effective SMART marketing objectives.',
    ] }, { t: 'callout', tone: 'tip', title: 'Starter from the lesson', text: 'Choose one business you used in the last seven days. What did you buy or use? Who was the target customer? What made the offering attractive? Which marketing decision influenced you most? **Challenge:** identify one improvement the business could make.' }] },
    { title: 'Marketing begins with customer needs', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: 'Marketing **identifies, anticipates and satisfies customer needs profitably**.' },
      { t: 'p', text: 'It is **more than advertising**: it includes research, product decisions, pricing, distribution and communication.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'What customer need does a food-delivery app satisfy? Explain your reasoning, not just your answer.' },
    ] },
    { title: 'Marketing helps a business compete and grow', blocks: [
      { t: 'list', items: ['Gain **market share** by winning more sales than competitors', 'Build **brand awareness** so customers recognise the business', 'Encourage **loyalty** and repeat purchases', 'Increase sales revenue and profitability'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Rank these four benefits for a new small business. Justify your top choice.' },
    ] },
    { title: 'Businesses use marketing to make better decisions', blocks: [
      { t: 'list', items: ['Understand changing customer needs', 'Keep ahead of competitors', 'Communicate effectively with the public', 'Design offers that increase sales and profit'] },
      { t: 'callout', tone: 'tip', title: 'Mini-case', text: 'A café’s sales fall after a competitor opens. Suggest two marketing actions.' },
    ] },
    { title: 'Marketing should support corporate objectives', blocks: [
      { t: 'terms', items: [
        ['Corporate objectives', 'The overall goals of a business.'],
        ['Marketing objectives', 'Targets, focused on customers and the market, that translate the corporate goals.'],
      ] },
      { t: 'example', title: 'From the lesson', steps: ['Corporate goal: grow profit', 'Marketing objective: increase online sales'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Match three marketing objectives to: **survival, growth and social responsibility**.' },
    ] },
    { title: 'SMART objectives make progress measurable', blocks: [
      { t: 'terms', items: [
        ['S – Specific', 'States exactly what will change.'],
        ['M – Measurable', 'Includes a number or indicator.'],
        ['A – Achievable and Realistic', 'Possible with the resources available.'],
        ['T – Time-based', 'Includes a deadline.'],
      ] },
      { t: 'callout', tone: 'exam', title: 'Revision deck: “What does SMART stand for?”', text: 'Specific · Measurable · Achievable · Realistic · Time-Based.' },
      { t: 'example', title: 'Improving a weak objective (illustration added here)', steps: ['Weak: “Get more young customers.”', 'SMART: “Increase sales to 16–19-year-olds by 10% within six months.”'] },
    ] },
    { title: 'Apply it: build a mini marketing plan', blocks: [
      { t: 'list', ordered: true, items: ['Choose a local business.', 'State one corporate objective.', 'Write one linked SMART marketing objective.', 'Suggest one marketing action and one measure of success.'] },
      { t: 'p', text: 'Be ready to explain how your action supports the objective.' },
    ] },
    { title: 'Exam practice and marking guidance', blocks: [
      { t: 'terms', items: [
        ['“Define the term ‘marketing’.” (2 marks)', 'Award 2 marks for identifying customer needs and satisfying them profitably / through an exchange.'],
        ['“Explain one reason why customer loyalty is important to a business.” (4 marks)', '1 mark for a relevant reason; up to 3 further marks for a linked explanation, e.g. repeat purchases → stable revenue → lower acquisition costs.'],
        ['“A new gym wants to increase membership. Write one SMART marketing objective and justify why it is SMART.” (6 marks)', 'Up to 2 marks for a valid objective; up to 4 marks for explaining the specific, measurable, achievable/realistic and time-based features.'],
      ] },
      { t: 'callout', tone: 'exam', title: 'Plan first', text: 'Point → application → analysis → judgement.' },
    ] },
  ],
  questions: [
    q1.short(1, 'O', 'Define the term ‘marketing’. (2 marks)', [['customer needs', 'needs of customers', 'customers needs', 'customer wants', 'needs and wants'], ['satisfy', 'satisfies', 'satisfying', 'meet', 'meeting', 'fulfil'], ['profitably', 'profit', 'exchange']], 2, 'Marketing identifies, anticipates and satisfies customer needs profitably (through an exchange).', 'Two marks for customer needs and satisfying them profitably / through an exchange.', { source: 'Lesson 01 exam practice', marks: 2 }),
    q1.short(2, 'O', 'Explain one reason why customer loyalty is important to a business. (4 marks)', [['loyal', 'loyalty', 'repeat purchase', 'repeat custom', 'come back', 'return'], ['revenue', 'sales', 'income', 'stable', 'regular'], ['acquisition', 'cost', 'new customers', 'attract', 'marketing spend', 'save']], 2, 'Loyal customers make repeat purchases, which gives a more stable revenue, so the business spends less on finding new customers (lower acquisition costs).', 'A reason plus a linked chain: repeat purchases → stable revenue → lower acquisition costs.', { source: 'Lesson 01 exam practice', marks: 4, note: modelNote }),
    q1.short(5, 'O', 'A new gym wants to increase membership. Write one SMART marketing objective and justify why it is SMART. (6 marks)', [['membership', 'members', 'sign up', 'joiners'], ['specific', 'exactly', 'clear'], ['measurable', 'number', 'percent', '%', 'figure'], ['achievable', 'realistic', 'possible', 'resources'], ['time', 'deadline', 'months', 'weeks', 'by the end', 'within']], 3, 'Example: “Increase gym membership by 15% (from 400 to 460 members) within six months.” It is specific (membership), measurable (15%), achievable/realistic (small increase given resources) and time-based (six months).', 'Up to 2 marks for a valid objective and up to 4 for explaining the SMART features.', { source: 'Lesson 01 extended response', marks: 6, note: modelNote }),
    q1.multi(5, 'O', 'What does SMART stand for? Select all the words that are part of SMART.', ['Specific', 'Measurable', 'Achievable', 'Realistic', 'Time-based', 'Strategic', 'Simple'], [0, 1, 2, 3, 4], 'SMART = Specific, Measurable, Achievable, Realistic, Time-based.', { source: 'Revision slide 7' }),
    q1.mcq(5, 'G', 'Which of these is a SMART marketing objective?', ['Get more customers', 'Be the best café in town', 'Increase online sales by 12% within nine months', 'Advertise more often'], 2, 'It is specific (online sales), measurable (12%) and time-based (nine months).'),
    q1.mcq(1, 'G', 'Which statement best describes marketing?', ['Another word for advertising', 'Identifying, anticipating and satisfying customer needs profitably', 'Persuading customers to buy whatever the business makes', 'Lowering prices as far as possible'], 1, 'Marketing is about customer needs, and it includes research, product, price, place and promotion.'),
    q1.tf(1, 'G', 'Marketing is exactly the same thing as advertising.', false, 'Marketing is more than advertising: it includes research, product decisions, pricing, distribution and communication.'),
    q1.multi(2, 'G', 'Select the ways marketing helps a business compete and grow.', ['Gain market share', 'Build brand awareness', 'Encourage loyalty and repeat purchases', 'Increase sales revenue and profitability', 'Remove the need for customers'], [0, 1, 2, 3], 'The lesson lists these four benefits.'),
    q1.fill(4, 'G', 'Corporate objectives are the overall ___ of a business.', ['goals', 'goal', 'aims', 'targets'], 'Marketing objectives translate the corporate goals into customer- and market-focused targets.'),
    q1.mcq(4, 'G', 'A business’s corporate goal is to grow profit. Which is a linked marketing objective?', ['Increase online sales', 'Reduce the number of products', 'Close early on Fridays', 'Stop all promotion'], 0, 'This is the lesson’s own example.', { source: 'Lesson 01 slide 7' }),
    q1.mcq(4, 'O', 'Which marketing objective best matches the corporate aim of social responsibility?', ['Increase market share by 5% in a year', 'Offer loyalty vouchers to keep existing customers after a rival opens', 'Cut plastic packaging by 30% within 12 months', 'Raise prices by 8%'], 2, 'Reducing packaging supports social responsibility; growth and survival are the other two aims in the lesson.', { source: 'Lesson 01 slide 7 activity', note: inferred }),
    q1.mcq(5, 'G', 'In SMART, what does the “T” stand for?', ['Targeted', 'Time-based', 'Tactical', 'Typical'], 1, 'Time-based: the objective includes a deadline.'),
    q1.tf(5, 'G', 'A Measurable objective includes a number or indicator.', true, 'Measurable = a number or indicator.'),
    q1.mcq(3, 'G', 'A café’s sales fall after a competitor opens. Which response best uses marketing to make a better decision?', ['Ignore the competitor', 'Research what customers now want and adapt the offer', 'Close the café', 'Stop talking to customers'], 1, 'Marketing helps a business understand changing customer needs and keep ahead of competitors.'),
  ],
}

// ───────────────────────── Lesson 02 · MARKETS, CUSTOMERS & ORIENTATION ─────────────────────────
const q2 = mk('markets-customers-orientation')
export const markets: Topic = {
  id: 'markets-customers-orientation',
  number: 2,
  title: 'Markets, Customers and Orientation',
  summary: 'B2B and B2C, customers and consumers, goods and services, mass and niche markets, and market vs product orientation.',
  icon: 'shopping-cart',
  source: 'Lesson 02 – Markets, Customers and Orientation (Learning Aim A, Topic A.2); Revision slides 3–6, 13, 14, 20',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: ['Identify B2B and B2C markets.', 'Distinguish customers, consumers, goods and services.', 'Compare mass and niche markets.', 'Explain market and product orientation.'] }] },
    { title: 'A market connects buyers and sellers', blocks: [
      { t: 'p', text: 'A **market** is where buyers and sellers exchange goods or services. Markets may be **physical, online, local, national or global**.' },
      { t: 'callout', tone: 'exam', title: 'Revision deck: competitor', text: 'A **competitor** is a business competing against others: one that sells similar products, goods or services and competes for the same customers.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'List three markets you have used this week.' },
    ] },
    { title: 'B2B and B2C', blocks: [
      { t: 'compare',
        left: { title: 'B2B: business to business', items: ['One business sells to another business.', 'Sells to businesses and not directly to the public; products help businesses operate daily.', 'Often uses detailed information and relationship selling.'] },
        right: { title: 'B2C: business to consumer', items: ['A business sells to individual consumers.', 'Products are for the consumer’s own personal use.', 'Often reaches larger audiences.'] } },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Classify: office software, trainers, industrial machinery, streaming subscription.' },
    ] },
    { title: 'The customer may not be the consumer', blocks: [
      { t: 'terms', items: [
        ['Customer', 'Buys and pays for the offering (Revision deck: someone who buys products, goods or services).'],
        ['Consumer', 'Uses the offering (Revision deck: someone who uses the products, goods or services).'],
      ] },
      { t: 'example', title: 'From the lesson', steps: ['A parent buys a cereal that a child eats.', 'Customer: the parent · Consumer: the child'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Create two more examples where customer and consumer are different.' },
    ] },
    { title: 'Markets classified by what is exchanged', blocks: [
      { t: 'list', items: ['**Goods** are physical items; **services** are activities or benefits.', '**Consumer goods** are used by individuals.', '**Capital goods** help businesses produce other goods or services.'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Sort: haircut, delivery van, chocolate bar, factory robot, insurance.' },
    ] },
    { title: 'Mass and niche markets', blocks: [
      { t: 'compare',
        left: { title: 'Mass market', items: ['A large customer group with broadly similar needs.', 'Revision deck: a large market where products are sold for all individuals.', 'Offers scale.'] },
        right: { title: 'Niche market', items: ['A small, specialised group with specific needs.', 'Revision deck: a small market where specialist products are sold to a particular consumer.', 'Can offer focus, loyalty and less direct competition.'] } },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Would vegan hiking boots be mass or niche? Explain.' },
    ] },
    { title: 'Orientation shapes what a business offers', blocks: [
      { t: 'compare',
        left: { title: 'Market orientated', items: ['Researches needs before developing products.', 'Revision deck: identifies the needs and wants of customers, then makes products to meet them.'] },
        right: { title: 'Product orientated', items: ['Focuses on product quality, features or innovation.', 'Revision deck: focuses on areas of expertise and innovates products.'] } },
      { t: 'callout', tone: 'key', title: 'Key point', text: 'Most successful businesses combine **customer insight with strong products**.' },
      { t: 'callout', tone: 'tip', title: 'Debate', text: 'Should innovation lead customers, or should customers lead innovation?' },
    ] },
    { title: 'Marketing, selling and advertising are different', blocks: [
      { t: 'terms', items: [
        ['Marketing', 'Understanding needs and designing the whole offer.'],
        ['Selling', 'Persuading customers to buy.'],
        ['Advertising', 'Paid communication used to promote an offering.'],
      ] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Choose the best model for a start-up with a limited budget and explain why.' },
    ] },
    { title: 'Exam practice and marking guidance', blocks: [
      { t: 'terms', items: [
        ['“State one difference between a customer and a consumer.” (2 marks)', '1 mark for each accurate side of the distinction, supported by a suitable example where relevant.'],
        ['“Explain one benefit of operating in a niche market.” (4 marks)', '1 mark for the benefit plus linked development, e.g. specialised needs → less direct competition → ability to charge a premium.'],
        ['“Analyse how being market orientated could affect the marketing activity of a new clothing business.” (6 marks)', 'Reward chains linking research/customer needs to product, price, promotion or place decisions and the resulting business performance.'],
      ] },
    ] },
  ],
  questions: [
    q2.mcq(1, 'O', 'What does the term ‘competitor’ mean?', ['Someone who buys goods or services', 'A business that competes for the same customers by selling similar products, goods or services', 'Someone who uses a product', 'A business that sells only to other businesses'], 1, 'A competitor is a business competing against others for the same customers.', { source: 'Revision slide 3' }),
    q2.mcq(3, 'O', 'What does the term ‘customer’ mean?', ['Someone who buys products, goods or services', 'Someone who uses products, goods or services', 'A business that sells similar products', 'A business that researches the market'], 0, 'A customer buys; a consumer uses.', { source: 'Revision slide 4' }),
    q2.mcq(3, 'O', 'What does the term ‘consumer’ mean?', ['Someone who buys products, goods or services', 'Someone who uses the products, goods or services', 'A business that sells to other businesses', 'A rival business'], 1, 'A consumer uses the product.', { source: 'Revision slide 5' }),
    q2.short(5, 'O', 'What is a mass market and what is a niche market?', [['mass'], ['large', 'big'], ['niche'], ['small', 'specialist', 'specialised', 'particular']], 4, 'A mass market is a large market where products are sold for all individuals. A niche market is a small market where specialist products are sold to a particular consumer.', 'Mass = large, for all individuals. Niche = small, specialist, particular consumer.', { source: 'Revision slide 6' }),
    q2.short(2, 'O', 'What does B2B stand for and mean?', [['business to business', 'business 2 business', 'b2b'], ['other businesses', 'to business', 'not directly to the public', 'not the public', 'not consumers'], ['operate', 'daily', 'run the business', 'business use']], 2, 'Business 2 Business: selling to businesses and not directly to the public; the products help businesses operate daily.', 'B2B = business to business.', { source: 'Revision slide 13' }),
    q2.short(2, 'O', 'What does B2C stand for and mean?', [['business to consumer', 'business 2 consumer', 'b2c'], ['consumers', 'individuals', 'public', 'customers'], ['personal', 'own use', 'themselves', 'own personal']], 2, 'Business to Consumer: selling to consumers for their own personal use.', 'B2C = business to consumer.', { source: 'Revision slide 14' }),
    q2.short(6, 'O', 'What is market orientated and what is product orientated?', [['market orientated', 'market-orientated'], ['needs', 'wants', 'customers', 'research'], ['product orientated', 'product-orientated'], ['expertise', 'innovat', 'features', 'quality']], 3, 'Market orientated: the business identifies the needs and wants of customers and makes products to meet them. Product orientated: the business focuses on its areas of expertise and innovates products.', 'Market orientated starts with customers; product orientated starts with the product.', { source: 'Revision slide 20' }),
    q2.short(3, 'O', 'State one difference between a customer and a consumer. (2 marks)', [['customer'], ['buys', 'pays', 'purchases'], ['consumer'], ['uses', 'use', 'consumes']], 3, 'A customer buys and pays for the product, whereas a consumer uses it (e.g. a parent buys cereal that a child eats).', 'One mark for each accurate side of the distinction.', { source: 'Lesson 02 exam practice', marks: 2 }),
    q2.short(5, 'O', 'Explain one benefit of operating in a niche market. (4 marks)', [['niche', 'specialist', 'specialised', 'specific needs'], ['less competition', 'fewer competitors', 'little competition', 'direct competition'], ['premium', 'higher price', 'charge more', 'loyal', 'loyalty', 'focus']], 2, 'Specialised needs mean less direct competition, so the business may be able to charge a premium price and build customer loyalty.', 'Benefit plus linked development: specialised needs → less direct competition → premium price.', { source: 'Lesson 02 exam practice', marks: 4, note: modelNote }),
    q2.short(6, 'O', 'Analyse how being market orientated could affect the marketing activity of a new clothing business. (6 marks)', [['research', 'survey', 'customer needs', 'wants'], ['product', 'design', 'range', 'style'], ['price', 'pricing'], ['promotion', 'advertis', 'promote'], ['place', 'distribution', 'channel', 'location'], ['sales', 'profit', 'performance', 'loyal']], 3, 'The business would research customer needs first, then design clothing the customers want (product), set a price they accept, promote it where they look, and choose suitable places/channels. This should lead to higher sales and customer loyalty.', 'Reward chains linking research and customer needs to the 4 Ps and business performance.', { source: 'Lesson 02 extended response', marks: 6, note: modelNote }),
    q2.multi(2, 'O', 'Classify each as B2C (select the B2C items).', ['Office software', 'Trainers', 'Industrial machinery', 'Streaming subscription'], [1, 3], 'Trainers and streaming subscriptions are sold to individual consumers. Industrial machinery is B2B; office software is mainly bought by businesses.', { source: 'Lesson 02 slide 5 activity', note: inferred + ' Office software can be sold to consumers too, but the lesson’s B2B examples point to business use.' }),
    q2.multi(4, 'O', 'Sort these: which are SERVICES? (Select all that apply)', ['Haircut', 'Delivery van', 'Chocolate bar', 'Factory robot', 'Insurance'], [0, 4], 'A haircut and insurance are services. The chocolate bar is a consumer good; the delivery van and factory robot are capital goods.', { source: 'Lesson 02 slide 7 activity', note: inferred }),
    q2.multi(4, 'O', 'Sort these: which are CAPITAL GOODS? (Select all that apply)', ['Haircut', 'Delivery van', 'Chocolate bar', 'Factory robot', 'Insurance'], [1, 3], 'Capital goods help businesses produce other goods or services.', { source: 'Lesson 02 slide 7 activity', note: inferred }),
    q2.mcq(5, 'O', 'Would vegan hiking boots be a mass or niche market?', ['Niche: a small, specialised group with specific needs', 'Mass: a large group with broadly similar needs', 'Neither', 'B2B only'], 0, 'Vegan hiking boots appeal to a small specialised group.', { source: 'Lesson 02 slide 8 activity', note: inferred }),
    q2.tf(3, 'G', 'The customer and the consumer are always the same person.', false, 'The customer may not be the consumer, e.g. a parent buys cereal that a child eats.'),
    q2.fill(7, 'G', 'Persuading customers to buy is called ___, whereas marketing is about understanding needs and designing the whole offer.', ['selling'], 'Selling = persuading customers to buy.'),
    q2.mcq(7, 'G', 'Paid communication used to promote an offering is…', ['Marketing', 'Selling', 'Advertising', 'Research'], 2, 'Advertising is paid communication.'),
    q2.mcq(5, 'G', 'Which is an advantage of a niche market?', ['Less direct competition', 'A very large customer group', 'Always lower prices', 'No need for research'], 0, 'Niche markets can offer focus, loyalty and less direct competition.'),
  ],
}

// ───────────────────────── Lesson 04 · TYPES & SOURCES OF MARKET RESEARCH ─────────────────────────
const q3 = mk('market-research-types')
export const research: Topic = {
  id: 'market-research-types',
  number: 4,
  title: 'Types and Sources of Market Research',
  summary: 'Primary and secondary research, quantitative and qualitative data, methods, and internal and external data.',
  icon: 'microscope',
  source: 'Lesson 04 – Types and Sources of Market Research; Revision slides 15–17',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: ['Distinguish primary and secondary research.', 'Compare quantitative and qualitative data.', 'Select suitable collection methods.', 'Explain internal and external data.'] }] },
    { title: 'Market research reduces uncertainty', blocks: [
      { t: 'p', text: '**Market research** gathers and analyses information about customers, competitors and markets.' },
      { t: 'p', text: 'It supports decisions, but it **does not guarantee success**.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'What would you want to know before opening a dessert shop?' },
    ] },
    { title: 'Primary research', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: 'Primary research is **collected first-hand for a current purpose**.' },
      { t: 'terms', items: [
        ['Questionnaires', 'Can reach many people.'],
        ['Interviews', 'Can explore reasons in depth.'],
        ['Focus groups', 'Reveal reactions and discussion.'],
        ['Observation', 'Records actual behaviour.'],
      ] },
      { t: 'callout', tone: 'exam', title: 'Revision deck list of primary methods', text: 'Questionnaires · focus groups · surveys · interviews.' },
    ] },
    { title: 'Secondary research', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: 'Secondary research uses **existing information**.' },
      { t: 'list', items: ['Government statistics and industry reports', 'Competitor websites and published accounts', 'News articles and trade publications', 'Internal sales records and customer data'] },
      { t: 'callout', tone: 'exam', title: 'Revision deck list of secondary sources', text: 'Books · internet · journals · newspapers · articles.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Why might secondary research be a useful starting point?' },
    ] },
    { title: 'Quantitative and qualitative data', blocks: [
      { t: 'compare',
        left: { title: 'Quantitative: shows how much', items: ['Numerical results reveal patterns and comparisons.', 'Useful for percentages, averages, market size and trend charts.', 'Large samples can improve representativeness.', 'Revision deck: involves numeric figures that can be analysed.'] },
        right: { title: 'Qualitative: explains why', items: ['Words, opinions and explanations reveal motivations.', 'Useful for exploring feelings, preferences and reactions.', 'Usually collected through open questions, interviews and focus groups.', 'Revision deck: explains people’s views, thoughts and feelings.'] } },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Turn “customers like the product” into a quantitative question. Write one open question about a new mobile phone.' },
    ] },
    { title: 'Good research often combines methods', blocks: [
      { t: 'list', items: ['**Secondary** data frames the market.', '**Quantitative** data measures the pattern.', '**Qualitative** data explains the pattern.', '**Triangulation** checks whether evidence points in the same direction.'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Design a three-method research plan for a new trainer brand.' },
    ] },
    { title: 'Data can come from inside or outside', blocks: [
      { t: 'compare',
        left: { title: 'Internal data', items: ['Sales', 'Complaints', 'Website analytics', 'Loyalty records'] },
        right: { title: 'External data', items: ['Competitors', 'Government', 'Market reports', 'Social trends'] } },
      { t: 'p', text: 'Both can support **benchmarking, SWOT and PESTLE**.' },
    ] },
    { title: 'Exam practice and marking guidance', blocks: [
      { t: 'terms', items: [
        ['“State one difference between primary and secondary research.” (2 marks)', 'Award for a clear contrast: collected first-hand for a purpose versus pre-existing information.'],
        ['“Explain one advantage of qualitative research for a business.” (4 marks)', 'Reward depth: detailed reasons/motivations → improved understanding → better adapted marketing decision.'],
        ['“Recommend two research methods for a café planning a new product. Justify your choices.” (6 marks)', 'Up to 2 marks for appropriate methods and up to 4 marks for contextual justification, limitations or combination.'],
      ] },
    ] },
  ],
  questions: [
    q3.short(4, 'O', 'What is the difference between qualitative and quantitative research?', [['qualitative'], ['views', 'thoughts', 'feelings', 'opinions', 'why', 'explains'], ['quantitative'], ['numeric', 'numbers', 'figures', 'numerical', 'how much', 'analysed']], 3, 'Qualitative explains people’s views, thoughts and feelings. Quantitative involves numeric figures that can be analysed.', 'Qualitative = words/opinions (why). Quantitative = numbers (how much).', { source: 'Revision slide 15' }),
    q3.multi(2, 'O', 'List the ways to collect PRIMARY research. (Select all that apply)', ['Questionnaires', 'Focus groups', 'Surveys', 'Interviews', 'Newspapers', 'Books'], [0, 1, 2, 3], 'Newspapers and books are secondary sources.', { source: 'Revision slide 16' }),
    q3.multi(3, 'O', 'List the ways to collect SECONDARY research. (Select all that apply)', ['Books', 'Internet', 'Journals', 'Newspapers', 'Articles', 'Focus groups'], [0, 1, 2, 3, 4], 'Focus groups are primary research.', { source: 'Revision slide 17' }),
    q3.short(2, 'O', 'State one difference between primary and secondary research. (2 marks)', [['primary'], ['first-hand', 'first hand', 'collected', 'yourself', 'current purpose', 'new'], ['secondary'], ['existing', 'already', 'pre-existing', 'published', 'previously']], 3, 'Primary research is collected first-hand for a current purpose, whereas secondary research uses information that already exists.', 'First-hand vs pre-existing.', { source: 'Lesson 04 exam practice', marks: 2 }),
    q3.short(4, 'O', 'Explain one advantage of qualitative research for a business. (4 marks)', [['reasons', 'motivation', 'why', 'opinions', 'feelings', 'detailed', 'in depth', 'in-depth'], ['understand', 'understanding', 'insight'], ['decision', 'marketing', 'adapt', 'product', 'improve']], 2, 'Qualitative research gives detailed reasons and motivations, which improves the business’s understanding of customers, so it can adapt its marketing decisions (e.g. product or promotion) to fit them.', 'Detailed reasons → better understanding → better adapted marketing decision.', { source: 'Lesson 04 exam practice', marks: 4, note: modelNote }),
    q3.short(5, 'O', 'Recommend two research methods for a café planning a new product. Justify your choices. (6 marks)', [['questionnaire', 'survey', 'focus group', 'interview', 'observation', 'taste test'], ['secondary', 'competitor', 'report', 'statistics'], ['many people', 'large', 'reasons', 'reactions', 'depth', 'cheap', 'quick', 'cost'], ['limitation', 'bias', 'combine', 'together', 'triangulat']], 3, 'E.g. a questionnaire to measure how many customers would buy it (quantitative, reaches many people) and a focus group to find out why customers like or dislike the flavours (qualitative). Combined, they show both the pattern and the reasons, although small groups may not be representative.', 'Two appropriate methods, justified for the café, plus limitations or combination.', { source: 'Lesson 04 extended response', marks: 6, note: modelNote }),
    q3.mcq(2, 'G', 'Which is an example of primary research?', ['A government statistics report', 'A questionnaire to 100 customers', 'A competitor’s published accounts', 'A trade magazine article'], 1, 'Primary research is collected first-hand, e.g. questionnaires.'),
    q3.mcq(2, 'G', 'Which method records actual behaviour?', ['Questionnaire', 'Interview', 'Observation', 'Government report'], 2, 'Observation records actual behaviour.'),
    q3.mcq(2, 'G', 'Which method can explore reasons in depth?', ['Interviews', 'Industry reports', 'Sales records', 'Large online polls'], 0, 'Interviews can explore reasons in depth.'),
    q3.tf(1, 'G', 'Market research guarantees a business will be successful.', false, 'It supports decisions but does not guarantee success.'),
    q3.mcq(4, 'G', 'Which is a quantitative question?', ['Why do you like this product?', 'How would you describe the flavour?', 'On a scale of 1–5, how satisfied are you?', 'What would you change?'], 2, 'A rating scale gives numerical results.'),
    q3.fill(5, 'G', 'Checking whether evidence from different methods points in the same direction is called ___.', ['triangulation'], 'Triangulation checks whether evidence points in the same direction.'),
    q3.multi(6, 'O', 'Which are INTERNAL data? (Select all that apply)', ['Sales', 'Complaints', 'Government statistics', 'Website analytics', 'Loyalty records', 'Competitor websites'], [0, 1, 3, 4], 'Government statistics and competitor information are external.', { source: 'Lesson 04 slide 10' }),
    q3.multi(6, 'G', 'Which are EXTERNAL data? (Select all that apply)', ['Competitors', 'Government', 'Market reports', 'Social trends', 'Sales records'], [0, 1, 2, 3], 'Sales records are internal data.'),
    q3.mcq(3, 'G', 'Secondary research is…', ['Collected first-hand for a current purpose', 'Information that already exists', 'Always more expensive than primary', 'Only about competitors'], 1, 'Secondary research uses existing information.'),
    q3.mcq(5, 'G', 'Which research combination does the lesson say often works best?', ['Only one method', 'Secondary to frame, quantitative to measure, qualitative to explain', 'Only observation', 'No research'], 1, 'Good research often combines methods.'),
  ],
}
