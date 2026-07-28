import { motion } from 'framer-motion'
import './Register.css'

export default function Register() {
  return (
    <section className="section register-section">
      <div className="counter">
        <p className="eyebrow">Checkout</p>
        <h2>Ready to Ring Me Up?</h2>
        <p className="counter-copy">
          If your store needs more carts closed and fewer carts abandoned,
          let&apos;s talk. No cold pitch, just a quick hello.
        </p>

        <div className="counter-actions">
          <motion.a
            href="mailto:hello@example.com"
            className="bell-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
          >
            🔔 Ring the bell
          </motion.a>
          <a href="https://linkedin.com" className="counter-link" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href="https://github.com" className="counter-link" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}
