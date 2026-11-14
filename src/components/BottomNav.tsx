import type { Route } from '../lib/router'
import { go, paths } from '../lib/router'
import { Icon } from './Icon'

/** Thumb-friendly navigation, shown on phones only (see CSS). */
export function BottomNav({ route, subjectId, onSearch, onSubjects }: { route: Route; subjectId: string; onSearch: () => void; onSubjects: () => void }) {
  const items: { id: string; label: string; icon: string; on: boolean; act: () => void }[] = [
    { id: 'home', label: 'Topics', icon: 'grid', on: route.page === 'home', act: () => go(paths.home(subjectId)) },
    { id: 'revise', label: 'Revise', icon: 'zap', on: route.page === 'revise', act: () => go(paths.revise(subjectId)) },
    { id: 'search', label: 'Search', icon: 'search', on: false, act: onSearch },
    { id: 'exam', label: 'Exam', icon: 'exam', on: route.page === 'exam', act: () => go(paths.exam(subjectId)) },
    { id: 'progress', label: 'Progress', icon: 'line-chart', on: route.page === 'progress', act: () => go(paths.progress(subjectId)) },
    { id: 'subject', label: 'Subject', icon: 'layers', on: false, act: onSubjects },
  ]
  return (
    <nav className="bottom-nav" aria-label="Main">
      {items.map(i => (
        <button key={i.id} className={i.on ? 'on' : ''} aria-current={i.on ? 'page' : undefined} onClick={i.act}>
          <Icon name={i.icon} size={22} strokeWidth={i.on ? 2.3 : 1.9} /><span>{i.label}</span>
        </button>
      ))}
    </nav>
  )
}
