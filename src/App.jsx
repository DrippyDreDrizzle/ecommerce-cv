import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Intro from './components/Intro'
import MainMenu from './components/MainMenu'
import TopBar from './components/TopBar'
import Profile from './components/panels/Profile'
import Skills from './components/panels/Skills'
import Record from './components/panels/Record'
import Equipment from './components/panels/Equipment'
import Contact from './components/panels/Contact'
import './App.css'

const TABS = [
  { id: 'profile', number: '01', label: 'Profile', Component: Profile },
  { id: 'skills', number: '02', label: 'Skills', Component: Skills },
  { id: 'record', number: '03', label: 'Record', Component: Record },
  { id: 'equipment', number: '04', label: 'Equipment', Component: Equipment },
  { id: 'contact', number: '05', label: 'Contact', Component: Contact },
]

export default function App() {
  // view: 'intro' | 'menu' | 'panel'
  const [view, setView] = useState('intro')
  const [activeId, setActiveId] = useState(null)

  const active = TABS.find((t) => t.id === activeId)
  const ActivePanel = active?.Component

  return (
    <div className="app-shell">
      {view === 'intro' && (
        <Intro
          tabs={TABS}
          onSelectTab={(id) => {
            setActiveId(id)
            setView('panel')
          }}
          onEnter={() => setView('menu')}
        />
      )}

      {view === 'menu' && (
        <MainMenu
          tabs={TABS}
          onSelect={(id) => {
            setActiveId(id)
            setView('panel')
          }}
        />
      )}

      {view === 'panel' && ActivePanel && (
        <div className="panel-shell">
          <TopBar
            tabs={TABS}
            activeId={activeId}
            onSelect={setActiveId}
            onBack={() => setView('menu')}
          />
          <div className="panel-stage">
            <AnimatePresence mode="wait">
              <ActivePanel key={activeId} />
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}
