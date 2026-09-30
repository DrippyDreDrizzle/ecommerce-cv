import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import './TopBar.css'
import { menuTheme } from './menuTheme'

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
            style={{ '--item-color': menuTheme(tab.id).color }}
            aria-current={tab.id === activeId ? 'page' : undefined}
            onClick={(event) => onSelect(tab.id, event)}
          >
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
