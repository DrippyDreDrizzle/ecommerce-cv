import { useEffect, useRef, useState } from 'react'
import './ElectricTitle.css'

// Generates a jagged lightning-bolt path between two points, as an
// SVG path string, by walking from start to end and offsetting each
// step perpendicular to the line by a random "jag" amount.
function makeBoltPath(x1, y1, x2, y2, segments = 6, jag = 10) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len // unit normal, for perpendicular offsets
  const ny = dx / len

  const points = [[x1, y1]]
  for (let i = 1; i < segments; i++) {
    const t = i / segments
    const baseX = x1 + dx * t
    const baseY = y1 + dy * t
    const offset = (Math.random() - 0.5) * jag * (1 - Math.abs(t - 0.5) * 1.2)
    points.push([baseX + nx * offset, baseY + ny * offset])
  }
  points.push([x2, y2])

  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
}

function generateBolts() {
  const count = 3 + Math.floor(Math.random() * 2) // 3-4 bolts
  const bolts = []
  for (let i = 0; i < count; i++) {
    const y1 = 15 + Math.random() * 20
    const y2 = 65 + Math.random() * 20
    const x1 = 5 + Math.random() * 90
    const x2 = x1 + (Math.random() - 0.5) * 40
    bolts.push({
      id: `${Date.now()}-${i}`,
      d: makeBoltPath(x1, y1, x2, y2, 5 + Math.floor(Math.random() * 3), 14),
    })
  }
  return bolts
}

export default function ElectricTitle({ text }) {
  const [flicker, setFlicker] = useState(false)
  const [bolts, setBolts] = useState([])
  const timeoutRef = useRef(null)

  useEffect(() => {
    const cycle = () => {
      setBolts(generateBolts())
      setFlicker(true)
      timeoutRef.current = setTimeout(() => {
        setFlicker(false)
        timeoutRef.current = setTimeout(cycle, 3600 + Math.random() * 900)
      }, 200 + Math.random() * 120)
    }
    timeoutRef.current = setTimeout(cycle, 1200)
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <div className={`electric-title ${flicker ? 'is-flickering' : ''}`}>
      <span className="electric-text">{text}</span>
      <svg
        className="electric-bolts"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {bolts.map((bolt) => (
          <g key={bolt.id}>
            <path className="bolt-glow" d={bolt.d} fill="none" />
            <path className="bolt-core" d={bolt.d} fill="none" />
          </g>
        ))}
      </svg>
    </div>
  )
}
