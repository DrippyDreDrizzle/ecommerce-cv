import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import MenuArtwork from './MenuArtwork'
import { menuTheme } from './menuTheme'
import './MainMenu.css'

export default function MainMenu({ tabs, onSelect, selectedId }) {
  const [previewId, setPreviewId] = useState(selectedId || tabs[0].id)
  const { t } = useLanguage()
  return (
    <div className="main-menu">
      <div className="main-menu-mark">André Marjolin</div>
      <div className="main-menu-lang"><LanguageToggle /></div>
      <div className="main-menu-composition">
        <nav className="main-menu-navigation" aria-label="Main menu">
          <ul className="main-menu-list">
            {tabs.map((tab, index) => <li key={tab.id} className={index === tabs.length - 1 && tabs.length % 2 ? 'menu-card-wide' : undefined}>
              <button className={`main-menu-item ${previewId === tab.id ? 'is-previewed' : ''}`}
                data-menu-id={tab.id}
                style={{ '--item-color': menuTheme(tab.id).color, '--float-delay': `${-index * .63}s`, '--float-duration': `${4.5 + (index % 3) * .6}s` }}
                onMouseEnter={() => setPreviewId(tab.id)} onFocus={() => setPreviewId(tab.id)}
                onPointerDown={() => setPreviewId(tab.id)} onClick={(event) => onSelect(tab.id, event)}>
                <span className="menu-item-visual">
                  <span className="menu-card-stripe" aria-hidden="true" />
                  <MenuArtwork tab={tab} />
                  <span className="menu-card-shade" aria-hidden="true" />
                  <span className="menu-label">{t.tabs[tab.labelKey] || tab.label}</span>
                  <span className="menu-arrow" aria-hidden="true">↗</span>
                </span>
              </button>
            </li>)}
          </ul>
        </nav>
      </div>
      <div className="main-menu-hint">{t.menuHint}</div>
    </div>
  )
}
