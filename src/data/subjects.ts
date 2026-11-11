import type { Subject } from '../types'
import { startUpCosts, runningCosts, fixedCosts, variableCosts } from './finance/t01-t04'
import { totalCosts, revenue, profitLoss } from './finance/t05-t07'
import { breakEvenChart, breakEvenCalc } from './finance/t08-t09'
import { grossNetProfit, incomeStatement, financialPosition } from './finance/t10-t12'
import { cashFlow, ratiosComparing } from './finance/t13-t14'
import { mustKnowFormulas } from './finance/t15-formulas'
import { financeQuick } from './finance/quick'

export const finance: Subject = {
  id: 'finance',
  name: 'Finance',
  tagline: 'Unit 2 · Finance for Business',
  status: 'active',
  topics: [startUpCosts, runningCosts, fixedCosts, variableCosts, totalCosts, revenue, profitLoss, breakEvenChart, breakEvenCalc, grossNetProfit, incomeStatement, financialPosition, cashFlow, ratiosComparing, mustKnowFormulas],
  quick: financeQuick,
}

/** Marketing already exists in the menu. To add its content later, fill `topics` (and `quick`) and change status to 'active'. */
export const marketing: Subject = {
  id: 'marketing',
  name: 'Marketing',
  tagline: 'Coming soon',
  status: 'coming-soon',
  topics: [],
}

/** Add future subjects here – the whole app (menu, topics, slides, quizzes, search) is driven by this list. */
export const subjects: Subject[] = [finance, marketing]
export const getSubject = (id: string) => subjects.find(s => s.id === id)
