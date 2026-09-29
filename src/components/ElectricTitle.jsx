import { useId, useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'
import './ElectricTitle.css'

export default function ElectricTitle({ text }) {
  const filterId = `letter-current-${useId().replace(/:/g, '')}`
  const reducedMotion = useReducedMotion()
  const words = useMemo(() => text.split(' ').map((word) => Array.from(word).map((letter) => ({
    letter,
    duration: `${2.1 + Math.random() * 2.5}s`,
    drift: `${1.7 + Math.random() * 2.4}s`,
    delay: `${-Math.random() * 6}s`,
    direction: Math.random() > .5 ? 'normal' : 'reverse',
    phase: (Math.random() * 90).toFixed(1),
  }))), [text])

  return (
    <div className="electric-title" role="img" aria-label={text}>
      <svg className="electric-filter-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          {/* The electrical layers wander around the glyph contours together.
              The base letter sits outside this filter and remains steady. */}
          <filter id={filterId} x="-45%" y="-35%" width="190%" height="170%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency=".045 .12" numOctaves="2" seed="27" result="noise">
              {!reducedMotion && <animate attributeName="baseFrequency" values=".045 .12;.065 .16;.035 .1;.045 .12" dur="1.4s" repeatCount="indefinite" />}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" result="arc" />
            <feGaussianBlur in="arc" stdDeviation="2" result="blur" />
            <feFlood floodColor="#a333ff" floodOpacity=".85" result="purple" />
            <feComposite in="purple" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="arc" /></feMerge>
          </filter>
        </defs>
      </svg>
      {words.map((word, wordIndex) => (
        <span className="electric-word" key={wordIndex} aria-hidden="true">
          {word.map((glyph, index) => (
            <span key={index} className="electric-glyph" style={{ '--current-duration': glyph.duration, '--current-drift': glyph.drift, '--current-delay': glyph.delay, '--current-direction': glyph.direction, '--current-phase': glyph.phase }}>
              <span className="electric-glyph-size">{glyph.letter}</span>
              <svg className="electric-letter-svg" aria-hidden="true" focusable="false">
                <text className="electric-letter-base" x="50%" y="50%" textAnchor="middle" dominantBaseline="central">{glyph.letter}</text>
                <g filter={`url(#${filterId})`}>
                  <text className="electric-letter-fringe" x="50%" y="50%" textAnchor="middle" dominantBaseline="central">{glyph.letter}</text>
                  <text className="electric-letter-current" x="50%" y="50%" textAnchor="middle" dominantBaseline="central">{glyph.letter}</text>
                  <text className="electric-letter-spark" x="50%" y="50%" textAnchor="middle" dominantBaseline="central">{glyph.letter}</text>
                </g>
              </svg>
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}
