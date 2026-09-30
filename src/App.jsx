import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { menuTheme } from './components/menuTheme'
import { LanguageProvider } from './context/LanguageContext'
import Intro from './components/Intro'
import MainMenu from './components/MainMenu'
import TopBar from './components/TopBar'
import Profile from './components/panels/Profile'
import Skills from './components/panels/Skills'
import Record from './components/panels/Record'
import Equipment from './components/panels/Equipment'
import Travel from './components/panels/Travel'
import Hobbies from './components/panels/Hobbies'
import Awards from './components/panels/Awards'
import Education from './components/panels/Education'
import Contact from './components/panels/Contact'
import './App.css'

const TABS = [
  { id: 'profile', number: '01', label: 'Profile', labelKey: 'profile', Component: Profile },
  { id: 'skills', number: '02', label: 'Skills', labelKey: 'skills', Component: Skills },
  { id: 'record', number: '03', label: 'Record', labelKey: 'record', Component: Record },
  { id: 'equipment', number: '04', label: 'Equipment', labelKey: 'equipment', Component: Equipment },
  { id: 'travel', number: '05', label: 'Travel', labelKey: 'travel', Component: Travel },
  { id: 'hobbies', number: '06', label: 'Hobbies', labelKey: 'hobbies', Component: Hobbies },
  { id: 'awards', number: '07', label: 'Awards', labelKey: 'awards', Component: Awards },
  { id: 'education', number: '08', label: 'Education', labelKey: 'education', Component: Education },
  { id: 'contact', number: '09', label: 'Contact', labelKey: 'contact', Component: Contact },
]

function AppInner() {
  const [view, setView] = useState('intro')
  const [activeId, setActiveId] = useState(null)

  const shell = useRef(null)
  const rippleId = useRef(0)
  const [ripple, setRipple] = useState(null)
  const reduced = useReducedMotion()

  const navigate = (id, event) => {
    if (view === 'panel' && id === activeId) return
    if (!reduced) {
      const bounds = shell.current.getBoundingClientRect()
      const button = event?.currentTarget?.getBoundingClientRect()
      const x = event?.detail > 0 ? event.clientX - bounds.left : button ? button.left + button.width / 2 - bounds.left : bounds.width / 2
      const y = event?.detail > 0 ? event.clientY - bounds.top : button ? button.top + button.height / 2 - bounds.top : bounds.height / 2
      const radius = Math.hypot(Math.max(x, bounds.width - x), Math.max(y, bounds.height - y))
      setRipple({ id: ++rippleId.current, x, y, radius, color: menuTheme(id || activeId).color })
    } else setRipple(null)
    if (id) setActiveId(id)
    setView(id ? 'panel' : 'menu')
  }

  useEffect(() => {
    if (view === 'intro') return undefined
    const frame = requestAnimationFrame(() => {
      const target = view === 'panel' ? shell.current?.querySelector('.panel-title') : shell.current?.querySelector(`[data-menu-id="${activeId || 'profile'}"]`)
      target?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
    // Section changes preserve focus on the navigation; only changing views moves it.
  }, [view])

  const active = TABS.find((t) => t.id === activeId)
  const ActivePanel = active?.Component

  return (
    <div ref={shell} className="app-shell" style={{ '--section-color': menuTheme(activeId).color }}>
      {view === 'intro' && (
        <Intro
          tabs={TABS}
          onSelectTab={navigate}
          onEnter={() => setView('menu')}
        />
      )}

      {view === 'menu' && (
        <MainMenu
          tabs={TABS}
          onSelect={navigate}
          selectedId={activeId}
        />
      )}

      {view === 'panel' && ActivePanel && (
        <div className="panel-shell">
          <TopBar
            tabs={TABS}
            activeId={activeId}
            onSelect={navigate}
            onBack={(event) => navigate(null, event)}
          />
          <div className="panel-stage" key={activeId}>
            <ActivePanel onNavigate={(id, event) => {
              navigate(id, event)
              requestAnimationFrame(() => shell.current?.querySelector('.panel-title')?.focus({ preventScroll: true }))
            }} />
          </div>
        </div>
      )}
      {ripple && !reduced && <div className="navigation-ripple" aria-hidden="true">
        <motion.div key={ripple.id} className="navigation-ripple-disc"
          style={{ left: ripple.x - ripple.radius, top: ripple.y - ripple.radius, width: ripple.radius * 2, height: ripple.radius * 2, '--ripple-color': ripple.color }}
          initial={{ scale: .02, opacity: .95 }} animate={{ scale: [ .02, .72, 1.08 ], opacity: [ .95, .85, 0 ] }}
          transition={{ duration: .42, times: [0, .72, 1], ease: [.3, .1, .35, 1] }}
          onAnimationComplete={() => setRipple(current => current?.id === ripple.id ? null : current)} />
      </div>}
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}
