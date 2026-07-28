import './TopBar.css'

export default function TopBar({ tabs, activeId, onSelect, onBack }) {
  return (
    <div className="top-bar">
      <button className="top-bar-back" onClick={onBack}>
        ← Menu
      </button>
      <div className="top-bar-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`top-bar-tab ${tab.id === activeId ? 'is-active' : ''}`}
            onClick={() => onSelect(tab.id)}
          >
            <span className="top-bar-number">{tab.number}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
