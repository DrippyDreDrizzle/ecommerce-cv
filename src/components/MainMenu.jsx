import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import MenuArtwork from './MenuArtwork'
import { menuTheme } from './menuTheme'
import './MainMenu.css'

export default function MainMenu({ tabs, onSelect, selectedId }) {
  const [previewId, setPreviewId] = useState(selectedId || tabs[0].id)
  const { t } = useLanguage()
  const preview = tabs.find(tab => tab.id === previewId) || tabs[0]
  return (
    <div className="main-menu" style={{ '--section-color': menuTheme(preview.id).color }}>
      <div className="main-menu-mark">André Marjolin</div>
      <div className="main-menu-lang"><LanguageToggle /></div>
      <div className="main-menu-composition">
        <nav className="main-menu-navigation" aria-label="Main menu">
          <ul className="main-menu-list">
            {tabs.map((tab, index) => <li key={tab.id}>
              <button className={`main-menu-item ${previewId === tab.id ? 'is-previewed' : ''}`}
                data-menu-id={tab.id}
                style={{ '--item-color': menuTheme(tab.id).color, '--float-delay': `${-index * .63}s`, '--float-duration': `${4.5 + (index % 3) * .6}s` }}
                onMouseEnter={() => setPreviewId(tab.id)} onFocus={() => setPreviewId(tab.id)}
                onPointerDown={() => setPreviewId(tab.id)} onClick={(event) => onSelect(tab.id, event)}>
                <span className="menu-item-visual"><span className="menu-slash" /><span className="menu-number">{tab.number}</span><span className="menu-label">{t.tabs[tab.labelKey] || tab.label}</span><span className="menu-arrow" aria-hidden="true">↗</span></span>
              </button>
            </li>)}
          </ul>
        </nav>
        <MenuArtwork tab={preview} label={t.tabs[preview.labelKey] || preview.label} />
      </div>
      <div className="main-menu-hint">{t.menuHint}</div>
    </div>
  )
}
