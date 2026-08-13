import './SkillRadar.css'

const SIZE = 240
const CENTER = SIZE / 2
const MAX_R = 85
const LABEL_R = 108
const LEVELS = [0.25, 0.5, 0.75, 1]

function pointAt(radius, index, total) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2
  return [CENTER + radius * Math.cos(angle), CENTER + radius * Math.sin(angle)]
}

function polygonPoints(radiusFn, total) {
  return Array.from({ length: total }, (_, i) => pointAt(radiusFn(i), i, total).join(',')).join(' ')
}

export default function SkillRadar({ stats }) {
  const total = stats.length

  return (
    <div className="skill-radar">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="skill-radar-svg">
        {LEVELS.map((lvl) => (
          <polygon key={lvl} points={polygonPoints(() => MAX_R * lvl, total)} className="radar-grid-ring" />
        ))}

        {stats.map((_, i) => {
          const [x, y] = pointAt(MAX_R, i, total)
          return <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} className="radar-axis" />
        })}

        <polygon
          points={polygonPoints((i) => (stats[i].value / 100) * MAX_R, total)}
          className="radar-stat-shape"
        />

        {stats.map((s, i) => {
          const [x, y] = pointAt((s.value / 100) * MAX_R, i, total)
          return <circle key={s.label} cx={x} cy={y} r="3.5" className="radar-dot" />
        })}

        {stats.map((s, i) => {
          const [x, y] = pointAt(LABEL_R, i, total)
          return (
            <text key={s.label} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="radar-label">
              {s.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
