import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import './TopBar.css'

export default function TopBar({ tabs, activeId, onSelect, onBack }) {
  const { t } = useLanguage()
  return (
    <div className="top-bar">
      <button className="top-bar-back" onClick={onBack}>
        {t.backToMenu}
      </button>
      <div className="top-bar-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`top-bar-tab ${tab.id === activeId ? 'is-active' : ''}`}
            onClick={() => onSelect(tab.id)}
          >
            <span className="top-bar-number">{tab.number}</span>
            {t.tabs[tab.labelKey] || tab.label}
          </button>
        ))}
      </div>
      <div className="top-bar-lang">
        <LanguageToggle />
      </div>
    </div>
  )
}
