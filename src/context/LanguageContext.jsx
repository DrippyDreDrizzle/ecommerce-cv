import { createContext, useContext, useState, useCallback } from 'react'
import { translations } from '../i18n/translations'
import MatrixTransition from '../components/MatrixTransition'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const [transitioning, setTransitioning] = useState(false)
  const [pendingLang, setPendingLang] = useState(null)

  const toggleLanguage = useCallback(() => {
    const next = lang === 'en' ? 'ja' : 'en'
    setPendingLang(next)
    setTransitioning(true)
  }, [lang])

  const handleTransitionMid = useCallback(() => {
    // Swap the actual language once the matrix rain is fully covering
    // the screen, so the change is hidden behind the effect.
    if (pendingLang) setLang(pendingLang)
  }, [pendingLang])

  const handleTransitionDone = useCallback(() => {
    setTransitioning(false)
    setPendingLang(null)
  }, [])

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
      {transitioning && (
        <MatrixTransition onMidpoint={handleTransitionMid} onDone={handleTransitionDone} />
      )}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
