import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './ContactCard.css'

export default function ContactCard({ emailLabel, children }) {
  const [phase, setPhase] = useState('falling') // falling -> caught -> flipped
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('caught'), 700)
    const t2 = setTimeout(() => {
      setPhase('flipped')
      setFlipped(true)
    }, 1300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="contact-card-stage">
      <motion.div
        className="contact-card-hand"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: phase === 'falling' ? 0 : 1, y: phase === 'falling' ? 20 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <svg viewBox="0 0 120 120" className="hand-svg" aria-hidden="true">
          <path
            className="hand-shape"
            d="M20 118 C 15 90, 20 55, 35 35 C 40 25, 48 20, 52 30 C 55 20, 64 18, 66 30 C 70 20, 80 22, 78 36 C 92 30, 96 44, 84 54 C 96 58, 92 74, 78 74 C 88 88, 70 100, 55 92 C 40 108, 25 118, 20 118 Z"
          />
          {/* thumb, pinching against the index finger near the card */}
          <path className="hand-thumb" d="M30 60 C 15 55, 8 68, 18 78 C 26 84, 38 78, 38 68 Z" />
        </svg>
      </motion.div>

      <motion.div
        className="contact-card-flip"
        initial={{ y: -220, opacity: 0, rotate: -8 }}
        animate={{
          y: 0,
          opacity: 1,
          rotate: 0,
          rotateY: flipped ? 180 : 0,
        }}
        transition={{
          y: { duration: 0.7, ease: [0.34, 1.2, 0.4, 1] },
          opacity: { duration: 0.3 },
          rotateY: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
        }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="contact-card-face contact-card-front">
          <span className="contact-card-mark">AM</span>
          <span className="contact-card-name">André Marjolin</span>
        </div>
        <div className="contact-card-face contact-card-back">{children}</div>
      </motion.div>
    </div>
  )
}
