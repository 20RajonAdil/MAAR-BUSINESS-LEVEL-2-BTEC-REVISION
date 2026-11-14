import { useEffect, useRef, useState } from 'react'
import type { Subject } from '../types'
import { go, paths } from '../lib/router'
import { Icon } from './Icon'
import { Logo } from './Logo'

function useCountUp(target: number) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(target); return }
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1100)
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return v
}

function Stat({ value, label }: { value: number; label: string }) {
  const n = useCountUp(value)
  return <div className="hero-stat"><dt>{label}</dt><dd>{n}</dd></div>
}

function Orb({ icons }: { icons: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (e: PointerEvent) => {
      el.style.setProperty('--px', (e.clientX / innerWidth - 0.5).toFixed(3))
      el.style.setProperty('--py', (e.clientY / innerHeight - 0.5).toFixed(3))
    }
    addEventListener('pointermove', move, { passive: true })
    return () => removeEventListener('pointermove', move)
  }, [])
  const star = (cls: string, w: number) => (
    <svg className={`orb-star ${cls}`} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={w}>
      <rect x="40" y="40" width="120" height="120" /><rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)" />
    </svg>
  )
  return (
    <div className="hero-orb" ref={ref} aria-hidden="true">
      <span className="orb-ring r1" /><span className="orb-ring r2" /><span className="orb-ring r3" />
      {star('s1', 0.5)}{star('s2', 0.4)}
      <span className="orb-orbit">
        {icons.map((ic, i) => (
          <span key={ic} className="orb-chip" style={{ ['--a' as string]: `${(360 / icons.length) * i}deg` }}>
            <span className="orb-chip-in"><Icon name={ic} size={20} strokeWidth={2} /></span>
          </span>
        ))}
        <i className="orb-dot" />
      </span>
      <div className="orb-core"><Logo className="orb-logo" /></div>
    </div>
  )
}

const JOURNEY = ['Learn', 'Understand', 'Test', 'Results', 'Revise', 'Retry']

export function Hero({ subject, openSearch }: { subject: Subject; openSearch: () => void }) {
  const h = subject.hero!
  const featured = subject.topics.find(t => t.featured)
  const slides = subject.topics.reduce((n, t) => n + t.slides.length, 0)
  const questions = subject.topics.reduce((n, t) => n + t.questions.length, 0)
  const first = subject.topics.find(t => !t.featured) ?? subject.topics[0]
  return (
    <section className="hero-band" data-subject={subject.id} aria-labelledby="hero-h">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-glow g1" /><span className="hero-glow g2" /><span className="hero-dots" />
        <svg className="hero-line" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hl-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgb(var(--acc))" stopOpacity=".22" /><stop offset="1" stopColor="rgb(var(--acc))" stopOpacity="0" /></linearGradient>
          </defs>
          <path d="M0 250 C120 240 180 200 280 205 S440 250 540 190 S700 90 800 120 S980 60 1200 20 L1200 300 L0 300 Z" fill="url(#hl-fill)" />
          <path className="hl-stroke" d="M0 250 C120 240 180 200 280 205 S440 250 540 190 S700 90 800 120 S980 60 1200 20" fill="none" stroke="rgb(var(--acc))" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="hero-shell">
        <div className="hero-arch" aria-hidden="true" />
        <Orb icons={h.orbIcons} />
        <div className="hero-copy">
          <p className="hero-kicker"><Icon name="sparkles" size={15} strokeWidth={2.2} /> {subject.tagline}</p>
          <h1 id="hero-h">{h.line1}<br /><em>{h.em}</em></h1>
          <p className="hero-sub">{h.sub}</p>
          <div className="hero-cta">
            <button className="btn btn-gold hero-primary" onClick={() => go(paths.learn(subject.id, first.id, 0))}><Icon name="book" size={18} /> Start learning</button>
            <button className="btn btn-ghost-dark" onClick={() => go(paths.revise(subject.id))}><Icon name="zap" size={18} /> Quick revision</button>
            {featured?.customTest && <button className="btn btn-ghost-dark" onClick={() => go(paths.formulas(subject.id))}><Icon name="sigma" size={18} /> Formula test</button>}
            <button className="btn btn-ghost-dark" onClick={() => go(paths.exam(subject.id))}><Icon name="exam" size={18} /> Practice exam</button>
            <button className="btn btn-ghost-dark" onClick={() => go(paths.progress(subject.id))}><Icon name="line-chart" size={18} /> Progress check</button>
            <button className="btn btn-ghost-dark" onClick={openSearch}><Icon name="search" size={18} /> Search</button>
          </div>
          <dl className="hero-stats">
            <Stat value={subject.topics.length} label="Topics" />
            <Stat value={slides} label="Slides" />
            <Stat value={questions} label="Questions" />
            <Stat value={h.highlight.value} label={h.highlight.label} />
          </dl>
          <ol className="hero-journey" aria-label="Learning journey">
            {JOURNEY.map(s => <li key={s}>{s}</li>)}
          </ol>
        </div>
      </div>
    </section>
  )
}
