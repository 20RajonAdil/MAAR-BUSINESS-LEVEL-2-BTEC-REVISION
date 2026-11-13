import type { Subject } from '../types'
import { startUpCosts, runningCosts, fixedCosts, variableCosts } from './finance/t01-t04'
import { totalCosts, revenue, profitLoss } from './finance/t05-t07'
import { breakEvenChart, breakEvenCalc } from './finance/t08-t09'
import { grossNetProfit, incomeStatement, financialPosition } from './finance/t10-t12'
import { cashFlow, ratiosComparing } from './finance/t13-t14'
import { mustKnowFormulas } from './finance/t15-formulas'
import { financeQuick } from './finance/quick'
import { principles, markets, research } from './marketing/m01-m03'
import { swotPestle, interpreting } from './marketing/m05-m06'
import { productPrice, placePromotion } from './marketing/m07-m08'
import { marketingQuick } from './marketing/quick'

export const finance: Subject = {
  id: 'finance',
  name: 'Finance',
  tagline: 'Unit 2 · Finance for Business',
  status: 'active',
  topics: [startUpCosts, runningCosts, fixedCosts, variableCosts, totalCosts, revenue, profitLoss, breakEvenChart, breakEvenCalc, grossNetProfit, incomeStatement, financialPosition, cashFlow, ratiosComparing, mustKnowFormulas],
  quick: financeQuick,
}

/** Lesson 03 was not in the uploaded Marketing pack. When it arrives, add a topic file and insert it between `markets` and `research`. */
export const marketing: Subject = {
  id: 'marketing',
  name: 'Marketing',
  tagline: 'Unit 9 · Principles of Marketing',
  status: 'active',
  topics: [principles, markets, research, swotPestle, interpreting, productPrice, placePromotion],
  quick: marketingQuick,
}

/** Add future subjects here – the whole app (menu, topics, slides, quizzes, search) is driven by this list. */
export const subjects: Subject[] = [finance, marketing]
export const getSubject = (id: string) => subjects.find(s => s.id === id)
