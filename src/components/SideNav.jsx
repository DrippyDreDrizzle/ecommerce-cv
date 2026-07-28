import { motion } from 'framer-motion'
import './SideNav.css'

export default function SideNav({ tabs, activeId, onSelect }) {
  return (
    <nav className="side-nav" aria-label="Section menu">
      <div className="side-nav-mark">JR</div>
      <ul>
        {tabs.map((tab) => {
          const isActive = tab.id === activeId
          return (
            <li key={tab.id}>
              <button
                className={`nav-item ${isActive ? 'is-active' : ''}`}
                onClick={() => onSelect(tab.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-slash"
                    className="nav-slash"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="nav-number">{tab.number}</span>
                <span className="nav-label">{tab.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="side-nav-footer">Ecommerce &amp; Growth</div>
    </nav>
  )
}
