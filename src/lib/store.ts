import { useCallback, useEffect, useState } from 'react'
import type { UserAnswer } from '../types'

const KEY = 'maar-btec-progress-v1'
const RESULT = (id: string) => `maar-btec-result-v1:${id}`

export interface ResultItem { qid: string; answer: UserAnswer; correct: boolean; score: number }
export interface Result { topicId: string; at: number; items: ResultItem[]; questionIds: string[] }
export interface TopicProgress { best: number; attempts: number; lastPct: number; viewed: number[] }
type Progress = Record<string, TopicProgress>

function read(): Progress {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
}
function write(p: Progress) {
  try { localStorage.setItem(KEY, JSON.stringify(p)) } catch { /* storage unavailable (private mode): app still works */ }
  window.dispatchEvent(new Event('maar-progress'))
}

export function useProgress() {
  const [p, setP] = useState<Progress>(read)
  useEffect(() => {
    const on = () => setP(read())
    window.addEventListener('maar-progress', on)
    window.addEventListener('storage', on)
    return () => { window.removeEventListener('maar-progress', on); window.removeEventListener('storage', on) }
  }, [])
  const markViewed = useCallback((topicId: string, slide: number) => {
    const cur = read()
    const t = cur[topicId] ?? { best: 0, attempts: 0, lastPct: 0, viewed: [] }
    if (!t.viewed.includes(slide)) { t.viewed = [...t.viewed, slide]; cur[topicId] = t; write(cur) }
  }, [])
  return { progress: p, markViewed }
}

export function saveResult(r: Result) {
  try { localStorage.setItem(RESULT(r.topicId), JSON.stringify(r)) } catch { /* ignore */ }
  const total = r.items.length || 1
  const pct = Math.round((r.items.filter(i => i.correct).length / total) * 100)
  const cur = read()
  const t = cur[r.topicId] ?? { best: 0, attempts: 0, lastPct: 0, viewed: [] }
  cur[r.topicId] = { ...t, best: Math.max(t.best, pct), attempts: t.attempts + 1, lastPct: pct }
  write(cur)
}

export function loadResult(topicId: string): Result | null {
  try { const s = localStorage.getItem(RESULT(topicId)); return s ? JSON.parse(s) : null } catch { return null }
}
