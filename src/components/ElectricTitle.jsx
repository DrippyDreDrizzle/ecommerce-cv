import { useEffect, useRef, useState } from 'react'
import './ElectricTitle.css'

const random = (min, max) => min + Math.random() * (max - min)
const path = (points) => points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ')

// Subdivide in pixel space: large bends break into progressively finer
// irregularities without stretching the geometry on narrow screens.
function filament(start, end, displacement, depth = 5) {
  if (!depth) return [start, end]
  const dx = end[0] - start[0]
  const dy = end[1] - start[1]
  const length = Math.hypot(dx, dy) || 1
  const offset = random(-displacement, displacement)
  const middle = [(start[0] + end[0]) / 2 - dy / length * offset, (start[1] + end[1]) / 2 + dx / length * offset]
  return [...filament(start, middle, displacement * .48, depth - 1).slice(0, -1), ...filament(middle, end, displacement * .48, depth - 1)]
}

function discharge(width, height, id) {
  const fromLeft = Math.random() > .5
  const start = [width * (fromLeft ? .06 : .94), height * random(.35, .58)]
  const end = [width * (fromLeft ? .94 : .06), height * random(.4, .64)]
  const points = filament(start, end, Math.min(height * .24, 25), 6)
  const branches = Array.from({ length: width < 420 ? 4 : 6 }, (_, i) => {
    const origin = points[Math.floor(random(10, 53))]
    const tip = [Math.max(4, Math.min(width - 4, origin[0] + (fromLeft ? 1 : -1) * random(18, width * .13))), Math.max(5, Math.min(height - 5, origin[1] + (i % 2 ? 1 : -1) * random(height * .14, height * .38)))]
    const branch = filament(origin, tip, 5, 4)
    // Separate sections taper towards the end of each branch.
    return [path(branch.slice(0, 7)), path(branch.slice(6, 12)), path(branch.slice(11))]
  })
  return { id, d: path(points), branches, start, end }
}

export default function ElectricTitle({ text }) {
  const element = useRef(null)
  const size = useRef({ width: 0, height: 0 })
  const [box, setBox] = useState({ width: 0, height: 0 })
  const [bolt, setBolt] = useState(null)

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.target.getBoundingClientRect()
      size.current = { width, height }
      setBox({ width, height })
      setBolt(null)
    })
    observer.observe(element.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer
    let sequence = 0
    const strike = () => {
      if (motion.matches || document.hidden) return
      const { width, height } = size.current
      if (width && height) setBolt(discharge(width, height, ++sequence))
      timer = window.setTimeout(strike, random(1800, 3000))
    }
    const restart = () => {
      clearTimeout(timer)
      setBolt(null)
      if (!motion.matches && !document.hidden) timer = window.setTimeout(strike, 450)
    }
    restart()
    motion.addEventListener('change', restart)
    document.addEventListener('visibilitychange', restart)
    return () => {
      clearTimeout(timer)
      motion.removeEventListener('change', restart)
      document.removeEventListener('visibilitychange', restart)
    }
  }, [])

  return (
    <div ref={element} className="electric-title">
      <span className="electric-text">{text}</span>
      {bolt && <span key={`light-${bolt.id}`} className="electric-letter-light" aria-hidden="true">{text}</span>}
      {box.width > 0 && <svg className="electric-bolts" viewBox={`0 0 ${box.width} ${box.height}`} aria-hidden="true" focusable="false">
        {bolt && <g key={bolt.id} className="electric-discharge">
          <path className="electric-bloom" d={bolt.d} />
          <path className="electric-channel" d={bolt.d} />
          <g className="electric-branches">
            {bolt.branches.map((segments, index) => <g key={index}>{segments.map((d, part) => <path key={part} d={d} style={{ strokeWidth: [1.05, .65, .3][part], opacity: [ .85, .6, .3 ][part] }} />)}</g>)}
          </g>
          <path className="electric-hot-core" d={bolt.d} pathLength="1" />
          {[bolt.start, bolt.end].map(([cx, cy], index) => <circle key={index} className="electric-contact-spark" cx={cx} cy={cy} r="1.5" />)}
        </g>}
      </svg>}
    </div>
  )
}
