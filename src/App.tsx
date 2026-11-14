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
import { Progress } from './components/Progress'
import { BottomNav } from './components/BottomNav'
import { OfflinePill, OfflineToast } from './components/OfflineStatus'
import { Icon } from './components/Icon'
import { Logo } from './components/Logo'
import { MIXED } from './lib/exam'
import './styles/fonts.css'
import './styles/app.css'
import './styles/hero.css'
import './styles/mobile.css'
import './styles/progress.css'

function SubjectMenu({ current, open, setOpen }: { current: string; open: boolean; setOpen: (v: boolean) => void }) {
  const wrap = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open, setOpen])
  return (
    <div className="dots-menu" ref={wrap}>
      <button className="icon-btn dots-btn" aria-haspopup="menu" aria-expanded={open} aria-label="Switch subject" onClick={() => setOpen(!open)}><Icon name="dots" size={22} strokeWidth={2.4} /></button>
      {open && <div className="menu-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />}
      {open && (
        <div className="menu" role="menu" aria-label="Subjects">
          <div className="menu-grip" aria-hidden="true" />
          <div className="menu-title">Subjects</div>
          {subjects.map(s => (
            <button key={s.id} role="menuitemradio" aria-checked={s.id === current} className={`menu-item${s.id === current ? ' current' : ''}`}
              onClick={() => { setOpen(false); go(paths.home(s.id)) }}>
              <span className="menu-ic"><Icon name={s.topics[0]?.icon ?? 'book'} size={20} /></span>
              <span className="menu-name">{s.name}<small>{s.tagline}</small></span>
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
  const [subjectsOpen, setSubjectsOpen] = useState(false)
  const [examNonce, setExamNonce] = useState(0)
  useEffect(() => { if (route.page === 'exam') setExamNonce(n => n + 1) }, [route.page])
  useEffect(() => { setSubjectsOpen(false) }, [route.subject, route.page])
  const subject = getSubject(route.subject) ?? subjects[0]
  const active = subject.status === 'active'
  const immersive = route.page === 'learn' || route.page === 'quiz' || route.page === 'exam'

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
  else if (route.page === 'progress') page = <Progress subject={subject} />
  else if (route.page === 'results') page = <Results subject={subject} topicId={route.topic!} />
  else if (route.page === 'revise') page = <QuickRevision key={route.find ?? ''} subject={subject} find={route.find} />
  else page = <TopicMenu subject={subject} openSearch={() => setSearching(true)} />

  return (
    <div className={`app${immersive ? ' is-immersive' : ''}`}>
      <a className="skip" href="#main">Skip to content</a>
      <header className="topbar">
        <a className="brand" href={`#/${subject.id}`} aria-label="MAAR BUSINESS LEVEL 2 BTEC home">
          <Logo className="logo-img" />
          <span className="brand-text"><strong>MAAR</strong> BUSINESS <span>LEVEL 2 BTEC</span></span>
        </a>
        <div className="top-actions">
          <OfflinePill />
          <span className="subject-pill" aria-label="Current subject">{subject.name}</span>
          {active && <button className="icon-btn" onClick={() => setSearching(true)} aria-label="Search (Ctrl+K)"><Icon name="search" size={20} /></button>}
          <SubjectMenu current={subject.id} open={subjectsOpen} setOpen={setSubjectsOpen} />
        </div>
      </header>
      <main id="main" className="main">{page}</main>
      <footer className="foot">
        <Logo className="foot-logo" />
        <p>MAAR BUSINESS LEVEL 2 BTEC · {subject.name}: {subject.tagline}</p>
        <p className="foot-small">Built from your course slides. Questions marked “Practice” were generated from the lesson content. Works offline once opened.</p>
      </footer>
      {active && !immersive && <BottomNav route={route} subjectId={subject.id} onSearch={() => setSearching(true)} onSubjects={() => setSubjectsOpen(o => !o)} />}
      <OfflineToast />
      {searching && active && <SearchModal subject={subject} onClose={() => setSearching(false)} />}
    </div>
  )
}
