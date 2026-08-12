import { useMemo } from 'react'
import { motion } from 'framer-motion'
import './ContactBackground.css'

const METEOR_COLORS = ['#e0202b', '#9d5cff', '#3ecf6e', '#5cc9ff', '#e8b93a']

function useStars(count = 60) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 65,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    [count]
  )
}

// Plain CSS-driven meteors (no framer-motion) — a single shared
// @keyframes rule handles rotate+translate+opacity together in one
// transform string, so there's nothing for two animation systems to
// fight over. Each meteor only varies via CSS custom properties and
// its own animation-duration/delay.
function useMeteors(count = 5) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = 18 + Math.random() * 24
        const distanceVh = 55 + Math.random() * 40 // travels a % of screen height, not a fixed px amount
        const length = 40 + Math.random() * 130 // some much bigger than others
        const thickness = 1.5 + (length / 170) * 2.5

        return {
          id: i,
          top: 2 + Math.random() * 20, // start higher up so the longer travel still fits on screen
          left: Math.random() * 55,
          angle,
          distanceVh,
          length,
          thickness,
          cycleDuration: 6 + Math.random() * 6,
          delay: i * 1.3 + Math.random() * 2,
          color: METEOR_COLORS[i % METEOR_COLORS.length],
        }
      }),
    [count]
  )
}

export default function ContactBackground() {
  const stars = useStars()
  const meteors = useMeteors()

  return (
    <div className="contact-bg" aria-hidden="true">
      <div className="contact-bg-sky" />

      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="contact-bg-star"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {meteors.map((m) => (
        <span
          key={m.id}
          className="contact-bg-meteor"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            width: m.length,
            height: m.thickness,
            background: `linear-gradient(90deg, transparent 0%, ${m.color}55 35%, ${m.color} 75%, #fff 100%)`,
            boxShadow: `0 0 ${4 + m.thickness * 2}px ${m.color}`,
            '--angle': `${m.angle}deg`,
            '--distance': `${m.distanceVh}vh`,
            animationDuration: `${m.cycleDuration}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}

      <svg className="contact-bg-mountains-far" viewBox="0 0 400 100" preserveAspectRatio="none">
        <polygon points="0,100 0,55 60,20 130,60 190,30 260,65 320,25 400,55 400,100" />
      </svg>
      <svg className="contact-bg-mountains-near" viewBox="0 0 400 100" preserveAspectRatio="none">
        <polygon points="0,100 0,70 80,35 150,72 220,40 300,75 360,45 400,68 400,100" />
      </svg>
    </div>
  )
}
