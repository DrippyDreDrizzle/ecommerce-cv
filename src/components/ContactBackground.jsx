import { useMemo } from 'react'
import { motion } from 'framer-motion'
import './ContactBackground.css'

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

function useShootingStars(count = 4) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: 5 + Math.random() * 35,
        left: Math.random() * 60,
        delay: i * 2.6 + Math.random() * 2,
        duration: 1.1 + Math.random() * 0.6,
      })),
    [count]
  )
}

function useBirds(count = 3) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: 15 + Math.random() * 20,
        delay: i * 4 + Math.random() * 3,
        duration: 14 + Math.random() * 6,
        scale: 0.6 + Math.random() * 0.5,
      })),
    [count]
  )
}

export default function ContactBackground() {
  const stars = useStars()
  const shootingStars = useShootingStars()
  const birds = useBirds()

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
          className="contact-bg-shooting-star"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], x: 160, y: 90 }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 5 + Math.random() * 4,
            ease: 'easeIn',
          }}
        />
      ))}

      {birds.map((b) => (
        <motion.svg
          key={b.id}
          viewBox="0 0 40 20"
          className="contact-bg-bird"
          style={{ top: `${b.top}%`, transform: `scale(${b.scale})` }}
          initial={{ x: '-10vw' }}
          animate={{ x: '110vw' }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'linear' }}
        >
          <path
            d="M0 10 Q 10 -4 20 10 Q 30 -4 40 10"
            fill="none"
            stroke="rgba(242,241,246,0.5)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.svg>
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
