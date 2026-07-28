import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero() {
  return (
    <header className="hero">
      <div className="awning" aria-hidden="true" />

      <div className="hero-inner section">
        <motion.div
          className="sign-wrap"
          initial={{ rotate: -14, y: -30, opacity: 0 }}
          animate={{ rotate: 0, y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 90, damping: 8, delay: 0.2 }}
          style={{ transformOrigin: 'top center' }}
        >
          <div className="sign-chain" />
          <motion.div
            className="sign"
            animate={{ rotate: [0, 2.5, 0, -2.5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.4 }}
          >
            OPEN<br />FOR BUSINESS
          </motion.div>
        </motion.div>

        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Est. — Ecommerce &amp; Shopify Corner Store
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          Jordan Rivers
        </motion.h1>

        <motion.p
          className="tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          I turn browsers into buyers. Shopify builds, CRO teardown,
          and the odd A/B test that actually moved revenue.
        </motion.p>

        <motion.a
          href="#aisles"
          className="cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
        >
          Walk the aisles ↓
        </motion.a>
      </div>
    </header>
  )
}
