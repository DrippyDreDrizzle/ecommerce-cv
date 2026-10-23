import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useReducedMotion } from 'framer-motion'
import { afterPaint, createMenuFlight } from './components/menuFlight'
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
  const [moving, setMoving] = useState(false)
  const shell = useRef(null)
  const menuLayer = useRef(null)
  const navigating = useRef(false)
  const flight = useRef(null)
  const mounted = useRef(true)
  const reduced = useReducedMotion()

  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false; flight.current?.remove() }
  }, [])

  const navigate = async (id) => {
    if (navigating.current || (view === 'panel' && id === activeId)) return
    const destination = () => {
      if (id) setActiveId(id)
      setView(id ? 'panel' : 'menu')
    }
    // Tabs within a section do not trigger a menu flight.
    if (reduced || (view === 'panel' && id) || view === 'intro') {
      destination()
      return
    }
    navigating.current = true
    flushSync(() => setMoving(true))
    const returning = !id
    const card = menuLayer.current?.querySelector(`[data-menu-id="${id || activeId}"]`)
    const menu = menuLayer.current?.querySelector('.main-menu')
    try {
      if (returning && card && menu) {
        const rect = card.getBoundingClientRect()
        const bounds = shell.current.getBoundingClientRect()
        if (rect.top < bounds.top + 72 || rect.bottom > bounds.bottom - 24) {
          menu.scrollTop += rect.top + rect.height / 2 - bounds.top - bounds.height / 2
        }
      }
      if (!card) { destination(); return }
      flight.current = createMenuFlight(shell.current, card, returning)
      // Give the browser two frames to paint/promote this small isolated layer.
      await afterPaint()
      if (!mounted.current) return
      if (returning) {
        await flight.current.reveal()
        if (!mounted.current) return
        flushSync(destination)
        await afterPaint()
        if (!mounted.current) return
        await flight.current.zoom()
      } else {
        await flight.current.zoom()
        if (!mounted.current) return
        // Expensive page mounting happens behind the fully zoomed card, never
        // during the flight. Keep that cover until the page has painted.
        flushSync(destination)
        await afterPaint()
        if (!mounted.current) return
        await flight.current.dissolve()
      }
    } catch (error) {
      if (mounted.current) {
        console.error('Menu transition failed', error)
        flushSync(destination)
      }
    } finally {
      flight.current?.remove()
      flight.current = null
      navigating.current = false
      if (mounted.current) setMoving(false)
    }
  }

  useEffect(() => {
    if (view === 'intro' || moving) return undefined
    const frame = requestAnimationFrame(() => {
      const target = view === 'panel'
        ? (shell.current?.querySelector('.panel-title') || shell.current?.querySelector('.top-bar-back'))
        : menuLayer.current?.querySelector(`[data-menu-id="${activeId || 'profile'}"]`)
      target?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [view, activeId, moving])

  const active = TABS.find((t) => t.id === activeId)
  const ActivePanel = active?.Component

  return (
    <div ref={shell} className={`app-shell ${moving ? 'is-navigating' : ''}`} style={{ '--section-color': menuTheme(activeId).color }}>
      {view === 'intro' && (
        <Intro
          tabs={TABS}
          onSelectTab={navigate}
          onEnter={() => setView('menu')}
        />
      )}

      {view !== 'intro' && (
        <div ref={menuLayer} className="menu-camera"
          inert={view === 'panel' || moving ? '' : undefined}
          aria-hidden={view === 'panel'}
          style={{ visibility: view === 'panel' ? 'hidden' : 'visible' }}>
          <MainMenu tabs={TABS} onSelect={navigate} selectedId={activeId} />
        </div>
      )}

      {view === 'panel' && ActivePanel && (
        <div className="panel-shell" inert={moving ? '' : undefined}>
          <TopBar tabs={TABS} activeId={activeId} onSelect={navigate}
            onBack={() => navigate(null)} />
          <div className="panel-stage" key={activeId}>
            <ActivePanel onNavigate={navigate} />
          </div>
        </div>
      )}
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
