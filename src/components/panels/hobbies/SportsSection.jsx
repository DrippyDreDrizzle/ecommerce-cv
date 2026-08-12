import { useState } from 'react'
import './SportsSection.css'

const BALLS = [
  {
    id: 'football',
    label: 'Football',
    render: (
      <svg viewBox="0 0 100 100" className="ball-svg">
        <circle cx="50" cy="50" r="46" fill="#f2f1f6" stroke="#1a1a1a" strokeWidth="2" />
        <polygon points="50,28 62,37 57,52 43,52 38,37" fill="#1a1a1a" />
        <polygon points="50,28 62,37 74,32 70,18 56,16" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
        <polygon points="50,28 38,37 26,32 30,18 44,16" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
        <polygon points="43,52 57,52 62,66 50,75 38,66" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
        <polygon points="38,37 26,32 16,44 22,60 38,66" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
        <polygon points="62,37 74,32 84,44 78,60 62,66" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'basketball',
    label: 'Basketball',
    render: (
      <svg viewBox="0 0 100 100" className="ball-svg">
        <circle cx="50" cy="50" r="46" fill="#e07a2c" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="50" y1="4" x2="50" y2="96" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="4" y1="50" x2="96" y2="50" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M50 4 C 28 24, 28 76, 50 96" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M50 4 C 72 24, 72 76, 50 96" fill="none" stroke="#1a1a1a" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'tennis',
    label: 'Tennis',
    render: (
      <svg viewBox="0 0 100 100" className="ball-svg">
        <circle cx="50" cy="50" r="46" fill="#d7e84a" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M12 28 C 30 42, 30 58, 12 72" fill="none" stroke="#f2f1f6" strokeWidth="3" />
        <path d="M88 28 C 70 42, 70 58, 88 72" fill="none" stroke="#f2f1f6" strokeWidth="3" />
      </svg>
    ),
  },
]

export default function SportsSection({ intro }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="sports-section">
      <p className="panel-note">{intro}</p>

      <div className="ball-rack">
        <div className="rack-shelf" />
        {BALLS.map((ball) => (
          <button
            key={ball.id}
            className={`ball-slot ${selected === ball.id ? 'is-selected' : ''}`}
            onClick={() => setSelected(ball.id)}
          >
            {ball.render}
            <span className="ball-label">{ball.label}</span>
          </button>
        ))}
      </div>

      {selected && (
        <p className="ball-detail-note">
          {BALLS.find((b) => b.id === selected)?.label} details coming soon.
        </p>
      )}
    </div>
  )
}
