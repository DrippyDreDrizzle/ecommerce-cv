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

function useShootingStars(count = 5) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Angle of travel — the trail's bright head is rendered at the
        // "far" end of the element, and the element is rotated to this
        // angle, so the head always leads in the direction of motion.
        const angle = 18 + Math.random() * 24
        const rad = (angle * Math.PI) / 180
        const distance = 160 + Math.random() * 220
        const length = 40 + Math.random() * 130 // varies a lot — some much bigger than others
        const thickness = 1.5 + (length / 170) * 2.5

        return {
          id: i,
          top: 4 + Math.random() * 38,
          left: Math.random() * 55,
          angle,
          dx: Math.cos(rad) * distance,
          dy: Math.sin(rad) * distance,
          length,
          thickness,
          delay: i * 2.1 + Math.random() * 2,
          duration: 0.9 + Math.random() * 0.7,
          color: METEOR_COLORS[i % METEOR_COLORS.length],
        }
      }),
    [count]
  )
}

export default function ContactBackground() {
  const stars = useStars()
  const shootingStars = useShootingStars()

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

      {shootingStars.map((s) => (
        <motion.span
          key={s.id}
          className="contact-bg-meteor"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.length,
            height: s.thickness,
            transform: `rotate(${s.angle}deg)`,
            background: `linear-gradient(90deg, transparent 0%, ${s.color}55 35%, ${s.color} 75%, #fff 100%)`,
            boxShadow: `0 0 ${4 + s.thickness * 2}px ${s.color}`,
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x: s.dx, y: s.dy }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 5 + Math.random() * 4,
            ease: 'easeIn',
            opacity: { times: [0, 0.15, 0.7, 1] },
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
