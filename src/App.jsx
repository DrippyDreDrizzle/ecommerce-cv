import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  const [moving, setMoving] = useState(false)
  const previousView = useRef('intro')
  const cameraAnimation = useRef(null)
  const shell = useRef(null)
  const menuLayer = useRef(null)
  const navigating = useRef(false)
  const unlockTimer = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => () => clearTimeout(unlockTimer.current), [])

  const navigate = (id, event) => {
    if (navigating.current || (view === 'panel' && id === activeId)) return
    if (id) setActiveId(id)
    setView(id ? 'panel' : 'menu')
    const changingView = !id || view !== 'panel'
    navigating.current = changingView
    setMoving(changingView && !reduced)
    clearTimeout(unlockTimer.current)
    unlockTimer.current = setTimeout(() => { navigating.current = false; setMoving(false) }, reduced ? 0 : 700)
  }

  // Native transform/opacity animations run on the compositor while sections render.
  useLayoutEffect(() => {
    const layer = menuLayer.current
    if (!layer) return
    const wasPanel = previousView.current === 'panel'
    previousView.current = view
    const identity = 'translate3d(0px, 0px, 0px) scale(1)'
    const card = layer.querySelector(`[data-menu-id="${activeId || 'profile'}"]`)
    const menu = layer.querySelector('.main-menu')
    const bounds = shell.current.getBoundingClientRect()
    const layerRect = layer.getBoundingClientRect()
    const matrix = new DOMMatrixReadOnly(getComputedStyle(layer).transform)
    const rect = card.getBoundingClientRect()
    const width = rect.width / matrix.a
    const height = rect.height / matrix.d
    const x = (rect.left - layerRect.left) / matrix.a + width / 2
    let y = (rect.top - layerRect.top) / matrix.d + height / 2
    // Bring a newly selected section's card into the menu viewport before returning.
    if (wasPanel) {
      const oldScroll = menu.scrollTop
      if (y - height / 2 < 72 || y + height / 2 > bounds.height - 24) {
        menu.scrollTop += y - bounds.height / 2
        y -= menu.scrollTop - oldScroll
      }
    }
    const scale = Math.max(bounds.width / width, bounds.height / height) * 1.15
    const closeup = `translate3d(${(bounds.width / 2 - x) * scale}px, ${(bounds.height / 2 - y) * scale}px, 0px) scale(${scale})`
    cameraAnimation.current?.cancel()
    const entering = view === 'panel'
    const destination = entering ? closeup : identity
    layer.style.transform = destination
    layer.style.opacity = entering ? '0' : '1'
    if (!reduced && (entering !== wasPanel)) {
      cameraAnimation.current = layer.animate([
        { transform: entering ? identity : closeup, opacity: entering ? 1 : 0 },
        { transform: destination, opacity: entering ? 0 : 1 },
      ], { duration: 680, easing: 'cubic-bezier(.4, 0, .2, 1)' })
    }
    return () => cameraAnimation.current?.cancel()
  }, [view, activeId, reduced])

  useEffect(() => {
    if (view === 'intro') return undefined
    const timer = setTimeout(() => {
      const target = view === 'panel'
        ? (shell.current?.querySelector('.panel-title') || shell.current?.querySelector('.top-bar-back'))
        : menuLayer.current?.querySelector(`[data-menu-id="${activeId || 'profile'}"]`)
      target?.focus({ preventScroll: true })
    }, reduced ? 0 : 700)
    return () => clearTimeout(timer)
  }, [view, activeId, reduced])

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
          inert={view === 'panel' ? '' : undefined}
          aria-hidden={view === 'panel'}
          style={{ pointerEvents: view === 'panel' ? 'none' : 'auto' }}>
          <MainMenu tabs={TABS} onSelect={navigate} selectedId={activeId} />
        </div>
      )}

      <AnimatePresence>
        {view === 'panel' && ActivePanel && (
          <motion.div className="panel-shell" key="section"
            initial={{ opacity: reduced ? 1 : 0, transform: reduced ? 'none' : 'scale(.94)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0, transform: reduced ? 'none' : 'scale(.94)', pointerEvents: 'none',
              transition: { duration: reduced ? 0 : .24 } }}
            transition={{ duration: reduced ? 0 : .34, delay: reduced ? 0 : .28, ease: [.2, .7, .2, 1] }}>
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
