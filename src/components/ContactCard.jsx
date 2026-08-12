import { useState } from 'react'
import { motion } from 'framer-motion'
import './ContactCard.css'

export default function ContactCard({ children }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      className="contact-card-flip"
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateY: flipped ? 180 : 0 }}
      transition={{
        y: { duration: 0.5 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.5 },
        rotateY: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
      }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="contact-card-face contact-card-front">
        <span className="contact-card-mark">AM</span>
        <span className="contact-card-name">André Marjolin</span>
        <span className="contact-card-role">Ecommerce Growth &amp; Shopify Dev</span>
      </div>
      <div className="contact-card-face contact-card-back">{children}</div>
    </motion.div>
  )
}
