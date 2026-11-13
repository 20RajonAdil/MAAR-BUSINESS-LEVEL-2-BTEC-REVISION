import { useEffect, useRef, useState } from 'react'
import { getSubject, subjects } from './data/subjects'
import { go, paths, useRoute } from './lib/router'
import { TopicMenu } from './components/TopicMenu'
import { SlideDeck } from './components/SlideDeck'
import { Quiz } from './components/Quiz'
import { Results } from './components/Results'
import { QuickRevision } from './components/QuickRevision'
import { SearchModal } from './components/SearchModal'
import { FormulaTest } from './components/FormulaTest'
import { Logo } from './components/Logo'
import { MIXED } from './lib/exam'
import './styles/app.css'

function SubjectMenu({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])
  return (
    <div className="dots-menu" ref={wrap}>
      <button className="icon-btn dots-btn" aria-haspopup="menu" aria-expanded={open} aria-label="Switch subject" onClick={() => setOpen(o => !o)}>⋮</button>
      {open && (
        <div className="menu" role="menu" aria-label="Subjects">
          <div className="menu-title">Subjects</div>
          {subjects.map(s => (
            <button key={s.id} role="menuitemradio" aria-checked={s.id === current} className={`menu-item${s.id === current ? ' current' : ''}`}
              onClick={() => { setOpen(false); go(paths.home(s.id)) }}>
              <span className="menu-name">{s.name}</span>
              <span className={`pill ${s.status === 'active' ? 'pill-on' : 'pill-soon'}`}>{s.status === 'active' ? (s.id === current ? 'Active' : 'Open') : 'Coming soon'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ComingSoon({ name }: { name: string }) {
  return (
    <div className="soon">
      <div className="soon-card">
        <Logo className="soon-logo" />
        <p className="eyebrow">{name}</p>
        <h1>Coming soon</h1>
        <p>The {name} learning materials are being prepared. This section will include presentation-style lessons, practice questions and quick revision, just like Finance.</p>
        <button className="btn btn-primary" onClick={() => go(paths.home('finance'))}>Go to Finance</button>
      </div>
    </div>
  )
}

export default function App() {
  const route = useRoute()
  const [searching, setSearching] = useState(false)
  const [examNonce, setExamNonce] = useState(0)
  useEffect(() => { if (route.page === 'exam') setExamNonce(n => n + 1) }, [route.page])
  const subject = getSubject(route.subject) ?? subjects[0]
  const active = subject.status === 'active'

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearching(true) }
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [])

  let page
  if (!active) page = <ComingSoon name={subject.name} />
  else if (route.page === 'learn') {
    const topic = subject.topics.find(t => t.id === route.topic)
    page = topic ? <SlideDeck key={topic.id} subjectId={subject.id} topic={topic} index={route.slide ?? 0} /> : <p className="empty">Topic not found. <a href={`#/${subject.id}`}>Back to topics</a></p>
  } else if (route.page === 'quiz') page = <Quiz key={route.topic} subject={subject} topicId={route.topic!} />
  else if (route.page === 'exam') page = <Quiz key={'mixed-' + examNonce} subject={subject} topicId={MIXED} />
  else if (route.page === 'formulas' && subject.topics.some(t => t.customTest)) page = <FormulaTest subject={subject} />
  else if (route.page === 'results') page = <Results subject={subject} topicId={route.topic!} />
  else if (route.page === 'revise') page = <QuickRevision key={route.find ?? ''} subject={subject} find={route.find} />
  else page = <TopicMenu subject={subject} openSearch={() => setSearching(true)} />

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="topbar">
        <a className="brand" href={`#/${subject.id}`} aria-label="MAAR BUSINESS LEVEL 2 BTEC home">
          <Logo className="logo-img" />
          <span className="brand-text"><strong>MAAR</strong> BUSINESS <span>LEVEL 2 BTEC</span></span>
        </a>
        <div className="top-actions">
          <span className="subject-pill" aria-label="Current subject">{subject.name}</span>
          {active && <button className="icon-btn" onClick={() => setSearching(true)} aria-label="Search (Ctrl+K)">🔍</button>}
          <SubjectMenu current={subject.id} />
        </div>
      </header>
      <main id="main" className="main">{page}</main>
      <footer className="foot">
        <Logo className="foot-logo" />
        <p>MAAR BUSINESS LEVEL 2 BTEC · {subject.name}: {subject.tagline} · Built from your course slides. Questions marked “Practice” were generated from the lesson content.</p>
      </footer>
      {searching && active && <SearchModal subject={subject} onClose={() => setSearching(false)} />}
    </>
  )
}
