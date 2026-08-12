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

function useMeteors(count = 5) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = 18 + Math.random() * 24
        const distance = 160 + Math.random() * 220
        const length = 40 + Math.random() * 130 // varies a lot — some much bigger than others
        const thickness = 1.5 + (length / 170) * 2.5

        return {
          id: i,
          top: 4 + Math.random() * 38,
          left: Math.random() * 55,
          angle,
          distance,
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
        // Outer span: fixed, static rotation only (never touched by
        // framer-motion). Inner motion.span: travels purely along its
        // own local x-axis, which — because the outer span is already
        // rotated — reads as diagonal motion on screen. Keeping
        // rotation and motion on separate elements avoids framer-motion
        // overwriting a manual `transform` when it animates x/y.
        <span
          key={m.id}
          className="meteor-rotator"
          style={{ top: `${m.top}%`, left: `${m.left}%`, transform: `rotate(${m.angle}deg)` }}
        >
          <motion.span
            className="contact-bg-meteor"
            style={{
              width: m.length,
              height: m.thickness,
              background: `linear-gradient(90deg, transparent 0%, ${m.color}55 35%, ${m.color} 75%, #fff 100%)`,
              boxShadow: `0 0 ${4 + m.thickness * 2}px ${m.color}`,
            }}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: [0, 1, 1, 0], x: m.distance }}
            transition={{
              duration: m.duration,
              delay: m.delay,
              repeat: Infinity,
              repeatDelay: 5 + Math.random() * 4,
              ease: 'easeIn',
              opacity: { times: [0, 0.15, 0.7, 1] },
            }}
          />
        </span>
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
