import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
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

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}
