import { motion } from 'framer-motion'
import './Intro.css'

export default function Intro({ onEnter }) {
  return (
    <motion.button
      className="intro"
      onClick={onEnter}
      exit={{
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
      }}
      aria-label="Enter site"
    >
      <div className="intro-stripe" />
      <div className="intro-content">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Jordan Rivers
        </motion.h1>
        <motion.p
          className="intro-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          Ecommerce Growth &amp; Shopify Development
        </motion.p>
        <motion.p
          className="intro-cta"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          Click or tap to enter
        </motion.p>
      </div>
    </motion.button>
  )
}
