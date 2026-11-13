import type { Topic } from '../../types'
import { mk } from '../helpers'

const inferred = 'The lesson deck gives no answer key for this activity; the answer shown was worked out from the lesson content.'
const modelNote = 'The model answer was written from the lesson’s marking guidance. Compare it with your own answer for the key points.'

// ───────────────────────── Lesson 07 · MARKETING MIX: PRODUCT & PRICE ─────────────────────────
const q6 = mk('mix-product-price')
export const productPrice: Topic = {
  id: 'mix-product-price',
  number: 7,
  title: 'The Marketing Mix: Product and Price',
  summary: 'The 4 Ps, core/actual/augmented products, USPs, the product life cycle, portfolios, pricing strategies, elasticity and branding.',
  icon: '🏷️',
  source: 'Lesson 07 – The Marketing Mix: Product and Price; Revision slides 11, 12, 23, 24',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: ['Explain core and augmented products and USPs.', 'Apply the product life cycle.', 'Compare pricing strategies.', 'Explain elasticity of demand.'] }] },
    { title: 'The marketing mix must work as one offer', blocks: [
      { t: 'callout', tone: 'key', title: 'The 4 Ps', text: '**Product · Price · Place · Promotion** (Revision deck: Place, Price, Promotion, Product).' },
      { t: 'p', text: 'Each decision should fit the **target market** and support the **same positioning**.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Choose one product. What message does its price communicate?' },
    ] },
    { title: 'Core, actual and augmented product', blocks: [
      { t: 'terms', items: [
        ['Core product', 'The main benefit or need satisfied.'],
        ['Actual product', 'Features, design, quality and branding.'],
        ['Augmented product', 'Extras such as delivery, warranty or support.'],
      ] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Analyse the core and augmented product of a smartphone.' },
    ] },
    { title: 'A USP gives customers a reason to choose', blocks: [
      { t: 'callout', tone: 'key', title: 'Definition', text: 'A **Unique Selling Point (USP)** is a feature or benefit that clearly **differentiates** an offering from competitors.' },
      { t: 'p', text: 'A strong USP should be **relevant, believable and difficult to copy**.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Write a USP for an independent bakery.' },
    ] },
    { title: 'Products move through a life cycle', blocks: [
      { t: 'chart', id: 'plc', caption: 'The product life cycle (sales over time)' },
      { t: 'terms', items: [
        ['Development', 'Investment before sales.'],
        ['Introduction', 'Awareness building and low sales.'],
        ['Growth', 'Rapid sales and new competitors.'],
        ['Maturity', 'Slower growth and intense competition.'],
        ['Decline', 'Falling demand or replacement.'],
      ] },
      { t: 'callout', tone: 'warn', title: 'Check with your teacher', text: 'The Revision deck lists the stages as Development, Growth, Maturity, **Saturation**, Decline (without Introduction). Lesson 07 lists Development, **Introduction**, Growth, Maturity, Decline. Learn the version your teacher uses in class.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Match a marketing action to each stage.' },
    ] },
    { title: 'A balanced portfolio spreads risk', blocks: [
      { t: 'list', items: ['A **product portfolio** is the range of products owned by a business.', 'Different products may be at **different life-cycle stages**.', 'Businesses must decide where to **invest, maintain, extend or withdraw**.'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Why is relying on one mature product risky?' },
    ] },
    { title: 'Pricing strategies', blocks: [
      { t: 'table', left: true, head: ['Strategy', 'What it means'], rows: [
        ['Cost-plus / mark-up', 'Cost plus a profit margin'],
        ['Competitive pricing / price taking', 'Follow the market'],
        ['Skimming', 'High launch price'],
        ['Penetration', 'Low launch price to build share'],
      ] },
      { t: 'callout', tone: 'exam', title: 'Revision deck: list all the pricing strategies', text: 'Cost plus · mark-up · competitive · price taking · skimming · penetration.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Choose a strategy for a new games console and justify it.' },
    ] },
    { title: 'Every pricing strategy has trade-offs', blocks: [
      { t: 'table', left: true, head: ['Strategy', 'Trade-off'], rows: [
        ['Skimming', 'Can recover costs but restrict demand'],
        ['Penetration', 'Can grow share but reduce margin'],
        ['Cost-plus', 'Simple but may ignore customer value'],
        ['Competitive pricing', 'Realistic but can trigger price pressure'],
      ] },
    ] },
    { title: 'Elasticity shows how demand responds to price', blocks: [
      { t: 'compare', left: { title: 'Elastic demand', items: ['Changes strongly when price changes.'] }, right: { title: 'Inelastic demand', items: ['Changes less when price changes.'] } },
      { t: 'p', text: 'Elasticity is affected by **substitutes, necessity, brand loyalty and spending share**.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Which is likely more elastic: cinema tickets or essential medicine? Why?' },
    ] },
    { title: 'Dimensions of a brand', blocks: [
      { t: 'callout', tone: 'exam', title: 'Revision deck: what are the dimensions of a brand?', text: '**Colour · image · symbols · logo · celebrity endorsement.**' },
    ] },
    { title: 'Exam practice and marking guidance', blocks: [
      { t: 'terms', items: [
        ['“Define ‘Unique Selling Point’.” (2 marks)', 'A distinct feature/benefit that differentiates the product from competitors.'],
        ['“Explain one advantage of penetration pricing.” (4 marks)', 'Reward chain: low launch price → encourages trial/sales → builds share/awareness; accept limitations when relevant.'],
        ['“Evaluate whether price skimming is suitable for a new technology product.” (8 marks)', 'Reward application to innovation, demand, competition, costs and brand; balance benefits/risks and reach a supported conclusion.'],
      ] },
    ] },
  ],
  questions: [
    q6.multi(1, 'O', 'What are the 4 P’s in the marketing mix? Select the four.', ['Place', 'Price', 'Promotion', 'Product', 'People', 'Profit'], [0, 1, 2, 3], 'The 4 Ps are product, price, place and promotion.', { source: 'Revision slide 11' }),
    q6.multi(6, 'O', 'List all the pricing strategies. (Select all that apply)', ['Cost plus', 'Mark-up', 'Competitive', 'Price taking', 'Skimming', 'Penetration', 'Loss leading'], [0, 1, 2, 3, 4, 5], 'The Revision deck lists cost plus, mark-up, competitive, price taking, skimming and penetration.', { source: 'Revision slide 12' }),
    q6.multi(4, 'O', 'Which stages make up the product life cycle? (Revision deck version)', ['Development', 'Growth', 'Maturity', 'Saturation', 'Decline', 'Recruitment'], [0, 1, 2, 3, 4], 'The Revision deck lists development, growth, maturity, saturation and decline. Lesson 07 also names an Introduction stage.', { source: 'Revision slide 23', note: 'The Revision deck and Lesson 07 list slightly different stages (Saturation vs Introduction). The answer follows the Revision deck.' }),
    q6.multi(9, 'O', 'What are the dimensions of a brand? (Select all that apply)', ['Colour', 'Image', 'Symbols', 'Logo', 'Celebrity endorsement', 'Delivery time'], [0, 1, 2, 3, 4], 'Brand dimensions: colour, image, symbols, logo, celebrity endorsement.', { source: 'Revision slide 24' }),
    q6.short(3, 'O', 'Define ‘Unique Selling Point’. (2 marks)', [['distinct', 'unique', 'feature', 'benefit'], ['differentiat', 'different', 'competitors', 'stand out', 'sets apart', 'reason to choose']], 2, 'A distinct feature or benefit that differentiates the product from competitors.', 'A distinct feature/benefit that differentiates the offering.', { source: 'Lesson 07 exam practice', marks: 2 }),
    q6.short(6, 'O', 'Explain one advantage of penetration pricing. (4 marks)', [['low', 'lower', 'cheap', 'launch price'], ['trial', 'try', 'sales', 'attract', 'encourage', 'customers'], ['share', 'awareness', 'brand', 'volume', 'build']], 2, 'A low launch price encourages customers to try the product and increases sales, which helps the business build market share and brand awareness quickly.', 'Low launch price → encourages trial/sales → builds share/awareness.', { source: 'Lesson 07 exam practice', marks: 4, note: modelNote }),
    q6.short(6, 'O', 'Evaluate whether price skimming is suitable for a new technology product. (8 marks)', [['high', 'launch price', 'premium'], ['innovat', 'new technology', 'early adopters', 'enthusiast', 'unique'], ['recover', 'costs', 'development', 'profit', 'margin'], ['demand', 'restrict', 'fewer customers', 'limit'], ['competit', 'copy', 'rivals', 'prices fall'], ['conclusion', 'overall', 'judgement', 'suitable', 'depends', 'therefore']], 4, 'Skimming is often suitable because innovative technology may have few competitors and early adopters will pay a high launch price, helping recover development costs and protect a premium brand. However, high prices restrict demand and attract competitors who may launch cheaper alternatives. Overall it is suitable if the product is genuinely unique and protected, otherwise penetration may be better.', 'Balance benefits and risks, apply to innovation, demand, competition, costs and brand, then conclude.', { source: 'Lesson 07 extended response', marks: 8, note: modelNote }),
    q6.mcq(2, 'O', 'Which part of a smartphone is its AUGMENTED product?', ['Making calls and getting online (the core benefit)', 'Its screen size and brand', 'Free delivery and a 2-year warranty', 'Its colour'], 2, 'Augmented = extras such as delivery, warranty or support.', { source: 'Lesson 07 slide 5 activity', note: inferred }),
    q6.mcq(2, 'G', 'The “core product” is…', ['The main benefit or need satisfied', 'The extras like warranty', 'The logo only', 'The price'], 0, 'The core product is the main benefit or need.'),
    q6.mcq(3, 'G', 'A strong USP should be…', ['Relevant, believable and difficult to copy', 'Cheap and easy to copy', 'The same as competitors’', 'Hidden from customers'], 0, 'The lesson describes these three qualities.'),
    q6.mcq(4, 'G', 'Which life-cycle stage has rapid sales and new competitors?', ['Development', 'Introduction', 'Growth', 'Decline'], 2, 'In growth, sales rise rapidly and new competitors appear.'),
    q6.mcq(4, 'G', 'Which stage involves investment before any sales?', ['Development', 'Growth', 'Maturity', 'Decline'], 0, 'Development = investment before sales.'),
    q6.mcq(4, 'G', 'Slower growth and intense competition happen in which stage?', ['Introduction', 'Growth', 'Maturity', 'Development'], 2, 'Maturity = slower growth and intense competition.'),
    q6.mcq(6, 'G', 'A business sets a high launch price for a new gadget. Which strategy is this?', ['Penetration', 'Skimming', 'Cost-plus', 'Price taking'], 1, 'Skimming = high launch price.'),
    q6.mcq(6, 'G', 'A business adds a 30% profit margin on top of its costs. Which strategy is this?', ['Cost-plus / mark-up', 'Penetration', 'Skimming', 'Competitive pricing'], 0, 'Cost-plus = cost plus a profit margin.'),
    q6.mcq(6, 'G', 'Which strategy sets a low launch price to build market share?', ['Skimming', 'Penetration', 'Cost-plus', 'Price taking'], 1, 'Penetration builds share but can reduce margin.'),
    q6.mcq(7, 'G', 'What is a trade-off of skimming?', ['It can restrict demand', 'It always lowers costs', 'It ignores profit', 'It cannot recover costs'], 0, 'Skimming can recover costs but restrict demand.'),
    q6.mcq(8, 'O', 'Which is likely to be MORE elastic: cinema tickets or essential medicine?', ['Cinema tickets: there are substitutes and it is not a necessity', 'Essential medicine: people can easily go without', 'They are identical', 'Neither can change with price'], 0, 'Necessities with few substitutes tend to be inelastic.', { source: 'Lesson 07 slide 11 activity', note: inferred }),
    q6.tf(5, 'G', 'A business relying on one mature product is a balanced portfolio.', false, 'A balanced portfolio spreads risk across products at different life-cycle stages.'),
    q6.fill(1, 'G', 'The 4 Ps are product, price, place and ___.', ['promotion'], 'Product, price, place, promotion.'),
  ],
}

// ───────────────────────── Lesson 08 · PLACE, PROMOTION & INFLUENCES ─────────────────────────
const q7 = mk('mix-place-promotion')
export const placePromotion: Topic = {
  id: 'mix-place-promotion',
  number: 8,
  title: 'Place, Promotion and Marketing Influences',
  summary: 'Distribution channels, location, the promotional mix, digital promotion, above and below the line, ecommerce and ebusiness, and influences on the mix.',
  icon: '🚚',
  source: 'Lesson 08 – Place, Promotion and Marketing Influences (Learning Aim C, Topics C.1–C.2); Revision slides 21, 22',
  slides: [
    { title: 'Learning objectives', blocks: [{ t: 'list', items: ['Explain place and distribution decisions.', 'Compare promotional methods.', 'Distinguish ecommerce and ebusiness.', 'Evaluate influences and consistency across the mix.'] }] },
    { title: 'Place makes the offering available', blocks: [
      { t: 'list', items: ['Place includes **channels, location and availability**.', 'The best route balances customer **convenience, control, speed and cost**.'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'How many routes can a product take from producer to customer?' },
    ] },
    { title: 'Distribution channels vary by business', blocks: [
      { t: 'table', left: true, head: ['Channel', 'Route'], rows: [
        ['Direct', 'Producer → customer'],
        ['Retailer channel', 'Producer → retailer → customer'],
        ['Wholesaler channel', 'Producer → wholesaler → retailer → customer'],
        ['Digital platforms', 'Connect sellers and buyers'],
      ] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Recommend a channel for handmade jewellery and for soft drinks.' },
    ] },
    { title: 'Physical location still matters', blocks: [
      { t: 'list', items: ['Footfall and accessibility', 'Rent, labour and competition', 'Parking and transport links', 'Fit with the target market and brand'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Select the best location for a premium café and justify it.' },
    ] },
    { title: 'Promotion combines methods and channels', blocks: [
      { t: 'list', items: ['Advertising, sales promotion, public relations, personal selling and direct marketing', 'The **promotional budget** limits choices', 'Channel choice should match the **target audience and objective**'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Create a low-budget promotional mix for a local start-up.' },
    ] },
    { title: 'Digital promotion can spread quickly', blocks: [
      { t: 'terms', items: [
        ['Social media', 'Enables interaction and targeting.'],
        ['Viral marketing', 'Depends on sharing.'],
        ['Guerrilla advertising', 'Uses unexpected, attention-grabbing ideas.'],
      ] },
      { t: 'callout', tone: 'warn', title: 'Risks', text: 'Loss of control and negative reactions.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Design a safe guerrilla idea for a college event.' },
    ] },
    { title: 'Above and below the line', blocks: [
      { t: 'compare',
        left: { title: 'Above the line', items: ['Reaches broad audiences through mass media.', 'Examples in the lesson activity: TV advert, billboard.'] },
        right: { title: 'Below the line', items: ['Targets specific groups more directly.', 'Revision deck: communicates directly/personally with the target market; aimed at smaller groups or segments rather than mass audiences.', 'Examples in the lesson activity: email offer, loyalty voucher.'] } },
      { t: 'p', text: 'Many campaigns **combine both** approaches.' },
      { t: 'callout', tone: 'exam', title: 'Revision deck: examples of below the line promotion', text: 'Advertising · trade shows/exhibitions · personal selling · direct mail · catalogues · sponsorship.' },
      { t: 'callout', tone: 'warn', title: 'Check with your teacher', text: 'The Revision deck lists “advertising” as a below-the-line example, while the lesson treats **mass-media** advertising (TV, billboards) as above the line. Ask your teacher which kinds of advertising are meant.' },
    ] },
    { title: 'Ecommerce is part of ebusiness', blocks: [
      { t: 'compare',
        left: { title: 'Ecommerce', items: ['Buying and selling online.'] },
        right: { title: 'Ebusiness', items: ['Wider digital processes such as stock control, customer service and supplier links.'] } },
      { t: 'p', text: 'Benefits include **reach, convenience, data and potential efficiency**.' },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Explain one benefit and one risk of moving sales online.' },
    ] },
    { title: 'External influences can reshape every P', blocks: [
      { t: 'list', items: ['Technology, economic and political change', 'Cultural and social expectations', 'Legal requirements and ethical concerns', 'Environmental pressures'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Choose one influence and explain its effect on all four Ps.' },
    ] },
    { title: 'Consistency makes the mix credible', blocks: [
      { t: 'list', items: ['Product, price, place and promotion should support the **same target market and positioning**.', 'Effectiveness is judged against **SMART objectives and evidence**.'] },
      { t: 'callout', tone: 'tip', title: 'Think about it', text: 'Audit a budget airline’s mix: where is it consistent?' },
    ] },
    { title: 'Exam practice and marking guidance', blocks: [
      { t: 'terms', items: [
        ['“State one difference between ecommerce and ebusiness.” (2 marks)', 'Ecommerce concerns online transactions; ebusiness includes wider digital business processes.'],
        ['“Explain one factor affecting a business’s choice of distribution channel.” (4 marks)', 'Reward factor → channel decision → impact, applied to size/type, customer, cost, speed or control.'],
        ['“Evaluate the effectiveness of the marketing mix for a new environmentally friendly cleaning product.” (8 marks)', 'Reward integrated analysis of all 4 Ps, target market, environmental/ethical influences, SMART evidence and a justified judgement.'],
      ] },
    ] },
  ],
  questions: [
    q7.short(6, 'O', 'What does the term ‘below the line promotion’ mean?', [['directly', 'personally', 'direct'], ['target market', 'specific', 'segment', 'smaller groups', 'smaller group'], ['not mass', 'rather than mass', 'mass audience', 'mass audiences', 'mass media']], 2, 'Marketing activities used to communicate directly/personally with the target market, aimed at smaller groups or specific market segments rather than mass audiences.', 'Direct, targeted at smaller groups, not mass media.', { source: 'Revision slide 21' }),
    q7.multi(6, 'O', 'Which of these are examples of below the line promotion in the Revision deck? (Select all that apply)', ['Trade shows / exhibitions', 'Personal selling', 'Direct mail', 'Catalogues', 'Sponsorship', 'Giving no promotion'], [0, 1, 2, 3, 4], 'The Revision deck also lists advertising, but the lesson treats mass-media advertising as above the line.', { source: 'Revision slide 22', note: 'The Revision deck lists “advertising” as an example as well; it is left out of the options because the lesson places mass-media advertising above the line.' }),
    q7.multi(6, 'O', 'Classify: which are ABOVE the line? (TV advert, email offer, billboard, loyalty voucher)', ['TV advert', 'Email offer', 'Billboard', 'Loyalty voucher'], [0, 2], 'TV adverts and billboards use mass media (above the line). Email offers and loyalty vouchers target specific groups (below the line).', { source: 'Lesson 08 slide 9 activity', note: inferred }),
    q7.short(7, 'O', 'State one difference between ecommerce and ebusiness. (2 marks)', [['ecommerce', 'e-commerce'], ['online', 'transactions', 'buying and selling', 'selling online'], ['ebusiness', 'e-business'], ['wider', 'stock control', 'customer service', 'supplier', 'digital processes']], 3, 'Ecommerce is buying and selling online (online transactions); ebusiness includes wider digital business processes such as stock control, customer service and supplier links.', 'Ecommerce = online transactions. Ebusiness = wider digital processes.', { source: 'Lesson 08 exam practice', marks: 2 }),
    q7.short(1, 'O', 'Explain one factor affecting a business’s choice of distribution channel. (4 marks)', [['size', 'type of business', 'customer', 'cost', 'speed', 'control', 'convenience'], ['direct', 'retailer', 'wholesaler', 'online', 'channel', 'sell'], ['impact', 'because', 'therefore', 'so', 'result', 'allows', 'means']], 2, 'E.g. cost: a small business with a limited budget may sell direct online because this avoids retailer or wholesaler margins, so it keeps more profit per sale, although it must handle delivery itself.', 'Factor → channel decision → impact.', { source: 'Lesson 08 exam practice', marks: 4, note: modelNote }),
    q7.short(9, 'O', 'Evaluate the effectiveness of the marketing mix for a new environmentally friendly cleaning product. (8 marks)', [['product', 'refill', 'eco'], ['price', 'premium', 'pricing'], ['place', 'supermarket', 'online', 'distribution'], ['promotion', 'social media', 'advertis', 'promote'], ['environmental', 'ethical', 'green', 'sustainab'], ['smart', 'objective', 'sales figures', 'evidence', 'measure'], ['target market', 'consistent', 'positioning'], ['overall', 'judgement', 'conclusion', 'therefore']], 5, 'The mix is likely to be effective if all four Ps fit the environmentally aware target market: an eco-friendly product with recyclable packaging, a premium price justified by the benefit, availability online and in supermarkets, and social media promotion. Environmental and ethical influences support this positioning, but a premium price may limit sales, so effectiveness should be judged against SMART objectives and evidence such as sales and market share. Overall it is effective if the four Ps are consistent.', 'Integrated analysis of all 4 Ps, target market, influences, SMART evidence and a supported judgement.', { source: 'Lesson 08 extended response', marks: 8, note: modelNote }),
    q7.mcq(2, 'G', 'Which channel is direct?', ['Producer → customer', 'Producer → retailer → customer', 'Producer → wholesaler → retailer → customer', 'Producer → wholesaler → customer'], 0, 'Direct = producer sells straight to the customer.'),
    q7.mcq(2, 'G', 'Which route is the wholesaler channel?', ['Producer → customer', 'Producer → retailer → customer', 'Producer → wholesaler → retailer → customer', 'Customer → producer'], 2, 'The wholesaler channel has two stages in the middle.'),
    q7.mcq(2, 'O', 'Which channel is most suitable for handmade jewellery?', ['A direct/online sale by the maker', 'Long wholesaler chains to supermarkets', 'Vending machines everywhere', 'No channel'], 0, 'Small-batch handmade goods suit direct or digital platform selling; mass-produced soft drinks suit retailer/wholesaler chains.', { source: 'Lesson 08 slide 5 activity', note: inferred }),
    q7.multi(3, 'G', 'Which factors matter when choosing a physical location? (Select all that apply)', ['Footfall and accessibility', 'Rent, labour and competition', 'Parking and transport links', 'Fit with the target market and brand'], [0, 1, 2, 3], 'The lesson lists all four.'),
    q7.multi(4, 'G', 'Select the promotional methods named in the lesson.', ['Advertising', 'Sales promotion', 'Public relations', 'Personal selling', 'Direct marketing', 'Wholesaling'], [0, 1, 2, 3, 4], 'Wholesaling is a distribution channel, not promotion.'),
    q7.mcq(5, 'G', 'Which promotion depends on customers sharing the message?', ['Viral marketing', 'Cost-plus pricing', 'Wholesaling', 'Benchmarking'], 0, 'Viral marketing depends on sharing.'),
    q7.mcq(5, 'G', 'Which uses unexpected, attention-grabbing ideas?', ['Guerrilla advertising', 'Direct mail', 'Penetration pricing', 'SWOT'], 0, 'Guerrilla advertising uses unexpected ideas.'),
    q7.mcq(6, 'G', 'Which reaches broad audiences through mass media?', ['Above the line', 'Below the line', 'Direct mail', 'Personal selling'], 0, 'Above the line = mass media.'),
    q7.tf(7, 'G', 'Ecommerce includes wider digital processes such as stock control and supplier links.', false, 'That describes ebusiness. Ecommerce is buying and selling online.'),
    q7.multi(8, 'G', 'Select the external influences that can reshape the mix.', ['Technology', 'Economic and political change', 'Social expectations', 'Legal and ethical concerns', 'Environmental pressures'], [0, 1, 2, 3, 4], 'The lesson lists all of these.'),
    q7.mcq(9, 'G', 'Effectiveness of the marketing mix is judged against…', ['SMART objectives and evidence', 'The business owner’s mood', 'Competitors’ logos', 'Nothing'], 0, 'Consistency and effectiveness are judged against SMART objectives and evidence.'),
    q7.fill(9, 'G', 'The four Ps should support the same target market and ___.', ['positioning'], 'Consistent positioning makes the mix credible.'),
  ],
}
