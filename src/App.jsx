import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
  const [originId, setOriginId] = useState(null)
  const [zoom, setZoom] = useState({ x: 0, y: 0, scale: 1 })
  const shell = useRef(null)
  const menuLayer = useRef(null)
  const navigating = useRef(false)
  const unlockTimer = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => () => clearTimeout(unlockTimer.current), [])

  const navigate = (id, event) => {
    if (navigating.current || (view === 'panel' && id === activeId)) return
    if (view === 'menu' && id) {
      const bounds = shell.current.getBoundingClientRect()
      const card = event?.currentTarget || menuLayer.current?.querySelector(`[data-menu-id="${id}"]`)
      const rect = card?.getBoundingClientRect()
      if (rect) {
        const scale = Math.max(bounds.width / rect.width, bounds.height / rect.height) * 1.35
        setZoom({
          scale,
          x: (bounds.width / 2 - (rect.left - bounds.left + rect.width / 2)) * scale,
          y: (bounds.height / 2 - (rect.top - bounds.top + rect.height / 2)) * scale,
        })
      }
      setOriginId(id)
    }
    if (id) setActiveId(id)
    setView(id ? 'panel' : 'menu')
    navigating.current = true
    unlockTimer.current = setTimeout(() => { navigating.current = false }, reduced ? 0 : 760)
  }

  useEffect(() => {
    if (view === 'intro') return undefined
    const timer = setTimeout(() => {
      const target = view === 'panel'
        ? (shell.current?.querySelector('.panel-title') || shell.current?.querySelector('.top-bar-back'))
        : menuLayer.current?.querySelector(`[data-menu-id="${originId || 'profile'}"]`)
      target?.focus({ preventScroll: true })
    }, reduced ? 0 : 760)
    return () => clearTimeout(timer)
  }, [view, activeId, originId, reduced])

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

      {view !== 'intro' && (
        <motion.div ref={menuLayer} className="menu-camera"
          inert={view === 'panel' ? '' : undefined}
          aria-hidden={view === 'panel'}
          initial={false}
          animate={view === 'panel' ? { ...zoom, opacity: 0 } : { x: 0, y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0 : .72, ease: [.65, 0, .2, 1],
            opacity: { duration: reduced ? 0 : .24, delay: reduced ? 0 : view === 'panel' ? .38 : .12 } }}
          style={{ pointerEvents: view === 'panel' ? 'none' : 'auto' }}>
          <MainMenu tabs={TABS} onSelect={navigate} selectedId={originId} />
        </motion.div>
      )}

      <AnimatePresence>
        {view === 'panel' && ActivePanel && (
          <motion.div className="panel-shell" key="section"
            initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : .88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduced ? 1 : .88, pointerEvents: 'none',
              transition: { duration: reduced ? 0 : .24 } }}
            transition={{ duration: reduced ? 0 : .34, delay: reduced ? 0 : .4, ease: [.2, .7, .2, 1] }}>
            <TopBar tabs={TABS} activeId={activeId} onSelect={navigate}
              onBack={(event) => navigate(null, event)} />
            <div className="panel-stage" key={activeId}>
              <ActivePanel onNavigate={navigate} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
