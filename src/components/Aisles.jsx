import { motion } from 'framer-motion'
import './Aisles.css'

const aisles = [
  {
    number: '01',
    label: 'Conversion & Growth',
    items: ['A/B & multivariate testing', 'Funnel diagnostics', 'Checkout optimization', 'Landing page teardown'],
  },
  {
    number: '02',
    label: 'Shopify Development',
    items: ['Custom themes (Liquid)', 'App integrations', 'Headless / Hydrogen', 'Performance tuning'],
  },
  {
    number: '03',
    label: 'Analytics & Data',
    items: ['GA4 & server-side tracking', 'Dashboarding', 'Attribution modelling', 'Experiment design'],
  },
  {
    number: '04',
    label: 'Merchandising',
    items: ['Product page strategy', 'Search & filtering UX', 'Email/lifecycle flows', 'Pricing experiments'],
  },
]

export default function Aisles() {
  return (
    <section id="aisles" className="section aisles">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Skills, shelved by category
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Aisle Guide
      </motion.h2>

      <div className="aisle-grid">
        {aisles.map((a, i) => (
          <motion.div
            className="aisle-card"
            key={a.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ y: -6 }}
          >
            <div className="aisle-number">AISLE {a.number}</div>
            <h3>{a.label}</h3>
            <ul>
              {a.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
