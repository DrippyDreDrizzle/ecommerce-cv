import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import './Receipt.css'

const lineItems = [
  {
    name: 'CART ABANDONMENT FIX',
    desc: 'Redesigned checkout flow, 4 steps → 1 page',
    metric: 22,
    suffix: '% ↓ drop-off',
    detail: 'Client: DTC home goods brand',
  },
  {
    name: 'PDP CONVERSION LIFT',
    desc: 'A/B tested social proof + sticky add-to-cart',
    metric: 38,
    suffix: '% ↑ CVR',
    detail: 'Client: Skincare subscription box',
  },
  {
    name: 'SHOPIFY REPLATFORM',
    desc: 'Migrated legacy store, custom Liquid theme',
    metric: 2.1,
    suffix: 's page load',
    detail: 'Client: Multi-brand fashion retailer',
  },
]

function CountUp({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.1,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, value, decimals])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export default function Receipt() {
  return (
    <section className="section receipt-section">
      <p className="eyebrow">Case studies, itemized</p>
      <h2>Your Receipt</h2>

      <div className="receipt">
        <div className="receipt-head">
          <div className="receipt-store">JORDAN&apos;S GENERAL STORE</div>
          <div>Ecommerce &amp; Growth — Est. Since You Scrolled Here</div>
          <div className="receipt-dashes">— — — — — — — — — — — —</div>
        </div>

        {lineItems.map((item, i) => (
          <motion.div
            className="receipt-line"
            key={item.name}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.15, duration: 0.35 }}
          >
            <div className="receipt-item-row">
              <span className="receipt-item-name">{item.name}</span>
              <span className="receipt-item-metric">
                <CountUp
                  value={item.metric}
                  decimals={item.metric % 1 !== 0 ? 1 : 0}
                  suffix={item.suffix}
                />
              </span>
            </div>
            <div className="receipt-item-desc">{item.desc}</div>
            <div className="receipt-item-detail">{item.detail}</div>
          </motion.div>
        ))}

        <div className="receipt-dashes">— — — — — — — — — — — —</div>

        <motion.div
          className="receipt-total"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span>TOTAL PROJECTS RUNG UP</span>
          <span>3 AND COUNTING</span>
        </motion.div>

        <div className="receipt-footer">
          THANK YOU FOR SHOPPING MY CV
          <br />
          NO REFUNDS. ONLY REFERRALS.
        </div>
      </div>
    </section>
  )
}
