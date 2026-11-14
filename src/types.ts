export type ChartId = 'breakeven' | 'candles' | 'mark-be' | 'mark-tc' | 'mark-loss' | 'mark-fixed' | 'safety' | 'plc'

// ---------- Learning slide content ----------
export type Block =
  | { t: 'p'; text: string }
  | { t: 'list'; items: string[]; ordered?: boolean }
  | { t: 'formula'; name: string; formula: string; vars?: [string, string][] }
  | { t: 'example'; title?: string; steps: string[]; result?: string }
  | { t: 'table'; head: string[]; rows: string[][]; caption?: string; boldRows?: number[]; left?: boolean }
  | { t: 'callout'; tone: 'key' | 'tip' | 'warn' | 'exam'; title?: string; text: string }
  | { t: 'terms'; items: [string, string][] }
  | { t: 'compare'; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { t: 'chart'; id: ChartId; caption?: string }

export interface Slide {
  title: string
  blocks: Block[]
}

// ---------- Questions ----------
export type Origin = 'original' | 'generated'

interface QBase {
  id: string
  topicId: string
  /** index of the learning slide that contains the information needed to answer */
  slide: number
  origin: Origin
  /** where an original question came from, e.g. "Lesson 05 Q4" */
  source?: string
  prompt: string
  /** small table shown with the prompt (income statements etc.) */
  table?: { head: string[]; rows: string[][]; boldRows?: number[] }
  chart?: ChartId
  explanation: string
  /** formula-test metadata */
  fid?: string
  skill?: 'recall' | 'apply'
  marks?: number
  /** honest note shown on screen where the source material needed correcting or the answer was inferred */
  note?: string
}
export interface QMcq extends QBase { type: 'mcq'; options: string[]; answer: number }
export interface QMulti extends QBase { type: 'multi'; options: string[]; answers: number[] }
export interface QTf extends QBase { type: 'tf'; answer: boolean }
export interface QFill extends QBase { type: 'fill'; /** use ___ as the blank */ accepted: string[] }
export interface QShort extends QBase {
  type: 'short'
  /** each group = one idea; any synonym in a group satisfies it */
  groups: string[][]
  need: number
  modelAnswer: string
}
export interface QCalc extends QBase { type: 'calc'; answer: number; alsoAccept?: number[]; unit?: '£' | '%' | '' ; decimals?: number }
export type Question = QMcq | QMulti | QTf | QFill | QShort | QCalc

export interface Topic {
  id: string
  number: number
  title: string
  summary: string
  icon: string
  source: string
  slides: Slide[]
  questions: Question[]
  /** pinned at the top of the topic menu */
  featured?: boolean
  /** replaces the standard question set with a dedicated test */
  customTest?: 'formula'
}

export interface SubjectHero {
  line1: string
  em: string
  sub: string
  orbIcons: string[]
  highlight: { value: number; label: string }
}

export interface Subject {
  id: string
  name: string
  tagline: string
  status: 'active' | 'coming-soon'
  topics: Topic[]
  quick?: QuickRevision
  hero?: SubjectHero
  /** example searches shown in the search sheet */
  suggestions?: string[]
}

export interface QuickRevision {
  definitions: { term: string; definition: string; topicId: string }[]
  formulas: { name: string; formula: string; vars: [string, string][]; worked: string[]; topicId: string }[]
  tips: { text: string; topicId?: string }[]
  mistakes: { text: string; topicId?: string }[]
}

export interface Verdict {
  correct: boolean
  /** 0..1, for short answers that are partly right */
  score: number
  detail?: string
}
export type UserAnswer = number | number[] | boolean | string | null
