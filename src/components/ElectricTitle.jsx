import { useEffect, useState } from 'react'
import './ElectricTitle.css'

// A reusable "electric stencil" title effect: bold black stencil type,
// a cyan glow, and a couple of jagged lightning-bolt paths that flicker
// across it. Built from scratch with a free font + SVG/CSS animation —
// not copied from any specific logo or brand.
export default function ElectricTitle({ text }) {
  const [flicker, setFlicker] = useState(false)

  useEffect(() => {
    let timeout
    const cycle = () => {
      setFlicker(true)
      timeout = setTimeout(() => {
        setFlicker(false)
        timeout = setTimeout(cycle, 1800 + Math.random() * 1600)
      }, 140 + Math.random() * 120)
    }
    timeout = setTimeout(cycle, 900)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={`electric-title ${flicker ? 'is-flickering' : ''}`}>
      <svg className="electric-bolts" viewBox="0 0 600 160" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="bolt bolt-1"
          d="M -20 40 L 60 55 L 40 70 L 140 60 L 110 90 L 260 75 L 230 100 L 400 85 L 370 60 L 520 70 L 620 45"
          fill="none"
        />
        <path
          className="bolt bolt-2"
          d="M -20 120 L 80 105 L 55 90 L 180 110 L 150 130 L 320 100 L 290 130 L 460 115 L 430 140 L 620 110"
          fill="none"
        />
      </svg>
      <span className="electric-text" data-text={text}>
        {text}
      </span>
    </div>
  )
}
