import { useEffect, useRef } from 'react'
import { Reflection } from './MenuArtwork'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import './TopBar.css'
import { menuTheme } from './menuTheme'

export default function TopBar({ tabs, activeId, onSelect, onBack }) {
  const { t, lang } = useLanguage()
  const strip = useRef(null)
  useEffect(() => {
    const list = strip.current
    const tab = list?.querySelector('[aria-current="page"]')
    if (!tab || list.scrollWidth <= list.clientWidth) return
    list.scrollLeft = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2
  }, [activeId, lang])
  return (
    <div className="top-bar">
      <button className="top-bar-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><path d="m11 5-7 7 7 7M5 12h15"/></svg>
        <span>{t.backToMenu.replace(/^←\s*/, '')}</span>
      </button>
      <nav className="top-bar-tabs" ref={strip} aria-label={lang === 'ja' ? 'セクション' : 'Sections'}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`top-bar-tab ${tab.id === activeId ? 'is-active' : ''}`}
            style={{ '--item-color': menuTheme(tab.id).color }}
            aria-current={tab.id === activeId ? 'page' : undefined}
            onClick={(event) => onSelect(tab.id, event)}
          >
            <svg className="top-tab-art" viewBox="0 0 420 420" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="6"><Reflection motif={menuTheme(tab.id).motif} /></svg>
            <span>{t.tabs[tab.labelKey] || tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="top-bar-lang">
        <LanguageToggle />
      </div>
    </div>
  )
}
