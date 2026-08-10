import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import './MainMenu.css'

export default function MainMenu({ tabs, onSelect }) {
  const [hoveredId, setHoveredId] = useState(null)
  const { t } = useLanguage()

  return (
    <div className="main-menu">
      <div className="main-menu-mark">André Marjolin</div>
      <div className="main-menu-lang">
        <LanguageToggle />
      </div>
      <ul className="main-menu-list">
        {tabs.map((tab) => {
          const isHovered = hoveredId === tab.id
          return (
            <li key={tab.id}>
              <button
                className={`main-menu-item ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredId(tab.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(tab.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => onSelect(tab.id)}
              >
                {isHovered && (
                  <motion.span
                    layoutId="menu-slash"
                    className="menu-slash"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="menu-number">{tab.number}</span>
                <span className="menu-label">{t.tabs[tab.labelKey] || tab.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="main-menu-hint">{t.menuHint}</div>
    </div>
  )
}
