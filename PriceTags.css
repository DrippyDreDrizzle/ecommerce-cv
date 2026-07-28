import { motion } from 'framer-motion'
import './PriceTags.css'

const tools = [
  { name: 'Shopify / Liquid', price: '$$$' },
  { name: 'GA4', price: '$$' },
  { name: 'Figma', price: '$$' },
  { name: 'Klaviyo', price: '$$' },
  { name: 'VS Code', price: 'free (mine)' },
  { name: 'Hotjar', price: '$' },
]

export default function PriceTags() {
  return (
    <section className="section tags-section">
      <p className="eyebrow">Tools of the trade</p>
      <h2>Marked Down Tech Stack</h2>

      <div className="tag-rack">
        {tools.map((tool, i) => (
          <motion.div
            className="tag-item"
            key={tool.name}
            initial={{ opacity: 0, rotate: i % 2 === 0 ? -8 : 8, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ rotate: i % 2 === 0 ? -6 : 6, y: -4 }}
          >
            <div className="tag-string" />
            <div className="tag-body">
              <span className="tag-hole" />
              <span className="tag-name">{tool.name}</span>
              <span className="tag-price">{tool.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
