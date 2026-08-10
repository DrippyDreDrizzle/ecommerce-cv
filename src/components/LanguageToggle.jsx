import { useLanguage } from '../context/LanguageContext'
import './LanguageToggle.css'

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage()
  return (
    <button className="lang-toggle" onClick={toggleLanguage} aria-label="Switch language">
      <span className={lang === 'en' ? 'is-active' : ''}>EN</span>
      <span className="lang-toggle-sep">/</span>
      <span className={lang === 'ja' ? 'is-active' : ''}>日本語</span>
    </button>
  )
}
